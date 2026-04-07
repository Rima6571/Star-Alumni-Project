import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  const resources = [
    { name: 'Alumni Directory', path: '#' },
    { name: 'Job Board', path: '#' },
    { name: 'Mentorship Program', path: '#' },
    { name: 'Success Stories', path: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-400' },
  ];

  return (
    <footer className="bg-dark-blue text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="bg-accent-gold rounded-lg p-1.5">
                <GraduationCap className="w-6 h-6 text-dark-blue" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">APCOER</p>
                <p className="text-accent-gold text-xs font-medium leading-tight">Alumni Portal</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Anantrao Pawar College of Engineering &amp; Research alumni community —
              bridging students with successful graduates for mentorship and career growth.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-gray-400 ${color} hover:bg-white/20 transition-all duration-200`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent-gold transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent-gold transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Sr. No. 1&2, Sadumbare, Paud Road, Pune – 412 108, Maharashtra, India
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                <a
                  href="mailto:alumni@apcoer.edu.in"
                  className="text-sm text-gray-400 hover:text-accent-gold transition-colors"
                >
                  alumni@apcoer.edu.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                <a
                  href="tel:+912067401000"
                  className="text-sm text-gray-400 hover:text-accent-gold transition-colors"
                >
                  +91 20 6740 1000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center">
            © {currentYear} APCOER Alumni Portal. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Anantrao Pawar College of Engineering &amp; Research, Pune
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

