const normalizeSkill = (skill = '') => skill.toString().trim().toLowerCase();

const toSkillSet = (skills = []) =>
  new Set((Array.isArray(skills) ? skills : []).map(normalizeSkill).filter(Boolean));

export const matchScore = (studentSkills = [], alumniSkills = []) => {
  const studentSet = toSkillSet(studentSkills);
  const alumniSet = toSkillSet(alumniSkills);

  if (!studentSet.size) return 0;

  let matchedSkillsCount = 0;
  for (const skill of studentSet) {
    if (alumniSet.has(skill)) {
      matchedSkillsCount += 1;
    }
  }

  return matchedSkillsCount / studentSet.size;
};

export const rankBySkillSimilarity = (baseSkills = [], users = [], key = 'skills') =>
  [...users]
    .map((user) => ({
      ...user,
      matchScore: Number(matchScore(baseSkills, user?.[key] || []).toFixed(3)),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

const experienceWeight = {
  fresher: 0.25,
  junior: 0.5,
  mid: 0.75,
  senior: 1,
  lead: 1,
};

export const mentorCompositeScore = ({
  studentSkills = [],
  alumniSkills = [],
  preferredIndustry = '',
  alumniIndustry = '',
  studentExperienceLevel = 'fresher',
  alumniExperienceLevel = 'junior',
}) => {
  const skillScore = matchScore(studentSkills, alumniSkills);

  const industryScore =
    preferredIndustry && alumniIndustry
      ? normalizeSkill(preferredIndustry) === normalizeSkill(alumniIndustry)
        ? 1
        : 0
      : 0.5;

  const studentExp = experienceWeight[normalizeSkill(studentExperienceLevel)] ?? 0.25;
  const alumniExp = experienceWeight[normalizeSkill(alumniExperienceLevel)] ?? 0.5;
  const experienceScore = alumniExp >= studentExp ? 1 : 0.4;

  return Number((skillScore * 0.6 + industryScore * 0.25 + experienceScore * 0.15).toFixed(3));
};

export const toNormalizedSkills = (skills = []) =>
  Array.from(toSkillSet(skills)).map((skill) => skill.trim());

export default {
  matchScore,
  rankBySkillSimilarity,
  mentorCompositeScore,
  toNormalizedSkills,
};
