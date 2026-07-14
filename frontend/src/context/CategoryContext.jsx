import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/categories');
      
      // Map MongoDB _id to id for frontend compatibility
      const mappedData = data.map(cat => ({
        id: cat._id,
        name: cat.name,
        image: cat.image,
        count: 0 // Optional: Backend could compute this later
      }));
      
      setCategories(mappedData);
    } catch (error) {
      console.error('Failed to fetch categories', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (newCategory) => {
    try {
      const { data } = await api.post('/categories', {
        name: newCategory.name,
        image: newCategory.image, // URL from Cloudinary
      });
      
      const mappedData = {
        id: data._id,
        name: data.name,
        image: data.image,
        count: 0
      };

      setCategories((prev) => [...prev, mappedData]);
      toast.success('Category added successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add category');
      return false;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success('Category deleted successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
      return false;
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      await api.put(`/categories/${id}`, {
        name: updatedCategory.name,
        image: updatedCategory.image,
      });
      await fetchCategories();
      toast.success('Category updated successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update category');
      return false;
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory, loading, refreshCategories: fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
