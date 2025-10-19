
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import MyProfileDetails from "./MyProfileDetails";

const MyProfile = () => {
  const { user } = useContext(AuthContext)



  return (
    <MyProfileDetails userEmail={user.email} ></MyProfileDetails>
  );
};

export default MyProfile;

