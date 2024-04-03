import React from 'react'
import Auth from '../components/Auth'

function Signin() {
  return (
    <div className='h-screen w-[100%] mt-[4rem]'>

      <div className='w-[25rem] mx-auto'>
        <Auth type='signin' />
      </div>   

    </div>
  )
}

export default Signin