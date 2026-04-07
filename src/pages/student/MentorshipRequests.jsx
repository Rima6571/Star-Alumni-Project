import { useEffect, useState } from 'react';
import LoadingState from '../../components/LoadingState';
import ConfirmDialog from '../../components/ConfirmDialog';
import { mentorshipRequests as fallbackRequests } from '../../data/studentMockData';
import { useToast } from '../../components/ToastProvider';
import { studentApi } from '../../services/api';

const colorByStatus = {
  Pending: 'bg-amber-50 text-amber-700',
  Accepted: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-rose-50 text-rose-700',
};

const extractRequests = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.requests)) return data.requests;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return fallback;
};

const mapRequestForUi = (request) => ({
  id: request._id || request.id,
  alumniName: request.alumniName || request.alumni?.name,
  company: request.company || request.alumni?.company || 'APCOER Alumni',
  status: request.status ? `${request.status.charAt(0).toUpperCase()}${request.status.slice(1)}` : 'Pending',
});

const MentorshipRequests = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await studentApi.getMentorshipRequests();
        setRequests(extractRequests(response, fallbackRequests).map(mapRequestForUi));
      } catch {
        setRequests(fallbackRequests);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const cancelRequest = () => {
    if (!selected) return;
    setRequests((prev) => prev.filter((item) => item.id !== selected.id));
    showToast(`Mentorship request to ${selected.alumniName} cancelled`, 'success');
    setSelected(null);
  };

  if (loading) return <LoadingState label="Loading mentorship requests..." />;

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mentorship Requests</h1>
        <p className="text-sm text-slate-600 mt-1">Track your mentorship requests and their acceptance status.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-slate-900">{request.alumniName}</h3>
            <p className="text-sm text-college-blue mt-0.5">{request.company}</p>
            <span className={`inline-block mt-3 px-2.5 py-1 rounded-full text-xs font-semibold ${colorByStatus[request.status] || 'bg-slate-100 text-slate-700'}`}>
              {request.status}
            </span>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium">View Profile</button>
              <button onClick={() => setSelected(request)} className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold">Cancel Request</button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(selected)}
        title="Cancel mentorship request?"
        message={`Are you sure you want to cancel request to ${selected?.alumniName}?`}
        onCancel={() => setSelected(null)}
        onConfirm={cancelRequest}
        confirmText="Cancel Request"
      />
    </section>
  );
};

export default MentorshipRequests;

