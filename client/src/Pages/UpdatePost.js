import React , {useState , useEffect} from 'react'
import { TextInput , Select , FileInput, Button, Alert } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {getDownloadURL, getStorage, uploadBytesResumable , ref} from 'firebase/storage'
import {app} from '../firebase'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import{useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom';




const UpdatePost = () => {
    const [file , setFile] = useState(null);

    const [imageUploadProgress , setImageUploadProgress] = useState(null)
  
    const [imageUploadError , setImageUploadError] = useState(null)
  
  
    
  
    const [formData , setFormData] = useState({});
  
  
    const [updatePostSuccessAlert ,setUpdatePostSuccessAlert ] = useState(null);
    const [updatePostErrorAlert ,  setUpdatePostErrorAlert ] = useState(null)
  
    const navigate = useNavigate();
     const {postId} = useParams();

     const {currentUser} = useSelector(state => state.user);


     useEffect(()=>{

        try{
            const fetchData = async()=>{
                  
                const fetchPosts = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/all-posts?postId=${postId}`);

                 const data = await fetchPosts.json();

                if(data.success === false){

                     console.log(data.message);
                     setUpdatePostErrorAlert(data.message)

                     return;
                }

                if(data.success === true){

                    setFormData(data.posts[0])
                    setUpdatePostErrorAlert(null)

                    return;
               }
    
            }
    
             
    
            fetchData()
    
        }catch(err){
    
             console.log(err.message)
        }
    }, [postId])


  
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
       setUpdatePostErrorAlert(null);
       setUpdatePostSuccessAlert(null);
  
       try{
  
        const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/update/${postId}/${currentUser._id}` , {
  
          credentials : 'include' , 
          method:'PUT',
          headers: {
            "content-type": "application/json"
          },
          body:JSON.stringify(formData)
  
         })
  
         const data = await res.json();
  
  
         if(data.success === false){
  
          
         
          setUpdatePostErrorAlert(data.message);
  
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          
          return;
         
           
        }
  
  
        if(data.success === true){
          
         setUpdatePostSuccessAlert(data.message);
         setUpdatePostErrorAlert(null);
  
      
  
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
  
        setUpdatePostErrorAlert(err.message);
        setUpdatePostSuccessAlert(null);
       }
  }
  
    return (
      <div className='my-5'>
      
      <h1 className='text-gray-600 font-semibold text-3xl text-center dark:text-white'>Update Post</h1>
  
      <form onSubmit={handleSubmit} className='my-4 max-w-2xl mx-auto flex flex-col gap-4 p-3'>
  
  
      {updatePostErrorAlert&& (
         <Alert color="failure" className='mb-2' >
          {updatePostErrorAlert}
         </Alert>
     
         )}
  
  
     {updatePostSuccessAlert && (
       <Alert color="success" className='mb-2' >
         {updatePostSuccessAlert}
      </Alert>
     
      )}
  
  
  <div className='flex flex-col gap-2 sm:flex-row'>
      <TextInput id='title' type="text" placeholder='Tiltle' className='outline-none flex-1'  onChange={handleChange} value={formData.title} />
  
      <Select id='category' onChange={handleChange} value={formData.category}>
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
  
        <ReactQuill value={formData.description} onChange={(value) => {setFormData({...formData , description:value})}}  theme="snow" placeholder='Write Something...'  className='h-72 mb-12' required/>
  
        <Button   type='submit' gradientDuoTone='purpleToPink' >Update</Button>
  
  
      </form>
      </div>
    )
}

export default UpdatePost