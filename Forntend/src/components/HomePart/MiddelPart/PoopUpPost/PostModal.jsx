import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import OutSideClick from "../click";
import AddPost from "./AddPost";
import ImageVeiw from "./ImageVeiw";
import Emoji from "./Emoji";
import {
  useCreatePostMutation,
  useUploadPostMutation,
} from "../../../../features/api/authApi";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { toast, ToastContainer } from "react-toastify";
import dataUrlToBlob from "../../../Funcation/dataUrlToBlob";
import { Link } from "react-router-dom";

const PostModal = ({ setModal, modal }) => {
  const clickOutside = useRef(null);
  const inputBox = useRef(null);
  const bgRef = useRef(null);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [background, setBackground] = useState("");
  const [image, setImage] = useState([]);
  const [loding, setLoding] = useState(false);
  const [err, setErr] = useState("Something is wrong");
  const [createPost] = useCreatePostMutation();
  const [uploadPost] = useUploadPostMutation();

  const user = useSelector((state) => state.counter.value);

  OutSideClick(clickOutside, () => {
    setModal(false);
  });

  useEffect(() => {
    const scroll = document.body;
    if (modal) {
      scroll.classList.add("no-scroll");
    } else {
      scroll.classList.remove("no-scroll");
    }
    return () => {
      scroll.classList.remove("no-scroll");
    };
  }, [modal]);

  const handleSubmit = async () => {
    try {
      let response;
      setLoding(true);
      if (background) {
        response = await createPost({
          type: null,
          images: null,
          text,
          background,
          user: user.id,
          veryfied: user.veryfied,
        }).unwrap();
      } else if (image && image.length) {
        const postImage = image.map((items) => dataUrlToBlob(items));
        const path = `${user.userName.replace(/\s+/g, "_")}/post_images`;
        let formData = new FormData();

        formData.append("path", path);
        postImage.forEach((img) => {
          formData.append("file", img);
        });

        const responsImage = await uploadPost({ formData, path }).unwrap();

        response = await createPost({
          type: null,
          images: responsImage,
          text,
          background: null,
          user: user.id,
          veryfied: user.veryfied,
        }).unwrap();
      } else if (text) {
        response = await createPost({
          type: null,
          images: null,
          text,
          background: null,
          user: user.id,
          veryfied: user.veryfied,
        }).unwrap();
      } else {
        toast.error("Response is wrong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "light",
        });
      }
      if (response.status === "done") {
        setLoding(false);
        setText("");
        setBackground("");
        setModal(false);
      }
    } catch (error) {
      setErr(error.message);
      toast.error("Something is wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
      setLoding(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-opcity_color z-10">
        <div
          ref={clickOutside}
          className="bg-main_bg rounded-md shadow-xl w-11/12 sm:w-[500px] relative "
        >
          <div>
            <div className="border-b p-4 border-b-primary_bg border-solid">
              <div className="text-center ">
                <h1 className="font-GilroyBold text-lg text-primary_bg">
                  Create Post
                </h1>
              </div>
              <div
                onClick={() => setModal(!modal)}
                className="absolute top-4 right-4 p-1 bg-page_bg text-primary_bg rounded-full cursor-pointer"
              >
                <IoCloseSharp size={25} />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-x-2">
                <Link
                  to="/profile"
                  className="w-12 h-12  bg-primary_bg rounded-full overflow-hidden object-cover cursor-pointer"
                >
                  <img
                    src={
                      user.profilePicture ||
                      "../../src/assets/defaultImage/avatar.png"
                    }
                    alt="profile pic"
                  />
                </Link>
                <div>
                  <p className="font-GilroyMedium text-base text-primary_bg group-hover:text-main_bg transition-all ease-linear duration-100 capitalize">
                    {user.fname + " " + user.lname}
                  </p>
                </div>
              </div>
              {!show ? (
                <>
                  <Emoji
                    text={text}
                    setText={setText}
                    background={background}
                    setBackground={setBackground}
                    bgRef={bgRef}
                    inputBox={inputBox}
                  />
                </>
              ) : (
                <>
                  <Emoji
                    changePart
                    text={text}
                    setText={setText}
                    inputBox={inputBox}
                  />
                  <ImageVeiw
                    setImage={setImage}
                    image={image}
                    setShow={setShow}
                    toast={toast}
                  />
                </>
              )}
              <div>
                <AddPost
                  setShow={setShow}
                  show={show}
                  setBackground={setBackground}
                  bgRef={bgRef}
                  inputBox={inputBox}
                />
              </div>
              <div className="mt-2">
                {text == "" && image.length == 0 ? (
                  <button
                    disabled
                    className="font-GilroyBold text-lg bg-page_bg w-full py-3 rounded-lg text-primary_bg"
                  >
                    Post
                  </button>
                ) : loding ? (
                  <button className="font-GilroyBold text-lg bg-rounded_bg w-full py-3 rounded-lg text-main_bg">
                    <BeatLoader color="#fff" size={9.2} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="font-GilroyBold text-lg bg-rounded_bg w-full py-3 rounded-lg text-main_bg"
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
