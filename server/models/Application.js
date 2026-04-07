import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
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
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

applicationSchema.index({ student: 1, job: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
