import React, { useState } from 'react'
import { LoginApi } from '../Services/Api';
import { storeUserData } from '../Services/Storage'
import { isAunthenticate } from '../Services/Auth';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import img from './login.jpg'

const Login = () => {

    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        customError: null
    }

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",

    });

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;

        if (inputs.email == "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password == "") {
            errors.password.required = true;
            hasError = true;
        }



        if (!hasError) {
            setLoading(true);

            LoginApi(inputs).then((res) => {
                storeUserData(res.data.idToken);
            }).catch((err) => {
                // console.log(err);
                if (err.code = "ERR_BAD_REQUEST") {
                    setErrors({ ...errors, customError: "Invalid Username/Password" })
                }

            }).finally(() => {
                setLoading(false);
            })

        }

        setErrors({ ...errors });

    }

    const handleReset = () => {
        setErrors(initialStateErrors);
    }

    if (isAunthenticate()) {
        return <Navigate to="/userlogin" />
    }

    return (
        <div>
            <Navbar />

            
            <div className='card w-75 mt-3 p-3 position-absolute top-50 start-50 translate-middle' style={{backgroundColor:'#FFF2D8',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}} >
                <div className='row'>
                <div className='col-lg-6 rounded-3' >
                    <img className='d-none d-md-block' src={img} style={{width:'37vw',height:'45vh'}} />
                </div>

                <div className='col-lg-6 pt-2 rounded-3 ' style={{backgroundColor:'#FFF2D8'}}>
                <h1 className='text-center p-2' style={{fontWeight:'700',borderBottom:'3px solid red'}}>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className=" form-floating mb-3 mt-3 w-75 mx-auto">
                            <input type="text" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleInput} />
                            <label htmlFor="email">Email</label>
                            {errors.email.required ? (
                                <span className='text-danger'>Email/Username is required..</span>
                            ) : null}
                        </div>
                        <div className=" form-floating mt-3 mb-3 w-75 mx-auto">
                            <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={handleInput} />
                            <label htmlFor="password">Password</label>
                            {errors.password.required ? (
                                <span className='text-danger'> Password is required.. </span>
                            ) : null}
                        </div>
                        <div className='text-danger mx-auto'>
                            {errors.customError ? (
                                <p>{errors.customError}</p>
                            ) : null}
                        </div>
                        {loading ? (
                            <div className='d-flex justify-content-center'>
                                    <span className="spinner-border text-dark " role="status"></span>
                            </div>
                            
                        ) : null}
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary mb-2 me-2" disabled={loading}>Login</button>
                            <button type='reset' className='btn btn-warning mb-2' onClick={handleReset}>Reset</button>
                        </div>
                    </form>
                    <div>
                        <h6 className='text-center'>Create new account?Please <Link to='/register' style={{ textDecoration: 'none' }}>Register</Link>  </h6>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login