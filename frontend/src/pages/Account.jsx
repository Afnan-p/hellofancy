import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Settings, LogOut, ChevronRight, Clock, CheckCircle, Truck, MapPin, Mail, Phone, ShoppingBag, XCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // If user is not logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        // Sort by newest first
        const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user && user.role === 'customer') {
      fetchMyOrders();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusBadge = (status) => {
    const s = status || 'Pending';
    switch(s) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Confirmed': return 'bg-blue-100 text-blue-700';
      case 'Packed': return 'bg-indigo-100 text-indigo-700';
      case 'Shipped': return 'bg-purple-100 text-purple-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    const s = status || 'Pending';
    switch(s) {
      case 'Pending': return <Clock size={16} />;
      case 'Confirmed': return <CheckCircle size={16} />;
      case 'Packed': return <Package size={16} />;
      case 'Shipped': return <Truck size={16} />;
      case 'Delivered': return <CheckCircle size={16} />;
      case 'Cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 selection:bg-primary selection:text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-primary">My Account</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
            
            {/* User Profile Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-pink-500 text-white flex items-center justify-center text-3xl font-bold shadow-[0_10px_20px_rgba(233,30,99,0.2)] mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 font-serif tracking-tight">{user.name}</h2>
              <p className="text-sm font-medium text-gray-500 mb-6">{user.email}</p>
              
              <div className="w-full h-[1px] bg-gray-100 mb-6"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-colors text-sm"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>

            {/* Navigation Tabs (Desktop only, mobile will be a sticky bottom bar or simple tabs) */}
            <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 flex lg:flex-col gap-2 overflow-x-auto hide-scrollbar">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'orders' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-slate-900'
                }`}
              >
                <ShoppingBag size={18} /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'profile' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-slate-900'
                }`}
              >
                <User size={18} /> Profile Details
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              
              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 font-serif tracking-tight">Order <span className="text-primary">History</span></h1>
                    <span className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                      {orders.length} Orders
                    </span>
                  </div>

                  {loadingOrders ? (
                    <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-500 font-medium">Loading your orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag size={32} className="text-gray-300" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">No orders yet</h3>
                      <p className="text-gray-500 font-medium max-w-md mx-auto mb-8">Looks like you haven't made any purchases yet. Start exploring our luxury collections!</p>
                      <Link to="/shop" className="bg-slate-900 text-white font-bold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md hover:bg-black transition-all">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${getStatusBadge(order.orderStatus)}`}>
                                  {getStatusIcon(order.orderStatus)} {order.orderStatus || 'Pending'}
                                </span>
                              </div>
                              <div className="text-lg font-black text-slate-900 font-serif">{order._id}</div>
                              <div className="text-sm font-medium text-gray-500 mt-1">
                                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                            </div>
                            <div className="text-left sm:text-right">
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</div>
                              <div className="text-xl font-bold text-primary">₹{order.totalPrice.toFixed(2)}</div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {order.orderItems.map((item, idx) => (
                              <div key={idx} className="flex gap-4 p-3 bg-gray-50 rounded-2xl items-center">
                                <div className="w-16 h-16 rounded-xl bg-white overflow-hidden shrink-0 shadow-sm border border-gray-100">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                </div>
                                <div className="flex-1 py-1 min-w-0">
                                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">{item.name}</h4>
                                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Qty: {item.quantity || item.qty}</div>
                                  <div className="text-sm font-bold text-slate-700">₹{(item.price * (item.quantity || item.qty)).toFixed(2)}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                              <MapPin size={16} /> 
                              <span className="line-clamp-1">{order.shippingAddress?.address}, {order.shippingAddress?.postalCode}</span>
                            </div>
                            <Link 
                              to="/track-order" 
                              state={{ orderId: order._id, phone: order.shippingAddress?.phone }}
                              className="w-full sm:w-auto text-center bg-gray-50 text-slate-900 font-bold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors text-sm border border-gray-200"
                            >
                              Track Details
                            </Link>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-3xl font-bold text-slate-900 font-serif tracking-tight mb-8">Personal <span className="text-primary">Details</span></h1>
                  
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <User size={18} className="text-gray-400" />
                          <span className="font-bold text-slate-900">{user.name}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <Mail size={18} className="text-gray-400" />
                          <span className="font-bold text-slate-900">{user.email}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Account Role</label>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                          <Settings size={18} className="text-gray-400" />
                          <span className="font-bold text-slate-900 capitalize">{user.role || 'Customer'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-500">
                        * Note: To update your shipping address and phone number, please enter them during your next checkout. We will save them automatically for your future orders.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Account;
