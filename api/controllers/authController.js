
const userSchema = require('../models/userSchema.js');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


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




const signin  = async(req, res)=>{

    const {email , password} = req.body;


    if(!email || !password || email==='' || password===''){

        return res.status(400).json({message : 'All fields are required!'})
                  
       }


     

     try{

        //check a valid user
     const user = await userSchema.findOne({email});


     

     if(!user){

          return res.status(400).json('User Not found')
     }



     const validPassword = await bcrypt.compare(password , user.password)

     if(!validPassword){

        return res.status(400).json('Invalid email or password ')

     }


          //create token

          const token = jwt.sign({id : user._id} , process.env.JWT_SECRET);

          res.cookie('access_token' , token , {httpOnly : true } ).status(201).json({success:true ,user});

          

       


     }catch(err){

           res.status(400).json({success : false , message: err.message})
     }
      
}

module.exports={

      signup,
      signin
}