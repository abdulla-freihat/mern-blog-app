
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userSchema = require('./models/userSchema');
dotenv.config({path:__dirname+'/.env'});





const db = process.env.MONGO_URL;


mongoose.connect(db)
.then(()=>{

           console.log('mongo db is connected')
}).catch(err =>{
         console.log(err);
})



const app = express();



app.listen(process.env.PORT, ()=>{

        console.log('server is running in server 8000')
})


