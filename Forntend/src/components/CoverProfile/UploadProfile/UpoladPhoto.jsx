import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import OutSideClick from "../../HomePart/MiddelPart/click";
import { PlusCircle } from "../../../assets/svg/PlusCircle";
import SelectPhoto from "./SelectPhoto";

const UpoladPhoto = ({ visible, setVisible, uploadPhoto, listImage, user }) => {
  const clickOutside = useRef(null);
  const chooseFile = useRef(null);
  const [image, setImage] = useState("");

  OutSideClick(clickOutside, () => {
    setVisible(false);
  });

  const handleImageUp = (e) => {
    let file = Array.from(e.target.files);
    file.forEach((img) => {
      if (
        img.type != "image/jpeg" &&
        img.type != "image/jpg" &&
        img.type != "image/png" &&
        img.type != "image/gif" &&
        img.type != "image/webp"
      ) {
        file = file.filter((item) => item.name !== img.name);
        toast.error(`${img.name} Unsupported Files`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        return;
      } else if (img.size > 1024 * 1024 * 10) {
        file = file.filter((item) => item.name !== img.name);
        toast.error(`${img.name} is up to 10MB`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        return;
      }
      const renderFiles = new FileReader();
      renderFiles.readAsDataURL(img);
      renderFiles.onload = (renderImage) => {
        setImage((images) => [...images, renderImage.target.result]);
      };
    });
  };

  useEffect(() => {
    const scroll = document.body;
    if (visible) {
      scroll.classList.add("no-scroll");
    } else {
      scroll.classList.remove("no-scroll");
    }
    return () => {
      scroll.classList.remove("no-scroll");
    };
  }, [visible]);
  //console.log(listImage);

  return (
    <>
      <ToastContainer />
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-opcity_color z-10">
        <div
          ref={clickOutside}
          className="bg-main_bg rounded-md shadow-xl w-11/12 sm:w-[500px] relative "
        >
          <div className="border-b p-4 border-b-primary_bg border-solid">
            <div className="text-center ">
              <h1 className="font-GilroyBold text-xs sm:text-lg text-primary_bg">
                Upload Profile
              </h1>
            </div>
            <div
              onClick={() => setVisible(!visible)}
              className="absolute top-4 right-4 p-1 bg-page_bg text-sm sm:text-xl text-primary_bg rounded-full cursor-pointer"
            >
              <IoCloseSharp />
            </div>
          </div>

          <div className="p-5">
            <div
              onClick={() => chooseFile.current.click()}
              className="flex sm:gap-x-1 justify-center items-center bg-rounded_bg w-full sm:w-1/2 py-2 rounded-md cursor-pointer mx-auto"
            >
              <div className="text-main_bg ">
                <PlusCircle />
              </div>
              <span className="font-GilroyMedium text-main_bg text-xs sm:text-lg">
                Upload Photo
              </span>
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/gif,image/webp"
                className="hidden"
                ref={chooseFile}
                onChange={handleImageUp}
              />
            </div>
            <div className="h-[200px] overflow-y-auto mt-3">
              <div>
                <h1 className="font-GilroyBold text-xl text-primary_bg">
                  Old Profiles
                </h1>
                <span className="font-GilroyRegular text-sm text-primary_bg ">
                  Tottal:{" "}
                  {
                    listImage.filter(
                      (img) =>
                        img.asset_folder ===
                        `${user.userName.replace(/\s+/g, "_")}/profile_images`
                    ).length
                  }
                </span>

                <div className="grid grid-cols-4 gap-2 mt-5">
                  {listImage
                    .filter(
                      (img) =>
                        img.asset_folder ===
                        `${user.userName.replace(/\s+/g, "_")}/profile_images`
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
                        img.asset_folder !==
                        `${user.userName.replace(/\s+/g, "_")}/profile_images`
                    ).length
                  }
                </span>

                <div className="grid grid-cols-4 gap-2 mt-5">
                  {listImage
                    .filter(
                      (img) =>
                        img.asset_folder !==
                        `${user.userName.replace(/\s+/g, "_")}/profile_images`
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
          </div>

          {image && (
            <SelectPhoto
              uploadPhoto={uploadPhoto}
              setImage={setImage}
              image={image}
              visible={visible}
              setVisible={setVisible}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UpoladPhoto;
