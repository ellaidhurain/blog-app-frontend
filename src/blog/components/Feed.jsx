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
import axios from "axios";
import { toast } from "react-toastify";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "./Comments";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Context from "../../Context/context";
import ReadMore from "./Readmore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const useStyles = makeStyles({
  font: {
    fontFamily: "Roboto !important",
  },
});

const Feed = ({ userName }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  // useContext is holding all functions and variables e
  const ctx = useContext(Context); //global store

  return (
    <Box flex={4}>
      {ctx.blogs.map((blog, index) => (
        <Allblogs
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          CreatedDate={blog.CreatedDate}
        />
      ))}
    </Box>
  );
};

const Allblogs = ({ title, description, imageURL, CreatedDate }) => {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(false);
  const [openMenu, setOpenMenu ] = useState(false)


  const date = new Date(CreatedDate);
  const timestamp = date.toLocaleString("en-CA", { timeZone: "Asia/Kolkata" });

  const ctx = useContext(Context);

  const increase = () => {
    setLiked(!liked);
  };

  const handleComments = () => {
    setComments(!comments);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }
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
            action={
              <IconButton aria-label="settings">
                <MoreHorizIcon onClick={handleOpenMenu}/>
              </IconButton>
            }
            title={ctx.userData.Name}
            subheader={timestamp}
          />
          
          {openMenu &&(<>
          <div className="d-flex justify-content-end" style={{zIndex:9999}}>
          <div style={{width:"200px", border:"1px solid gray", borderRadius:"8px" ,margin:"10px", }}>
            <p>show</p>
          </div>
          </div>
          </>)}

          <CardContent>
            <Typography variant="body2" color="text.primary">
              <h3>{title}</h3>
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
            {/* <IconButton aria-label="add to favorites"> */}
            <Checkbox
              onClick={increase}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
            <small style={{ color: "gray" }}>Like</small>
            {/* </IconButton> */}
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

            <small style={{ color: "gray" }}>Share</small>

          </CardActions>
          {comments && <Comments Feed={Feed} />}
        </Card>
      </Box>
    </>
  );
};

export default Feed;
