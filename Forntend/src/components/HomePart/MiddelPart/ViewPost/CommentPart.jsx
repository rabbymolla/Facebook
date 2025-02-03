import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { TbLibraryPhoto } from "react-icons/tb";
import OutSideClick from "../click";
import { IoCloseSharp } from "react-icons/io5";

const CommentPart = ({
  user,
  text,
  setText,
  commentImg,
  setCommentImg,
  setError,
  error,
  textRef,
  post,
}) => {
  const [piker, setPiker] = useState(false);
  const [currentPosition, setCurrentPosition] = useState();
  const clickOutsideEmoji = useRef(null);
  const chooseFile = useRef();

  OutSideClick(clickOutsideEmoji, () => {
    setPiker(false);
  });

  const handleEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCurrentPosition(start.length + emoji.length);
  };

  useEffect(() => {
    textRef.current.focus();
    textRef.current.selectionEnd = currentPosition;
  }, [currentPosition]);

  const handleImageUp = (e) => {
    const file = e.target.files[0];

    if (
      file.type != "image/jpeg" &&
      file.type != "image/jpg" &&
      file.type != "image/png" &&
      file.type != "image/gif" &&
      file.type != "image/webp"
    ) {
      setError(`${file.name} Unsupported File`);
      return;
    } else if (file.size > 1024 * 1024 * 10) {
      setError(`${file.name} Unsupported File`);
      return;
    }
    const renderFiles = new FileReader();
    renderFiles.readAsDataURL(file);
    renderFiles.onload = (finishedRead) => {
      setCommentImg(finishedRead.target.result);
    };
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-x-2">
        <div className="w-1/6 md:w-[10%] lg:w-[11%] xl:w-14">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <img
              src={
                user.profilePicture ||
                "../../src/assets/defaultImage/avatar.png"
              }
              alt="profile pic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-10/12 md:w-[90%] lg:w-[99%] flex items-center bg-page_bg px-3 py-2 rounded-full">
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            ref={textRef}
            placeholder={`comment as ${user.userName}`}
            className="w-[90%]  outline-none  placeholder:font-GilroyRegular placeholder:text-primary_bg placeholder:text-xs md:placeholder:text-base bg-transparent"
          />
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/gif,image/webp"
            className="hidden"
            ref={chooseFile}
            onChange={handleImageUp}
          />
          <div className="flex items-center gap-x-2">
            <div className="relative" ref={clickOutsideEmoji}>
              <BsEmojiSmile
                className="text-2xl cursor-pointer text-primary_bg"
                onClick={() => setPiker(!piker)}
              />
              {piker && (
                <div className="absolute bottom-7 right-0 z-20">
                  <EmojiPicker onEmojiClick={handleEmoji} />
                </div>
              )}
            </div>
            <TbLibraryPhoto
              className="text-2xl cursor-pointer text-primary_bg"
              onClick={() => chooseFile.current.click()}
            />
          </div>
        </div>
      </div>
      <div>
        {commentImg && (
          <div className="mt-5 relative w-48 overflow-hidden group">
            <img
              src={commentImg}
              alt="commentImg"
              className="w-full h-full object-cover cursor-pointer"
            />
            <div
              className="absolute top-2 right-2 p-1 bg-page_bg rounded-full cursor-pointer hidden  group-hover:block ease-linear duration-100"
              onClick={() => setCommentImg("")}
            >
              <IoCloseSharp size={25} />
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="absolute top-0 left-0 h-full z-10 bg-main_bg flex items-center justify-center w-full gap-x-2">
          <p className="font-GilroyMedium text-xl text-red_color">{error}</p>
          <button
            className="font-GilroyBold text-base text-main_bg bg-rounded_bg px-2 py-1 rounded-md"
            onClick={() => setError("")}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentPart;
