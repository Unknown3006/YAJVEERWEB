// import { useState } from "react";
import "../CSS/Login.css";
import Ayur from "../assets/logp.jpg";
import { Link } from "react-router";
export default function Login(){
    return(
        <>
            <div className="welcome-header">
                <h1>Welcome to Yajveer!</h1>
                <p>Please Login to your account</p>
            </div>
            <div className="log">
                    <div className="imgsec">
                        <img src={Ayur} alt="Yajveer" />
                    </div>
                    <div className="logform">
                        <div className="mainlog">
                            <h2 className="form-title">Admin Login</h2>
                            <div className="field">
                                <form action="" className="logf">
                                    <div className="usn">
                                            <label htmlFor="userName">User Name : </label>
                                     <input type="text"id="userName" name="userName" placeholder="Enter Your UserName"/>
                                    </div>
                                    <div className="usp">
                                             <label htmlFor="password">Password : </label>
                                     <input type="password" id="password" name="password" placeholder="Enter Your Password"></input>
                                    </div>
                                    <Link to='/forgotpassword'>
                                    <p>Forgot Your Password</p>
                                    </Link>
                                    <button>Login</button>
                                </form>
                                
                                <div className="newus">
                                    <p className="ne">New User ? </p>
                                    <Link to='/register'>
                                    <p className="ne1">SignUp</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
};