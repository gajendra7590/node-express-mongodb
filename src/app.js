const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const blogCategoryRoutes = require('./routes/blogCategoryRoutes');
const limiter = require('./middlewares/rateLimitMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(limiter);

app.use('/uploads', express.static('uploads'));

connectDB();


//Use All Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogCategories', blogCategoryRoutes);
app.use('/api/blogs', blogRoutes);


module.exports = app;