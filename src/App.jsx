import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import PublicEvents from './pages/Events';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './components/ToastProvider';
import AlumniLayout from './layouts/AlumniLayout';
import StudentLayout from './layouts/StudentLayout';
import AlumniDashboard from './pages/alumni/AlumniDashboard';
import AlumniMyProfile from './pages/alumni/MyProfile';
import SearchStudents from './pages/alumni/SearchStudents';
import PostJob from './pages/alumni/PostJob';
import MyJobPosts from './pages/alumni/MyJobPosts';
import CreateEvent from './pages/alumni/CreateEvent';
import MyEvents from './pages/alumni/MyEvents';
import AlumniMentorshipRequests from './pages/alumni/MentorshipRequests';
import AlumniMessages from './pages/alumni/Messages';
import AlumniSettings from './pages/alumni/Settings';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentMyProfile from './pages/student/MyProfile';
import FindAlumni from './pages/student/FindAlumni';
import Jobs from './pages/student/Jobs';
import MyApplications from './pages/student/MyApplications';
import StudentEvents from './pages/student/Events';
import MyRegistrations from './pages/student/MyRegistrations';
import StudentMentorshipRequests from './pages/student/MentorshipRequests';
import StudentMessages from './pages/student/Messages';
import StudentSettings from './pages/student/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin portal
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageAlumni from './pages/admin/ManageAlumni';
import ApproveJobs from './pages/admin/ApproveJobs';
import ApproveEvents from './pages/admin/ApproveEvents';
import Reports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public pages ── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<PublicEvents />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute allowedRoles={['alumni']} />}>
            <Route path="/alumni" element={<AlumniLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AlumniDashboard />} />
              <Route path="profile" element={<AlumniMyProfile />} />
              <Route path="search-students" element={<SearchStudents />} />
              <Route path="post-job" element={<PostJob />} />
              <Route path="my-jobs" element={<MyJobPosts />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="my-events" element={<MyEvents />} />
              <Route path="mentorship-requests" element={<AlumniMentorshipRequests />} />
              <Route path="messages" element={<AlumniMessages />} />
              <Route path="settings" element={<AlumniSettings />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<StudentMyProfile />} />
              <Route path="alumni" element={<FindAlumni />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="applications" element={<MyApplications />} />
              <Route path="events" element={<StudentEvents />} />
              <Route path="registrations" element={<MyRegistrations />} />
              <Route path="mentorship" element={<StudentMentorshipRequests />} />
              <Route path="messages" element={<StudentMessages />} />
              <Route path="settings" element={<StudentSettings />} />
            </Route>
          </Route>

          {/* ── Admin / Teacher portal ── */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'teacher']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="alumni"   element={<ManageAlumni />} />
              <Route path="jobs"     element={<ApproveJobs />} />
              <Route path="events"   element={<ApproveEvents />} />
              <Route path="reports"  element={<Reports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;

