import React, { useEffect } from 'react'
import Auth from '../components/Auth'
import { useNavigate } from 'react-router-dom';

function Signin() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('medium_token') || false
    if(token) {
      navigate("/")
      return
    }

  },[])

  return (
    <div className='h-screen w-[100%] mt-[4rem]'>

      <div className='w-[25rem] mx-auto'>
        <Auth type='signin' />
      </div>   

    </div>
  )
}

export default Signin