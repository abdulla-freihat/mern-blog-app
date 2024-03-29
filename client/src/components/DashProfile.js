import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { TextInput  , Button , Alert , Modal} from 'flowbite-react'
import { signoutStart , signoutSuccess , signoutFailure } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import {getDownloadURL, getStorage, uploadBytesResumable , ref} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from "react-icons/hi";


import { updateUserStart , updateUserSuccess , updateUserFailure , deleteUserStart , deleteUserSuccess , deleteUserFailure } from '../redux/userSlice'



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


const [showModal , setShowModal] = useState(false);
const [deleteUserSuccessAlert , setDeleteUserSuccessAlert ] = useState(null);
const [deleteUserFailureAlert , setDeleteUserFailureAlert ] = useState(null);



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


      const isPasswordUpdated = formData.password && formData.password.trim() !== '';

 // If the password is updated, perform validation
 if (isPasswordUpdated) {
  // Validate password format
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  const isValidPassword = passwordRegex.test(formData.password);

  if (!isValidPassword) {
      return setUpdateUserFailureAlert('Password must be at least 6 characters with 1 uppercase letter and 1 number.');
  }
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


const deleteUserHandler= async()=>{

  setShowModal(false)

  setDeleteUserSuccessAlert(null)
  setDeleteUserFailureAlert(null)


  try{
    dispatch(deleteUserStart())

   const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/user/delete/${currentUser._id}` , {

     credentials : 'include' , 
     method:'DELETE',
    })

    const data = await res.json();

    if(data.success === false){
 
      dispatch(deleteUserFailure(data.message));
      setUpdateUserFailureAlert(data.message)
         return;
    }


    if(data.success === true){
        
      dispatch(deleteUserSuccess({user: data.deleteUser , message:data.message}));
      setUpdateUserSuccessAlert(data.message)
    
           setTimeout(()=>{

            navigate('/sign-in')
           } , 2000)
           

       
 }

  }catch(err){

    dispatch(deleteUserFailure(err.message))
    setDeleteUserFailureAlert(err.message)
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
      

      setTimeout(()=>{

        navigate('/sign-in')
       } , 2000)

    
         
 }

}




  return (
    <div  className='p-3 max-w-lg mx-auto w-full'>
    <h1 className=' text-xl sm:text-3xl text-center font-bold my-3'>Profile</h1>
    <form onSubmit={handleSubmit}  className='flex  flex-col gap-4 '>
    
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


    {deleteUserFailureAlert && (
       <Alert color="failure" className='mb-2' >
        {deleteUserFailureAlert}
       </Alert>
   
       )}


   {deleteUserSuccessAlert && (
     <Alert color="success" className='mb-2' >
       {deleteUserSuccessAlert}
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
    

    <TextInput defaultValue={currentUser.username} id='username' type="text" placeholder='Username' className='outline-none   ' onChange={handleChange}   />
    <TextInput defaultValue={currentUser.email}  id='email' type="email" placeholder='Email ' className='outline-none  '  onChange={handleChange}    />
    <TextInput type="password"  placeholder='Password' id='password' className='outline-none   '      onChange={handleChange} />

  <Button className='w-full' type='submit' gradientDuoTone='purpleToBlue'>Update Profile</Button>



 {currentUser.isAdmin && <Link to='/create-post'> <Button className='w-full'  gradientDuoTone='purpleToPink'>Create Post</Button> </Link> } 
        
       



      

    </form>

    <div className='mt-3 flex justify-between'>
    <p onClick={()=>setShowModal(true)}   className=' underline  cursor-pointer'>Delete Account</p>
    <p onClick={signoutHandler}  className=' underline  cursor-pointer'>Sign Out</p>
    
    </div>

   
    
    <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
  
       <Modal.Header />
       <Modal.Body>
         <div className='text-center'>

         <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />

          <h3 className='mb-4 text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
          <div className='flex gap-3 justify-center flex-wrap'>
           <Button color='failure' onClick={deleteUserHandler}>Yes , I'm sure</Button>
           <Button onClick={()=>setShowModal(false)} color='gray'>No , Cansel</Button>
          </div>

         </div>
       </Modal.Body>

    </Modal>
 
   
  

</div>
  )
}

export default DashProfile