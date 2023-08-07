import React, { useEffect, useState } from "react";
import "./loginSignUp.css";
import Footer from "../layout/footer";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/loader";
import { useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [showLogin, setShowLogin] = useState(true);
  const [logins, setLogins] = useState(true);
  const [signup, setSignup] = useState(false);

  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();

  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();

  const nameHandler = (e) => {
    setUserName(e.target.value);
  };
  const emailHandler = (e) => {
    setUserEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setUserPassword(e.target.value);
  };

  function registerSubmit(e) {
    e.preventDefault();

    const myForm = { name: userName, email: userEmail, password: userPassword };
    const jsonString = JSON.stringify(myForm);

    dispatch(register(jsonString));
    console.log("this is my form data", jsonString);
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleRegister, setPasswordVisibleRegister] = useState(false);

  const [password, setPassword] = useState("");

  const handlePasswordToggle = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const registerPasswordVisibility = () => {
    setPasswordVisibleRegister((prevVisible) => !prevVisible);
  };

  const signUpHandler = () => {
    setLogins(false);
    setSignup(true);
  };

  const loginHandler = () => {
    setLogins(true);
    setSignup(false);
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log(loginEmail);
    console.log(loginPassword);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, alert, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="loginsignup-container">
          <div className="box-container">
            <div className="form-heading">
              <h1 onClick={loginHandler} className={logins ? "actives" : ""}>
                Login
              </h1>
              <h1 onClick={signUpHandler} className={logins ? "" : "actives"}>
                Register
              </h1>
            </div>
            {logins && (
              <div className="form-container register">
                <section className="login">
                  <MailOutlineIcon className="mail-icon" />
                  <input
                    type="text"
                    name=""
                    id="login-email"
                    placeholder="Enter your email..."
                    // value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </section>
                <section className="login">
                  <LockOpenIcon className="mail-icon" />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name=""
                    id="login-password"
                    placeholder="Enter your passowrd..."
                    // value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button onClick={handlePasswordToggle}>
                    {passwordVisible ? (
                      <VisibilityIcon className="visibility-icon" />
                    ) : (
                      <VisibilityOffIcon className="visibility-icon" />
                    )}
                  </button>
                </section>
                <p className="forgot-password">Forgot Password?</p>
                <button onClick={loginSubmitHandler} className="login-button">
                  Login
                </button>
              </div>
            )}

            {signup && (
              <div
                className={
                  login
                    ? "signup-container register"
                    : "signup-container register"
                }
              >
                <section className="login">
                  <FaceIcon className="mail-icon" />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={nameHandler}
                    placeholder="Enter your name..."
                  />
                </section>
                <section className="login">
                  <MailOutlineIcon className="mail-icon" />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={emailHandler}
                    placeholder="Enter your email..."
                  />
                </section>
                <section className="login">
                  <LockOpenIcon className="mail-icon" />
                  <input
                    type="password"
                    name="password"
                    onChange={passwordHandler}
                    id="password"
                    placeholder="Enter your password..."
                  />
                  <button onClick={registerPasswordVisibility}>
                    {passwordVisibleRegister ? (
                      <VisibilityIcon className="visibility-icon" />
                    ) : (
                      <VisibilityOffIcon className="visibility-icon" />
                    )}
                  </button>
                </section>
                <button onClick={registerSubmit} className="signup-button">
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default LoginSignUp;
