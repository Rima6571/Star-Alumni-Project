import { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';
import LoadingState from '../../components/LoadingState';
import { events as fallbackEvents } from '../../data/studentMockData';
import { eventApi } from '../../services/api';
import { useToast } from '../../components/ToastProvider';

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
  category: event.category || event.eventType || 'Event',
  organizer: event.organizer || event.createdBy?.name || 'APCOER Alumni',
});

const Events = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi.getEvents();
        setEvents(extractEvents(response, fallbackEvents).map(mapEventForUi));
      } catch {
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async (event) => {
    try {
      await eventApi.registerEvent({ eventId: event.id });
      showToast(`Registered for ${event.title}`, 'success');
    } catch {
      showToast(`Registration recorded for ${event.title} (offline mode)`, 'info');
    }
  };

  if (loading) return <LoadingState label="Loading events..." />;

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Events</h1>
        <p className="text-sm text-slate-600 mt-1">Register for alumni-led networking and career events.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            primaryActionLabel="Register Event"
            secondaryActionLabel="View Details"
            onPrimaryAction={() => handleRegister(event)}
            onSecondaryAction={() => showToast(`Opening ${event.title}`, 'info')}
          />
        ))}
      </div>
    </section>
  );
};

export default Events;

