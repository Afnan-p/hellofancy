import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistProducts, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
              Your <span className="text-primary italic font-serif font-light">Wishlist</span>
            </h1>
            <p className="text-gray-500 font-medium">
              You have <span className="font-bold text-primary">{wishlistProducts.length}</span> items saved for later.
            </p>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-[3rem] p-16 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 min-h-[50vh]">
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center text-pink-200 mb-6">
              <Heart size={40} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Looks like you haven't saved any items yet. Explore our curated collections and tap the heart icon to save your favorites.
            </p>
            <Link to="/shop" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-primary transition-colors flex items-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 duration-300">
              Explore Collections <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            <AnimatePresence>
              {wishlistProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id} 
                  className="group bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(233,30,99,0.08)] transition-all duration-500 relative flex flex-col h-full border border-transparent hover:border-pink-50"
                >
                  
                  {/* Image Area */}
                  <Link to={`/product/${product.id}`} className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50 mb-5 block">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    
                    {/* Active Wishlist Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary transition-all shadow-sm z-10 hover:scale-110"
                    >
                      <Heart size={18} strokeWidth={2.5} className="fill-primary" />
                    </button>
                  </Link>

                  {/* Details Area */}
                  <div className="flex flex-col flex-1 px-2 pb-2">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-serif text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs font-medium text-gray-500 mb-4">{product.category}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                      
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product, 1);
                        }}
                        className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-primary transition-colors text-sm shadow-md"
                      >
                        <ShoppingBag size={14} /> Add
                      </button>
                    </div>
                  </div>
                  
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
