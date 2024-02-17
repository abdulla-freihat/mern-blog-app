import React , {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { Link , useNavigate } from 'react-router-dom';
import { Alert, Button,Textarea } from 'flowbite-react';
import CommentSection from './CommentSection';

const Comments = ({postId}) => {

    const {currentUser} = useSelector(state=>state.user);
    const[comment , setComment] = useState('');
    const [commentError , setCommentError] = useState(null)
    const [commentsData , setCommentsData] = useState([]);

    const navigate = useNavigate();





       useEffect(()=>{
     


        const fetchData =async()=>{
            try{

            

                const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/comment/getPostComments/${postId}` )

                
                const data = await res.json()


                 if(data.success===false){
                   return ;
                 }


                 if(data.success===true){
                   setCommentsData(data.comments);
                 }
                 


            }catch(err){

               console.log(err.message)
            }

          }

            fetchData()

       },[postId])


    const handleSubmit=async(e)=>{

         e.preventDefault();

         try{

         

          const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/comment/create` , {

            credentials : 'include' , 
            method:'POST',
            body:JSON.stringify({content:comment , postId , userId:currentUser._id }),
           
       
             headers: {
               "content-type": "application/json"
             }
       
           })

           const data = await res.json();    
    
          if(data.success === true){
            
          setComment('');
          setCommentError(null);
         
  
          }

         }catch(err){

           setCommentError(err.message);
         }
       
         
    }


    const handleLike = async(commentId)=>{

         try{

          if(!currentUser){
            navigate('/sign-in')
          return;
       }

          const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/comment/likeComment/${commentId}` , {

            credentials : 'include' , 
            method:'PUT',
       
           })
       
       
             const data = await res.json();

             if(res.ok){

                  setCommentsData(commentsData.map((comment)=>
                       comment._id === commentId ? {
                         ...comment,
                         likes:data.likes,
                         numberOfLikes : data.likes.length,
                       } : comment
                     
                  ))
             }

         }catch(err){

            console.log(err.message);
         }


         
    }


     const handleEdit = (comment , editedContent)=>{

          setCommentsData(
           commentsData.map((c=>

               c._id === comment._id  ? {...c , content:editedContent} : c
           ))
          )
     }


     const handleDelete =  (commentId)=>{


 
      setCommentsData(
        commentsData.filter((comment=>

          comment._id  !==   commentId
        ))
       )

          
        }
  


  return (
    <div className='max-w-2xl mx-auto w-full p-3'>

     {
        
        currentUser ? 
     
         (

            <div className='flex gap-2 items-center my-5 text-gray-500'>
                <p>Signed in as:</p>
                <img src={currentUser.avatar}  className='rounded-full h-6 w-6 object-cover' />
                <Link className='text-cyan-600 hover:underline' to={'/dashboard?tab=profile'}>
                    @{currentUser.username}
                </Link>
                 
            </div>
         )
     
       :
       (
             
             <div className='text-sm text-teal-500 my-5 flex gap-1'> 
                  you must be signed in to comment. 
                  <Link to={'/sign-in'} className='hover:underline text-blue-500'>Sign In</Link>
             </div>

       )
       
       }


       {currentUser && (
         <form onSubmit={handleSubmit} className='border border-teal-500 p-3 rounded'>
             <Textarea  placeholder='Leave a comment ...' rows={6} maxLength={200}  className='resize-none' value={comment} onChange={(e)=>setComment(e.target.value)}/>

             <div className='flex justify-between items-center mt-3'>
                <p className='text-sm text-gray-500'>{comment.length} characters remaining.</p>
                <Button type='submit' gradientDuoTone='purpleToBlue' outline >Submit</Button>
             </div>

         {commentError && (
              <Alert  color="failure" className='mt-5'>
                {commentError}
              </Alert>
  
            )}
           

         </form>

        
       
       )}


            <div className='my-5 flex gap-2 font-semibold'>
              <span className=''>Comments</span>
              <span className='border px-2 rounded '>{commentsData.length}</span>
            </div>


                {commentsData&& commentsData.length === 0 ?
                
                 (

                  <h5 className='text-center text-md my-5'>No comments yet.</h5>
                 ) :

                 (

                  <div className='flex flex-col gap-3'>


           
                   {commentsData&& commentsData.map((comment)=>(

                   <CommentSection key={comment._id} comment={comment} onLike={handleLike} onEdit ={handleEdit} onDelete ={handleDelete} />
  

                       ))}
                       </div>

                   
                 )
                
                }
         

         
    </div>
  )
}

export default Comments