import { NavLink } from 'react-router-dom';
import {
  FiCalendar,
  FiGrid,
  FiBriefcase,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiSearch,
  FiPlusSquare,
  FiX,
} from 'react-icons/fi';
import { clearAuth } from '../utils/auth';

const menuItems = [
  { label: 'Dashboard', to: '/alumni/dashboard', icon: FiGrid },
  { label: 'My Profile', to: '/alumni/profile', icon: FiUser },
  { label: 'Search Students', to: '/alumni/search-students', icon: FiSearch },
  { label: 'Post Job', to: '/alumni/post-job', icon: FiPlusSquare },
  { label: 'My Job Posts', to: '/alumni/my-jobs', icon: FiBriefcase },
  { label: 'Create Event', to: '/alumni/create-event', icon: FiPlusSquare },
  { label: 'My Events', to: '/alumni/my-events', icon: FiCalendar },
  { label: 'Mentorship Requests', to: '/alumni/mentorship-requests', icon: FiUserCheck },
  { label: 'Messages', to: '/alumni/messages', icon: FiMessageSquare },
  { label: 'Settings', to: '/alumni/settings', icon: FiSettings },
];

const Sidebar = ({ mobileOpen, onClose }) => {
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
        className={`fixed left-0 top-0 z-40 flex h-full w-72 flex-col bg-[#0F172A] text-slate-200 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-300">APCOER Alumni Portal</p>
            <h1 className="text-lg font-semibold text-white">Alumni Dashboard</h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
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
                      ? 'bg-blue-700 text-white shadow-lg shadow-blue-900/35'
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
          onClick={() => {
            clearAuth();
            window.location.href = '/login';
          }}
          className="m-3 flex items-center gap-3 rounded-xl border border-slate-700 px-3 py-2.5 text-sm text-slate-300 transition hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-200"
        >
          <FiLogOut />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;

