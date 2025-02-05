import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import { MdOutlinePhotoAlbum } from "react-icons/md";
import OutSideClick from "../../components/HomePart/MiddelPart/click";
import coverPhot from "../../assets/defaultImage/defaultcover.jpg";
import { ToastContainer } from "react-toastify";
import Cropper from "react-easy-crop";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch, useSelector } from "react-redux";
import getCropImg from "../Funcation/CreateImage";
import {
  useCreatePostMutation,
  useUploadCoverProfileMutation,
  useUploadPostMutation,
} from "../../features/api/authApi";
import { increment } from "../../features/counter/counterSlice";

const CoverPhoto = ({ coverImg, visitor }) => {
  const [visible, setVisible] = useState(false);
  const choseFie = useRef(null);
  const clientWidths = useRef(null);
  const uploadComplete = useRef(null);
  const [width, setWidth] = useState();
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [uploadPost] = useUploadPostMutation();
  const [uploadCover] = useUploadCoverProfileMutation();
  const [createPost] = useCreatePostMutation();

  const clickOutside = useRef(null);
  OutSideClick(clickOutside, () => {
    setVisible(false);
  });

  // upload cover photo area
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

  // cropper area
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    //console.log(croppedArea, croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  }, []);

  useEffect(() => {
    setWidth(clientWidths.current.clientWidth);
  }, [window.innerWidth]);

  //crope img function
  const handleCrope = useCallback(
    async (show) => {
      try {
        const croppImages = await getCropImg(image, croppedArea);
        if (show) {
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setImage(croppImages);
        } else {
          return croppImages;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [croppedArea]
  );

  //upload photo cludy
  const handleUpload = async () => {
    try {
      setLoading(true);
      const img = await handleCrope();
      const blob = await fetch(img).then((b) => b.blob());

      const path = `${user.userName.replace(/\s+/g, "_")}/cover_images`;
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      const responsImage = await uploadPost({
        formData,
        path,
      }).unwrap();

      const uploadUserPro = await uploadCover({
        url: responsImage[0].url,
        id: user.id,
      }).unwrap();

      if (uploadUserPro.status === "done") {
        setLoading(false);
        const coverPicturePost = await createPost({
          type: "coverPhoto",
          images: responsImage,
          text: null,
          background: null,
          user: user.id,
          veryfied: user.veryfied,
        }).unwrap();

        if (coverPicturePost.status === "done") {
          setLoading(false);
          setVisible(false);
          setImage("");
          uploadComplete.current.src = `${responsImage[0].url}`;
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, coverPhoto: responsImage[0].url })
          );
          dispatch(increment({ ...user, coverPhoto: responsImage[0].url }));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        ref={clientWidths}
        className="relative w-full h-full md:h-96 mt-[69px] cursor-pointer"
      >
        <img
          className="w-full h-full object-cover"
          src={coverImg || coverPhot}
          alt="profile Cover"
          ref={uploadComplete}
        />
        {/* uppload cover photo file */}
        <input
          type="file"
          className="hidden"
          ref={choseFie}
          accept="image/jpeg, image/jpg, image/png, image/gif,image/webp"
          onChange={handleImageUp}
        />
        <div className="croper_cover">
          {image && (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={width / 384}
              // cropShape="round"
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit="horizontal-cover"
            />
          )}
        </div>
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
                <div
                  onClick={() => choseFie.current.click()}
                  className="flex items-center gap-x-2 text-center cursor-pointer group hover:bg-primary_bg py-2 px-3 rounded-md"
                >
                  <MdUpload className="text-primary_bg group-hover:text-main_bg" />
                  <span className="font-GilroyMedium text-base text-primary_bg group-hover:text-main_bg">
                    Upload Photo
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        {/* crope button */}
        {image && (
          <div className="absolute top-2 right-5">
            <button
              onClick={() => setImage("")}
              className="bg-main_bg px-2 py-1 rounded-md text-primary_bg mr-3"
            >
              Cancle
            </button>
            <button
              onClick={() => handleUpload()}
              disabled={loading}
              className="bg-rounded_bg px-2 py-1 rounded-md text-main_bg"
            >
              {loading ? <BeatLoader color="#fff" size={9.2} /> : "Save"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CoverPhoto;
