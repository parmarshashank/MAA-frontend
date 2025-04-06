import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import PublicRoute from './components/PublicRoute';

function App() {
  const { isAuthenticated, role } = useAuthStore();

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            isAuthenticated ? 
            <Navigate to={`/${role}/dashboard`} replace /> : 
            <>
              <Hero />
              <About />
              <MobileApp />
            </>
          } />
          <Route path="/partner" element={<Partner />} />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute requiredRole={ROLES.ADMIN}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="doctors" element={<div>Manage Doctors</div>} />
                <Route path="pharmacists" element={<div>Manage Pharmacists</div>} />
                <Route path="hospitals" element={<div>Manage Hospitals</div>} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Doctor Routes */}
          <Route path="/doctor/*" element={
            <ProtectedRoute requiredRole={ROLES.DOCTOR}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="patients" element={<div>Manage Patients</div>} />
                <Route path="prescriptions" element={<div>Manage Prescriptions</div>} />
                <Route path="medicines" element={<div>View Medicines</div>} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Pharmacist Routes */}
          <Route path="/pharmacist/*" element={
            <ProtectedRoute requiredRole={ROLES.PHARMACIST}>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="medicines" element={<div>Manage Medicines</div>} />
                <Route path="inventory" element={<div>Manage Inventory</div>} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
