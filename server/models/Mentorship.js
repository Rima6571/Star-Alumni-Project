import mongoose from 'mongoose';

const mentorshipSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    alumni: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    matchScore: {
      type: Number,
      default: 0,
    },
    assignmentType: {
      type: String,
      enum: ['manual', 'auto', 'register'],
      default: 'manual',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const Mentorship = mongoose.model('Mentorship', mentorshipSchema);

export default Mentorship;
