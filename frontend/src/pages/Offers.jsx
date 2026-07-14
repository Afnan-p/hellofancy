import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Offers = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Filter only products that have an offerPrice greater than 0
  const offerProducts = products.filter(p => p.offerPrice > 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20">
      
      {/* Page Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-gradient-to-r from-pink-600 to-purple-600 p-10 md:p-16 rounded-[3rem] shadow-lg relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-sm border border-white/20">
              <Tag size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white tracking-tight mb-4 leading-tight font-serif">
              Exclusive <span className="italic font-light opacity-90">Offers</span>
            </h1>
            <p className="text-white/80 font-medium max-w-xl mx-auto">
              Discover our premium selection of luxury items currently available at special discounted prices. Limited time only.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        
        {offerProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Tag size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Active Offers</h2>
            <p className="text-gray-500 mb-8 max-w-md">We currently don't have any special offers. Please check back later or explore our regular collections.</p>
            <Link to="/shop" className="bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {offerProducts.map((product) => {
              // Calculate discount percentage
              const discountPercent = Math.round(((product.price - product.offerPrice) / product.price) * 100);
              
              return (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(233,30,99,0.08)] active:scale-[0.98] transition-all duration-300 relative flex flex-col h-full border border-transparent hover:border-pink-50"
                >
                  
                  {/* Image Area */}
                  <Link to={`/product/${product.id}`} className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50 mb-5 block">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider shadow-sm border border-red-400 z-10 flex items-center gap-1">
                        <Tag size={10} /> {discountPercent}% OFF
                      </div>
                      
                      {/* Wishlist Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-4 right-4 w-9 h-9 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-sm z-10 duration-300 ${
                          isInWishlist(product.id) 
                            ? 'bg-white/90 text-primary opacity-100' 
                            : 'bg-white/80 text-gray-500 hover:text-primary hover:bg-white'
                        }`}
                      >
                        <Heart size={16} strokeWidth={2.5} className={isInWishlist(product.id) ? "fill-primary" : ""} />
                      </button>
                    </Link>

                    {/* Details Area */}
                    <div className="flex flex-col flex-1 px-2 pb-2">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center text-amber-400">
                          <Star size={12} className="fill-amber-400" />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                      </div>
                      
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs font-medium text-gray-500 mb-4">{product.category}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-red-500">₹{product.offerPrice.toLocaleString('en-IN')}</span>
                          <span className="text-xs font-medium text-gray-400 line-through ml-2">₹{product.price.toLocaleString('en-IN')}</span>
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, 1);
                          }}
                          className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary active:scale-95 transition-all shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        </button>
                      </div>
                    </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
