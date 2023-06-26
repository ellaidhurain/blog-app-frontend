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
  const { mode } = useSelector((state) => state.blog);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box color={"text.primary"}>
          <Navbar />
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
