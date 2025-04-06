import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserMd, 
  FaSearch, 
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaBars
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAuthStore from '../store/auth.store';
import PatientSearch from './PatientSearch';
import PatientProfile from './PatientProfile';

const DoctorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('search');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const handlePatientSelect = (patient) => {
    if (patient) {
      setSelectedPatient(patient);
      setActiveComponent('profile');
    } else {
      toast.error('Patient not found. Please check the beneficiary ID.');
    }
  };

  const sidebarVariants = {
    open: { x: 0, width: "256px" },
    closed: { x: -256, width: "0px" }
  };

  const navItems = [
    { id: 'search', label: 'Search Patient', icon: FaSearch },
    { id: 'prescriptions', label: 'Prescriptions', icon: FaClipboardList },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const renderContent = () => {
    switch (activeComponent) {
      case 'search':
        return selectedPatient ? (
          <PatientProfile 
            patient={selectedPatient} 
            onClose={() => setSelectedPatient(null)} 
          />
        ) : (
          <PatientSearch onPatientSelect={handlePatientSelect} />
        );
      case 'prescriptions':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-background-dark mb-4">Prescriptions</h2>
            <p className="text-primary">Prescription history coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-background-dark mb-4">Settings</h2>
            <p className="text-primary">Settings panel coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-background-dark text-white hover:bg-primary transition-colors"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="bg-background-dark text-white h-screen fixed top-0 left-0 flex flex-col z-40"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-secondary mt-12 mb-8">Doctor Panel</h2>
              
              <nav className="space-y-4">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveComponent(id);
                      if (id !== 'search') setSelectedPatient(null);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                      ${activeComponent === id 
                        ? 'bg-primary text-white' 
                        : 'text-secondary hover:bg-primary/20'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}

                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg
                           bg-primary text-white font-semibold
                           hover:bg-secondary hover:text-background-dark
                           shadow-md hover:shadow-lg
                           transition-all duration-300
                           border-2 border-transparent
                           hover:border-background-dark"
                >
                  <FaSignOutAlt className="text-xl" />
                  <span>Logout</span>
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="flex-1 p-8 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? "256px" : "0px" }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-4">
              <FaUserMd className="text-5xl text-primary" />
              <div>
                <h1 className="text-5xl font-bold text-background-dark leading-tight">
                  Welcome back,
                </h1>
                <h2 className="text-4xl font-bold text-primary leading-tight">
                  Dr. {user?.name || 'Doctor'}
                </h2>
              </div>
            </div>
            <p className="text-xl text-primary/80 max-w-2xl">
              {activeComponent === 'search' 
                ? 'Search for patients and manage their prescriptions efficiently.'
                : activeComponent === 'prescriptions'
                ? 'View and manage all your prescribed medications.'
                : 'Configure your account settings and preferences.'}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          {renderContent()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DoctorDashboard; 