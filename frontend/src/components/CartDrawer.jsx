import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const handleCheckoutClick = () => {
    toggleCart(); // Close the drawer
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[101] flex flex-col rounded-l-[2rem] overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShoppingBag size={18} />
                </div>
                <h2 className="font-bold text-slate-900 text-lg">Your Cart</h2>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button 
                onClick={toggleCart}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-slate-900 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto premium-scrollbar p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center text-pink-200 mb-2">
                    <ShoppingBag size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm max-w-[250px]">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors flex items-center gap-2"
                  >
                    Continue Shopping <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      {/* Item Image */}
                      <Link to={`/product/${item.id}`} onClick={toggleCart} className="shrink-0 w-24 h-24 rounded-2xl bg-gray-50 overflow-hidden relative border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </Link>
                      
                      {/* Item Details */}
                      <div className="flex flex-col flex-1 py-1">
                        <div className="flex justify-between items-start mb-1">
                          <Link to={`/product/${item.id}`} onClick={toggleCart}>
                            <h4 className="font-bold text-slate-900 text-sm hover:text-primary transition-colors line-clamp-2 pr-4">
                              {item.name}
                            </h4>
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-3">{item.category}</p>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 h-8">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-slate-900 transition-colors"
                            >-</button>
                            <span className="w-6 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-slate-900 transition-colors"
                            >+</button>
                          </div>
                          <span className="font-bold text-primary text-sm">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-slate-900">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <Link 
                  to="/checkout"
                  onClick={handleCheckoutClick}
                  className="w-full h-14 bg-slate-900 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary shadow-[0_10px_20px_rgba(233,30,99,0.15)] transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-xs text-gray-500 mt-4 font-medium">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
