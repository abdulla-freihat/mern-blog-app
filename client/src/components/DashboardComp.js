import React from 'react'
import { useState , useEffect } from 'react';

import {useSelector} from 'react-redux';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { FaLongArrowAltUp } from "react-icons/fa";

import { FaUsers } from "react-icons/fa";
import { Button , Table } from 'flowbite-react';
import { Link } from 'react-router-dom';



const DashboardComp = () => {

    const [users , setUsers] = useState([])
    const[posts , setPosts] = useState([])

    const [totalUsers , setTotalUsers] = useState(0);
    const [totalPosts , setTotalPosts] = useState(0);

    const[lastMonthUsers , setLastMonthUsers] = useState(0)
    const[lastMonthPosts , setLastMonthPosts] = useState(0)

    const{currentUser} = useSelector(state =>state.user);



    useEffect(()=>{

           const fetchUsers = async ()=>{

            try{

                const res = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/user/getUsers?limit=3`,{

                    credentials:'include'
                  }) 
   
                  const data = await res.json();
   
                  if(data.success === true){
                        setUsers(data.users)
                        setTotalUsers(data.totalUsers)
                        setLastMonthUsers(data.lastMonthUsers)
                    
                  }
                


            }catch(err){

                 console.log(err.message)
            }
             
           }


           




           const fetchPosts = async ()=>{

            try{

                const res = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/all-posts?limit=5`) 
   
                  const data = await res.json();
   
                  if(data.success === true){
                        setPosts(data.posts)
                        setTotalPosts(data.totalPosts)
                        setLastMonthPosts(data.lastMonthPosts)
                    
                  }
                


            }catch(err){

                 console.log(err.message)
            }
             
           }






           if(currentUser.isAdmin){

            fetchUsers()
            fetchPosts()
           }



    } , [currentUser])



  
  return (
    <div className=' w-full p-2'>

    

        {/* top section*/}
        <div className='flex flex-col sm:flex-row gap-5 mt-5 max-w-3xl mx-auto '>
            <div className='shadow rounded p-3 w-full dark:border border-teal-500'>
                <div className='flex justify-between'>

                <div>
                    <h3 className='text-gray-500'>TOTAL USERS</h3>
                    <p className='font-semibold text-xl'>{totalUsers}</p>

                    </div>

                    <div className='bg-teal-600 rounded-full p-1 h-10 w-10 flex justify-center items-center text-white text-xl'>
                         <FaUsers />
                    </div>
                </div>

                 <div className='mt-2 flex gap-2'>
                 <div className='flex items-center text-teal-500'>
                {lastMonthUsers  === 0 ?   ''  : <FaLongArrowAltUp/>   } 
                    <span >{lastMonthUsers}</span> 
                    </div>
                    <span className='text-gray-500'>Last Month</span>
                 </div>
            </div>
            <div className='shadow rounded p-3 w-full dark:border border-teal-500'>
                <div className='flex justify-between'>

                <div>
                    <h3 className='text-gray-500'>TOTAL POSTS</h3>
                    <p className='font-semibold text-xl'>{totalPosts}</p>

                    </div>

                    <div className='bg-green-600 rounded-full p-1 h-10 w-10 flex justify-center items-center text-white text-xl'>
                         <HiDocumentText/>
                    </div>
                </div>

                 <div className='mt-2 flex gap-2'>
                 <div className='flex items-center text-teal-500'>
                  {lastMonthPosts === 0 ? '' : <FaLongArrowAltUp />} 
                    <span >{lastMonthPosts}</span> 
                    </div>
                    <span className='text-gray-500'>Last Month</span>
                 </div>
            </div>




            



        </div>



          {/* recent users section*/}

          <div className='my-5 max-w-2xl mx-auto'>
            <div className='rounded shadow p-2 flex flex-col gap-2 dark:border border-teal-500'>
            <div className='flex justify-between items-center border-b p-1'>
                  <p className='font-semibold text-sm'>Recent Users</p>
                  <Link to={'/dashboard?tab=users'}>
                  <Button gradientDuoTone='purpleToBlue' size='sm' outline>See All</Button>
                  </Link>
            </div>


            <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User Image</Table.HeadCell>
          <Table.HeadCell>user Name</Table.HeadCell>
         
        </Table.Head>
        <Table.Body className="divide-y">

        {users && users.map((user  , index)=>(

            <Table.Row  key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <img src={user.avatar} className='w-12 h-12 rounded-full object-cover' />
            </Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            
            
          </Table.Row>
        ))}
         
        
          
        </Table.Body>
      </Table>
    </div>
            </div>
          </div>





           {/* recent posts section*/}

           <div className='my-5 max-w-2xl mx-auto'>
            <div className='rounded shadow p-2 flex flex-col gap-2 dark:border border-teal-500'>
            <div className='flex justify-between items-center border-b p-1'>
                  <p className='font-semibold text-sm'>Recent Posts</p>
                  <Link to={'/dashboard?tab=posts'}>
                  <Button gradientDuoTone='purpleToBlue' size='sm' outline>See All</Button>
                  </Link>
            </div>


            <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Post Category</Table.HeadCell>
         
        </Table.Head>
        <Table.Body className="divide-y">

        {posts && posts.map((post , index)=>(

            <Table.Row  key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell><Link  to={`/post/${post.slug}`}><img className=" h-10 object-cover" src={post.image} alt={post.title} /></Link></Table.Cell>
                <Table.Cell><Link  className='hover:underline text-gray-500 font-md dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link></Table.Cell>
            <Table.Cell>{post.category}</Table.Cell>
            
            
          </Table.Row>
        ))}
         
        
          
        </Table.Body>
      </Table>
    </div>
            </div>
          </div>


    </div>
  )
}

export default DashboardComp