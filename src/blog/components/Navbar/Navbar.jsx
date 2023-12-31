import React, { useState } from "react";
import {
  AppBar,
  styled,
  Typography,
  Paper,
  Toolbar,
  IconButton,
  InputBase,
  Divider,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  ListItem,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import Notifications from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { setMode } from "../../store/slice/blogSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer } from "@mui/material";
import List from "@mui/material/List";
import { NavItems } from "../Navbar/NavList";
import ListItemText from "@mui/material/ListItemText";

const MyToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled("div")(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));


export const Navbar = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const { mode } = useSelector((state) => state.blog);
  const { FriendRequests } = useSelector((state) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage the drawer visibility
  const [active, setActive] = useState(null);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle the drawer visibility on burger menu click
  };

  const dispatch = useDispatch();
  const handleLogout = async () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/");
    console.log("hi");
  };

  return (
    <AppBar position="fixed" style={{ top: 0, left: 0, width: "100%" }}>
      <MyToolbar>
        <Box sx={{ display: { lg: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            open={isDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Box
              sx={{
                width: 250,
                padding: "16px",
                bgcolor: "background.paper",
                height: "100%",
              }}
            >
              <List>
                {NavItems.map((data) => (
                  <Box my={1} key={data.id}>
                    <ListItemButton
                      onClick={() => {
                        navigate(data.path);
                        setActive(data.id);
                        setIsDrawerOpen(false); // Close the drawer on item click
                      }}
                      sx={{
                        minHeight: 48,
                        "& .MuiTouchRipple-root": {
                          display: "none",
                        },
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
                  </Box>
                ))}
                <ListItem key="logout" sx={{ padding: 0 }}>
                  <ListItemButton
                    onClick={handleLogout}
                    sx={{
                      minHeight: 48,
                      // px: 2.5,
                      "&:hover": {
                        backgroundColor: "#b7111169",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                      <span className="px-2">Logout</span>
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <ListItem
                  onClick={() =>
                    dispatch(setMode(mode === "light" ? "dark" : "light"))
                  }
                >
                  <ListItemIcon
                    sx={{
                      pt: 2,
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    {mode == "light" ? <DarkModeIcon /> : <LightModeIcon />}
                  </ListItemIcon>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
        <LinkedCameraIcon
          sx={{ display: { xs: "none", sm: "none" }, marginRight: "8px" }}
        />
        <Typography
          px={2}
          variant="h5"
          sx={{
            display: { xs: "none", sm: "block" },
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <LinkedCameraIcon sx={{ marginRight: "8px" }} />
          SnapLink
        </Typography>
        <Paper
          component="form"
          sx={{
            mx: { xs: 2 },
            padding: "2px 4px",
            display: "flex",
            alignItems: "left",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search here..."
            inputProps={{ "aria-label": "search blogs..." }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
        <Box sx={{ display: "flex" }}>
          <Icons size="large" aria-label="show 4 new mails" color="inherit">
            <Badge color="error" sx={{ position: "relative" }}>
            <Tooltip
              title="theme"
              sx={{
                position: "fixed",
                bottom: 20,
                left: { xs: "calc(50% - 25px)", md: 30 },
              }}
            >
              <ListItemIcon
                onClick={() =>
                  dispatch(setMode(mode === "light" ? "dark" : "light"))
                }
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {mode == "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </ListItemIcon>
              </Tooltip>

              {/* <MailIcon
              onClick={() => setIsChat(!isChat)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            /> */}
            </Badge>
          </Icons>

          <Badge
            onClick={() => setIsClicked(!isClicked)}
            badgeContent={FriendRequests?.length}
            color="error"
            sx={{
              position: "relative",
              pl: 2,
            }}
          >
            <Tooltip
              title="notifications"
              sx={{
                position: "fixed",
                bottom: 20,
                left: { xs: "calc(50% - 25px)", md: 30 },
              }}
            >
              <NotificationsIcon
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Tooltip>
          </Badge>
          {/* {isChat && <Messages />} */}
          {isClicked && <Notifications />}
        </Box>
      </MyToolbar>
    </AppBar>
  );
};
