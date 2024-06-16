
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../src/Config/firebase.config";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {

    const navigate = useNavigate();
    const curAuth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [user, loading, error] = useAuthState(auth);

    const googleSignIn = () => {
        const googleAuth = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuth);
    }

    const navigateToRegister = () => {
        navigate("/register")
    }

    const handleGoogleSignIn = async (e) => {

        e.preventDefault();

        try {
            await googleSignIn();
            navigate("/dashboard");

        } catch (error) {
            console.log(error.message)
        }
    };

    const onLogin = async (e) => {

        e.preventDefault();

        console.log(curAuth, email, password);

        await signInWithEmailAndPassword(curAuth, email, password)

        .then((userCredential) => {
            const userInfo = userCredential.user;
            console.log(userInfo);
            console.log(curAuth);
            console.log(password);
            navigate("/dashboard");  
            // add  
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            console.log(curAuth);
            alert("Fix email or password or disconnect your google account if you tried to log in with google");
        });

    }

    return (
        <>
            <div className="mainContainer">   
                <div className="loginForm">        
                    <form className="loginFormContainer"> 
                            <TextField
                                id="email"
                                name="email"
                                type="email" 
                                label="Email"                                   
                                required 
                                    
                                // all fields stretch to this width
                                sx={{width:"280px"}}                                   
                                onChange={(e)=>setEmail(e.target.value)}
                            /> 
                                                                                         
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"                                    
                                required 
                                                                           
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                    
                            <Button size="large"  variant="contained" color="inherit" onClick={onLogin}> Login  </Button>
                            <Button size="large"  variant="contained" color="error" onClick={handleGoogleSignIn}> with google  </Button>
                            <Button onClick={navigateToRegister} size="large"  variant="outlined" color="primary">  Sign up  </Button>       
                        </form>
                    </div>
            </div>
        </>
  );
}

export default Login;