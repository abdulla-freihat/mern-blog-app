
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});



const db = process.env.MONGO_URL;
console.log(db)

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


