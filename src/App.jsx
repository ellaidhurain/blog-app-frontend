import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Home from "./login/Home";
import Feed from "./blog/pages/Feed";


const App = () => {

  let userId = localStorage.getItem("userId");
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*" // catch-all route any path that hasn't been matched by previous defined routes.
          element={userId ? <Home /> : <Navigate to="/" />}
        />

      </Routes>     
    </>
  );
};

export default App;
