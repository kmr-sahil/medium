import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import FullBlog from './pages/FullBlog'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/" element={<Blogs />} />
          <Route path="/blog/:id" element={<FullBlog />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path='/edit/:id' element = {<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App