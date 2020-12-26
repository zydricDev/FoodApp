const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const updateReceipts = require('./cronJobs/updateReceipts')
const bundleStoreItems = require('./cronJobs/bundleStoreItems')
require('dotenv').config();


app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) =>{
        if(err) throw err;
        console.log('connected to db');
    }
);

app.listen(PORT, ()=> {
    console.log(`Server at port: ${PORT}`)
    updateReceipts()
    bundleStoreItems()
});

app.get('/', (req, res) =>{
    res.send('This is a test api')
})

app.use('/category',require('./routes/ServerOnly/categoryRouter'));

app.use('/users',require('./routes/userRouter'));
app.use('/food',require('./routes/foodRouter'));
app.use('/comments', require('./routes/commentRouter'));
app.use('/map', require('./routes/mapRouter'));
app.use('/precheck', require('./routes/preCheckoutRouter'));
app.use('/checkout', require('./routes/checkoutRouter'));
app.use('/receipt', require('./routes/receiptRouter'));
app.use('/analyze', require('./routes/analyticsRouter'));
