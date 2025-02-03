import React from "react";
import { useSelector } from "react-redux";
import Login from "../Pages/Login";
import { Outlet } from "react-router-dom";

const LoginUser = () => {
  const user = useSelector((state) => state.counter.value);
  return user ? <Outlet /> : <Login />;
};

export default LoginUser;
