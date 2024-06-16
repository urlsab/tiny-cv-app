
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import { auth } from "../../Config/firebase.config";
import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import "./Register.css";


const Register = () => {

    const form = useRef();
    const navigate = useNavigate();
    const curAuth = getAuth();
    // const [user] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [rePassword, setRePassword] = useState('');

    const navigateToSignIn = () => {
        navigate("/");
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // console.log(curAuth, emailAdd, rePassword);
        await createUserWithEmailAndPassword(curAuth, emailAdd, rePassword)
        .then((userCredential) => {
            let userData = userCredential.user;
            userData.displayName = firstName;
            userData.phoneNumber = firstName;
            // console.log(auth);
            console.log(userData);
            console.log(`the user password is: ${rePassword} `);
            console.log(`displayName:${userData.displayName}`);
            console.log(`phoneNumber:${userData.phoneNumber}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            console.log("error from createUserWithEmailAndPassword function")
        })
     
    }

    return (
        <>
            <div className="mainContainer">
                <div className="loginForm">
                
                        <form className="loginFormContainer" ref={form} onSubmit={onSubmitHandler}  >                    
                            <TextField                              
                                name="user_name"
                                type="text"                                    
                                required 

                                // all fields stretch to this width
                                sx={{width:"280px"}}
                                                                
                                label="Full name"   
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}                                
                            />

                            <TextField  
                                type="email"
                                label="Email"
                                name="user_email"
                                required  
                                
                                value={emailAdd}
                                onChange={(e) => setEmailAdd(e.target.value)}                                                                 
                            />

                            <TextField
                                type="password"
                                name="message"
                                label="Password"
                                required  
                                autoComplete="on"
                                 
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}                                                                    
                            />
                                
                            <Button  size="large" color="success" variant="contained" type="submit"> Sign up </Button>
                            <Button onClick={navigateToSignIn} size="large"  variant="outlined" color="primary"> login </Button>
                        </form>
                </div> 
            </div>
        </>
    );
}

export default Register;