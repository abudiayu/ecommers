import React, { useState, useContext } from "react";
import classes from "./signUp.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {auth} from "../../Utility/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/DataProvider/DataProvider";// Correct usage of DataContext
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  
  const navigate = useNavigate();
  const navStateData = useLocation();



  // Auth handler function for signIn and signUp
  const authHandler = (e) => {
    e.preventDefault();
    const action = e.currentTarget.name;

    if (action === "signIn") {
      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>
      <div className={classes.login_container}>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
        <form onSubmit={authHandler}>
          
          {/* Use onSubmit instead of onClick to trigger form submit */}
          <h1>Sign In</h1>
          {
            navStateData?.state?.msg && (
              <small 
                style={{
                  padding:"5px",
                  textAlign:"center",
                  color:"red",
                  fontWeight:"bold",
                }}
              >
                {navStateData.state.msg}
              </small>
            )
          }
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Controlled input for email
              type="email"
              id="email"
              placeholder="abudy@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)} // Controlled input for password
              required
            />
          </div>
          <button
            type="submit"
            name="signIn"
            className={classes.login_signInButton}
            onClick={authHandler}
          >
            {loading.signIn ? <ClipLoader color="#000" size={14} /> : "Sign In"}
          </button>
          <p>
            By signing in, you agree to Amazon's Terms, Privacy Policy, and
            Cookie Notice.
          </p>
          {/* Create account button */}
          <button
            type="submit"
            name="signUp"
            className={classes.login_registerButton}
            onClick={authHandler}
          >
            {loading.signUp ? (
              <ClipLoader color="#000" size={14} />
            ) : (
              "Create Your Amazon Account"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Auth;
