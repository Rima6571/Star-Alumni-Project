import { useEffect, useState } from 'react';
import LoadingState from '../../components/LoadingState';
import ConfirmDialog from '../../components/ConfirmDialog';
import { studentApi } from '../../services/api';
import { myRegistrations as fallbackRows } from '../../data/studentMockData';
import { useToast } from '../../components/ToastProvider';

const extractRegistrations = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.events)) return data.events;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return fallback;
};

const mapRegistrationForUi = (event) => ({
  id: event._id || event.id,
  eventTitle: event.eventTitle || event.title,
  date: event.date ? new Date(event.date).toLocaleDateString() : 'N/A',
  location: event.location || 'TBD',
  status: event.status || 'Registered',
});

const MyRegistrations = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await studentApi.getMyEvents();
        setRows(extractRegistrations(response, fallbackRows).map(mapRegistrationForUi));
      } catch {
        setRows(fallbackRows);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const cancelRegistration = () => {
    if (!selected) return;
    setRows((prev) => prev.filter((item) => item.id !== selected.id));
    showToast(`Cancelled registration for ${selected.eventTitle}`, 'success');
    setSelected(null);
  };

  if (loading) return <LoadingState label="Loading your event registrations..." />;

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Event Registrations</h1>
        <p className="text-sm text-slate-600 mt-1">View and manage your event registrations.</p>
      </div>

      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
        <table className="w-full min-w-[620px]">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-slate-600">Event Title</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-600">Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-600">Location</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-600">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                <td className="px-4 py-3 text-sm text-slate-900">{row.eventTitle}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{row.date}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{row.location}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">{row.status}</span>
                </td>
                <td className="px-4 py-3 text-sm space-x-3">
                  <button className="text-college-blue font-semibold hover:underline">View Event Details</button>
                  <button onClick={() => setSelected(row)} className="text-rose-600 font-semibold hover:underline">Cancel Registration</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(selected)}
        title="Cancel registration?"
        message={`Are you sure you want to cancel ${selected?.eventTitle}?`}
        onCancel={() => setSelected(null)}
        onConfirm={cancelRegistration}
        confirmText="Cancel Registration"
      />
    </section>
  );
};

export default MyRegistrations;

