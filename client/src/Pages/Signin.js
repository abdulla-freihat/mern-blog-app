import React from 'react'
import { Button,  TextInput ,Label , Alert } from "flowbite-react";   
import { Link } from 'react-router-dom';
import { FaEye , FaRegEyeSlash } from "react-icons/fa";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInStart , signInSuccess , signInFailure } from '../redux/userSlice';
import {useDispatch , useSelector} from "react-redux";
import OAuth from '../components/OAuth';

const Signin = () => {

  const [formData , setFormData] = useState({});
  const {loading , error , success} = useSelector(state => state.user);
  const [signinSuccessAlert , setSigninSuccessAlert  ] = useState(null);
  const [signinFailureAlert , setSigninFailureAlert ] = useState(null);
    const navigate= useNavigate();
    const dispatch = useDispatch();


 



    const handleChange = (e)=>{

      setFormData({...formData , [e.target.id] : e.target.value.trim() })
}



const submitHandler = async (e)=>{

  e.preventDefault();



  setSigninSuccessAlert(null)
  setSigninFailureAlert(null)
 


  try{
    dispatch(signInStart());

    const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/auth/signin` , {

     credentials : 'include' , 
     method:'POST',
     body:JSON.stringify(formData),
    

      headers: {
        "content-type": "application/json"
      }

    })


      const data = await res.json();
     

      if(data.success === false){
        dispatch(signInFailure(data.message));

        setSigninFailureAlert(data.message)
         
      }


      if(data.success === true){
        
        dispatch(signInSuccess({ user: data.user, message: data.message }));
        setSigninSuccessAlert(data.message)
         setTimeout(()=>{

              navigate('/')
         } , 2000)

       
      
   }



   

  }catch(err){

  signInFailure(err.message)

  setSigninFailureAlert(err.message)
  }
}


  return (
    <div className='max-w-3xl mx-auto p-3 flex flex-col md:flex-row gap-3 mt-20 items-center '>

         <div >
            <h1 className='text-3xl font-bold'>Abdulla Blog</h1>
            <p className='mt-2'>You can sign in with your email and password or with Google.</p>
         </div>


<div className='w-full'>
         <form   onSubmit={submitHandler}>


         {signinFailureAlert && (
       <Alert color="failure" className='mb-2' >
        {signinFailureAlert}
       </Alert>
   
       )}


   {signinSuccessAlert && (
     <Alert color="success" className='mb-2' >
       {signinSuccessAlert}
    </Alert>
   
    )}
    
      
            <div className='flex flex-col  my-4'>
            <Label value='Email' className='font-semibold mb-1 ' />
            <TextInput type='email' id='email' name='email' placeholder='example@comapny.com'  onChange={handleChange}/>
            </div>



            <div className='flex flex-col my-4'>
            <Label value='Password' className='font-semibold mb-1 ' />
            <TextInput type='password'  id='password' name='password'    onChange={handleChange}  />
            </div>


            <Button type='submit' className='border w-full my-2' gradientDuoTone='purpleToBlue'   >Sign In</Button>
                <OAuth />

         </form>

         <div className='flex gap-1 text-sm'>
          <span>Have an account?</span>
          <Link to='/sign-up' className='text-blue-700 font-semibold'>Sign Up</Link>
         </div>
         </div>

       

    </div>
  )
}

export default Signin