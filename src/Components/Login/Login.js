import React from "react";

import { Button } from "@mui/material";

import "./Login.css";

import { signInWithPopup } from "firebase/auth";

import { auth, provider } from "../../Firebase.js";
import { useStateValue } from "../../redux/StateProvider";
import { actionTypes } from "../../redux/reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        
          <h1> Welcome to ReactChat</h1>
          <Button variant="contained" onClick={signIn}>Sign in with Google</Button>
    
      </div>
      
    </div>
  );
};

export default Login;
