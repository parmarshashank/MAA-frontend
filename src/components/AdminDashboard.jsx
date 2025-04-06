import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserMd, 
  FaClinicMedical, 
  FaEnvelope, 
  FaLock, 
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaUserCog
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuthStore from '../store/auth.store';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('doctors');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { createDoctor, createPharmacist, logout } = useAuthStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleLogout = () => {
    logout();
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (activeComponent === 'doctors') {
        await createDoctor(data);
        toast.success('Doctor registered successfully!');
      } else if (activeComponent === 'pharmacists') {
        await createPharmacist(data);
        toast.success('Pharmacist registered successfully!');
      }
      reset(); // Clear form after successful submission
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const sidebarVariants = {
    open: { x: 0, width: "256px" },
    closed: { x: -256, width: "0px" }
  };

  const navItems = [
    { id: 'doctors', label: 'Register Doctor', icon: FaUserMd },
    { id: 'pharmacists', label: 'Register Pharmacist', icon: FaClinicMedical },
    { id: 'settings', label: 'Settings', icon: FaUserCog },
  ];

  const renderContent = () => {
    if (activeComponent === 'settings') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-background-dark mb-4">Settings</h2>
          <p className="text-primary">Settings panel coming soon...</p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaUser className="h-5 w-5 text-primary" />
          </div>
          <input
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaEnvelope className="h-5 w-5 text-primary" />
          </div>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            placeholder="Email Address"
            className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaLock className="h-5 w-5 text-primary" />
          </div>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          {errors.password && (
            <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 bg-primary text-white rounded-lg transform transition-all focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : `Register ${activeComponent === 'doctors' ? 'Doctor' : 'Pharmacist'}`}
        </motion.button>
      </form>
    );
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
              <h2 className="text-2xl font-bold text-secondary mt-12 mb-8">Admin Panel</h2>
              
              <nav className="space-y-4">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveComponent(id)}
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
              <FaUserCog className="text-5xl text-primary" />
              <div>
                <h1 className="text-5xl font-bold text-background-dark leading-tight">
                  Admin Dashboard
                </h1>
                <h2 className="text-4xl font-bold text-primary leading-tight">
                  {activeComponent === 'doctors' ? 'Register New Doctor' : 
                   activeComponent === 'pharmacists' ? 'Register New Pharmacist' : 
                   'Settings'}
                </h2>
              </div>
            </div>
            <p className="text-xl text-primary/80 max-w-2xl">
              {activeComponent === 'doctors' ? 'Add new doctors to the system and manage their access.' :
               activeComponent === 'pharmacists' ? 'Register pharmacists and control their permissions.' :
               'Configure system settings and preferences.'}
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

export default AdminDashboard; 