import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuthStore from '../store/auth.store';

const Register = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [loading, setLoading] = useState(false);

  const { register: registerField, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await register({
        name: data.name,
        email: data.email,
        password: data.password
      });
      
      toast.success('Admin registration successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-primary animate-fadeIn">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-background-dark">Create Admin Account</h2>
        <p className="text-primary mb-6">Please fill in your details to register as an administrator</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="relative group animate-slideUp">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="h-5 w-5 text-primary" />
              </div>
              <input
                {...registerField('name', {
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
            <div className="relative group animate-slideUp">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="h-5 w-5 text-primary" />
              </div>
              <input
                {...registerField('email', {
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
            <div className="relative group animate-slideUp">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="h-5 w-5 text-primary" />
              </div>
              <input
                {...registerField('password', {
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
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-background-dark text-white rounded-lg transform hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Admin Account'}
          </motion.button>

          <p className="text-center text-background-dark/70">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-hover">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register; 