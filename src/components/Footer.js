import React from 'react'

function Footer() {

    const year = new Date().getFullYear();
    
  return (
    <div>
        <div className='bg-dark py-2 fixed-bottom'>
            <h3 className='text-center text-light'> &copy; copyright -{year} </h3>
        </div>
    </div>
  )
}

export default Footer