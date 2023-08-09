import React, { Fragment, useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Box, TextField, Stack, ButtonGroup, Input } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Context from "../../Context/context";
import {
  getAllBlogsRequest,
  postBlogRequest,
} from "../../services/api/blogApi";
import { useDispatch, useSelector } from "react-redux";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import { getOneUserRequest } from "../../services/api/userApi";

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

const AddBlog = ({ picture }) => {
  // const ctx = useContext(Context); //global data provider
  const { mode } = useSelector((state) => state.blog);

  // blog post obj
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  const dispatch = useDispatch();

  function handleImageUpload(e) {
    const file = e.target.files[0];
    setPost((prevPost) => ({
      ...prevPost,
      image: file,
    }));
  }

  const handleOnChange = (e) => {
    const value = e.target.value;
    setPost((prevPost) => ({
      ...prevPost,
      title: "",
      description: value,
    }));
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

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    const userId = localStorage.getItem("userId");

    dispatch(postBlogRequest({ formData }))
      .then(() => {
        // toast.success("Blog added!");
        dispatch(getOneUserRequest(userId));
        dispatch(getAllBlogsRequest());
        setPost({
          title: "",
          description: "",
          image: null,
        });
        toast.success("🦄 Wow so easy!");
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err);
        toast.error("🚨 Not so easy!");
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
        <form onSubmit={handleSubmitPost}>
          <UserBox className="d-flex">
            <Avatar alt="Remy Sharp" src={picture} />
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
                color: mode === "dark" ? "white" : "black",
              }}
              placeholder="What's on your mind?"
              required
            />
          </UserBox>

          <Box
            sx={{ paddingBottom: "10px", display:"flex", justifyContent:"space-between" }}            
          >
            <Stack direction="row" spacing={1} justifyContent="space-between">
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
              <TextField
                name="image"
                accept="image/*"
                id="file-input"
                type="file"
                sx={{ display: "none" }}
                onChange={handleImageUpload}
              />
              {post.image && <span className="pt-2">{post.image.name}</span>}
            </Stack>

            <Button
              className="px-4 py-0"
              sx={{
                borderRadius: "5px",
                border:
                  mode === "light"
                    ? "1px solid rgba(0,0,0,0.15)"
                    : "1px solid rgba(214, 213, 213, 0.15)",
                // color: "white",
                bgcolor: "background.paper",
              }}
              type="submit"
            >
              Post
            </Button>
          </Box>
        </form>
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