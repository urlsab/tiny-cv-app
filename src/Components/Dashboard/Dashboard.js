
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { firestoreDB } from "../../Config/firebase.config";
import { auth } from "../../Config/firebase.config";
import { query, collection, getDocs, where } from "firebase/firestore";

const Dashboard = () => {

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(firestoreDB, `${user.email}`), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0];
      setName(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
    console.log(name);
  }
);

  return (
    <>
      <div> 
        <h1> welcome to dashboard</h1>
      </div>
    </>
  );
}

export default Dashboard;