import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import StudentSidebar from '../components/student/Sidebar';
import StudentTopNavbar from '../components/student/TopNavbar';
import ConfirmDialog from '../components/ConfirmDialog';
import { clearAuth, getCurrentUser } from '../utils/auth';
import { useToast } from '../components/ToastProvider';

const StudentLayout = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);

  const currentUser = getCurrentUser() || {
    name: 'Student User',
    avatar: 'https://i.pravatar.cc/120?img=47',
  };

  const handleLogout = () => setLogoutDialog(true);

  const confirmLogout = () => {
    clearAuth();
    setLogoutDialog(false);
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex-1 min-w-0 lg:pl-72">
        <StudentTopNavbar
          profile={currentUser}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onLogout={handleLogout}
        />
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <ConfirmDialog
        open={logoutDialog}
        title="Confirm Logout"
        message="Are you sure you want to logout from your student account?"
        onCancel={() => setLogoutDialog(false)}
        onConfirm={confirmLogout}
        confirmText="Logout"
      />
    </div>
  );
};

export default StudentLayout;

