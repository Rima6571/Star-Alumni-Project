import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

const AlumniLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-72">
        <TopNavbar onToggleSidebar={() => setMobileOpen((prev) => !prev)} />
        <main className="min-h-[calc(100vh-4rem)] p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AlumniLayout;

