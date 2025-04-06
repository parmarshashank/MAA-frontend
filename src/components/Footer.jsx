import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-b from-background-dark to-[#1a1a1a] py-12"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-background-light">MAA</h3>
            <p className="text-secondary/80 max-w-md">
              Your trusted ally in medication management, making healthcare more accessible and efficient.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-background-light">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-secondary/80 hover:text-background-light transition-colors">Services</a>
              <a href="#" className="text-secondary/80 hover:text-background-light transition-colors">Contact</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-background-light">Contact Us</h4>
            <div className="text-secondary/80 space-y-2">
              <p>Email: contact@maa.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-secondary/80 hover:text-background-light transition-colors">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="text-secondary/80 hover:text-background-light transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-secondary/80 hover:text-background-light transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary/80">
              &copy; {new Date().getFullYear()} MAA - My Alerting Ally. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-secondary/80 hover:text-background-light transition-colors">Privacy Policy</a>
              <a href="#" className="text-secondary/80 hover:text-background-light transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 
