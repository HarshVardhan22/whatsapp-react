import React from "react";
import { Button } from "@mui/material";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";

import {auth,provider} from "../../Firebase.js"
const Login = () => {
   
    const signIn =()=>{
        signInWithPopup(auth,provider)
        .then((result)=>console.log(result))
        .catch(err=>alert(err.message));
    }
    return (
    <div classname="login">
      <div className="login__container">
        <div className="login__text">
          <h1> Sign to ReactChat</h1>
        </div>
      </div>
      <Button onClick={signIn}>Sign in with Google</Button>
    </div>
  );
};

export default Login;
