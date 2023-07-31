import React from "react";
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
import { getAllBlogsRequest } from "../services/api/blogApi";
import axios from "axios";
import TimeAgo from "react-timeago";
import { formatter } from "../helper/time";
import AllComments from "../components/comments/Comments";
import AddBlog from "../components/AddBlog/AddBlog";
import { Link } from "react-router-dom"; // Import the Link component from React Router
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  sendFriendRequest,
  removeFriendRequest,
  getOneUserRequest,
  getUserFriendsRequest,
  refreshTokenRequest,
} from "../services/api/userApi";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Typography from "@mui/material/Typography";
import GlobalSkeleton from "./GlobalSkeleton";

const api = axios.create({
  // baseURL: "http://localhost:5000/api/blog",
  baseURL: "https://snaplinkbackend.onrender.com/api/blog",
  withCredentials: true, // Enable sending cookies with requests
});

const token = localStorage.getItem("token");
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default function Feed() {
  const { blogs } = useSelector((state) => state.blog);
  const { userData, userStatus } = useSelector((state) => state.user);

  // sort by decending order
  const sortByLatestUpdatedBlog = Array.isArray(blogs)
    ? [...blogs].sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt))
    : [];

  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        if (userId) {
          await dispatch(getOneUserRequest(userId));
        }

        // Fetch blogs if userStatus is "success"
        if (userStatus === "success") {
          await dispatch(getAllBlogsRequest());
        }
      } catch (error) {
        // Handle error, if any
        console.error(error);
      }
    };

    fetchData(); // Call the fetchData function to trigger the requests

    const interval = setInterval(() => {
      fetchData(); // Refresh data every 15 minute
    }, 1000 * 60 * 15); // 1000 milliseconds * 60 seconds = 1 minute * 15 = 15 minute

    return () => clearInterval(interval);
  }, [dispatch, userId, userStatus]);

  return (
    <>
      <Box flex={4} p={2}>
        <AddBlog picture={userData?.picturePath} />
        <Box>
          {blogs &&
            sortByLatestUpdatedBlog?.map((blog, index) => (
              <Allblogs key={index} blog={blog} />
            ))}
        </Box>
      </Box>
    </>
  );
}


const Allblogs = ({ blog }) => {
  const { _id: blogId, title, description, image, createdAt, user } = blog;

  const [comments, setComments] = useState(false);
  const [likes, setLikes] = useState([]);
  const { mode } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  
  const { isUserErr, userFriends, isLoadingUser } = useSelector(
    (state) => state.user
  );

  const { isBlogErr, isLoadingBlogs } = useSelector((state) => state.blog);

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
    if (blogId) {
      getallLikesForBlog(blogId);
    }
  }, [blogId]);

  const matchedLikeList =
    likes?.filter((like) => like?.blog === blogId) || null;
  const liked = matchedLikeList?.some((like) => like?.blog === blogId) || false;

  const friend = userFriends?.some((data) => data?._id === user?._id) || false;

  const addRemoveLike = async (blogId) => {
    if (blogId) {
      try {
        const res = await api.post(`/addRemoveLike/${blogId}`);
        toast.success();
        return res.data;
      } catch (error) {
        toast.error(error.message);
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
          toast.error(error.message);
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
    if (user) {
      dispatch(getUserFriendsRequest());
    }
  }, [user]);

  const handleSendFriend = async (friendId) => {
    try {
      if (friendId) {
        await dispatch(sendFriendRequest(friendId));
        toast.success("Friend Request sent");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveFriend = (friendId) => {
    if (friendId) {
      try {
        dispatch(removeFriendRequest(friendId)).then(() => {
          if (err) {
            throw new Error(err);
          }
        });
        dispatch(getAllBlogsRequest());
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const userId = localStorage.getItem("userId");
  const loggedIn_user = userId === user?._id;

  return (
    <>
      <Box>
        {isLoadingBlogs && <GlobalSkeleton height1={50} height2={250} height3={50}/>}
        {isBlogErr && <small>{isBlogErr}</small>}
        {!isLoadingBlogs && (
          <Card
            sx={{
              marginLeft:0,
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
                !loggedIn_user && !friend ? (
                  <IconButton
                    aria-label="settings"
                    onClick={() => handleSendFriend(user?._id)}
                  >
                    <PersonAddAltIcon />
                  </IconButton>
                ) : (
                  !loggedIn_user &&
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
                <Typography variant="h6">{title}</Typography>
                <Typography
                  variant="subtitle1"
                  px={2}
                  style={{ color: "gray" }}
                >
                  <TimeAgo date={createdAt} formatter={formatter} />
                </Typography>
              </Box>
              <Box>
                <ReadMore>{description}</ReadMore>
              </Box>
            </CardContent>

            <CardMedia
              component="img"
              height="300"
              image={image}
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
                  <Box sx={{ color: "gray", px: 4 }}>
                    {matchedLikeList?.length}{" "}
                    {matchedLikeList?.length === 1 ? "like" : "likes"}
                  </Box>
                )}
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "flex-end" }}
                style={{ color: "gray" }}
              >
                {matchedCommentList?.length > 0 && (
                  <Box sx={{ color: "gray", px: 4 }}>
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
              <IconButton aria-label="add to favorites" onClick={handleLike}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                  checked={liked}
                />
              </IconButton>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                {liked ? "Liked" : "Like"}
              </Typography>

              <IconButton
                aria-label="delete"
                sx={{ marginLeft: "10px" }}
                onClick={handleComments}
              >
                <CommentIcon />
              </IconButton>

              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Comment
              </Typography>

              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>

              <Typography
                variant="subtitle1"
                sx={{ color: "gray", paddingRight: "10px" }}
              >
                Share
              </Typography>
            </CardActions>
            {comments && <AllComments Feed={Feed} blogId={blogId} />}
          </Card>
        )}
      </Box>
    </>
  );
};
