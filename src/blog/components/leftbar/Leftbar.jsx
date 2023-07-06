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
    try {
      await axios.post("http://localhost:5000/api/user/logout");
      localStorage.removeItem("userId");
      navigate("/");
      dispatch(setLogout());
    } catch (err) {
      console.log(err);
    }
  };

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
            border: mode === "light" ? "1px solid rgba(0,0,0,0.15)": "1px solid rgba(214, 213, 213, 0.15)",
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
                }}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  backgroundColor:
                    active === data.id ? "#383d4069" : "transparent",
                  borderRadius: active === data.id ? "5px" : "none",
                  "&:hover": {
                    backgroundColor: "#383d4069",
                    borderRadius: "5px",
                  },
                  "& .MuiTouchRipple-root": {
                    display: "none",
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
                  backgroundColor: "#27465469",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon className="px-1">
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
