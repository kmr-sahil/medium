import React from 'react'
import { useParams } from 'react-router-dom'
import { useBlogs } from '../hooks'
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';

function FullBlog() {

    const { id } = useParams<{ id: string }>();
    const { loading, blogs } = useBlogs(id || '');

    const blogsArray = Array.isArray(blogs) ? blogs : blogs ? [blogs] : [];

    if(loading) {
        return <div className=' mx-auto'>
          loading..
        </div>
      }

      if (blogs.length === 0) {
        return <div className='mx-auto'>No blog found.</div>;
    }

    const blog = blogsArray[0];
    console.log(blog)

    return (
        <div className='w-[100%] p-[1rem]'>
            <Navbar />
            <BlogCard
                id={blog.id}
                type='full'
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                published={blog.published}
            />
        </div>
  )
}

export default FullBlog