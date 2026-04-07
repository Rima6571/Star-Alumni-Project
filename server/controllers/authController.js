import User from '../models/User.js';
import { autoAssignMentor } from '../utils/mentorAssignment.js';
import generateToken from '../utils/generateToken.js';

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profileImage: user.profileImage,
  branch: user.branch,
  industry: user.industry,
  sector: user.sector,
  graduationYear: user.graduationYear,
  company: user.company,
  jobTitle: user.jobTitle,
  skills: user.skills,
  experienceLevel: user.experienceLevel,
  resumeUrl: user.resumeUrl || user.resume,
  isActive: user.isActive,
  lastLogin: user.lastLogin,
  bio: user.bio,
  linkedin: user.linkedin,
  github: user.github,
  createdAt: user.createdAt,
});

export const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      profileImage,
      branch,
      graduationYear,
      company,
      jobTitle,
      skills,
      industry,
      sector,
      resumeUrl,
      experienceLevel,
      bio,
      linkedin,
      github,
    } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email and password are required');
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409);
      throw new Error('User with this email already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      profileImage,
      branch,
      graduationYear,
      company,
      jobTitle,
      skills,
      industry,
      sector,
      experienceLevel,
      resumeUrl: resumeUrl || req.body.resume,
      isActive: true,
      lastLogin: new Date(),
      bio,
      linkedin,
      github,
    });

    if (user.role === 'student') {
      try {
        await autoAssignMentor({
          studentId: user._id,
          preferredIndustry: user.industry,
          studentExperienceLevel: user.experienceLevel,
          message: 'Auto-assigned mentor during registration',
          assignmentSource: 'register',
        });
      } catch (assignmentError) {
        console.error('Auto-assign on registration failed:', assignmentError.message);
      }
    }

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    user.lastLogin = new Date();
    user.isActive = true;
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id, user.role);

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      user: sanitizeUser(req.user),
    });
  } catch (error) {
    return next(error);
  }
};
