import { useEffect, useState } from 'react'
import Input from '../components/Input'
import { CreateBlogInput } from '@sahilkmr/medium-common'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

function CreateBlog() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('medium_token') || false
    if(!token) {
      navigate("/signup")
      return
    }

  },[])

  

    const [blogInputs, setBlogInputs] = useState<CreateBlogInput>({
        title: "",
        content: "",
    })

    async function onPublish() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, blogInputs, {
                headers: {
                    Authorization: localStorage.getItem("medium_token")
                }
            })
            console.log(response.data.blog.id)
            navigate(`/blog/${response.data.blog.id}`)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    
    <div className='p-[1rem] flex flex-col gap-[1rem] max-w-[40rem] mx-auto'>

        <h1 className='text-[2rem] font-bold'>Create your Blog</h1>

        <Input label='Title' placeholder='enter title here' onChange={(e) => {
            setBlogInputs({
                ...blogInputs,
                title: e.target.value,
            })
            
        }} />

            <div className='flex flex-col gap-[0.25rem] w-[100%]'>
                <label className='pl-[0.25rem]' htmlFor='title'>Content</label>
                <textarea
                rows={4}
                    className='border rounded-[4px] p-[0.5rem]'
                    placeholder='enter content'
                    onChange={e => setBlogInputs({ ...blogInputs, content: e.target.value })}
                />
            </div>

        <button onClick={onPublish} className='px-[1rem] bg-green-600 text-white text-[18px] py-[0.5rem] rounded-full'>Publish</button>
        
    </div>
  )
}

export default CreateBlog