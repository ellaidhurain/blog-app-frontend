import React, { useState, useEffect } from "react";
import {
  Box,
  ButtonGroup,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "../components/comments/Comments";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import TimeAgo from "react-timeago";
import { formatter } from "../helper/helper";

import {
  deleteBlogRequest,
  getAllBlogsRequest,
  getOneUserRequest,
  refreshTokenRequest,
  updateBlogRequest,
} from "../services/api/blogApi";
import { useDispatch, useSelector } from "react-redux";
import AddBlog from "../components/leftbar/AddBlog";
import axios from "axios";
import ReadMore from "./Readmore";
import AllComments from "../components/comments/Comments";

const api = axios.create({
  baseURL: "http://localhost:5000/api/blog",
  // baseURL: "https://snaplinkbackend.onrender.com/api/blog",
  withCredentials: true, // Enable sending cookies with requests
});

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

export const UserBlogs = (props) => {
  const { userData } = useSelector((state) => state.blog);

  return (
    <>
      <Box flex={4} p={2}>
        <AddBlog />

        {userData?.blogs &&
          userData?.blogs.map((blog, index) => (
            <MyBlogs
              blogId={blog._id}
              key={index}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={userData.Name}
              createdAt={blog.createdAt}
            />
          ))}
      </Box>
    </>
  );
};

export default function MyBlogs({
  blogId,
  title,
  description,
  imageURL,
  createdAt,
}) {
  const id = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.blog);
  const [post, setPost] = useState({
    title: title,
    description: description,
    image: imageURL,
  });
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mode } = useSelector((state) => state.blog);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // console.log(imageURL);
    dispatch(getOneUserRequest(id));
  }, [id]);

  useEffect(() => {
    setPost({
      title: title,
      description: description,
      image: imageURL,
    });
  }, [id]); // render when id changes

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      dispatch(getAllBlogsRequest());

      // set interval to update token
      let interval = setInterval(() => {
        dispatch(refreshTokenRequest());
      }, 10000 * 60 * 5);

      return () => clearInterval(interval);
    } else {
      console.log("User ID is not available");
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("image", post?.image);
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      dispatch(updateBlogRequest({ blogId, formData }));
      dispatch(getOneUserRequest(id)); // Fetch the updated view
      handleClose();
      toast.success("🦄 Wow so easy!");
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

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteBlogRequest({ blogId }))
      .then(() => {
        toast.success("🦄 Wow so easy!");
        dispatch(getOneUserRequest(id)); // we need to call this to get updated view
      })
      .catch((error) => {
        // If the response contains an 'error' message, show it in a toast
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          // If there's no specific error message in the response, show a generic error message
          toast.error("🚨 Not so easy!");
        }
      });

    // dispatch(deleteBlog({blogId}));
  };

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

  const getallLikesForBlog = async (blogId) => {
    try {
      const res = await api.get(`/getallLikesForBlog/${blogId}`);
      setLikes(res.data);
      return res.data;
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

  useEffect(() => {
    getallLikesForBlog(blogId); // => this is only return promise obj not response.
  }, [blogId]);

  const matchedLikeList = likes?.filter((like) => like.blog === blogId) || null;

  const date = new Date();
  const timestamp = date.toDateString();

  const { commentsList } = useSelector((state) => state.commentSlice);
  const matchedCommentList = commentsList?.filter(
    (comment) => comment.blog === blogId
  );

  const handleComments = () => {
    setComments(!comments);
  };


  return (
    <>
      <Box>
        <Card
          sx={{
            marginBottom: 2,
            borderRadius: "15px",
            border:
              mode === "light"
                ? "1px solid rgba(0,0,0,0.15)"
                : "1px solid rgba(214, 213, 213, 0.15)",
            boxShadow: "none",
            bgcolor: "background.paper",
          }}
        >
          <CardHeader
            avatar={
              <Link to="/profile">
                <Avatar alt="User Avatar" src={userData?.picturePath} />
              </Link>
            }
            action={
              <IconButton aria-label="settings" >
                <MoreHorizIcon />
              </IconButton>
            }
            title={userData?.Name}
            subheader={timestamp}
          />

          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <h6>{title}</h6>
              <small px={2} style={{ color: "gray" }}>
                <TimeAgo date={createdAt} formatter={formatter} />
              </small>
            </Box>
            <p>
              <ReadMore>{description}</ReadMore>
            </p>
          </CardContent>

          <CardMedia
            component="img"
            height="300"
            image={imageURL}
            alt="Paella dish"
          />
          <div className="d-flex justify-content-between pt-2 px-4">
            <div>
              {matchedLikeList?.length > 0 && (
                <div className="text-gray-500 px-4">
                  {matchedLikeList?.length}{" "}
                  {matchedLikeList?.length === 1 ? "like" : "likes"}
                </div>
              )}
            </div>

            <div
              className="d-flex justify-content-end"
              style={{ color: "gray" }}
            >
              {matchedCommentList?.length > 0 && (
                <div className="text-gray-500 px-4">
                  {matchedCommentList?.length}{" "}
                  {matchedCommentList?.length === 1 ? "comment" : "comments"}
                </div>
              )}
            </div>
          </div>
          <hr className="mx-4"></hr>

          <CardActions disableSpacing className="d-flex justify-content-end">
            <IconButton
              aria-label="delete"
              sx={{ marginLeft: "10px" }}
              onClick={handleComments}
            >
              <CommentIcon />
            </IconButton>
            <Box style={{ fontSize: "15px" }} pr={3}>
              10 comments
            </Box>

            <Box>
              <IconButton aria-label="share" sx={{ marginLeft: "10px" }}>
                <ShareIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={handleOpen}
                sx={{ marginLeft: "10px" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={handleDelete}
                sx={{ marginLeft: "10px" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardActions>
          {comments && <AllComments blogId={blogId} />}
        </Card>
      </Box>

      <>
        <Box>
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
                rows={4}
                label="title"
                variant="standard"
                onChange={handleInputChange}
                value={post?.title}
                placeholder="title"
              />

              <TextField
                name="description"
                sx={{ width: "100%", pt: 2 }}
                id="standard-multiline-static"
                onChange={handleInputChange}
                rows={4}
                label="description"
                variant="standard"
                value={post?.description}
                multiline
                placeholder="description"
              />

              <Stack
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
              </Stack>

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
    </>
  );
}
