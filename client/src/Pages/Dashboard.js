import React, { useState , useEffect } from 'react'

import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

const Dashboard = () => {

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
    <div className='min-h-screen flex flex-col md:flex-row'>

   
      <div className='md:w-56'>
         {/* dashboard sidebar*/}
         <DashSidebar />
      </div>

       {/* dashboard profile*/}
       {tab === 'profile' && <DashProfile />}
    </div>
  )
}

export default Dashboard