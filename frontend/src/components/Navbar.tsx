import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='border-b flex px-[2rem] justify-between'>
        
        <h1>Medium</h1>

        <div className='flex gap-[1rem] items-center'>
            <Link to={'/create'} className='px-[1rem] bg-green-600 text-white text-[18px] py-[0.5rem] rounded-full'>Create a blog +</Link>

            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">A</span>
            </div>
        </div>

       

    </div>
  )
}

export default Navbar