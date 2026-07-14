import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Phone, User, Gift, ShieldCheck, ArrowRight, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useSettings } from '../context/SettingsContext';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    landmark: '',
    notes: ''
  });

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f8f9fa] pt-32 px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added any luxury items to your cart yet.</p>
        <Link to="/shop" className="bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all">
          Explore Collections
        </Link>
      </div>
    );
  }

  const shippingCost = cartTotal > 999 ? 0 : 50;
  const orderTotal = cartTotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (settings?.storeStatus === 'paused') {
      toast.error('The store is temporarily paused and not accepting new orders right now. Please try again later.');
      return;
    }

    // Create the order object
    const newOrder = {
      customer: formData,
      items: cartItems,
      subtotal: cartTotal,
      shipping: shippingCost,
      total: orderTotal,
    };

    // Save order globally (for Admin Dashboard)
    const savedOrder = await createOrder(newOrder);

    if (!savedOrder) {
      // If it failed, don't navigate to success page
      return;
    }

    // --- WhatsApp Integration ---
    // Remove all non-numeric characters (like + or spaces) from the setting
    const rawWaNumber = settings?.whatsappNumber ? settings.whatsappNumber.replace(/\D/g, '') : "918891003031";
    // Ensure it doesn't start with 0
    const businessPhone = rawWaNumber.startsWith('0') ? rawWaNumber.substring(1) : rawWaNumber;
    
    let waMessage = `✨ *NEW ORDER FROM ${settings?.storeName?.toUpperCase() || 'HELLO FANCY'}* ✨%0A%0A`;
    waMessage += `*Order ID:* ${savedOrder.id}%0A`;
    waMessage += `*Customer:* ${formData.fullName}%0A`;
    waMessage += `*Phone:* ${formData.phone}%0A%0A`;
    
    waMessage += `📦 *ORDER ITEMS:*%0A`;
    cartItems.forEach((item, index) => {
      waMessage += `${index + 1}. *${item.name}*%0A`;
      waMessage += `   Qty: ${item.quantity} x ₹${item.price.toLocaleString('en-IN')} = ₹${(item.quantity * item.price).toLocaleString('en-IN')}%0A`;
    });
    
    waMessage += `%0A💰 *BILLING:*%0A`;
    waMessage += `Subtotal: ₹${cartTotal.toLocaleString('en-IN')}%0A`;
    waMessage += `Shipping: ${shippingCost === 0 ? 'Free Delivery' : '₹' + shippingCost}%0A`;
    waMessage += `*Total Amount: ₹${orderTotal.toLocaleString('en-IN')}*%0A%0A`;
    
    waMessage += `📍 *DELIVERY DETAILS:*%0A`;
    waMessage += `${formData.address}%0A`;
    waMessage += `PIN: ${formData.pincode}%0A`;
    if(formData.landmark) waMessage += `Landmark: ${formData.landmark}%0A`;
    
    if(formData.notes) {
      waMessage += `%0A🎁 *GIFT NOTES / INSTRUCTIONS:*%0A`;
      waMessage += `${formData.notes}%0A`;
    }
    
    if(businessPhone) {
      const whatsappUrl = `https://wa.me/${businessPhone}?text=${waMessage}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert("WhatsApp number is not set! Please configure it in Checkout.jsx");
    }

    // Clear cart and redirect to success page
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="bg-[#f8f9fa] pt-28 pb-20 min-h-screen selection:bg-primary selection:text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-8">
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-primary">Checkout</span>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-10 font-serif tracking-tight">Complete Your <span className="text-primary">Order</span></h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
              {/* Decorative subtle background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Shipping Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address (Optional)</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="For order tracking updates"
                  className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 px-5 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                />
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Delivery Address</label>
                <textarea 
                  name="address"
                  required
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House/Flat No., Street, Area"
                  className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 px-5 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm resize-none premium-scrollbar"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Pincode</label>
                  <input 
                    type="text" 
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="e.g. 673001"
                    className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 px-5 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Landmark (Optional)</label>
                  <input 
                    type="text" 
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="e.g. Near City Mall"
                    className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 px-5 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-primary shrink-0">
                    <Gift size={18} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Make it Special</h2>
                </div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Gift Message / Order Notes (Optional)</label>
                <textarea 
                  name="notes"
                  rows="2"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Please write 'Happy Birthday' on the card"
                  className="w-full bg-gray-50 border-0 rounded-2xl py-3.5 px-5 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-gray-400 text-sm resize-none premium-scrollbar"
                ></textarea>
              </div>

              {/* Submit Button (Mobile visible, hidden on large screens if we want it in sidebar) */}
              <button 
                type="submit"
                className="w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(37,211,102,0.2)] hover:shadow-[0_15px_30px_rgba(37,211,102,0.3)] hover:bg-[#20bd5a] transition-all flex justify-center items-center gap-2 group lg:hidden"
              >
                Order via WhatsApp (₹{orderTotal.toFixed(2)}) <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(233,30,99,0.05)] border border-pink-50 sticky top-28">
              <h2 className="text-xl font-bold text-slate-900 mb-6 font-serif tracking-tight">Order Summary</h2>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto premium-scrollbar pr-2 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-2xl">
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

              <div className="border-t border-dashed border-gray-200 py-6 space-y-3">
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-green-500 font-bold uppercase tracking-wider text-[11px]">Free Delivery</span>
                  ) : (
                    <span className="text-slate-900">₹{shippingCost.toFixed(2)}</span>
                  )}
                </div>
                
                {cartTotal < 999 && (
                  <div className="text-[11px] font-medium text-primary bg-pink-50 px-3 py-2 rounded-lg mt-2 flex items-center gap-2">
                    <Gift size={14} /> Add ₹{(999 - cartTotal).toFixed(2)} more for Free Shipping!
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total</span>
                  <span className="text-2xl font-black text-slate-900 font-serif">₹{orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  const form = document.querySelector('form');
                  if (form.reportValidity()) {
                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                  }
                }}
                className="w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl shadow-[0_10px_25px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] transition-all flex justify-center items-center gap-2 group hidden lg:flex"
              >
                Place Order via WhatsApp <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <ShieldCheck size={14} /> Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
