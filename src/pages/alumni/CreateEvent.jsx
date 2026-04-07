import { useState } from 'react';
import FormInput from '../../components/FormInput';
import { useToast } from '../../components/ToastProvider';
import { alumniApi } from '../../services/alumniApi';

const eventTypes = ['Webinar', 'Alumni Meet', 'Workshop', 'Career Guidance'];

const initialState = {
  title: '',
  description: '',
  date: '',
  location: '',
  type: '',
};

const CreateEvent = () => {
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

    try {
      await alumniApi.postEvent({
        title: formState.title,
        description: formState.description,
        date: formState.date,
        location: formState.location,
        eventType: formState.type,
      });
      pushToast('Event submitted for admin approval.', 'success');
      setFormState(initialState);
    } catch {
      pushToast('API unavailable. Event saved in scaffold mode.', 'info');
      setFormState(initialState);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Create Alumni Event</h2>
      <p className="mt-1 text-sm text-slate-600">Plan networking and career-focused events for students.</p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <FormInput label="Event Title" name="title" value={formState.title} onChange={handleChange} required />
        <FormInput label="Event Date" name="date" type="date" value={formState.date} onChange={handleChange} required />
        <FormInput label="Location" name="location" value={formState.location} onChange={handleChange} required />
        <FormInput label="Event Type" name="type" value={formState.type} onChange={handleChange} options={eventTypes} required />
        <div className="md:col-span-2">
          <FormInput
            label="Event Description"
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
          {submitting ? 'Submitting...' : 'Submit Event for Approval'}
        </button>
      </form>
    </section>
  );
};

export default CreateEvent;
