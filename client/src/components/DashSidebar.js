
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';

import { useState , useEffect } from 'react'

import {useLocation} from 'react-router-dom'
import { Link } from 'react-router-dom';


const DashSidebar = () => {

    const loctaion = useLocation();

    const [tab , setTab] = useState('');

    useEffect(()=>{

     const urlParams = new URLSearchParams(window.location.search);
     const tabFromUrl = urlParams.get('tab') ;
     
     if(tabFromUrl){
      setTab(tabFromUrl)  
     }
     
    } , [window.location.search])
  return (
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
      <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab=== 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
          Profile
        </Sidebar.Item>
        </Link>
      
        <Sidebar.Item   icon={HiArrowSmRight} className='cursor-pointer'>
         Logout
        </Sidebar.Item>
        
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default DashSidebar