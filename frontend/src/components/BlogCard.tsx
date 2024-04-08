import React from 'react'
import { Link } from 'react-router-dom';

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    published: string;
}

function BlogCard({authorName, title, content, published, id}: BlogCardProps) {
    
  return (
    <Link to={`/blog/${id}`}>
        <div className='font-thin flex gap-[0.5rem] items-center'>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
            </div>
                {authorName} . {published.split('T')[0]}
        </div>
        <h2 className='text-[1.5rem] font-bold'>
            {title}
        </h2>
        <p>{content}</p>
        <div>
            {`${Math.ceil(content.length / 100)} min`}
        </div>
    </Link>
  )
}

export default BlogCard