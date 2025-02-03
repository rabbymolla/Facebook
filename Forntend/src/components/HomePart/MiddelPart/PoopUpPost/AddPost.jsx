import React from "react";
import { Link } from "react-router-dom";
import { PostIcon } from "../../../Funcation/PostIcon";

const AddPost = ({ setShow, show, bgRef, inputBox, setBackground }) => {
  const handleModals = (e) => {
    setShow(true);
    bgRef.current.style.backgroundImage = "";
    bgRef.current.classList.remove("bgPost");
    setBackground("");
    inputBox.current.focus();
  };
  return (
    <div>
      <div className="flex items-center justify-around border-page_bg border border-solid py-3 rounded-md shadow-md">
        <div>
          <p className="font-GilroyMedium text-lg text-primary_bg">Add Post</p>
        </div>
        <div className="flex items-center gap-x-2 lg:gap-x-5">
          {PostIcon.map((items, i) => (
            <div key={i} className="relative group">
              {show ? (
                <button
                  className={`text-lg text-red_color p-2 hover:bg-page_bg rounded-full transition-all ease-linear duration-100 block ${
                    items.tittle == "Photo/Video" ? "bg-page_bg" : ""
                  }`}
                >
                  <items.icon />
                </button>
              ) : items.tittle == "Photo/Video" ? (
                <button
                  className={`text-lg cursor-pointer text-red_color p-2 hover:bg-page_bg rounded-full transition-all ease-linear duration-100 block`}
                  onClick={(i) => handleModals(i)}
                >
                  <items.icon />
                </button>
              ) : (
                <button
                  className={`text-lg cursor-pointer text-red_color p-2 hover:bg-page_bg rounded-full transition-all ease-linear duration-100 block `}
                >
                  <items.icon />
                </button>
              )}
              <div className="absolute top-[50px] left-2/4 -translate-x-2/4 bg-primary_bg rounded-md invisible group-hover:visible z-10 px-3 pb-1 overflow-hidden box-border w-24 text-center">
                <span className="font-GilroyBold text-xs text-main_bg w-full ">
                  {items.tittle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
