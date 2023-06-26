import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  ButtonGroup,
  Fab,
  IconButton,
  Input,
  Modal,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { Allblogs, Feed } from "./Feed";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "../components/comments/Comments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import ImageIcon from "@mui/icons-material/Image";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import AddBlog from "../components/leftbar/AddBlog";
import Context from "../Context/context";
import ReadMore from "./Readmore";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogRequest,
  getAllBlogsRequest,
  getOneUserRequest,
  refreshTokenRequest,
  updateBlogRequest,
} from "../services/api/blogApi";
import { deleteBlog, updateBlog } from "../store/slice/blogSlice";

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
  const ctx = useContext(Context); //global provider

  const { userData } = useSelector((state) => state.blog);
  const { blogs } = useSelector((state) => state.blog);

  console.log(blogs);

  return (
    <Box flex={4}>
      {userData &&
        userData.blogs &&
        userData.blogs.map((blog, index) => (
          <MyBlogs
            blogId={blog._id}
            key={index}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={userData.Name}
          />
        ))}
      <AddBlog setUserData={ctx.setUserData} />
    </Box>
  );
};

export default function MyBlogs({
  blogId,
  title,
  description,
  imageURL,
  userName,
}) {
  const navigate = useNavigate();
  const ctx = useContext(Context); //global context store
  const id = useParams().blogId;
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    dispatch(getOneUserRequest(id))
  },[id])

  useEffect(() => {
   setInputs({
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
      }, 10000 * 300);
  
      return () => clearInterval(interval);
    } else {
      console.log("User ID is not available");
    }
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateBlogRequest({ blogId, inputs }));
      toast.success("Successfully updated");
      handleClose();
      dispatch(getOneUserRequest(id)); // Fetch the updated view
    } catch (error) {
      console.log("Update failed:", error);
      toast.error("Update failed", error);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteBlogRequest({ blogId }))
      .then(() => {
        toast.success("successfully deleted");
        dispatch(getOneUserRequest(id)); // we need to call this to get updated view
      })
      .catch((error) => {
        toast.error(error);
      });

    // dispatch(deleteBlog({blogId}));
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs, // make a copy and update
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const date = new Date();
  const timestamp = date.toDateString();

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComments = () => {
    setComments(!comments);
  };

  return (
    <>
      <Box flex={4} p={2}>
        <Card
          sx={{
            marginBottom: 2,
            borderRadius: "15px",
            border: "1px solid rgba(0,0,0,0.15)",
            boxShadow: "none",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {ctx.userData.Name ? ctx.userData.Name.charAt(0) : ""}
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreHorizIcon />
            //   </IconButton>
            // }
            title={ctx.userData.Name}
            subheader={timestamp}
          />

          <CardContent onClick={handleComments}>
            <Typography variant="body2" color="text.primary">
              <span>{title}</span>
              <ReadMore>{description}</ReadMore>
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            height="300"
            image={imageURL}
            alt="Paella dish"
          />
          <div className="d-flex justify-content-between pt-2 px-4">
            <small style={{ color: "gray" }} className="px-4">
              20 likes
            </small>
            <small style={{ color: "gray" }}>10 comments</small>
          </div>
          <hr className="mx-4"></hr>

          <CardActions disableSpacing className="d-flex justify-content-end">
            {/* <IconButton aria-label="add to favorites"  onClick={increase}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton> */}
            {liked && "Liked"}

            {/* <IconButton
              aria-label="delete"
              sx={{ marginLeft: "10px" }}
              onClick={handleComments}
            >
              <CommentIcon />
            </IconButton> */}
            <Box style={{ fontSize: "15px" }} pr={3}>
              10 comments
            </Box>

            <Box>
              {/* <IconButton aria-label="share" sx={{ marginLeft: "10px" }}>
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleOpen} sx={{ marginLeft: "10px" }}>
                <EditIcon  />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDelete} sx={{ marginLeft: "10px" }}>
                <DeleteIcon  />
              </IconButton> */}
            </Box>
          </CardActions>
          {comments && <Comments />}
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
              height={550}
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
                value={inputs.title}
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
                value={inputs.description}
                multiline
                placeholder="description"
              />

              <TextField
                name="image"
                sx={{ width: "100%", pt: 2 }}
                id="standard-multiline-static"
                rows={4}
                label="imageURL"
                placeholder="paste image url here"
                variant="standard"
                onChange={handleInputChange}
                value={inputs.image}
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
                <Button onClick={handleUpdate}>Post</Button>
              </ButtonGroup>
            </Box>
          </StyledModel>
        </Box>
      </>
    </>
  );
}
