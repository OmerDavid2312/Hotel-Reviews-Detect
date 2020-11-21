const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('./configs/mongo');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv/config');

const usersRoute = require('./routes/user');
const weatherRoute = require('./routes/weather')
const hotelRoute = require('./routes/hotel');

const app = express();
mongoose.connectMongo()

//Configs
app.use(cors());
app.use(bodyparser.json());

//Routes
app.use('/api/users',usersRoute);
app.use('/api/weather',weatherRoute);
app.use('/api/hotels',hotelRoute);


app.listen(PORT,()=>{
    console.log('Server is running on port ' + PORT);
})