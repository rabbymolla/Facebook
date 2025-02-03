import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { Link } from "react-router-dom";
import OutSideClick from "../click";
import { PostBackground } from "../../../Funcation/PostBackground";
import { useSelector } from "react-redux";

const Emoji = ({
  text,
  setText,
  background,
  setBackground,
  changePart,
  inputBox,
  bgRef,
}) => {
  const [piker, setPiker] = useState(false);
  const [showBackg, setShowBackg] = useState(false);
  const [currentPosition, setCurrentPosition] = useState();
  const clickOutsideEmoji = useRef(null);
  const user = useSelector((state) => state.counter.value);

  OutSideClick(clickOutsideEmoji, () => {
    setPiker(false);
  });

  const handleEmoji = ({ emoji }, e) => {
    const ref = inputBox.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCurrentPosition(start.length + emoji.length);
  };

  useEffect(() => {
    inputBox.current.focus();
    inputBox.current.selectionEnd = currentPosition;
  }, [currentPosition]);

  const handleBackground = (e) => {
    bgRef.current.style.backgroundImage = `url(${PostBackground[e]})`;
    setBackground(PostBackground[e]);
    bgRef.current.classList.add("bgPost");
    inputBox.current.focus();
  };
  const removeBackg = () => {
    bgRef.current.style.backgroundImage = "";
    bgRef.current.classList.remove("bgPost");
    setBackground("");
    inputBox.current.focus();
  };

  return (
    <>
      <div className={`${changePart ? "mt-5 flex items-center" : "mt-5"}`}>
        <div ref={bgRef} className={`${changePart ? "w-[90%]" : "mb-5"}`}>
          <textarea
            ref={inputBox}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={100}
            placeholder={`What's on your mind, ${user.fname}..`}
            className={`${
              changePart
                ? "font-GilroyRegular py-2 outline-none lg:placeholder:text-xl placeholder:font-GilroyRegular placeholder:text-primary_bg lg:text-xl text-primary_bg resize-none w-full bg-transparent"
                : "font-GilroyRegular  bg-transparent py-2 lg:text-2xl text-primary_bg resize-none w-full outline-none lg:placeholder:text-2xl placeholder:font-GilroyRegular placeholder:text-primary_bg "
            }`}
            style={{
              paddingTop: `${
                background
                  ? Math.abs(inputBox.current.value.length * 0.1 - 18)
                  : "0"
              }%`,
            }}
          />
        </div>
        <div className="flex justify-end w-[10%]">
          {changePart && (
            <div ref={clickOutsideEmoji} className="relative group">
              <Link
                onClick={() => setPiker(!piker)}
                className="font-GilroyBold text-primary_bg"
              >
                <BsEmojiSmile size={25} />
              </Link>
              <div className="absolute -top-9 right-0 bg-primary_bg rounded-md invisible group-hover:visible transition-all ease-linear z-10 duration-100 px-3 pb-1 overflow-hidden box-border">
                <span className="font-GilroyBold text-xs text-main_bg w-full ">
                  Emoji
                </span>
              </div>
              {piker && (
                <div className="absolute top-7 right-0 z-10">
                  <EmojiPicker onEmojiClick={handleEmoji} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {!changePart && (
        <div className="mb-5 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1 sm:gap-y-0">
            <div
              onClick={() => setShowBackg(!showBackg)}
              className="w-7 h-7 bg-gradient-to-t from-primary_bg to-red_color rounded-md cursor-pointer"
            ></div>
            {showBackg && (
              <>
                <div
                  onClick={removeBackg}
                  className="w-7 h-7 bg-main_bg border border-solid border-primary_bg rounded-md cursor-pointer"
                ></div>
                {PostBackground.map((background, i) => (
                  <img
                    src={background}
                    key={i}
                    className="w-7 h-7 rounded-md cursor-pointer object-cover"
                    onClick={() => handleBackground(i)}
                  />
                ))}
              </>
            )}
          </div>
          <div ref={clickOutsideEmoji} className="relative group">
            <Link
              onClick={() => setPiker(!piker)}
              className="font-GilroyBold text-primary_bg"
            >
              <BsEmojiSmile size={25} />
            </Link>
            <div className="absolute -top-9 left-2/4 -translate-x-2/4 bg-primary_bg rounded-md invisible group-hover:visible transition-all ease-linear z-10 duration-100 px-3 pb-1 overflow-hidden box-border">
              <span className="font-GilroyBold text-xs text-main_bg w-full ">
                Emoji
              </span>
            </div>
            {piker && (
              <div className="absolute top-7 right-0 z-20">
                <EmojiPicker onEmojiClick={handleEmoji} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Emoji;
