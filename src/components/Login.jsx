import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      onLogin();
      navigate('/dashboard');
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EAE0D2] to-[#A68763] animate-fadeIn">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[#2D2D2D]">Doctor Login</h2>
          <p className="text-[#A68763]">Welcome back! Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group animate-slideUp">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="h-5 w-5 text-[#A68763]" />
              </div>
              <input
                type="email"
                name="email"
                required
                className="w-full pl-10 pr-4 py-3 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763] focus:border-transparent transition-all"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>

            <div className="relative group animate-slideUp">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="h-5 w-5 text-[#A68763]" />
              </div>
              <input
                type="password"
                name="password"
                required
                className="w-full pl-10 pr-4 py-3 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763] focus:border-transparent transition-all"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 border-[#D7C9AE] rounded focus:ring-[#A68763]" />
              <span className="ml-2 text-sm text-[#2D2D2D]">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#A68763] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#2D2D2D] text-white rounded-lg transform hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-[#A68763] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
