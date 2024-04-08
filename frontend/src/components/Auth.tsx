import { SignupInput } from '@sahilkmr/medium-common'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from './Input'
import axios from 'axios'
import { BACKEND_URL } from '../config'

function Auth({type}: {type: "signup" | "signin"}) {

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response =await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data.jwt
            console.log(response)
            localStorage.setItem("medium_token", jwt)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='flex flex-col gap-[1rem]'>
        
        <h1>{type == "signup" ? "Create an account" : "Signin to your account"}</h1>

        <h3>{type == "signup" ? "Already have an account ?" : "New here ?"} <Link className='underline' to={type == "signup" ? '/signin': "/signup"}>{type == "signup" ? 'Sign In':" Sign Up"}</Link></h3>

        {type == "signup" ? (<Input label='Name' placeholder='name' onChange={(e) => {
            setPostInputs({
                ...postInputs,
                name: e.target.value,
            })
        }} />) : null}

        <Input label='email' placeholder='email' onChange={(e) => {
            setPostInputs({
                ...postInputs,
                username: e.target.value,
            })
        }} />

        <Input label='password' type='password' placeholder='password' onChange={(e) => {
            setPostInputs({
                ...postInputs,
                password: e.target.value,
            })
        }} />

        <button onClick={sendRequest}>{type == "signup" ? "Sign Up" : "Log in"}</button>

    </div>
  )
}

export default Auth