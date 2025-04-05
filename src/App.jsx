import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Dashboard from './components/Dashboard';
import MobileApp from './components/MobileApp';
import Partner from './components/Partner';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const ProtectedRoute = ({ children }) => {
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <Layout onLogout={handleLogout} isAuthenticated={isAuthenticated}>
        <Routes>
          <Route path="/" element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <>
              <Hero />
              <MobileApp />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          <Route path="/partner" element={<Partner />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
