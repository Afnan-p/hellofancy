import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Gift, LayoutGrid } from 'lucide-react';
import { useCategories } from '../context/CategoryContext';

const Categories = () => {
  const { categories } = useCategories();

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-36 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Top Premium Banner */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-10 md:p-14 rounded-[3rem] shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-sm border border-white/20">
              <LayoutGrid size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight font-serif">
              Shop by <span className="italic font-light opacity-90">Category</span>
            </h1>
            <p className="text-white/80 font-medium max-w-md mx-auto md:mx-0 text-[15px]">
              Explore our diverse collections. From elegant fashion to premium lifestyle accessories, find exactly what you're looking for.
            </p>
          </div>
          
          <div className="relative z-10 w-full md:w-[400px]">
            {/* Bulk Orders Promo Card */}
            <div className="bg-[#fff0f5] rounded-[2rem] p-8 text-center shadow-sm border border-pink-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Gift size={28} className="text-primary" strokeWidth={2} />
              </div>
              <h4 className="font-bold text-primary mb-2 text-lg">Looking for Bulk Orders?</h4>
              <p className="text-sm text-pink-900/60 font-medium mb-6">We offer special discounts for bulk purchases.</p>
              <a 
                href="mailto:support@hellofancy.com"
                className="bg-white text-primary border border-pink-200 font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white hover:border-primary transition-colors w-full shadow-sm"
              >
                Contact Us <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          
          {/* Utility Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <span className="text-sm font-semibold text-gray-500">Showing {categories.length} of {categories.length} categories</span>
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 text-sm font-bold text-slate-700 cursor-pointer hover:border-gray-200 transition-colors">
              Sort by: Popularity <ChevronDown size={16} className="text-gray-400 ml-1" />
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div key={cat.id || cat.name}>
                <Link 
                  to="/shop" 
                  state={{ category: cat.name }} 
                  className="bg-white rounded-2xl p-3 shadow-sm border border-gray-50 flex flex-col items-center hover:shadow-[0_15px_40px_rgba(233,30,99,0.08)] active:scale-[0.98] transition-all duration-300 group h-full"
                >
                  {/* Square Image Container */}
                  <div className="w-full aspect-square rounded-xl bg-gray-50 mb-3 overflow-hidden relative">
                    <img 
                      src={cat.image || '/cat_gifts.png'} 
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  
                  {/* Bottom Details Row */}
                  <div className="w-full flex flex-col items-start mt-auto">
                    <h3 className="font-bold text-sm text-slate-900 font-serif leading-tight line-clamp-1">{cat.name}</h3>
                    <div className="w-full flex justify-between items-center mt-1">
                      <p className="text-[9px] font-bold text-gray-400 tracking-wide">Premium Collection</p>
                      {/* Arrow Button */}
                      <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors">
                        <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Categories;
