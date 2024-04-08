import React, { useEffect } from 'react'
import Auth from '../components/Auth'
import { useNavigate } from 'react-router-dom';

function Signup() {

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
        <Auth type='signup' />
      </div>   

    </div>
  )
}

export default Signup