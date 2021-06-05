import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

import data from './data.js';


import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.use('/api/uploads', uploadRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message });
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')));

//app.get('/', (req, res) => {
//    res.send('Server is ready');
//});

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});