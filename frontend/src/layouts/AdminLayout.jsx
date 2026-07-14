import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Plus,
  LayoutGrid,
  ShoppingCart,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, exact: true },
    { name: 'Products', path: '/admin/products', icon: <ShoppingBag size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <LayoutGrid size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans overflow-hidden text-slate-800">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col shadow-2xl lg:shadow-sm lg:relative z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-20 flex items-center justify-between px-8 border-b border-gray-50">
          <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-primary">HELLO</span>
            <span className="font-light text-primary italic font-serif">Fancy</span>
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-red-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">Management</p>
          <ul className="space-y-1.5">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink 
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-[13px] ${
                      isActive 
                        ? 'bg-primary/10 text-primary shadow-sm' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-slate-800'
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Logout */}
        <div className="p-6 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-red-500 transition-colors w-full p-3"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
          
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-slate-700 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <div className="hidden sm:flex items-center gap-4 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100 w-64 lg:w-96 transition-all focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-sm">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products, orders..." 
                className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" target="_blank" className="hidden md:flex items-center gap-2 bg-white text-slate-700 border border-gray-200 px-4 py-2 rounded-full text-[12px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
              <ExternalLink size={16} strokeWidth={2.5} /> View Store
            </Link>
            <Link to="/admin/products/add" className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-[12px] font-bold hover:bg-primary transition-colors shadow-sm">
              <Plus size={16} strokeWidth={2.5} /> Add Product
            </Link>
            <button className="relative text-gray-500 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer border-2 border-white">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10"></div>
          
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
