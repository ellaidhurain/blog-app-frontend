import React, { useState, useEffect } from "react";
import {
  Box,
  ButtonGroup,
  IconButton,
  Modal,
  Skeleton,
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
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import TimeAgo from "react-timeago";
import { formatter } from "../helper/time";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import {
  deleteBlogRequest,
  getAllBlogsRequest,
  updateBlogRequest,
} from "../services/api/blogApi";
import { useDispatch, useSelector } from "react-redux";
import AddBlog from "../components/AddBlog/AddBlog";
import axios from "axios";
import ReadMore from "./Readmore";
import AllComments from "../components/comments/Comments";
import {
  getOneUserRequest,
  refreshTokenRequest,
} from "../services/api/userApi";
import GlobalSkeleton from "./GlobalSkeleton";

const api = axios.create({
  // baseURL: "http://localhost:5000/api/blog",
  baseURL: "https://snaplinkbackend.onrender.com/api/blog",
  withCredentials: true, // Enable sending cookies with requests
});

const token = localStorage.getItem("token");
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

export default function UserBlogs(props) {
  const userId = localStorage.getItem("userId");
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userId) {
      dispatch(getOneUserRequest(userId));
    }
  }, [userId]);

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
}

export function MyBlogs({ blogId, title, description, imageURL, createdAt }) {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const { userData, isLoadingUser, isUserErr } = useSelector(
    (state) => state.user
  );

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
    setPost({
      title: title,
      description: description,
      image: imageURL,
    });
  }, [userId]); // render when id changes

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
      if (userId) {
        const formData = new FormData();
        formData.append("title", post?.title);
        formData.append("description", post?.description);
        formData.append("image", post?.image);
        // for (const [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }
        await dispatch(updateBlogRequest({ blogId, formData })).then(() => {
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await dispatch(deleteBlogRequest({ blogId })).then(() => {
          dispatch(getOneUserRequest(userId));
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

  const getallLikesForBlog = async (blogId) => {
    if (userId) {
      try {
        const res = await api.get(`/getallLikesForBlog/${blogId}`);
        setLikes(res.data);
        return res.data;
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (blogId) {
      getallLikesForBlog(blogId);
    } // => this is only return promise obj not response.
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
      {isLoadingUser && (
        <GlobalSkeleton height1={50} height2={250} height3={50} />
      )}
      {isUserErr && <small>{isUserErr}</small>}
      {!isLoadingUser && (
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
                <IconButton aria-label="settings">
                  <MoreHorizIcon />
                </IconButton>
              }
              title={userData?.Name}
              subheader={timestamp}
            />

            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="subtitle1" sx={{ px: 2, color: "gray" }}>
                  <TimeAgo date={createdAt} formatter={formatter} />
                </Typography>
              </Box>
              <Typography>
                <ReadMore>{description}</ReadMore>
              </Typography>
            </CardContent>

            <CardMedia
              component="img"
              height="300"
              image={imageURL}
              alt="Paella dish"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: 2,
                px: 2,
              }}
            >
              <Box>
                {matchedLikeList?.length > 0 && (
                  <Box className="text-gray-500 px-4">
                    {matchedLikeList?.length}{" "}
                    {matchedLikeList?.length === 1 ? "like" : "likes"}
                  </Box>
                )}
              </Box>

              <Box
                className="d-flex justify-content-end"
                style={{ color: "gray" }}
              >
                {matchedCommentList?.length > 0 && (
                  <Box className="text-gray-500 px-4">
                    {matchedCommentList?.length}{" "}
                    {matchedCommentList?.length === 1 ? "comment" : "comments"}
                  </Box>
                )}
              </Box>
            </Box>
            <hr className="mx-4"></hr>

            <CardActions
              disableSpacing
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
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
      )}

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
              <UserBox sx={{ display: "flex" }}>
                <Avatar alt="Remy Sharp" src="/static/use2.png" />
                <Typography variant="h6">ellai</Typography>
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
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="file-input" className="m-0">
                  <IconButton component="span">
                    <AddPhotoAlternateOutlinedIcon />
                  </IconButton>
                </label>
                <TextField
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  sx={{ display: "none" }}
                />
                {selectedImage && (
                  <Box>
                    <img width="80px" src={selectedImage} alt="Preview" />
                  </Box>
                )}
              </Stack>

              <ButtonGroup
                fullWidth
                variant="contained"
                aria-label="outlined primary button group"
                className="mt-2 pt-2"
                disableRipple
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
