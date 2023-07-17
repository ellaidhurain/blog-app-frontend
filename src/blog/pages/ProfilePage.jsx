import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  ButtonGroup,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { updateUserRequest } from "../services/api/userApi";
import { getOneUserRequest } from "../services/api/blogApi";

const StyledModel = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ProfileHeader = styled("div")({
  marginBottom: "20px",
});

const ProfilePicture = styled(Avatar)({
  width: "150px",
  height: "150px",
  marginBottom: "20px",
});

const ProfileCard = styled(Card)({
  maxWidth: 600,
  margin: "10px",
});



const ProfilePage = () => {
  const { userData } = useSelector((state) => state.blog);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const userId = localStorage.getItem("userId");
    // get userData and set as initial state for update
    const [post, setPost] = useState({
      Name: userData.Name,
      Email: userData.Email,
      location: userData.location,
      about:userData.about
    });
  
  
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setPost((prevPost) => ({
      ...prevPost, // make a copy of prev post
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPost((prevPost) => ({
      ...prevPost,
      image: file,
    }));
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserRequest({ userId, post }));
      // toast.success("Successfully updated");
      handleClose();
      dispatch(getOneUserRequest(userId)); // Fetch the updated view
    } catch (error) {
      console.log("Update failed:", error);
      // toast.error("Update failed", error);
    }
  };

  return (
    <>
      <Box flex={4} p={2}>
        <ProfileCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} align={isMobile ? "center" : "left"}>
                <ProfilePicture alt="Profile" src={userData.picturePath} />
                <Typography variant="h6" py={2} textAlign="center">
                  <span variant="subtitle1">{userData.Name}</span>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                >
                  Connect
                </Button>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box display={"flex"} justifyContent={"space-between"} py={3}>
                  <ProfileHeader>
                    <Typography variant="h6">
                      Location:{" "}
                      <span>{userData.location}</span>
                    </Typography>

                    <Typography variant="h6">
                      Impressions:{" "}
                      <span>{userData.impressions}</span>
                    </Typography>
                    <Typography variant="h6">
                      Followers:{" "}
                      <span>{userData.viewedProfile}</span>
                    </Typography>
                    <Typography variant="h6">
                      Friends: 780
                      <span>{userData.friends}</span>
                    </Typography>
                  </ProfileHeader>
                  <Box mt={2} textAlign="center">
                    <Button variant="outlined" onClick={handleOpen}>
                      Edit
                    </Button>
                  </Box>
                </Box>
                <span variant="subtitle1">ABOUT ME:</span>
                <Typography variant="h6">
                 {post.about}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </ProfileCard>
        <StyledModel
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={550}
            height={450}
            bgcolor={"background.default"}
            color={"text.primary"}
            p={4}
            borderRadius={5}
          >
            <Typography variant="h6" color="grey" textAlign="center">
              Create Post
            </Typography>
            <TextField
              name="Name"
              sx={{ width: "100%", pt: 2 }}
              id="standard-multiline-static"
              rows={4}
              label="Name"
              variant="standard"
              onChange={handleInputChange}
              value={post.Name}
              placeholder="title"
            />

             <TextField
              name="location"
              sx={{ width: "100%", pt: 2 }}
              id="standard-multiline-static"
              onChange={handleInputChange}
              rows={4}
              label="Location"
              variant="standard"
              value={post.location}
              placeholder="Location"
            />
             <TextField
              name="about"
              sx={{ width: "100%", pt: 2 }}
              id="standard-multiline-static"
              onChange={handleInputChange}
              rows={4}
              label="about me"
              variant="standard"
              value={post.about}
              placeholder="about me"
              multiline
            />

            {/* <Stack
              direction="row"
              gap={1}
              mb={3}
              className="d-flex justify-content-between align-items-center"
            >
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              {selectedImage && (
                <div>
                  <img width="80px" src={selectedImage} alt="Preview" />
                </div>
              )}
            </Stack> */}

            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
              className="mt-2 pt-2"
            >
              <Button onClick={handleUpdate}>Post</Button>
            </ButtonGroup>
          </Box>
        </StyledModel>
      </Box>
    </>
  );
};

export default ProfilePage;
