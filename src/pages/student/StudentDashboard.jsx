import { useEffect, useState } from 'react';
import { dashboardStats, jobs as mockJobs, events as mockEvents, alumniList } from '../../data/studentMockData';
import { jobApi, eventApi, alumniApi, studentApi } from '../../services/api';
import LoadingState from '../../components/LoadingState';
import JobCard from '../../components/JobCard';
import EventCard from '../../components/EventCard';
import AlumniCard from '../../components/AlumniCard';
import { useToast } from '../../components/ToastProvider';

const extractList = (response, fallback, keys = []) => {
  const data = response?.data;

  if (Array.isArray(data)) return data;

  if (data && typeof data === 'object') {
    for (const key of keys) {
      if (Array.isArray(data[key])) return data[key];
    }
    if (Array.isArray(data.data)) return data.data;
  }

  return fallback;
};

const mapJobForUi = (job) => ({
  ...job,
  id: job._id || job.id,
  requiredSkills: job.requiredSkills || job.skillsRequired || [],
  applications: typeof job.applications === 'number' ? job.applications : job.applicants?.length || 0,
  status: job.status || (job.approvedByAdmin ? 'Approved' : 'Pending'),
  deadline: job.deadline || 'N/A',
});

const mapEventForUi = (event) => ({
  ...event,
  id: event._id || event.id,
  category: event.category || event.eventType || 'Event',
  organizer: event.organizer || event.createdBy?.name || 'APCOER Alumni',
});

const mapAlumniForUi = (alumni) => ({
  ...alumni,
  id: alumni._id || alumni.id,
  photo: alumni.photo || alumni.profileImage || 'https://i.pravatar.cc/120?img=22',
  location: alumni.location || 'India',
});

const StudentDashboard = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [recommendedAlumni, setRecommendedAlumni] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [autoMentor, setAutoMentor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, eventsRes, alumniRes, dashboardRes] = await Promise.all([
          jobApi.getJobs(),
          eventApi.getEvents(),
          alumniApi.getAlumni({ page: 1, limit: 3 }),
          studentApi.getDashboard(),
        ]);
        setJobs(extractList(jobsRes, mockJobs, ['jobs']).map(mapJobForUi));
        setEvents(extractList(eventsRes, mockEvents, ['events']).map(mapEventForUi));
        const dashboardData = dashboardRes?.data || {};

        setRecommendedAlumni(
          extractList(
            { data: { alumni: dashboardData.recommendedAlumni || [] } },
            extractList(alumniRes, alumniList.slice(0, 3), ['alumni']),
            ['alumni'],
          )
            .map(mapAlumniForUi)
            .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)),
        );

        setRecommendedJobs(
          (dashboardData.recommendedJobs || []).map((job) => ({
            ...mapJobForUi(job),
            matchScore: job.matchScore,
          })),
        );

        setAutoMentor(dashboardData.autoAssignedMentor || null);
      } catch {
        setJobs(mockJobs);
        setEvents(mockEvents);
        setRecommendedAlumni(alumniList.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingState label="Loading dashboard insights..." />;

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-600 text-sm mt-1">Connect with alumni, accelerate your career, and stay event-ready.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {dashboardStats.map((card) => (
          <div key={card.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{card.value}</p>
            <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${card.color}`}>{card.trend}</span>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Job Posts</h2>
          <div className="space-y-4">
            {jobs.slice(0, 2).map((job) => (
              <JobCard key={job.id} job={job} onApply={() => showToast('Application submitted', 'success')} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming Events</h2>
          <div className="space-y-4">
            {events.slice(0, 2).map((event) => (
              <EventCard key={event.id} event={event} primaryActionLabel="Register Event" onPrimaryAction={() => showToast('Event registration initiated', 'success')} compact />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Recommended Alumni</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {recommendedAlumni.map((alumni) => (
            <AlumniCard
              key={alumni.id}
              alumni={alumni}
              onConnect={() => showToast('Connection request sent', 'success')}
              onMentorship={() => showToast('Mentorship request sent', 'success')}
              onMessage={() => showToast('Chat opened in Messages', 'info')}
            />
          ))}
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Recommended Jobs</h2>
          <div className="space-y-3">
            {(recommendedJobs.length ? recommendedJobs : jobs.slice(0, 3)).map((job) => (
              <div key={job.id} className="rounded-xl border border-slate-100 px-4 py-3">
                <p className="font-medium text-slate-800">{job.title}</p>
                <p className="text-sm text-slate-500">{job.company} | {job.location}</p>
                <p className="text-xs text-emerald-700 mt-1">
                  Skill Match: {Math.round((job.matchScore || 0) * 100)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Auto-assigned Mentor</h2>
          {autoMentor?.alumni ? (
            <div className="rounded-xl border border-slate-100 px-4 py-4">
              <p className="font-semibold text-slate-800">{autoMentor.alumni.name}</p>
              <p className="text-sm text-slate-500">{autoMentor.alumni.company || 'APCOER Alumni'}</p>
              <p className="text-xs text-blue-700 mt-2">Status: {autoMentor.status}</p>
              <p className="text-xs text-emerald-700 mt-1">
                Match Score: {Math.round((autoMentor.matchScore || 0) * 100)}%
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No auto-assigned mentor yet. You can request mentorship anytime.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;

