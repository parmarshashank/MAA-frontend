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
  FaSearch,
  FaFileAlt
} from 'react-icons/fa';
import useAuthStore from '../store/auth.store';
import AskAI from './AskAI';

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [activeComponent, setActiveComponent] = useState('patients');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchPatientId, setSearchPatientId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  // Mock medicines data
  const medicines = [
    {
      id: 'MED001',
      name: "Paracetamol",
      dosage: "500mg",
      manufacturer: "ABC Pharma",
      inStock: true
    },
    {
      id: 'MED002',
      name: "Amoxicillin",
      dosage: "250mg",
      manufacturer: "XYZ Healthcare",
      inStock: true
    },
    {
      id: 'MED003',
      name: "Metformin",
      dosage: "1000mg",
      manufacturer: "Healthcare Corp",
      inStock: true
    }
  ];

  // Add frequency options
  const frequencyOptions = [
    { value: 'qd', label: 'qd - Once daily' },
    { value: 'bid', label: 'bid - Twice daily' },
    { value: 'tid', label: 'tid - Three times daily' },
    { value: 'qid', label: 'qid - Four times daily' },
    { value: 'q4h', label: 'q4h - Every 4 hours' },
    { value: 'q6h', label: 'q6h - Every 6 hours' },
    { value: 'q8h', label: 'q8h - Every 8 hours' },
    { value: 'q12h', label: 'q12h - Every 12 hours' },
    { value: 'prn', label: 'prn - As needed' },
    { value: 'ac', label: 'ac - Before meals' },
    { value: 'pc', label: 'pc - After meals' },
    { value: 'hs', label: 'hs - At bedtime' }
  ];

  // Add dosage units
  const dosageUnits = [
    { value: 'mg', label: 'mg - Milligrams' },
    { value: 'mcg', label: 'mcg - Micrograms' },
    { value: 'g', label: 'g - Grams' },
    { value: 'ml', label: 'ml - Milliliters' },
    { value: 'cc', label: 'cc - Cubic centimeters' },
    { value: 'IU', label: 'IU - International Units' },
    { value: 'tbsp', label: 'tbsp - Tablespoon' },
    { value: 'tsp', label: 'tsp - Teaspoon' }
  ];

  // Add duration options
  const durationOptions = [
    { value: 'x 7 days', label: 'For 7 days' },
    { value: 'x 10 days', label: 'For 10 days' },
    { value: 'x 5/7', label: 'For 5 days out of 7' },
    { value: 'x 3/12', label: 'For 3 months' },
    { value: 'until finished', label: 'Until finished' },
    { value: 'stat', label: 'Immediately (stat)' },
    { value: 'ad lib', label: 'As desired (ad lib)' }
  ];

  // Form data state
  const [formData, setFormData] = useState({
    medicineId: '',
    dosageAmount: '',
    dosageUnit: '',
    frequency: '',
    duration: '',
    visitNotes: ''
  });

  // Mock patients data
  const mockPatients = {
    'P001': {
      name: 'John Doe',
      age: 45,
      chronicConditions: 'Hypertension (since 2020), Type 2 Diabetes (since 2019)',
      allergies: 'Penicillin, Sulfa drugs',
      ongoingMedications: 'Amlodipine (5mg daily), Metformin (1000mg twice daily)',
      recentVisits: 'Last checkup: March 15, 2024 - Blood pressure review'
    },
    'P002': {
      name: 'Jane Smith',
      age: 32,
      chronicConditions: 'Asthma (since childhood)',
      allergies: 'No known allergies',
      ongoingMedications: 'Albuterol inhaler (as needed)',
      recentVisits: 'Last checkup: April 1, 2024 - Routine asthma review'
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePatientSearch = (e) => {
    e.preventDefault();
    const patient = mockPatients[searchPatientId];
    if (patient) {
      setSelectedPatient({ ...patient, id: searchPatientId });
    } else {
      alert('Patient not found');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrescriptions([...prescriptions, {
      ...formData,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      medicineName: medicines.find(m => m.id === formData.medicineId)?.name,
      date: new Date().toISOString()
    }]);
    setFormData({
      medicineId: '',
      dosageAmount: '',
      dosageUnit: '',
      frequency: '',
      duration: '',
      visitNotes: ''
    });
  };

  const sidebarVariants = {
    open: { x: 0, width: "256px" },
    closed: { x: -256, width: "0px" }
  };

  const PrescriptionManagement = () => (
    <div className="space-y-6">
      {!selectedPatient ? (
        // Patient Search Screen
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Search Patient</h2>
          <form onSubmit={handlePatientSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Patient ID (e.g., P001)"
              value={searchPatientId}
              onChange={(e) => setSearchPatientId(e.target.value)}
              className="flex-1 p-3 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#A68763] transition-colors"
            >
              <FaSearch />
            </button>
          </form>
        </motion.div>
      ) : (
        // Patient Details and Prescription Screen
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Patient Summary */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-[#2D2D2D]">
                  {selectedPatient.name}
                </h2>
                <p className="text-gray-600">ID: {selectedPatient.id} | Age: {selectedPatient.age}</p>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-[#A68763] hover:text-[#2D2D2D]"
              >
                Back to Search
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Chronic Conditions</h3>
                <p className="text-sm text-gray-600">{selectedPatient.chronicConditions}</p>
              </div>
              <div>
                <h3 className="font-semibold">Allergies</h3>
                <p className="text-sm text-gray-600">{selectedPatient.allergies}</p>
              </div>
              <div>
                <h3 className="font-semibold">Ongoing Medications</h3>
                <p className="text-sm text-gray-600">{selectedPatient.ongoingMedications}</p>
              </div>
              <div>
                <h3 className="font-semibold">Recent Visits</h3>
                <p className="text-sm text-gray-600">{selectedPatient.recentVisits}</p>
              </div>
            </div>
          </div>

          {/* Prescription Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">New Prescription</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                  Medicine
                </label>
                <select
                  required
                  value={formData.medicineId}
                  className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                  onChange={(e) => setFormData({...formData, medicineId: e.target.value})}
                >
                  <option value="">Select Medicine</option>
                  {medicines.map(medicine => (
                    <option key={medicine.id} value={medicine.id}>
                      {medicine.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                    Dosage Amount
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.dosageAmount}
                    className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                    onChange={(e) => setFormData({...formData, dosageAmount: e.target.value})}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                    Unit
                  </label>
                  <select
                    required
                    value={formData.dosageUnit}
                    className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                    onChange={(e) => setFormData({...formData, dosageUnit: e.target.value})}
                  >
                    <option value="">Unit</option>
                    {dosageUnits.map(unit => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                  Frequency
                </label>
                <select
                  required
                  value={formData.frequency}
                  className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                  onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                >
                  <option value="">Select Frequency</option>
                  {frequencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                  Duration
                </label>
                <select
                  required
                  value={formData.duration}
                  className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                >
                  <option value="">Select Duration</option>
                  {durationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                  Visit Notes
                </label>
                <textarea
                  value={formData.visitNotes}
                  className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763] h-24"
                  onChange={(e) => setFormData({...formData, visitNotes: e.target.value})}
                  placeholder="Add any additional notes or instructions..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#A68763] transition-colors"
              >
                Save Prescription
              </button>
            </div>
          </form>

          {/* Recent Prescriptions */}
          {prescriptions.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Recent Prescriptions</h3>
              <div className="space-y-4">
                {prescriptions.map((prescription, index) => (
                  <div key={index} className="border-l-4 border-[#A68763] pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{prescription.medicineName}</h4>
                        <p className="text-sm text-gray-600">
                          {prescription.dosageAmount} {prescription.dosageUnit}, {prescription.frequency}, {prescription.duration}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(prescription.date).toLocaleDateString()}
                      </span>
                    </div>
                    {prescription.visitNotes && (
                      <p className="text-sm text-gray-600 mt-2">{prescription.visitNotes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
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
                  onClick={() => {
                    setActiveComponent('patients');
                    setSelectedPatient(null);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeComponent === 'patients' 
                      ? 'bg-primary text-white' 
                      : 'text-secondary hover:bg-primary/20'}`}
                >
                  <FaUserInjured />
                  <span>My Patients</span>
                </button>

                <button
                  onClick={() => {
                    setActiveComponent('prescriptions');
                    setSelectedPatient(null);
                  }}
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
            <PrescriptionManagement />
          ) : activeComponent === 'prescriptions' ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-background-dark mb-4">Prescriptions History</h2>
              {prescriptions.length > 0 ? (
                <div className="space-y-4">
                  {prescriptions.map((prescription, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{prescription.patientName}</h4>
                          <p className="text-sm text-gray-600">
                            {prescription.medicineName} - {prescription.dosageAmount} {prescription.dosageUnit}
                          </p>
                          <p className="text-sm text-gray-600">
                            {prescription.frequency}, {prescription.duration}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(prescription.date).toLocaleDateString()}
                        </span>
                      </div>
                      {prescription.visitNotes && (
                        <p className="text-sm text-gray-600 mt-2 border-t pt-2">{prescription.visitNotes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No prescriptions yet.</p>
              )}
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
