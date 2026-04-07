import { useEffect, useState } from 'react';
import LoadingState from '../../components/LoadingState';
import MentorshipCard from '../../components/MentorshipCard';
import { useToast } from '../../components/ToastProvider';
import { alumniApi } from '../../services/alumniApi';
import { mockMentorshipRequests } from './mockData';

const extractRequests = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.requests)) return data.requests;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return fallback;
};

const mapRequestForUi = (request) => ({
  ...request,
  id: request._id || request.id,
  studentName: request.studentName || request.student?.name,
  branch: request.branch || request.student?.branch,
  year: request.year || request.student?.graduationYear,
});

const MentorshipRequests = () => {
  const { pushToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      try {
        const response = await alumniApi.getMentorshipRequests();
        setRequests(extractRequests(response, mockMentorshipRequests).map(mapRequestForUi));
      } catch {
        setRequests(mockMentorshipRequests);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  const respondRequest = async (request, action) => {
    try {
      await alumniApi.respondMentorshipRequest({ requestId: request.id, action });
      pushToast(`Request ${action.toLowerCase()}ed successfully.`, 'success');
    } catch {
      pushToast(`Request ${action.toLowerCase()}ed in scaffold mode.`, 'info');
    }

    setRequests((prev) => prev.filter((item) => item.id !== request.id));
  };

  if (loading) return <LoadingState label="Loading mentorship requests..." />;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Mentorship Requests</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {requests.map((request) => (
          <MentorshipCard
            key={request.id}
            request={request}
            onAccept={() => respondRequest(request, 'Accept')}
            onDecline={() => respondRequest(request, 'Decline')}
          />
        ))}
      </div>
    </section>
  );
};

export default MentorshipRequests;
