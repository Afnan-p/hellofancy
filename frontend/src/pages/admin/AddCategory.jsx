import { useState, useEffect } from 'react';
import { Upload, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '../../context/CategoryContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const AddCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addCategory, updateCategory, categories } = useCategories();
  const isEditing = !!id;
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Load category data if editing
  useEffect(() => {
    if (isEditing) {
      const categoryToEdit = categories.find(c => c.id === id || c._id === id);
      if (categoryToEdit) {
        setFormData({
          name: categoryToEdit.name,
          description: categoryToEdit.description || '',
          image: categoryToEdit.image || '',
        });
        if (categoryToEdit.image) {
          setImagePreview(categoryToEdit.image);
        }
      } else {
        navigate('/admin/categories');
      }
    }
  }, [id, isEditing, categories, navigate]);

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

    const newCategory = {
      name: formData.name,
      description: formData.description,
      image: uploadedImageUrl, 
    };

    let success = false;
    if (isEditing) {
      success = await updateCategory(id, newCategory); // Note: updateCategory needs to be added to CategoryContext later if backend supports it
    } else {
      success = await addCategory(newCategory);
    }
    
    setIsSaving(false);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/admin/categories');
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/admin/categories"
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-colors shadow-sm"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{isEditing ? 'Edit Category' : 'Add New Category'}</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">{isEditing ? 'Update category details and banner image.' : 'Upload banner image and set category details.'}</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Image Upload */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Category Banner</h3>
              
              <label className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors group relative overflow-hidden min-h-[250px] w-full">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
                
                {imagePreview ? (
                  <div className="absolute inset-0 w-full h-full p-2">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl m-2">
                      <span className="text-white font-bold text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="text-gray-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Click to upload banner</span>
                    <span className="text-xs font-medium text-gray-400 mt-2">Horizontal image recommended (16:9)</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">General Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Category Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Luxury Footwear" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Description (Optional)</label>
                  <textarea 
                    rows={4} 
                    placeholder="Describe the category..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium focus:border-primary/50 focus:bg-white outline-none transition-colors resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Link 
                to="/admin/categories"
                className="px-6 py-3 rounded-full font-bold text-sm text-gray-500 hover:text-slate-900 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit"
                disabled={isSaving || isSuccess}
                className={`px-8 py-3 rounded-full font-bold text-sm text-white flex items-center gap-2 transition-all ${
                  isSuccess 
                    ? 'bg-emerald-500 shadow-[0_8px_20px_rgba(16,185,129,0.3)]' 
                    : isSaving
                      ? 'bg-primary/70 cursor-not-allowed'
                      : 'bg-primary hover:bg-pink-600 shadow-[0_8px_20px_rgba(233,30,99,0.25)]'
                }`}
              >
                {isSuccess ? (
                  <><CheckCircle2 size={18} /> Saved Successfully</>
                ) : isSaving ? (
                  'Saving...'
                ) : (
                  'Save Category'
                )}
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddCategory;
