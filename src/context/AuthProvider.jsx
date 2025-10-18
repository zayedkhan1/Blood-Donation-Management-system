import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider=new GoogleAuthProvider();

export const AuthContext=createContext();


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

 const createUser=(email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
 }
 const SignIn=(email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
 }

 const singInWithGoogle=()=>{
    setLoading(true);
    return signInWithPopup(auth,googleProvider)
 }

  const updateUserProfile=(profileInfo)=>{
   return updateProfile(auth.currentUser,profileInfo)
  }

 const SignOut=()=>{
    setLoading(true);
    return signOut(auth);
 }

 useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            setLoading(false)
    });
    return()=>{
        unsubscribe();
    }

    
 },[])
 console.log(user)
    const authInfo={
        createUser,
        SignIn,
        singInWithGoogle,
        SignOut,
         updateUserProfile,
        loading,
        user,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;