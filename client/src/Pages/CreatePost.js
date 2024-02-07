import React , {useState} from 'react'
import { TextInput , Select , FileInput, Button, Alert } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {getDownloadURL, getStorage, uploadBytesResumable , ref} from 'firebase/storage'
import {app} from '../firebase'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CreatePost = () => {


  const [file , setFile] = useState(null);

  const [imageUploadProgress , setImageUploadProgress] = useState(null)

  const [imageUploadError , setImageUploadError] = useState(null)

  const [formData , setFormData] = useState({});





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
  return (
    <div className='my-5'>
    
    <h1 className='text-gray-600 font-semibold text-3xl text-center'>CreatePost</h1>

    <form className='my-4 max-w-2xl mx-auto flex flex-col gap-4 p-3'>


<div className='flex flex-col gap-2 sm:flex-row'>
    <TextInput id='title' type="text" placeholder='Tiltle' className='outline-none flex-1'    />

    <Select>
        <option>uncategorized</option>
        <option>Javascript</option>
        <option>React.js</option>
        <option>Next.js</option>
      </Select>

      </div>

      <div className='flex  gap-2 border-2 border-dashed border-teal-500 p-3  '>
      <FileInput  className='flex-1'  id="file-upload" accept='image/*'  onChange={(e)=>setFile(e.target.files[0])}/>

      <Button onClick={handleUploadImage}  type='submit' gradientDuoTone='purpleToBlue' outline disabled={imageUploadProgress}>
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

      <ReactQuill theme="snow" placeholder='Write Something...'  className='h-72 mb-12' required/>

      <Button   type='submit' gradientDuoTone='purpleToPink' >Publish</Button>


    </form>
    </div>
  )
}

export default CreatePost