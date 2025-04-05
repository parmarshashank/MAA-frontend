import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaUserMd, FaHospital, FaHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "Automated Reminders",
      description: "Never miss a dose again with our smart notification system"
    },
    {
      icon: <FaUserMd className="w-8 h-8" />,
      title: "Doctor-Managed Prescriptions",
      description: "Secure and reliable tracking of patient medications"
    },
    {
      icon: <FaHospital className="w-8 h-8" />,
      title: "Seamless Integration",
      description: "Designed to work perfectly with existing hospital systems"
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "B2B-Focused",
      description: "Tailored solutions for healthcare institutions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAE0D2] to-[#A68763]/10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <motion.h1 
              className="text-5xl font-bold text-[#2D2D2D]"
              variants={fadeIn}
            >
              About MAA
            </motion.h1>
            
            <motion.h2 
              className="text-2xl text-[#A68763] font-semibold"
              variants={fadeIn}
            >
              Your Trusted Ally in Medication Management
            </motion.h2>
            
            <motion.p 
              className="text-lg text-[#2D2D2D]/80 leading-relaxed"
              variants={fadeIn}
            >
              MAA is revolutionizing medication management in healthcare institutions. 
              We provide cutting-edge solutions that streamline prescription tracking, 
              ensure medication adherence, and enhance patient care through innovative 
              technology and seamless integration.
            </motion.p>

            <motion.div 
              className="grid md:grid-cols-2 gap-6 pt-8"
              variants={fadeIn}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-[#A68763] mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#2D2D2D]/70">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="pt-8"
              variants={fadeIn}
            >
              <Link to="/partner">
                <motion.button 
                  className="bg-[#2D2D2D] text-white px-8 py-4 rounded-lg font-semibold 
                            hover:scale-105 transition-transform duration-300 
                            shadow-md hover:shadow-lg">
                  Partner with MAA
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Section - Image/Graphic */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-[#D7C9AE]/20 rounded-2xl h-[600px] w-full flex items-center justify-center">
              <p className="text-[#A68763] text-lg">
                <img src="/p3.webp" alt="p1" className='w-full h-full object-cover' />
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
