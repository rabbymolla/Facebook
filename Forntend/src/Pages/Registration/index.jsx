import React from "react";
import LeftAuth from "../../components/authentication/LeftAuth";
import RegIcons from "../../SVG/RegIcons";
import RegFrom from "../../components/authentication/RegFrom";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <ToastContainer />
      <div className="lg:relative">
        <div className="hidden lg:block bg-rounded_bg w-44 h-44 rounded-full absolute -top-5 -left-20"></div>
        <div className="container flex md:gap-x-10 items-center justify-center h-screen ">
          <div className="md:w-2/3 lg:p-4 hidden md:block">
            <LeftAuth
              icon={<RegIcons />}
              hadding="Welcome to Our Jurney..."
              pargrap="Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nisi ullam cupiditate quis aliquid doloribus.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nisi ullam cupiditate quis aliquid doloribus."
            />
          </div>
          <div className="md:w-3/5 ">
            <RegFrom toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
