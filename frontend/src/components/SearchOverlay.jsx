import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import Fuse from 'fuse.js';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { products } = useProducts();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Real-time filtering using Fuse.js for typo tolerance
  const fuseOptions = {
    keys: ['name', 'category', 'description'],
    threshold: 0.3, // Adjust for fuzziness
  };
  const fuse = new Fuse(products, fuseOptions);

  const filteredProducts = query.trim() 
    ? fuse.search(query).map(result => result.item).slice(0, 8) 
    : [];

  const handleProductClick = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-xl"
        >
          {/* Top Bar with Search Input */}
          <div className="w-full border-b border-gray-100">
            <div className="container mx-auto px-4 lg:px-8 h-24 lg:h-32 flex items-center gap-4 lg:gap-8">
              <Search className="text-primary shrink-0 w-6 h-6 lg:w-10 lg:h-10" strokeWidth={2} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for luxury..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-2xl lg:text-5xl font-serif text-slate-900 placeholder:text-gray-300 placeholder:font-light"
              />
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-pink-50 transition-colors shrink-0"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16">
              {!query.trim() ? (
                // Empty State (Initial)
                <div className="flex flex-col items-center justify-center h-[40vh] text-center opacity-50">
                  <Search size={48} className="text-gray-300 mb-4" strokeWidth={1} />
                  <p className="text-xl text-gray-400 font-medium max-w-md">Type to discover our exquisite collection of jewellery, gifts, and more.</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                // Results Grid
                <div>
                  <h3 className="font-bold text-gray-500 tracking-widest uppercase text-sm mb-8">
                    Results for "{query}"
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {filteredProducts.map((product, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="group cursor-pointer"
                      >
                        <div className="w-full aspect-square rounded-2xl bg-gray-50 overflow-hidden mb-4 relative">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        </div>
                        <h4 className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-sm font-medium text-gray-500">₹{product.price.toLocaleString('en-IN')}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                // No Results State
                <div className="flex flex-col items-center justify-center h-[40vh] text-center">
                  <p className="text-2xl font-serif text-slate-800 mb-2">No results found.</p>
                  <p className="text-gray-500">We couldn't find anything matching "{query}".</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
