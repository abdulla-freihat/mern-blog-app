import React from 'react'
import { TextInput , Select , FileInput, Button } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const CreatePost = () => {
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
      <FileInput  className='flex-1'  id="file-upload" accept='image/*' />
      <Button  type='submit' gradientDuoTone='purpleToBlue' outline>Upload Image</Button>

      </div>

      <ReactQuill theme="snow" placeholder='Write Something...'  className='h-72 mb-12' required/>

      <Button   type='submit' gradientDuoTone='purpleToPink' >Publish</Button>


    </form>
    </div>
  )
}

export default CreatePost