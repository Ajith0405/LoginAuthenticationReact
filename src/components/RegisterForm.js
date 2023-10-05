import React, { useState } from 'react'
import { RegisterApi } from '../Services/Api'
import { storeUserData } from '../Services/Storage'
import { isAunthenticate } from '../Services/Auth';
import { Navigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

const RegisterForm = () => {
    const initialStateErrors = {
        name: { required: false },
        email: { required: false },
        mobile: { required: false },
        password: { required: false },
        customError: null
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",

    });



    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;

        if (inputs.name === "") {
            errors.name.required = true;
            hasError = true;
        }
        if (inputs.email == "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.mobile == "") {
            errors.mobile.required = true;
            hasError = true;
        }
        if (inputs.password == "") {
            errors.password.required = true;
            hasError = true;
        }


        if (!hasError) {
            setLoading(true);

            RegisterApi(inputs).then((resp) => {
                // console.log(resp);
                storeUserData(resp.data.idToken);
            }).catch((err) => {
                console.log(err);
                if (err.response.data.error.message == "EMAIL_EXISTS") {
                    setErrors({ ...errors, customError: "Email Already Registered.." })
                } else if (String(err.response.data.error.message).includes('WEAK_PASSWORD')) {
                    setErrors({ ...errors, customError: "Password should be at least 6 characters" })
                }
            }).finally(() => {
                setLoading(false);
            })

        }
        setErrors({ ...errors });


    }

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    };

    const handleReset = () => {
        setErrors(initialStateErrors);

    }

    if (isAunthenticate()) {
        return <Navigate to="/userlogin" />
    }

    return (
        <div>
            <Navbar/>      
            <div className='card w-75 mt-3 p-2 position-absolute top-50 start-50 translate-middle' style={{backgroundColor:'#FFF2D8'}}>
                <h1 className='bg-warning rounded-3 w-75 mx-auto py-2'>Register Now</h1>
                <form onSubmit={handleSubmit} >
                    <div className='row'>
                        <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="name" className="form-label" style={{fontWeight:'700',color:'blue'}}>Name</label>
                            <input type="text" className="form-control w-75 mx-auto" id="name" name='name' onChange={handleInput} />
                            {errors.name.required ? (
                                <span className="text-danger" >
                                    Name is required.
                                </span>
                            ) : null}
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="email" className="form-label" style={{fontWeight:'700',color:'blue'}}>Email</label>
                            <input type="email" className="form-control w-75 mx-auto" id="email" name='email' onChange={handleInput} />
                            {errors.email.required ? (
                                <span className='text-danger'>
                                    Email is required.
                                </span>
                            ) : null}
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="mobile" className="form-label"style={{fontWeight:'700',color:'blue'}}>Mobile</label>
                            <input type="text" className="form-control w-75 mx-auto" id="mobile" name='mobile' onChange={handleInput} />
                            {errors.mobile.required ? (
                                <span className="text-danger" >
                                    Mobile number is required.
                                </span>

                            ) : null}

                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="password" className="form-label" style={{fontWeight:'700',color:'blue'}}>Password</label>
                            <input type="password" className="form-control w-75 mx-auto" id="password" name='password' onChange={handleInput} />
                        </div>
                        {errors.password.required ? (
                            <span className="text-danger" >
                                Password is required.
                            </span>

                        ) : null}

                        <div className=''>
                            {errors.customError ? (
                                <span className='text-danger'>
                                    {errors.customError}
                                </span>
                            ) : null}
                        </div>
                        <div >
                            {
                                loading ? (
                                    <span className="spinner-border text-dark mx-auto" role="status"></span>
                                ) : null
                            }
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary me-2" disabled={loading}>Register</button>
                            <button type='reset' className='btn btn-warning ' disabled={loading} onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                </form>
                <div>
                    <h6 className='mt-2'>Already have account? Please <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link> </h6>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm