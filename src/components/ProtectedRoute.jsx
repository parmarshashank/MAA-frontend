import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/auth.store';
import { ROLE_PERMISSIONS } from '../utils/roles';

const ProtectedRoute = ({ children, requiredRole, requiredPermissions = [] }) => {
  const { isAuthenticated, role, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check if user has all required permissions
  if (requiredPermissions.length > 0) {
    const userPermissions = ROLE_PERMISSIONS[role] || [];
    const hasAllPermissions = requiredPermissions.every(
      permission => userPermissions.includes(permission)
    );

    if (!hasAllPermissions) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 