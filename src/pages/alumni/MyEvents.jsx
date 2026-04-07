import { useEffect, useState } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import EventCard from '../../components/EventCard';
import LoadingState from '../../components/LoadingState';
import { useToast } from '../../components/ToastProvider';
import { alumniApi } from '../../services/alumniApi';
import { mockEvents } from './mockData';

const extractEvents = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.events)) return data.events;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return fallback;
};

const mapEventForUi = (event) => ({
  ...event,
  id: event._id || event.id,
  type: event.type || event.eventType || 'General',
  status: event.status || (event.approvedByAdmin ? 'Approved' : 'Pending'),
  registrations: typeof event.registrations === 'number' ? event.registrations : event.registeredStudents?.length || 0,
});

const MyEvents = () => {
  const { pushToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const response = await alumniApi.getMyEvents();
        setEvents(extractEvents(response, mockEvents).map(mapEventForUi));
      } catch {
        setEvents(mockEvents);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const confirmDelete = async () => {
    if (!selectedEvent) return;

    try {
      await alumniApi.deleteMyEvent(selectedEvent.id);
      setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
      pushToast('Event removed.', 'success');
    } catch {
      pushToast('Unable to delete event right now.', 'error');
    } finally {
      setSelectedEvent(null);
    }
  };

  if (loading) return <LoadingState label="Loading your events..." />;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">My Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onViewRegistrations={() => pushToast(`Viewing registrations for ${event.title}`, 'info')}
            onEdit={() => pushToast(`Editing ${event.title}`, 'info')}
            onDelete={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(selectedEvent)}
        title="Delete Event"
        message={`Are you sure you want to delete ${selectedEvent?.title || 'this event'}?`}
        onCancel={() => setSelectedEvent(null)}
        onConfirm={confirmDelete}
        confirmText="Delete"
      />
    </section>
  );
};

export default MyEvents;
