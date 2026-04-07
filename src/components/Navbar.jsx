import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-blue/95 backdrop-blur-md shadow-lg' : 'bg-dark-blue'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-accent-gold rounded-lg p-1.5 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-dark-blue" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">APCOER</p>
              <p className="text-accent-gold text-xs font-medium leading-tight">Alumni Portal</p>
            </div>
            <div className="block sm:hidden">
              <p className="text-white font-bold text-sm">APCOER Alumni</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-accent-gold bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-medium text-white border border-white/30 rounded-lg hover:border-accent-gold hover:text-accent-gold transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-sm font-semibold text-dark-blue bg-accent-gold rounded-lg hover:bg-yellow-400 transition-all duration-200 shadow-md hover:shadow-yellow-400/30"
            >
              Register
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-dark-blue border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'text-accent-gold bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex gap-3">
            <Link
              to="/login"
              className="flex-1 py-2.5 text-center text-sm font-medium text-white border border-white/30 rounded-lg hover:border-accent-gold hover:text-accent-gold transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 py-2.5 text-center text-sm font-semibold text-dark-blue bg-accent-gold rounded-lg hover:bg-yellow-400 transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

