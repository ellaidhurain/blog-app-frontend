import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import { useSelector} from "react-redux";
import { App } from "../blog/components/App";

function Protected() {
  // get auth state from store
  // initialState isLoggedIn = false
  const {isLoggedIn} = useSelector((state) => state.auth);

  // let isLoggedIn = true
  const ProtectedRoute = ({children}) => {
    //children is home page or route which we are used to protect
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return children; 
  };

  return (
    <Box className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>  
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </Box>
  );
}

export default Protected;
