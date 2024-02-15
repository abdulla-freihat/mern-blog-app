const commentSchema = require('../models/commentSchema');


const createComment = async(req ,res)=>{


     try{

        const {content, postId , userId} = req.body;

        if(!userId === req.user.id){
            return res.status(400).json({success:false ,message: 'You are not allowed to create this comment.'})

        }

        const newComment = new commentSchema({
              content,
              postId,
              userId
        })

        await newComment.save();

        return res.status(200).json({success:true ,message: 'Comment created successfully' , newComment});


     }catch(err){

         return res.status(400).json({success:false ,message: err.message})
     }
}


module.exports={

     createComment
}