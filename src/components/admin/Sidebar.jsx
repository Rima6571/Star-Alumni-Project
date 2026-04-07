import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearAuth } from '../../utils/auth';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Briefcase,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, path: '/admin' },
  { label: 'Manage Students',  icon: Users,           path: '/admin/students' },
  { label: 'Manage Alumni',    icon: GraduationCap,   path: '/admin/alumni' },
  { label: 'Approve Jobs',     icon: Briefcase,       path: '/admin/jobs' },
  { label: 'Approve Events',   icon: Calendar,        path: '/admin/events' },
  { label: 'Reports',          icon: BarChart3,       path: '/admin/reports' },
  { label: 'Settings',         icon: Settings,        path: '/admin/settings' },
];

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-[#0F172A] text-white z-30
          flex flex-col shadow-2xl
          transition-all duration-300
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 flex-shrink-0
            ${collapsed ? 'justify-center' : ''}`}
        >
          <div className="w-9 h-9 bg-[#1E40AF] rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-bold text-white leading-tight">APCOER</p>
              <p className="text-[11px] text-blue-300">Admin Portal</p>
            </div>
          )}
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div className="mx-4 mt-4 mb-1 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Role</p>
            <p className="text-xs font-semibold text-amber-400 mt-0.5">Teacher / Administrator</p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/admin'}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl mb-0.5
                 transition-all duration-150 group
                 ${isActive
                   ? 'bg-[#1E40AF] text-white shadow-lg shadow-blue-900/30'
                   : 'text-slate-400 hover:bg-white/10 hover:text-white'}
                 ${collapsed ? 'justify-center' : ''}`
              }
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10 flex-shrink-0">
          <button
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
              text-slate-400 hover:bg-red-500/20 hover:text-red-400
              transition-all duration-150
              ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={17} />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6
            bg-[#1E40AF] rounded-full items-center justify-center
            text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;

