import React, { useEffect, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton } from "@mui/material";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  getUserFriendsRequest,
  getFriendRequests
} from "../../services/api/userApi";
import { Box } from "@mui/system";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";


export default function UserList() {
  const { mode } = useSelector((state) => state.blog);
  const { blogs } = useSelector((state) => state.blog);
  const { FriendRequests } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isMountedRef = useRef(false); // initially mount is false

  useEffect(() => {
    // Set the flag to true when the component mounts
    isMountedRef.current = true;

    // Fetch user friends on component mount
    dispatch(getFriendRequests());

    // Cleanup function to set the flag to false when the component unmounts
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleAcceptFriend = (friendId) => {
    try {
      dispatch(acceptFriendRequest(friendId)).then(() => {
        // Check if the component is still mounted before re-fetching friends
        if (isMountedRef.current) {
          dispatch(getFriendRequests());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectFriend = (friendId) => {
    try {
      dispatch(rejectFriendRequest(friendId)).then(() => {
        // Check if the component is still mounted before re-fetching friends
        if (isMountedRef.current) {
          dispatch(getFriendRequests());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Typography className="py-3">Friend requests</Typography>
      {FriendRequests?.map((friend) => (
        <Box
          sx={{
            width: 350,
            maxWidth: 360,
            border:
              mode === "light"
                ? "1px solid rgba(0,0,0,0.15)"
                : "1px solid rgba(214, 213, 213, 0.15)",
            bgcolor: "background.paper",
            borderRadius: "10px",
            margin:"10px"
          }}
          
        >
          <Box key={friend._id} >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={friend.Name} />
              </ListItemAvatar>
              <ListItemText
                primary={friend.Name}
                secondary={
                  <Box>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <span style={{ color: "gray" }}>{friend.location}</span>
                    </Typography>
                  </Box>
                }
              />
               <IconButton
                  aria-label="settings"
                  onClick={() => handleRejectFriend(friend._id)}
                >
                  <PersonAddAltIcon />
                </IconButton>
              <IconButton
                aria-label="settings"
                onClick={() => handleAcceptFriend(friend._id)}
              >
                <PersonRemoveIcon />
              </IconButton>
            </ListItem>
          </Box>
        </Box>
      ))}
    </>
  );
}
