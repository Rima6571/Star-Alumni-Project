import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { matchScore } from '../utils/skillMatching.js';

export const createJob = async (req, res, next) => {
  try {
    const { title, company, location, salary, description, skillsRequired, requiredSkills } = req.body;
    const normalizedRequiredSkills = Array.isArray(requiredSkills)
      ? requiredSkills
      : Array.isArray(skillsRequired)
      ? skillsRequired
      : [];

    if (!title || !company || !location || !description) {
      res.status(400);
      throw new Error('Title, company, location and description are required');
    }

    if (!normalizedRequiredSkills.length) {
      res.status(400);
      throw new Error('requiredSkills must contain at least one skill');
    }

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      skillsRequired: normalizedRequiredSkills,
      requiredSkills: normalizedRequiredSkills,
      postedBy: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { jobsPosted: 1 } });

    return res.status(201).json({
      success: true,
      message: 'Job created and sent for admin approval',
      job,
    });
  } catch (error) {
    return next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const isStudent = req.user && req.user.role === 'student';
    const query = isStudent
      ? { approvedByAdmin: true }
      : req.user && req.user.role === 'alumni'
      ? { $or: [{ approvedByAdmin: true }, { postedBy: req.user._id }] }
      : {};

    let jobs = await Job.find(query)
      .populate('postedBy', 'name email company jobTitle')
      .sort({ createdAt: -1 });

    if (isStudent) {
      jobs = jobs
        .map((job) => {
          const baseSkills = job.requiredSkills?.length ? job.requiredSkills : job.skillsRequired;
          const score = matchScore(req.user.skills || [], baseSkills || []);

          return {
            ...job.toObject(),
            requiredSkills: baseSkills || [],
            matchScore: Number(score.toFixed(3)),
          };
        })
        .filter((job) => job.matchScore > 0.5)
        .sort((a, b) => b.matchScore - a.matchScore);
    }

    return res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    return next(error);
  }
};

export const applyForJob = async (req, res, next) => {
  try {
    const { jobId, resume } = req.body;

    if (!jobId || !resume) {
      res.status(400);
      throw new Error('jobId and resume are required');
    }

    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }

    if (!job.approvedByAdmin) {
      res.status(400);
      throw new Error('Cannot apply to unapproved job');
    }

    const existing = await Application.findOne({ student: req.user._id, job: jobId });
    if (existing) {
      res.status(409);
      throw new Error('You have already applied for this job');
    }

    const application = await Application.create({
      student: req.user._id,
      job: jobId,
      resume,
      status: 'pending',
    });

    job.applicants.push({ studentId: req.user._id, resume, status: 'pending' });
    await job.save();

    return res.status(201).json({
      success: true,
      message: 'Job application submitted successfully',
      application,
    });
  } catch (error) {
    return next(error);
  }
};
