import React from 'react'
import Auth from '../components/Auth'

function Signup() {
  return (
    <div className='h-screen w-[100%] mt-[4rem]'>

      <div className='w-[25rem] mx-auto'>
        <Auth type='signup' />
      </div>   

    </div>
  )
}

export default Signup