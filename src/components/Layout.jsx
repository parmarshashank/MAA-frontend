import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import Footer from './Footer';

const Layout = ({ children, onLogout, isAuthenticated }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setIsScrolled(latest > 20);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(166, 135, 99, 0)", "rgba(45, 45, 45, 0.85)"]
  );

  const headerBackdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.1)"]
  );

  const logoScale = useTransform(
    scrollY,
    [0, 100],
    [1, 0.9]
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-gradient-to-br from-background-light to-primary/10"
    >
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{ 
          background: headerBackground,
          backdropFilter: headerBackdropBlur,
          boxShadow: headerShadow,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 100,
          damping: 20
        }}
        className="fixed w-full top-0 z-50 transition-all duration-300"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="text-2xl font-bold text-background-light tracking-wider">
              MAA
            </Link>
          </motion.div>

          <div className="flex items-center space-x-8">
            <motion.nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-background-light hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-background-light hover:text-white transition-colors">
                About
              </Link>
              {!isAuthenticated && (
                <Link to="/login" className="text-background-light hover:text-white transition-colors">
                  Login
                </Link>
              )}
            </motion.nav>

            {isAuthenticated && (
              <motion.button
                onClick={onLogout}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-lg 
                         bg-primary text-white font-semibold
                         shadow-lg hover:shadow-xl
                         transition-all duration-300"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-grow pt-20" 
      >
        {children}
      </motion.main>

      {!isAuthenticated && <Footer />}
    </motion.div>
  );
};

export default Layout;
