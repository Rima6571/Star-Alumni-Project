import { FiBell, FiChevronDown, FiLogOut, FiMenu, FiSettings, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const StudentTopNavbar = ({ onToggleSidebar, profile, onLogout }) => {
  const safeProfile = profile || {
    name: 'Student User',
    avatar: 'https://i.pravatar.cc/120?img=47',
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
            aria-label="Open sidebar"
          >
            <FiMenu />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Student Portal</p>
            <p className="text-sm font-semibold text-slate-900">Career Growth Workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50"
            aria-label="Notifications"
          >
            <FiBell />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-amber-500" />
          </button>

          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-slate-200 px-2 py-1.5 transition hover:bg-slate-50">
              <img
                src={safeProfile.avatar || 'https://i.pravatar.cc/120?img=47'}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-sm font-medium text-slate-700 sm:inline">{safeProfile.name}</span>
              <FiChevronDown className="text-slate-500" />
            </summary>

            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
              <Link
                to="/student/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <FiUser />
                My Profile
              </Link>
              <Link
                to="/student/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <FiSettings />
                Settings
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
};

export default StudentTopNavbar;
