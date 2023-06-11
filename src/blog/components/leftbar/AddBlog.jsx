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
import { getOneUserRequest, postBlogRequest } from "../../services/api/blogApi";
import { useDispatch } from "react-redux";

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

const AddBlog = () => {
  const ctx = useContext(Context); //global data provider

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
  });

  function handleChange(e, image) {
    // console.log(e.target.files);
    setPost(...post, { image: URL.createObjectURL(e.target.files[0]) });
  }

  const onchangehandle = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postBlogRequest({ post }))
      // .then((data) => console.log(data))
      .then((data) => {
        toast.success("Blog added!");
        handleClose();
        dispatch(getOneUserRequest());

        ctx.setUserData(data.user);
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
      <Tooltip
        title="Add Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50%-25px)", md: 30 },
        }}
      >
        <IconButton onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <div>
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
                onChange={onchangehandle}
                value={post.title}
                placeholder="type your headline here"
              />

              <TextField
                name="description"
                sx={{ width: "100%", pt: 2 }}
                id="standard-multiline-static"
                onChange={onchangehandle}
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
                onChange={onchangehandle}
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

                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
      </div>
    </>
  );
};

export default AddBlog;
