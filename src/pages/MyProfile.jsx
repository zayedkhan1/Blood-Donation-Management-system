// import React, { useEffect, useState } from "react";

// const MyProfile = ({ userEmail }) => {
//   const [donorData, setDonorData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchMyProfile = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`http://localhost:5000/donors/${userEmail}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch donor profile");
//       }
//       const data = await response.json();
//       setDonorData(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("❌ Error fetching profile:", error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userEmail) {
//       fetchMyProfile();
//     }
//   }, [userEmail]);

//   console.log(donorData);

//   if (isLoading) return <p>Loading...</p>;
//   if (!donorData) return <p>No profile found.</p>;

//   return (
//     <div>
//       <h1>My Profile</h1>
//       <p><strong>Name:</strong> {donorData.name}</p>
//       <p><strong>Email:</strong> {donorData.email}</p>
//       <p><strong>Blood Group:</strong> {donorData.bloodGroup}</p>
//       <p><strong>Last Donation Date:</strong> {donorData.lastDonationDate}</p>
//       {/* Add more fields as needed */}
//     </div>
//   );
// };

// export default MyProfile;



import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import MyProfileDetails from "./MyProfileDetails";

const MyProfile = () => {
  const {user}=useContext(AuthContext)
 


  return (
            <MyProfileDetails  userEmail={user.email} ></MyProfileDetails>
  );
};

export default MyProfile;

