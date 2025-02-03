import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Cropper from "react-easy-crop";
import { Minus } from "../../../assets/svg/Minus";
import { Plus } from "../../../assets/svg/Plus";
import getCropImg from "../../Funcation/CreateImage";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreatePostMutation,
  useUploadPostMutation,
  useUploadProfileMutation,
} from "../../../features/api/authApi";
import { increment } from "../../../features/counter/counterSlice";
import BeatLoader from "react-spinners/BeatLoader";

const SelectPhoto = ({ setImage, image, uploadPhoto, setVisible }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadPost] = useUploadPostMutation();
  const [uploadProfileMut] = useUploadProfileMutation();
  const [createPost] = useCreatePostMutation();
  const user = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [croppedArea, setCroppedArea] = useState(null);
  const zoomRef = useRef(null);
  const inputBox = useRef(null);

  useEffect(() => {
    inputBox.current.focus();
  }, [inputBox]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    //console.log(croppedArea, croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  }, []);

  const zoomOut = () => {
    //setZoom((prv) => prv - 0.2);
    zoomRef.current.stepDown();
    setZoom(zoomRef.current.value);
  };
  const zoomIn = () => {
    zoomRef.current.stepUp();
    setZoom(zoomRef.current.value);
  };

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

      const path = `${user.userName.replace(/\s+/g, "_")}/profile_images`;
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      const responsImage = await uploadPost({ formData, path }).unwrap();

      const uploadUserPro = await uploadProfileMut({
        url: responsImage[0].url,
        id: user.id,
      }).unwrap();

      if (uploadUserPro.status === "done") {
        setLoading(false);
        const profilePicturePost = await createPost({
          type: "profilePicture",
          images: responsImage,
          text,
          background: null,
          user: user.id,
          veryfied: user.veryfied,
        }).unwrap();

        if (profilePicturePost.status === "done") {
          setLoading(false);
          setVisible(false);
          uploadPhoto.current.style.backgroundImage = `url(${responsImage[0].url})`;
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, profilePicture: responsImage[0].url })
          );
          dispatch(increment({ ...user, profilePicture: responsImage[0].url }));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-main_bg rounded-md shadow-xl w-full">
      <div className="border-b p-4 border-b-primary_bg border-solid">
        <div className="text-center ">
          <h1 className="font-GilroyBold text-xs sm:text-lg text-primary_bg ">
            Adding Profile
          </h1>
        </div>
        <div
          onClick={() => setImage("")}
          className="text-sm sm:text-xl absolute top-4 right-4 p-1 bg-page_bg text-primary_bg rounded-full cursor-pointer"
        >
          <IoCloseSharp />
        </div>
      </div>
      <div className="p-5">
        <div>
          <textarea
            ref={inputBox}
            onChange={(e) => setText(e.target.value)}
            placeholder="Caption"
            className="w-full font-GilroyRegular text-xl text-primary_bg bg-transparent outline-none p-2 resize-none h-12"
          />
        </div>
        <div className="croper flex items-center justify-center w-full h-[270px] mt-3 relative">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className="flex items-center justify-center mt-3 gap-x-2">
          <div
            onClick={zoomOut}
            className="p-1 rounded-full bg-page_bg cursor-pointer"
          >
            <Minus />
          </div>
          <input
            onChange={(e) => setZoom(e.target.value)}
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            ref={zoomRef}
            type="range"
            className="w-[200px] coustom_range"
          />
          <div
            onClick={zoomIn}
            className="p-1 rounded-full bg-page_bg cursor-pointer"
          >
            <Plus />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-x-2">
          <div>
            <button
              disabled={loading}
              onClick={() => handleCrope("show")}
              className="font-GilroyMedium text-primary_bg text-base py-2 px-4 bg-page_bg rounded-sm"
            >
              Save crop
            </button>
          </div>
          <div>
            <button
              onClick={() => handleUpload()}
              disabled={loading}
              className="font-GilroyMedium text-main_bg text-base py-2 px-4 bg-rounded_bg rounded-sm"
            >
              {loading ? <BeatLoader color="#fff" size={9.2} /> : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPhoto;
