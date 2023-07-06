import React, { Fragment, useContext, useRef } from "react";
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
  getCommentRequest,
  getOneUserRequest,
  getallLikesForBlogRequest,
  refreshTokenRequest,
} from "../services/api/blogApi";
import axios from "axios";
import TimeAgo from "react-timeago";
import { formatter } from "../helper/helper";
import AllComments from "../components/comments/Comments";
import AddBlog from "../components/leftbar/AddBlog";


const api = axios.create({
  baseURL: "http://localhost:5000/api/blog",
  withCredentials: true, // Enable sending cookies with requests
});

const Feed = () => {
  const { blogs } = useSelector((state) => state.blog);
  const { userData } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  const id = localStorage.getItem("userId");

  useEffect(() => {
    if (id) {
      dispatch(getOneUserRequest(id));
      dispatch(getAllBlogsRequest());
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
    <>
    <Box flex={4} p={2}>
    <AddBlog profilePicture={userData.picturePath}/>
      <Box>
      {blogs?.map((blog, index) => (
        <Allblogs key={index} blog={blog} userData={userData} />
      ))}
      </Box>
    </Box>
    </>
  );
};

const Allblogs = ({ blog, userData }) => {
  const { _id: blogId, title, description, image, createdAt } = blog;

  const [comments, setComments] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [likes, setLikes] = useState([]);
  const [err, setErr] = useState(null);
  const { mode } = useSelector((state) => state.blog);

  const date = new Date(createdAt); // create Date obj
  const timestamp = date.toLocaleString("en-CA", { timeZone: "Asia/Kolkata" }); // convert to local time
  const dispatch = useDispatch();

  // const { blogLikes } = useSelector((state) => state.likeSlice);

  // useEffect(() => {
  //   dispatch(getallLikesForBlogRequest(blogId))
  // }, [dispatch, blogId]);

  // useEffect(() => {
  //   console.log(matchedLikeList);
  // }, [blogLikes]);

  // const renderCount = useRef(0);

  // useEffect(() => {
  //   renderCount.current += 1;
  //   console.log(`Render count: ${renderCount.current}`);
  // });

  // const handleLike = async () => {
  //   if (blogId) {
  //     try {
  //       const res = await dispatch(addRemoveLikeRequest(blogId));
  //       const like = await dispatch(getallLikesForBlogRequest(blogId));
  //       console.log(res,like);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const getallLikesForBlog = async (blogId) => {
    try {
      const res = await api.get(`/getallLikesForBlog/${blogId}`);
      setLikes(res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getallLikesForBlog(blogId); // => this is only return promise obj not response.
  }, [blogId]);

  const matchedLikeList = likes.filter((like) => like.blog === blogId) || null;
  const liked = matchedLikeList.some((like) => like.blog === blogId) || false;

  // const matchedLikeList = blogLikes.filter((like) => like.blog === blogId);

  const addRemoveLike = async (blogId) => {
    try {
      const res = await api.post(`/addRemoveLike/${blogId}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const handleLike = () => {
    if (blogId) {
      addRemoveLike(blogId)
        .then(() => {
          // once addRemoveLike request Promise is fulfilled then do next request
          // then method is js inbuilt method to create promise chain
          getallLikesForBlog(blogId);
        })
        .catch((error) => {
          // catch is an inbuilt method to catch error
          console.log(error);
        });
    }
  };

  const { commentsList } = useSelector((state) => state.commentSlice);
  const matchedCommentList = commentsList.filter(
    (comment) => comment.blog === blogId
  );

  const handleComments = () => {
    setComments(!comments);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  if (!blogId) {
    return null; // Render nothing if the blog is not available
  }

  return (
    <>
      <Box>
        <Card
          sx={{
            marginBottom: 2,
            borderRadius: "15px",
            border: mode === "light" ? "1px solid rgba(0,0,0,0.15)": "1px solid rgba(214, 213, 213, 0.15)",
            boxShadow: "none",
            bgcolor: "background.paper",
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
            <Box sx={{display:"flex" , justifyContent:"space-between"}}>
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
            image={image}
            alt="Paella dish"
          />

          <div className="d-flex justify-content-between pt-4 px-4">
            <div>
            {matchedLikeList?.length > 0 && (
              <div className="text-gray-500 px-4">
                {matchedLikeList?.length}{" "}
                {matchedLikeList?.length === 1 ? "like" : "likes"}
              </div>
            )}
            </div>
            
            <div className="d-flex justify-content-end" style={{ color: "gray" }}>
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
          {comments && <AllComments Feed={Feed} blogId={blogId} />}
        </Card>
      </Box>
    </>
  );
};

export default Feed;
