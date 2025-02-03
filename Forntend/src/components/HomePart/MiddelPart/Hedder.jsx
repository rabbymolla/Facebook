import React, { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import SearchBox from "./SearchBox";
import OutSideClick from "./click";
import ResProfile from "../../ResponsivePart/ResProfile";
import ResManu from "../../ResponsivePart/ResManu";
import { useLocation, useNavigate } from "react-router-dom";

const Hedder = () => {
  const [showOne, setShowOne] = useState(false);
  const clickOutside = useRef(null);
  const location = useLocation();
  const path = location.pathname;

  OutSideClick(clickOutside, () => {
    setShowOne(false);
  });

  return (
    <div className="container">
      <div className="grid items-center grid-cols-12 gap-x-5">
        <div className="col-start-1 col-end-3 lg:col-end-4 xl:col-end-3">
          <div>
            <div
              className="flex items-center justify-center border border-page_bg border-solid w-9 h-9 rounded-full  lg:w-full 3xl:w-[240px] lg:h-auto lg:justify-start lg:gap-x-2  lg:py-1 lg:px-5 bg-page_bg "
              onClick={() => setShowOne(true)}
            >
              <IoIosSearch size={20} className="text-primary_bg" />

              <input
                type="text"
                placeholder="Search"
                className="font-GilroyRegular outline-none w-full bg-page_bg text-main_bg hidden lg:block placeholder:text-primary_bg"
              />
            </div>
            {showOne && (
              <div ref={clickOutside} className="absolute top-0 left-0 z-10 ">
                <SearchBox setShowOne={setShowOne} />
              </div>
            )}
          </div>
        </div>
        <div className="col-start-3 col-end-11 lg:col-start-4 lg:col-end-10 xl:col-start-3 ">
          <div className={`lg:hidden `}>
            <ResManu />
          </div>
          {path === "/" ? (
            <div className="hidden lg:block">
              <p className="text-primary_bg bg-page_bg">feeds</p>
            </div>
          ) : (
            <div className="hidden lg:block">
              <ResManu />
            </div>
          )}
        </div>
        <div className="col-start-11 lg:col-start-10 col-end-13 ">
          <div className="lg:hidden">
            <ResProfile />
          </div>
          <div className="hidden lg:block">
            {path === "/" ? (
              <p className="text-primary_bg">right</p>
            ) : (
              <ResProfile />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hedder;
