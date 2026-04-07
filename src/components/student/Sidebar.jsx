import { NavLink } from 'react-router-dom';
import {
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiGrid,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiUser,
  FiUsers,
} from 'react-icons/fi';

const menuItems = [
  { label: 'Dashboard', to: '/student/dashboard', icon: FiGrid },
  { label: 'My Profile', to: '/student/profile', icon: FiUser },
  { label: 'Find Alumni', to: '/student/alumni', icon: FiUsers },
  { label: 'Jobs', to: '/student/jobs', icon: FiBriefcase },
  { label: 'My Applications', to: '/student/applications', icon: FiBookOpen },
  { label: 'Events', to: '/student/events', icon: FiCalendar },
  { label: 'My Registrations', to: '/student/registrations', icon: FiCalendar },
  { label: 'Mentorship', to: '/student/mentorship', icon: FiUsers },
  { label: 'Messages', to: '/student/messages', icon: FiMessageSquare },
  { label: 'Settings', to: '/student/settings', icon: FiSettings },
];

const StudentSidebar = ({ mobileOpen, onClose, onLogout }) => {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          aria-label="Close menu overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-72 flex-col bg-[#0B132B] text-slate-200 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-slate-700 px-5 py-5">
          <p className="text-xs uppercase tracking-widest text-cyan-300">APCOER Alumni Portal</p>
          <h1 className="text-lg font-semibold text-white">Student Dashboard</h1>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="text-base" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onLogout}
          className="m-3 flex items-center gap-3 rounded-xl border border-slate-700 px-3 py-2.5 text-sm text-slate-300 transition hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-100"
        >
          <FiLogOut />
          Logout
        </button>
      </aside>
    </>
  );
};

export default StudentSidebar;
