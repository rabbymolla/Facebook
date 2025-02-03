import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { singIn } from "../../validation";
import { useLoginUserMutation } from "../../features/api/authApi";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch } from "react-redux";
import { increment } from "../../features/counter/counterSlice";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = ({ toast }) => {
  const naviget = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const loginApi = async () => {
    const singup = await loginUser({
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
    const { message, ...rest } = singup.data;
    localStorage.setItem("user", JSON.stringify(rest));
    dispatch(increment(rest));
    naviget("/");
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: singIn,
    onSubmit: (values) => {
      loginApi();
    },
  });

  return (
    <>
      <div className="w-full shadow-md py-8 px-12 rounded-md ">
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
                Password :
              </label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="off"
                placeholder="Enter your Password"
                className="py-2 px-4 border-2 border-primary_bg border-solid rounded-md font-extralight w-full "
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="font-GilroyRegular text-sm text-[#e60b0b] absolute left-0 -bottom-6">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            <div className="flex items-center  justify-between">
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
                  Login
                </button>
              )}
              <Link
                className="font-GilroyMedium text-primary_bg text-[12px] sm:text-base hover:underline"
                to="/forgot"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="mt-2">
              <p className="font-GilroyRegular text-sm sm:text-base md:text-sm lg:text-base text-primary_bg">
                Don't have an account ?{" "}
                <Link className="underline font-GilroyBold" to="/registration">
                  Sing Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
