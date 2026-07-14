import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Mail, Calendar, ShieldCheck, User as UserIcon, X, ShoppingBag, TrendingUp, Package } from 'lucide-react';
import api from '../../utils/api';
import { useOrders } from '../../context/OrderContext';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // For the Customer Details Modal
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { orders } = useOrders();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get('/users');
        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Derived stats for selected customer
  const customerOrders = selectedCustomer 
    ? orders.filter(o => !o.isGuest && o.registeredUser?.email === selectedCustomer.email) 
    : [];
  
  const totalSpent = customerOrders.reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="p-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your registered users and view their order history.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="bg-white border border-gray-100 rounded-xl px-5 py-3 flex items-center justify-center gap-2 shadow-sm font-bold text-sm text-slate-700">
          <Users size={18} className="text-primary" />
          Total Users: {customers.length}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Customers Found</h3>
            <p className="text-gray-500">We couldn't find any users matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto premium-scrollbar">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="text-left py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="text-left py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Joined Date</th>
                  <th className="text-right py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCustomers.map((customer) => (
                  <tr 
                    key={customer._id} 
                    onClick={() => setSelectedCustomer(customer)}
                    className="hover:bg-pink-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-pink-100 text-primary flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 group-hover:text-primary transition-colors">{customer.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <Mail size={12} /> {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        customer.role === 'admin' 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {customer.role === 'admin' ? <ShieldCheck size={14} /> : <UserIcon size={14} />}
                        {customer.role}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Calendar size={16} className="text-gray-400" />
                        {new Date(customer.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <button className="text-[11px] font-bold text-primary bg-primary/10 px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Profile Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{selectedCustomer.name}</h2>
                    <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                      <Mail size={14} /> {selectedCustomer.email}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {/* VIP Stats */}
              <div className="p-6 border-b border-gray-100 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-5 border border-pink-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-pink-500 uppercase tracking-widest mb-1">Total Orders</div>
                    <div className="text-2xl font-bold text-slate-800">{customerOrders.length}</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-500">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-green-600 uppercase tracking-widest mb-1">Total Spent</div>
                    <div className="text-2xl font-bold text-slate-800">₹{totalSpent.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#f8f9fa] premium-scrollbar">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Package size={16} /> Order History
                </h3>
                
                {customerOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-3">
                      <ShoppingBag size={24} />
                    </div>
                    <p className="font-bold text-slate-700">No orders yet</p>
                    <p className="text-sm text-gray-500">This customer hasn't placed any orders while logged in.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerOrders.map(order => (
                      <div key={order.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-50">
                          <div>
                            <div className="font-bold text-slate-800 text-sm">Order ID: {order.id}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary text-lg">₹{order.total.toFixed(2)}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest mt-1 text-gray-500">
                              Status: <span className={
                                order.status === 'Delivered' ? 'text-green-500' :
                                order.status === 'Cancelled' ? 'text-red-500' : 'text-amber-500'
                              }>{order.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-gray-50 pr-4 rounded-xl overflow-hidden border border-gray-100">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                              <div>
                                <div className="text-xs font-bold text-slate-700 max-w-[150px] truncate">{item.name}</div>
                                <div className="text-[10px] font-medium text-gray-500 mt-0.5">Qty: {item.quantity} × ₹{item.price}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminCustomers;
