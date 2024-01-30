import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TextInput  , Button} from 'flowbite-react'

const DashProfile = () => {

  const {currentUser} = useSelector(state => state.user)
  return (
    <div  className='p-3 max-w-lg mx-auto w-full'>
    <h1 className=' text-xl sm:text-3xl text-center font-bold my-3'>Profile</h1>
    <form  className='flex  flex-col gap-2 '>
    

<input  type="file" className='hidden'  />
<div className='m-auto'>
<img src={currentUser.avatar}   className='cursor-pointer m-auto w-16 h-16 sm:w-20 sm:h-20 object-cover hover:opacity-75 rounded-full'  alt="profile image" />





    </div>

    <TextInput defaultValue={currentUser.username} id='username' type="text" placeholder='Username' className='outline-none  p-3 ' id="username"  />
    <TextInput defaultValue={currentUser.email}  id='email' type="email" placeholder='Email ' className='outline-none  p-3 ' id="email"   />
    <TextInput type="password"  placeholder='Password' id='password' className='outline-none  p-3 '     />

  <Button type='submit' gradientDuoTone='purpleToBlue'>update profile</Button>
        
       



      

    </form>

    <div className='mt-3 text-right'>
    <p  className=' underline  cursor-pointer'>Sign Out</p>
    </div>

   
    
 
   
  

</div>
  )
}

export default DashProfile