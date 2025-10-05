import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <nav className='navbar'>
        <Link to="/" className='text-2xl font-bold text-gradient'>Home</Link>
        <Link to='/upload' className='primary-button w-fit'>Upload Resume</Link>
    </nav>
  )
}

export default Navbar