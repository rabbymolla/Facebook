import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NotLoginUser = () => {
  const user = useSelector((state) => state.counter.value);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default NotLoginUser;
