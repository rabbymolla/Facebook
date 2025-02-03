import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LeftData } from "../HomePart/LeftPart/LeftData";
import LeftHome from "../HomePart/LeftPart/LeftHome";
import LeftProfile from "../HomePart/LeftPart/LeftProfile";
import OutSideClick from "../HomePart/MiddelPart/click";
import { useSelector } from "react-redux";

const ResProfile = () => {
  const [modal, setModal] = useState(false);
  const clickOutside = useRef(null);
  const user = useSelector((state) => state.counter.value);

  OutSideClick(clickOutside, () => {
    setModal(false);
  });
  return (
    <div ref={clickOutside}>
      <div onClick={() => setModal(!modal)} className="relative ">
        <div className="relative group">
          <div className="ml-auto w-9 h-9 rounded-full bg-primary_bg  cursor-pointer overflow-hidden">
            <img
              src={
                user.profilePicture ||
                "../../src/assets/defaultImage/avatar.png"
              }
              alt="profile pic"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 flex items-center justify-end h-3 w-3 rounded-full bg-page_bg text-primary_bg z-10">
            <MdOutlineKeyboardArrowDown />
          </div>
          <div className="absolute top-[55px] right-0 bg-page_bg rounded-md invisible group-hover:visible transition-all ease-linear duration-100 z-10">
            <p className="font-GilroyMedium text-sm text-primary_bg py-1  px-2">
              Account
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-[70px] right-0">
        {modal && (
          <div className="bg-main_bg shadow-lg py-5 px-6 w-[300px]">
            {LeftData.slice(4, 5).map((items, i) => (
              <div key={i}>
                <LeftProfile />
                <LeftHome item={items} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResProfile;
