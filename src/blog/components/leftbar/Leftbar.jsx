import React, { useState } from "react";
import { Box, ListItem } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { NavItems } from "../Navbar/NavList";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../store/slice/blogSlice";

export const Leftbar = (props) => {
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);

  return (
    <>
      <Box flex={1} p={2} ml={10}>
        {" "}
        <List sx={{ position: "fixed",  bgcolor: 'background.paper', border:"1px solid rgba(0,0,0,0.15)", borderRadius:"10px", padding:"10px" }}>
          {NavItems.map((data) => (
            <ListItem
              key={data.id}
              sx={{
                display: { md: "none", lg: "block", xs: "none", sm: "none" },
              }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(data.path);
                  setActive(data.id);
                }}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  backgroundColor:
                    active === data.id ? "#b8e5ff6c" : "transparent",
                  borderRadius: active === data.id ? "10px" : "none",
                  "&:hover": {
                    backgroundColor: "#b8e5ff6c",
                    borderRadius: "10px",
                  },
                  '& .MuiTouchRipple-root': {
                    display: 'none',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    paddingRight: "10px",
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItemButton
            sx={{
              display: { md: "none", lg: "block", xs: "none", sm: "none" },
              "&:hover": {
                backgroundColor: "transparent",
                borderRadius: "10px",
              },
            }}
            component="a"
            href="#home"
          >
            <ListItemIcon
              sx={{
                paddingLeft: "18px",
              }}
            >
              <DarkModeIcon />
            </ListItemIcon>
            <Switch
              sx={{ minWidth: "0px" }}
              onChange={() => dispatch(setMode(mode === "light" ? "dark" : "light"))}
            />
          </ListItemButton>
        </List>
      </Box>
    </>
  );
};
