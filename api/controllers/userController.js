const bcrypt = require('bcrypt');
const userSchema = require('../models/userSchema.js');
const test = (req , res)=>{

    res.json({message:'api is working'});
}


const updateUser = async(req,res)=>{
if(req.user.id !== req.params.id){

     return res.status(403).json({success:false , message:'You are not allowed to update this user.'})
}

if(req.body.password){

    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt);  


}

if(req.body.username){

     if(req.body.username.length < 5 ||req.body.username.length > 20 ){

        return res.status(400).json({success:false , message:'User name must be between 5 and 20 characters.'})

     }

     if(req.body.username.includes(' ')){

        return res.status(400).json({success:false , message:'User name cannot contain spaces.'})

     }
}


try{

     const updateUser = await userSchema.findByIdAndUpdate(req.params.id ,{

         $set : { //$set used to update

             username : req.body.username,
             email : req.body.email,
             avatar : req.body.avatar,
             password : req.body.password
         }   
     } , {new:true}) //send the new informations

     res.status(200).json({success:true , message: 'User updated successfully' ,   updateUser})
}catch(err){

    res.status(400).json({success : false , message: err.message})  

}
     
}

module.exports={
     test,
      updateUser
}