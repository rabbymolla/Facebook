import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { userOtp } from "../../validation";
import {
  useOtpUserMutation,
  useResenOTPUserMutation,
} from "../../features/api/authApi";
import BeatLoader from "react-spinners/BeatLoader";

const initialState = {
  otp: "",
};

const OtpFrom = ({ toast }) => {
  const naviget = useNavigate();
  const parms = useParams();
  const [otpUser, { isLoading }] = useOtpUserMutation();
  const [resenOTPUser] = useResenOTPUserMutation();
  //timer
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  const otpApi = async () => {
    const singup = await otpUser({
      email: parms.email,
      otp: formik.values.otp,
    });

    if (singup.error) {
      toast.error(singup.error.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
      return;
    }
    naviget("/login");
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: userOtp,
    onSubmit: (values) => {
      otpApi();
    },
  });

  // reset OTP
  const resenOtpApi = async () => {
    const singup = await resenOTPUser({
      email: parms.email,
    });

    if (singup.data) {
      toast.success(singup.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
      return;
    } else if (singup.error) {
      toast.error(singup.error.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
      return;
    }
  };
  //timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleSendOtp = () => {
    resenOtpApi();
    setMinutes(0);
    setSeconds(59);
  };

  return (
    <>
      <div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="relative">
              <input
                name="otp"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
                autoComplete="off"
                placeholder="Enter OTP"
                className="py-2 px-4 border-2 border-primary_bg border-solid rounded-md font-extralight w-full"
              />
              {formik.touched.otp && formik.errors.otp ? (
                <p className="font-GilroyRegular text-sm text-[#e60b0b] absolute left-0 -bottom-6">
                  {formik.errors.otp}
                </p>
              ) : null}
            </div>

            <div className="mt-7 flex justify-between items-center">
              {seconds > 0 || minutes > 0 ? (
                <p className="font-GilroyMedium text-sm md:text-base text-primary_bg">
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p className="font-GilroyMedium text-sm md:text-base text-primary_bg">
                  Didn't recieve code?
                </p>
              )}
              <button
                disabled={seconds > 0 || minutes > 0}
                style={{
                  color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                }}
                onClick={handleSendOtp}
              >
                Resend OTP
              </button>
            </div>

            <div className="mt-3">
              {isLoading ? (
                <button
                  disabled
                  className="font-GilroyMedium py-2 px-7 bg-rounded_bg rounded-lg text-text_color text-base w-full"
                  type="submit"
                >
                  <BeatLoader color="#fff" size={9.2} />
                </button>
              ) : (
                <button
                  className="font-GilroyMedium py-2 px-7 bg-rounded_bg rounded-lg text-text_color text-base w-full"
                  type="submit"
                >
                  Verify
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpFrom;
