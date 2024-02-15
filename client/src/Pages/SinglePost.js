import React from 'react'
import { Button} from 'flowbite-react';

import { useState , useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';
import Comments from '../components/Comments';

const SinglePost = () => {

    const [singlePost , setSinglePost] = useState(null)

    const [recentPosts , setRecentPosts] = useState(null);


    
    const params = useParams();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchPosts = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/get-post/${params.slug}`);
            const data = await fetchPosts.json();
          
            if (data.success === true) {
             
                setSinglePost(data.post);
            }
          } catch (err) {
            console.log(err.message);
          }
        };
    
       
          fetchData();
   
        
      }, [params.slug]);




      useEffect(()=>{

       try{


        const fetchData = async () => {
          try {
            const fetchPosts = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/all-posts?limit=3`);
            const data = await fetchPosts.json();
          
            if (data.success === true) {
              
                setRecentPosts(data.posts);
            }
          } catch (err) {
            console.log(err.message);
          }
        };
    
       
          fetchData();

       }catch(err){

         console.log(err)
       }



      }, [])
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
         

               <div className='max-w-2xl mx-auto '>

                    <div className='text-sm p-2 border-b  flex justify-between'>
                        <span>{new Date(singlePost.createdAt).toLocaleDateString() }</span> 
                        <span>{(singlePost.description.length/1000).toFixed(0)} mins read</span>
                    </div> 

                    <div className='p-2 w-full post-content ' dangerouslySetInnerHTML={{__html:singlePost.description}}></div>


               </div>
         </div>
         
         }


          <div className='max-w-4xl mx-auto p-3'>

           <CallToAction />

          </div>


       <Comments postId={singlePost && singlePost._id}  />



          <div className='flex flex-col justify-center items-center mb-5'>
             <h1 className='text-2xl mt-5'>Recent Articles</h1>

             <div className='grid  sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-5 max-w-6xl mx-auto mt-5 p-3'>
                   {recentPosts && recentPosts.map((item , index)=>(

                           <PostCard key={index} title={item.title} category={item.category} image={item.image} slug={item.slug} />
                   ))}
             </div>
          </div>
    </div>
  )
}

export default SinglePost