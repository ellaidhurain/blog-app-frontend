import React from "react";
import axios from "axios";
import { App } from "../blog/components/App";


axios.defaults.withCredentials = true;

const Home = () => {
  return (
    <>
      <div>
        <App />
      </div>
    </>
  );
};

export default Home;
