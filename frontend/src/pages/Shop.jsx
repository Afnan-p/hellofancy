import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Star, Heart, ShoppingBag, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCategories } from '../context/CategoryContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Highest Rated', value: 'rating' }
];

const Shop = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const location = useLocation();
  const { products } = useProducts();
  const { categories } = useCategories();
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All');
  const [activeSubCategory, setActiveSubCategory] = useState(location.state?.subCategory || 'All');
  const [sortOption, setSortOption] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(100000);

  // Sync subCategory from location state if it changes
  useEffect(() => {
    if (location.state?.subCategory) {
      setActiveSubCategory(location.state.subCategory);
    }
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  // Fix: Reset scroll position when entering the shop page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by Sub-Category
    if (activeSubCategory !== 'All') {
      result = result.filter(p => p.subCategory === activeSubCategory);
    }

    // Filter by Price
    result = result.filter(p => p.price <= priceRange);

    // Sort
    switch (sortOption) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' maintains default order, or sorts by badge existence
        result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        break;
    }

    return result;
  }, [products, activeCategory, activeSubCategory, sortOption, priceRange]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20">
      
      {/* Page Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-gradient-to-r from-pink-50 to-white p-10 md:p-16 rounded-[3rem] shadow-sm relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-slate-900 tracking-tight mb-4 leading-tight">
              Curated <span className="text-primary italic font-serif font-light">Collections</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-xl mx-auto">
              Explore our handpicked selection of premium luxury lifestyle products designed to elevate your everyday moments.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Desktop Sidebar (Filters) */}
        <div className="hidden lg:block w-[280px] shrink-0 sticky top-28 h-fit z-30">
          
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <SlidersHorizontal size={18} className="text-primary" />
              <h3 className="font-bold text-slate-800 tracking-wide uppercase text-sm">Filters</h3>
            </div>
            
            {/* Categories */}
            <div className="mb-8">
              <h4 className="font-semibold text-slate-700 mb-4 text-[13px] uppercase tracking-wider">Categories</h4>
              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto premium-scrollbar pr-2">
                <button 
                  onClick={() => {
                    setActiveCategory('All');
                    setActiveSubCategory('All'); 
                  }}
                  className={`text-left text-sm py-2 px-4 rounded-xl transition-all duration-300 ${
                    activeCategory === 'All' 
                      ? 'bg-primary/10 text-primary font-bold' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-slate-800 font-medium'
                  }`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setActiveSubCategory('All'); 
                    }}
                    className={`text-left text-sm py-2 px-4 rounded-xl transition-all duration-300 ${
                      activeCategory === cat.name 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-slate-800 font-medium'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-semibold text-slate-700 mb-4 text-[13px] uppercase tracking-wider">Max Price</h4>
              <div className="px-2">
                <input 
                  type="range" 
                  min="500" 
                  max="100000" 
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 font-medium mt-3">
                  <span>₹500</span>
                  <span className="text-primary font-bold">₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button 
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm text-sm font-bold text-slate-700 border border-gray-100"
          >
            <Filter size={16} /> Filters
          </button>
          
          <div className="text-sm font-medium text-gray-500">
            {filteredAndSortedProducts.length} Products
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">

          {/* Dynamic Sub-Category Pills */}
          {activeCategory === 'Premium Footwear' && (
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-wrap gap-3 mb-8 px-2 lg:px-0">
              {['All', 'Women\'s', 'Men\'s', 'Children\'s'].map(subCat => (
                <button
                  key={subCat}
                  onClick={() => setActiveSubCategory(subCat)}
                  className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-300 shadow-sm border ${
                    activeSubCategory === subCat
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-gray-500 border-gray-100 hover:border-slate-300 hover:text-slate-800'
                  }`}
                >
                  {subCat}
                </button>
              ))}
            </motion.div>
          )}

          {/* Top Bar (Sorting & Results) */}
          <div className="hidden lg:flex items-center justify-between bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 mb-8">
            <p className="text-sm font-medium text-gray-500 px-4">
              Showing <span className="font-bold text-slate-800">{filteredAndSortedProducts.length}</span> luxury items
            </p>
            <div className="flex items-center gap-3 pr-2">
              <span className="text-sm font-medium text-gray-500">Sort by:</span>
              <div className="relative">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-slate-700 text-sm font-bold rounded-full pl-5 pr-10 py-2.5 outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredAndSortedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(233,30,99,0.08)] active:scale-[0.98] transition-all duration-300 relative flex flex-col h-full border border-transparent hover:border-pink-50"
                >
                  
                  {/* Image Area */}
                  <Link to={`/product/${product.id}`} className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50 mb-5 block">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                        {product.badge && (
                          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-800 tracking-wider shadow-sm border border-white/50 w-fit">
                            {product.badge}
                          </div>
                        )}
                        {product.offerPrice > 0 && (
                          <div className="bg-[#ff3366] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-[#ff3366] flex items-center gap-1 w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
                            {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                          </div>
                        )}
                      </div>
                      
                      {/* Wishlist Button - Prevent link navigation when clicked */}
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
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                      </div>
                      
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs font-medium text-gray-500 mb-4">{product.category}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          {product.offerPrice > 0 ? (
                            <>
                              <span className="text-lg font-bold text-[#ff3366]">₹{product.offerPrice.toLocaleString('en-IN')}</span>
                              <span className="text-xs font-medium text-gray-400 line-through ml-2">₹{product.price.toLocaleString('en-IN')}</span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, 1);
                          }}
                          className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary active:scale-95 transition-colors shadow-md group-hover:rotate-12 duration-300"
                        >
                          <ShoppingBag size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                    
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] p-16 text-center shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
              <p className="text-gray-500 font-medium">Try adjusting your filters or price range to find what you're looking for.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setPriceRange(100000); }}
                className="mt-6 text-primary font-bold text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Filters Modal */}
      
        {mobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-50 p-6 lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h3 className="font-bold text-slate-800 text-lg">Filters & Sort</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                  <X size={16} />
                </button>
              </div>

              {/* Mobile Sort */}
              <div className="mb-8">
                <h4 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wider">Sort By</h4>
                <div className="grid grid-cols-2 gap-3">
                  {SORT_OPTIONS.map(opt => (
                    <button 
                      key={opt.value}
                      onClick={() => setSortOption(opt.value)}
                      className={`text-xs py-3 px-4 rounded-xl font-bold transition-all border ${
                        sortOption === opt.value ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wider">Categories</h4>
                <div className="space-y-3 px-2 max-h-[250px] overflow-y-auto premium-scrollbar">
                  <button 
                    onClick={() => {
                      setActiveCategory('All');
                      setActiveSubCategory('All');
                      setMobileFiltersOpen(false);
                    }}
                    className={`block w-full text-left py-2 px-4 rounded-xl text-sm transition-colors ${activeCategory === 'All' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 font-medium'}`}
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setActiveSubCategory('All');
                        setMobileFiltersOpen(false);
                      }}
                      className={`block w-full text-left py-2 px-4 rounded-xl text-sm transition-colors ${activeCategory === cat.name ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 font-medium'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Range */}
              <div className="mb-10">
                <h4 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wider">Max Price</h4>
                <div className="px-2">
                  <input 
                    type="range" min="500" max="100000" step="500"
                    value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-500 font-bold mt-3">
                    <span>₹500</span>
                    <span className="text-primary">₹{priceRange.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-gradient-primary text-white py-4 rounded-full font-bold shadow-lg"
              >
                Apply Filters ({filteredAndSortedProducts.length} Results)
              </button>
            </motion.div>
          </>
        )}
      

    </div>
  );
};

export default Shop;
