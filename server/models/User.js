import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'alumni', 'student'],
      default: 'student',
    },
    profileImage: {
      type: String,
      default: '',
    },
    branch: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      default: '',
    },
    sector: {
      type: String,
      enum: ['IT', 'Government', 'Startup'],
      default: 'IT',
    },
    graduationYear: {
      type: Number,
    },
    company: {
      type: String,
      default: '',
    },
    jobTitle: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      enum: ['fresher', 'junior', 'mid', 'senior', 'lead'],
      default: 'fresher',
    },
    projects: {
      type: [String],
      default: [],
    },
    resume: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    totalStudentsMentored: {
      type: Number,
      default: 0,
    },
    jobsPosted: {
      type: Number,
      default: 0,
    },
    eventsCreated: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
