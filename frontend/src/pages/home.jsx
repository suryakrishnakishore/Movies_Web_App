import React from 'react'
import Header from '../components/navigation/header'
import Tags from '../components/Tags/tags'
import Channels from '../components/Channels/channels'
import Carousel from '../components/Carousel/carousel'
import Featured from '../components/Featured/featured'
import Shows from '../components/Shows/shows';
import api from '../libs/apiCalls.js';
import useStore from "../store/index.js";
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useState } from 'react'

function Home() {
  const { user, setCredentials, signOut } = useStore((state) => state);
  async function getUser() {
    try {
      const response = await api.get('/details/userInfo');
      // console.log("User is: ", response.data.user);
      
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || 
        "Something unexpected happened. Try again later"
      );
      if(error?.response?.data?.status === "auth-failed"){
        localStorage.removeItem("jiouser");
        signOut();
        window.location.reload();
      }
    }
    
  }

  useEffect(() => {
    getUser();
  }, []);

  const [Loading, setloading] = useState(true);
    
      useEffect(() => {
        // Wait for all resources (including images) to load
        const handleLoad = () => setloading(false);
    
        if (document.readyState === "complete") {
          setloading(false);
        } else {
          window.addEventListener("load", handleLoad);
          return () => window.removeEventListener("load", handleLoad);
        }
      }, []);
    
      if (Loading) {
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
            LOADING...
          </div>
        );
      }

  return (
    <div>
        <Header name={user.name}></Header>
        <Tags></Tags>
        <Carousel tabIndex={0}></Carousel>
        <Channels></Channels>
        <Featured></Featured>
        <Shows></Shows>
        <Shows></Shows>
        <Shows></Shows>
        <Shows></Shows>
    </div>
  )
}

export default Home