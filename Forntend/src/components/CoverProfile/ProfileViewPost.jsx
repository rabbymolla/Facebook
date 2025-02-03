import React from "react";
import { FaListUl } from "react-icons/fa6";
import { IoGridSharp } from "react-icons/io5";

const ProfileViewPost = ({ setGrid, grid }) => {
  return (
    <>
      <div className="w-full shadow-md  rounded-md py-2 px-4 border border-page_bg">
        <div className="border-b border-page_bg border-solid pb-2">
          <h1 className="font-GilroyBold text-xl text-primary_bg">Post</h1>
        </div>
        <div className="flex items-center justify-around mt-3">
          <div
            className={`flex items-center gap-x-1 sm:gap-x-2 cursor-pointer pb-1 border-b-4  ${
              grid == "List" ? "border-rounded_bg" : "border-main_bg"
            }`}
            onClick={() => setGrid("List")}
          >
            <FaListUl
              className={`text-xs md:text-xl text-primary_bg ${
                grid == "List" ? "text-rounded_bg" : ""
              }`}
            />
            <p
              className={`font-GilroyMedium text-xs md:text-xl text-primary_bg ${
                grid == "List" ? "text-rounded_bg" : ""
              }`}
            >
              List View
            </p>
          </div>
          <div
            onClick={() => setGrid("Grid")}
            className={`flex items-center gap-x-1 sm:gap-x-2 cursor-pointer pb-1 border-b-4 ${
              grid == "Grid" ? "border-rounded_bg" : "border-main_bg"
            }`}
          >
            <IoGridSharp
              className={`text-xs md:text-xl text-primary_bg ${
                grid == "Grid" ? "text-rounded_bg" : ""
              }`}
            />
            <p
              className={`font-GilroyMedium text-xs md:text-xl text-primary_bg ${
                grid == "Grid" ? "text-rounded_bg" : ""
              }`}
            >
              Grid View
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileViewPost;
