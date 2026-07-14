import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Trust proxy for rate limiter (required for Render/Heroku)
app.set('trust proxy', 1);

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 login/register requests per hour
  message: 'Too many authentication attempts, please try again after an hour'
});

// Middleware
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent payload DOS
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Strict CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL || 'http://localhost:5173' : '*',
  credentials: true
}));

// Set security HTTP headers
app.use(helmet());

// Apply global rate limiter to all API requests
app.use('/api', limiter);

// Apply strict rate limiter to authentication routes
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);

app.use(morgan('dev'));

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
