import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import {  useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Home from "./login/Home";
import { setLogin, setLogout } from "./blog/store/slice/loginSlice";

const App = () => {

  let isLogged = localStorage.getItem("userId");
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*" // catch-all route any path that hasn't been matched by previous defined routes.
          element={isLogged ? <Home /> : <Navigate to="/" />}
        />

      </Routes>
      <ToastContainer />
     
    </>
  );
};

export default App;
