import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-secondary to-primary flex items-center">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <h2 className="text-xl font-medium italic text-background-light">
              Maa hai na!
            </h2>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Personal 
              <span className="text-background-light"> Medication </span>
              Assistant
            </h1>
            
            <p className="text-lg md:text-xl text-background-light/90 max-w-xl">
            Are you tired of outdated paper systems and missed prescriptions? MAA streamlines medication management for hospitals with automated reminders, real-time tracking, and seamless patient coordination. Upgrade to smarter healthcare today!
            </p>
            
            <Link to="/partner">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary-hover text-white font-semibold 
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
            <div className="w-full h-[600px] bg-background-light/10 rounded-2xl backdrop-blur-sm
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
