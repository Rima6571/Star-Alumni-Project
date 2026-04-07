import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Target, Eye, CheckCircle2, TrendingUp, ArrowRight, Users, Building2 } from 'lucide-react';

const timelineData = [
  { year: '2003', event: 'APCOER founded. First batch of 120 engineering students enrolled.' },
  { year: '2007', event: 'First graduating batch of 120 engineers launched their careers.' },
  { year: '2012', event: 'Alumni Association formally established. 500+ alumni registered.' },
  { year: '2016', event: 'Alumni portal launched. 2,000+ alumni connected online.' },
  { year: '2019', event: 'Mentorship program launched — 200+ mentor-mentee pairs formed.' },
  { year: '2022', event: 'Crossed 5,000 registered alumni. 150+ companies in network.' },
  { year: '2025', event: '10,000+ alumni milestone. Expanded portal with job board & events.' },
];

const studentBenefits = [
  'Access career guidance from experienced alumni',
  'Browse and apply for jobs posted by alumni',
  'Get mentorship from industry professionals',
  'Attend exclusive alumni-hosted workshops & webinars',
  'Receive internship referrals from alumni',
  'Expand your professional network before graduation',
];

const alumniBenefits = [
  'Give back to your alma mater community',
  'Post job openings for current students',
  'Offer mentorship to the next generation',
  'Reconnect with batchmates and professors',
  'Attend alumni events & annual meets',
  'Enhance your personal brand and visibility',
];

const About = () => {
  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-accent-gold text-sm font-semibold uppercase tracking-widest mb-4">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="text-accent-gold">APCOER</span> Alumni Portal
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Connecting generations of APCOER engineers — a platform built to bridge students
            with alumni for knowledge, opportunities, and lifelong community bonds.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 60 240 0 0 20V60Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* 1. About APCOER */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-college-blue text-sm font-semibold uppercase tracking-widest mb-3">
                The College
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue mb-5">
                About APCOER
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Anantrao Pawar College of Engineering &amp; Research (APCOER)</strong>, established in 2003,
                is a premier engineering institution affiliated with Savitribai Phule Pune University,
                located at Paud Road, Pune, Maharashtra.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The college offers undergraduate and postgraduate programs across Computer Engineering,
                Information Technology, Electronics &amp; Telecommunication, Mechanical, and Civil Engineering.
                APCOER is NAAC accredited and known for its industry-focused curriculum and placement record.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Over two decades, APCOER has produced 10,000+ engineers who are now leading teams at
                top global companies including Google, Microsoft, Amazon, Infosys, TCS, and many startups.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-college-blue font-semibold hover:text-blue-800 transition-colors text-sm">
                Visit Campus <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: GraduationCap, label: 'Est. Year', value: '2003', color: 'bg-blue-50 text-college-blue' },
                { icon: Users, label: 'Alumni', value: '10,000+', color: 'bg-amber-50 text-amber-600' },
                { icon: Building2, label: 'Departments', value: '8+', color: 'bg-green-50 text-green-600' },
                { icon: TrendingUp, label: 'Placement Rate', value: '90%+', color: 'bg-purple-50 text-purple-600' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center card-hover">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${item.color} rounded-xl mb-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-2xl font-black text-dark-blue">{item.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Purpose */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-college-blue text-sm font-semibold uppercase tracking-widest mb-3">
            Our Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue mb-6">
            Why the Alumni Portal Exists
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            The APCOER Alumni Portal was built with one goal: to transform individual success stories
            into collective opportunities. We believe that when alumni share their knowledge and
            networks, every student succeeds faster.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              { emoji: '🌐', title: 'Connect', desc: 'Bridge the gap between students and experienced professionals from the same institution.' },
              { emoji: '🚀', title: 'Accelerate', desc: 'Reduce time-to-employment through referrals, mentorship, and insider job postings.' },
              { emoji: '💡', title: 'Inspire', desc: "Show students what's possible through real success stories from their own campus." },
            ].map((item) => (
              <div key={item.title} className="bg-light-bg rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-dark-blue mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-dark-blue to-college-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-accent-gold rounded-xl p-2">
                  <Eye className="w-6 h-6 text-dark-blue" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To become India's most active and impactful college alumni network — where every graduate
                of APCOER is one connection away from their next opportunity, and every student has a
                mentor to guide them from day one.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-accent-gold rounded-xl p-2">
                  <Target className="w-6 h-6 text-dark-blue" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Foster lifelong connections between APCOER graduates',
                  'Accelerate student career growth through referrals & mentorship',
                  'Create a centralised platform for jobs, events, and knowledge',
                  'Celebrate and amplify alumni achievements',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. Benefits */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-college-blue text-sm font-semibold uppercase tracking-widest mb-3">
              Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue mb-4">
              Built for Everyone in the APCOER Family
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Students */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-college-blue rounded-xl p-2">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark-blue">For Students</h3>
              </div>
              <ul className="space-y-3">
                {studentBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-gray-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-college-blue mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link to="/register?role=student" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-college-blue hover:text-blue-800 transition-colors">
                Join as Student <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Alumni */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-accent-gold rounded-xl p-2">
                  <Building2 className="w-6 h-6 text-dark-blue" />
                </div>
                <h3 className="text-2xl font-bold text-dark-blue">For Alumni</h3>
              </div>
              <ul className="space-y-3">
                {alumniBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-gray-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link to="/register?role=alumni" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-gold hover:text-yellow-600 transition-colors">
                Join as Alumni <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Growth Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-accent-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-blue">
              Alumni Growth Timeline
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-college-blue to-accent-gold -translate-x-1/2" />

            <div className="space-y-8">
              {timelineData.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-14 md:ml-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className={`bg-light-bg rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow inline-block w-full text-left`}>
                      <span className="text-college-blue font-bold text-sm">{item.year}</span>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.event}</p>
                    </div>
                  </div>

                  {/* Node */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-accent-gold border-2 border-white shadow-md -translate-x-1/2 mt-5" />

                  {/* Empty side for desktop */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

