import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHospital, FaUsers, FaPills, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Partner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitted(true);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const plans = [
    {
      name: "Basic",
      price: "$499/month",
      features: [
        "Up to 1000 patients",
        "Basic analytics",
        "Email support",
        "Standard integrations"
      ]
    },
    {
      name: "Standard",
      price: "$999/month",
      features: [
        "Up to 5000 patients",
        "Advanced analytics",
        "Priority support",
        "Custom integrations"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited patients",
        "Full analytics suite",
        "24/7 dedicated support",
        "Full API access"
      ]
    }
  ];

  const statistics = [
    { icon: <FaPills />, value: "93%", label: "Medication Adherence" },
    { icon: <FaUsers />, value: "50+", label: "Partner Hospitals" },
    { icon: <FaChartLine />, value: "87%", label: "Patient Satisfaction" },
    { icon: <FaHospital />, value: "45%", label: "Reduced Missed Doses" }
  ];

  const testimonials = [
    {
      quote: "MAA has revolutionized how we manage patient medications. The impact on adherence rates has been remarkable.",
      author: "Dr. Sarah Johnson",
      role: "Chief of Medicine, City General Hospital"
    },
    {
      quote: "The integration was seamless, and the support team is exceptional. Our nurses love the intuitive interface.",
      author: "Mark Thompson",
      role: "IT Director, Memorial Healthcare"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EAE0D2] to-[#A68763]/10 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 bg-white/80 rounded-2xl shadow-lg max-w-2xl mx-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-[#A68763] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-white text-4xl">✓</span>
          </motion.div>
          <h2 className="text-4xl font-bold text-[#2D2D2D] mb-4">Thank You!</h2>
          <p className="text-xl text-[#2D2D2D]/80 mb-6">
            Our team will contact you soon.
          </p>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-[#A68763] font-medium"
          >
            Redirecting to homepage in {countdown} seconds...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAE0D2] to-[#A68763]/10">
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-[#2D2D2D] mb-6"
          >
            Partner with MAA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#2D2D2D]/80 max-w-3xl mx-auto"
          >
            Join leading healthcare institutions in revolutionizing medication management
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-md"
              >
                <div className="text-[#A68763] text-3xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-[#2D2D2D] mb-2">{stat.value}</div>
                <div className="text-[#2D2D2D]/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2D2D2D] mb-12">
            Flexible & Scalable Partnership Model
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">{plan.name}</h3>
                <div className="text-3xl font-bold text-[#A68763] mb-6">{plan.price}</div>
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-[#2D2D2D]/80">
                      <span className="mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2D2D2D] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Partners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 p-8 rounded-xl"
              >
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-[#A68763]">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-[#2D2D2D] mb-12">
            Get in Touch with Our Team
          </h2>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#2D2D2D] mb-2">Organization Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  required
                  onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[#2D2D2D] mb-2">Contact Person Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  required
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[#2D2D2D] mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[#2D2D2D] mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-lg"
                  required
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-[#2D2D2D] mb-2">Message</label>
              <textarea
                className="w-full p-3 border rounded-lg h-32"
                required
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#A68763] text-white py-4 rounded-lg font-semibold 
                       hover:bg-[#8B7355] transition-colors duration-300"
              type="submit"
            >
              Submit Inquiry
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Partner;