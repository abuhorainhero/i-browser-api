import React from "react";
import { Link } from "react-router-dom";
import LocalStorage from "./LocalStorage";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = LocalStorage("loggedInUser", {});
  // //console.log(loggedInUser)
  return (
    <div className="text-center mt-5">
      <h1>Welcome to iBrowser Admin Panel </h1>
      <h3><Link to="/dashboard">Go To Dash-Board</Link></h3>
    </div>
  );
};

export default Home;
