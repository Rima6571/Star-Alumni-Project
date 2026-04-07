import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';
import { autoAssignMentor, refreshMentorImpact } from '../utils/mentorAssignment.js';
import { matchScore } from '../utils/skillMatching.js';

export const requestMentorship = async (req, res, next) => {
  try {
    const { alumniId, message } = req.body;

    if (!message) {
      res.status(400);
      throw new Error('message is required');
    }

    if (!alumniId) {
      const assignment = await autoAssignMentor({
        studentId: req.user._id,
        preferredIndustry: req.body.industry,
        studentExperienceLevel: req.body.experienceLevel,
        message,
        assignmentSource: 'auto',
      });

      if (!assignment) {
        res.status(404);
        throw new Error('No alumni mentors available for auto assignment');
      }

      return res.status(201).json({
        success: true,
        message: 'Mentor auto-assigned successfully',
        mentorship: assignment.mentorship,
        assignedAlumni: assignment.assignedAlumni,
      });
    }

    const alumni = await User.findOne({ _id: alumniId, role: 'alumni' });
    if (!alumni) {
      res.status(404);
      throw new Error('Alumni not found');
    }

    const mentorship = await Mentorship.create({
      student: req.user._id,
      alumni: alumniId,
      message,
      assignmentType: 'manual',
      matchScore: matchScore(req.user.skills || [], alumni.skills || []),
    });

    return res.status(201).json({
      success: true,
      message: 'Mentorship request sent successfully',
      mentorship,
    });
  } catch (error) {
    return next(error);
  }
};

export const getMentorshipRequests = async (req, res, next) => {
  try {
    const requests = await Mentorship.find({ alumni: req.user._id, status: 'pending' })
      .populate('student', 'name email branch graduationYear profileImage')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    return next(error);
  }
};

export const respondMentorshipRequest = async (req, res, next) => {
  try {
    const { requestId, action } = req.body;

    if (!requestId || !action) {
      res.status(400);
      throw new Error('requestId and action are required');
    }

    const normalized = action.toLowerCase();
    if (!['accept', 'decline'].includes(normalized)) {
      res.status(400);
      throw new Error('action must be Accept or Decline');
    }

    const request = await Mentorship.findOne({ _id: requestId, alumni: req.user._id });
    if (!request) {
      res.status(404);
      throw new Error('Mentorship request not found');
    }

    request.status = normalized === 'accept' ? 'accepted' : 'rejected';
    await request.save();

    if (request.status === 'accepted') {
      await refreshMentorImpact(req.user._id);
    }

    return res.json({
      success: true,
      message: `Mentorship request ${request.status}`,
      mentorship: request,
    });
  } catch (error) {
    return next(error);
  }
};

export const autoAssignMentorship = async (req, res, next) => {
  try {
    const assignment = await autoAssignMentor({
      studentId: req.user._id,
      preferredIndustry: req.body.industry,
      studentExperienceLevel: req.body.experienceLevel,
      message: req.body.message || 'Auto-assigned mentorship request',
      assignmentSource: 'auto',
    });

    if (!assignment) {
      res.status(404);
      throw new Error('No alumni mentors available for auto assignment');
    }

    return res.status(201).json({
      success: true,
      message: 'Mentor auto-assigned successfully',
      mentorship: assignment.mentorship,
      assignedAlumni: assignment.assignedAlumni,
      score: assignment.score,
    });
  } catch (error) {
    return next(error);
  }
};
