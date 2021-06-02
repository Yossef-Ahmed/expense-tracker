const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense Tracker',
            version: '2.0.0',
            discription: 'A finance management tool build with the MERN stack to help you record your daily transactions easily, discover your spending habits, and in general, Discover where your money goes.'
        },
    },
    apis: [
        './routes/api/auth/index.js',
        './routes/api/user/categories/index.js'
    ]
}

const app = express();

app.use(express.json());

const DB_URI = process.env.mongoURI || require('config').get('mongoURI');

mongoose.connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

app.use('/api/auth', require('./routes/api/auth/index'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/user/categories', require('./routes/api/user/categories/index'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));