import { useEffect, useState } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import JobCard from '../../components/JobCard';
import LoadingState from '../../components/LoadingState';
import { useToast } from '../../components/ToastProvider';
import { alumniApi } from '../../services/alumniApi';
import { mockJobs } from './mockData';

const extractJobs = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.jobs)) return data.jobs;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
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

const MyJobPosts = () => {
  const { pushToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const response = await alumniApi.getMyJobs();
        setJobs(extractJobs(response, mockJobs).map(mapJobForUi));
      } catch {
        setJobs(mockJobs);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const confirmDelete = async () => {
    if (!selectedJob) return;

    try {
      await alumniApi.deleteMyJob(selectedJob.id);
      setJobs((prev) => prev.filter((job) => job.id !== selectedJob.id));
      pushToast('Job post removed.', 'success');
    } catch {
      pushToast('Unable to delete job right now.', 'error');
    } finally {
      setSelectedJob(null);
    }
  };

  if (loading) return <LoadingState label="Loading your job posts..." />;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">My Job Posts</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onViewApplicants={() => pushToast(`Viewing applicants for ${job.title}`, 'info')}
            onEdit={() => pushToast(`Editing ${job.title}`, 'info')}
            onDelete={() => setSelectedJob(job)}
          />
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(selectedJob)}
        title="Delete Job Post"
        message={`Are you sure you want to delete ${selectedJob?.title || 'this job'}?`}
        onCancel={() => setSelectedJob(null)}
        onConfirm={confirmDelete}
        confirmText="Delete"
      />
    </section>
  );
};

export default MyJobPosts;
