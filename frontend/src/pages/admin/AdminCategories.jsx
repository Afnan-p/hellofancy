import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';

const AdminCategories = () => {
  const [search, setSearch] = useState('');
  const { categories, deleteCategory } = useCategories();

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Categories</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Manage your store categories and images.</p>
        </div>
        
        <Link 
          to="/admin/categories/add"
          className="bg-primary text-white px-5 py-2.5 rounded-full font-bold text-[13px] shadow-sm hover:shadow-md hover:bg-pink-600 transition-all flex items-center gap-2"
        >
          <Plus size={16} strokeWidth={2.5} /> Add New Category
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-[2rem] border border-gray-100 border-b-0 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100 w-full sm:w-80 focus-within:border-primary/30 transition-colors">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-12"></th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer w-4 h-4 accent-primary" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                        {category.image ? (
                          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                        ) : (
                          <LayoutGrid size={20} className="text-gray-300" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{category.name}</div>
                        <div className="text-[12px] text-gray-400 font-medium">ID: CAT-{category.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium max-w-xs truncate">
                    {category.description || 'No description provided.'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/categories/edit/${category.id}`}
                        className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
                            deleteCategory(category.id);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCategories.length === 0 && (
            <div className="p-12 text-center text-gray-500 font-medium">
              No categories found matching your search.
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default AdminCategories;
