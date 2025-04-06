import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSignOutAlt, 
  FaUserInjured,
  FaPrescription,
  FaUserMd, 
  FaCog,
  FaBars,
  FaTimes,
  FaRobot,
  FaPlus,
  FaTimes as FaClose
} from 'react-icons/fa';
import useAuthStore from '../store/auth.store';
import AskAI from './AskAI';

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [activeComponent, setActiveComponent] = useState('patients');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrescribeModal, setShowPrescribeModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarVariants = {
    open: { x: 0, width: "256px" },
    closed: { x: -256, width: "0px" }
  };

  // Mock patients data
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      lastVisit: "2024-03-15",
      nextAppointment: "2024-04-15",
      condition: "Hypertension",
      status: "Stable"
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      lastVisit: "2024-03-20",
      nextAppointment: "2024-04-10",
      condition: "Diabetes Type 2",
      status: "Under Observation"
    }
  ];

  // Mock medicines data
  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      dosage: "500mg",
      manufacturer: "ABC Pharma",
      inStock: true
    },
    {
      id: 2,
      name: "Amoxicillin",
      dosage: "250mg",
      manufacturer: "XYZ Healthcare",
      inStock: true
    },
    {
      id: 3,
      name: "Metformin",
      dosage: "1000mg",
      manufacturer: "Healthcare Corp",
      inStock: true
    }
  ];

  const PrescribeModal = ({ patient, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-background-dark">
            Prescribe Medicine for {patient.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaClose />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <h3 className="font-semibold text-background-dark mb-2">Patient Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><span className="text-gray-600">Age:</span> {patient.age} years</p>
              <p><span className="text-gray-600">Condition:</span> {patient.condition}</p>
              <p><span className="text-gray-600">Status:</span> {patient.status}</p>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {medicines.map((medicine) => (
              <div
                key={medicine.id}
                className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
              >
                <h4 className="font-semibold text-background-dark">{medicine.name}</h4>
                <p className="text-sm text-gray-600">Dosage: {medicine.dosage}</p>
                <p className="text-sm text-gray-600">Manufacturer: {medicine.manufacturer}</p>
                <div className="mt-2">
                  <button className="w-full px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/80 transition-colors">
                    Select Medicine
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Save Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-background-dark">My Patients</h2>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          <FaUserInjured />
          <span>Add New Patient</span>
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-background-dark">{patient.name}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                patient.status === 'Stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {patient.status}
              </span>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="flex justify-between">
                <span>Age:</span>
                <span className="font-medium">{patient.age} years</span>
              </p>
              <p className="flex justify-between">
                <span>Last Visit:</span>
                <span className="font-medium">{patient.lastVisit}</span>
              </p>
              <p className="flex justify-between">
                <span>Next Appointment:</span>
                <span className="font-medium">{patient.nextAppointment}</span>
              </p>
              <p className="flex justify-between">
                <span>Condition:</span>
                <span className="font-medium">{patient.condition}</span>
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                View Details
              </button>
              <button 
                onClick={() => {
                  setSelectedPatient(patient);
                  setShowPrescribeModal(true);
                }}
                className="flex-1 px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors"
              >
                Prescribe
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPrescribeModal && selectedPatient && (
        <PrescribeModal 
          patient={selectedPatient} 
          onClose={() => {
            setShowPrescribeModal(false);
            setSelectedPatient(null);
          }}
        />
      )}
    </div>
  );

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
              <h2 className="text-2xl font-bold text-secondary mt-12 mb-8"></h2>
              
              <nav className="space-y-4">
                <button
                  onClick={() => setActiveComponent('patients')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeComponent === 'patients' 
                      ? 'bg-primary text-white' 
                      : 'text-secondary hover:bg-primary/20'}`}
                >
                  <FaUserInjured />
                  <span>My Patients</span>
                </button>

                <button
                  onClick={() => setActiveComponent('prescriptions')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeComponent === 'prescriptions' 
                      ? 'bg-primary text-white' 
                      : 'text-secondary hover:bg-primary/20'}`}
                >
                  <FaPrescription />
                  <span>Prescriptions</span>
                </button>

                <button
                  onClick={() => setActiveComponent('ask-ai')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeComponent === 'ask-ai' 
                      ? 'bg-primary text-white' 
                      : 'text-secondary hover:bg-primary/20'}`}
                >
                  <FaRobot />
                  <span>Ask AI Assistant</span>
                </button>

                <button
                  onClick={() => setActiveComponent('settings')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeComponent === 'settings' 
                      ? 'bg-primary text-white' 
                      : 'text-secondary hover:bg-primary/20'}`}
                >
                  <FaCog />
                  <span>Settings</span>
                </button>

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
        className={`flex-1 p-8 transition-all duration-300`}
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
              Manage your patients and provide the best possible care through our intuitive dashboard.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          {activeComponent === 'patients' ? (
            <PatientManagement />
          ) : activeComponent === 'prescriptions' ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-background-dark mb-4">Prescriptions</h2>
              <p className="text-primary">Prescription management panel coming soon...</p>
            </div>
          ) : activeComponent === 'ask-ai' ? (
            <AskAI />
          ) : (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-background-dark mb-4">Settings</h2>
              <p className="text-primary">Settings panel coming soon...</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
