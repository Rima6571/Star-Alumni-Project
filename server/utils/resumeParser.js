import pdf from 'pdf-parse';

const SKILL_KEYWORDS = [
  'react',
  'node.js',
  'node',
  'express',
  'mongodb',
  'mongoose',
  'javascript',
  'typescript',
  'python',
  'java',
  'c++',
  'sql',
  'mysql',
  'postgresql',
  'aws',
  'azure',
  'docker',
  'kubernetes',
  'tailwind',
  'html',
  'css',
  'git',
  'rest api',
  'redis',
  'next.js',
  'redux',
];

const titleCase = (input) =>
  input
    .split(' ')
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ')
    .replace('Node.js', 'Node.js')
    .replace('Mongodb', 'MongoDB')
    .replace('Javascript', 'JavaScript')
    .replace('Typescript', 'TypeScript')
    .replace('Rest Api', 'REST API')
    .replace('Next.js', 'Next.js');

export const extractSkillsFromText = (text = '') => {
  const normalized = text.toLowerCase();
  const found = SKILL_KEYWORDS.filter((skill) => normalized.includes(skill));

  if (!found.includes('node.js') && found.includes('node')) {
    found.push('node.js');
  }

  const cleaned = Array.from(new Set(found.filter((skill) => skill !== 'node')));
  return cleaned.map(titleCase);
};

export const parseResumePdf = async (pdfBuffer) => {
  const parsed = await pdf(pdfBuffer);
  const text = parsed?.text || '';
  const skills = extractSkillsFromText(text);

  return { text, skills };
};
