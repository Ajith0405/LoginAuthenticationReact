import React from 'react';
import { isAunthenticate } from '../Services/Auth';
import img from './profile-image.png'

const Navbar = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top " style={{borderRadius:'0px 0px 10px 10px'}} >
                <div className="container-fluid">
                    <img src={img} style={{width:'40px'}} ></img>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                           {!isAunthenticate()?(
                           <li className="nav-item">
                                <a className="nav-link" href="/register" style={{fontWeight:'800', color:'white'}} ><i class="fa-solid fa-list fa-lg"></i> Register</a>
                            </li>
                            ):null}
                           {!isAunthenticate()?(
                           <li className="nav-item">
                                <a className="nav-link" href="/login" style={{fontWeight:'800', color:'white'}}> <i class="fa-solid fa-right-to-bracket fa-lg"></i> Login</a>
                            </li>
                            ):null}
                            {isAunthenticate()?(
                            <li className="nav-item">
                                <a className="nav-link" href="/userlogin" style={{fontWeight:'800', color:'white'}}><i class="fa-solid fa-user fa-lg"></i> Dashboard</a>
                            </li>
                            ):null}
                            {isAunthenticate()?(
                            <li className="nav-item">
                                <a className="nav-link" onClick={props.LogoutUser} style={{fontWeight:'800', color:'white',cursor:'pointer'}} >Logout <i class="fa-solid fa-right-from-bracket fa-lg"></i></a>
                            </li> 
                            ):null}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar