import React from "react";
import LeftAuth from "../../components/authentication/LeftAuth";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import LoginForm from "../../components/authentication/LoginAuth";
import LogIcons from "../../SVG/LogIcons";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <ToastContainer />
      <div className="lg:relative">
        <div className="hidden lg:block bg-rounded_bg w-44 h-44 rounded-full absolute -top-5 -left-20"></div>
        <div className="container flex md:gap-x-10 items-center justify-center h-screen ">
          <div className="md:w-3/6 lg:p-4 hidden md:block">
            <LeftAuth icon={<LogIcons />} />
          </div>
          <div className="md:w-3/6 ">
            <LoginForm toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
