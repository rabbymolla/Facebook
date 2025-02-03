import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { forgotPass } from "../../validation";
import { useForgotUserMutation } from "../../features/api/authApi";
import BeatLoader from "react-spinners/BeatLoader";

const initialState = {
  email: "",
  password: "",
};

const ForgotForm = ({ toast }) => {
  const naviget = useNavigate();
  const [forgotUser, { isLoading }] = useForgotUserMutation();

  const forgot = async () => {
    const singup = await forgotUser({
      email: formik.values.email,
      password: formik.values.password,
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
    naviget(`/otp/${formik.values.email}`);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: forgotPass,
    onSubmit: (values) => {
      forgot();
    },
  });

  return (
    <>
      <div className="w-full shadow-md py-8 px-12 rounded-md ">
        <h1 className="font-GilroyBold text-primary_bg text-center text-base md:text-xl mb-3">
          Reset Your Password
        </h1>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="relative">
              <label className="font-GilroyMedium text-base text-primary_bg">
                Email :
              </label>
              <input
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                autoComplete="off"
                placeholder="example@gmail.com"
                className="py-2 px-4 border-2 border-primary_bg border-solid rounded-md font-extralight w-full"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="font-GilroyRegular text-sm text-[#e60b0b] absolute left-0 -bottom-6">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <div className="relative my-7">
              <label className="font-GilroyMedium text-base text-primary_bg">
                Confirm Password :
              </label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="off"
                placeholder="Enter new Password"
                className="py-2 px-4 border-2 border-primary_bg border-solid rounded-md font-extralight w-full "
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="font-GilroyRegular text-sm text-[#e60b0b] absolute left-0 -bottom-6">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            <div className="sm:flex sm:items-center sm:gap-x-10 md:gap-x-5 lg:gap-x-10">
              {isLoading ? (
                <button
                  disabled
                  className="font-GilroyMedium py-2 px-7 bg-rounded_bg rounded-lg text-text_color text-base"
                  type="submit"
                >
                  <BeatLoader color="#fff" size={9.2} />
                </button>
              ) : (
                <button
                  className="font-GilroyMedium py-2 px-7 bg-rounded_bg rounded-lg text-text_color text-base"
                  type="submit"
                >
                  Reset
                </button>
              )}
              <p className="font-GilroyRegular text-sm sm:text-base md:text-sm lg:text-sm text-primary_bg mt-5 sm:mt-0">
                Alredy have an account ?{" "}
                <Link className="underline font-GilroyBold" to="/login">
                  LogIn
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotForm;
