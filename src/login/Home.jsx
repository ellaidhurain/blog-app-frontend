import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Feed from "../blog/pages/Feed";
import ProfilePage from "../blog/pages/Profile";
import { Navbar } from "../blog/components/Navbar/Navbar";
import { Stack } from "@mui/system";
import { Leftbar } from "../blog/components/Leftbar";
import Rightbar from "../blog/components/Rightbar";
import { Box } from "@mui/material";
import SettingsPage from "../blog/pages/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserBlogs from "../blog/pages/MySnaps";

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
          spacing={{xs:0, sm:4, md:4 ,lg:4}}
          justifyContent="space-between"
        >
          <Leftbar />
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
          <Outlet />
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
