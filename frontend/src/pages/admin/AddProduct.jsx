import { useState, useEffect } from 'react';
import { Upload, ArrowLeft, Image as ImageIcon, CheckCircle2, Plus } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCategories } from '../../context/CategoryContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addProduct, updateProduct, products } = useProducts();
  const { categories } = useCategories();
  const isEditing = !!id;
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    offerPrice: '',
    category: '',
    subCategory: '',
    stock: '',
    badge: 'None',
    image: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Load product data if editing
  useEffect(() => {
    if (isEditing) {
      const productToEdit = products.find(p => p.id === id);
      if (productToEdit) {
        setFormData({
          name: productToEdit.name,
          description: productToEdit.description,
          price: productToEdit.price?.toString() || '',
          offerPrice: productToEdit.offerPrice?.toString() || '',
          stock: productToEdit.stock?.toString() || '',
          badge: productToEdit.badge || 'None',
          category: productToEdit.category,
          subCategory: productToEdit.subCategory || '',
          image: productToEdit.image || '',
        });
        if (productToEdit.image) {
          setImagePreview(productToEdit.image);
        }
      } else {
        navigate('/admin/products');
      }
    }
  }, [id, isEditing, products, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    let uploadedImageUrl = formData.image;

    // If there is a new file selected, upload it first
    if (imageFile) {
      try {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        
        const uploadRes = await api.post('/upload', uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        uploadedImageUrl = uploadRes.data.imageUrl;
      } catch (error) {
        toast.error('Image upload failed');
        setIsSaving(false);
        return;
      }
    }

    // Need to find the correct category ID from the category name
    const selectedCategory = categories.find(c => c.name === formData.category);
    const categoryId = selectedCategory ? selectedCategory.id : formData.category;

    // Create new product object
    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      offerPrice: formData.offerPrice ? Number(formData.offerPrice) : 0,
      stock: Number(formData.stock),
      badge: formData.badge === 'None' ? null : formData.badge,
      category: categoryId, // Send ID to backend
      subCategory: formData.subCategory || undefined,
      image: uploadedImageUrl || undefined, 
      isNew: formData.badge === 'New Arrival',
    };

    let success = false;
    // Call context function
    if (isEditing) {
      success = await updateProduct(id, newProduct); // Will need updateProduct in ProductContext
    } else {
      success = await addProduct(newProduct);
    }
    
    setIsSaving(false);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 relative">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/products" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-slate-900 transition-colors shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">{isEditing ? 'Update product details and images.' : 'Upload images and set product details.'}</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Image Upload */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Product Image</h3>
              
              <label className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors group relative overflow-hidden min-h-[250px] w-full">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
                
                {imagePreview ? (
                  <div className="absolute inset-0 w-full h-full p-2">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-2xl" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl m-2">
                      <span className="text-white font-bold text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-colors shadow-sm">
                      <Upload size={24} className="text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-1">Click to upload</p>
                    <p className="text-[12px] font-medium text-gray-400">or drag and drop</p>
                    <p className="text-[10px] font-medium text-gray-400 mt-4">SVG, PNG, JPG (max. 800x800px)</p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="md:col-span-2 space-y-6">
            
            {/* General Info */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">General Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Product Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Luxury Silk Scarf" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Description</label>
                  <textarea 
                    rows="4" 
                    placeholder="Describe the product in detail..." 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors resize-none" 
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Pricing & Category */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Pricing & Organization</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Base Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5 flex items-center gap-2">Offer Price <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">Optional</span></label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.offerPrice}
                    onChange={(e) => setFormData({...formData, offerPrice: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Stock Quantity</label>
                  <input 
                    type="number" 
                    placeholder="10" 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Main Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors appearance-none" 
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Sub Category (Optional)</label>
                  <select 
                    value={formData.subCategory}
                    onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors appearance-none"
                  >
                    <option value="">Select Sub-Category</option>
                    <option value="Men's">Men's</option>
                    <option value="Women's">Women's</option>
                    <option value="Children's">Children's</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Marketing Badge</label>
                <select 
                  value={formData.badge}
                  onChange={(e) => setFormData({...formData, badge: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors appearance-none"
                >
                  <option value="None">None (Standard Product)</option>
                  <option value="Trending">Trending</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="Featured">Featured</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-64 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-end gap-4 z-30">
          <Link to="/admin/products" className="px-6 py-2.5 rounded-full font-bold text-[13px] text-gray-500 hover:text-slate-900 transition-colors">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isSaving || isSuccess}
            className={`px-8 py-2.5 rounded-full font-bold text-[13px] text-white shadow-md transition-all flex items-center gap-2 ${
              isSuccess ? 'bg-emerald-500' : 'bg-primary hover:bg-pink-600'
            }`}
          >
            {isSuccess ? (
              <><CheckCircle2 size={16} /> Saved Successfully</>
            ) : isSaving ? (
              'Saving...'
            ) : (
              'Save Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
