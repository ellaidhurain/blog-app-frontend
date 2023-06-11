import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../../store/slice/commentSlice";
// import { createStyles, makeStyles } from "@mui/styles";
// import Feed from "./Feed";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getCommentRequest } from "../../services/api/blogApi";

export default function Comments({ Feed }) {
  // const classes = useStyles();

  //const [commentList, dispatch] = useReducer(todoReducer, []);

  //use dispatch is used to dispatch reducer and action from store
  const dispatch = useDispatch();

  //get commentList object data from store/reducer and store in variable commentList.
  // use select takes function as argument
  const { commentList } = useSelector((state) => state.comment); // initialState

  const [comment, setComment] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getCommentRequest());
  }, [dispatch]);

  const AddComment = () => {
    dispatch(
      addComment({
        id: commentList[commentList.length - 1].id + 1, //accessing last array and adding id in array
        name: commentList[0].name,
        message: comment,
        time: commentList[0].time,
        profilepic: commentList[0].profilepic,
      })
    );
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
    <Box className="comments">
      <Box className="m-3 d-flex">
        <Avatar
          alt="Remy Sharp"
          src={commentList.map((data) => data.profilepic)}
          className="mx-2"
        />
        <TextField
          name="message"
          className="w-100 mb-1"
          placeholder="write a comment here..."
          value={commentList.message}
          onChange={handleChange}
        />
        <Button onClick={AddComment}>
          <small style={{ color: "gray" }}>Post</small>
        </Button>
      </Box>
      {commentList.map((data) => (
        <>
          <Box
            className="d-flex align-items-center"
            sx={{ marginLeft: "20px" }}
            gap={1}
          >
            <Avatar alt="Remy Sharp" src={data.profilepic} />
            <Typography style={{ fontWeight: "bold" }}>{data.name}</Typography>
          </Box>
          <Box
            className="info d-flex pb-3"
            sx={{ paddingLeft: "60px", paddingRight: "60px" }}
          >
            <Box className="m-8" sx={{ flex: 2 }}>
              <textarea
                rows="3"
                cols="40"
                // id="outlined-multiline-flexible"
                // multiline
                // fullWidth
                value={data.message}
                style={{
                  border: "none",
                  outline: "none",
                  color: "#7d7d7d",
                  width: "100%",
                  height: "50px",
                  resize: "none",
                }}
                className="px-2"
              />
              <Typography
                className="date py-1 px-2"
                sx={{ backgroundColor: "white" }}
              >
                <small style={{ color: "gray" }}>{data.time}</small>
              </Typography>
            </Box>

            <Box>
              <Box>
                {edit && (
                  <Button
                    onClick={() => {
                      dispatch(
                        updateComment({
                          id: data.id,
                          message: commentList.message,
                        })
                      );
                    }}
                  >
                    save
                  </Button>
                )}
                {!Feed && (
                  <>
                    <IconButton className=" ml-3 pl-3">
                      {/* <EditIcon onClick={handleEdit} /> */}
                      <MoreVertIcon />
                    </IconButton>
                    <div className="d-flex d-none">
                      <IconButton className=" ml-3 pl-3">
                        <EditIcon onClick={handleEdit} />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon
                          aria-label="delete"
                          onClick={() => {
                            dispatch(deleteComment({ id: data.id }));
                          }}
                        />
                      </IconButton>
                    </div>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </>
      ))}
    </Box>
    </>
  );
}
