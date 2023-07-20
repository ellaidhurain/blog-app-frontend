import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import TimeAgo from "react-timeago";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  addCommentRequest,
  deleteCommentRequest,
  getCommentRequest,
  getallCommentsForBlogRequest,
  updateCommentRequest,
} from "../../services/api/blogApi";
import { formatter } from "../../helper/helper";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const AllComments = ({ Feed, blogId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (blogId) {
      dispatch(addCommentRequest({ comment: commentText, blogId }))
        .then(() => {
          dispatch(getallCommentsForBlogRequest(blogId));
          setCommentText("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeInput = (e) => {
    setCommentText(e.target.value);
  };

  const { commentsList } = useSelector((state) => state.commentSlice); // initialState
  const matchedCommentList = commentsList.filter(
    (comment) => comment.blog === blogId
  );

  useEffect(() => {
    if (blogId) {
      dispatch(getallCommentsForBlogRequest(blogId));
    }
  }, [dispatch, blogId]);

  return (
    <>
      <Box className="m-3 d-flex">
        <Avatar
          alt="Remy Sharp"
          // src={commentsList.map((data) => data.user.picturePath)}
          sx={{ marginLeft: "20px" }}
        />
        <TextField
          name="message"
          className="w-100 mb-1 mx-3"
          placeholder="write a comment here..."
          value={commentText}
          onChange={handleChangeInput}
        />
        <Button onClick={handleAddComment}>
          <small style={{ color: "gray" }}>Post</small>
        </Button>
      </Box>
      <Typography sx={{ marginLeft: "35px" }} pb={2}>
        Comments
      </Typography>
      {matchedCommentList?.map(
        (
          commentData
          // if you use curly braces {}, instead() you need to include an explicit return statement to return a value from the arrow function. Without the return statement, the arrow function will not return any value.
        ) => (
          <Comments
            Feed={Feed}
            blogId={blogId}
            key={commentData._id}
            commentData={commentData}
          />
        )
      )}
    </>
  );
};

function Comments({ blogId, commentData }) {
  const { _id: commentId, comment, user, createdAt } = commentData;
  const { name, picturePath } = user;
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [updatedCommentText, setUpdatedCommentText] = useState(comment);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleChangeUpdatedInput = (e) => {
    const updatedText = e.target.value;
    setUpdatedCommentText(updatedText);
  };

  // when handle Update we need pass id from where the comment is clicked
  const handleUpdateComment = () => {
    if (blogId && commentId && updatedCommentText.trim() !== "") {
      dispatch(updateCommentRequest({ updatedCommentText, blogId, commentId }))
        .then(() => {
          dispatch(getallCommentsForBlogRequest(blogId));
          setEditMode(!editMode);
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

  const handleDeleteComment = () => {
    if (blogId) {
      dispatch(deleteCommentRequest({ commentId }))
        .then(() => {
          dispatch(getallCommentsForBlogRequest(blogId));
        })
        .catch((error) => {
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

  const id = localStorage.getItem("userId");
  const loggedin_user = id === user?._id;

  if (!blogId) {
    return null; // Render nothing if the blog is not available
  }

  const style = {
    top: "-100px",
    right: "40px",
    width: "160px",
    zIndex: "99999",
    borderRadius: "10px",
  };

  return (
    <>
      <Box className="comments">
        <React.Fragment key={commentId}>
          <Box
            className="d-flex justify-content-between align-items-center"
            sx={{ marginLeft: "35px" }}
            gap={1}
          >
            <Box className="d-flex align-items-center">
              <Avatar alt="Remy Sharp" src={picturePath} />
              <Typography sx={{ fontWeight: "bold" }} className="px-2">
                {name}
              </Typography>
              <Typography className="date px-2">
                |{" "}
                <small style={{ color: "gray", paddingLeft: "10px" }}>
                  <TimeAgo date={createdAt} formatter={formatter} />
                </small>
              </Typography>
            </Box>

            <Typography sx={{ color: "gray", marginRight: "35px" }}>
              <small>like | reply</small>
            </Typography>
          </Box>
          <Box
            className="info d-flex py-3"
            sx={{ paddingLeft: "65px", paddingRight: "10px" }}
          >
            <Box sx={{ flex: 2 }}>
              {editMode ? (
                <textarea
                  rows="3"
                  cols="40"
                  value={updatedCommentText}
                  onChange={handleChangeUpdatedInput}
                  style={{
                    border: "none",
                    outline: "none",
                    color: "white",
                    width: "100%",
                    height: "50px",
                    resize: "none",
                    background: "none",
                  }}
                  className="px-2 mx-2"
                />
              ) : (
                <Typography sx={{ color: "#7d7d7d" }}>{comment}</Typography>
              )}
              {editMode && (
                <>
                  <Button onClick={handleUpdateComment}>save</Button>
                  <Button onClick={handleEdit}>cancel</Button>
                </>
              )}
            </Box>

            <Box>
              <Box>
                <Box
                  aria-label="settings"
                  className=" mx-3 position-relative"
                  onClick={handleOpen}
                >
                  {loggedin_user && (
                    <Box style={{cursor:"pointer"}}>
                      <MoreHorizIcon />
                    </Box>
                  )}

                  {open ? (
                    <>
                      <Box
                        sx={{ bgcolor: "background.paper" }}
                        className="shadow position-absolute d-flex flex-column"
                        style={style}
                      >
                        <Button
                          className="my-1 mx-1 d-flex align-items-center text-left justify-content-start"
                          onClick={handleEdit}
                        >
                          <EditIcon />
                          <small className="mx-2">Edit comment</small>
                        </Button>

                        <Button
                          className="my-1 mx-1 d-flex align-items-center text-left justify-content-start"
                          onClick={handleDeleteComment}
                        >
                          <DeleteIcon />
                          <small className="mx-2">Delete comment</small>
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      </Box>
    </>
  );
}

export default AllComments;
