import React, { useEffect, useState } from 'react'
import img from './profile-image.png'
import { UserDetailsApi } from '../Services/Api'
import { isAunthenticate, logout } from '../Services/Auth';
import Navbar from './Navbar';
import { Navigate, useNavigate } from 'react-router-dom';

export default function UserLoginPage ()  {

    const navigate = useNavigate()

    const [user,setUser] = useState({
        name:"",
        email:""
    })

    useEffect(()=>{
        if(isAunthenticate()){
        UserDetailsApi().then((resp)=>{
            console.log(resp);
            setUser({name:resp.data.users[0].displayName,
            email:resp.data.users[0].email})
        })
    }
    },[])

    const LogoutUser=()=>{
        logout();
        navigate('/login')
        
    }
    if(!isAunthenticate()){
        return <Navigate to="/login"/>
    }
  return (
    <div>
            <Navbar LogoutUser={LogoutUser} />
            <div className='text-center'>
                <h3>User Dashboard</h3>
            </div>
            {user.name && user.email ?( 
                <div className='position-absolute top-50 start-50 translate-middle'> 
                 <div className="card w-100 pt-3 mx-auto" style={{color:'white', backgroundColor:'gray'}} >
                <img className="card-img-top mx-auto" src={img} alt="Card" style={{width:'120px'}} />
                <div className="card-body">
                    <p>Hi Welcome ! </p>
                    <h4 className="card-title">{user.name}</h4>
                    <p className="card-text">Email : {user.email}</p>
                    
                </div>
                </div>
                </div>
           ):null}
        
    </div>
  )
}

