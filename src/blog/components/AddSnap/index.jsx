import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Box, TextField, Stack, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
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


const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "15px",
  marginLeft: "10px",
}));

const AddBlog = ({ picture }) => {
  const { mode } = useSelector((state) => state.blog);
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
        toast.error(err);
      });
  };

  return (
    <>
      <Box
        className="containe"
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
            sx={{
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
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
              <Tooltip
                title="Add image"
                sx={{
                  position: "fixed",
                  bottom: 20,
                  left: { xs: "calc(50% - 25px)", md: 30 },
                }}
              >
                <label htmlFor="file-input" className="m-0">
                  <IconButton component="span">
                    <AddPhotoAlternateOutlinedIcon />
                  </IconButton>
                </label>
              </Tooltip>
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
            <Tooltip
              title="Add Post"
              sx={{
                position: "fixed",
                bottom: 20,
                left: { xs: "calc(50% - 25px)", md: 30 },
              }}
            >
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
            </Tooltip>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddBlog;
