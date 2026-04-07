import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, BookOpen, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import StatsSection from '../components/StatsSection';
import EventCard from '../components/EventCard';
import SuccessStoryCard from '../components/SuccessStoryCard';

const features = [
  {
    icon: Users,
    title: 'Alumni Network',
    description: 'Connect with thousands of APCOER alumni working across top industries worldwide. Build meaningful professional relationships.',
    color: 'college-blue',
  },
  {
    icon: Briefcase,
    title: 'Job Opportunities',
    description: 'Apply for job opportunities exclusively posted by alumni and faculty. Get a warm referral advantage when you apply.',
    color: 'accent-gold',
  },
  {
    icon: BookOpen,
    title: 'Mentorship',
    description: 'Get career guidance and mentorship from experienced alumni who navigated the same journey you are on.',
    color: 'green',
  },
  {
    icon: Calendar,
    title: 'Events & Meetups',
    description: 'Participate in alumni meetups, webinars, and networking events. Stay connected with your college community.',
    color: 'purple',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Alumni Meet 2026',
    description: 'Annual grand alumni gathering with networking, cultural programs, and felicitation ceremony for distinguished alumni.',
    date: 'March 28, 2026',
    location: 'APCOER Campus, Pune',
    organizer: 'Alumni Association',
    category: 'Alumni Meet',
  },
  {
    id: 2,
    title: 'Career Guidance Webinar',
    description: 'Interactive session with senior alumni sharing insights on career paths, emerging technologies, and growth strategies.',
    date: 'April 5, 2026',
    location: 'Online (Zoom)',
    organizer: 'Career Cell',
    category: 'Career Guidance',
  },
  {
    id: 3,
    title: 'Tech Talk by Alumni',
    description: 'Live talk by APCOER alumni working at FAANG companies — modern system design, interview prep, and real-world engineering.',
    date: 'April 12, 2026',
    location: 'Online + Campus',
    organizer: 'CSE Department',
    category: 'Tech Talk',
  },
];

const successStories = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    company: 'Google',
    batch: '2019',
    quote: 'The APCOER alumni network helped me land my first job in tech. The mentorship I received was invaluable and shaped my career trajectory.',
    linkedin: '#',
  },
  {
    name: 'Rahul Desai',
    role: 'Product Manager',
    company: 'Microsoft',
    batch: '2017',
    quote: 'I got my referral through the alumni portal. Within 3 months I was interviewing at Microsoft. This platform truly works.',
    linkedin: '#',
  },
  {
    name: 'Ananya Joshi',
    role: 'Data Scientist',
    company: 'Amazon',
    batch: '2020',
    quote: 'Alumni mentorship sessions prepared me for machine learning interviews. The guidance from senior alumni was priceless.',
    linkedin: '#',
  },
  {
    name: 'Kiran Patil',
    role: 'Startup Founder',
    company: 'TechVenture (YC W24)',
    batch: '2015',
    quote: "The alumni network gave me my first five customers and three early investors. APCOER's community is a lifelong asset.",
    linkedin: '#',
  },
];

const Home = () => {
  return (
    <main>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Features Section */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-college-blue text-sm font-semibold uppercase tracking-widest mb-3">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue mb-4">
              Everything You Need to{' '}
              <span className="text-gradient">Grow Your Career</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              APCOER Alumni Portal is built for students and alumni alike — a complete ecosystem
              for career growth and community connection.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <FeatureCard key={feat.title} {...feat} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <StatsSection />

      {/* 4. Upcoming Events Section */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-college-blue text-sm font-semibold uppercase tracking-widest mb-2">
                What's Coming
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue">
                Upcoming Events
              </h2>
            </div>
            <Link
              to="/events"
              className="group flex items-center gap-2 text-college-blue font-semibold hover:text-blue-800 transition-colors text-sm"
            >
              View All Events
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-accent-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Alumni Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue mb-4">
              Success Stories from{' '}
              <span className="text-gradient">Our Alumni</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real stories from APCOER graduates who built remarkable careers with the support of the alumni network.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStories.map((alumni) => (
              <SuccessStoryCard key={alumni.name} alumni={alumni} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-dark-blue via-slate-900 to-college-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm text-gray-300 mb-6">
            <span className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
            Join 10,000+ alumni today
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Join the APCOER Alumni{' '}
            <span className="text-accent-gold">Community</span> Today
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Whether you are a current student looking for guidance or an alumnus willing to give back —
            this is your home. Register now for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?role=student"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-college-blue font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-white/20 text-sm"
            >
              Register as Student
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register?role=alumni"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-accent-gold text-dark-blue font-bold rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-accent-gold/30 text-sm"
            >
              Register as Alumni
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

