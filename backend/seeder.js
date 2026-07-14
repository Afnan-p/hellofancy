import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear all existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    // Create Admin User
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@hellofancy.com',
      password: 'password123',
      role: 'admin',
    });

    console.log('Admin user created (admin@hellofancy.com / password123)');

    // Create Categories
    const categoriesData = [
      { name: "Luxury Gifts", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop", status: 'active' },
      { name: "Fine Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop", status: 'active' },
      { name: "Designer Bags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop", status: 'active' },
      { name: "Premium Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop", status: 'active' },
      { name: "Personal Care", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop", status: 'active' },
      { name: "Timepieces", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop", status: 'active' },
      { name: "Home Decor", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop", status: 'active' },
      { name: "Luxury Eyewear", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop", status: 'active' },
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    console.log('Categories imported');

    // Create Products (3 for each category)
    const productsData = [
      // 0: Luxury Gifts
      {
        name: "Signature Gift Box",
        description: "Curated gift box with premium chocolates and a scented candle.",
        images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop"],
        category: createdCategories[0]._id,
        price: 3200, offerPrice: 2999, sku: "GFT-001", stockQuantity: 20, isFeatured: true, status: "active", badge: "Best Seller"
      },
      {
        name: "Premium Coffee Collection",
        description: "A luxurious selection of single-origin coffee beans from around the world.",
        images: ["https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1964&auto=format&fit=crop"],
        category: createdCategories[0]._id,
        price: 4500, offerPrice: 0, sku: "GFT-002", stockQuantity: 15, isFeatured: false, status: "active", badge: "Trending"
      },
      {
        name: "Artisan Chocolate Truffles",
        description: "Handcrafted Belgian chocolate truffles in an elegant gold-foiled box.",
        images: ["https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=1939&auto=format&fit=crop"],
        category: createdCategories[0]._id,
        price: 2800, offerPrice: 0, sku: "GFT-003", stockQuantity: 25, isFeatured: false, status: "active", badge: "None"
      },

      // 1: Fine Jewellery
      {
        name: "Vintage Pearl Necklace",
        description: "An exquisite vintage pearl necklace perfect for any elegant occasion.",
        images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop"],
        category: createdCategories[1]._id,
        price: 15000, offerPrice: 12500, sku: "JEW-001", stockQuantity: 5, isFeatured: true, status: "active", badge: "New Arrival"
      },
      {
        name: "Diamond Encrusted Ring",
        description: "A brilliant cut diamond ring set in 18k white gold.",
        images: ["https://images.unsplash.com/photo-1605100804763-247f6612d54e?q=80&w=2070&auto=format&fit=crop"],
        category: createdCategories[1]._id,
        price: 85000, offerPrice: 80000, sku: "JEW-002", stockQuantity: 2, isFeatured: true, status: "active", badge: "Best Seller"
      },
      {
        name: "Sapphire Drop Earrings",
        description: "Stunning blue sapphire teardrop earrings surrounded by diamonds.",
        images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop"],
        category: createdCategories[1]._id,
        price: 42000, offerPrice: 0, sku: "JEW-003", stockQuantity: 4, isFeatured: false, status: "active", badge: "Featured"
      },

      // 2: Designer Bags
      {
        name: "Classic Leather Tote",
        description: "Genuine Italian leather tote bag with spacious interior.",
        images: ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop"],
        category: createdCategories[2]._id,
        price: 8500, offerPrice: 0, sku: "BAG-001", stockQuantity: 12, isFeatured: true, status: "active", badge: "Trending"
      },
      {
        name: "Quilted Evening Clutch",
        description: "Elegant black quilted clutch with a gold-tone chain strap.",
        images: ["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop"],
        category: createdCategories[2]._id,
        price: 5400, offerPrice: 4800, sku: "BAG-002", stockQuantity: 8, isFeatured: false, status: "active", badge: "None"
      },
      {
        name: "Suede Crossbody Bag",
        description: "Minimalist tan suede crossbody bag for everyday elegance.",
        images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop"],
        category: createdCategories[2]._id,
        price: 6200, offerPrice: 0, sku: "BAG-003", stockQuantity: 15, isFeatured: false, status: "active", badge: "New Arrival"
      },

      // 3: Premium Footwear
      {
        name: "Stiletto Heels - Noir",
        description: "Elegant black stiletto heels for the perfect evening look.",
        images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop"],
        category: createdCategories[3]._id,
        subCategory: "Women's",
        price: 5400, offerPrice: 0, sku: "FTW-001", stockQuantity: 8, isFeatured: true, status: "active", badge: "Trending"
      },
      {
        name: "Leather Oxford Shoes",
        description: "Classic handcrafted brown leather oxfords for gentlemen.",
        images: ["https://images.unsplash.com/photo-1614252339460-7df54284d715?q=80&w=1974&auto=format&fit=crop"],
        category: createdCategories[3]._id,
        subCategory: "Men's",
        price: 8900, offerPrice: 8200, sku: "FTW-002", stockQuantity: 10, isFeatured: true, status: "active", badge: "Best Seller"
      },
      {
        name: "Suede Ankle Boots",
        description: "Chic beige suede ankle boots with a comfortable block heel.",
        images: ["https://images.unsplash.com/photo-1508215885820-4585e5610924?q=80&w=1926&auto=format&fit=crop"],
        category: createdCategories[3]._id,
        subCategory: "Women's",
        price: 7500, offerPrice: 0, sku: "FTW-003", stockQuantity: 14, isFeatured: false, status: "active", badge: "Featured"
      },

      // 4: Personal Care
      {
        name: "Rose Quartz Face Roller",
        description: "Premium rose quartz facial roller for glowing skin.",
        images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop"],
        category: createdCategories[4]._id,
        price: 1800, offerPrice: 1500, sku: "CARE-001", stockQuantity: 30, isFeatured: false, status: "active", badge: "Trending"
      },
      {
        name: "Luxury Botanical Serum",
        description: "Anti-aging facial serum infused with rare botanical extracts.",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop"],
        category: createdCategories[4]._id,
        price: 4500, offerPrice: 0, sku: "CARE-002", stockQuantity: 20, isFeatured: true, status: "active", badge: "Featured"
      },
      {
        name: "Oud & Bergamot Candle",
        description: "Hand-poured soy wax candle with rich woody fragrances.",
        images: ["https://images.unsplash.com/photo-1603006905393-27c1f8102d72?q=80&w=1974&auto=format&fit=crop"],
        category: createdCategories[4]._id,
        price: 2200, offerPrice: 0, sku: "CARE-003", stockQuantity: 25, isFeatured: false, status: "active", badge: "New Arrival"
      },

      // 5: Timepieces
      {
        name: "Swiss Automatic Chronograph",
        description: "A masterful Swiss automatic watch with a sapphire crystal face.",
        images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop"],
        category: createdCategories[5]._id,
        price: 45000, offerPrice: 42000, sku: "WTC-001", stockQuantity: 3, isFeatured: true, status: "active", badge: "Featured"
      },
      {
        name: "Minimalist Gold Mesh Watch",
        description: "Elegant everyday timepiece with a rose gold mesh strap.",
        images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1927&auto=format&fit=crop"],
        category: createdCategories[5]._id,
        price: 12000, offerPrice: 0, sku: "WTC-002", stockQuantity: 15, isFeatured: true, status: "active", badge: "Best Seller"
      },
      {
        name: "Classic Leather Dress Watch",
        description: "Timeless design featuring a genuine leather strap and silver dial.",
        images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1976&auto=format&fit=crop"],
        category: createdCategories[5]._id,
        price: 18500, offerPrice: 16000, sku: "WTC-003", stockQuantity: 8, isFeatured: false, status: "active", badge: "Trending"
      },

      // 6: Home Decor
      {
        name: "Minimalist Ceramic Vase",
        description: "Hand-crafted ceramic vase for a modern home aesthetic.",
        images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop"],
        category: createdCategories[6]._id,
        price: 2400, offerPrice: 0, sku: "DCR-001", stockQuantity: 15, isFeatured: true, status: "active", badge: "New Arrival"
      },
      {
        name: "Velvet Accent Cushion",
        description: "Plush emerald green velvet cushion for living spaces.",
        images: ["https://images.unsplash.com/photo-1584100936711-20921cb92336?q=80&w=2065&auto=format&fit=crop"],
        category: createdCategories[6]._id,
        price: 1500, offerPrice: 1200, sku: "DCR-002", stockQuantity: 40, isFeatured: false, status: "active", badge: "None"
      },
      {
        name: "Geometric Brass Mirror",
        description: "Contemporary wall mirror with an intricate brass geometric frame.",
        images: ["https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1954&auto=format&fit=crop"],
        category: createdCategories[6]._id,
        price: 8500, offerPrice: 0, sku: "DCR-003", stockQuantity: 6, isFeatured: true, status: "active", badge: "Featured"
      },

      // 7: Luxury Eyewear
      {
        name: "Classic Aviator Sunglasses",
        description: "Gold-framed aviator sunglasses with polarized lenses.",
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop"],
        category: createdCategories[7]._id,
        price: 8500, offerPrice: 7999, sku: "EYE-001", stockQuantity: 20, isFeatured: true, status: "active", badge: "Trending"
      },
      {
        name: "Tortoiseshell Cat-Eye Frames",
        description: "Elegant vintage-inspired cat-eye sunglasses.",
        images: ["https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2000&auto=format&fit=crop"],
        category: createdCategories[7]._id,
        price: 12000, offerPrice: 0, sku: "EYE-002", stockQuantity: 15, isFeatured: true, status: "active", badge: "Best Seller"
      },
      {
        name: "Oversized Designer Shades",
        description: "Statement oversized sunglasses with gradient tint.",
        images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=2000&auto=format&fit=crop"],
        category: createdCategories[7]._id,
        price: 15000, offerPrice: 14000, sku: "EYE-003", stockQuantity: 10, isFeatured: false, status: "active", badge: "New Arrival"
      }
    ];

    await Product.insertMany(productsData);
    console.log('Products imported');

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
