import React from "react";
import LeftPart from "../HomePart/LeftPart";
import { Outlet } from "react-router-dom";
import Hedder from "../HomePart/MiddelPart/Hedder";
import RightPart from "../HomePart/RightPart";

const RootLayOut = ({ toast }) => {
  return (
    <div>
      <div className="shadow-md w-full py-4 fixed top-0 left-0 z-10 bg-main_bg">
        <Hedder />
      </div>
      <div className="container sm:grid sm:grid-cols-12 sm:gap-x-7 mt-[85px]">
        <div className="lg:col-start-1 lg:col-end-4 xl:col-end-3 hidden lg:block">
          <LeftPart toast={toast} />
        </div>
        <div className="sm:h-screen sm:overflow-x-auto sm:col-start-1 sm:col-end-8 md:col-start-1 md:col-end-9 lg:col-start-4 xl:col-start-3 lg:col-end-10">
          <Outlet />
        </div>
        <div className="overflow-x-auto h-screen sm:col-start-8 sm:col-end-13 md:col-start-9 md:col-end-13 lg:col-start-10 lg:col-end-13 hidden sm:block">
          <RightPart />
        </div>
      </div>
    </div>
  );
};

export default RootLayOut;
