import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentRole } from '../utils/auth';

const ProtectedRoute = ({ allowedRoles = ['alumni'] }) => {
  const role = getCurrentRole();
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

