import React, { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SettionOption from "./SettionOption";
import OutSideClick from "../MiddelPart/click";

const LeftHome = ({ item }) => {
  const [show, setShoow] = useState(true);
  const clickOutside = useRef(null);
  const location = useLocation();
  const path = location.pathname;

  OutSideClick(clickOutside, () => {
    setShoow(false);
  });

  const SettingPage = item.tittle === "Setting" && (
    <div ref={clickOutside}>
      <NavLink
        onClick={() => setShoow(!show)}
        to={item.to}
        className={`flex items-center gap-x-2 mb-1 hover:bg-primary_bg px-4 py-2 rounded-md group cursor-pointer transition-all ease-linear duration-100 ${
          show && ""
        }`}
      >
        <div
          className={`font-GilroyMedium text-lg text-primary_bg group-hover:text-main_bg transition-all ease-linear duration-100`}
        >
          {<item.icon />}
        </div>
        <div>
          <p
            className={`font-GilroyMedium text-base text-primary_bg group-hover:text-main_bg transition-all ease-linear duration-100 `}
          >
            {item.tittle}
          </p>
        </div>
      </NavLink>
      {show && (
        <div>
          <SettionOption />
        </div>
      )}
    </div>
  );
  return (
    <>
      {SettingPage ? (
        SettingPage
      ) : (
        <>
          <NavLink
            to={item.to}
            className={`flex items-center gap-x-2 mb-1 hover:bg-primary_bg px-4 py-2 rounded-md group cursor-pointer transition-all ease-linear duration-100 ${
              path === item.to ? "bg-page_bg" : ""
            }`}
          >
            <div
              className={`font-GilroyMedium text-lg text-primary_bg group-hover:text-main_bg transition-all ease-linear duration-100  ${
                path === item.to ? "text-[#fff]" : ""
              }`}
            >
              {<item.icon />}
            </div>
            <div>
              <p
                className={`font-GilroyMedium text-base text-primary_bg group-hover:text-main_bg transition-all ease-linear duration-100   ${
                  path === item.to && "text-[#fff]"
                }`}
              >
                {item.tittle}
              </p>
            </div>
          </NavLink>
        </>
      )}
    </>
  );
};

export default LeftHome;
