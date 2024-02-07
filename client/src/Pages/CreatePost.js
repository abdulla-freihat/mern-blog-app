import React , {useState} from 'react'
import { TextInput , Select , FileInput, Button, Alert } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {getDownloadURL, getStorage, uploadBytesResumable , ref} from 'firebase/storage'
import {app} from '../firebase'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector  } from 'react-redux'

import { useNavigate } from 'react-router-dom'





const CreatePost = () => {



  const [file , setFile] = useState(null);

  const [imageUploadProgress , setImageUploadProgress] = useState(null)

  const [imageUploadError , setImageUploadError] = useState(null)


  

  const [formData , setFormData] = useState({});


  const [createPostSuccessAlert , setCreatePostSuccessAlert ] = useState(null);

  const [createPostErrorAlert , setCreatePostErrorAlert ] = useState(null)

  const navigate = useNavigate();




  const handleUploadImage = async () =>{

     try{

      if(!file){

           setImageUploadError('Please select an image.')
         return;
      }

      setImageUploadError(null)
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' +file.name; 

      const storageRef = ref(storage , fileName);

      const uploadTask = uploadBytesResumable(storageRef , file);


      uploadTask.on(
       
        'state_changed',
        (snapshot)=>{

          const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;

          setImageUploadProgress(progress.toFixed(0))
    
        },
        (error)=>{

          setImageUploadError('Image upload failed.')
          setImageUploadProgress(null)
          
       },
       ()=>{

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
  
          setImageUploadProgress(null)
          setImageUploadError(null)

          setFormData({...formData , image:downloadURL})

             
        })
     }

      )

     }catch(err){

      setImageUploadError('Image upload failed.')
      setImageUploadProgress(null)
     }

  }


  const handleChange = (e)=>{

     setFormData({...formData , [e.target.id]:e.target.value} )
  }



const handleSubmit =async (e)=>{

     e.preventDefault();
     setCreatePostErrorAlert(null);
     setCreatePostSuccessAlert(null);

     try{

      const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/create` , {

        credentials : 'include' , 
        method:'POST',
        headers: {
          "content-type": "application/json"
        },
        body:JSON.stringify(formData)

       })

       const data = await res.json();


       if(data.success === false){

        
       
        setCreatePostErrorAlert(data.message);

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        
        return;
       
         
      }


      if(data.success === true){
        
       setCreatePostSuccessAlert(data.message);
       setCreatePostErrorAlert(null);

    

       window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

        setTimeout(()=> {
          navigate(`/post/${data.slug}`)

        } ,2000)
      
      
        }  

     }catch(err){

      setCreatePostErrorAlert(err.message);
      setCreatePostSuccessAlert(null);
     }
}

  return (
    <div className='my-5'>
    
    <h1 className='text-gray-600 font-semibold text-3xl text-center'>CreatePost</h1>

    <form onSubmit={handleSubmit} className='my-4 max-w-2xl mx-auto flex flex-col gap-4 p-3'>


    {createPostErrorAlert&& (
       <Alert color="failure" className='mb-2' >
        {createPostErrorAlert}
       </Alert>
   
       )}


   {createPostSuccessAlert && (
     <Alert color="success" className='mb-2' >
       {createPostSuccessAlert}
    </Alert>
   
    )}


<div className='flex flex-col gap-2 sm:flex-row'>
    <TextInput id='title' type="text" placeholder='Tiltle' className='outline-none flex-1'  onChange={handleChange}  />

    <Select id='category' onChange={handleChange}>
        <option>uncategorized</option>
        <option>Javascript</option>
        <option>React.js</option>
        <option>Next.js</option>
      </Select>

      </div>

      <div className='flex  gap-2 border-2 border-dashed border-teal-500 p-3  '>
      <FileInput  className='flex-1'  id="file-upload" accept='image/*'  onChange={(e)=>setFile(e.target.files[0])}/>

      <Button onClick={handleUploadImage}   gradientDuoTone='purpleToBlue' outline disabled={imageUploadProgress}>
      {
        
        imageUploadProgress ? <div className='w-16 h-16'>

             <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0} %`} />


      </div>

      : 'Upload Image'
      
      }
     

      </Button>

      </div>

      {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
      {formData.image && <img src={formData.image} alt='upload' className='w-full h-64 object-cover' />}

      <ReactQuill onChange={(value) => {setFormData({...formData , description:value})}}  theme="snow" placeholder='Write Something...'  className='h-72 mb-12' required/>

      <Button   type='submit' gradientDuoTone='purpleToPink' >Publish</Button>


    </form>
    </div>
  )
}

export default CreatePost