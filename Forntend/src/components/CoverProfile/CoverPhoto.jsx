import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import { MdOutlinePhotoAlbum } from "react-icons/md";
import OutSideClick from "../../components/HomePart/MiddelPart/click";
import coverPhot from "../../src/assets/defaultImage/defaultcover.jpg";

const CoverPhoto = ({ coverImg, visitor }) => {
  const [visible, setVisible] = useState(false);
  const clickOutside = useRef(null);
  OutSideClick(clickOutside, () => {
    setVisible(false);
  });
  return (
    <div>
      <div className="relative w-full h-52 md:h-96 mt-[69px] cursor-pointer">
        <img
          className="w-full h-full object-cover"
          src={coverImg || coverPhot}
          alt="profile Cover"
        />
        {visitor ? (
          ""
        ) : (
          <div className="absolute bottom-2 right-2">
            <div
              className="flex items-center gap-x-2 px-4 py-2 bg-main_bg rounded-md w-36 text-center cursor-pointer"
              onClick={() => setVisible(!visible)}
            >
              <FaCamera className="text-primary_bg" />
              <span className="font-GilroyMedium text-base text-primary_bg">
                Edit Photo
              </span>
            </div>

            {visible && (
              <div
                ref={clickOutside}
                className="absolute top-11 right-0 shadow-lg box-border px-4 py-2 bg-main_bg rounded-md w-64 z-10"
              >
                <div className="flex items-center gap-x-2 text-center cursor-pointer group hover:bg-primary_bg py-2 px-3 rounded-md">
                  <MdOutlinePhotoAlbum className="text-primary_bg group-hover:text-main_bg" />
                  <span className="font-GilroyMedium text-base text-primary_bg group-hover:text-main_bg">
                    Choose Cover Photo
                  </span>
                </div>
                <div className="flex items-center gap-x-2 text-center cursor-pointer group hover:bg-primary_bg py-2 px-3 rounded-md">
                  <MdUpload className="text-primary_bg group-hover:text-main_bg" />
                  <span className="font-GilroyMedium text-base text-primary_bg group-hover:text-main_bg">
                    Upload Photo
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverPhoto;
