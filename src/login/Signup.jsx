import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoginImage } from "./lottiefiles";
import { signupRequest } from "../blog/services/api/userApi";
import { useForm } from "react-hook-form";

const Signup = () => {
  const { loading } = useSelector((state) => state.signup);
  const [inputs, setInputs] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitForm = (validated_data) => {
    try {
      const inputs = {
        Name: validated_data.Name,
        Email: validated_data.Email,
        Password: validated_data.Password,
      };

      dispatch(signupRequest(inputs));

      toast.success("🦄 Wow so easy!");
      navigate("/login");
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

  const handleInputChange = (e) => {
    setInputs(() => ({
      ...inputs,
      // [key]:value
      [e.target.name]: e.target.value,
    }));
  };

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm(inputs);

  return (
    <Box
      className="row justify-content-center align-items-center"
    >
      <Box className="col-5 ">
        <LoginImage />
      </Box>
      <Box className="col signup-form">
        <Box>
          <h2 className="text-center">SIGN UP</h2>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box className="form-group">
              <TextField
                placeholder="username"
                name="Name"
                type="text"
                className="form-control py-2"
                value={inputs.Name}
                {...register("Name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message:
                      "Username must be at least three characters long.",
                }
                })}
                onChange={(e) => {
                  handleInputChange(e);
                  clearError("Name");
                }}
                error={!!errors.Name}
                helperText={errors.Name && errors.Name.message}
              />

              <TextField
                name="Email"
                type="email"
                className="form-control py-2"
                placeholder="email"
                value={inputs.Email}
                {...register("Email", {
                  required: "Email is required",
                })}
                onChange={(e) => {
                  handleInputChange(e);
                  clearError("Email");
                }}
                error={!!errors.Email}
                helperText={errors.Email && errors.Email.message}
              />
              <TextField
                name="Password"
                type="password"
                className="form-control py-2"
                placeholder="password"
                value={inputs.Password}
                {...register("Password", {
                  required: "Password is required",
                })}
                onChange={(e) => {
                  handleInputChange(e);
                  clearError("Password");
                }}
                error={!!errors.Password}
                helperText={errors.Password && errors.Password.message}
              />
            </Box>

            <Box className="d-flex my-2 justify-content-center">
              <Box className="form-group mx-4">
                <Button type="submit" variant="contained" className=" px-4">
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span> register</span>
                    </>
                  )}
                </Button>
              </Box>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button className=" px-4" variant="contained">
                  {" "}
                  Login
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
