import Application from '../models/Application.js';
import Event from '../models/Event.js';
import Job from '../models/Job.js';
import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';
import { parseResumePdf } from '../utils/resumeParser.js';
import { matchScore, rankBySkillSimilarity } from '../utils/skillMatching.js';

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await User.findById(req.user._id).select('-password');
    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    return res.json({ success: true, profile });
  } catch (error) {
    return next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'name',
      'profileImage',
      'branch',
      'graduationYear',
      'skills',
      'bio',
      'linkedin',
      'github',
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    const updated = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updated) {
      res.status(404);
      throw new Error('Profile not found');
    }

    return res.json({ success: true, message: 'Profile updated successfully', profile: updated });
  } catch (error) {
    return next(error);
  }
};

export const getStudentDashboardSummary = async (req, res, next) => {
  try {
    const [jobsCount, eventsCount, alumniCount, mentorshipCount, applicationsCount, alumni, jobs, mentorships] =
      await Promise.all([
      Job.countDocuments({ approvedByAdmin: true }),
      Event.countDocuments({ approvedByAdmin: true }),
      User.countDocuments({ role: 'alumni' }),
      Mentorship.countDocuments({ student: req.user._id }),
      Application.countDocuments({ student: req.user._id }),
      User.find({ role: 'alumni' })
        .select('name email company jobTitle skills profileImage location industry experienceLevel')
        .lean(),
      Job.find({ approvedByAdmin: true })
        .select('title company location salary requiredSkills skillsRequired postedBy createdAt')
        .populate('postedBy', 'name email company jobTitle')
        .lean(),
      Mentorship.find({ student: req.user._id })
        .populate('alumni', 'name email company jobTitle profileImage')
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    const rankedAlumni = rankBySkillSimilarity(req.user.skills || [], alumni)
      .filter((item) => item.matchScore > 0)
      .slice(0, 6);

    const recommendedJobs = jobs
      .map((job) => {
        const required = job.requiredSkills?.length ? job.requiredSkills : job.skillsRequired || [];
        return {
          ...job,
          requiredSkills: required,
          matchScore: Number(matchScore(req.user.skills || [], required).toFixed(3)),
        };
      })
      .filter((job) => job.matchScore > 0.5)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);

    const autoAssignedMentor = mentorships.find((item) =>
      ['auto', 'register'].includes(item.assignmentType),
    );

    return res.json({
      success: true,
      stats: {
        jobsCount,
        eventsCount,
        alumniCount,
        mentorshipCount,
        applicationsCount,
      },
      recommendedAlumni: rankedAlumni,
      recommendedJobs,
      autoAssignedMentor,
    });
  } catch (error) {
    return next(error);
  }
};

export const findAlumni = async (req, res, next) => {
  try {
    const alumni = await User.find({ role: 'alumni' }).select('-password').lean();
    const ranked = rankBySkillSimilarity(req.user.skills || [], alumni);
    return res.json({ success: true, count: ranked.length, alumni: ranked });
  } catch (error) {
    return next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate('job', 'title company location salary')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    return next(error);
  }
};

export const getMyEventRegistrations = async (req, res, next) => {
  try {
    const events = await Event.find({ registeredStudents: req.user._id })
      .populate('createdBy', 'name email role')
      .sort({ date: 1 });

    return res.json({ success: true, count: events.length, events });
  } catch (error) {
    return next(error);
  }
};

export const getMyMentorshipRequests = async (req, res, next) => {
  try {
    const requests = await Mentorship.find({ student: req.user._id })
      .populate('alumni', 'name email company jobTitle skills')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    return next(error);
  }
};

export const parseResumeAndUpdateSkills = async (req, res, next) => {
  try {
    const { resumeBase64, resumeUrl } = req.body;

    if (!resumeBase64) {
      res.status(400);
      throw new Error('resumeBase64 is required');
    }

    const cleanedBase64 = resumeBase64.includes(',') ? resumeBase64.split(',')[1] : resumeBase64;
    const pdfBuffer = Buffer.from(cleanedBase64, 'base64');

    const { skills } = await parseResumePdf(pdfBuffer);

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        skills,
        resumeUrl: resumeUrl || req.user.resumeUrl,
      },
      { new: true, runValidators: true },
    ).select('-password');

    return res.json({
      success: true,
      message: 'Resume parsed and skills updated successfully',
      extractedSkills: skills,
      profile: updated,
    });
  } catch (error) {
    return next(error);
  }
};
