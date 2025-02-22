import React, { useRef, useState } from "react";
import avater from "../../assets/defaultImage/avatar.png";
import { FaCamera } from "react-icons/fa";
import UpoladPhoto from "./UploadProfile/UpoladPhoto";

const ProfilePictuarInfo = ({
  profile,
  visitor,
  user,
  othername,
  uploadPhoto,
  visible,
  setVisible,
}) => {
  return (
    <>
      <div className="flex items-end md:items-center gap-x-4 ">
        <div className="relative">
          <div
            ref={uploadPhoto}
            style={{
              backgroundImage: `url(${profile?.profilePicture || avater})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-20 h-20 md:w-32 md:h-32 rounded-full cursor-pointer"
          ></div>
          {visitor ? (
            " "
          ) : (
            <>
              <div
                onClick={() => setVisible(!visible)}
                className="absolute bottom-3 md:bottom-5 -right-2 md:right-0 bg-main_bg p-1 rounded-full border border-page_bg cursor-pointer"
              >
                <FaCamera className="text-primary_bg text-sm " />
              </div>
            </>
          )}
        </div>
        <div>
          <h1 className="font-GilroyBold text-base md:text-xl text-primary_bg capitalize">
            {profile?.fname + " " + profile?.lname || "name"}
          </h1>
          <h1 className="font-GilroyRegular text-base md:text-lg text-primary_bg capitalize">
            {othername || "Other Name"}
          </h1>
        </div>
      </div>
    </>
  );
};

export default ProfilePictuarInfo;
