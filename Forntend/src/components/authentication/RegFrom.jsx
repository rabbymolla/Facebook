import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { singUp } from "../../validation";
import { useAddUserMutation } from "../../features/api/authApi";
import BeatLoader from "react-spinners/BeatLoader";

const initialState = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  dateOfDay: new Date().getDate(),
  dateOfMonth: "",
  dateOfYear: "",
  gender: "",
};

const RegFrom = ({ toast }) => {
  const [age, setAge] = useState("");
  const naviget = useNavigate();
  const [addUser, { isLoading }] = useAddUserMutation();

  const regApi = async () => {
    const singup = await addUser({
      fname: formik.values.fname,
      lname: formik.values.lname,
      email: formik.values.email,
      password: formik.values.password,
      dateOfDay: formik.values.dateOfDay,
      dateOfMonth: formik.values.dateOfMonth,
      dateOfYear: formik.values.dateOfYear,
      gender: formik.values.gender,
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
    validationSchema: singUp,
    onSubmit: (values) => {
      const current_Date = new Date();
      const piked_Date = new Date(
        formik.values.dateOfYear,
        formik.values.dateOfMonth - 1,
        formik.values.dateOfDay
      );
      const adult = new Date(1970 + 18, 0, 1);
      const old = new Date(1970 + 70, 0, 1);
      if (current_Date - piked_Date < adult) {
        return setAge("Underage you are not 18");
      }
      if (current_Date - piked_Date > old) {
        return setAge("You are more than age 70");
      }
      regApi();
      setAge("");
      //formik.resetForm();
    },
  });

  const tempYears = new Date().getFullYear();

  const years = Array.from(new Array(105), (val, index) => tempYears - index);
  const month = Array.from(new Array(12), (val, index) => 1 + index);
  const day = () => {
    return new Date(
      formik.values.dateOfYear,
      formik.values.dateOfMonth,
      0
    ).getDate();
  };
  const getDay = Array.from(new Array(day()), (val, index) => 1 + index);

  return (
    <>
      <div className="w-full shadow-md py-8 px-12 rounded-md ">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="fname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fname}
                autoComplete="off"
                placeholder="Your First Name"
                className="py-2 px-4 border-2 border-primary_bg border-solid rounded-md font-extralight w-full capitalize"
              />
              {formik.touched.fname && formik.errors.fname ? (
                <p className="font-GilroyRegular text-sm text-[#e60b0b] absolute left-0 -bottom-6">
                  {formik.errors.fname}
                </p>
              ) : null}
            </div>
            <div className="relative">
              <input
                name="lname"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lname}
                autoComplete="off"
                placeholder="Your Last Name"
                className="py-2 px-4 border-2 border-primary_bg border-solid rounded-md font-extralight w-full my-7 capitalize"
              />
              {formik.touched.lname && formik.errors.lname ? (
                <p className="font-GilroyRegular text-sm text-[#e60b0b] absolute left-0 bottom-0">
                  {formik.errors.lname}
                </p>
              ) : null}
            </div>
            <div className="relative">
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
            <div className="relative">
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="off"
                placeholder="Enter your new Password"
                className="py-2 px-4 border-2 border-primary_bg border-solid rounded-md font-extralight w-full my-7"
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="font-GilroyRegular text-sm text-[#e60b0b] absolute left-0 bottom-0">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            <div className="sm:flex sm:gap-x-5 font-GilroyMedium text-primary_bg md:text-sm lg:text-base relative">
              <select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfYear}
                autoComplete="off"
                name="dateOfYear"
                className="py-2 border-2 border-primary_bg border-solid rounded-md text-[#222]"
              >
                <option>Birthday Year</option>
                {years.map((year, i) => (
                  <option key={i}>{year}</option>
                ))}
              </select>
              <select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfMonth}
                name="dateOfMonth"
                autoComplete="off"
                className="my-4 sm:my-0 py-2 border-2 border-primary_bg border-solid rounded-md text-[#222]"
              >
                <option>Birthday Month</option>
                {month.map((month, i) => (
                  <option key={i}>{month}</option>
                ))}
              </select>
              <select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfDay}
                name="dateOfDay"
                autoComplete="off"
                className="py-2 border-2 border-primary_bg border-solid rounded-md text-[#222]"
              >
                <option value="">Birthday Day</option>
                {getDay.map((day, i) => (
                  <option key={i}>{day}</option>
                ))}
              </select>
              {age && (
                <p className="font-GilroyRegular text-sm text-[#e60b0b] absolute left-0 -bottom-6">
                  {age}
                </p>
              )}
            </div>

            <div className="my-7 flex gap-x-5 relative">
              <div className="font-GilroyMedium text-primary_bg text-lg">
                <input
                  id="Male"
                  type="radio"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="male"
                  autoComplete="off"
                />
                <label htmlFor="Male">Male</label>
              </div>
              <div className="font-GilroyMedium text-primary_bg text-lg">
                <input
                  id="Female"
                  type="radio"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="female"
                  autoComplete="off"
                  name="gender"
                />
                <label htmlFor="Female">Female</label>
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <p className="font-GilroyRegular text-sm text-[#e60b0b] absolute left-0 top-7">
                  {formik.errors.gender}
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
                  className="font-GilroyMedium py-3 px-9 bg-rounded_bg rounded-lg text-text_color text-base"
                  type="submit"
                >
                  Submit
                </button>
              )}

              <p className="font-GilroyRegular text-sm sm:text-base md:text-sm lg:text-base text-primary_bg mt-5 sm:mt-0">
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

export default RegFrom;
