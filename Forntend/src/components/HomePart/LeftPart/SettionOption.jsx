import React, { useState } from "react";
import { FaDisplay } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";
import DisplayMode from "./DisplayMode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SettionOption = () => {
  const [show, setShoow] = useState(true);
  const dispatch = useDispatch();
  const naviget = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("user");
    dispatch(reducers(null));
    naviget("/login");
  };
  return (
    <div>
      <ul>
        <li
          onClick={() => setShoow(!show)}
          className={`flex items-center gap-x-2 mb-1 font-GilroyMedium text-primary_bg text-base hover:bg-page_bg px-4 py-2 rounded-md group cursor-pointer transition-all ease-linear duration-100 ${
            show && "border-b border-b-page_bg border-b-solid"
          }`}
        >
          <div className="font-GilroyRegular text-base text-primary_bg group-hover:text-primary_bg transition-all ease-linear duration-100">
            <FaDisplay />
          </div>
          <p className="font-GilroyRegular text-sm text-primary_bg group-hover:text-primary_bg transition-all ease-linear duration-100">
            Dispaly Mode
          </p>
        </li>
        {show && <DisplayMode />}
        <li
          onClick={handleClick}
          className="flex items-center gap-x-2 mb-1 font-GilroyMedium text-primary_bg text-base hover:bg-page_bg px-4 py-2 rounded-md group cursor-pointer transition-all ease-linear duration-100"
        >
          <div className="font-GilroyRegular text-lg text-primary_bg group-hover:text-primary_bg transition-all ease-linear duration-100">
            <BiLogOutCircle />
          </div>
          <p className="font-GilroyRegular text-sm text-primary_bg group-hover:text-primary_bg transition-all ease-linear duration-100">
            LogOut
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SettionOption;
