import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d2d2d] via-[#D7C9AE] to-[#A68763] flex items-center">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <h2 className="text-xl font-medium italic text-[#EAE0D2]">
              Maa hai na!
            </h2>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Personal 
              <span className="text-[#EAE0D2]"> Medication </span>
              Assistant
            </h1>
            
            <p className="text-lg md:text-xl text-[#EAE0D2]/90 max-w-xl">
            Are you tired of outdated paper systems and missed prescriptions? MAA streamlines medication management for hospitals with automated reminders, real-time tracking, and seamless patient coordination. Upgrade to smarter healthcare today!
            </p>
            
            <Link to="/partner">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#A68763] hover:bg-[#8B7355] text-white font-semibold 
                  px-8 py-4 rounded-lg shadow-lg transition-colors duration-300"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-full h-[600px] bg-[#EAE0D2]/10 rounded-2xl backdrop-blur-sm
              border border-white/20 flex items-center justify-center">
              <img 
                src="/p1.webp"
                alt="MAA App Mockup" 
                className="w-full h-full object-cover rounded-2xl" 
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
