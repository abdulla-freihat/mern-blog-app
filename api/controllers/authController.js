
const userSchema = require('../models/userSchema.js');
const bcrypt = require('bcrypt');
const signup = async (req, res , next)=>{


    const {username , email , password} = req.body;

    if(!username || !email || !password || username==='' || email==='' || password===''){

     return res.status(400).json({message : 'All fields are required!'})
               
    }

    


    //hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password , salt)

    const newUser = new userSchema({

          username,
          email,
          password: hash
    })


    try{
        await newUser.save();
        res.status(201).json({success:true ,message : "sign up successfull"})      
    }catch(err){

            res.status(400).json({success:false , message : err.message})
    }
   

      
}


module.exports={

      signup
}