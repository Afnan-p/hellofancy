import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Package } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const OrderSuccess = () => {
  const { orders } = useOrders();
  const [latestOrder, setLatestOrder] = useState(null);
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(true);

  const detectSize = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    }
  }, []);

  useEffect(() => {
    // Get the most recently created order
    if (orders.length > 0) {
      setLatestOrder(orders[0]); // since we unshift into array
    }
    
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [orders]);

  if (!latestOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 flex flex-col items-center justify-center relative overflow-hidden selection:bg-primary selection:text-white">
      {showConfetti && (
        <Confetti 
          width={windowDimension.width} 
          height={windowDimension.height} 
          colors={['#E91E63', '#FCE4EC', '#F48FB1', '#C2185B']}
          recycle={false}
          numberOfPieces={400}
          gravity={0.15}
        />
      )}

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary to-pink-500 text-white flex items-center justify-center shadow-[0_15px_35px_rgba(233,30,99,0.3)] mb-8"
        >
          <Check size={48} strokeWidth={3} />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif text-center tracking-tight"
        >
          Order <span className="text-primary">Confirmed!</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 font-medium text-center mb-10 max-w-md leading-relaxed"
        >
          Thank you for your purchase, {latestOrder.customer.fullName.split(' ')[0]}. We're preparing your luxury items for delivery.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 w-full max-w-xl mb-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Order Number</div>
          <div className="text-3xl font-black text-slate-900 font-serif tracking-tight mb-8">{latestOrder.id}</div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-left bg-gray-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                <Package size={18} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</div>
                <div className="text-sm font-bold text-slate-900">Preparing to Ship</div>
              </div>
            </div>
            
            <div className="w-full sm:w-[1px] h-[1px] sm:h-10 bg-gray-200"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                <span className="font-serif font-bold text-lg leading-none mt-0.5">₹</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount Paid</div>
                <div className="text-sm font-bold text-slate-900">₹{latestOrder.total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-bold px-10 py-4 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:bg-black transition-all group">
            Continue Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
