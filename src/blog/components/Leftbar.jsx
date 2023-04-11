import React from "react";
import { Box, ListItem,} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { NavItems } from "./NavList";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  leftbar: {
    display: { xs: "none", sm: "block" },
    background: "#fff",
    marginTop: "16px",
    marginLeft: "10px",
    borderRadius: "10px",
    border:"1px solid rgba(0,0,0,0.15)",
    height:"300px",
    width:"200px",
    // position:"fixed" 
  },
});

export const Leftbar = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { mode, setMode } = props;
  return (
    <>
      <Box flex={1} p={2} sx={{ display: { md:"none", lg:"block", xs: "none", sm: "none" }}} >
        {" "}
        <List sx={{ position: "fixed", }} className={classes.leftbar}>
          {NavItems.map((data, index) => (
            <ListItem key={data.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(data.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    color: "rgba(0, 0, 0, 0.54)",
                    paddingRight: "10px",
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItemButton disablePadding component="a" href="#home">
            <ListItemIcon  >
              <DarkModeIcon />
            </ListItemIcon>
            <Switch
              sx={{minWidth:"0px"}}
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
            />
          </ListItemButton>
        </List>
      </Box>
    </>
  );
};
