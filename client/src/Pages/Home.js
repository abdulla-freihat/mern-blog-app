import React from 'react'
import { Link } from 'react-router-dom'
import CallToAction from "../components/CallToAction"
import { useState , useEffect } from 'react'
import PostCard from "../components/PostCard";

const Home = () => {

  const [posts , setPosts] = useState([]);

  useEffect(()=>{

    try{


     const fetchData = async () => {
       try {
         const fetchPosts = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/all-posts`);
         const data = await fetchPosts.json();
       
         if (data.success === true) {
           
          setPosts(data.posts);
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
        {/* top section */}
      <div className='flex flex-col gap-4  p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-2xl font-bold lg:text-4xl'>Welcome to my blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Here you'll find a variety of articles and tutorials on topics such as web
              development, software engineering, and programming languages.
        </p>

        <Link to={'/search'} className='text-xs sm:text-sm text-teal-500 font-semibold hover:underline'>View all posts</Link>
      </div>


      <div className='p-3 bg-amber-100 dark:bg-slate-700'>

     <CallToAction />

      </div>


      <div className='max-w-6xl p-3 mx-auto flex flex-col  gap-8 py-7 '>
          {

            posts && posts.length>0  && (

                   <div className=''>

                   <h2 className=' font-semibold text-center text-2xl mb-3'>Recent Posts</h2> 

                   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'> 
                     {posts.map((post , index)=>(
                          <PostCard key={index} title={post.title} image={post.image} category={post.category} slug={post.slug}    />
                         
                     ))}

                   </div>

                   </div>
            )
          }

          <Link to={'/search'} className='text-teal-500 text-center hover:underline' > View all posts</Link>

      </div>
    </div>
  )
}

export default Home