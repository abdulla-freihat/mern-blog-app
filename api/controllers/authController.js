
const userSchema = require('../models/userSchema.js');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const signup = async (req, res , next)=>{


    const {username , email , password} = req.body;

    if(!username || !email || !password || username==='' || email==='' || password===''){

     return res.status(400).json({success:false  , message : 'Please fill out all fields.'})
               
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

        return res.status(400).json({success:false , message : 'Please fill out all fields.'})
                  
       }


     

     try{

        //check a valid user
     const user = await userSchema.findOne({email});


     

     if(!user){

          return res.status(400).json({success : false , message: 'User Not Found. Please Sign Up'})
     }



     const validPassword = await bcrypt.compare(password , user.password)

     if(!validPassword){

        return res.status(400).json({success : false , message :'Invalid password '})

     }


          //create token

          const token = jwt.sign({id : user._id} , process.env.JWT_SECRET);

          res.cookie('access_token' , token , {httpOnly : true } ).status(201).json({success:true , message : "sign in successfull" , user});

          

       


     }catch(err){

           res.status(400).json({success : false , message: err.message})
     }
      
}




const google = async (req, res)=>{


        const {email , name , googlePhotoUrl} = req.body;

        try{

             const user = await userSchema.findOne({email});
             
             if(user){

                const token = jwt.sign({id : user._id} , process.env.JWT_SECRET);
                res.cookie('access_token' , token , {httpOnly : true } ).status(201).json({success:true , message : "sign in successfull" , user});

  
             }else{

                const generatedPassword = Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8);
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(generatedPassword, salt);  
        
                const newUser = new userSchema({username : name.toLowerCase().split(" ").join("") + Math.random().toString(36).slice(-4)
                  , email : email , password: hash , avatar:googlePhotoUrl});
        
                  await newUser.save();
        
                  const token = jwt.sign({id : newUser._id} , process.env.JWT_SECRET);
                  res.cookie('access_token' , token , {httpOnly : true } ).status(200).json(newUser);
        
             
           }

        }catch(err){

            res.status(400).json({success : false , message: err.message})  
        }
}



const logout = async (req, res)=>{


         try{

            res.clearCookie('access_token');
            res.status(200).json({success:true, message:'User has been logout' });
               
         }catch(err){

            res.status(400).json({success : false , message: err.message})  
  
         }
}
module.exports={

      signup,
      signin,
      google,
      logout
}