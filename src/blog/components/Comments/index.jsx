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
import {
  addCommentRequest,
  deleteCommentRequest,
  getCommentRequest,
  getallCommentsForBlogRequest,
  updateCommentRequest,
} from "../../services/api/blogApi";
import { formatter } from "../../helper/time";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const StyledCommentBtn = styled(Button)(({ theme }) => ({
  my: 1,
  mx: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "left",
}));

const AllComments = ({ Feed, blogId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const { commentsList } = useSelector((state) => state.commentSlice); // initialState
  const matchedCommentList = commentsList.filter(
    (comment) => comment.blog === blogId
  );

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

  useEffect(() => {
    if (blogId) {
      dispatch(getallCommentsForBlogRequest(blogId));
    }
  }, [dispatch, blogId]);

  return (
    <>
      <Box sx={{ display: "flex", m: 3 }}>
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

  // when handle Update we need to pass id from where the comment is clicked
  const handleUpdateComment = () => {
    if (blogId && commentId && updatedCommentText.trim() !== "") {
      dispatch(updateCommentRequest({ updatedCommentText, blogId, commentId }))
        .then(() => {
          dispatch(getallCommentsForBlogRequest(blogId));
          setEditMode(!editMode);
        })
        .catch((error) => {
          toast.error(error.message);
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
          toast.error(error.message);
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
            sx={{
              marginLeft: "35px",
              display: "flex",
              justifyContent: "between",
              alignItems: "center",
            }}
            gap={1}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "between",
                alignItems: "center",
              }}
            >
              <Avatar alt="Remy Sharp" src={picturePath} />
              <Typography sx={{ fontWeight: "bold", px: 2 }}>{name}</Typography>
              <Typography className="date" px={2}>
                |{" "}
                <small style={{ color: "gray", paddingLeft: "10px" }}>
                  <TimeAgo date={createdAt} formatter={formatter} />
                </small>
              </Typography>
            </Box>
          </Box>
          <Box
            className="info"
            sx={{
              paddingLeft: "65px",
              paddingRight: "10px",
              display: "flex",
              py: 3,
            }}
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
                  sx={{ position: "relative", mx: 3 }}
                  onClick={handleOpen}
                >
                  {loggedin_user && (
                    <Box style={{ cursor: "pointer" }}>
                      <MoreHorizIcon />
                    </Box>
                  )}

                  {open ? (
                    <>
                      <Box
                        sx={{
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          bgcolor: "background.paper",
                          position: "absolute",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        style={style}
                      >
                        <StyledCommentBtn onClick={handleEdit}>
                          <EditIcon />
                          <small className="mx-2">Edit comment</small>
                        </StyledCommentBtn>

                        <StyledCommentBtn onClick={handleDeleteComment}>
                          <DeleteIcon />
                          <small className="mx-2">Delete comment</small>
                        </StyledCommentBtn>
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
