import React from 'react'

import image404 from '../mern bog images/image404.png';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';


const Page404 = () => {
  return (
    
       <div className='max-w-lg mx-auto p-7'>
        <img src= {image404}  className='w-128 h-128 mx-auto object-cover' />

        <Link to='/'>
        <Button className='mx-auto' color="failure" size='sm'>GO BACK</Button>

           </Link>
       </div>
            
    
  )
}

export default Page404

