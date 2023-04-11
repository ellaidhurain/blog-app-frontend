import { Button } from "@mui/material";
import React from "react";
import { chatData } from "./data";

const Notifications = () => {
  const style = {
    top: "70px",
    right: "50px",
    width: "380px",
    zIndex: "9999",
    borderRadius:"10px"
  };
  return (
    <div className="bg-white position-absolute shadow p-5 " style={style}>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-black font-weight-bold">Notifications</h5>
      </div>
      <div className="mt-3">
        {chatData?.map((item) => (
          <div className="d-flex  border-bottom mt-3 gap-3">
            <img
              className="rounded-circle"
              style={{ width: "35px", height: "35px" }}
              src={item.image}
              alt={item.message}
            />
            <div className="mx-2">
              <p className="text-black m-0" style={{ fontWeight: 500 }}>
                {item.message}
              </p>
              <p className="m-0 pb-3" style={{ color: "gray" }}>
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Button className="btn btn-primary w-100" variant="contained">
          see all
        </Button>
      </div>
    </div>
  );
};

export default Notifications;
