// import { useState } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import Ayur from "../assets/logp.jpg";

export default function Login() {
    const navigate = useNavigate(); // Add this hook

    // Add form state and handler
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        
        // After successful login, redirect to home
        navigate('/admin');
    };

    return (
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
                            <form onSubmit={handleSubmit} className="logf">
                                <div className="usn">
                                    <label htmlFor="userName">User Name : </label>
                                    <input 
                                        type="text"
                                        id="userName" 
                                        name="userName" 
                                        placeholder="Enter Your UserName"
                                        value={formData.userName}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            userName: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="usp">
                                    <label htmlFor="password">Password : </label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        placeholder="Enter Your Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            password: e.target.value
                                        })}
                                    />
                                </div>
                                <Link to='/forgotpassword'>
                                    <p>Forgot Your Password</p>
                                </Link>
                                <button type="submit">Login</button>
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