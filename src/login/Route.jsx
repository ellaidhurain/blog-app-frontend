import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function Protected() {
  // get auth state from store
  const isLoggedIn = useSelector((state) => state.login);

  return (
    <Box className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/*"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
      </Routes>

      <ToastContainer />
    </Box>
  );
}

export default Protected;
