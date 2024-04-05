import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { UpdateBlogInput } from '@sahilkmr/medium-common'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useParams } from 'react-router-dom'
import { useBlogs } from '../hooks'

function EditBlog() {

    const { id } = useParams<{ id: string }>();

    const { loading, blogs } = useBlogs(id || '');

    const blogsArray = Array.isArray(blogs) ? blogs : blogs ? [blogs] : [];
    const blog = blogsArray[0]

    console.log(blog)

    const [editInput, setEditInput] = useState<UpdateBlogInput>({
        title: '',
        content: '',
        id: 0,
    });

    
    useEffect(() => {
        if (blog) { 
            setEditInput({
                title: blog.title,
                content: blog.content,
                id: Number(blog.id),
            });
        }

        console.log(editInput)
    }, [blog]); 

    if(loading) {
        return <div className=' mx-auto'>
          loading..
        </div>
      }

      if(blogs == null){
        return <div className=' mx-auto'>
          404..
        </div>
      }


    async function onUpdate() {
        try {
            const response = await axios.put(`${BACKEND_URL}/api/v1/blog`, editInput, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        
        <h1>Edit Blog</h1>

        <div className='flex flex-col gap-[0.25rem]'>
            <label className='pl-[0.25rem]' htmlFor='title' >Title</label>
            <input className='border rounded-[4px] p-[0.5rem]' onChange={e => {
            setEditInput({
                ...editInput,
                title: e.target.value,
            })
        }} value={editInput.title} />
        </div>

        <div className='flex flex-col gap-[0.25rem]'>
            <label className='pl-[0.25rem]' htmlFor='title' >Content</label>
            <input className='border rounded-[4px] p-[0.5rem]' onChange={e => {
            setEditInput({
                ...editInput,
                content: e.target.value,
            })
        }} value={editInput.content} />
        </div>

        <button onClick={onUpdate} className='px-[1rem] bg-green-600 text-white text-[18px] py-[0.5rem] rounded-full'>Publish</button>

    </div>

    
  )
}

export default EditBlog