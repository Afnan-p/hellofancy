import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/products');
      
      const mappedData = data.map(p => ({
        id: p._id,
        name: p.name,
        category: p.category?.name || 'Uncategorized',
        categoryId: p.category?._id || '',
        price: p.price,
        offerPrice: p.offerPrice || 0,
        originalPrice: p.offerPrice > 0 ? p.price : (p.price + 500), // Real original if offer, else mock
        image: p.images[0] || 'https://via.placeholder.com/600',
        rating: 5.0, // Mock rating
        reviews: 0,
        isNew: p.isFeatured,
        description: p.description,
        stock: p.stockQuantity,
        badge: p.badge && p.badge !== 'None' ? p.badge : null
      }));

      setProducts(mappedData);
    } catch (error) {
      console.error('Failed to fetch products', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const { data } = await api.post('/products', {
        name: newProduct.name,
        category: newProduct.category, // Send category ID
        price: newProduct.price,
        description: newProduct.description,
        images: [newProduct.image], // Cloudinary URL
        stockQuantity: newProduct.stock || 10,
        sku: `SKU-${Date.now()}`,
        badge: newProduct.badge || 'None',
        offerPrice: newProduct.offerPrice || 0
      });

      // After creation, productController creates a sample, we need to immediately update it
      await api.put(`/products/${data._id}`, {
        name: newProduct.name,
        category: newProduct.category,
        price: newProduct.price,
        description: newProduct.description,
        images: [newProduct.image],
        stockQuantity: newProduct.stock || 10,
        isFeatured: newProduct.isNew || false,
        badge: newProduct.badge || 'None',
        offerPrice: newProduct.offerPrice || 0,
      });

      await fetchProducts(); // Refresh list to get populated category names
      toast.success('Product added successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Product deleted successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
      return false;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await api.put(`/products/${id}`, {
        name: updatedProduct.name,
        category: updatedProduct.category,
        price: updatedProduct.price,
        description: updatedProduct.description,
        images: updatedProduct.image ? [updatedProduct.image] : undefined,
        stockQuantity: updatedProduct.stock,
        isFeatured: updatedProduct.isNew,
        badge: updatedProduct.badge || 'None',
        offerPrice: updatedProduct.offerPrice || 0,
      });
      await fetchProducts();
      toast.success('Product updated successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
      return false;
    }
  };

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById, loading, refreshProducts: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
