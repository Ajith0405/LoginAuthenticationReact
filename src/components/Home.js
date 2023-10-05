import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  return (
    <div>
        <Navbar/>
        <section className='position-absolute top-50 start-50 translate-middle'>
            <div>
                <Link className='btn btn-info' to='/login'>Login</Link>
                <Link className='btn btn-info' to='/register'>Register</Link>
                
            </div>

        </section>
    </div>
  )
}

export default Home