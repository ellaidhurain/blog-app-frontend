import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import Feed from "../blog/pages/Feed";
import ProfilePage from "../blog/pages/ProfilePage";
import { Navbar } from "../blog/components/Navbar/Navbar";
import { Stack } from "@mui/system";
import { Leftbar } from "../blog/components/leftbar/Leftbar";
import Rightbar from "../blog/components/Rightbar/Rightbar";
import { Box } from "@mui/material";
import SettingsPage from "../blog/pages/SettingsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserBlogs from "../blog/pages/UserBlogs";

const Home = () => {
  return (
    <>
      <Box color={"text.primary"}>
        <Navbar />
        {/* stack is used to create responsive and flexible layout */}
        <Stack
          direction="row"
          mt={4}
          pt={4}
          spacing={4}
          justifyContent="space-between"
        >
          <Leftbar />
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>

          {/* <Route path="/blog/:blogId" element={<BlogPost />}>
                <Route path="comments" element={<Comments />} />
            </Route> */}
          {/* <Outlet /> */}
          {/* The <Outlet /> component is a placeholder used to render the child components of a parent route when the parent route matches the current URL.The parent component BlogPost would contain the <Outlet /> to render the Comments component whenever the URL matches the path "/blog/:blogId/comments". */}
          <Rightbar />
        </Stack>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
