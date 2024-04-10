import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='border-b pb-[1rem] mb-[1rem] flex px-[2rem] justify-between items-center'>
        
        <Link to={'/'} className='text-[1.6rem] font-semibold font-serif'>Medium</Link>

        <div className='flex gap-[1rem] items-center'>
            <Link to={'/create'} className='btn-primary'>Create a blog +</Link>

            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">A</span>
            </div>
        </div>

    </div>
  )
}

export default Navbar