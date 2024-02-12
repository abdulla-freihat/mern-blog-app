
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

import { Table , Modal , Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { FaCheck , FaTimes  } from "react-icons/fa";




const DashUsers = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);

    const [showModal , setShowModal] = useState(false);
    const[showMore , setShowMore] = useState(true)

    const [userIdToDelete , setUserIdToDelete] = useState('');


    useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchUsers = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/user/getUsers` ,{

                 credentials: 'include'
            });
            const data = await fetchUsers.json();
            if (data.success === true) {
              setUsers(data.users);
              if(data.users.length < 9){
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
        
      }, []);

      // Function to format createdAt to display just the date
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toISOString().split('T')[0];
  };









  const handleShowMore = async()=>{

    const startIndex =  users.length;

    try{

      const fetchPosts = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/user/getUsers?startIndex=${startIndex}`);
      const data = await fetchPosts.json();

      if (data.success === true) {

       setUsers((prev)=>[...prev ,...data.users]);
       if(data.users.length < 9){
         setShowMore(false)
      }
      
      }

    }catch(err){
      console.log(err.message)
    }
}



const handleDeleteUser = async ()=>{

  setShowModal(false);

  try{

    const res = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/user/delete/${userIdToDelete}` ,{
   
      method:'DELETE',
      credentials: 'include'
});


const data = await res.json();


if(data.success === false){

  console.log(data.message);

  return;
}



if(data.success === true){

   setUsers((prev) => prev.filter(user =>user._id !==userIdToDelete));
}

    
  }catch(err){

    console.log(err.message)
  }
    
}


  
  return (
    <div className="overflow-x-auto w-full p-5">
      {users.length === 0 ? (
        <p className="text-center font-semibold text-3xl">No users yet.</p>
      ) : (
        <Table hoverable className="shadow">
          <Table.Head>
            <Table.HeadCell>Data Created</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          {currentUser.isAdmin && users.map((user, index) => (
              <Table.Row key={index}  className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                <Table.Cell className="whitespace-nowrap  text-gray-500 dark:text-white">
                {formatDate(user.createdAt)}
                </Table.Cell>
                
                <Table.Cell><img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.username} /></Table.Cell>
                <Table.Cell className=' text-gray-500 font-md dark:text-white' >{user.username}</Table.Cell>
                <Table.Cell className=' text-gray-500 font-md dark:text-white'>{user.email}</Table.Cell>
                <Table.Cell>
                    {  user.isAdmin ? <FaCheck className='text-xl text-green-600 dark:text-green-500' /> : <FaTimes className='text-xl text-red-600 dark:text-red-500' />}
                </Table.Cell>
                <Table.Cell>
                <Link >
                  <span onClick={()=>{ setShowModal(true); setUserIdToDelete(user._id);}}  className="font-medium text-red-600 hover:underline dark:text-red-500">
                 DELETE
                  </span>
                  </Link>
                </Table.Cell>
              </Table.Row>
              ))}
          
          </Table.Body>
        </Table>

    
      )}

      {showMore && (

<button  onClick={handleShowMore } className='self-center w-full text-teal-500 py-7'>Show More</button>     
)}


      <Modal onClick={()=>setShowModal(false)} show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
  
  <Modal.Header />
  <Modal.Body>
    <div className='text-center'>

    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />

     <h3 className='mb-4 text-gray-500 dark:text-gray-400'>Are you sure you want to delete this user?</h3>
     <div className='flex gap-3 justify-center flex-wrap'>
      <Button color='failure' onClick={handleDeleteUser} >Yes , I'm sure</Button>
      <Button onClick={()=>setShowModal(false)} color='gray'>No , Cansel</Button>
     </div>

    </div>
  </Modal.Body>

</Modal>



    </div>
  )
}

export default DashUsers