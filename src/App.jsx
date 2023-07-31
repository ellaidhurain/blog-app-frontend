import React, { useEffect, useMemo, useRef } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Home from "./login/Home";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "./blog/theme/theme";
import { CssBaseline } from "@mui/material";

const App = () => {
  let isLoggedIn = localStorage.getItem("userId");
  const NotFound = () => <h1>404 - Page Not Found</h1>;

  // dark/light mode
  const { mode } = useSelector((state) => state.blog);

  // useMemo is used to memoize the computational value. it prevents unnecessary rendering and optimize perfomance
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline /> {/* It fixes some inconsistencies across browsers */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*" // catch-all route any path that hasn't been matched by previous defined routes.
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
          {/* This route will render the NotFound component for all unmatched paths */}
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
