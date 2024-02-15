
const mongoose = require('mongoose');




const Schema = mongoose.Schema;


const commentSchema = new Schema({

content:{
     type:String,
      required:true
},
postId:{

     type:String,
     require:true
},
userId:{
    type:String,
     require:true    
},
likes:{

     type:Array,
     default:[]
},
numberOfLikes:{
     type:Number,
     default:0
}

}, {timestamps: true})


module.exports = mongoose.model('Comment' , commentSchema);
