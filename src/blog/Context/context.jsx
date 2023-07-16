import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext({
  // defining these variables and functions in the initial value of the Context, 
  // you can access and update them throughout your application using the 
  // useContext hook.

  //get one blog
  userData: [], // empty array
  setUserData: () => {}, // method
  getOneUserRequest: () => {},

  //get all blog
  blogs: [],
  setBlogs: () => {},
  getAllBlogsRequest: () => {},

});

export default Context;


export const ContextProvider = ({ children }) => {

  const [userData, setUserData] = useState([]);
  const id = localStorage.getItem("userId");
  
  const getOneUserRequest = async () => {
    try {
      if (id) {
        const res = await axios.get(`http://localhost:5000/api/blog/getOneUser/${id}`);
        if (res && res.data) {
          const data = res.data;
          setUserData(data.user);
          return data;
        } else {
          console.log("Invalid response:", res);
        }
      } else {
        console.log("User ID is not available");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  
  // useEffect(() => {
  //   // make request when id is not undefined
  //   if (id) {
  //     getOneUserRequest();
  //   }
  // }, [id]);

  const [blogs, setBlogs] = useState([
    { title: "", description: "", user: "", image: "" },
  ]);

  const getAllBlogsRequest = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/blog/getAllBlogs",
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      setBlogs(data.blogs);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog/refresh", {
        withCredentials: true,
      });
      const data = res.data;
      setBlogs(data.blogs);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const id = localStorage.getItem("userId");
  //   if (id) {
  //     getAllBlogsRequest();
  
  //     // set interval to update token
  //     let interval = setInterval(() => {
  //       refreshToken();
  //     }, 1000 * 60* 5);
  
  //     return () => clearInterval(interval);
  //   } else {
  //     console.log("User ID is not available");
  //   }
  // }, []);

  return (
    <Context.Provider
      value={{
        userData,
        setUserData,
        getOneUserRequest,
        blogs,
        setBlogs,
        getAllBlogsRequest,
      }}
    >
      {/* we need to return children to provide all the data to children elements we wrapped */}
      {/* it is special js obj */}
      {children} 
    </Context.Provider>
  );
};

