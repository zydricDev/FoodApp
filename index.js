const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) =>{
        if(err) throw err;
        console.log('connected to db');
    }
);

app.listen(PORT, ()=> console.log(`Server at port: ${PORT}`));

app.use('/users',require('./routes/userRouter'));
