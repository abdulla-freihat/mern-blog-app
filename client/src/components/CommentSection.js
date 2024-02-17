import React , {useEffect , useState} from 'react'
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa";
import {useSelector} from 'react-redux'
import { Button, Textarea } from 'flowbite-react';



const CommentSection = ({comment , onLike , onEdit}) => {

    const [user , setUser] = useState({});
 
    const {currentUser} = useSelector(state=>state.user);

    const [isEditing , setIsEditing] = useState(false);

    const [editedContent , setEditedContent] = useState(comment.content)


    useEffect(()=>{

     const getUser = async ()=>{

           try{

            const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/user/${comment.userId}` , {

                credentials : 'include' , 
                
               })

               const data = await res.json();

               if(data.success===true){

                 setUser(data.rest)
               }


           }catch(err){

                console.log(err)
           }
     }


     getUser();
        
    }, [comment])


    const handleEdit = ()=>{

      setIsEditing(true);
      setEditedContent(comment.content)

                
         
   }


   const handleSave =async ()=>{
      try{


        const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/comment/editComment/${comment._id}` , {
    
          credentials : 'include' , 
          method:'PUT',
          headers:{
             'Content-Type' : 'application/json'
          },
          body:JSON.stringify({content:editedContent})
          
         })

        

         if(res.ok){

               setIsEditing(false);
               onEdit(comment, editedContent )
         }
      }catch(err){

         console.log(err)
      }
     
   }


  return (
    <div className='flex  gap-2 border-b p-2'>
    <img src={user.avatar} className='w-10 h-10 object-cover rounded-full'  />
    
    <div className='flex flex-col gap-2 w-full'> 
     <h2 className='font-semibold'>@{user.username} <span className='font-normal text-sm text-gray-500 '>{moment(comment.createdAt).fromNow()}</span></h2>

        {isEditing ? 
        
        (
          <>
          <Textarea className='mb-1 '  value={editedContent} onChange={(e)=>setEditedContent(e.target.value)} />
          <div className='flex gap-2 justify-end '>
             <Button type='button' gradientDuoTone='purpleToBlue' size='sm' onClick={handleSave}>Edit</Button>
             <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={()=>setIsEditing(false)}>Cansel</Button>
          </div>
          </>
        ):(

        <>
          <p className='text-gray-500 dark:text-white'>{comment.content}</p>

          <div className='flex gap-2 items-center border-t p-1'>
              <button className={`text-gray-500 hover:text-blue-500  text-sm  ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'} `} onClick={()=>onLike(comment._id)}><FaThumbsUp /></button>
          <p className='text-sm text-gray-500'>{comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes ===1 ? "like" : "likes")}</p>

           {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && <button onClick={handleEdit} className='text-gray-500 hover:underline text-sm cursor-pointer'>Edit</button>}   
           {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && <button className='text-red-500 hover:underline text-sm cursor-pointer'>Delete</button> }    
        </div>

       </>
        )
        
        }
    
    </div>


    </div>
  )
}

export default CommentSection