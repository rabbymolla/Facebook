import React, { useRef, useState } from "react";
import { PostIcon } from "../../../Funcation/PostIcon";
import PostModal from "./PostModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MidPost = () => {
  const [modal, setModal] = useState(false);
  const user = useSelector((state) => state.counter.value);
  const removeFocas = useRef();

  const handleModal = () => {
    setModal(!modal);
    removeFocas.current.blur();
  };

  return (
    <>
      <div className="bg-main_bg rounded-lg shadow-md py-3 px-5 border border-solid border-page_bg mb-5">
        <div className="grid grid-col-12 items-center gap-x-2 lg:gap-x-0 mb-3">
          <Link
            to="/profile"
            className="col-start-1 col-end-2 w-12 h-12  bg-primary_bg rounded-full overflow-hidden object-cover"
          >
            <img
              src={
                user.profilePicture ||
                "../../src/assets/defaultImage/avatar.png"
              }
              alt="profile pic"
            />
          </Link>
          <div className="col-start-2 col-end-13">
            <input
              onClick={handleModal}
              ref={removeFocas}
              type="text"
              placeholder={`what's on your mind, ${user.fname}`}
              className={`font-GilroyMedium w-full bg-page_bg py-2 px-4 outline-none rounded-full hover:bg-primary_bg hover:text-main_bg hover:placeholder:text-page_bg placeholder:text-sm md:placeholder:text-lg placeholder:font-GilroyRegular placeholder:text-primary_bg`}
            />
          </div>
        </div>
        <div className="flex items-center justify-around border-t border-t-page_bg pt-2">
          {PostIcon.map((items, i) =>
            items.tittle == "Photo/Video" ? (
              <div
                key={i}
                className="flex items-center gap-x-2 hover:bg-page_bg px-2 md:px-4 py-2 rounded-md"
                onClick={() => setModal(!modal)}
              >
                <div className="text-red_color text-lg lg:text-xl">
                  <items.icon />
                </div>
                <p className="hidden md:block font-GilroyMedium text-sm text-primary_bg">
                  {items.tittle}
                </p>
              </div>
            ) : (
              <div
                key={i}
                className="flex items-center gap-x-2 hover:bg-page_bg px-2 md:px-4 py-2 rounded-md"
              >
                <div className="text-red_color text-lg lg:text-xl">
                  <items.icon />
                </div>
                <p className="hidden md:block font-GilroyMedium text-sm text-primary_bg">
                  {items.tittle}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {modal && (
        <div>
          <PostModal setModal={setModal} modal={modal} />
        </div>
      )}
    </>
  );
};

export default MidPost;
