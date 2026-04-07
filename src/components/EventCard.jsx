import React from 'react';
import { Calendar, MapPin, User, ArrowRight } from 'lucide-react';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

const categoryColors = {
  'Alumni Meet': 'bg-blue-100 text-blue-700',
  Webinar: 'bg-purple-100 text-purple-700',
  Workshop: 'bg-green-100 text-green-700',
  'Career Guidance': 'bg-amber-100 text-amber-800',
  'Tech Talk': 'bg-rose-100 text-rose-700',
};

const EventCard = ({
  event,
  compact = false,
  primaryActionLabel = 'Register Now',
  secondaryActionLabel = '',
  onPrimaryAction,
  onSecondaryAction,
  onEdit,
  onDelete,
  onViewRegistrations,
}) => {
  const isManagementMode = Boolean(onEdit || onDelete || onViewRegistrations || event?.status || event?.registrations);

  if (isManagementMode) {
    const statusClass = event.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700';

    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
            <p className="text-sm text-slate-600">{event.type}</p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}>{event.status}</span>
        </div>

        <p className="mt-3 text-sm text-slate-600">{event.description}</p>

        <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
          <p className="inline-flex items-center gap-1.5"><FiCalendar /> {event.date}</p>
          <p className="inline-flex items-center gap-1.5"><FiMapPin /> {event.location}</p>
          <p className="inline-flex items-center gap-1.5"><FiUsers /> Registrations: {event.registrations}</p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onViewRegistrations?.(event)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            View Registrations
          </button>
          <button
            type="button"
            onClick={() => onEdit?.(event)}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Edit Event
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(event)}
            className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
          >
            Delete Event
          </button>
        </div>
      </article>
    );
  }

  const tagStyle = categoryColors[event.category] || 'bg-gray-100 text-gray-700';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-college-blue/20 card-hover transition-all duration-300 flex flex-col">
      <div className="h-1.5 bg-gradient-to-r from-college-blue to-accent-gold" />

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit ${tagStyle}`}>
          {event.category || 'Event'}
        </span>

        <h3 className="text-lg font-bold text-dark-blue mb-3 group-hover:text-college-blue transition-colors leading-snug">
          {event.title}
        </h3>

        {!compact && <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{event.description}</p>}

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-college-blue shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="w-4 h-4 text-green-500 shrink-0" />
            <span>By {event.organizer}</span>
          </div>
        </div>

        <div className="grid gap-2">
          <button
            onClick={() => onPrimaryAction?.(event)}
            className="group/btn w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-college-blue text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {primaryActionLabel}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
          {secondaryActionLabel && (
            <button
              onClick={() => onSecondaryAction?.(event)}
              className="w-full py-2.5 px-4 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

