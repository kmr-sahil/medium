import React from 'react'
import BlogCard from '../components/BlogCard'
import Navbar from '../components/Navbar'
import { useBlogs } from '../hooks'

function Blogs() {

  const { loading, blogs } = useBlogs('bulk');

  console.log(blogs)

  if(loading) {
    return <div className=' mx-auto'>
      loading..
    </div>
  }

  return (
    <div className='p-[1rem] w-[100%]'>

      <Navbar/>

      <div className='w-[40rem] mx-auto flex flex-col gap-[1rem] justify-center items-start'>

      {blogs.map(blog => 

        <BlogCard  key={blog.id}
              type='short'
              id={blog.id}
              authorName={blog.author.name || "Anonyomous"}
              title={blog.title}
              content={blog.content}
              published={blog.published}/>
        )}

      </div>
      
      
    </div>
  )
}

export default Blogs