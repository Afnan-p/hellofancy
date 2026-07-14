import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X, MapPin, Phone, Mail, ChevronDown, ChevronRight, ShieldCheck, RefreshCw, Award, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import CartDrawer from '../components/CartDrawer';
import SearchOverlay from '../components/SearchOverlay';

const CustomerLayout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const { settings } = useSettings();

  const isProductPage = location.pathname.startsWith('/product');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories', hasDropdown: true },
    { name: 'Offers', path: '/offers' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-textPrimary selection:bg-primary selection:text-white font-sans">
      
      {settings?.isAnnouncementActive && settings?.announcementText && (
        <div className="bg-primary text-white text-[11px] md:text-xs font-bold text-center py-2 px-4 shadow-sm z-50 relative overflow-hidden">
          <div className="animate-pulse">{settings.announcementText}</div>
        </div>
      )}

      {/* Premium Floating Navbar */}
      {!isProductPage && (
        <header 
          className={`fixed left-0 w-full z-50 transition-all duration-500 md:px-4 lg:px-8 ${
            scrolled ? 'top-0 md:top-2' : 'top-0 md:top-6'
          }`}
        >
        <div className={`mx-auto w-full bg-white flex justify-between items-center shadow-[0_8px_40px_rgba(0,0,0,0.04)] border-b md:border border-gray-100 transition-all duration-500 md:rounded-[2.5rem] ${
          scrolled ? 'px-4 md:px-6 lg:px-8 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'px-4 md:px-6 lg:px-10 py-3 lg:py-4'
        }`}>
          
          {/* Mobile Menu Icon (Left) */}
          <div className="lg:hidden flex items-center mr-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-800 hover:text-primary transition-colors"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-3 z-10 shrink-0">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center shadow-md">
              <span className="text-yellow-400 font-black text-[9px] md:text-[10px] tracking-wider">HELLO</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-primary font-bold text-xl md:text-2xl tracking-tight">HELLO</span>
              <span className="text-primary font-serif italic text-xl md:text-2xl">Fancy</span>
            </div>
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-[13px] font-bold flex items-center gap-1 transition-colors relative group ${
                  location.pathname === item.path ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    {item.name}
                    {item.hasDropdown && <ChevronDown size={14} className="mt-0.5" />}
                  </div>
                  <span className={`absolute -bottom-1.5 h-[2px] bg-primary transition-all duration-300 rounded-full ${
                    location.pathname === item.path ? 'w-6' : 'w-0 group-hover:w-6'
                  }`}></span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-5 sm:gap-6 z-10 shrink-0">
            <button onClick={() => setIsSearchOpen(true)} className="text-gray-700 hover:text-primary transition-transform hover:scale-105">
              <Search size={22} strokeWidth={1.5} />
            </button>
            <Link to="/wishlist" className="hidden sm:block text-gray-700 hover:text-primary transition-transform hover:scale-105 relative">
              <Heart size={22} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm border border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button onClick={toggleCart} className="text-gray-700 hover:text-primary transition-transform hover:scale-105 relative">
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user && user.role === 'customer' ? (
              <div className="relative group hidden sm:block">
                <button className="text-gray-700 hover:text-primary transition-transform hover:scale-105 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-primary flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 top-full mt-4 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                    <div className="font-bold text-sm text-slate-900 truncate">{user.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">{user.email}</div>
                  </div>
                  <div className="p-2">
                    <Link to="/account" className="block w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-100 rounded-lg transition-colors mb-1">
                      My Account
                    </Link>
                    <button onClick={logout} className="w-full text-left px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block text-gray-700 hover:text-primary transition-transform hover:scale-105">
                <User size={22} strokeWidth={1.5} />
              </Link>
            )}
            
            {/* We removed the right Menu button to avoid duplicate hamburger icons. It's now only on the left side. */}
          </div>
        </div>
      </header>
      )}

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center shadow-md">
                    <span className="text-yellow-400 font-black text-[8px] tracking-wider">HELLO</span>
                  </div>
                  <span className="text-primary font-bold text-xl tracking-tight">HELLO <i className="font-serif">Fancy</i></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col gap-2">
                {navLinks.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-[15px] font-bold p-4 rounded-2xl flex items-center justify-between transition-colors ${
                      location.pathname === item.path ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronRight size={18} className="opacity-50" />}
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-100 text-primary flex items-center justify-center font-bold text-base">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-sm hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                      <User size={18} /> My Account
                    </Link>
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full bg-white border border-gray-200 text-red-500 font-bold py-3 rounded-xl shadow-sm hover:bg-red-50 transition-colors">
                      Log Out
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-[0_8px_20px_rgba(233,30,99,0.2)] hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                    <User size={18} /> Sign In / Register
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Minimal Footer */}
      <div className="px-4 lg:px-8 pb-8 mt-auto">
        <footer className="bg-[#FFFDFE] rounded-[3rem] shadow-[0_10px_40px_rgba(233,30,99,0.03)] border border-pink-50 relative overflow-hidden">
          
          {/* Floral Watermark Decor */}
          <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-40 mix-blend-multiply">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-pink-100 fill-current">
              <path d="M45.7,117.6c-4.4-6.1-2.9-14.8,3.2-19.3c5.4-3.9,13.1-3.6,18.1,0.7c0.2-1.9,0.6-3.8,1.3-5.6 c2.9-7.5,10.6-11.6,18.3-9.5c6.2,1.7,10.6,6.9,11.5,13.2c4.1-1.2,8.4-0.8,12.2,1.3c7.5,4.2,10.2,13.6,6,21.1 c-2.4,4.2-6.5,6.8-11,7.6c0.5,2.1,0.5,4.3-0.2,6.4c-2.4,7.8-10.7,12.1-18.4,9.6c-6.8-2.2-11.1-8.5-11.1-15.5 c-3.9,1-8.1,0.5-11.7-1.4c-7.6-4.1-10.5-13.6-6.4-21.2C46.8,119.8,46.3,118.7,45.7,117.6z M52.5,101.4c-3.8,2.7-4.7,8.1-2.1,11.9 c1.2,1.7,2.8,3,4.7,3.9c1-4,3.1-7.5,6-10.2C58.6,103.8,55.6,101.7,52.5,101.4z M70.2,93.6c-5-1.4-10,1.5-11.5,6.5 c-0.6,2.2-0.6,4.5,0.1,6.7c3.6-1.5,7.6-1.6,11.3-0.2c0.2-4.1,1.5-8,3.7-11.3C72.6,94.2,71.4,93.7,70.2,93.6z M93,98.6 c-2.3-4.2-7.7-5.7-11.9-3.4c-1.9,1-3.5,2.6-4.6,4.5c4,0.6,7.7,2.4,10.5,5.2C89.5,102.2,91.8,99.8,93,98.6z M96.1,118 c1.4-4.9-1.4-10.1-6.3-11.6c-2.2-0.7-4.5-0.7-6.7-0.1c1.5,3.6,1.7,7.6,0.3,11.3c4.1,0.2,8,1.4,11.4,3.6 C95.6,120.3,96.1,119.2,96.1,118z M80.9,132.8c4.2,2.3,9.5,0.7,11.8-3.4c1.1-1.9,1.7-4,1.7-6.1c-3.9-1.5-8.2-1.6-12.2-0.2 c0.6,4,0.1,8.1-1.3,11.8C81.8,134.1,80.9,132.8,80.9,132.8z"/>
            </svg>
          </div>

          <div className="p-8 lg:p-14 relative z-10">
            <div className="flex flex-col md:flex-row lg:grid lg:grid-cols-[1.5fr_1fr_1.5fr] gap-10 lg:gap-10 mb-12">
              
              {/* Column 1: Brand */}
              <div>
                <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6">
                  <span className="text-primary">HELLO</span>
                  <span className="font-light text-primary italic font-serif">Fancy</span>
                </Link>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-8 max-w-[280px]">
                  Your premium destination for luxury lifestyle products. Curated with love, delivered with care.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-700 hover:text-primary transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-700 hover:text-primary transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-700 hover:text-primary transition-colors shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 5.5a10 10 0 0 0-3-3 10 10 0 0 0-15 0 10 10 0 0 0-3 3M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0"></path><line x1="12" y1="6" x2="12" y2="18"></line></svg> 
                  </a>
                </div>
              </div>
              
              {/* Column 2: Quick Links */}
              <div>
                <h4 className="font-bold mb-6 text-slate-800 text-[11px] tracking-widest uppercase">Quick Links</h4>
                <ul className="space-y-4 text-[13px] text-gray-600 font-medium">
                  <li><Link to="/" className="flex items-center gap-2 hover:text-primary transition-colors"><ChevronRight size={12} className="text-primary" /> Home</Link></li>
                  <li><Link to="/shop" className="flex items-center gap-2 hover:text-primary transition-colors"><ChevronRight size={12} className="text-primary" /> Shop</Link></li>
                  <li><Link to="/categories" className="flex items-center gap-2 hover:text-primary transition-colors"><ChevronRight size={12} className="text-primary" /> Categories</Link></li>
                  <li><Link to="/offers" className="flex items-center gap-2 hover:text-primary transition-colors"><ChevronRight size={12} className="text-primary" /> Offers</Link></li>
                  <li><Link to="/about" className="flex items-center gap-2 hover:text-primary transition-colors"><ChevronRight size={12} className="text-primary" /> About Us</Link></li>
                  <li><Link to="/track-order" className="flex items-center gap-2 hover:text-primary transition-colors"><ChevronRight size={12} className="text-primary" /> Track Order</Link></li>
                  <li><Link to="/contact" className="flex items-center gap-2 hover:text-primary transition-colors"><ChevronRight size={12} className="text-primary" /> Contact Us</Link></li>
                </ul>
              </div>



              {/* Column 4: Contact */}
              <div>
                <h4 className="font-bold mb-6 text-slate-800 text-[11px] tracking-widest uppercase">Contact Us</h4>
                <ul className="space-y-5 text-[13px] text-gray-600 font-medium">
                  <li className="flex items-start gap-3">
                    <Phone size={16} className="text-primary shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{settings?.supportPhone || '+91 98465 43210'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail size={16} className="text-primary shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{settings?.supportEmail || 'hello@hellofancy.com'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Truck size={16} className="text-primary shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="max-w-[200px]">Free Shipping on orders above ₹999</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-primary shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{settings?.physicalAddress || 'Kozhikode, Kerala, India'}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="pt-6 border-t border-gray-200/70 flex flex-col lg:flex-row justify-between items-center gap-6">
              
              <div className="text-[11px] font-medium text-gray-500 flex items-center">
                <Heart size={10} className="text-primary fill-primary mr-1" /> 
                &copy; 2026 <span className="text-primary ml-1 mr-1">HELLO <i className="font-serif">Fancy</i>.</span> All rights reserved.
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 text-[11px] font-bold text-gray-700">
                <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> Secure Payments</div>
                <div className="flex items-center gap-1.5"><RefreshCw size={14} className="text-primary" /> Easy Returns</div>
                <div className="flex items-center gap-1.5"><Award size={14} className="text-primary" /> 100% Original</div>
              </div>

              <div className="text-[11px] text-gray-500 font-medium">
                Designed & Developed by <span className="text-primary font-bold ml-1 text-[12px]">ZYNEXTA.AI</span>
              </div>
            </div>

          </div>
        </footer>
      </div>
      <CartDrawer />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default CustomerLayout;
