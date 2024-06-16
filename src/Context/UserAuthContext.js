import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../Config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Config/firebase.config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [userData] = useAuthState(auth);
  const [cv, setCv] = useState([]);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  async function getCv() {

    const privateCollection = collection(firestoreDB, `${userData.email}` );

    await getDocs(privateCollection).then(response => {
        
        const displayResumes = response.docs.map(doc => ({
            info: doc.data(),
            id: doc.id,
            key: doc.id
        })) 
        setCv(displayResumes);
        console.log(displayResumes[0].info.userName);
        console.log("successfully set all cv's");
        
    })
    .catch(error => console.log(error)); 
}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, userData, cv, logIn, signUp, logOut, googleSignIn, getCv }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}