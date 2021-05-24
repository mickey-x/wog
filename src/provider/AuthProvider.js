import React, { useState, createContext } from 'react';
import { authMethods } from '../firebase/authmethods'
import { database } from '../firebase/firebase';


export const firebaseAuth = createContext()

const AuthProvider = (props) => {
  const initState = {email: '', password: '', username: ''}
  const [inputs, setInputs] = useState(initState)
  const [errors, setErrors] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))


  const handleSignup = () => {
    authMethods.signup(inputs.email, inputs.password, inputs.username, setErrors, setToken )
    database.collection('users').doc(inputs.username).set({
      username: inputs.username
    })
  }
  const handleSignin = () => {
    authMethods.signin(inputs.email, inputs.password, setErrors, setToken)
  }

  const handleSignout = () => {
    authMethods.signout(setErrors, setToken)
  }


  
  return (
    <firebaseAuth.Provider
    value={{
      handleSignup,
      handleSignin,
      token,
      inputs,
      setInputs,
      errors,
      handleSignout,
    }}>
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;