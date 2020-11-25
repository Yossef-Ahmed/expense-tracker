// Modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Start an express app
const app = express();

// Bodyparser Middleware
app.use(express.json());

// Get the DB url
const db = process.env.mongoURI || require('config').get('mongoURI');

// Connect to MongoDB
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Get the port
const port = process.env.PORT || 5000;

// Use Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/user/categories', require('./routes/api/user/categories'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Listen for requests
app.listen(port, () => console.log(`Server started on port ${port}`));
