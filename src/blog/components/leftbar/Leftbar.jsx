import React, { useState } from "react";
import { Box, ListItem } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { NavItems } from "../Navbar/NavList";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLogout } from "../../store/slice/loginSlice";
import { Logout as LogoutIcon } from "@mui/icons-material";

export const Leftbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  const { mode } = useSelector((state) => state.blog);

  const handleLogout = async () => {   
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      navigate("/");
      console.log("hi");
  };

  useEffect(() => {
    // Get the active item from localStorage when the component mounts
    const activeNavItem = localStorage.getItem("activeNavItem");
    setActive(activeNavItem);
  }, []); 


  return (
    <>
      <Box
        flex={1}
        p={2}
        sx={{ display: { md: "none", lg: "block", xs: "none", sm: "none" } }}
      >
        {" "}
        <List
          sx={{
            position: "fixed",
            bgcolor: "background.paper",
            border:
              mode === "light"
                ? "1px solid rgba(0,0,0,0.15)"
                : "1px solid rgba(214, 213, 213, 0.15)",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {NavItems.map((data) => (
            <ListItem key={data.id}>
              <ListItemButton
                onClick={() => {
                  navigate(data.path);
                  setActive(data.id);
                  localStorage.setItem("activeNavItem", data.id);
                }}
                disableRipple
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  backgroundColor:
                    active === data.id ? "#383d402f" : "transparent",
                  borderRadius: active === data.id ? "5px" : "none",
                  "&:hover": {
                    backgroundColor:
                      mode === "light" ? "#383d402f" : "#383d403a",
                    borderRadius: "5px",
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

          <ListItem key="logout" onClick={handleLogout}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#b7111169",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon px={1}>
                <LogoutIcon />
                <span className="px-2">Logout</span>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
};
