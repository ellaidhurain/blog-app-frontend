import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./App.css";
import { Box, Button, TextField } from "@mui/material";
import { LoginImage } from "./lottiefiles";
import { loginRequest } from "../blog/services/api/userApi";
import { useForm } from "react-hook-form";

const Login = () => {
  const { loading } = useSelector((state) => state.login);
  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    
  } = useForm(inputs);

  // get user input
  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = async (validated_data) => {
    try {
      const input = {
        Email: validated_data.Email,
        Password: validated_data.Password,
      };

      const res = await dispatch(loginRequest(input));
      // dispatch(setLogin())
      const data = res.payload; // Assuming the response data is available in `payload` property
      const userId = data.user._id;

      localStorage.setItem("userId", userId);

      navigate("/feed");
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

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <>
      <Box className="row justify-content-center align-items-center">
        <Box className="col-5">
          <LoginImage />
        </Box>
        <Box className="col signup-form">
          <Box>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <Box className="form-group">
                <TextField
                  autoComplete="off"
                  name="Email"
                  type="email"
                  className="form-control py-2"
                  placeholder="email"
                  {...register("Email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  onChange={(e) => {
                    handleInputChange(e);
                    clearError("Email");
                  }}
                  // error={!!errors.Email}
                  helperText={errors.Email && errors.Email.message}
                />
                <TextField
                  autoComplete="off"
                  name="Password"
                  type={passwordType}
                  className="form-control py-2"
                  placeholder="password"
                  {...register("Password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  onChange={(e) => {
                    handleInputChange(e);
                    clearError("Password");
                  }}
                  // error={!!errors.Password}
                  helperText={errors.Password && errors.Password.message}
                />
                {/* {!errors.Email && !errors.Password && loginError && (
                  <Typography variant="caption" color="error">
                    {loginError}
                  </Typography>
                )} */}
              </Box>
              <Box className="input-group-btn ">
                <label htmlFor="pass" className="d-flex justify-content-center">
                  <input
                    id="pass"
                    type="checkbox"
                    style={{ color: "blue" }}
                    onClick={togglePassword}
                  />
                  <p className="m-2 ">check password</p>
                </label>
              </Box>
              <Box className="form-group d-flex justify-content-center my-2">
                <Button disabled={loading} type="submit" variant="contained" className=" px-4 m-2">
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span> Login</span>
                    </>
                  )}
                </Button>{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    className="px-4 m-2"
                  >
                    <span> Signup</span>
                  </Button>
                </Link>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
