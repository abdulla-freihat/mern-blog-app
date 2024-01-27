import React from 'react'

import { Button,  TextInput ,Label , Alert } from "flowbite-react";   
import { Link } from 'react-router-dom';
import { FaEye , FaRegEyeSlash } from "react-icons/fa";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Signup = () => {


const [formData , setFormData] = useState({});
const navigate= useNavigate();


const [success , setSuccess] = useState(null);
const [error , setError] = useState(null)



  const handleChange = (e)=>{

         setFormData({...formData , [e.target.id] : e.target.value.trim() })
  }



  const submitHandler = async (e)=>{

      e.preventDefault();
  

      setSuccess(null);

        

         // Validate password format
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  const isValidPassword = passwordRegex.test(formData.password);

  if (!isValidPassword) {
    return setError('Password must be at least 6 characters with 1 uppercase letter and 1 number.');
  }
     


      try{

        const res = await fetch ('http://localhost:8000/api/auth/signup' , {
    
         method:'POST',
         body:JSON.stringify(formData),
        

          headers: {
            "content-type": "application/json"
          }

        })


          const data = await res.json();
         

          if(data.success === false){
               return setError(data.message);
             
          }


          if(data.success === true){
            

             setTimeout(()=>{

                  navigate('/sign-in')
             } , 2000)

             return setSuccess(data.message);
          
       }


  
       

      }catch(err){

        setError(err.message)


      }
  }
  return (
   
    <div className='max-w-3xl mx-auto p-3 flex flex-col md:flex-row gap-3 mt-20 items-center '>

         <div >
            <h1 className='text-3xl font-bold'>Abdulla Blog</h1>
            <p className='mt-2'>You can sign up with your email and password or with Google.</p>
         </div>


<div className='w-full'>
         <form   onSubmit={submitHandler}>

                    
         {error && (
  <Alert color="failure" className='mb-2' >
       {error}
    </Alert>
   
)}


{success && (
  <Alert color="success" className='mb-2' >
       {success}
    </Alert>
   
)}


         <div className='flex flex-col  my-4'>
       
            <Label value='Username' className='font-semibold mb-1 ' />

            <TextInput  type='text'  id='username' name='username' onChange={handleChange}/>

            </div>

            <div className='flex flex-col  my-4'>
            <Label value='Email' className='font-semibold mb-1 ' />
            <TextInput type='email' id='email' name='email' placeholder='example@comapny.com'  onChange={handleChange}/>
            </div>



            <div className='flex flex-col my-4'>
            <Label value='Password' className='font-semibold mb-1 ' />
            <TextInput type='password'  id='password' name='password'    onChange={handleChange}  />
            </div>


            <Button type='submit' className='border w-full my-2' gradientDuoTone='purpleToBlue'   >Sign Up</Button>
            <Button className='border w-full my-2' gradientDuoTone='purpleToBlue'   outline  >Continue with google</Button>


         </form>

         <div className='flex gap-1 text-sm'>
          <span>Have an account?</span>
          <Link to='/sign-in' className='text-blue-700 font-semibold'>Sign In</Link>
         </div>
         </div>

       

    </div>

  )
}

export default Signup