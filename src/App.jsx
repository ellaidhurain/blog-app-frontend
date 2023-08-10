import React, { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./login/Login";
import SignUp from "./login/Sign";
import Home from "./login/Home";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "./blog/theme/theme";
import { CssBaseline } from "@mui/material";


const App = () => {
  let isLoggedIn = false;
  try {
    isLoggedIn = localStorage.getItem("userId");
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }

  const NotFound = () => <h1>404 - Page Not Found</h1>;

  // dark/light mode
  const { mode } = useSelector((state) => state.blog);

  // useMemo is used to memoize the computational value. it prevents unnecessary rendering and optimize performance
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline /> {/* It fixes some inconsistencies across browsers */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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




/*

When you include <CssBaseline /> at the top level of your application, it ensures consistent styling and behavior of common HTML elements, such as headings, paragraphs, lists, and form elements, regardless of the user's browser or operating system.
By default, <CssBaseline /> sets the following styles:

Removes default margins from the body element.
Applies a consistent box-sizing value of border-box to all elements, ensuring that padding and borders are included in the element's total width and height.
Sets the font-size to 16px on the html element.
Applies a minimal global style reset, such as removing bullet points from lists and removing the default outline on focused elements.

*/
