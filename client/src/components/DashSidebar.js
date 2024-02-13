
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { MdDashboard } from "react-icons/md";

import { FaUsers } from "react-icons/fa";


import { useState , useEffect } from 'react'

import {useLocation} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { signoutStart , signoutSuccess , signoutFailure } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import {useDispatch , useSelector} from "react-redux";




const DashSidebar = () => {

  const {currentUser} = useSelector(state => state.user);
    const loctaion = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [tab , setTab] = useState('');

    useEffect(()=>{

     const urlParams = new URLSearchParams(window.location.search);
     const tabFromUrl = urlParams.get('tab') ;
     
     if(tabFromUrl){
      setTab(tabFromUrl)  
     }
     
    } , [window.location.search])



    const signoutHandler = async()=>{
 
 
      dispatch(signoutStart());
    
      const res = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/auth/logout`  ,{
   
      credentials: 'include'
      });
   
      const data = await res.json();
      if(data.success === false){
   
        dispatch(signoutFailure(data.message));
           return;
      }
   
      if(data.success === true){
          
        dispatch(signoutSuccess(data));
       
  
              navigate('/sign-in')
       
      
           
   }
  
  }
  return (
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
      <Sidebar.ItemGroup className='flex flex-col gap-1'>



      {currentUser.isAdmin && 

<Link to='/dashboard?tab=dash'>
      <Sidebar.Item active={tab=== 'dash'} icon={MdDashboard}  labelColor='dark' as={'div'}>
      Dashborad
      </Sidebar.Item>
      </Link>


}



      <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab=== 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' :'User'} labelColor='dark' as={'div'}>
          Profile
        </Sidebar.Item>
        </Link>


    

     

{currentUser.isAdmin && 

  <Link to='/dashboard?tab=posts'>
        <Sidebar.Item active={tab=== 'posts'} icon={HiDocumentText}  labelColor='dark' as={'div'}>
         Posts
        </Sidebar.Item>
        </Link>


}


{currentUser.isAdmin && 

<Link to='/dashboard?tab=users'>
      <Sidebar.Item active={tab=== 'users'} icon={FaUsers}  labelColor='dark' as={'div'}>
      Users
      </Sidebar.Item>
      </Link>


}
       
      
        <Sidebar.Item onClick={signoutHandler}   icon={HiArrowSmRight} className='cursor-pointer'>
         Logout
        </Sidebar.Item>
        
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default DashSidebar