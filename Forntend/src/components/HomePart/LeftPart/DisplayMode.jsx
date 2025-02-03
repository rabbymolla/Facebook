import React from "react";
import { MdDarkMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { themeSwitch } from "../../../features/themes/themeSlice";

const DisplayMode = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="mt-3 ml-5 xl:ml-5 2xl:ml-7 flex gap-x-2">
        <div className="font-GilroyBold text-base text-primary_bg pt-1">
          <MdDarkMode />
        </div>
        <div>
          <h5 className="font-GilroyBold text-base text-primary_bg">
            Dark Mode
          </h5>
          <p className="font-GilroyRegular text-sm lg:text-[11px] text-primary_bg">
            If you have eyes Problem, Plz click On Button.
          </p>

          <div className="flex items-center justify-between mt-3">
            <label
              htmlFor="white"
              className="font-GilroyBold text-sm text-primary_bg"
            >
              Off
            </label>
            <input id="white" name="darkMode" type="radio" />
          </div>
          <div
            onClick={() => {
              dispatch(themeSwitch(true));
              localStorage.setItem("mode", true);
            }}
            className="flex items-center justify-between mt-1 mb-3"
          >
            <label
              htmlFor="dark"
              className="font-GilroyBold text-sm text-primary_bg"
            >
              On
            </label>
            <input id="dark" name="darkMode" type="radio" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayMode;
