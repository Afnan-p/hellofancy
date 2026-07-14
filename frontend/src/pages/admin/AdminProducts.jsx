import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCategories } from '../../context/CategoryContext';

const AdminProducts = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterBadge, setFilterBadge] = useState('All Badges');
  const { products, deleteProduct } = useProducts();
  const { categories } = useCategories();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All Categories' || product.category === filterCategory;
    
    let matchesBadge = true;
    if (filterBadge === 'No Badge') {
      matchesBadge = !product.badge;
    } else if (filterBadge !== 'All Badges') {
      matchesBadge = product.badge === filterBadge;
    }
    
    return matchesSearch && matchesCategory && matchesBadge;
  });

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Manage your store inventory and pricing.</p>
        </div>
        
        <Link 
          to="/admin/products/add"
          className="bg-primary text-white px-5 py-2.5 rounded-full font-bold text-[13px] shadow-sm hover:shadow-md hover:bg-pink-600 transition-all flex items-center gap-2"
        >
          <Plus size={16} strokeWidth={2.5} /> Add New Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-[2rem] border border-gray-100 border-b-0 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100 w-full sm:w-80 focus-within:border-primary/30 transition-colors">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-gray-50 border border-gray-100 text-slate-700 text-sm font-bold rounded-full px-4 py-2 outline-none focus:border-primary/30 cursor-pointer"
          >
            <option value="All Categories">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id || cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <select 
            value={filterBadge}
            onChange={(e) => setFilterBadge(e.target.value)}
            className="bg-gray-50 border border-gray-100 text-slate-700 text-sm font-bold rounded-full px-4 py-2 outline-none focus:border-primary/30 cursor-pointer hidden sm:block"
          >
            <option value="All Badges">All Badges</option>
            <option value="Trending">Trending</option>
            <option value="New Arrival">New Arrival</option>
            <option value="Best Seller">Best Seller</option>
            <option value="Featured">Featured</option>
            <option value="No Badge">No Badge</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-12"></th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Product Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Stock Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer w-4 h-4 accent-primary" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-primary transition-colors flex items-center gap-2">
                          {product.name}
                          {product.badge && (
                            <span className="bg-pink-100 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-gray-400 font-medium">ID: PRD-{product.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.offerPrice > 0 ? (
                      <div className="flex flex-col">
                        <span className="font-bold text-[#ff3366]">₹{product.offerPrice.toLocaleString('en-IN')}</span>
                        <span className="text-[11px] font-medium text-gray-400 line-through">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                    ) : (
                      <span className="font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stock === 0 || !product.stock ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-600 border border-red-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        Out of Stock
                      </span>
                    ) : product.stock <= 5 ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        {product.stock} left
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {product.stock} in stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/products/edit/${product.id}`}
                        className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this product?')) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-full text-gray-400 hover:text-slate-800 flex items-center justify-center transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-gray-500 font-medium">
              No products found matching your search.
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default AdminProducts;
