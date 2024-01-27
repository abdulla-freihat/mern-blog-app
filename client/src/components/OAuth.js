import React from 'react'
import { Button } from "flowbite-react";   

import { AiFillGoogleCircle } from 'react-icons/ai';

import {GoogleAuthProvider, signInWithPopup , getAuth} from  'firebase/auth';

import {app} from "../firebase"

import {  useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';




const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleGoogleClick = async()=>{
        const auth = getAuth(app);
      
    
    
    const provider = new GoogleAuthProvider();
    
    provider.setCustomParameters({prompt : 'select_account'});
    
    try{
    
    
         const resultFromGoogle = await signInWithPopup(auth ,provider)
         
          const res = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/auth/google`,{
    
            credentials : 'include' , 
            method:'POST',
            body:JSON.stringify({
                   name : resultFromGoogle.user.displayName,
                   email : resultFromGoogle.user.email,
                   googlePhotoUrl : resultFromGoogle.user.photoURL,
            }),
           
    
               
       
             headers: {
               "content-type": "application/json"
             }
          })
    
             const data = await res.json();
             
             if(data.success === true){
            
                dispatch(signInSuccess({ user: data.user, message: data.message }));
                 setTimeout(()=>{
        
                      navigate('/')
                 } , 2000)
    
                }
         
    }catch(err){
    console.log(err)
         
    }
              
    }
  return (
    <Button type='button' className='border w-full my-2' gradientDuoTone='pinkToOrange'   outline  onClick={handleGoogleClick} >
     <AiFillGoogleCircle className='me-1 w-6 h-6' />
    Continue with google
    </Button>

  )
}

export default OAuth