import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const ALL_EVENTS = [
  {
    id: 1,
    title: 'Alumni Annual Meet 2026',
    description: 'Grand annual gathering of APCOER alumni with cultural programs, felicitation ceremony, and networking dinner.',
    date: 'March 28, 2026',
    location: 'APCOER Campus, Pune',
    organizer: 'Alumni Association',
    category: 'Alumni Meet',
  },
  {
    id: 2,
    title: 'Career Guidance Webinar — Software Engineering',
    description: 'Industry professionals share insights on landing your first software engineering job at top companies.',
    date: 'April 5, 2026',
    location: 'Online (Zoom)',
    organizer: 'Career Cell',
    category: 'Webinar',
  },
  {
    id: 3,
    title: 'Tech Talk: System Design at Scale',
    description: 'APCOER alumnus at Google shares real-world system design principles used in large-scale distributed systems.',
    date: 'April 12, 2026',
    location: 'Online + Campus Screening',
    organizer: 'CSE Department',
    category: 'Tech Talk',
  },
  {
    id: 4,
    title: 'AI/ML Workshop for Final Year Students',
    description: 'Hands-on workshop on machine learning fundamentals, model training, and deployment — led by alumni data scientists.',
    date: 'April 20, 2026',
    location: 'APCOER Lab, Building B',
    organizer: 'AI Club',
    category: 'Workshop',
  },
  {
    id: 5,
    title: 'Resume & Interview Prep Boot Camp',
    description: 'A full-day session on resume writing, mock interviews, and negotiation strategies run by alumni recruiters.',
    date: 'May 2, 2026',
    location: 'APCOER Seminar Hall',
    organizer: 'Placement Cell',
    category: 'Career Guidance',
  },
  {
    id: 6,
    title: 'Startup Founders Panel',
    description: 'Three APCOER alumni founders share their entrepreneurship journey from college idea to funded startup.',
    date: 'May 10, 2026',
    location: 'Online (YouTube Live)',
    organizer: 'E-Cell',
    category: 'Webinar',
  },
  {
    id: 7,
    title: 'DevOps & Cloud Workshop',
    description: 'Practical hands-on workshop covering Docker, Kubernetes, and CI/CD pipelines — perfect for placement preparation.',
    date: 'May 18, 2026',
    location: 'APCOER Computer Lab',
    organizer: 'IT Department',
    category: 'Workshop',
  },
  {
    id: 8,
    title: 'Batch of 2016 Reunion',
    description: 'Special reunion event for the batch of 2016 — reconnect with classmates, share memories, and celebrate 10 years.',
    date: 'June 7, 2026',
    location: 'Pune City Hotel',
    organizer: 'Batch 2016 Committee',
    category: 'Alumni Meet',
  },
  {
    id: 9,
    title: 'GATE Exam Strategy Webinar',
    description: 'alumni currently at IITs and NITs share their GATE preparation strategies and tips for post-graduation.',
    date: 'June 15, 2026',
    location: 'Online (Google Meet)',
    organizer: 'Academic Cell',
    category: 'Career Guidance',
  },
];

const CATEGORIES = ['All', 'Workshop', 'Webinar', 'Alumni Meet', 'Career Guidance', 'Tech Talk'];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ALL_EVENTS.filter((e) => {
    const matchesCategory = activeCategory === 'All' || e.category === activeCategory;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-20">
      {/* Header Banner */}
      <section className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-accent-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Upcoming & Past
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Alumni <span className="text-accent-gold">Events</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Workshops, webinars, meetups, and career sessions — all in one place.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 60 240 0 0 20V60Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="py-10 bg-light-bg border-b border-gray-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-college-blue text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-college-blue hover:text-college-blue'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative min-w-0 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-college-blue/30 focus:border-college-blue transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-dark-blue mb-2">No events found</h3>
              <p className="text-gray-500">Try a different category or search term.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-4 text-college-blue font-medium text-sm hover:text-blue-800 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Showing <strong>{filtered.length}</strong> event{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
                {searchQuery ? ` matching "${searchQuery}"` : ''}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Events;

