import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, ArrowLeft, Truck, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Find the product based on the URL ID
    const foundProduct = products.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // "Smart" Recommendation Logic
      // 1. Prioritize exact sub-category matches
      let related = products.filter(p => p.subCategory === foundProduct.subCategory && p.id !== foundProduct.id);
      
      // 2. If we don't have enough (4), fill with same broad category
      if (related.length < 4) {
        const moreRelated = products.filter(p => 
          p.category === foundProduct.category && 
          p.id !== foundProduct.id && 
          !related.find(r => r.id === p.id)
        );
        related = [...related, ...moreRelated];
      }
      
      // 3. Sort by rating (highest first) to recommend the best products
      related.sort((a, b) => b.rating - a.rating);
      
      setRelatedProducts(related.slice(0, 4));
      // Reset scroll position on product change
      window.scrollTo(0, 0);
    } else {
      // If product not found, redirect to shop
      navigate('/shop');
    }
  }, [id, navigate]);

  if (!product) return null; // or a loading spinner

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-8 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Collection
        </Link>

        {/* Main Product Section */}
        <div className="bg-white rounded-[3rem] p-6 lg:p-10 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16">
          
          {/* Left: Image Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 group"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            {product.badge && (
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-slate-800 tracking-wider shadow-sm border border-white/50 z-10">
                {product.badge}
              </div>
            )}
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-6 right-6 w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-sm z-10 hover:scale-110 ${
                isInWishlist(product.id) ? 'bg-white/90 text-primary' : 'bg-white/80 text-gray-500 hover:text-primary hover:bg-white'
              }`}
            >
              <Heart size={20} strokeWidth={2.5} className={isInWishlist(product.id) ? "fill-primary" : ""} />
            </button>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-1/2 flex flex-col justify-center py-4 lg:pr-8"
          >
            <div className="mb-2">
              <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-tight mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-amber-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-700">{product.rating} Rating</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500 hover:text-primary cursor-pointer transition-colors">{product.reviews} Reviews</span>
            </div>

            <div className="text-3xl font-bold text-primary mb-8">
              ₹{product.price.toLocaleString('en-IN')}
              <span className="text-sm text-gray-400 font-medium ml-2 line-through">
                ₹{(product.price * 1.2).toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              {product.description}
            </p>

            {/* Quantity & Actions */}
            <div className="border-t border-gray-100 pt-8 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 h-14 w-full sm:w-32">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-slate-900 transition-colors"
                  >-</button>
                  <span className="flex-1 text-center font-bold text-slate-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-slate-900 transition-colors"
                  >+</button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 h-14 bg-slate-900 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-slate-800 shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" /> Add to Cart
                </button>
              </div>

              {/* WhatsApp Checkout Button */}
              <button 
                onClick={() => addToCart(product, quantity)}
                className="w-full mt-4 h-14 bg-gradient-primary text-white rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-[0_15px_30px_rgba(233,30,99,0.3)] transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" /> Buy Now via WhatsApp
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Truck size={18} />
                </div>
                <div className="text-xs font-bold text-slate-700">Free Shipping<br/><span className="text-gray-400 font-medium">Over ₹5000</span></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <div className="text-xs font-bold text-slate-700">100% Secure<br/><span className="text-gray-400 font-medium">Checkout</span></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                  <RefreshCw size={18} />
                </div>
                <div className="text-xs font-bold text-slate-700">Easy Returns<br/><span className="text-gray-400 font-medium">7 Days Policy</span></div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Star size={20} className="text-primary fill-primary/20" /> You May Also Like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map(relProduct => (
                <Link to={`/product/${relProduct.id}`} key={relProduct.id} className="group bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(233,30,99,0.08)] transition-all duration-500 border border-transparent hover:border-pink-50 flex flex-col">
                  
                  <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50 mb-5 block">
                    <img src={relProduct.image} alt={relProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <button 
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-white transition-all shadow-sm z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                    >
                      <Heart size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col flex-1 px-2 pb-2 text-center">
                    <h3 className="font-serif text-[15px] font-bold text-slate-900 mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                      {relProduct.name}
                    </h3>
                    <div className="mt-auto flex items-center justify-center gap-3">
                      <span className="text-[15px] font-bold text-primary">₹{relProduct.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
