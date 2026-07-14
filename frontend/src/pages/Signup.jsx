import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await signup(name, email, password);
    if (res.success) {
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      setError(res.message);
      toast.error(res.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 flex items-center justify-center selection:bg-primary selection:text-white px-4 relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[100px] -z-10 opacity-60 -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-0 bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(233,30,99,0.05)] border border-gray-100 overflow-hidden relative z-10">
        
        {/* Right Side: Signup Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14 order-2 md:order-1">
          
          <div className="md:hidden flex items-center gap-2 mb-10 justify-center">
            <span className="text-slate-900 font-bold text-2xl tracking-tighter">HELLO</span>
            <span className="font-light text-primary italic font-serif text-2xl">Fancy</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
          <p className="text-gray-500 font-medium text-sm mb-8">Join HELLO Fancy to speed up checkout and track orders easily.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
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
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>

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
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(233,30,99,0.3)] hover:shadow-[0_15px_30px_rgba(233,30,99,0.4)] hover:bg-pink-600 transition-all flex justify-center items-center gap-2 group mt-8"
            >
              Sign Up <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            Already have an account? <Link to="/login" className="text-slate-900 font-bold hover:underline">Sign In</Link>
          </div>

        </div>

        {/* Left Side: Brand Image/Text */}
        <div className="hidden md:flex w-1/2 bg-pink-50 p-12 relative overflow-hidden flex-col justify-between order-1 md:order-2">
          
          <div className="relative z-10 ml-auto">
            <Link to="/" className="text-3xl font-bold tracking-tighter flex items-center gap-2 mb-8 text-right justify-end">
              <span className="text-slate-900">HELLO</span>
              <span className="font-light text-primary italic font-serif">Fancy</span>
            </Link>
          </div>
          
          <div className="relative z-10 mb-8 text-right">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">Elevate your<br/>gifting experience.</h2>
            <p className="text-gray-500 font-medium ml-auto max-w-sm">Create an account to save your favorite luxury items and track your special gifts all in one place.</p>
          </div>
          
          <div className="relative z-10 flex items-center justify-end gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <ShieldCheck size={16} className="text-primary" /> Your data is safe with us
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
