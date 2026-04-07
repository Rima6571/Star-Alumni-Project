import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import TopNavbar from '../components/admin/TopNavbar';
import { ToastProvider } from '../context/ToastContext';

const pageTitles = {
  '/admin':           'Dashboard',
  '/admin/students':  'Manage Students',
  '/admin/alumni':    'Manage Alumni',
  '/admin/jobs':      'Approve Jobs',
  '/admin/events':    'Approve Events',
  '/admin/reports':   'Reports & Analytics',
  '/admin/settings':  'Settings',
};

const AdminLayout = () => {
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { pathname }                  = useLocation();
  const pageTitle                     = pageTitles[pathname] ?? 'Admin Portal';

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8FAFC] font-sans">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <TopNavbar
          collapsed={collapsed}
          setMobileOpen={setMobileOpen}
          pageTitle={pageTitle}
        />
        <main
          className={`transition-all duration-300 pt-16 min-h-screen
            ${collapsed ? 'lg:ml-16' : 'lg:ml-64'}`}
        >
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
};

export default AdminLayout;

