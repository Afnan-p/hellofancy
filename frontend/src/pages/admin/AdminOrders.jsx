import { useState, useEffect } from 'react';
import { Package, Search, ChevronDown, CheckCircle, Clock, Truck, XCircle, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrders } from '../../context/OrderContext';

const AdminOrders = () => {
  const { orders, updateOrderStatus, refreshOrders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    if (refreshOrders) {
      refreshOrders();
    }
  }, []);

  const statuses = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];

  const getStatusBadge = (status) => {
    switch(status) {
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
    switch(status) {
      case 'Pending': return <Clock size={14} className="mr-1.5" />;
      case 'Delivered': return <CheckCircle size={14} className="mr-1.5" />;
      case 'Cancelled': return <XCircle size={14} className="mr-1.5" />;
      case 'Shipped': return <Truck size={14} className="mr-1.5" />;
      default: return <Package size={14} className="mr-1.5" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setActiveDropdown(null);
  };

  return (
    <div className="p-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif tracking-tight mb-2">Orders</h1>
          <p className="text-gray-500 font-medium">Manage and track customer orders</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 shrink-0">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Order ID, Name or Phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto premium-scrollbar pb-1 md:pb-0">
          <button 
            onClick={() => setStatusFilter('All')}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all shrink-0 ${statusFilter === 'All' ? 'bg-slate-900 text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            All Orders
          </button>
          {['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all shrink-0 ${statusFilter === status ? 'bg-slate-900 text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Orders Found</h3>
            <p className="text-gray-500">We couldn't find any orders matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto premium-scrollbar">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="text-left py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total</th>
                  <th className="text-left py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-pink-50/30 transition-colors">
                    <td className="py-5 px-6">
                      <span className="font-bold text-slate-900">{order.id}</span>
                      <div className="text-[11px] text-gray-500 mt-1">{order.items.length} items</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-slate-800">{order.customer.fullName}</div>
                        {order.isGuest ? (
                          <span className="bg-gray-100 text-gray-500 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Guest</span>
                        ) : (
                          <span className="bg-purple-100 text-purple-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Registered</span>
                        )}
                      </div>
                      {!order.isGuest && order.registeredUser && (
                        <div className="text-[10px] font-medium text-purple-600 mb-1">
                          Acc: {order.registeredUser.email}
                        </div>
                      )}
                      <div className="text-xs text-slate-700 font-medium mt-1">📞 {order.customer.phone}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                        {order.customer.address}, {order.customer.pincode}
                      </div>
                      {order.customer.notes && (
                        <div className="text-[10px] bg-yellow-50 text-yellow-700 px-2 py-1 rounded inline-block mt-1 truncate max-w-[150px]" title={order.customer.notes}>
                          Note: {order.customer.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-5 px-6">
                      <div className="text-sm font-medium text-slate-700">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="font-bold text-slate-900">₹{order.total.toFixed(2)}</span>
                    </td>
                    <td className="py-5 px-6 relative">
                      
                      {/* Status Dropdown Trigger */}
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === order.id ? null : order.id)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${getStatusBadge(order.status)} border-transparent hover:border-current/20`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                        <ChevronDown size={12} className="ml-2 opacity-70" />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeDropdown === order.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-6 top-14 w-40 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-20 py-2"
                          >
                            {statuses.map(s => (
                              <button
                                key={s}
                                onClick={() => handleStatusUpdate(order.id, s)}
                                className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${s === order.status ? 'bg-pink-50 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-slate-900'}`}
                              >
                                {s}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminOrders;
