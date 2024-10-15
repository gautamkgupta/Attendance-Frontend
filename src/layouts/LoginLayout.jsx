import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Login from "../pages/Auth/Login";

const ProfileLayout = () => {
  // const userInfo =
  //   localStorage.getItem("userInfo") !== "undefined"
  //     ? localStorage.getItem("userInfo")
  //     : null;
  // let user_id = null;
  // if (userInfo) {
  //   const userData = JSON.parse(userInfo);
  //   user_id = userData.id;
  // }
  // const isAuthenticated = Boolean(user_id);
  // if (!user_id) {
  //   localStorage.clear();
  // }

  return (
    <>
      <Login />
    </>
  );
};

export default ProfileLayout;
