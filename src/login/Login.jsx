import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./App.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoginImage } from "./lottiefiles";
import { useContext } from "react";
import Context from "../blog/Context/context";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { loginRequest } from "../blog/services/api/loginApi";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loading } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });
  const [passwordType, setPasswordType] = useState("password");

  // get user input
  const handleInputChange = (e) => {
    setInputs(() => ({
      ...inputs,
      // [key]:value
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const input = {
        Email: inputs.Email,
        Password: inputs.Password,
      };

      const res = await dispatch(loginRequest(input));
      const userId = res.payload.user._id
      
      localStorage.setItem("userId", userId);

      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  };

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // form validation
  const validationSchema = Yup.object().shape({
    Email: Yup.string()
      .email("This is not a valid email.")
      .strict()
      .trim()
      .required("This field is required!"),
    Password: Yup.string().required("This field is required!").strict().trim(),
  });

  return (
    <>
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
                onChange={handleInputChange}
                value={inputs.Email}
              />

              <TextField
                name="Password"
                type={passwordType}
                className="form-control py-3"
                style={{ borderRadius: "50px" }}
                placeholder="password"
                onChange={handleInputChange}
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
                  <span className="spinner-border spinner-border-sm m-2">
                    {" "}
                  </span>
                )}
                <span> Login</span>
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

            {/* <div className="input-group-btn d-flex justify-content-end mt-2">
              <Link style={{ textDecoration: "none" }}>
                <p className="mt-2 ">forgot password?</p>
              </Link>
              <Button style={{ color: "blue" }} onClick={togglePassword}>
                {passwordType === "password" ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
