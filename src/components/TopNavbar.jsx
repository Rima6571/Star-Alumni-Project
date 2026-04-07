import { useState } from 'react';
import { FiBell, FiChevronDown, FiMenu, FiSearch, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth, getCurrentUser } from '../utils/auth';

const TopNavbar = ({ onToggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 items-center gap-3 px-4 md:px-6">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu />
        </button>

        <div className="hidden flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <FiSearch className="mr-2 text-slate-500" />
          <input
            type="text"
            placeholder="Search students, jobs, events..."
            className="w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          className="relative rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50"
          aria-label="Notifications"
        >
          <FiBell />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-amber-500" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-2 py-1.5 transition hover:bg-slate-50"
          >
            <img
              src={user?.avatar || 'https://i.pravatar.cc/80?img=22'}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="hidden text-sm font-medium text-slate-700 sm:inline">{user?.name || 'Alumni User'}</span>
            <FiChevronDown className="text-slate-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
              <Link
                to="/alumni/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setShowProfileMenu(false)}
              >
                <FiUser />
                My Profile
              </Link>
              <Link
                to="/alumni/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setShowProfileMenu(false)}
              >
                <FiSettings />
                Settings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;

