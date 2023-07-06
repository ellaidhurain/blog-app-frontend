import React, { Fragment, useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Box, TextField, Stack, ButtonGroup, Input } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Context from "../../Context/context";
import {
  getAllBlogsRequest,
  getOneUserRequest,
  postBlogRequest,
} from "../../services/api/blogApi";
import { useDispatch, useSelector } from "react-redux";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";

axios.defaults.withCredentials = true;

const StyledModel = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
  marginLeft: "10px",
}));

const AddBlog = ({ profilePicture }) => {
  const ctx = useContext(Context); //global data provider
  const { mode } = useSelector((state) => state.blog);
  const { blogs } = useSelector((state) => state.blog);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // blog post obj
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  const dispatch = useDispatch();

  function handleImageUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    setPost((prevPost) => ({
      ...prevPost,
      image: file,
    }));
  }

  const handleOnChange = (e) => {
    const value = e.target.value;
   
    // Check if a colon is present in the input value
    const colonIndex = value.indexOf(":"); // find the index value of colon

    // if colon is present or not equal to negative. -1 means no value
    if (colonIndex !== -1) {
      //The substring method returns the portion of the string starting from the startIndex and ending at endIndex - 1, so it extracts the substring
      const newTitle = value.substring(0, colonIndex).trim(); // trim removes leading or trailing whitespace from the substrings.

      //This line extracts the substring from the index immediately following the colon (:) until the end of the value string.
      const newDescription = value.substring(colonIndex + 1).trim();

      //If the newDescription is not an empty string, it means that a colon is present in the input value, and the input value has been split into newTitle and newDescription.
      if (newDescription !== "") {
        setPost({
          ...post,
          title: newTitle,
          description: newDescription,
        });

        //If the newDescription is an empty string, it means that there is no colon or value after colon is empty in the input value, and the input value is treated as the description.
      } else {
        setPost({
          ...post,
          title: "",
          description: value.trim(),
        });
      }
      // if colon not present
    } else {
      setPost({
        ...post,
        title: "",
        description: value.trim(),
      });
    }
  };

  const getInputValue = () => {
    const { title, description } = post;
    if (title && description) {
      return `${title}: ${description}`;
    } else if (description) {
      return description;
    } else {
      return "";
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("image", post.image);

    dispatch(postBlogRequest({ formData }))
      .then(() => {
        // toast.success("Blog added!");
        dispatch(getOneUserRequest());
        dispatch(getAllBlogsRequest());
        setPost({
          title: "",
          description: "",
          image: "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <Box
        className="container"
        sx={{
          bgcolor: "background.paper",
          marginBottom: 2,
          borderRadius: "15px",
          height: "120px",
          border:
            mode === "light"
              ? "1px solid rgba(0,0,0,0.15)"
              : "1px solid rgba(214, 213, 213, 0.15)",
          boxShadow: "none",
        }}
        p={2}
      >
        <UserBox className="d-flex">
          <Avatar alt="Remy Sharp" src={profilePicture} />
          <input
            onChange={handleOnChange}
            value={getInputValue()}
            style={{
              borderRadius: "25px",
              outline: "none",
              border: "none",
              backgroundColor: "rgba(214, 213, 213, 0.15)",
              width: "100%",
              padding: "10px",
              paddingLeft: "15px",
              color: "white",
            }}
            placeholder="What's on your mind?"
          />
        </UserBox>

        <Box
          sx={{ paddingBottom: "10px" }}
          className="d-flex justify-content-between"
        >
          <Box className="d-flex">
            <IconButton>
              <CameraAltOutlinedIcon />
            </IconButton>
            <IconButton>
              <PlaceOutlinedIcon />
            </IconButton>
            <IconButton>
              <SentimentSatisfiedAltOutlinedIcon />
            </IconButton>
            <IconButton>
              <AttachFileOutlinedIcon />
            </IconButton>

            {/* The value of the htmlFor attribute matches the id attribute of the input field, indicating that the label is associated with that particular input field. */}
            {/* Clicking on the label will also focus or activate the associated input field, providing a convenient way for users to interact with the form */}
            <label htmlFor="file-input" className="m-0">
              <IconButton component="span">
                <AddPhotoAlternateOutlinedIcon />
              </IconButton>
            </label>
            <input
              name="image"
              accept="image/*"
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            {post.image && <span className="pt-2">{post.image.name}</span>}
          </Box>

          <Button
            className="px-4 py-0"
            sx={{
              borderRadius: "5px",
              border:
                mode === "light"
                  ? "1px solid rgba(0,0,0,0.15)"
                  : "1px solid rgba(214, 213, 213, 0.15)",
              color: "white",
              bgcolor: "background.paper",
            }}
            onClick={handleSubmitPost}
          >
            Post
          </Button>
        </Box>
      </Box>

      {/* <Tooltip
        title="Add Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50%-25px)", md: 30 },
        }}
      >
        <IconButton onClick={handleOpen}>
          <AddIcon sx={{ margin: "10px" }} />
        </IconButton>
      </Tooltip> */}
      {/* <Box>
        <StyledModel
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={550}
            height={550}
            bgcolor={"background.default"}
            color={"text.primary"}
            p={4}
            borderRadius={5}
          >
            <Box>
              <Typography variant="h6" color="grey" textAlign="center">
                Create Post
              </Typography>
              <UserBox className="d-flex">
                <Avatar alt="Remy Sharp" src="/static/use2.png" />
                <Typography variant="h6" ent>
                  ellai
                </Typography>
              </UserBox>

              <TextField
                name="title"
                sx={{ width: "100%", pt: 2 }}
                id="standard-multiline-static"
                label="title"
                variant="standard"
                onChange={handleOnChange}
                value={post.title}
                placeholder="type your headline here"
              />

              <TextField
                name="description"
                sx={{ width: "100%", pt: 2 }}
                id="standard-multiline-static"
                onChange={handleOnChange}
                rows={4}
                label="description"
                variant="standard"
                value={post.description}
                multiline
                placeholder="type something you love"
              />

              <TextField
                name="image"
                sx={{ width: "100%", pt: 3 }}
                id="standard-multiline-static"
                rows={4}
                label="imageURL"
                variant="standard"
                placeholder="paste image url here"
                onChange={handleOnChange}
                value={post.image}
              />

              <Stack
                direction="row"
                gap={1}
                mb={3}
                className="d-flex justify-content-between align-items-center"
              >
                <label htmlFor="image-input" m={0}>
                  <IconButton component="span" m={0}>
                    <ImageIcon color="error" sx={{ fontSize: "40px" }} />
                  </IconButton>
                </label>

                <img width="80px" src={previewImage} />

                <TextField
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </Stack>

              <ButtonGroup
                fullWidth
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button onClick={handleSubmit}>Post</Button>
              </ButtonGroup>
            </Box>
          </Box>
        </StyledModel>
      </Box> */}
    </>
  );
};

export default AddBlog;
