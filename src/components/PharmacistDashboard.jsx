import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSignOutAlt, 
  FaPills, 
  FaPlus, 
  FaUserMd, 
  FaCog,
  FaBars,
  FaTimes,
  FaBoxes,
  FaClipboardList
} from 'react-icons/fa';
import useAuthStore from '../store/auth.store';
import AddNewMedicine from './AddNewMedicine';

const PharmacistDashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [activeComponent, setActiveComponent] = useState('inventory');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarVariants = {
    open: { x: 0, width: "256px" },
    closed: { x: -256, width: "0px" }
  };

  // Mock inventory data
  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      quantity: 500,
      expiryDate: "2024-12-31",
      manufacturer: "ABC Pharma",
      batchNumber: "BATCH123",
      price: 9.99,
      inStock: true
    },
    {
      id: 2,
      name: "Amoxicillin",
      quantity: 200,
      expiryDate: "2024-10-15",
      manufacturer: "XYZ Healthcare",
      batchNumber: "BATCH456",
      price: 15.99,
      inStock: true
    },
    // Add more mock data as needed
  ];

  const InventoryManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-background-dark">Medicine Inventory</h2>
        <button
          onClick={() => setActiveComponent('add')}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          <FaPlus />
          <span>Add New Medicine</span>
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-background-dark">{medicine.name}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                medicine.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {medicine.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-medium">{medicine.quantity} units</span>
              </p>
              <p className="flex justify-between">
                <span>Expiry Date:</span>
                <span className="font-medium">{medicine.expiryDate}</span>
              </p>
              <p className="flex justify-between">
                <span>Batch Number:</span>
                <span className="font-medium">{medicine.batchNumber}</span>
              </p>
              <p className="flex justify-between">
                <span>Price:</span>
                <span className="font-medium">${medicine.price}</span>
              </p>
              <p className="flex justify-between">
                <span>Manufacturer:</span>
                <span className="font-medium">{medicine.manufacturer}</span>
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                Edit
              </button>
              <button className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
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
                  onClick={() => setActiveComponent('inventory')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeComponent === 'inventory' 
                      ? 'bg-primary text-white' 
                      : 'text-secondary hover:bg-primary/20'}`}
                >
                  <FaBoxes />
                  <span>Inventory Management</span>
                </button>

                <button
                  onClick={() => setActiveComponent('orders')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${activeComponent === 'orders' 
                      ? 'bg-primary text-white' 
                      : 'text-secondary hover:bg-primary/20'}`}
                >
                  <FaClipboardList />
                  <span>Order Management</span>
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
                  {user?.name || 'Pharmacist'}
                </h2>
              </div>
            </div>
            <p className="text-xl text-primary/80 max-w-2xl">
              Manage your pharmacy's inventory and ensure efficient medicine distribution through our comprehensive dashboard.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          {activeComponent === 'inventory' ? (
            <InventoryManagement />
          ) : activeComponent === 'add' ? (
            <AddNewMedicine onBack={() => setActiveComponent('inventory')} />
          ) : activeComponent === 'orders' ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-background-dark mb-4">Order Management</h2>
              <p className="text-primary">Order management panel coming soon...</p>
            </div>
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

export default PharmacistDashboard; 