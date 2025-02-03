import React, { useRef } from "react";
import { IoCloseSharp, IoCloudUploadOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MultiUpload = ({ setImage, image, setShow, toast }) => {
  const chooseFile = useRef();
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
  const handleClose = () => {
    setShow(false);
    setImage("");
  };
  return (
    <div className="mb-5">
      <div className="h-[110px] md:h-[124px] overflow-y-auto relative border-primary_bg border border-solid rounded-lg p-2">
        <div
          className="flex items-center justify-center w-full bg-page_bg rounded-lg overflow-hidden p-2"
          onClick={() => chooseFile.current.click()}
        >
          <div>
            <input
              type="file"
              multiple
              accept="image/jpeg, image/jpg, image/png, image/gif,image/webp"
              className="hidden"
              ref={chooseFile}
              onChange={handleImageUp}
            />
            {image && image.length ? (
              <div className="relative">
                <div className="absolute top-2 left-2 bg-primary_bg px-3 py-2 rounded-md">
                  <Link>
                    <p className="font-GilroyMedium text-sm md:text-md text-main_bg leading-none">
                      Add photos/videos
                    </p>
                  </Link>
                </div>
                <div
                  className={`  ${
                    image.length === 1
                      ? "overflow-hidden w-full h-full grid grid-cols-1"
                      : image.length === 2
                      ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-full"
                      : image.length === 3
                      ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-full"
                      : image.length === 4
                      ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-full"
                      : image.length >= 5
                      ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-full"
                      : "overflow-hidden"
                  }`}
                >
                  {image.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className={`object-cover w-full h-full ${
                        image.length === 3
                          ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3"
                          : image.length === 4 &&
                            "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3 w-[100px]"
                      }`}
                      alt="images"
                    />
                  ))}
                </div>
                {image.length >= 5 && (
                  <div className="flex items-center justify-center absolute bottom-[60px] right-[80px] h-8 w-8 rounded-full">
                    <span className="font-GilroyBold text-main_bg text-2xl">
                      +{image.length - 4}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <IoCloudUploadOutline
                  size={30}
                  className="mx-auto mb-2 text-primary_bg"
                />
                <p className="font-GilroyMedium text-sm md:text-lg text-primary_bg leading-none">
                  Add photos/videos
                </p>
                <span className="font-GilroyRegular text-xs md:text-sm text-primary_bg leading-none">
                  or Drag and drop
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          className="absolute top-3 right-3 p-1 bg-main_bg border border-primary_bg border-solid text-primary_bg rounded-full cursor-pointer"
          onClick={handleClose}
        >
          <IoCloseSharp size={20} />
        </div>
      </div>
    </div>
  );
};

export default MultiUpload;
