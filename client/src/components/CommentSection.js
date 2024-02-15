import React , {useEffect , useState} from 'react'
import moment from 'moment'

const CommentSection = ({comment}) => {

    const [user , setUser] = useState({});
    console.log(user)

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
     <h2 className='font-semibold'>@{user.username} <span className='font-normal text-sm text-gray-500'>{moment(comment.createdAt).fromNow()}</span></h2>
     <p className='text-gray-500'>{comment.content}</p>

     <div className='flex gap-2 border-t p-1'>
         <span className='text-gray-500 hover:underline text-sm cursor-pointer'>Like</span>
         <span className='text-gray-500 hover:underline text-sm cursor-pointer'>Edit</span>
         <span className='text-red-500 hover:underline text-sm cursor-pointer'>Delete</span>
      </div>
    </div>


    </div>
  )
}

export default CommentSection