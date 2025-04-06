import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/auth.store';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuthStore();

  // If user is authenticated, redirect to their role-specific dashboard
  if (isAuthenticated) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  // If user is not authenticated, render the public route component
  return children;
};

export default PublicRoute; 