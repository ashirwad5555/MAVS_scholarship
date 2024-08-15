import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import authSlice, { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [inactiveTime, setInactiveTime] = useState(0); //added on demand
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  //added on demand
  useEffect(() => {
    const events = ["click", "mousemove", "keypress"];

    const resetTimer = () => {
      setInactiveTime(0);
    };

    //my logout logic
    const logoutHandler = () => {
      authService.logout().then(() => {
        dispatch(logout());
        navigate("/"); // Navigate to the homepage //added while testing
      });
    };

    const increaseTimer = () => {
      setInactiveTime((prevTime) => {
        if (prevTime >= 1800) {
          // 25 minutes
          logoutHandler(); // Call the logoutHandler when the timer reaches the threshold
          clearInterval(timer);
        }
        return prevTime + 1;
      });
    };

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    const timer = setInterval(increaseTimer, 1000); // Increases timer every second

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(timer);
    };
  }, [navigate]);

  return !loading ? (
    <div className="min-h-screen w-full flex flex-wrap content-between bg-green-100 rounded-xl">
      <div className="w-full block ">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
