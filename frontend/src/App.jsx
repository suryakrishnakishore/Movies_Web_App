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
import { useEffect } from "react";
import { useState } from "react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for all resources (including images) to load
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          zIndex: 9999,
          fontSize: "2rem",
        }}
      >
        Loading...
      </div>
    );
  }
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
