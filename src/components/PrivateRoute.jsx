import React, { Children, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({children}) => {
   const {user,loading}=useContext(AuthContext)
    const location=useLocation();
    console.log(location)
    if(loading){
        return (
              <loading></loading>
        )
    }
    if(!user){
        return   <Navigate  state={{ from:location.pathname }} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;