import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import {
  acceptFriendRequest,
  getFriendRequests,
  rejectFriendRequest,
} from "../../services/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

const Notifications = () => {
  const style = {
    top: "70px",
    right: "50px",
    width: "380px",
    zIndex: "9999",
    borderRadius: "10px",
  };
  const { FriendRequests } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.blog);


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
  }, [dispatch]);

  const handleAcceptFriend = (friendId) => {
    try {
      dispatch(acceptFriendRequest(friendId)).then(() => {
        // Check if the component is still mounted before re-fetching friends
        if (isMountedRef.current) {
          dispatch(getFriendRequests());
        }
        toast.success("🦄 Wow so easy!");
      });
    } catch (error) {
      // If the response contains an 'error' message, show it in a toast
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        // If there's no specific error message in the response, show a generic error message
        toast.error("🚨 Not so easy!");
      }
    }
  };

  const handleRejectFriend = (friendId) => {
    try {
      dispatch(rejectFriendRequest(friendId)).then(() => {
        // Check if the component is still mounted before re-fetching friends
        if (isMountedRef.current) {
          dispatch(getFriendRequests());
        }
        toast.success("🦄 Wow so easy!");
      });
    } catch (error) {
      // If the response contains an 'error' message, show it in a toast
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        // If there's no specific error message in the response, show a generic error message
        toast.error("🚨 Not so easy!");
      }
    }
  };

  return (
    <Box
      sx={{
        border:
          mode === "light"
            ? "1px solid rgba(0,0,0,0.15)"
            : "1px solid rgba(214, 213, 213, 0.15)",
        bgcolor: "background.paper",
      }}
      className=" position-absolute shadow p-5"
      style={style}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "white", fontWeight: "bold", m: 0 }}
        >
          Notifications
        </Typography>
      </Box>
      <Box>
        {FriendRequests?.map((friend) => (
          <Box
          key={friend._id}
            sx={{
              display: "flex",
              borderBottom: "1px solid #E0E0E0",
              mt: 3,
              gap: "15px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              style={{ width: "35px", height: "35px", borderRadius: "50%" }}
              src={friend?.picturePath}
              alt="image"
            />
            <Box>
              <Typography
                sx={{
                  color: "black",
                  m: 0,
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {friend?.Name}
              </Typography>
              <Typography
                sx={{
                  color: "gray",
                  m: 0,
                  pb: 3,
                  fontSize: "12px",
                }}
              >
                {" "}
                {friend?.location}{" "}
              </Typography>
            </Box>
            <Box>
              <IconButton
                aria-label="settings"
                onClick={() => handleAcceptFriend(friend._id)}
              >
                <PersonAddAltIcon />
              </IconButton>
              <IconButton
                aria-label="settings"
                onClick={() => handleRejectFriend(friend._id)}
              >
                <PersonRemoveIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
      <Box mt={3}>
        {FriendRequests?.length > 0 ? (
          <Button  sx={{ width: "100%" }} variant="contained" color="primary">
            see all
          </Button>
        ) : (
          <>
            <span style={{ color: "gray" }}>no new notification</span>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Notifications;
