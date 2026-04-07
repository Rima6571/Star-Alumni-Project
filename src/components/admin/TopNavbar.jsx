import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronDown, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../../utils/auth';

const notifications = [
  { id: 1, text: 'New job post "SDE at TCS" pending approval', time: '2m ago',  unread: true },
  { id: 2, text: 'Alumni registered: Rahul Sharma (2019)',     time: '15m ago', unread: true },
  { id: 3, text: 'Event "Career Fair 2026" awaiting review',   time: '1h ago',  unread: false },
  { id: 4, text: 'Student Ananya Kulkarni completed profile',  time: '3h ago',  unread: false },
];

const TopNavbar = ({ collapsed, setMobileOpen, pageTitle }) => {
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [notifOpen, setNotifOpen]         = useState(false);
  const containerRef                      = useRef(null);
  const navigate                          = useNavigate();

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className={`
        fixed top-0 right-0 z-10 h-16
        bg-white border-b border-gray-200
        flex items-center px-4 lg:px-6 gap-4
        transition-all duration-300
        ${collapsed ? 'left-16' : 'left-0 lg:left-64'}
      `}
    >
      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <h1 className="text-base font-semibold text-[#0F172A] hidden sm:block whitespace-nowrap">{pageTitle}</h1>

      {/* Search */}
      <div className="flex-1 max-w-xs ml-auto sm:ml-4">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search anything…"
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF]
              transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-1" ref={containerRef}>
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">Notifications</p>
                <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50
                    ${n.unread ? 'bg-blue-50/40' : ''}`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-[#1E40AF]' : 'bg-gray-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 leading-snug">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
              <div className="px-4 py-2.5 text-center">
                <button className="text-xs text-[#1E40AF] font-semibold hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-1 pr-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#1E40AF] to-[#3b82f6] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-800 leading-tight">Admin</p>
              <p className="text-[10px] text-gray-400">Teacher</p>
            </div>
            <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-52 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@apcoer.edu.in</p>
              </div>
              <button
                onClick={() => { navigate('/admin/settings'); setDropdownOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User size={14} className="text-gray-400" /> Profile
              </button>
              <button
                onClick={() => { navigate('/admin/settings'); setDropdownOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings size={14} className="text-gray-400" /> Settings
              </button>
              <div className="border-t border-gray-100" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;

