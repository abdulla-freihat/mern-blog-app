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
    return res.status(201).json({success:true , message:'Post added successfully' , savePost , slug});


  }catch(err){

    return res.status(400).json({success:false , message:err.message})

  }

}



const getAllPosts = async (req, res) => {
  try {

      const startIndex = parseInt(req.query.startIndex) || 0;

       const limit = parseInt(req.query.limit) || 9;
       const sortDirection = req.query.order === 'asc' ? 1 : -1 ;





    const posts = await postSchema.find({

         ...(req.query.userId && {userId : req.query.userId}),
         ...(req.query.category && {category : req.query.category}),
         ...(req.query.slug && {slug : req.query.slug}),
         ...(req.query.postId && {_id : req.query.postId}),
         ...(req.query.searchTerm && {
               
             $or:[
              {title: {$regex : req.query.searchTerm , $options:'i'}} ,
              {description: {$regex : req.query.searchTerm , $options:'i'}} ,
             ],
         })
        }).sort({updatedAt : sortDirection}).skip(startIndex).limit(limit);
    


       const totalPosts = await postSchema.countDocuments();


       const now = new Date();

       const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() -1 ,
            now.getDate()

       )

       const lastMonthPosts = await postSchema.countDocuments({

            //greater than one month ago
            createdAt : {$gte : oneMonthAgo}
       })

    if (!posts || posts.length === 0) { // Check if posts array is empty
      return res.status(403).json({ success: false, message: 'There are no posts.' });
    }



    return res.status(200).json({ success: true, posts , totalPosts , lastMonthPosts });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};


const deletePost = async(req , res)=>{

const post = await postSchema.findById(req.params.id);

if(!post){

  return res.status(403).json({ success: false, message: 'Post not found.'});

}

if(req.user.id !== post.userId){

  return res.status(401).json({ success: false, message: 'you can only delete your own posts.'});

}

try{

  await postSchema.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: 'post has been deleted'});


   
}catch(err){

  return res.status(400).json({ success: false, message: err.message});

}
   
}

module.exports={
   createPost,
   getAllPosts,
   deletePost
}