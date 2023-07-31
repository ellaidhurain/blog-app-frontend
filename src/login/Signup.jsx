import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoginImage } from "./lottiefiles";
import { signupRequest } from "../blog/services/api/userApi";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";

const Signup = () => {
  const { loading, err } = useSelector((state) => state.signup);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
    },
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

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
  };

  const handleInputChange = (e) => {
    setValue(e.target.name, e.target.value);
    clearError(e.target.name);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={5} p={2}>
        <LoginImage />
      </Grid>
      <Grid item xs={12} md={4} p={2}>
        <Box>
          <Typography variant="h4" textAlign={"center"}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box>
              <TextField
                placeholder="username"
                name="Name"
                type="text"
                sx={{ width: "100%", py: 2 }}
                value={inputs.Name}
                {...register("Name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least three characters long.",
                  },
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
                placeholder="email"
                sx={{ width: "100%", pb: 2 }}
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
                sx={{ width: "100%", pb: 2 }}
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
            {err && <small style={{ color: "red" }}>{err}</small>}

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
                <Button px={4} variant="outlined">
                  {" "}
                  Login
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
