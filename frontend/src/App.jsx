import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/home";
import useStore from "./store/index.js";
import { setAuthToken } from "./libs/apiCalls.js";
import OtpAuth from "./pages/otp_auth.jsx";
import LogDetails from "./components/Log-Details/log-details.jsx";
import { Toaster } from "sonner";
import Details from "./pages/details.jsx";
import Videos from "./pages/videos.jsx";
import Account from "./pages/account.jsx";

const RootLayout = () => {
  // console.log(JSON.parse(localStorage.getItem("jiouser")));
  
  
  const {user} = useStore((state) => state);
  console.log("User is: ", user);
  setAuthToken(user?.token || "");

  return (user ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/log-in" replace={true}/>
  ))
}
function App() {

  return (
    <main>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='/' element={<Navigate to="/home"  />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/details" element={<Details />} />
            <Route path="/videos/:name/:id" element={<Videos />} />
            <Route path="/account/:user_name" element={<Account />} />
          </Route>
          <Route path="/log-in" element={<OtpAuth />}></Route>
          
        </Routes>
      </Router>

      <Toaster richColors position="top-center"></Toaster>
    </main>
  )
}

export default App
