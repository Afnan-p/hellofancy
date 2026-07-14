import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Clock, CheckCircle, Truck, XCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const TrackOrder = () => {
  const { orders } = useOrders();
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const trackingSteps = [
    { status: 'Pending', label: 'Order Placed', icon: Clock },
    { status: 'Confirmed', label: 'Confirmed', icon: CheckCircle },
    { status: 'Packed', label: 'Packed', icon: Package },
    { status: 'Shipped', label: 'Shipped', icon: Truck },
    { status: 'Delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    setIsSearching(true);
    setSearchedOrder(null);

    // Simulate network delay for premium feel
    setTimeout(() => {
      const foundOrder = orders.find(o => 
        o.id.toLowerCase() === orderId.trim().toLowerCase() && 
        o.customer.phone === phone.trim()
      );

      if (foundOrder) {
        setSearchedOrder(foundOrder);
      } else {
        setError("We couldn't find an order matching that ID and phone number. Please check and try again.");
      }
      setIsSearching(false);
    }, 800);
  };

  const getStepStatus = (currentStatus, stepStatus) => {
    if (currentStatus === 'Cancelled') return 'cancelled';
    
    const currentIndex = trackingSteps.findIndex(s => s.status === currentStatus);
    const stepIndex = trackingSteps.findIndex(s => s.status === stepStatus);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 selection:bg-primary selection:text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-8 justify-center">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">Track Order</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif tracking-tight">Track Your <span className="text-primary">Order</span></h1>
          <p className="text-gray-500 font-medium max-w-md mx-auto">Enter your Order ID and the phone number used during checkout to track your delivery status.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 relative z-10">
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Order ID</label>
              <input 
                type="text" 
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD-1234"
                className="w-full bg-gray-50 border-0 rounded-2xl py-4 px-5 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full bg-gray-50 border-0 rounded-2xl py-4 px-5 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-end">
              <button 
                type="submit"
                disabled={isSearching}
                className="w-full md:w-auto h-[56px] bg-slate-900 text-white font-bold px-8 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:bg-black transition-all flex justify-center items-center gap-2 group disabled:opacity-70"
              >
                {isSearching ? 'Searching...' : (
                  <>Track <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </div>
          </form>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100 flex items-center gap-3"
            >
              <XCircle size={18} /> {error}
            </motion.div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {searchedOrder && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(233,30,99,0.05)] border border-pink-50 relative overflow-hidden"
            >
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-100 pb-8">
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Summary</div>
                  <div className="text-2xl font-black text-slate-900 font-serif tracking-tight">{searchedOrder.id}</div>
                  <div className="text-sm text-gray-500 mt-1">Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-2xl md:text-right">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</div>
                  <div className="text-xl font-bold text-primary">₹{searchedOrder.total.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 mt-1">{searchedOrder.items.length} items</div>
                </div>
              </div>

              {searchedOrder.status === 'Cancelled' ? (
                <div className="bg-red-50 rounded-2xl p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <XCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Order Cancelled</h3>
                  <p className="text-gray-600 max-w-sm">This order has been cancelled. Please contact support if you have any questions.</p>
                </div>
              ) : (
                <div className="relative pt-4 pb-12">
                  {/* Timeline connecting line */}
                  <div className="absolute top-8 left-4 md:left-8 right-4 md:right-8 h-[2px] bg-gray-100 hidden sm:block"></div>
                  
                  {/* Mobile timeline line */}
                  <div className="absolute top-8 bottom-8 left-7 w-[2px] bg-gray-100 block sm:hidden"></div>

                  <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-4 relative z-10">
                    {trackingSteps.map((step, index) => {
                      const status = getStepStatus(searchedOrder.status, step.status);
                      const Icon = step.icon;
                      
                      return (
                        <div key={step.status} className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 flex-1 relative z-10 group">
                          
                          {/* Active Line Overlays */}
                          {status === 'completed' && index < trackingSteps.length - 1 && (
                            <div className="absolute top-5 left-1/2 w-full h-[2px] bg-primary hidden sm:block"></div>
                          )}
                          {status === 'completed' && index < trackingSteps.length - 1 && (
                            <div className="absolute top-5 left-3 h-full w-[2px] bg-primary block sm:hidden"></div>
                          )}

                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-[3px] transition-all duration-500 bg-white relative z-10 ${
                            status === 'completed' ? 'border-primary text-primary' : 
                            status === 'current' ? 'border-primary bg-primary text-white shadow-[0_0_20px_rgba(233,30,99,0.3)]' : 
                            'border-gray-200 text-gray-300'
                          }`}>
                            <Icon size={16} strokeWidth={status === 'current' ? 2.5 : 2} />
                          </div>
                          
                          <div className={`sm:text-center ${status === 'pending' ? 'opacity-50' : ''}`}>
                            <div className={`text-sm font-bold ${status === 'current' ? 'text-primary' : 'text-slate-900'}`}>
                              {step.label}
                            </div>
                            {status === 'current' && (
                              <div className="text-[10px] font-bold text-primary uppercase tracking-wider mt-1 hidden sm:block">Current Stage</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-slate-900 mb-6">Order Items</h3>
                <div className="space-y-4">
                  {searchedOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-16 h-16 rounded-xl bg-white overflow-hidden shrink-0 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1 leading-tight mb-1">{item.name}</h4>
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Qty: {item.quantity}</div>
                        <div className="text-sm font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default TrackOrder;
