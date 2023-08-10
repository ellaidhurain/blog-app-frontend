import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./style.css";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { LoginImage } from "../blog/components/LottieFiles";
import { loginRequest } from "../blog/services/api/userApi";
import { useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const { loading, err } = useSelector((state) => state.login);
  const [passwordType, setPasswordType] = useState("password");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  // The setValue function provided by react-hook-form takes care of updating the form values and triggering re-renders when the form inputs change
  const handleInputChange = (e) => {
    setValue(e.target.name, e.target.value);
    clearError(e.target.name);
  };

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
  };

  const handleLoginForm = async (validated_data) => {
    try {
      const input = {
        Email: validated_data.Email,
        Password: validated_data.Password,
      };

      const res = await dispatch(loginRequest(input));
      const userId = res.payload.user._id;
      const accessToken = res.payload.accessToken;

      if (!accessToken) {
        throw new Error("Invalid token format or token not found.");
      }

      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", userId);
      window.location.href = "/feed";
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={5} p={2}>
          <LoginImage />
        </Grid>
        <Grid item xs={12} md={4} p={2}>
          <Box>
            <Typography variant="h4" textAlign={"center"}>
              Login
            </Typography>
            {/* <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            /> */}
            <form onSubmit={handleSubmit(handleLoginForm)}>
              <Box>
                <TextField
                  name="Email"
                  type="email"
                  sx={{ width: "100%", py: 2 }}
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
                  // error={!!errors.Email} // if error it return boolean value true else return false
                  error={errors.Email ? true : false}
                  helperText={errors.Email && errors.Email.message}
                />
                <TextField
                  name="Password"
                  type={passwordType}
                  sx={{ width: "100%", pb: 2 }}
                  placeholder="password"
                  {...register("Password", {
                    required: "Password is required",
                  })}
                  onChange={(e) => {
                    handleInputChange(e);
                    clearError("Password");
                  }}
                  error={errors.Password ? true : false}
                  helperText={errors.Password && errors.Password.message}
                />

              </Box>
              {err && <small style={{ color: "red" }}>{err}</small>}
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="pass"
                      type="checkbox"
                      sx={{ color: "primary" }}
                      onClick={togglePassword}
                    />
                  }
                  label="Check password"
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <Button
                  disabled={loading}
                  type="submit"
                  variant="contained"
                  sx={{ px: 4, m: 2 }}
                  startIcon={
                    loading ? (
                      <CircularProgress size={15} color="inherit" />
                    ) : null
                  }
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button type="submit" variant="outlined" sx={{ px: 4, m: 2 }}>
                    <span> SignUp</span>
                  </Button>
                </Link>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
