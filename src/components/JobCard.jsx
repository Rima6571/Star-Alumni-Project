import { FiClock, FiDollarSign, FiMapPin, FiUsers } from 'react-icons/fi';

const JobCard = ({ job, onViewApplicants, onEdit, onDelete, onApply }) => {
  const isManagementMode = Boolean(onViewApplicants || onEdit || onDelete);

  const statusClasses =
    job.status === 'Approved'
      ? 'bg-emerald-100 text-emerald-700'
      : job.status === 'Rejected'
        ? 'bg-rose-100 text-rose-700'
        : 'bg-amber-100 text-amber-700';

  if (!isManagementMode) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
            <p className="text-college-blue font-medium mt-0.5">{job.company}</p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusClasses}`}>{job.status}</span>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-slate-600">
          <p className="inline-flex items-center gap-1.5"><FiMapPin /> {job.location}</p>
          <p className="inline-flex items-center gap-1.5"><FiDollarSign /> {job.salary || 'Not specified'}</p>
          <p className="inline-flex items-center gap-1.5"><FiClock /> Posted: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}</p>
          <p className="inline-flex items-center gap-1.5"><FiUsers /> Applications: {job.applications || 0}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(job.requiredSkills || []).map((skill) => (
            <span key={skill} className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">{skill}</span>
          ))}
        </div>

        <p className="mt-3 text-sm text-slate-600">{job.description}</p>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => onApply?.(job)}
            className="rounded-lg bg-college-blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Apply Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
          <p className="text-college-blue font-medium mt-0.5">{job.company}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusClasses}`}>{job.status}</span>
      </div>
      <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-slate-600">
        <p className="inline-flex items-center gap-1.5"><FiMapPin /> {job.location}</p>
        <p className="inline-flex items-center gap-1.5"><FiDollarSign /> {job.salary}</p>
        <p className="inline-flex items-center gap-1.5"><FiClock /> Deadline: {job.deadline}</p>
        <p className="inline-flex items-center gap-1.5"><FiUsers /> Applications: {job.applications}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.requiredSkills.map((skill) => (
          <span key={skill} className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">{skill}</span>
        ))}
      </div>
      <p className="mt-3 text-sm text-slate-600">{job.description}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onViewApplicants(job)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50">View Applicants</button>
        <button onClick={() => onEdit(job)} className="px-4 py-2 rounded-lg bg-college-blue text-white text-sm font-semibold hover:bg-blue-800">Edit Job</button>
        <button onClick={() => onDelete(job)} className="px-4 py-2 rounded-lg border border-rose-200 text-rose-700 text-sm font-semibold hover:bg-rose-50">Delete</button>
      </div>
    </div>
  );
};

export default JobCard;

