export const demoData = {
  studentProfile: {
    id: 'st-1001',
    name: 'Vaibhavi Patil',
    branch: 'Computer Engineering',
    graduationYear: 2027,
    email: 'vaibhavi.patil@apcoer.edu.in',
    skills: ['React', 'Node.js', 'MongoDB'],
    bio: 'Student developer and active alumni network member.',
    projects: ['Campus Event Hub'],
    linkedin: 'https://linkedin.com/in/vaibhavi-patil',
    github: 'https://github.com/vaibhavi-patil',
    resume: 'https://example.com/resume.pdf',
  },
  alumni: [
    { id: 'al-1', name: 'Rohan Kulkarni', company: 'Microsoft', industry: 'Cloud', location: 'Hyderabad', graduationYear: 2019, jobTitle: 'SDE II' },
    { id: 'al-2', name: 'Sneha Joshi', company: 'Amazon', industry: 'Product', location: 'Bengaluru', graduationYear: 2018, jobTitle: 'Product Manager' },
  ],
  jobs: [
    { id: 'job-1', title: 'Frontend Intern', company: 'Innovate Labs', location: 'Pune', salary: 'INR 20,000/month', requiredSkills: ['React'], deadline: '2026-04-12' },
    { id: 'job-2', title: 'Graduate Engineer', company: 'CodeSphere', location: 'Bengaluru', salary: 'INR 8 LPA', requiredSkills: ['Node.js'], deadline: '2026-04-30' },
  ],
  applications: [{ id: 1, jobTitle: 'Frontend Intern', company: 'Innovate Labs', appliedDate: '2026-03-10', status: 'Pending' }],
  events: [
    { id: 'ev-1', title: 'Alumni Hiring Sprint', date: '2026-03-28', location: 'APCOER Main Hall', organizer: 'Placement Cell', description: 'Hiring and networking event.' },
    { id: 'ev-2', title: 'Career Blueprint', date: '2026-04-12', location: 'Virtual', organizer: 'Alumni Association', description: 'Career planning workshop.' },
  ],
  studentEvents: [{ id: 1, eventTitle: 'Alumni Hiring Sprint', date: '2026-03-28', location: 'APCOER Main Hall', status: 'Registered' }],
  mentorshipRequests: [],
  messages: [
    {
      id: 'c1',
      participant: 'Sneha Joshi',
      company: 'Amazon',
      unread: 1,
      messages: [{ id: 1, sender: 'alumni', text: 'Happy to help with product interviews.', time: '10:12 AM' }],
    },
  ],
};
