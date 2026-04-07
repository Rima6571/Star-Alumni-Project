import { useEffect, useState } from 'react';
import ApplicationTable from '../../components/ApplicationTable';
import LoadingState from '../../components/LoadingState';
import { studentApi } from '../../services/api';
import { myApplications as fallbackRows } from '../../data/studentMockData';
import { useToast } from '../../components/ToastProvider';

const extractApplications = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.applications)) return data.applications;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return fallback;
};

const mapApplicationForUi = (application) => ({
  id: application._id || application.id,
  jobTitle: application.jobTitle || application.job?.title,
  company: application.company || application.job?.company,
  location: application.location || application.job?.location,
  status: application.status || 'pending',
  appliedDate:
    application.appliedDate ||
    (application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'),
});

const MyApplications = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await studentApi.getApplications();
        setApplications(extractApplications(response, fallbackRows).map(mapApplicationForUi));
      } catch {
        setApplications(fallbackRows);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <LoadingState label="Loading your applications..." />;

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Job Applications</h1>
        <p className="text-sm text-slate-600 mt-1">Track status across pending, shortlisted, and rejected applications.</p>
      </div>

      <ApplicationTable rows={applications} onAction={(row) => showToast(`Opening ${row.jobTitle}`, 'info')} />
    </section>
  );
};

export default MyApplications;

