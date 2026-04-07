import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Event from '../models/Event.js';
import Job from '../models/Job.js';
import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';

dotenv.config();

const SKILLS = [
  'React',
  'Node.js',
  'MongoDB',
  'Express',
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'SQL',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes',
  'Tailwind',
  'Git',
  'Next.js',
  'REST API',
  'Redis',
];

const BRANCHES = ['CSE', 'IT', 'ENTC', 'Mechanical', 'Civil', 'Electrical'];
const INDUSTRIES = ['IT Services', 'Product', 'Government', 'Startup'];
const SECTORS = ['IT', 'Government', 'Startup'];
const LEVELS = ['fresher', 'junior', 'mid', 'senior'];
const COMPANIES = ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Government Jobs', 'Tech Mahindra', 'Capgemini'];

const FIRST_NAMES = [
  'Aarav',
  'Vivaan',
  'Aditya',
  'Ishaan',
  'Krishna',
  'Rohan',
  'Siddharth',
  'Ayaan',
  'Ananya',
  'Siya',
  'Aadhya',
  'Diya',
  'Myra',
  'Ira',
  'Priya',
  'Vaibhavi',
  'Sneha',
  'Neha',
  'Pooja',
  'Ritika',
];

const LAST_NAMES = [
  'Sharma',
  'Patil',
  'Kulkarni',
  'Deshmukh',
  'Gupta',
  'Yadav',
  'Joshi',
  'Nair',
  'Reddy',
  'Verma',
  'Pawar',
  'Jadhav',
  'More',
  'Mishra',
  'Singh',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = (arr) => arr[randomInt(0, arr.length - 1)];

const randomSkills = () => {
  const count = randomInt(3, 7);
  const picked = new Set();
  while (picked.size < count) {
    picked.add(randomItem(SKILLS));
  }
  return Array.from(picked);
};

const randomName = () => `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`;
const randomEmail = (name, idx, role) =>
  `${name.toLowerCase().replace(/\s+/g, '.')}+${role}${idx}@apcoer.demo`;

const makeStudent = (idx) => {
  const name = randomName();
  return {
    name,
    email: randomEmail(name, idx, 'student'),
    password: 'student123',
    role: 'student',
    branch: randomItem(BRANCHES),
    graduationYear: randomInt(2025, 2029),
    skills: randomSkills(),
    industry: randomItem(INDUSTRIES),
    sector: randomItem(SECTORS),
    experienceLevel: 'fresher',
    resumeUrl: `https://example.com/resumes/student-${idx}.pdf`,
    isActive: Math.random() > 0.2,
    lastLogin: new Date(Date.now() - randomInt(1, 60) * 24 * 60 * 60 * 1000),
  };
};

const makeAlumni = (idx) => {
  const name = randomName();
  return {
    name,
    email: randomEmail(name, idx, 'alumni'),
    password: 'alumni123',
    role: 'alumni',
    branch: randomItem(BRANCHES),
    graduationYear: randomInt(2010, 2024),
    company: randomItem(COMPANIES),
    jobTitle: randomItem(['Software Engineer', 'SDE II', 'Data Analyst', 'DevOps Engineer', 'Manager']),
    skills: randomSkills(),
    industry: randomItem(INDUSTRIES),
    sector: randomItem(SECTORS),
    experienceLevel: randomItem(LEVELS),
    totalStudentsMentored: 0,
    jobsPosted: 0,
    eventsCreated: 0,
    isActive: Math.random() > 0.15,
    lastLogin: new Date(Date.now() - randomInt(1, 90) * 24 * 60 * 60 * 1000),
  };
};

const run = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing. Add it to your server .env file.');
  }

  await connectDB();

  await Promise.all([
    User.deleteMany({ email: /@apcoer\.demo$/ }),
    Job.deleteMany({}),
    Event.deleteMany({}),
    Mentorship.deleteMany({}),
  ]);

  const students = await User.insertMany(Array.from({ length: 50 }, (_, i) => makeStudent(i + 1)));
  const alumni = await User.insertMany(Array.from({ length: 30 }, (_, i) => makeAlumni(i + 1)));

  const jobs = [];
  for (let i = 0; i < 40; i += 1) {
    const owner = randomItem(alumni);
    const requiredSkills = randomSkills().slice(0, randomInt(3, 5));

    jobs.push({
      title: randomItem(['Frontend Developer', 'Backend Developer', 'MERN Developer', 'Government Technical Officer', 'Data Engineer']),
      company: randomItem(COMPANIES),
      location: randomItem(['Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Remote']),
      salary: `${randomInt(4, 18)} LPA`,
      description: 'Exciting role with growth opportunities.',
      skillsRequired: requiredSkills,
      requiredSkills,
      postedBy: owner._id,
      approvedByAdmin: true,
      reviewStatus: 'approved',
    });
  }

  await Job.insertMany(jobs);

  const events = [];
  for (let i = 0; i < 15; i += 1) {
    const owner = randomItem(alumni);
    events.push({
      title: randomItem(['Career Talk', 'Mock Interview Drive', 'Resume Workshop', 'Networking Meetup']),
      description: 'Alumni-led guidance event.',
      date: new Date(Date.now() + randomInt(1, 60) * 24 * 60 * 60 * 1000),
      location: randomItem(['Pune', 'Online', 'Mumbai']),
      eventType: randomItem(['Workshop', 'Seminar', 'Meetup']),
      createdBy: owner._id,
      approvedByAdmin: true,
      reviewStatus: 'approved',
    });
  }

  await Event.insertMany(events);

  const mentorships = [];
  for (let i = 0; i < 60; i += 1) {
    const student = randomItem(students);
    const mentor = randomItem(alumni);
    const status = randomItem(['pending', 'accepted', 'rejected']);

    mentorships.push({
      student: student._id,
      alumni: mentor._id,
      message: 'Need guidance for career transition and job prep.',
      status,
      assignmentType: randomItem(['manual', 'auto', 'register']),
      matchScore: Number(Math.random().toFixed(2)),
    });
  }

  await Mentorship.insertMany(mentorships);

  const alumniCounters = new Map();

  for (const alumnus of alumni) {
    alumniCounters.set(alumnus._id.toString(), {
      jobsPosted: 0,
      eventsCreated: 0,
      students: new Set(),
    });
  }

  const dbJobs = await Job.find({}, 'postedBy');
  const dbEvents = await Event.find({}, 'createdBy');
  const acceptedMentorships = await Mentorship.find({ status: 'accepted' }, 'alumni student');

  dbJobs.forEach((job) => {
    const key = job.postedBy.toString();
    if (alumniCounters.has(key)) alumniCounters.get(key).jobsPosted += 1;
  });

  dbEvents.forEach((event) => {
    const key = event.createdBy.toString();
    if (alumniCounters.has(key)) alumniCounters.get(key).eventsCreated += 1;
  });

  acceptedMentorships.forEach((mentorship) => {
    const key = mentorship.alumni.toString();
    if (alumniCounters.has(key)) {
      alumniCounters.get(key).students.add(mentorship.student.toString());
    }
  });

  await Promise.all(
    alumni.map((alumnus) => {
      const stats = alumniCounters.get(alumnus._id.toString());
      return User.findByIdAndUpdate(alumnus._id, {
        jobsPosted: stats.jobsPosted,
        eventsCreated: stats.eventsCreated,
        totalStudentsMentored: stats.students.size,
      });
    }),
  );

  console.log('Seeding complete.');
  console.log(`Students inserted: ${students.length}`);
  console.log(`Alumni inserted: ${alumni.length}`);
  console.log(`Jobs inserted: ${jobs.length}`);
  console.log(`Events inserted: ${events.length}`);
  console.log(`Mentorship records inserted: ${mentorships.length}`);

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error('Seed failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch {
    // no-op
  }
  process.exit(1);
});
