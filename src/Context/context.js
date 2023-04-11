import React, { createContext,useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { App } from "../blog/components/App";

const Context = createContext({
  //create variable and function model here
  //get one blog
  userData: [],
  setUserData: () => {},
  getOneUserRequest: () => {},

  //get all blog
  blogs: [],
  setBlogs: () => {},
  getAllBlogsRequest: () => {},
});

export const ContextProvider = ({children}) => {

  // create function for model
  //get one user blogs

  const [userData, setUserData] = useState([]);
  const id = localStorage.getItem("userId");

  const getOneUserRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/getOneUser/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    setUserData(data.user);
  
    return data;
  };

  useEffect(() => {
    getOneUserRequest();
  }, []);

    
  //get All blogs
  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    setBlogs(data.blogs);
    
    return data;
  };

  const [blogs, setBlogs] = useState([
    { title: "", description: "", user: "", image: "" },
  ]);

  const getAllBlogsRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog/getAllBlogs", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
      // console.log(res.data);
    const blogs = await res.data;
    setBlogs(blogs.blogs);
    return blogs;
  };

  useEffect(() => {
    getAllBlogsRequest();

    // set interval to update token
    let interval = setInterval(() => {
      refreshToken();
    }, 10000 * 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <Context.Provider
      value={{
        userData: userData,
        setUserData: setUserData,
        getOneUserRequest: getOneUserRequest,

        blogs: blogs,
        setBlogs: setBlogs,
        getAllBlogsRequest: getAllBlogsRequest,
      }}
    >
      {/* we need to return children to access value */}
      {children}
    </Context.Provider>
  );
};

export default Context;
