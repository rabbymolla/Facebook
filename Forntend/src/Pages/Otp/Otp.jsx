import React from "react";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import OtpFrom from "../../components/authentication/OtpFrom";

const Otp = () => {
  return (
    <>
      <Helmet>
        <title>Otp</title>
      </Helmet>
      <ToastContainer />
      <div className="lg:relative">
        <div className="hidden lg:block bg-rounded_bg w-44 h-44 rounded-full absolute -top-5 -left-20"></div>
        <div className="container flex md:gap-x-10 items-center justify-center h-screen ">
          <div>
            <p className=" text-center font-GilroyMedium text-sm md:text-lg text-primary_bg capitalize">
              we have sent you a code to your email
            </p>
            <h1 className=" text-center font-GilroyBold text-2xl text-rounded_bg mt-2 mb-5">
              Please enter OTP
            </h1>
            <OtpFrom toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
