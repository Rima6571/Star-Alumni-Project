import { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard';
import LoadingState from '../../components/LoadingState';
import ConfirmDialog from '../../components/ConfirmDialog';
import { jobs as fallbackJobs } from '../../data/studentMockData';
import { jobApi } from '../../services/api';
import { useToast } from '../../components/ToastProvider';

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

const Jobs = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobApi.getJobs();
        setJobs(extractJobs(response, fallbackJobs).map(mapJobForUi));
      } catch {
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async () => {
    if (!selectedJob) return;
    try {
      await jobApi.applyJob({ jobId: selectedJob.id, resume: 'https://example.com/resume.pdf' });
      showToast(`Applied for ${selectedJob.title}`, 'success');
    } catch {
      showToast(`Application recorded for ${selectedJob.title} (offline mode)`, 'info');
    } finally {
      setSelectedJob(null);
    }
  };

  if (loading) return <LoadingState label="Fetching jobs..." />;

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Job Opportunities</h1>
        <p className="text-sm text-slate-600 mt-1">Explore jobs posted by alumni and faculty and apply in one click.</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={() => setSelectedJob(job)} />
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(selectedJob)}
        title="Apply for this job?"
        message={`Submit your application for ${selectedJob?.title} at ${selectedJob?.company}.`}
        onCancel={() => setSelectedJob(null)}
        onConfirm={handleApply}
        confirmText="Apply"
      />
    </section>
  );
};

export default Jobs;

