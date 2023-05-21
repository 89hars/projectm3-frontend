import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='footer' >
            <h3 className='text-center'>Project3SHA &copy; Ironhack</h3>
            <p className='text-center mt-3'>
                <Link to='/about'>About</Link> |
                <Link to='/contact'>Contact</Link> |
                <Link to='/privacy'>Privacy Policy</Link>
            </p>
        </div>
    )
}

export default Footer
