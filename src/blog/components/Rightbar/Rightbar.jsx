import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import StandardImageList from "./imageList";
import UserList from "./UserList";
import ScrollPage from "../scroll/ScrollPage";

export default function Rightbar() {
  return (
    <Box flex={2} pt={2} pr={4} sx={{ display: { xs: "none", sm: "block" }}}>
      <Box position="fixed" width={300}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "100" }}  mb={2}>
            Latest Snaps
          </Typography>
          <StandardImageList />
          <UserList />
        </Box>
      </Box>
      {/* <ScrolltoTop/> */}
      <ScrollPage/>
    </Box>
  );
}
