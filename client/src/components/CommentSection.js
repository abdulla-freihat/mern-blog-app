import React , {useEffect , useState} from 'react'
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa";
import {useSelector} from 'react-redux'


const CommentSection = ({comment , onLike}) => {

    const [user , setUser] = useState({});
 
    const {currentUser} = useSelector(state=>state.user);

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
  return (
    <div className='flex  gap-2 border-b p-2'>
    <img src={user.avatar} className='w-10 h-10 object-cover rounded-full'  />
    
    <div className='flex flex-col gap-2'> 
     <h2 className='font-semibold'>@{user.username} <span className='font-normal text-sm text-gray-500 '>{moment(comment.createdAt).fromNow()}</span></h2>
     <p className='text-gray-500'>{comment.content}</p>

     <div className='flex gap-2 items-center border-t p-1'>
         <button className={`text-gray-500 hover:text-blue-500  text-sm  ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'} `} onClick={()=>onLike(comment._id)}><FaThumbsUp /></button>
         <p className='text-sm text-gray-500'>{comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes ===1 ? "like" : "likes")}</p>
         <span className='text-gray-500 hover:underline text-sm cursor-pointer'>Edit</span>
         <span className='text-red-500 hover:underline text-sm cursor-pointer'>Delete</span>
      </div>
    </div>


    </div>
  )
}

export default CommentSection