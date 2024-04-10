import React, { useEffect, useState } from 'react'
import { UpdateBlogInput } from '@sahilkmr/medium-common'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate, useParams } from 'react-router-dom'

function EditBlog() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const token = localStorage.getItem('medium_token') || false;

    useEffect(() => {
        if (!token) {
            navigate("/signup");
        }
    }, [token, navigate]);

    const [editInput, setEditInput] = useState<UpdateBlogInput>({
        title: '',
        content: '',
        id: 0,
    });

    useEffect(() => {
        async function getBlog() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/editcheck/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("medium_token")
                    }
                });
                console.log(response.data.checkBlog);
                const blogs = response.data.checkBlog

                const blogsArray = Array.isArray(blogs) ? blogs : [blogs];
                const blog = blogsArray[0];

            if (blog) {
                setEditInput({
                    title: blog.title,
                    content: blog.content,
                    id: Number(blog.id),
                });
            } else {
              console.log("error happen")  
            }
            } catch (error) {
                console.log("throw him")
                console.log(error);
            }
        }

        getBlog()
        
    },[])

    const onUpdate = async () => {
        try {
            const response = await axios.put(`${BACKEND_URL}/api/v1/blog`, editInput, {
                headers: {
                    Authorization: localStorage.getItem("medium_token")
                }
            });
            console.log(response);
            navigate(`/blog/${editInput.id}`)
        } catch (error) {
            console.log(error);
        }
    };

    if (!token) {
        return <div className='mx-auto'>Redirecting to sign up...</div>;
    }

    return (
        <div className='flex flex-col items-start justify-center gap-[1rem] w-[40rem] mx-auto pt-[2rem]'>
            <h1 className='text-[2rem] font-bold'>Edit Blog</h1>
            <div className='flex flex-col gap-[0.25rem] w-[100%]'>
                <label className='pl-[0.25rem]' htmlFor='title'>Title</label>
                <input
                    className='border rounded-[4px] p-[0.5rem]'
                    onChange={e => setEditInput({ ...editInput, title: e.target.value })}
                    value={editInput.title}
                />
            </div>
            <div className='flex flex-col gap-[0.25rem] w-[100%]'>
                <label className='pl-[0.25rem]' htmlFor='title'>Content</label>
                <textarea
                rows={4}
                    className='border rounded-[4px] p-[0.5rem]'
                    onChange={e => setEditInput({ ...editInput, content: e.target.value })}
                    value={editInput.content}
                />
            </div>
            <button onClick={onUpdate} className='px-[1rem] bg-green-600 text-white text-[18px] py-[0.5rem] rounded-full'>Publish</button>
        </div>
    );
}

export default EditBlog;
