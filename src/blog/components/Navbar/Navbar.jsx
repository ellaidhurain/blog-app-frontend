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
} from "@mui/material";
import {
  Cabin as CabinIcon,
  Search as SearchIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Notifications from "./Notifications";
import Messages from "./Messages";

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

const UserBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isChat, setIsChat] = useState(false);

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/logout");
      localStorage.removeItem("userId");
      navigate("/");
      console.log("logged out");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <MyToolbar>
        <CabinIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Typography
          px={2}
          variant="h5"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Blogin
        </Typography>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
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
        <Icons size="large" aria-label="show 4 new mails" color="inherit">
          <Badge
            badgeContent={4}
            color="error"
            className="position-relative"
          >
            <MailIcon onClick={() => setIsChat(!isChat)} />
          </Badge>
          <Badge
            onClick={() => setIsClicked(!isClicked)}
            badgeContent={17}
            color="error"
            className="position-relative"
          >
            <NotificationsIcon />
          </Badge>
          {isChat && <Messages />}
          {isClicked && <Notifications />}
          <Avatar
            alt="Remy Sharp"
            src="/static/use2.png"
            onClick={handleMenuOpen}
          />
        </Icons>

        <UserBox>
          <Avatar
            alt="Remy Sharp"
            src="/static/use2.png"
            onClick={handleMenuOpen}
          />
          <Typography>ellai</Typography>
        </UserBox>
      </MyToolbar>
      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <IconButton>
            <PersonIcon />
          </IconButton>
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          <IconButton>
            <LogoutIcon />
          </IconButton>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
