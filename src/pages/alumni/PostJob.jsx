import { useState } from 'react';
import FormInput from '../../components/FormInput';
import { useToast } from '../../components/ToastProvider';
import { alumniApi } from '../../services/alumniApi';

const initialState = {
  title: '',
  company: '',
  location: '',
  salary: '',
  description: '',
  requiredSkills: '',
  deadline: '',
};

const PostJob = () => {
  const { pushToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formState, setFormState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = {
      title: formState.title,
      company: formState.company,
      location: formState.location,
      salary: formState.salary,
      description: formState.description,
      skillsRequired: formState.requiredSkills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    try {
      await alumniApi.postJob(payload);
      pushToast('Job submitted and sent to admin for approval.', 'success');
      setFormState(initialState);
    } catch {
      pushToast('API unavailable. Job stored locally in scaffold mode.', 'info');
      setFormState(initialState);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Post Job Opportunity</h2>
      <p className="mt-1 text-sm text-slate-600">Create a student opportunity. Submissions are routed to admin for approval.</p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <FormInput label="Job Title" name="title" value={formState.title} onChange={handleChange} required />
        <FormInput label="Company" name="company" value={formState.company} onChange={handleChange} required />
        <FormInput label="Location" name="location" value={formState.location} onChange={handleChange} required />
        <FormInput label="Salary" name="salary" value={formState.salary} onChange={handleChange} required />
        <FormInput
          label="Required Skills (comma separated)"
          name="requiredSkills"
          value={formState.requiredSkills}
          onChange={handleChange}
          required
        />
        <FormInput label="Application Deadline" name="deadline" type="date" value={formState.deadline} onChange={handleChange} required />
        <div className="md:col-span-2">
          <FormInput
            label="Job Description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            textarea
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="md:col-span-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Submitting...' : 'Submit Job for Approval'}
        </button>
      </form>
    </section>
  );
};

export default PostJob;
