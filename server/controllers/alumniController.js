import Application from '../models/Application.js';
import Event from '../models/Event.js';
import Job from '../models/Job.js';
import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';
import { rankBySkillSimilarity } from '../utils/skillMatching.js';

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
      'company',
      'jobTitle',
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

export const getStudentsForAlumni = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password').sort({ createdAt: -1 });
    return res.json({ success: true, count: students.length, students });
  } catch (error) {
    return next(error);
  }
};

export const getAlumniList = async (req, res, next) => {
  try {
    const alumni = await User.find({ role: 'alumni' }).select('-password').lean();
    const ranked = rankBySkillSimilarity(req.user.skills || [], alumni);

    return res.json({ success: true, count: ranked.length, alumni: ranked });
  } catch (error) {
    return next(error);
  }
};

export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    return res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    return next(error);
  }
};

export const getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.json({ success: true, count: events.length, events });
  } catch (error) {
    return next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).select('_id');
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('student', 'name email branch graduationYear skills')
      .populate('job', 'title company location')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    return next(error);
  }
};

export const deleteMyJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, postedBy: req.user._id });
    if (!job) {
      res.status(404);
      throw new Error('Job not found or not owned by alumni');
    }

    await job.deleteOne();
    await User.findByIdAndUpdate(req.user._id, { $inc: { jobsPosted: -1 } });
    return res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

export const deleteMyEvent = async (req, res, next) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!event) {
      res.status(404);
      throw new Error('Event not found or not owned by alumni');
    }

    await event.deleteOne();
    await User.findByIdAndUpdate(req.user._id, { $inc: { eventsCreated: -1 } });
    return res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

export const getAlumniImpact = async (req, res, next) => {
  try {
    const [alumni, mentorshipAggregate] = await Promise.all([
      User.findById(req.user._id).select('totalStudentsMentored jobsPosted eventsCreated'),
      Mentorship.aggregate([
        { $match: { alumni: req.user._id } },
        {
          $group: {
            _id: '$status',
            total: { $sum: 1 },
          },
        },
      ]),
    ]);

    const accepted = mentorshipAggregate.find((item) => item._id === 'accepted')?.total || 0;
    const total = mentorshipAggregate.reduce((sum, item) => sum + item.total, 0);

    return res.json({
      success: true,
      impact: {
        totalStudentsMentored: alumni?.totalStudentsMentored || 0,
        jobsPosted: Math.max(0, alumni?.jobsPosted || 0),
        eventsCreated: Math.max(0, alumni?.eventsCreated || 0),
        mentorshipSuccess: total ? Number(((accepted / total) * 100).toFixed(2)) : 0,
      },
    });
  } catch (error) {
    return next(error);
  }
};
