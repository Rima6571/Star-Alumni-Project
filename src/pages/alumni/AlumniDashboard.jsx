import { useEffect, useMemo, useState } from 'react';
import { FiBriefcase, FiCalendar, FiClock, FiFileText, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LoadingState from '../../components/LoadingState';
import { alumniApi } from '../../services/alumniApi';
import { mockJobs, mockEvents, mockMentorshipRequests, mockStudents } from './mockData';

const extractList = (response, fallback, candidates = []) => {
  const data = response?.data;

  if (Array.isArray(data)) return data;

  if (data && typeof data === 'object') {
    for (const key of candidates) {
      if (Array.isArray(data[key])) {
        return data[key];
      }
    }

    if (Array.isArray(data.data)) return data.data;
  }

  return fallback;
};

const AlumniDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [requests, setRequests] = useState([]);
  const [impact, setImpact] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [jobsRes, eventsRes, studentsRes, mentorshipRes, impactRes] = await Promise.allSettled([
          alumniApi.getMyJobs(),
          alumniApi.getMyEvents(),
          alumniApi.getStudents({ limit: 5 }),
          alumniApi.getMentorshipRequests(),
          alumniApi.getImpact(),
        ]);

        setJobs(
          jobsRes.status === 'fulfilled' ? extractList(jobsRes.value, mockJobs, ['jobs']) : mockJobs,
        );
        setEvents(
          eventsRes.status === 'fulfilled' ? extractList(eventsRes.value, mockEvents, ['events']) : mockEvents,
        );
        setConnections(
          studentsRes.status === 'fulfilled'
            ? extractList(studentsRes.value, mockStudents, ['students'])
            : mockStudents,
        );
        setRequests(
          mentorshipRes.status === 'fulfilled'
            ? extractList(mentorshipRes.value, mockMentorshipRequests, ['requests', 'mentorship'])
            : mockMentorshipRequests,
        );

        setImpact(impactRes.status === 'fulfilled' ? impactRes.value?.data?.impact : null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalApplications = useMemo(
    () => jobs.reduce((sum, job) => sum + Number(job.applications || 0), 0),
    [jobs],
  );

  const stats = [
    { label: 'Total Job Posts', value: jobs.length, icon: FiBriefcase, color: 'text-blue-700 bg-blue-100' },
    { label: 'Total Job Applications', value: totalApplications, icon: FiFileText, color: 'text-indigo-700 bg-indigo-100' },
    { label: 'Events Created', value: events.length, icon: FiCalendar, color: 'text-emerald-700 bg-emerald-100' },
    { label: 'Student Connections', value: connections.length, icon: FiUsers, color: 'text-cyan-700 bg-cyan-100' },
    { label: 'Pending Mentorship Requests', value: requests.length, icon: FiClock, color: 'text-amber-700 bg-amber-100' },
  ];

  if (loading) return <LoadingState label="Preparing alumni insights..." />;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#1E40AF] p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Professional Networking Hub</p>
        <h2 className="mt-2 text-2xl font-semibold">Welcome back to APCOER Alumni Dashboard</h2>
        <p className="mt-2 max-w-2xl text-sm text-blue-100">
          Connect with students, post opportunities, and shape future careers through mentorship and events.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`mb-3 inline-flex rounded-lg p-2 ${card.color}`}>
                <Icon className="text-base" />
              </div>
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{card.value}</p>
            </article>
          );
        })}
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Impact Panel</h3>
        <p className="mt-1 text-sm text-slate-500">Your measurable contribution to the alumni community.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-100 px-4 py-3">
            <p className="text-xs text-slate-500">Students Mentored</p>
            <p className="text-2xl font-semibold text-slate-900">{impact?.totalStudentsMentored ?? 0}</p>
          </div>
          <div className="rounded-xl border border-slate-100 px-4 py-3">
            <p className="text-xs text-slate-500">Jobs Posted</p>
            <p className="text-2xl font-semibold text-slate-900">{impact?.jobsPosted ?? jobs.length}</p>
          </div>
          <div className="rounded-xl border border-slate-100 px-4 py-3">
            <p className="text-xs text-slate-500">Events Created</p>
            <p className="text-2xl font-semibold text-slate-900">{impact?.eventsCreated ?? events.length}</p>
          </div>
          <div className="rounded-xl border border-slate-100 px-4 py-3">
            <p className="text-xs text-slate-500">Mentorship Success</p>
            <p className="text-2xl font-semibold text-emerald-700">{impact?.mentorshipSuccess ?? 0}%</p>
          </div>
        </div>
      </article>

      <div className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent Job Posts</h3>
            <Link to="/alumni/my-jobs" className="text-sm font-medium text-blue-700 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {jobs.slice(0, 4).map((job) => (
              <div key={job.id} className="rounded-xl border border-slate-100 px-4 py-3">
                <p className="font-medium text-slate-800">{job.title}</p>
                <p className="text-sm text-slate-500">{job.company} | {job.location}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent Student Connections</h3>
            <Link to="/alumni/search-students" className="text-sm font-medium text-blue-700 hover:underline">
              Explore Students
            </Link>
          </div>
          <div className="space-y-3">
            {connections.slice(0, 4).map((student) => (
              <div key={student.id} className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3">
                <img src={student.photo} alt={student.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-slate-800">{student.name}</p>
                  <p className="text-sm text-slate-500">{student.branch} | {student.graduationYear}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default AlumniDashboard;
