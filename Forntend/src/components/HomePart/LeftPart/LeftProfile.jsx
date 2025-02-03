import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LeftProfile = () => {
  const user = useSelector((state) => state.counter.value);
  return (
    <>
      <Link
        to="/profile"
        className="flex items-center gap-x-2 mb-1 hover:bg-primary_bg px-4 py-2 rounded-md group transition-all ease-linear duration-100"
      >
        <div className="w-7 h-7 rounded-full border border-solid border-primary_bg group-hover:border-main_bg transition-all ease-linear duration-100 overflow-hidden">
          <img
            src={
              user.profilePicture || "../../src/assets/defaultImage/avatar.png"
            }
            alt="profile pic"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-GilroyMedium text-xs 2xl:text-base text-primary_bg group-hover:text-main_bg transition-all ease-linear duration-100 capitalize">
          {user.fname + " " + user.lname}
        </p>
      </Link>
    </>
  );
};

export default LeftProfile;
