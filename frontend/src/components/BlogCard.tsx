import React from 'react'
import { Link } from 'react-router-dom';

interface BlogCardProps {
    type: string;
    id: string;
    authorName: string;
    title: string;
    content: string;
    published: string;
}

function BlogCard({type, authorName, title, content, published, id}: BlogCardProps) {
    
  return (
    <Link to={`/blog/${id}`} className='w-[100%]'>
        <div className=' flex gap-[0.5rem] items-center text-[1rem] md:text-[1.2rem] font-light'>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
            </div>
             <h3 className='font-normal'>{authorName}</h3>  | {published.split('T')[0]}
        </div>
        <h2 className='text-[1.5rem] md:text-[2rem] font-bold '>
            {title}
        </h2>
        <p className={`text-[1rem] md:text-[1.2rem] ${type == 'full' ? '' : 'truncate'}`}>{content}</p>
        <div className='text-[#1313135d]'>
            {`${Math.ceil(content.length / 100)} min`}
        </div>
        <hr className='w-[100%] border-[#13131369] mt-[1rem]' />
    </Link>
  )
}

export default BlogCard