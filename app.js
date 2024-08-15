const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./swagger');

dotenv.config();

const app = express();

app.use(express.json());

swaggerDocs(app);
// Routes
app.use('/api/auth', authRoutes);

module.exports = app;
