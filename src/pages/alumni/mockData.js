export const mockProfile = {
  avatar: 'https://i.pravatar.cc/120?img=22',
  name: 'Vaibhav Kulkarni',
  graduationYear: '2018',
  branch: 'Computer Engineering',
  company: 'TechNova Systems',
  jobTitle: 'Senior Software Engineer',
  location: 'Pune, India',
  bio: 'Passionate about helping students build strong software engineering foundations and industry-ready portfolios.',
  linkedin: 'https://linkedin.com/in/vaibhavkulkarni',
  skills: ['React', 'Node.js', 'MongoDB', 'System Design'],
  experience: '7 years in full-stack product development and mentoring.',
};

export const mockStudents = [
  {
    id: 'st-1',
    name: 'Aditi Patil',
    branch: 'Computer Engineering',
    graduationYear: '2026',
    photo: 'https://i.pravatar.cc/100?img=5',
    skills: ['React', 'JavaScript', 'UI Design'],
  },
  {
    id: 'st-2',
    name: 'Rohan Jadhav',
    branch: 'Information Technology',
    graduationYear: '2025',
    photo: 'https://i.pravatar.cc/100?img=15',
    skills: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'st-3',
    name: 'Sakshi More',
    branch: 'Electronics',
    graduationYear: '2026',
    photo: 'https://i.pravatar.cc/100?img=32',
    skills: ['Python', 'Machine Learning', 'Data Analysis'],
  },
  {
    id: 'st-4',
    name: 'Pratik Deshmukh',
    branch: 'Computer Engineering',
    graduationYear: '2027',
    photo: 'https://i.pravatar.cc/100?img=49',
    skills: ['Java', 'Spring Boot', 'SQL'],
  },
  {
    id: 'st-5',
    name: 'Neha Bhosale',
    branch: 'Information Technology',
    graduationYear: '2025',
    photo: 'https://i.pravatar.cc/100?img=45',
    skills: ['Figma', 'UX Research', 'Frontend'],
  },
  {
    id: 'st-6',
    name: 'Aman Naik',
    branch: 'Computer Engineering',
    graduationYear: '2026',
    photo: 'https://i.pravatar.cc/100?img=11',
    skills: ['TypeScript', 'Next.js', 'Tailwind'],
  },
  {
    id: 'st-7',
    name: 'Kiran Pawar',
    branch: 'Mechanical',
    graduationYear: '2025',
    photo: 'https://i.pravatar.cc/100?img=61',
    skills: ['CAD', 'Project Management', 'Leadership'],
  },
];

export const mockJobs = [
  {
    id: 'job-1',
    title: 'Frontend Developer Intern',
    company: 'TechNova Systems',
    location: 'Pune',
    salary: 'INR 25,000 / month',
    description: 'Work on reusable UI components and React dashboards.',
    requiredSkills: ['React', 'Tailwind', 'Git'],
    deadline: '2026-04-30',
    status: 'Pending',
    applications: 12,
  },
  {
    id: 'job-2',
    title: 'Backend Developer Intern',
    company: 'CloudNest Labs',
    location: 'Remote',
    salary: 'INR 30,000 / month',
    description: 'Build APIs with Express and MongoDB for student products.',
    requiredSkills: ['Node.js', 'MongoDB', 'REST API'],
    deadline: '2026-05-15',
    status: 'Approved',
    applications: 21,
  },
];

export const mockEvents = [
  {
    id: 'event-1',
    title: 'Career Roadmap 2026',
    description: 'Guidance on internship preparation and interview strategy.',
    date: '2026-04-21',
    location: 'APCOER Auditorium',
    type: 'Career Guidance',
    status: 'Pending',
    registrations: 38,
  },
  {
    id: 'event-2',
    title: 'Alumni Tech Meetup',
    description: 'Networking with industry professionals and student teams.',
    date: '2026-05-02',
    location: 'Virtual Webinar',
    type: 'Alumni Meet',
    status: 'Approved',
    registrations: 64,
  },
];

export const mockMentorshipRequests = [
  {
    id: 'mr-1',
    studentName: 'Aditi Patil',
    branch: 'Computer Engineering',
    year: '2026',
    message: 'I need guidance on building a strong frontend portfolio for internships.',
  },
  {
    id: 'mr-2',
    studentName: 'Rohan Jadhav',
    branch: 'Information Technology',
    year: '2025',
    message: 'Can you mentor me for backend interview prep and project review?',
  },
];

export const mockConversations = [
  {
    id: 'c-1',
    participant: 'Aditi Patil',
    branch: 'Computer Engineering',
    unread: 1,
    messages: [
      { id: 'm-1', sender: 'student', text: 'Hello sir, can you review my portfolio?', time: '10:10 AM' },
      { id: 'm-2', sender: 'alumni', text: 'Sure, share your GitHub and resume.', time: '10:13 AM' },
    ],
  },
  {
    id: 'c-2',
    participant: 'Sakshi More',
    branch: 'Electronics',
    unread: 0,
    messages: [
      { id: 'm-3', sender: 'student', text: 'Can I join your webinar?', time: 'Yesterday' },
      { id: 'm-4', sender: 'alumni', text: 'Yes, I will send the registration link.', time: 'Yesterday' },
    ],
  },
];
