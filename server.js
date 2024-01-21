const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const connectDB = require('./config/db');
const corsConfig = require('./config/corsOptions');

const app = express();

app.use(cors(corsConfig));
app.use(express.json());

// add api routes
const walletRoute = require('./routes/wallets');
const transRoute = require('./routes/transactions');

app.use('/api/wallets', walletRoute);
app.use('/api/transactions', transRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();