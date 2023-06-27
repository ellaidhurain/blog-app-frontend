import React, { Fragment, useContext } from "react";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActions, IconButton, Checkbox } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
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
  addRemoveLikeRequest,
  getAllBlogsRequest,
  getOneUserRequest,
  getallLikesForBlogRequest,
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
    dispatch(getAllBlogsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getOneUserRequest(id));
    } else {
      console.log("User ID is not available");
    }
  }, [dispatch, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshTokenRequest());
    }, 10000 * 60 * 5); // 5 mins

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Box flex={4}>
      {blogs?.map((blog, index) => (
        <Allblogs
          key={index}
          blog={blog}
          userData={userData}
        />
      ))}
    </Box>
  );
};

const Allblogs = ({ blog, userData }) => {
  // const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { _id: blogId, title, description, image, createdAt } = blog;

  const date = new Date(createdAt); // create Date obj
  const timestamp = date.toLocaleString("en-CA", { timeZone: "Asia/Kolkata" });
  const dispatch = useDispatch();
  // const ctx = useContext(Context);

  const { blogLikes } = useSelector((state) => state.likes);
  
  const likeList = blogLikes[blogId] || [];
  const liked = likeList.some((like) => like.user === userData.id);

  useEffect(()=>{
    console.log(likeList);
  },[blogId])

  useEffect(() => { 
    dispatch(getallLikesForBlogRequest(blogId));
  }, [dispatch, blogId]);

  const handleLike = () => {
  dispatch(addRemoveLikeRequest(blogId));
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
            avatar={<Avatar alt="User Avatar" src={userData.picturePath} />}
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
            <p>
              <ReadMore>{description}</ReadMore>
            </p>
          </CardContent>

          <CardMedia
            component="img"
            height="300"
            image={image}
            alt="Paella dish"
          />

          <div className="d-flex justify-content-between pt-4 px-4">
            {likeList?.length > 0 && (
              <div className="text-gray-500 px-4">
                {likeList.length} {likeList.length === 1 ? "like" : "likes"}
              </div>
            )}
            <div style={{ color: "gray" }}>10 comments</div>
          </div>
          <hr className="mx-4"></hr>

          <CardActions disableSpacing className="d-flex justify-content-end">
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                checked={liked}
              />
            </IconButton>
            <small style={{ color: "gray" }}>{liked ? "Liked" : "Like"}</small>

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
