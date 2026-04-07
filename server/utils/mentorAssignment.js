import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';
import { mentorCompositeScore } from './skillMatching.js';

const computeMentoredStudentsCount = async (alumniId) => {
  const uniqueStudents = await Mentorship.distinct('student', {
    alumni: alumniId,
    status: 'accepted',
  });
  return uniqueStudents.length;
};

export const autoAssignMentor = async ({
  studentId,
  preferredIndustry = '',
  studentExperienceLevel = 'fresher',
  message = 'Auto-assigned mentorship request',
  assignmentSource = 'auto',
}) => {
  const student = await User.findOne({ _id: studentId, role: 'student' }).select(
    'skills industry experienceLevel',
  );

  if (!student) {
    throw new Error('Student not found for mentor assignment');
  }

  const alumni = await User.find({ role: 'alumni' }).select(
    'name email skills industry experienceLevel totalStudentsMentored',
  );

  if (!alumni.length) {
    return null;
  }

  const ranked = alumni
    .map((mentor) => ({
      mentor,
      compositeScore: mentorCompositeScore({
        studentSkills: student.skills,
        alumniSkills: mentor.skills,
        preferredIndustry: preferredIndustry || student.industry,
        alumniIndustry: mentor.industry,
        studentExperienceLevel: studentExperienceLevel || student.experienceLevel,
        alumniExperienceLevel: mentor.experienceLevel,
      }),
    }))
    .sort((a, b) => b.compositeScore - a.compositeScore);

  const best = ranked[0];

  const mentorship = await Mentorship.create({
    student: student._id,
    alumni: best.mentor._id,
    message,
    status: assignmentSource === 'register' ? 'accepted' : 'pending',
    matchScore: best.compositeScore,
    assignmentType: assignmentSource,
  });

  if (mentorship.status === 'accepted') {
    const count = await computeMentoredStudentsCount(best.mentor._id);
    await User.findByIdAndUpdate(best.mentor._id, { totalStudentsMentored: count });
  }

  return {
    mentorship,
    assignedAlumni: {
      _id: best.mentor._id,
      name: best.mentor.name,
      email: best.mentor.email,
    },
    score: best.compositeScore,
  };
};

export const refreshMentorImpact = async (alumniId) => {
  const count = await computeMentoredStudentsCount(alumniId);
  await User.findByIdAndUpdate(alumniId, { totalStudentsMentored: count });
  return count;
};
