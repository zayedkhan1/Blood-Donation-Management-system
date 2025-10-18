// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Donate from "./pages/Donate";
// import DonorList from "./pages/DonorList";
// import ContactUs from "./pages/ContactUs";
// import LoginPage from "./pages/Login";
// import RegisterPage from "./pages/Register";
// import MyProfile from "./pages/MyProfile";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthProvider";


// const App=()=> {
//   const {user}=useContext(AuthContext)
//   console.log(user.email)

//   return (
//     <>
//     <Navbar></Navbar>
    
//     <Routes>
//       <Route path="/" element={<Home></Home>}></Route>
//       <Route path="/donate" element={<Donate></Donate>}></Route>
//       <Route path="/donor-list" element={<DonorList></DonorList>}></Route>
//       <Route path="/contact" element={<ContactUs></ContactUs>}></Route>
//       <Route path="/my-profile" element={<MyProfile userEmail={user.email}  ></MyProfile>}></Route>
//       <Route path="/login" element={<LoginPage></LoginPage>}></Route>
//       <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
   




//     </Routes>

//     <Footer></Footer>
      
//     </>
//   )
// }

// export default App;
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Donate from "./pages/Donate";
import DonorList from "./pages/DonorList";
import ContactUs from "./pages/ContactUs";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MyProfile from "./pages/MyProfile";

import PrivateRoute from "./components/PrivateRoute";

const App = () => {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donor-list" element={<DonorList />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* ✅ Only pass userEmail if user exists */}
        <Route
          path="/my-profile"
          element={
           
                <PrivateRoute><MyProfile  /></PrivateRoute>      
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
