import { createContext, useContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    const saved = localStorage.getItem('helloFancyWishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('helloFancyWishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    setWishlistIds(prevIds => {
      if (prevIds.includes(productId)) {
        return prevIds.filter(id => id !== productId);
      } else {
        return [...prevIds, productId];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistIds.includes(productId);
  };

  const { products } = useProducts();

  // Helper to get actual product objects for the wishlist page
  const wishlistProducts = products.filter(product => wishlistIds.includes(product.id));

  return (
    <WishlistContext.Provider value={{ 
      wishlistIds, 
      toggleWishlist, 
      isInWishlist, 
      wishlistProducts,
      wishlistCount: wishlistIds.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
