import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";


export default function UserList() {
  const { mode } = useSelector((state) => state.blog);
  const { userFriends } = useSelector((state) => state.user);

  return (
    <>
      <Typography className="py-3">Friends</Typography>
      {userFriends?.map((friend) => (
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
          <Box key={friend?._id} >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={friend?.Name} />
              </ListItemAvatar>
              <ListItemText
                primary={friend?.Name}
                secondary={
                  <Box>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <span style={{ color: "gray" }}>{friend?.location}</span>
                    </Typography>
                  </Box>
                }
              />
           
            </ListItem>
          </Box>
        </Box>
      ))}
    </>
  );
}
