import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({title , category , image , slug}) => {


 
  return (
   
    <div className=' flex flex-col gap-2 border hover:border-2 border-teal-500 rounded group  h-[380px]'>
          <Link  to={`/post/${slug}`}>
           <img src={image} alt={title}  className=' h-[210px] object-cover w-full group-hover:h-[200px] transtion-all duration-300 z-20 '/>
           </Link>

           <div className='p-2 flex flex-col gap-4'>
            <h2 className='font-semibold  text-lg line-clamp-2'>{title}</h2>
            <p className='text-gray-500 italic text-sm'>{category}</p>

            <Link  to={`/post/${slug}`}>
            <Button className='w-full '>Read Article</Button>
           </Link>
            
           </div>
    </div>
   
  )
}

export default PostCard