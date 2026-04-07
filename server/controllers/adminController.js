import Event from '../models/Event.js';
import Job from '../models/Job.js';
import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';

const normalizeStatusQuery = (status) => {
  if (!status || status === 'all') return null;
  if (['pending', 'approved', 'rejected'].includes(status)) return status;
  return null;
};

const toCsv = (rows = []) => {
  if (!rows.length) return '';

  const headers = Object.keys(rows[0]);
  const escape = (value) => {
    const raw = value === null || value === undefined ? '' : String(value);
    const safe = raw.replace(/"/g, '""');
    return /[",\n]/.test(safe) ? `"${safe}"` : safe;
  };

  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => escape(row[header])).join(','));
  }

  return lines.join('\n');
};

const getThirtyDaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date;
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password').sort({ createdAt: -1 });
    return res.json({ success: true, count: students.length, students });
  } catch (error) {
    return next(error);
  }
};

export const getAlumni = async (req, res, next) => {
  try {
    const alumni = await User.find({ role: 'alumni' }).select('-password').sort({ createdAt: -1 });
    return res.json({ success: true, count: alumni.length, alumni });
  } catch (error) {
    return next(error);
  }
};

export const approveJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }

    job.approvedByAdmin = true;
    job.reviewStatus = 'approved';
    await job.save();

    return res.json({ success: true, message: 'Job approved successfully', job });
  } catch (error) {
    return next(error);
  }
};

export const rejectJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }

    job.approvedByAdmin = false;
    job.reviewStatus = 'rejected';
    await job.save();

    return res.json({ success: true, message: 'Job rejected successfully', job });
  } catch (error) {
    return next(error);
  }
};

export const approveEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    event.approvedByAdmin = true;
    event.reviewStatus = 'approved';
    await event.save();

    return res.json({ success: true, message: 'Event approved successfully', event });
  } catch (error) {
    return next(error);
  }
};

export const rejectEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    event.approvedByAdmin = false;
    event.reviewStatus = 'rejected';
    await event.save();

    return res.json({ success: true, message: 'Event rejected successfully', event });
  } catch (error) {
    return next(error);
  }
};

export const getJobsForAdmin = async (req, res, next) => {
  try {
    const { status, search = '' } = req.query;
    const query = {};

    const normalizedStatus = normalizeStatusQuery(status);
    if (normalizedStatus) {
      query.reviewStatus = normalizedStatus;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [{ title: regex }, { company: regex }, { location: regex }];
    }

    const jobs = await Job.find(query)
      .populate('postedBy', 'name email role')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    return next(error);
  }
};

export const getEventsForAdmin = async (req, res, next) => {
  try {
    const { status, search = '' } = req.query;
    const query = {};

    const normalizedStatus = normalizeStatusQuery(status);
    if (normalizedStatus) {
      query.reviewStatus = normalizedStatus;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [{ title: regex }, { location: regex }, { eventType: regex }];
    }

    const events = await Event.find(query)
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: events.length, events });
  } catch (error) {
    return next(error);
  }
};

export const getAdminDashboard = async (req, res, next) => {
  try {
    const [students, alumni, jobs, events, pendingJobs, pendingEvents] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'alumni' }),
      Job.countDocuments(),
      Event.countDocuments(),
      Job.countDocuments({ reviewStatus: 'pending' }),
      Event.countDocuments({ reviewStatus: 'pending' }),
    ]);

    const [latestStudents, latestJobs, latestEvents] = await Promise.all([
      User.find({ role: 'student' }).select('name branch createdAt').sort({ createdAt: -1 }).limit(3),
      Job.find({ reviewStatus: 'pending' }).select('title company createdAt').sort({ createdAt: -1 }).limit(3),
      Event.find({ reviewStatus: 'pending' }).select('title location createdAt').sort({ createdAt: -1 }).limit(3),
    ]);

    const recentActivity = [
      ...latestStudents.map((u) => ({
        type: 'student',
        message: `New student registered: ${u.name}${u.branch ? ` (${u.branch})` : ''}`,
        createdAt: u.createdAt,
      })),
      ...latestJobs.map((j) => ({
        type: 'job',
        message: `Job post pending approval: ${j.title}${j.company ? ` at ${j.company}` : ''}`,
        createdAt: j.createdAt,
      })),
      ...latestEvents.map((e) => ({
        type: 'event',
        message: `Event submitted for review: ${e.title}`,
        createdAt: e.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    return res.json({
      success: true,
      stats: {
        totalStudents: students,
        totalAlumni: alumni,
        totalJobs: jobs,
        totalEvents: events,
        pendingJobs,
        pendingEvents,
      },
      recentActivity,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAdminReports = async (req, res, next) => {
  try {
    const [students, alumni, applications, eventRegistrations] = await Promise.all([
      User.find({ role: 'student' }).select('branch').lean(),
      User.find({ role: 'alumni' }).select('company branch').lean(),
      Job.aggregate([
        {
          $project: {
            applicantsCount: { $size: { $ifNull: ['$applicants', []] } },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$applicantsCount' },
          },
        },
      ]),
      Event.aggregate([
        {
          $project: {
            regCount: { $size: { $ifNull: ['$registeredStudents', []] } },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$regCount' },
          },
        },
      ]),
    ]);

    const branchMap = new Map();
    students.forEach((student) => {
      const key = student.branch || 'Unknown';
      branchMap.set(key, (branchMap.get(key) || 0) + 1);
    });

    const alumniMap = new Map();
    alumni.forEach((alum) => {
      const key = alum.branch || 'Unknown';
      alumniMap.set(key, (alumniMap.get(key) || 0) + 1);
    });

    const companyMap = new Map();
    alumni.forEach((alum) => {
      if (!alum.company) return;
      companyMap.set(alum.company, (companyMap.get(alum.company) || 0) + 1);
    });

    const branchStats = Array.from(branchMap.entries())
      .map(([branch, studentCount]) => {
        const alumniCount = alumniMap.get(branch) || 0;
        const coverage = students.length ? Math.round((studentCount / students.length) * 100) : 0;
        return { branch, students: studentCount, alumni: alumniCount, pct: coverage };
      })
      .sort((a, b) => b.students - a.students)
      .slice(0, 8);

    const topCompanies = Array.from(companyMap.entries())
      .map(([company, hires]) => ({ company, hires }))
      .sort((a, b) => b.hires - a.hires)
      .slice(0, 6);

    return res.json({
      success: true,
      summary: {
        totalStudents: students.length,
        totalAlumni: alumni.length,
        totalApplications: applications[0]?.total || 0,
        totalEventRegistrations: eventRegistrations[0]?.total || 0,
      },
      branchStats,
      topCompanies,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAdminAnalytics = async (req, res, next) => {
  try {
    const thirtyDaysAgo = getThirtyDaysAgo();

    const [
      totalAlumni,
      totalStudents,
      alumniByYear,
      alumniBySector,
      activeAlumni,
      inactiveAlumni,
      mentorshipStatsRaw,
      topMentors,
    ] = await Promise.all([
      User.countDocuments({ role: 'alumni' }),
      User.countDocuments({ role: 'student' }),
      User.aggregate([
        { $match: { role: 'alumni' } },
        { $group: { _id: '$graduationYear', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      User.aggregate([
        { $match: { role: 'alumni' } },
        { $group: { _id: '$sector', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      User.countDocuments({ role: 'alumni', lastLogin: { $gte: thirtyDaysAgo } }),
      User.countDocuments({ role: 'alumni', $or: [{ lastLogin: { $lt: thirtyDaysAgo } }, { lastLogin: null }] }),
      Mentorship.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Mentorship.aggregate([
        { $match: { status: 'accepted' } },
        {
          $group: {
            _id: '$alumni',
            mentoredStudents: { $sum: 1 },
          },
        },
        { $sort: { mentoredStudents: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'alumni',
          },
        },
        { $unwind: '$alumni' },
        {
          $project: {
            _id: 0,
            alumniId: '$alumni._id',
            name: '$alumni.name',
            company: '$alumni.company',
            mentoredStudents: 1,
          },
        },
      ]),
    ]);

    const mentorshipStats = mentorshipStatsRaw.reduce(
      (acc, curr) => ({ ...acc, [curr._id]: curr.count }),
      { pending: 0, accepted: 0, rejected: 0 },
    );

    const totalMentorship = mentorshipStats.pending + mentorshipStats.accepted + mentorshipStats.rejected;

    return res.json({
      success: true,
      analytics: {
        totalAlumni,
        totalStudents,
        alumniByYear: alumniByYear.map((item) => ({ year: item._id || 'Unknown', count: item.count })),
        alumniBySector: alumniBySector.map((item) => ({ sector: item._id || 'Unspecified', count: item.count })),
        activeVsInactive: {
          active: activeAlumni,
          inactive: inactiveAlumni,
        },
        mentorshipStats: {
          ...mentorshipStats,
          total: totalMentorship,
          successRate: totalMentorship
            ? Number(((mentorshipStats.accepted / totalMentorship) * 100).toFixed(2))
            : 0,
          topMentors,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const exportAdminData = async (req, res, next) => {
  try {
    const format = (req.query.format || 'json').toString().toLowerCase();

    const [users, jobs, mentorships] = await Promise.all([
      User.find().select('-password').lean(),
      Job.find().populate('postedBy', 'name email').lean(),
      Mentorship.find()
        .populate('student', 'name email')
        .populate('alumni', 'name email company')
        .lean(),
    ]);

    const payload = {
      generatedAt: new Date().toISOString(),
      users,
      jobs,
      mentorships,
    };

    if (format === 'csv') {
      const csvRows = mentorships.map((item) => ({
        mentorshipId: item._id,
        studentName: item.student?.name || '',
        studentEmail: item.student?.email || '',
        alumniName: item.alumni?.name || '',
        alumniEmail: item.alumni?.email || '',
        alumniCompany: item.alumni?.company || '',
        status: item.status,
        assignmentType: item.assignmentType,
        matchScore: item.matchScore,
        createdAt: item.createdAt,
      }));

      const csv = toCsv(csvRows);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="admin-export.csv"');
      return res.send(csv);
    }

    return res.json({ success: true, ...payload });
  } catch (error) {
    return next(error);
  }
};

export const getAdminProfile = async (req, res, next) => {
  try {
    return res.json({ success: true, profile: req.user });
  } catch (error) {
    return next(error);
  }
};

export const updateAdminProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'email', 'branch', 'bio', 'jobTitle'];
    const updates = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    const profile = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    return res.json({ success: true, message: 'Profile updated successfully', profile });
  } catch (error) {
    return next(error);
  }
};

export const updateAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400);
      throw new Error('currentPassword and newPassword are required');
    }

    if (newPassword.length < 6) {
      res.status(400);
      throw new Error('newPassword must be at least 6 characters');
    }

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      res.status(401);
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    await user.deleteOne();
    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
