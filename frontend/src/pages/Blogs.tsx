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

      {blogs.map(blog => 

          <BlogCard  key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonyomous"}
                title={blog.title}
                content={blog.content}
                published={blog.published}/>
      )}
      
      
    </div>
  )
}

export default Blogs