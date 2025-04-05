import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSignOutAlt, 
  FaPills, 
  FaPlus, 
  FaUserMd, 
  FaCog,
  FaBars,
  FaTimes,
  FaRobot
} from 'react-icons/fa';
import AssignMedicines from './AssignMedicines';
import AddNewMedicine from './AddNewMedicine';
import AskAI from './AskAI';

const Dashboard = () => {
  const [doctorName, setDoctorName] = useState('');
  const [activeComponent, setActiveComponent] = useState('assign');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setDoctorName('Shashank Parmar');
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const sidebarVariants = {
    open: { x: 0, width: "256px" },
    closed: { x: -256, width: "0px" }
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
              <h2 className="text-2xl font-bold text-secondary mt-12 mb-8"></h2>
              
              <nav className="space-y-4">
                <button
                  onClick={() => setActiveComponent('assign')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeComponent === 'assign' 
                      ? 'bg-primary text-white' 
                      : 'text-secondary hover:bg-primary/20'}`}
                >
                  <FaPills />
                  <span>Assign Medicines</span>
                </button>

                <button
                  onClick={() => setActiveComponent('add')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeComponent === 'add' 
                      ? 'bg-primary text-white' 
                      : 'text-secondary hover:bg-primary/20'}`}
                >
                  <FaPlus />
                  <span>Add New Medicine</span>
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
                  Dr. {doctorName}
                </h2>
              </div>
            </div>
            <p className="text-xl text-primary/80 max-w-2xl">
              Manage your patients' medications efficiently and ensure the best possible care through our intuitive dashboard.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          {activeComponent === 'assign' ? (
            <AssignMedicines />
          ) : activeComponent === 'add' ? (
            <AddNewMedicine />
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
