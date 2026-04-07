import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'shortlisted', 'rejected'],
      default: 'pending',
    },
  },
  { _id: false },
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
    reviewStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    applicants: {
      type: [applicantSchema],
      default: [],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
