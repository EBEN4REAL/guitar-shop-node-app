import React from 'react';
import Login from '../Register_login/login';

const RegisterLogin = (props) => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customers</h1>
                        <p>If you are a new customer create an account here.</p>
                    </div>
                    <div className="right">
                        <h2>
                            Registered Customers
                        </h2>
                        <p>If you have an accout please log in.</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterLogin;