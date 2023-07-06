import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import { UserBlogs } from "../blog/pages/MyBlogs";
import Feed from "../blog/pages/Feed";
import ProfilePage from "../blog/pages/ProfilePage";
import { Navbar } from "../blog/components/Navbar/Navbar";
import { Stack } from "@mui/system";
import { Leftbar } from "../blog/components/leftbar/Leftbar";
import Rightbar from "../blog/components/Rightbar/Rightbar";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "../theme";

const Home = () => {

  // dark/light mode
  const { mode } = useSelector((state) => state.blog);

  // useMemo is used to memoize the computational value. it prevents unnecessary rendering and optimize perfomance
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
    {/* wrapping up of Theme provider will provide theme across all child elements */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box color={"text.primary"}>
          <Navbar />
          {/* stack is used to create responsive and flexible layout */}
          <Stack direction="row" spacing={4} justifyContent="space-between">
            <Leftbar />
            <Routes>
              <Route path="/feed" element={<Feed />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
            </Routes>
            <Outlet />
            <Rightbar />
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Home;


/*

When you include <CssBaseline /> at the top level of your application, it ensures consistent styling and behavior of common HTML elements, such as headings, paragraphs, lists, and form elements, regardless of the user's browser or operating system.
By default, <CssBaseline /> sets the following styles:

Removes default margins from the body element.
Applies a consistent box-sizing value of border-box to all elements, ensuring that padding and borders are included in the element's total width and height.
Sets the font-size to 16px on the html element.
Applies a minimal global style reset, such as removing bullet points from lists and removing the default outline on focused elements.

*/