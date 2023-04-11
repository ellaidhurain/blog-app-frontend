import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./App.css";
import { authActions } from "../blog/slice/loginSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoginImage } from "../blog/components/lottiefiles";
import { useContext } from "react";
import Context from "../Context/context";
import { setlogin, setlogout } from "../blog/slice/loginSlice";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

// form validation
const validationSchema = Yup.object().shape({
  Email: Yup.string()
    .email("This is not a valid email.")
    .strict()
    .trim()
    .required("This field is required!"),
  Password: Yup.string().required("This field is required!").strict().trim(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  // get user input
  const handleChange = (e) => {
    setInputs(() => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const login = async () => {
    const res = await axios
      .post(`http://localhost:5000/api/user/login`, {
        Email: inputs.Email,
        Password: inputs.Password,
      })
      .catch((err) => console.log(err));

    const user = await res.data;
    return user;
  };

  const handleSubmit = (e) => {
    login()
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => {
        dispatch(setlogin());
        navigate("/feed");
      });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      {/* <Grid container spacing={2}>
        <Grid item md={8}>
          <Item>md=8</Item>
        </Grid>
        <Grid item md={4}>
          <Item>md=4</Item>
        </Grid>
        <Grid item md={4}>
          <Item>md=4</Item>
        </Grid>
        <Grid item md={8}>
          <Item>md=8</Item>
        </Grid>
      </Grid> */}

      <div className="row justify-content-center align-items-center">
        <div className="col-5">
          <LoginImage />
        </div>

        <div className="col login-form">
          <div>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />

            <div className="form-group">
              <TextField
                name="Email"
                type="text"
                className="form-control py-3 my-3 "
                style={{ borderRadius: "50px" }}
                placeholder="email"
                onChange={handleChange}
                value={inputs.Email}
              />

              <TextField
                name="Password"
                type={passwordType}
                className="form-control py-3"
                style={{ borderRadius: "50px" }}
                placeholder="password"
                onChange={handleChange}
                value={inputs.Password}
              />
            </div>

            <div className="form-group d-flex justify-content-center mt-4 mb-3">
              <Button
                onClick={handleSubmit}
                // variant="contained"
                className=" px-4 mx-3"
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </Button>{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  type="submit"
                  // variant="contained"
                  className="btn px-4 "
                >
                  Signup
                </Button>
              </Link>
            </div>

            <div className="input-group-btn d-flex justify-content-end mt-2">
              <Link style={{ textDecoration: "none" }}>
                <a className="mt-2 ">forgot password?</a>
              </Link>
              <Button style={{ color: "blue" }} onClick={togglePassword}>
                {passwordType === "password" ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
