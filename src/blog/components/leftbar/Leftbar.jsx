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
// import { makeStyles } from "@mui/styles";

// export const useStyles = makeStyles({
//   leftbar: {
//     display: { xs: "none", sm: "block" },
//     background: "#fff",
//     marginTop: "16px",
//     marginLeft: "10px",
//     borderRadius: "10px",
//     border:"1px solid rgba(0,0,0,0.15)",
//     height:"300px",
//     width:"200px",
//     // position:"fixed"
//   },
// });

export const Leftbar = (props) => {
  const navigate = useNavigate();
  // const classes = useStyles();
  const { mode, setMode } = props;

  const [active, setActive] = useState(null);

  return (
    <>
      <Box flex={1} p={2}>
        {" "}
        <List sx={{ position: "fixed" }}>
          {NavItems.map((data, index) => (
            <ListItem
              key={data.id}
              disablepadding="true"
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
                    active === data.id ? "#afafb06c" : "transparent",
                  borderRadius: active === data.id ? "10px" : "none",
                  color: mode == "dark" ? "rgba(0, 0, 0, 0.54)" : "black",
                  "&:hover": {
                    backgroundColor: "#e4e4e59f",
                    borderRadius: "10px",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    paddingRight: "10px",
                    color:
                      mode == "light"
                        ? "rgba(0, 0, 0, 0.54)"
                        : "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItemButton
            disablepadding="true"
            sx={{
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
                color:
                  mode == "light"
                    ? "rgba(0, 0, 0, 0.54)"
                    : "rgba(0, 0, 0, 0.54)",
              }}
            >
              <DarkModeIcon />
            </ListItemIcon>
            <Switch
              sx={{ minWidth: "0px" }}
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
            />
          </ListItemButton>
        </List>
      </Box>
    </>
  );
};
