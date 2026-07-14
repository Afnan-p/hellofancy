import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If user came from a protected page, return them there after login
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await login(email, password);
    if (res.success) {
      toast.success('Welcome back to Hello Fancy!');
      if (res.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError(res.message);
      toast.error(res.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 flex items-center justify-center selection:bg-primary selection:text-white px-4 relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[100px] -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-0 bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(233,30,99,0.05)] border border-gray-100 overflow-hidden relative z-10">
        
        {/* Left Side: Brand Image/Text */}
        <div className="hidden md:flex w-1/2 bg-slate-900 p-12 relative overflow-hidden flex-col justify-between">
          <div className="absolute inset-0 opacity-20 bg-[url('/hero-bg-v2.png')] bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <Link to="/" className="text-3xl font-bold tracking-tighter flex items-center gap-2 mb-8">
              <span className="text-white">HELLO</span>
              <span className="font-light text-primary italic font-serif">Fancy</span>
            </Link>
          </div>
          
          <div className="relative z-10 mb-8">
            <h2 className="text-4xl font-serif font-bold text-white mb-6 leading-tight">Welcome back to luxury.</h2>
            <p className="text-slate-400 font-medium">Log in to track your orders, manage your wishlist, and enjoy a faster checkout experience.</p>
          </div>
          
          <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <ShieldCheck size={16} className="text-primary" /> Secure encrypted login
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14">
          
          <div className="md:hidden flex items-center gap-2 mb-10 justify-center">
            <span className="text-slate-900 font-bold text-2xl tracking-tighter">HELLO</span>
            <span className="font-light text-primary italic font-serif text-2xl">Fancy</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
          <p className="text-gray-500 font-medium text-sm mb-8">Enter your email and password to access your account.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-3 border border-red-100"
              >
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[11px] font-bold text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:bg-black transition-all flex justify-center items-center gap-2 group mt-8"
            >
              Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
