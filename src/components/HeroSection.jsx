import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-college-blue/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-college-blue/5 rounded-full blur-3xl" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">APCOER Alumni Network — Est. 2003</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Connect with{' '}
              <span className="text-gradient">APCOER Alumni</span>{' '}
              Network
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Build your professional network, explore career opportunities, and learn from
              successful alumni who've made their mark across industries.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register?role=student"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-accent-gold text-dark-blue font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-accent-gold/30 hover:scale-105"
              >
                <Users className="w-5 h-5" />
                Join as Student
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register?role=alumni"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-200"
              >
                <Briefcase className="w-5 h-5" />
                Join as Alumni
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { value: '10,000+', label: 'Alumni' },
                { value: '500+', label: 'Companies' },
                { value: '300+', label: 'Jobs Posted' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-accent-gold">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main circle */}
              <div className="absolute inset-0 bg-college-blue/20 rounded-full border border-white/10 backdrop-blur-sm" />

              {/* Center icon cluster */}
              <div className="absolute inset-8 bg-gradient-to-br from-college-blue/40 to-dark-blue/60 rounded-full flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <div className="text-6xl mb-3">🎓</div>
                  <p className="text-white font-bold text-lg">APCOER</p>
                  <p className="text-accent-gold text-sm">Alumni Network</p>
                </div>
              </div>

              {/* Floating cards around the circle */}
              {[
                { icon: '💼', label: 'Job Opportunities', pos: 'top-4 -right-8', delay: '0s' },
                { icon: '🤝', label: 'Mentorship', pos: '-bottom-4 left-8', delay: '0.5s' },
                { icon: '📅', label: 'Events', pos: 'top-1/2 -left-12 -translate-y-1/2', delay: '1s' },
                { icon: '🌐', label: 'Network', pos: '-top-4 left-16', delay: '1.5s' },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`absolute ${card.pos} bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg animate-pulse`}
                  style={{ animationDelay: card.delay, animationDuration: '3s' }}
                >
                  <span className="text-xl">{card.icon}</span>
                  <span className="text-white text-xs font-medium whitespace-nowrap">{card.label}</span>
                </div>
              ))}

              {/* Orbit rings */}
              <div className="absolute inset-0 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-4 rounded-full border border-accent-gold/10 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 40C480 80 240 0 0 40V80Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

