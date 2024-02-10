import React from 'react'
import { Button} from 'flowbite-react';

import { useState , useEffect } from 'react'
import { Link, useParams } from "react-router-dom"


const SinglePost = () => {

    const [singlePost , setSinglePost] = useState(null)

    
    const params = useParams();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchPosts = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/get-post/${params.slug}`);
            const data = await fetchPosts.json();
          
            if (data.success === true) {
                console.log(data)
                setSinglePost(data.post);
            }
          } catch (err) {
            console.log(err.message);
          }
        };
    
       
          fetchData();
   
        
      }, [params.slug]);
  return (
    <div>
        { singlePost &&
 
               <div className='max-w-5xl mx-auto p-2'>
         <h1 className='text-center text-3xl font-semi-bold mt-8'>{singlePost.title}</h1>

          <Link to={`/search?category=${singlePost && singlePost.category }`} className='flex justify-center my-8'>
          <Button color="gray" size="sm"  outline pill >
          {singlePost.category}
          </Button>
          </Link>
          
          
       

         <img  className='my-5' src={singlePost.image} alt={singlePost.title}  />
         

               <div className='max-w-2xl mx-auto'>

                    <div className='text-sm p-2 border-b  flex justify-between'>
                        <span>{new Date(singlePost.createdAt).toLocaleDateString() }</span> 
                        <span>{(singlePost.description.length/1000).toFixed(0)} mins read</span>
                    </div> 

                    <div className='p-2 w-full post-content ' dangerouslySetInnerHTML={{__html:singlePost.description}}></div>


               </div>
         </div>
         
         }
    </div>
  )
}

export default SinglePost