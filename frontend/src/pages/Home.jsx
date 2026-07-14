import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Truck, Award, MessageCircle, ShieldCheck, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCategories } from '../context/CategoryContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Trending');
  const { products } = useProducts();
  const { categories } = useCategories();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="bg-background overflow-hidden">
      
      {/* 1. EXACT SCREENSHOT MATCH: HERO SECTION */}
      <section className="mx-4 lg:mx-8 mt-24 lg:mt-[104px] mb-6 relative min-h-[500px] lg:min-h-[600px] flex items-center bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-[0_10px_40px_rgba(233,30,99,0.08)]">
        
        <div className="container mx-auto px-6 lg:px-16 relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              className="z-20 flex flex-col items-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              
              {/* Curated Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-white/60 backdrop-blur-sm text-primary text-[11px] font-bold tracking-wide mb-8 shadow-sm">
                <Star size={12} className="fill-primary text-primary" /> Curated For You
              </div>
              
              <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-[-0.03em] text-slate-900 leading-[1.05] mb-6 drop-shadow-sm relative">
                The Art of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-sm relative z-10">
                  Gifting Well.
                </span>
                {/* Yellow Squiggle Highlight */}
                <svg className="absolute -bottom-1 left-0 w-full h-3 -z-10 text-yellow-400 opacity-80" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10 T 200 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-[480px] leading-relaxed font-medium">
                Discover a meticulously curated collection of luxury gifts, fine jewellery, and elegant home decor for life's most precious moments.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3.5 rounded-full text-[13px] font-bold hover:shadow-[0_10px_30px_-10px_rgba(233,30,99,0.5)] transition-all duration-300 flex items-center gap-2 group w-full sm:w-auto justify-center">
                  Shop Collection
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <Link to="/categories" className="bg-white text-primary border border-primary/20 px-8 py-3.5 rounded-full text-[13px] font-bold hover:bg-surface-pink transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center shadow-sm">
                  Explore Categories 
                  <ArrowRight size={16} className="text-primary/70 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slider Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          <div className="w-6 h-2 rounded-full bg-primary shadow-sm"></div>
          <div className="w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-colors cursor-pointer shadow-sm"></div>
          <div className="w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-colors cursor-pointer shadow-sm"></div>
        </div>
      </section>

      {/* 2. EXACT SCREENSHOT MATCH: PREMIUM CATEGORIES */}
      <section className="relative py-12 md:py-24 overflow-hidden bg-gradient-to-b from-[#FFF5F8] via-[#FFFFFF] to-[#FFF0F5]">
        
        {/* Massive Watermark Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full text-center flex justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[120px] md:text-[220px] font-bold text-gray-100/60 tracking-[0.05em] uppercase leading-none transform scale-y-105">
            CATEGORIES
          </span>
        </div>

        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-white/60 backdrop-blur-sm text-primary text-[10px] font-bold tracking-wide uppercase mb-6 shadow-sm">
                <Star size={12} className="fill-primary text-primary" /> Curated For You
              </div>
              
              <h2 className="text-4xl md:text-[3.5rem] font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight">
                Explore Categories
              </h2>
              
              <div className="relative inline-block">
                <p className="text-gray-600 font-medium text-sm md:text-base mb-6">Curated collections for every occasion.</p>
                <div className="absolute bottom-0 left-0 w-24 h-[2px] bg-gradient-to-r from-primary to-secondary"></div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 md:mt-0 mb-4">
              <Link to="/categories" className="text-[13px] font-bold text-primary flex items-center gap-2 group relative border-b-2 border-primary/20 hover:border-primary pb-1 transition-colors">
                Explore All Categories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Cards Area */}
          <div className="w-full min-h-[200px]">
            <motion.div 
              variants={staggerContainer} 
              initial="hidden" 
              animate="visible" 
              className="grid grid-rows-2 grid-flow-col auto-cols-[150px] lg:flex lg:flex-row overflow-x-auto gap-4 md:gap-5 pb-8 hide-scrollbar snap-x snap-mandatory px-4 lg:px-0 w-full"
            >
              {categories.slice(0, 8).map((cat, i) => (
                <motion.div 
                  variants={fadeInUp}
                  key={cat.id || i} 
                  onClick={() => navigate('/shop', { state: { category: cat.name } })}
                  className="group flex flex-col bg-white p-3 rounded-[20px] shadow-[0_10px_30px_rgba(233,30,99,0.05)] hover:shadow-[0_20px_40px_rgba(233,30,99,0.15)] active:scale-[0.98] transition-all duration-300 cursor-pointer w-full lg:w-[180px] lg:min-w-[180px] snap-start hover:-translate-y-1 shrink-0"
                >
                  <div className="relative aspect-square rounded-[14px] overflow-hidden mb-3 bg-gradient-to-br from-[#FFF5F8] to-[#FFEDF3]">
                    <img 
                      src={cat.image || '/cat_gifts.png'} 
                      alt={cat.name} 
                      className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                      onError={(e) => { e.target.src = '/cat_jewellery.png'; }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between px-2 pb-1">
                    <h3 className="font-bold text-gray-900 text-[10px] lg:text-[11px] tracking-wider uppercase">{cat.name}</h3>
                    <ArrowRight size={12} className="text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. TRENDING PRODUCTS - EXACT SCREENSHOT MATCH */}
      <section className="relative py-12 md:py-24 overflow-hidden bg-gradient-to-b from-[#FFFDFE] to-[#FFF5F8]">
        
        {/* Massive Watermark Text */}
        <div className="absolute top-12 left-0 w-full text-center flex justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[120px] md:text-[220px] font-bold text-gray-100/60 tracking-[0.05em] uppercase leading-none transform scale-y-105">
            TRENDING
          </span>
        </div>

        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          
          {/* Header Area */}
          <div className="flex flex-col items-center justify-center mb-8 md:mb-16 relative w-full">
            
            {/* Left Nav Arrow (Desktop) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:flex w-12 h-12 bg-white rounded-full shadow-sm items-center justify-center text-gray-600 hover:text-primary hover:shadow-md cursor-pointer transition-all z-20">
              <ChevronLeft size={20} strokeWidth={2} />
            </div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center text-center">
              <div className="mb-2 text-primary">
                <Star size={16} className="fill-primary opacity-60" />
              </div>
              <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight mb-3 text-slate-900 leading-tight">
                Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Collections</span>
              </h2>
              <p className="text-gray-500 font-medium text-[13px] md:text-sm mb-6">Discover our most loved picks.</p>
              
              {/* Marketing Tabs */}
              <div className="flex items-center justify-center gap-2 mb-8 bg-white p-1.5 rounded-full shadow-sm border border-gray-100 w-fit mx-auto">
                {['Trending', 'New Arrival', 'Best Seller', 'Featured'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
                      activeTab === tab 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-gray-500 hover:text-slate-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Custom Pink Diamond Divider */}
              <div className="flex items-center justify-center gap-2 mb-2 w-[150px]">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-primary/50"></div>
                <div className="w-1.5 h-1.5 rotate-45 bg-primary/70 shrink-0"></div>
                <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-primary/50"></div>
              </div>
            </motion.div>

            {/* Right Explore Button (Desktop) */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="absolute right-14 top-1/2 -translate-y-1/2 hidden lg:flex">
              <Link to="/shop" className="text-[12px] font-bold text-primary flex items-center gap-2 bg-white border border-primary/20 px-5 py-2 rounded-full hover:bg-surface-pink transition-colors shadow-sm">
                Explore All Products <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </motion.div>

            {/* Right Nav Arrow (Desktop) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex w-12 h-12 bg-white rounded-full shadow-sm items-center justify-center text-gray-600 hover:text-primary hover:shadow-md cursor-pointer transition-all z-20">
              <ChevronRight size={20} strokeWidth={2} />
            </div>

          </div>

          {/* Cards Grid */}
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 pb-8 hide-scrollbar snap-x snap-mandatory px-2 min-h-[300px]">
            {products.filter(p => p.badge === activeTab).length === 0 ? (
              <div className="col-span-4 flex flex-col items-center justify-center text-center p-12 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                <Star className="text-gray-300 mb-4 w-12 h-12" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">New {activeTab} coming soon!</h3>
                <p className="text-gray-500 font-medium">Check back later for exciting new products.</p>
              </div>
            ) : (
              products.filter(p => p.badge === activeTab).slice(0, 4).map((product, i) => (
                <div 
                key={product.id} 
                className="group bg-white rounded-[2rem] shadow-[0_15px_40px_rgba(233,30,99,0.06)] hover:shadow-[0_20px_50px_rgba(233,30,99,0.12)] active:scale-[0.98] transition-all duration-300 flex flex-col overflow-hidden min-w-[280px] sm:min-w-0 snap-start"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-50">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
                    />
                  </Link>
                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                    {product.badge && (
                      <div className="bg-white/95 backdrop-blur-md text-slate-800 tracking-wider text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/50 w-fit">
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
                  {/* Wishlist */}
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
                    <Heart size={16} strokeWidth={2} className={isInWishlist(product.id) ? "fill-primary" : ""} />
                  </button>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-bold text-slate-900 text-[15px] tracking-wide mb-1.5 line-clamp-1">{product.name}</h3>
                  </Link>
                  <div>
                    {product.offerPrice > 0 ? (
                      <div className="mb-2.5">
                        <span className="font-bold text-lg text-[#ff3366]">₹{product.offerPrice.toLocaleString('en-IN')}</span>
                        <span className="text-xs font-medium text-gray-400 line-through ml-2">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                    ) : (
                      <div className="font-bold text-lg text-primary mb-2.5">₹{product.price.toLocaleString('en-IN')}</div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={12} className={idx < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
                    ))}
                    <span className="text-gray-400 text-[11px] font-medium ml-1">({product.reviews})</span>
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-[13px] font-bold shadow-md hover:shadow-[0_8px_25px_rgba(233,30,99,0.35)] active:scale-95 transition-all duration-300 flex justify-center items-center gap-2 opacity-95 hover:opacity-100"
                    >
                      <ShoppingBag size={14} strokeWidth={2.5} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )))}
          </div>

          {/* Pagination Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {['Trending', 'New Arrival', 'Best Seller', 'Featured'].map((tab, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveTab(tab)}
                className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                  activeTab === tab 
                    ? 'bg-primary shadow-sm' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              ></div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SHOP BY COLLECTION - EXACT SCREENSHOT MATCH */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-[#FFF5F8] to-white relative">
        <div className="container mx-auto px-4 lg:px-12">
          
          {/* Header Area */}
          <div className="flex flex-col items-center justify-center mb-8 md:mb-16 relative w-full">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center text-center">
              <div className="mb-2 text-primary">
                <Star size={16} className="fill-primary opacity-60" />
              </div>
              <h2 className="text-4xl md:text-[2.75rem] font-bold tracking-tight mb-3 text-slate-900 leading-tight">
                Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Collection</span>
              </h2>
              <p className="text-gray-500 font-medium text-[13px] md:text-sm mb-4">Explore premium collections for every occasion.</p>
              
              {/* Custom Pink Diamond Divider */}
              <div className="flex items-center justify-center gap-2 mb-2 w-[150px]">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-primary/50"></div>
                <div className="w-1.5 h-1.5 rotate-45 bg-primary/70 shrink-0"></div>
                <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-primary/50"></div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Card: Women's Footwear */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative h-[420px] rounded-[3rem] overflow-hidden group shadow-[0_15px_40px_rgba(233,30,99,0.06)] hover:shadow-[0_25px_50px_rgba(233,30,99,0.12)] transition-all duration-500 bg-[#FAEDEB]">
              {/* Image Side */}
              <div className="absolute inset-0 sm:left-[35%] sm:w-[65%] h-full overflow-hidden">
                <img src="/women_footwear.png" alt="Women's Footwear" className="w-full h-full object-cover object-center sm:object-right group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
              
              {/* Gradient Fade to blend image with text block */}
              <div className="absolute inset-0 sm:left-[35%] sm:w-[15%] h-full bg-gradient-to-r from-[#FAEDEB] to-transparent z-10 hidden sm:block"></div>
              
              {/* Text Block */}
              <div className="absolute inset-0 sm:w-[45%] h-full p-8 md:p-12 flex flex-col justify-center items-start z-20 bg-gradient-to-r from-[#FAEDEB]/95 via-[#FAEDEB]/80 to-transparent sm:bg-none sm:bg-[#FAEDEB]">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
                  <Star size={12} className="fill-primary text-primary" /> Featured
                </div>
                
                <h3 className="text-3xl md:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight drop-shadow-sm sm:drop-shadow-none">
                  Women's<br/><span className="font-light italic font-serif text-primary">Footwear</span>
                </h3>
                
                <p className="text-gray-600 sm:text-gray-500 font-medium mb-8 text-[13px] max-w-[200px] drop-shadow-sm sm:drop-shadow-none">
                  Explore elegant designs tailored for modern women.
                </p>
                
                <button 
                  onClick={() => navigate('/shop', { state: { category: 'Premium Footwear', subCategory: 'Women\'s' } })}
                  className="bg-white text-primary border border-primary/10 px-7 py-3 rounded-full font-bold text-[12px] hover:bg-primary hover:text-white transition-all duration-500 shadow-[0_8px_20px_rgba(233,30,99,0.15)] flex items-center gap-2 group/btn"
                >
                  Shop Collection <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>

            {/* Right Card: Men's Footwear */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative h-[420px] rounded-[3rem] overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-all duration-500 bg-[#352A26]">
              {/* Image Side */}
              <div className="absolute inset-0 sm:left-[35%] sm:w-[65%] h-full overflow-hidden">
                <img src="/men_footwear.png" alt="Men's Footwear" className="w-full h-full object-cover object-center sm:object-right group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100" />
              </div>
              
              {/* Gradient Fade */}
              <div className="absolute inset-0 sm:left-[35%] sm:w-[15%] h-full bg-gradient-to-r from-[#352A26] to-transparent z-10 hidden sm:block"></div>
              
              {/* Text Block */}
              <div className="absolute inset-0 sm:w-[45%] h-full p-8 md:p-12 flex flex-col justify-center items-start z-20 bg-gradient-to-r from-[#352A26]/95 via-[#352A26]/80 to-transparent sm:bg-none sm:bg-[#352A26]">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-slate-900 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
                  <Star size={12} className="fill-slate-900 text-slate-900" /> Featured
                </div>
                
                <h3 className="text-3xl md:text-[2.5rem] font-bold text-white mb-4 leading-tight tracking-tight drop-shadow-md sm:drop-shadow-none">
                  Men's<br/><span className="font-light italic font-serif text-primary">Footwear</span>
                </h3>
                
                <p className="text-gray-300 font-medium mb-8 text-[13px] max-w-[200px] drop-shadow-md sm:drop-shadow-none">
                  Classic and contemporary styles for the modern gentleman.
                </p>
                
                <button 
                  onClick={() => navigate('/shop', { state: { category: 'Premium Footwear', subCategory: 'Men\'s' } })}
                  className="bg-white text-slate-900 border border-white/10 px-7 py-3 rounded-full font-bold text-[12px] hover:bg-primary hover:text-white transition-all duration-500 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center gap-2 group/btn"
                >
                  Shop Collection <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </section>





      {/* 11. CALL TO ACTION - PERFECT GIFT */}
      <section className="py-8 md:py-12 mb-8 md:mb-12">
        <div className="container mx-auto px-4 lg:px-12">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative rounded-[3rem] overflow-hidden bg-[#FAEDEB] shadow-[0_15px_40px_rgba(233,30,99,0.08)] flex flex-col md:flex-row min-h-[400px]">
            
            {/* Text Side */}
            <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center items-start z-20 bg-gradient-to-t md:bg-gradient-to-r from-[#FAEDEB] via-[#FAEDEB]/95 to-[#FAEDEB]/40 md:to-transparent order-2 md:order-1 mt-[-60px] md:mt-0 pt-20 md:pt-16">
              <div className="flex items-center gap-2 mb-4">
                <Star size={10} className="fill-primary text-primary" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Discover The Perfect Gift</span>
              </div>
              
              <h2 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight drop-shadow-sm md:drop-shadow-none">
                Looking for the<br/>
                <span className="text-primary italic font-serif font-light">Perfect Gift?</span>
              </h2>
              
              <p className="text-gray-600 font-medium mb-8 md:mb-10 text-[13px] md:text-[15px] max-w-sm leading-relaxed drop-shadow-sm md:drop-shadow-none">
                Discover beautiful products carefully selected for every occasion. Make their special moments unforgettable today.
              </p>
              
              <Link to="/shop" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto justify-center bg-gradient-primary text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_25px_rgba(233,30,99,0.3)] hover:shadow-[0_15px_35px_rgba(233,30,99,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
                  Start Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            
            {/* Image Side */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-auto min-h-[300px] order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAEDEB] to-transparent z-10 hidden md:block w-32"></div>
              {/* Fade for mobile connecting image to text block */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAEDEB] to-transparent z-10 md:hidden"></div>
              <img src="/perfect_gift_cta.png" alt="Perfect Gift" className="w-full h-full object-cover object-center md:object-left" />
            </div>
            
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
