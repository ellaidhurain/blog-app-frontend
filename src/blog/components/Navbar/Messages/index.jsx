import { Button } from "@mui/material";
import React from "react";
import { chatData } from "../../../constants/chatData";
import { Box } from "@mui/material";

const Messages = () => {

  return (
    <Box
      sx={{
        top: "70px",
        right: "50px",
        width: "380px",
        zIndex: "99999",
        borderRadius: "10px",
        backgroundColor: "white",
        position: "absolute",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "black", fontWeight: "bold", m: 0 }}
        >
          Messages
        </Typography>
      </Box>
      <Box mt={3}>
        {chatData?.map((item) => (
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #E0E0E0",
              mt: 3,
              gap: "15px",
              alignItems: "center",
            }}
          >
            <img
              className="rounded-circle"
              sx={{ width: "35px", height: "35px", borderRadius: "50%" }}
              src={item.image}
              alt={item.message}
            />
            <Box mx={2}>
              <Typography
                sx={{
                  color: "black",
                  m: 0,
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {item.message}
              </Typography>
              <Typography
                sx={{
                  color: "gray",
                  m: 0,
                  pb: 3,
                  fontSize: "12px",
                }}
              >
                {" "}
                {item.desc}{" "}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box mt={3}>
        <Button sx={{ width: "100%" }} variant="contained" color="primary">
          see all
        </Button>
      </Box>
    </Box>
  );
};

export default Messages;
