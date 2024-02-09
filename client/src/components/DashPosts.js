import React, { useState, useEffect } from 'react';


import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';


import { Table , Modal , Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";


const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const[showMore , setShowMore] = useState(true)


  const [showModal , setShowModal] = useState(false);
  const [postIdToDelete , setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPosts = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/all-posts?userId=${currentUser._id}`);
        const data = await fetchPosts.json();
        if (data.success === true) {
          setUserPosts(data.posts);
          if(data.posts.length < 9){
             setShowMore(false)
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    if(currentUser.isAdmin){
      fetchData();
    }
    
  }, [currentUser._id]);

  // Function to format createdAt to display just the date
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toISOString().split('T')[0];
  };


  const handleShowMore = async()=>{

       const startIndex =  userPosts.length;

       try{

         const fetchPosts = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/all-posts?userId=${currentUser._id}&startIndex=${startIndex}`);
         const data = await fetchPosts.json();

         if (data.success === true) {

          setUserPosts((prev)=>[...prev ,...data.posts]);
          if(data.posts.length < 9){
            setShowMore(false)
         }
         
         }

       }catch(err){
         console.log(err.message)
       }
  }


  const handleDeletePost = async()=>{

    setShowModal(false)

     try{
      const res = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/delete/${postIdToDelete}/${currentUser._id}` ,{
   
            method:'DELETE',
            credentials: 'include'
      });


      const data = await res.json();

      if(data.success === false){

         console.log(data.message);

         return;
      }


      if(data.success === true){

        setUserPosts(prev=> prev.filter(post => post._id !== postIdToDelete));


     }




     }catch(err){

        console.log(err.message)
     }
     
  }

  return (
    <div className="overflow-x-auto w-full p-5">
      {userPosts.length === 0 ? (
        <p className="text-center font-semibold text-3xl">No posts yet.</p>
      ) : (
        <Table hoverable className="shadow">
          <Table.Head>
            <Table.HeadCell>Data updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentUser.isAdmin && userPosts.map((item, index) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {formatDate(item.updatedAt)}
                </Table.Cell>
                <Table.Cell><Link to={`/post/${item.slug}`}><img className="w-32 h-14 object-cover" src={item.image} alt={item.title} /></Link></Table.Cell>
                <Table.Cell><Link className='hover:underline text-gray-900 font-md dark:text-white' to={`/post/${item.slug}`}>{item.title}</Link></Table.Cell>
                <Table.Cell className=' text-gray-900 font-md dark:text-white'>{item.category}</Table.Cell>
                <Table.Cell>
                  <span onClick={()=>{ setShowModal(true); setPostIdToDelete(item._id); }}  className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer">
                    DELETE
                  </span>
                </Table.Cell>
                <Table.Cell>
                <Link to={`/updtae-post/${item._id}`}>
                  <span  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    EDIT
                  </span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

    
      )}


      {showMore && (

         <button  onClick={handleShowMore }className='self-center w-full text-teal-500 py-7'>Show More</button>     
      )}





      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
  
       <Modal.Header />
       <Modal.Body>
         <div className='text-center'>

         <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />

          <h3 className='mb-4 text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3>
          <div className='flex gap-3 justify-center flex-wrap'>
           <Button color='failure' onClick={handleDeletePost}>Yes , I'm sure</Button>
           <Button onClick={()=>setShowModal(false)} color='gray'>No , Cansel</Button>
          </div>

         </div>
       </Modal.Body>

    </Modal>
    </div>
  );
};

export default DashPosts;

