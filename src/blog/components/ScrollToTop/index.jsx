import React from "react";
import { Button } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const ScrollToTop = () => {

  const gotoServices = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <div>
      <Button
        sx={{
          position: "fixed",
          left: "94%",
          top: "85%",
          boxShadow: " rgba(149, 157, 165, 0.172) 0px 8px 24px",
          background: "white",
          paddingTop: "15px",
          paddingBottom: "15px",
          color: "black",
          marginBottom: "20px",
          borderRadius: "10px",
          "&:hover":{
            backgroundColor:"#95d6fb6c",
            '& .MuiTouchRipple-root': {
              display: 'none',
            },
          }
        }}
        // variant="contained"
        onClick={gotoServices}
      >
        <KeyboardDoubleArrowUpIcon />
      </Button>
    </div>
  );
};

export default ScrollToTop;
