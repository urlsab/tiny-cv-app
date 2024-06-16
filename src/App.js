import './App.css';
import React from 'react';
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import { Routes ,Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';

const App = () => {

  return (
    <React.Fragment>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/' element={<Login/>} exact="true" />
          <Route path='/register' element={<Register/>} exact="true" />
          <Route path='/dashboard' element={<Dashboard/> } exact="true" />
        </Routes>
      </UserAuthContextProvider>
    </React.Fragment>
  );
}

export default App; 