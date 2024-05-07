import React from 'react'
import './Login.css'
import LoginHook from './LoginHook'

function Login() {
    const { instId, username, password, handleChange, submit, submitted, emailValid} = LoginHook()

    return (
        <div className='login-container'>
            <div className='row'>
                <div className='col-sm-6'>
                    <div className='login-left'>
                        <img src={require("../Assets/Images/login-img.png")} alt="" />
                        <div className='login-left-text'>
                            <div className='login-left-header'>
                                Welcome to the School Management system
                            </div>
                            <div className='login-left-desc'>
                                Please enter your credentials to access the system.
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <div className='login-right'>
                        <div className='login-box'>
                            <div className='login-title'>Login</div>
                            <div className='login-form'>
                                <div className='form-group'>
                                    <input type='text' className='form-control flt' placeholder='Institute Id' name='instId' value={instId} onChange={handleChange} />
                                    {submitted && !instId &&
                                        <div className='invalid-feesback'>Institute Id is Required</div>
                                    }
                                </div>
                                <div className='form-group'>
                                    <input type='text' className='form-control' placeholder='User Name' name='username' value={username} onChange={handleChange} />
                                    {submitted && !username &&
                                        <div className='invalid-feesback'> User Name is Required</div>
                                    }
                                    {submitted && !username && emailValid &&
                                        <div className='invalid-feesback'> User Name is InValid</div>
                                    }
                                </div>
                                <div className='form-group'>
                                    <input type='password' className='form-control' placeholder='Password' name='password' value={password} onChange={handleChange} />
                                    {submitted && !password &&
                                        <div className='invalid-feesback'> Password is Required</div>
                                    }
                                </div>
                                <div className='login_button'>
                                    <button type='submit' onClick={submit}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login