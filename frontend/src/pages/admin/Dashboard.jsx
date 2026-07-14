import { useState, useEffect } from 'react';
import { Package, TrendingUp, Users, IndianRupee, MoreVertical, ArrowUpRight } from 'lucide-react';
import api from '../../utils/api';
import { useProducts } from '../../context/ProductContext';

const Dashboard = () => {
  const { products } = useProducts();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentOrders: [],
    pendingOrders: 0,
    deliveredOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch admin stats', error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-emerald-500 bg-emerald-50';
      case 'processing': return 'text-blue-500 bg-blue-50';
      case 'shipped': return 'text-purple-500 bg-purple-50';
      case 'cancelled': return 'text-red-500 bg-red-50';
      default: return 'text-amber-500 bg-amber-50'; // pending
    }
  };

  if (loading) return <div className="p-10 flex items-center justify-center font-bold text-gray-500 text-lg h-64 animate-pulse">Loading Live Data...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: <IndianRupee size={20} className="text-emerald-500" />, trend: 'Live', color: 'bg-emerald-50' },
          { title: 'Total Orders', value: stats.totalOrders, icon: <TrendingUp size={20} className="text-blue-500" />, trend: 'Live', color: 'bg-blue-50' },
          { title: 'Active Products', value: stats.totalProducts, icon: <Package size={20} className="text-primary" />, trend: 'Live', color: 'bg-pink-50' },
          { title: 'Customers', value: stats.totalUsers, icon: <Users size={20} className="text-purple-500" />, trend: 'Live', color: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">
                <ArrowUpRight size={12} /> {stat.trend}
              </div>
            </div>
            <h3 className="text-sm text-gray-500 font-bold mb-1">{stat.title}</h3>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Orders</h3>
            <button className="text-[12px] font-bold text-primary hover:text-secondary transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {stats.recentOrders.map((order) => (
                  <tr key={order._id || order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">
                      #{order._id ? order._id.slice(-6).toUpperCase() : order.id?.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {order.user?.name || order.customer?.fullName || 'Guest'}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">
                      ₹{(order.totalPrice || order.total || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
                {stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium">No recent orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50">
            <h3 className="font-bold text-slate-900">Top Selling</h3>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {products.slice(0, 4).map(product => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{product.name}</h4>
                  <p className="text-[12px] text-gray-500 font-medium">{product.category}</p>
                </div>
                <div className="font-bold text-primary text-sm">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
