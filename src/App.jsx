import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Dashboard from './components/Dashboard';
import MobileApp from './components/MobileApp';
import Partner from './components/Partner';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import { ROLES } from './utils/roles';
import useAuthStore from './store/auth.store';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import PharmacistDashboard from './components/PharmacistDashboard';
import PublicRoute from './components/PublicRoute';

// Authentication wrapper component
const AuthWrapper = ({ children }) => {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  // If user is authenticated and on login/register page, redirect to dashboard
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
    const dashboardPaths = {
      [ROLES.ADMIN]: '/admin/dashboard',
      [ROLES.DOCTOR]: '/doctor/dashboard',
      [ROLES.PHARMACIST]: '/pharmacist/dashboard'
    };
    return <Navigate to={dashboardPaths[role]} replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated, role } = useAuthStore();

  return (
    <Router>
      <ScrollToTop />
      <AuthWrapper>
        <Layout>
          <Routes>
            {/* Landing Page Route */}
            <Route path="/" element={
              isAuthenticated ? (
                <Navigate to={`/${role}/dashboard`} replace />
              ) : (
                <>
                  <Hero />
                  <About />
                  <MobileApp />
                </>
              )
            } />

            {/* Public Routes */}
            <Route path="/partner" element={<Partner />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes - Redirect to login if not authenticated */}
            <Route path="/admin/*" element={
              isAuthenticated && role === ROLES.ADMIN ? (
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="doctors" element={<div>Manage Doctors</div>} />
                  <Route path="pharmacists" element={<div>Manage Pharmacists</div>} />
                  <Route path="hospitals" element={<div>Manage Hospitals</div>} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              ) : (
                <Navigate to="/login" replace />
              )
            } />

            {/* Doctor Routes */}
            <Route path="/doctor/*" element={
              isAuthenticated && role === ROLES.DOCTOR ? (
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="patients" element={<div>Manage Patients</div>} />
                  <Route path="prescriptions" element={<div>Manage Prescriptions</div>} />
                  <Route path="medicines" element={<div>View Medicines</div>} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              ) : (
                <Navigate to="/login" replace />
              )
            } />

            {/* Pharmacist Routes */}
            <Route path="/pharmacist/*" element={
              isAuthenticated && role === ROLES.PHARMACIST ? (
                <Routes>
                  <Route path="dashboard" element={<PharmacistDashboard />} />
                  <Route path="medicines" element={<div>Manage Medicines</div>} />
                  <Route path="inventory" element={<div>Manage Inventory</div>} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              ) : (
                <Navigate to="/login" replace />
              )
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthWrapper>
    </Router>
  );
}

export default App;
