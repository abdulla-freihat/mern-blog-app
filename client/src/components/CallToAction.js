import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center border border-teal-500  rounded-tl-3xl rounded-br-3xl'>
        <div className='flex-1 flex flex-col gap-3 p-6 text-center '>
             <h2 className='text-3xl'>Want to learn more about javascript?</h2>

             <p className='text-gray-500 dark:text-white'>Checkout this resources with 100 javascript resources.</p>

             <Button gradientDuoTone='purpleToPink' >
             <a href='https://www.100jsprojects.com' target="_blank" rel='noopener noreferrer'>100 javascript projects</a> 
             </Button>
        </div>

        <div className=' flex-1 p-6'>

         <img src= 'https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg'    />

        </div>
    </div>



  )
}

export default CallToAction