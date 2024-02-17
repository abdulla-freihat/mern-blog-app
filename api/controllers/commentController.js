const commentSchema = require('../models/commentSchema');


const createComment = async(req ,res)=>{


     try{

        const {content, postId , userId} = req.body;

        if(!userId === req.user.id){
            return res.status(403).json({success:false ,message: 'You are not allowed to create this comment.'})

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


const getPostComments = async (req, res) => {
    try {
        const comments = await commentSchema
            .find({ postId: req.params.postId })
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, comments });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}


const likeComment = async(req,res)=>{

        try{

             const comment = await commentSchema.findById(req.params.commentId);

             if(!comment){

                return res.status(403).json({success:false ,message: 'No comment found.'})

             }

             const userIndex = comment.likes.indexOf(req.user.id);
             
             if(userIndex === -1){

                    comment.numberOfLikes +=1;
                  comment.likes.push(req.user.id);
                    
             }else{
                comment.numberOfLikes -=1;
                comment.likes.splice(userIndex , 1);

                 
             }

             await comment.save();
             return res.status(200).json(comment);



        }catch(err){

            return res.status(400).json({ success: false, message: err.message });

        }
}


const editComment = async(req ,res)=>{

     try{

         const comment = await commentSchema.findById(req.params.commentId);
         if(!comment){

            return res.status(403).json({success:false ,message: 'No comment found.'})

         }


         if(comment.userId !== req.user.id && !req.user.isAdmin){

            return res.status(403).json({success:false ,message: 'You are not allowed to edit this comment'})

         }


          const editedComment = await commentSchema.findByIdAndUpdate(

              req.params.commentId,
              {content : req.body.content},
              {new :true}

          );

           

          return res.status(200).json(editedComment);





     }catch(err){

        return res.status(400).json({ success: false, message: err.message });

     }
}


module.exports={

     createComment,
     getPostComments,
     likeComment,
     editComment
}