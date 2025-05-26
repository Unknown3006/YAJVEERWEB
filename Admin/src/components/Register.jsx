import "../CSS/login.css";
import Ayur from "../assets/logp.jpg";
import { Link } from "react-router";
export default function SignUp() {

  return (
    <>
      {/* <Sidebar1></Sidebar1>
        <Sidebar></Sidebar> */}
        <div className="welcome-header">
                <h1>Welcome to Yajveer!</h1>
                <p>Please Login to your account</p>
            </div>
      <div className="log">
        <div className="imgsec">
          <img src={Ayur} alt="Yajveer" />
        </div>
        <div className="logform ">
          <div className="mainlog">
            <h2 className="form-title">Admin SignUp</h2>
            <div className="field">
              <form action="" className="logf">
                <div className="usn">
                  <label htmlFor="userName">User Name : </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="Enter Your UserName"
                  />
                </div>
                <div className="usp">
                  <label htmlFor="password">Password : </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                  ></input>
                </div>
                <div className="usm">
                  <label htmlFor="PhoneNo">Mobile No : </label>
                  <input type="tel" id="PhoneNo" name="PhoneNo" placeholder="Enter Your Mobile No" />
                </div>
                <button>Sign Up</button>
              </form>

              <div className="newus">
                <p className="ne">Already Have Account ? </p>
                <Link to='/'>
                  <p className="ne1">Login</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
