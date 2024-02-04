import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { TextInput  , Button , Alert} from 'flowbite-react'
import { signoutStart , signoutSuccess , signoutFailure } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import {getDownloadURL, getStorage, uploadBytesResumable , ref} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { updateUserStart , updateUserSuccess , updateUserFailure } from '../redux/userSlice'



const DashProfile = () => {

  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef =useRef();
  const [imageFile , setImageFile] = useState(null);
  const [fileImageUrl ,setFileImageUrl] = useState(null)
  const [imageFileUploadProgress , setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError , setImageFileUploadError] = useState(null)

  const [formData , setFormData] = useState({});

const [updateUserSuccessAlert , setUpdateUserSuccessAlert ] = useState(null);
const [updateUserFailureAlert , setUpdateUserFailureAlert ] = useState(null);






useEffect(()=>{

   if(imageFile){

     uploadImage()
   }
}, [imageFile])



const uploadImage = async ()=>{

 // service firebase.storage {
 //   match /b/{bucket}/o {
 //     match /{allPaths=**} {
 //       allow read;
 //       allow write: if
 //       request.resource.size < 2 * 1024 * 1024 &&
 //       request.resource.contentType.matches('image/.*')
 //       
 //     }
 //   }
 // }


setImageFileUploadError(null)
 const storage = getStorage(app);

 const fileName = new Date().getTime() + imageFile.name; 

 const storageRef = ref(storage , fileName);

 const uploadTask = uploadBytesResumable(storageRef , imageFile);

 uploadTask.on(
   'state_changed',
   (snapshot)=>{

     const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;

      setImageFileUploadProgress(progress.toFixed(0))

   },
   (error)=>{

      setImageFileUploadError('Could not upload image (file must be less than 2MB)')
      setImageFileUploadProgress(null)
      setImageFile(null)
      setFileImageUrl(null)
   },



   ()=>{

      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{

         setFileImageUrl(downloadURL)

         setFormData({...formData , avatar:downloadURL})
      })
   }
 )
     
}


const handleImageChange = (e)=>{
       const file = e.target.files[0];

       if(file){
        setImageFile(file);
        setFileImageUrl(URL.createObjectURL(file));
       }

       
       

}



const handleChange =(e)=>{

   setFormData({...formData , [e.target.id]:e.target.value})
}



const handleSubmit= async (e)=>{

      e.preventDefault();
      setUpdateUserSuccessAlert(null)
      setUpdateUserFailureAlert(null)

  

      if(Object.keys(formData).length === 0){
          setUpdateUserFailureAlert('No changes made.')
         return;
      }


       try{
           
        dispatch(updateUserStart());

        const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/user/update/${currentUser._id}` , {

          credentials : 'include' , 
          method:'PUT',
          body:JSON.stringify(formData),
         
     
           headers: {
             "content-type": "application/json"
           }
     
         })

         const data = await res.json();

         if(data.success === false){
          dispatch(updateUserFailure(data.message));
          
          setUpdateUserFailureAlert(data.message)
           
        }
  
  
        if(data.success === true){
          
          dispatch(updateUserSuccess({ user: data.updateUser, message: data.message }));
           setUpdateUserSuccessAlert(data.message)
        
          }  


       }catch(err){

        updateUserFailure(err.message)
        setUpdateUserFailureAlert(err.message)
       }
}





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
    <div  className='p-3 max-w-lg mx-auto w-full'>
    <h1 className=' text-xl sm:text-3xl text-center font-bold my-3'>Profile</h1>
    <form onSubmit={handleSubmit}  className='flex  flex-col gap-2 '>
    
    {updateUserFailureAlert && (
       <Alert color="failure" className='mb-2' >
        {updateUserFailureAlert}
       </Alert>
   
       )}


   {updateUserSuccessAlert && (
     <Alert color="success" className='mb-2' >
       {updateUserSuccessAlert}
    </Alert>
   
    )}

<input  type="file" className='hidden' accept='image/*'  ref={fileRef} onChange={handleImageChange} />
<div onClick={()=>fileRef.current.click()}   className='relative m-auto bg-gray-300 p-1 rounded-full'>

{imageFileUploadProgress && (

  <CircularProgressbar value={imageFileUploadProgress || 0}  text={`${imageFileUploadProgress}%`}  
  strokeWidth={5} 
  styles={{
    root:{
       width:'100%',
       height:'100%',
       position : 'absolute',
       top:0,
       left:0
    },
    path:{

      stroke : `rgba(62 , 152 , 199 , ${imageFileUploadProgress / 100})`
    },
  }}/>
)}
<img  src={fileImageUrl||  currentUser.avatar}   className={`cursor-pointer m-auto w-16 h-16 sm:w-24 sm:h-24 object-cover hover:opacity-75 rounded-full ${imageFileUploadProgress && imageFileUploadProgress <100 && 'opacity-60' } `}   />

    </div>

 {imageFileUploadError && (
  <Alert color='failure' >
       {imageFileUploadError}
     </Alert>
 )}
    

    <TextInput defaultValue={currentUser.username} id='username' type="text" placeholder='Username' className='outline-none  p-3 ' onChange={handleChange}   />
    <TextInput defaultValue={currentUser.email}  id='email' type="email" placeholder='Email ' className='outline-none  p-3 '  onChange={handleChange}    />
    <TextInput type="password"  placeholder='Password' id='password' className='outline-none  p-3 '      onChange={handleChange} />

  <Button type='submit' gradientDuoTone='purpleToBlue'>update profile</Button>
        
       



      

    </form>

    <div className='mt-3 text-right'>
    <p onClick={signoutHandler}  className=' underline  cursor-pointer'>Sign Out</p>
    </div>

   
    
 
   
  

</div>
  )
}

export default DashProfile