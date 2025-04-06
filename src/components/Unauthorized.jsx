import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAuthStore from '../store/auth.store';
import { ROLE_REDIRECTS } from '../utils/roles';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  const handleBackToDashboard = () => {
    navigate(ROLE_REDIRECTS[role] || '/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-primary/10">
      <div className="text-center p-8 max-w-lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center mb-8"
        >
          <FaLock className="text-6xl text-primary" />
        </motion.div>
        
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-background-dark mb-4"
        >
          Access Denied
        </motion.h1>
        
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-background-dark/70 mb-8"
        >
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </motion.p>
        
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackToDashboard}
          className="px-8 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-hover transition-colors"
        >
          Back to Dashboard
        </motion.button>
      </div>
    </div>
  );
};

export default Unauthorized; 