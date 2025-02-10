import React, { useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import OutSideClick from "../../HomePart/MiddelPart/click";
import Skeleton from "react-loading-skeleton";

const ChooseCover = ({
  setShow,
  show,
  user,
  listImage,
  error,
  isLoading,
  setImage,
}) => {
  const clickOutside = useRef(null);

  //modal open part
  OutSideClick(clickOutside, () => {
    setShow(false);
  });
  useEffect(() => {
    const scroll = document.body;
    if (show) {
      scroll.classList.add("no-scroll");
    } else {
      scroll.classList.remove("no-scroll");
    }
    return () => {
      scroll.classList.remove("no-scroll");
    };
  }, [show]);
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-opcity_color z-10">
      <div
        ref={clickOutside}
        className="bg-main_bg rounded-md shadow-xl w-11/12 sm:w-[500px] relative "
      >
        <div className="border-b p-4 border-b-primary_bg border-solid">
          <div className="text-center ">
            <h1 className="font-GilroyBold text-xs sm:text-lg text-primary_bg">
              Choose Cover
            </h1>
          </div>
          <div
            onClick={() => setShow(!show)}
            className="absolute top-4 right-4 p-1 bg-page_bg text-sm sm:text-xl text-primary_bg rounded-full cursor-pointer"
          >
            <IoCloseSharp />
          </div>
        </div>

        <div className="p-5">
          {isLoading ? (
            <Skeleton count={5} />
          ) : (
            <div className="h-[200px] overflow-y-auto mt-3">
              <div>
                <h1 className="font-GilroyBold text-xl text-primary_bg">
                  Old Cover
                </h1>
                <span className="font-GilroyRegular text-sm text-primary_bg ">
                  Tottal:{" "}
                  {
                    listImage.filter(
                      (img) =>
                        img.asset_folder ===
                        `${user.userName.replace(/\s+/g, "_")}/cover_images`
                    ).length
                  }
                </span>

                <div className="grid grid-cols-4 gap-2 mt-5">
                  {listImage
                    .filter(
                      (img) =>
                        img.asset_folder ===
                        `${user.userName.replace(/\s+/g, "_")}/cover_images`
                    )
                    .map((img) => (
                      <img
                        onClick={() => setImage(img.secure_url)}
                        key={img.public_id}
                        src={img.secure_url}
                        alt=""
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    ))}
                </div>
              </div>
              <div className="mt-5">
                <h1 className="font-GilroyBold text-xl text-primary_bg">
                  Other Photos
                </h1>
                <span className="font-GilroyRegular text-sm text-primary_bg ">
                  Tottal:{" "}
                  {
                    listImage.filter(
                      (img) =>
                        img.asset_folder ===
                        `${user.userName.replace(/\s+/g, "_")}/post_images`
                    ).length
                  }
                </span>

                <div className="grid grid-cols-4 gap-2 mt-5">
                  {listImage
                    .filter(
                      (img) =>
                        img.asset_folder ===
                        `${user.userName.replace(/\s+/g, "_")}/post_images`
                    )
                    .map((img) => (
                      <img
                        onClick={() => setImage(img.secure_url)}
                        key={img.public_id}
                        src={img.secure_url}
                        alt=""
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseCover;
