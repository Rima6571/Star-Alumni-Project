import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'College Address',
    lines: [
      'Sr. No. 1&2, Sadumbare,',
      'Paud Road, Pune – 412 108,',
      'Maharashtra, India',
    ],
    color: 'bg-blue-50 text-college-blue',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['alumni@apcoer.edu.in', 'info@apcoer.edu.in'],
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 20 6740 1000', '+91 20 6740 1001'],
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Monday – Friday: 9 AM – 5 PM', 'Saturday: 9 AM – 1 PM'],
    color: 'bg-purple-50 text-purple-600',
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="pt-20">
      {/* Header Banner */}
      <section className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-accent-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <span className="text-accent-gold">Contact</span> Us
          </h1>
          <p className="text-gray-300 text-lg">
            Have a question, suggestion, or want to get involved? We'd love to hear from you.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 60 240 0 0 20V60Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info — left */}
            <div className="lg:col-span-2 space-y-5">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-dark-blue mb-2">Contact Information</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Reach out to the Alumni Portal team or visit APCOER at the address below.
                </p>
              </div>

              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className={`inline-flex items-center justify-center w-11 h-11 ${item.color} rounded-xl shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-blue text-sm mb-1">{item.title}</h4>
                      {item.lines.map((line) => (
                        <p key={line} className="text-gray-500 text-sm">{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Form — right */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-gray-100">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-blue mb-2">Message Sent!</h3>
                    <p className="text-gray-500 mb-6">
                      Thank you for reaching out. We'll get back to you within 1–2 business days.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                      className="px-6 py-2.5 bg-college-blue text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-7">
                      <div className="bg-college-blue rounded-xl p-2">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-dark-blue">Send Us a Message</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-college-blue/30 transition-all ${
                              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-college-blue'
                            }`}
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-college-blue/30 transition-all ${
                              errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-college-blue'
                            }`}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-college-blue/30 transition-all ${
                            errors.subject ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-college-blue'
                          }`}
                        />
                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Write your message here..."
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-college-blue/30 transition-all resize-none ${
                            errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-college-blue'
                          }`}
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        <p className="text-xs text-gray-400 mt-1 text-right">{form.message.length} characters</p>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-college-blue text-white font-semibold rounded-xl hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Embed */}
      <section className="py-0">
        <div className="w-full h-80 sm:h-96 bg-gray-200 relative overflow-hidden">
          <iframe
            title="APCOER Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2558876396266!2d73.75430897507624!3d18.520284682577674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfb1cb30b765%3A0x3b02a75b9d3c06d8!2sAnantrao%20Pawar%20College%20of%20Engineering%20%26%20Research!5e0!3m2!1sen!2sin!4v1720000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </section>
    </main>
  );
};

export default Contact;

