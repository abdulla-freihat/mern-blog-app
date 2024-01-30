
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';

import { useState , useEffect } from 'react'

import {useLocation} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { signoutStart , signoutSuccess , signoutFailure } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import {useDispatch , useSelector} from "react-redux";



const DashSidebar = () => {

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
      <Sidebar.ItemGroup>
      <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab=== 'profile'} icon={HiUser} label={'User'} labelColor='dark' as={'div'}>
          Profile
        </Sidebar.Item>
        </Link>
      
        <Sidebar.Item onClick={signoutHandler}   icon={HiArrowSmRight} className='cursor-pointer'>
         Logout
        </Sidebar.Item>
        
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default DashSidebar