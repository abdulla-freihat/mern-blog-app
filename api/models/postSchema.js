
const mongoose = require('mongoose');




const Schema = mongoose.Schema;


const postSchema = new Schema({


    userId:{

        type:String,
        required:true
    },
     title : {

         type:String,
         required:true,
         unique:true
     },
     category:{
      type:String,
      default:'uncategorized'
           
     },
     image:{

        type:String,
        default:'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
       
   },
   description:{

       type:String,
       required:true
   },
   slug:{

     type:String,
     required:true,
     unique:true,

   },
     
}, {timestamps: true})


module.exports = mongoose.model('Post' , postSchema);
