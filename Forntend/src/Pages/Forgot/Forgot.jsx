import React from "react";
import LeftAuth from "../../components/authentication/LeftAuth";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import LogIcons from "../../SVG/LogIcons";
import ForgotForm from "../../components/authentication/ForgotForm";

const Forgot = () => {
  return (
    <>
      <Helmet>
        <title>Forget</title>
      </Helmet>
      <ToastContainer />
      <div className="lg:relative">
        <div className="hidden lg:block bg-rounded_bg w-44 h-44 rounded-full absolute -top-5 -left-20"></div>
        <div className="container flex md:gap-x-10 items-center justify-center h-screen ">
          <div className="md:w-4/6 lg:w-3/6 xl:w-2/5 ">
            <ForgotForm toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
