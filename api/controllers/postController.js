const postSchema = require('../models/postSchema')

const createPost = async(req , res )=>{

    const {title , description  } = req.body;


if(!req.user.isAdmin ){

       return res.status(403).json({success:false , message:'You are not allowed to create a post.'})
}
      
if(!title || !description){

    return res.status(400).json({success:false , message:'Please provide all required fields.'})

}


//instead of id we can use slug by title

const slug = title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g , '');


  const newPost =  new postSchema ({

     ...req.body , slug , userId : req.user.id
  })

  try{
    const savePost =await newPost.save();
    return res.status(201).json({success:true , message:'Post added successfully' , savePost});


  }catch(err){

    return res.status(400).json({success:false , message:err.message})

  }

}




module.exports={
   createPost
}