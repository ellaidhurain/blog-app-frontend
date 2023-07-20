import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import {
  acceptFriendRequest,
  getFriendRequests,
} from "../../services/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
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
    console.log(FriendRequests);
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
      <Box className="d-flex justify-content-between align-items-center">
        <h5 className="font-weight-bold">Notifications</h5>
      </Box>
      <Box className="">
        {FriendRequests?.map((friend) => (
          <Box className="d-flex justify-content-between  border-bottom mt-3 gap-3">
            <img
              className="rounded-circle"
              style={{ width: "35px", height: "35px" }}
              src={friend?.picturePath}
              alt="image"
            />
            <Box>
              <p className="m-0" style={{ fontWeight: 500 }}>
                {friend?.Name}
              </p>
              <p className="m-0 pb-3" style={{ color: "gray" }}>
                {" "}
                {friend?.location}{" "}
              </p>
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
      <Box className="mt-3">
        {FriendRequests?.length > 0 ? (
          <Button className="btn btn-primary w-100" variant="contained">
            see all
          </Button>
        ) : (
          <>
            <span style={{color:"gray"}}>no new notification</span>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Notifications;
