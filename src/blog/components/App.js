import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Leftbar } from "./Leftbar";
import { Box, Stack, createTheme, ThemeProvider } from "@mui/material";
import Rightbar from "./Rightbar";
import { Outlet, Route, Routes } from "react-router-dom";
import MyBlogs, { UserBlogs } from "./MyBlogs";
import Feed from "./Feed";

export const App = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"rgba(0,0,0,0.04)"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Leftbar setMode={setMode} mode={mode} />
          <Routes>
            <Route path='/feed' element={<Feed />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
          </Routes>
          <Outlet />
          <Rightbar />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

//Box -div
//Container -having default margin and padding
