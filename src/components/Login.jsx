import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserMd, FaHospital, FaClinicMedical } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuthStore from '../store/auth.store';
import { ROLES, ROLE_LABELS, ROLE_REDIRECTS } from '../utils/roles';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      role: ROLES.DOCTOR
    }
  });

  const selectedRole = watch('role');

  const getRoleIcon = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return <FaHospital className="w-6 h-6" />;
      case ROLES.DOCTOR:
        return <FaUserMd className="w-6 h-6" />;
      case ROLES.PHARMACIST:
        return <FaClinicMedical className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login({
        email: data.email,
        password: data.password
      }, data.role);
      
      toast.success('Login successful!');
      navigate(ROLE_REDIRECTS[data.role]);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-primary animate-fadeIn">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-background-dark">Welcome Back</h2>
        <p className="text-primary mb-6">Please sign in to continue</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-4">
              {Object.values(ROLES).map((role) => (
                <label
                  key={role}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedRole === role 
                      ? 'border-primary bg-primary/10' 
                      : 'border-secondary hover:border-primary/50'}`}
                >
                  <input
                    type="radio"
                    value={role}
                    {...register('role')}
                    className="sr-only"
                  />
                  {getRoleIcon(role)}
                  <span className="mt-2 text-sm font-medium text-background-dark">
                    {ROLE_LABELS[role]}
                  </span>
                </label>
              ))}
            </div>

            {/* Email Field */}
            <div className="relative group animate-slideUp">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="h-5 w-5 text-primary" />
              </div>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Email address"
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
                type="password"
                {...register('password', {
                  required: 'Password is required',
                })}
                className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Password"
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
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>

          <p className="text-center text-background-dark/70">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
