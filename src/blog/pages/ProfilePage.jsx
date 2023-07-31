import React, { useEffect, useState } from "react";
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
import {
  updateProfileImageRequest,
  updateUserRequest,
} from "../services/api/userApi";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { getOneUserRequest } from "../services/api/userApi";

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
  marginBottom: "5px",
});

const ProfileCard = styled(Card)({
  maxWidth: 700,
  margin: "10px",
});

const ProfilePage = () => {
  const { userData, isLoadingUser, isUserErr } = useSelector(
    (state) => state.user
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userId = localStorage.getItem("userId");

  // get userData and set as initial state for update
  const [post, setPost] = useState({
    Name: userData.Name,
    Email: userData.Email,
    location: userData.location,
    about: userData.about,
  });

  const [selectedImage, setSelectedImage] = useState({
    picturePath: null,
  });

  const [isImageUpdated, setIsImageUpdated] = useState(false);

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
    setSelectedImage((prevPost) => ({
      ...prevPost,
      picturePath: file,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await dispatch(updateUserRequest(post)).then(() => {
          dispatch(getOneUserRequest(userId));
          handleClose();
          toast.success("🦄 Wow so easy!");
          if (err) {
            throw new Error(err);
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleImageUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picturePath", selectedImage?.picturePath);

    try {
      if (userId) {
        await dispatch(updateProfileImageRequest({ formData })).then(() => {
          dispatch(getOneUserRequest(userId));
          handleClose();
          toast.success("🦄 Wow so easy!");
          if (err) {
            throw new Error(err);
          }
        });
        setPost((prevPost) => ({
          ...prevPost,
          picturePath: selectedImage?.picturePath, // Update the 'picturePath' property
        }));
        setIsImageUpdated(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoadingUser && (
        <GlobalSkeleton height1={50} height2={150} height3={50} />
      )}
      {isUserErr && <small>{isUserErr}</small>}
      <Box flex={4} p={2}>
        <ProfileCard>
          <CardContent>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} md={4} align={isMobile ? "center" : "left"}>
                <ProfilePicture alt="Profile" src={userData?.picturePath} />
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  width={"150px"}
                >
                  <label htmlFor="file-input" className="m-0">
                    <IconButton component="span">
                      <EditIcon />
                    </IconButton>
                  </label>
                  <TextField
                    name="image"
                    accept="image/*"
                    id="file-input"
                    type="file"
                    sx={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <Box>
                    {selectedImage?.picturePath && !isImageUpdated && (
                      <Button onClick={handleImageUpdate}>Save</Button>
                    )}
                  </Box>
                </Box>
                <Typography variant="h2" pt={2}>
                  {userData?.Name}
                </Typography>
                <Typography style={{ color: "gray" }}>{/* Actor */}</Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box display={"flex"} justifyContent={"space-between"} py={3}>
                  <ProfileHeader>
                    <Typography>
                      Location:{" "}
                      <span style={{ color: "gray" }}>
                        {userData?.location}
                      </span>
                    </Typography>

                    <Typography>
                      Impressions:{" "}
                      <span style={{ color: "gray" }}>
                        {userData?.impressions}
                      </span>
                    </Typography>
                    <Typography>
                      Followers:{" "}
                      <span style={{ color: "gray" }}>
                        {userData?.viewedProfile}
                      </span>
                    </Typography>
                    <Typography>
                      Friends:
                      <span style={{ color: "gray" }}>
                        {userData?.friends?.length}
                      </span>
                    </Typography>
                  </ProfileHeader>
                  <Box mr={3} textAlign="center">
                    <Button variant="outlined" onClick={handleOpen}>
                      Edit
                    </Button>
                  </Box>
                </Box>
                <span variant="subtitle1">ABOUT ME:</span>
                <Typography style={{ color: "gray", textAlign: "justify" }}>
                  {post?.about}
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
              Update Post
            </Typography>
            <TextField
              name="Name"
              sx={{ width: "100%", pt: 2 }}
              id="standard-multiline-static"
              rows={4}
              label="Name"
              variant="standard"
              onChange={handleInputChange}
              value={post?.Name}
              placeholder="title"
            />

            <TextField
              name="location"
              sx={{ width: "100%", pt: 3 }}
              id="standard-multiline-static"
              onChange={handleInputChange}
              rows={4}
              label="Location"
              variant="standard"
              value={post?.location}
              placeholder="Location"
            />
            <TextField
              name="about"
              sx={{ width: "100%", pt: 3 }}
              id="standard-multiline-static"
              onChange={handleInputChange}
              rows={4}
              label="about me"
              variant="standard"
              value={post?.about || ""}
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
              className="mt-4 pt-5"
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
