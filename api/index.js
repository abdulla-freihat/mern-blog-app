
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:__dirname+'/.env'});

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');







const db = process.env.MONGO_URL;


mongoose.connect(db)
.then(()=>{

           console.log('mongo db is connected')
}).catch(err =>{
         console.log(err);
})



const app = express();
app.use(express.json());//allow json as the input in backend



app.listen(process.env.PORT, ()=>{

        console.log('server is running in server 8000')
})


app.use('/api/user' , userRoutes);
app.use('/api/auth' , authRoutes);

