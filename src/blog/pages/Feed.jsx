import React, { Fragment, useContext } from "react";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "../components/comments/Comments";
import styled from "@mui/system";
import Context from "../Context/context";
import ReadMore from "./Readmore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import {
  addLikeRequest,
  getAllBlogsRequest,
  getOneUserRequest,
  refreshTokenRequest,
} from "../services/api/blogApi";

const Feed = () => {
  // useContext is holding all functions and variables which is shared from provider
  // const ctx = useContext(Context); //global store
  // const { blogs } = useContext(Context);

  const { blogs } = useSelector((state) => state.blog);
  const { userData } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  const id = localStorage.getItem("userId");

  
  useEffect(() => {
    const fetchBlogs = async ()=>{
      await dispatch(getAllBlogsRequest());
    }
    fetchBlogs();
  }, [dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await dispatch(getOneUserRequest(id));
      } else {
        console.log("User ID is not available");
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await dispatch(refreshTokenRequest());
    }, 1000 * 60 * 5); // 5 mins

    return () => clearInterval(interval);
  }, [dispatch]);


  return (
    <Box flex={4}>
      {blogs?.map((blog, index) => (
        <Allblogs
          key={index}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          CreatedDate={blog.createdAt}
          userData={userData}
        />
      ))}
    </Box>
  );
};

const Allblogs = ({ title, description, imageURL, CreatedDate, userData }) => {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const date = new Date(CreatedDate); // create Date obj
  const timestamp = date.toLocaleString("en-CA", { timeZone: "Asia/Kolkata" });

  // const ctx = useContext(Context);
  
  const { likeList } = useSelector((state) => state.like);
  const dispatch = useDispatch();

  const handleLike = () => {
    setLiked(!liked);
    dispatch(addLikeRequest())
  };


  const handleComments = () => {
    setComments(!comments);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <Box flex={3} p={2}>
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
              <Avatar alt="User Avatar" src={userData.picturePath}/>
            }
            action={
              <IconButton aria-label="settings" onClick={handleOpenMenu}>
                <MoreHorizIcon />
              </IconButton>
            }
            title={userData.Name}
            subheader={timestamp}
          />

          {openMenu && (
            <>
              <div
                className="d-flex justify-content-end"
                style={{ zIndex: 9999 }}
              >
                <div
                  style={{
                    width: "200px",
                    border: "1px solid gray",
                    borderRadius: "8px",
                    margin: "10px",
                  }}
                >
                  <span>show</span>
                </div>
              </div>
            </>
          )}
          <CardContent>
              <h6>{title}</h6>
              <p><ReadMore>{description}</ReadMore></p>   
          </CardContent>

          <CardMedia
            component="img"
            height="300"
            image={imageURL}
            alt="Paella dish"
          />

          <div className="d-flex justify-content-between pt-4 px-4">
            <small style={{ color: "gray" }} className="px-4">
              20 likes
            </small>
            <small style={{ color: "gray" }}>10 comments</small>
          </div>
          <hr className="mx-4"></hr>
          <CardActions disableSpacing className="d-flex justify-content-end">
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton>
            <small style={{ color: "gray" }}>Like</small>

            {liked}

            <IconButton
              aria-label="delete"
              sx={{ marginLeft: "10px" }}
              onClick={handleComments}
            >
              <CommentIcon />
            </IconButton>

            <small style={{ color: "gray" }}>Comment</small>

            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>

            <small style={{ color: "gray", paddingRight: "10px" }}>Share</small>
          </CardActions>
          {comments && <Comments Feed={Feed} />}
        </Card>
      </Box>
    </>
  );
};

export default Feed;
