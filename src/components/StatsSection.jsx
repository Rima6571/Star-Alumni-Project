import React, { useEffect, useRef, useState } from 'react';
import { Users, Building2, Briefcase, Calendar } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Alumni Worldwide',
    description: 'Graduates making an impact globally',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Building2,
    value: 500,
    suffix: '+',
    label: 'Partner Companies',
    description: 'Top companies hiring APCOER talent',
    color: 'text-accent-gold',
    bg: 'bg-amber-50',
  },
  {
    icon: Briefcase,
    value: 300,
    suffix: '+',
    label: 'Jobs Posted',
    description: 'Opportunities shared by alumni',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: Calendar,
    value: 100,
    suffix: '+',
    label: 'Events Hosted',
    description: 'Meetups, webinars & workshops',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

const useCountUp = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

const StatCard = ({ stat, inView }) => {
  const count = useCountUp(stat.value, 2000, inView);
  const Icon = stat.icon;

  return (
    <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-college-blue/20 card-hover text-center transition-all duration-300">
      <div className={`inline-flex items-center justify-center w-14 h-14 ${stat.bg} rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-7 h-7 ${stat.color}`} />
      </div>
      <div className={`text-4xl sm:text-5xl font-black ${stat.color} mb-1`}>
        {inView ? count.toLocaleString() : '0'}{stat.suffix}
      </div>
      <h3 className="text-lg font-bold text-dark-blue mb-1">{stat.label}</h3>
      <p className="text-sm text-gray-500">{stat.description}</p>
    </div>
  );
};

const StatsSection = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-dark-blue via-slate-800 to-college-blue relative overflow-hidden">
      {/* Decorative overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-accent-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            APCOER Alumni by the Numbers
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            A thriving community of engineers and leaders shaping industries worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

