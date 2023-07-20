import React, { useRef } from "react";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActions, IconButton, Checkbox } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CommentIcon from "@mui/icons-material/Comment";
import ReadMore from "./Readmore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogsRequest,
  getOneUserRequest,
  refreshTokenRequest,
} from "../services/api/blogApi";
import axios from "axios";
import TimeAgo from "react-timeago";
import { formatter } from "../helper/helper";
import AllComments from "../components/comments/Comments";
import AddBlog from "../components/leftbar/AddBlog";
import { Link } from "react-router-dom"; // Import the Link component from React Router
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  sendFriendRequest,
  getUserFriendsRequest,
  removeFriendRequest,
} from "../services/api/userApi";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const api = axios.create({
  // baseURL: "http://localhost:5000/api/blog",
  baseURL: "https://snaplinkbackend.onrender.com/api/blog",
  withCredentials: true, // Enable sending cookies with requests
});

const Feed = () => {
  const { blogs } = useSelector((state) => state.blog);
  const { userData } = useSelector((state) => state.blog);

  // sort by decending order
  const sortByLatestUpdatedBlog = [...blogs].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
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
        <AddBlog picture={userData?.picturePath}/>
        <Box>
          {sortByLatestUpdatedBlog?.map((blog, index) => (
            <Allblogs key={index} blog={blog} />
          ))}
        </Box>
      </Box>
    </>
  );
};

const Allblogs = ({ blog }) => {
  const { _id: blogId, title, description, image, createdAt, user } = blog;

  const [comments, setComments] = useState(false);
  const [likes, setLikes] = useState([]);
  const { mode } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const { userFriends } = useSelector((state) => state.user);

  const date = new Date(createdAt); // create Date obj
  const timestamp = date.toLocaleString("en-CA", { timeZone: "Asia/Kolkata" }); // convert to local time

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

  const matchedLikeList = likes?.filter((like) => like?.blog === blogId) || null;
  const liked = matchedLikeList?.some((like) => like?.blog === blogId) || false;

  const friend = userFriends?.some((data) => data?._id === user?._id) || false;

  const addRemoveLike = async (blogId) => {
    try {
      const res = await api.post(`/addRemoveLike/${blogId}`);
      toast.success()
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

  const handleLike = () => {
    if (blogId) {
      addRemoveLike(blogId)
        .then(() => {
          // once addRemoveLike request Promise is fulfilled then do next request
          // then method is js inbuilt method to create promise chain
          getallLikesForBlog(blogId);
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
    }
  };

  const { commentsList } = useSelector((state) => state.commentSlice);
  const matchedCommentList = commentsList?.filter(
    (comment) => comment.blog === blogId
  );

  const handleComments = () => {
    setComments(!comments);
  };

  if (!blogId) {
    return null; // Render nothing if the blog is not available
  }

  useEffect(() => {
    // Fetch user friends on component mount
    dispatch(getUserFriendsRequest());
  }, [user]);

  const handleSendFriend = (friendId) => {
    try {
      dispatch(sendFriendRequest(friendId));
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
  
  const handleRemoveFriend = (friendId) => {
    try {
      dispatch(removeFriendRequest(friendId));
    } catch (err) {
     // If the response contains an 'error' message, show it in a toast
     if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      // If there's no specific error message in the response, show a generic error message
      toast.error("🚨 Not so easy!");
    }
    }
  };

  const id = localStorage.getItem("userId");
  const loggedin_user = id === user?._id;

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
                <Avatar alt="User Avatar" src={user?.picturePath} />
              </Link>
            }
            action={
              !loggedin_user && !friend ? (
                <IconButton
                  aria-label="settings"
                  onClick={() => handleSendFriend(user?._id)}
                >
                  <PersonAddAltIcon />
                </IconButton>
              ) : (
                !loggedin_user &&
                friend && (
                  <>
                    <IconButton aria-label="settings">
                      <HowToRegIcon />
                    </IconButton>
                    <IconButton
                      aria-label="settings"
                      onClick={() => handleRemoveFriend(user._id)}
                    >
                      <PersonRemoveIcon />
                    </IconButton>
                  </>
                )
              )
            }
            title={user?.Name}
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
