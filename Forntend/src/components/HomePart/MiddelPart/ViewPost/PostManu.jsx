import React, { useRef, useState } from "react";
import OutSideClick from "../click";
import ManuIcon from "./ManuIcon";
import { BsPinAngle } from "react-icons/bs";
import { VscSave } from "react-icons/vsc";
import { TiEdit } from "react-icons/ti";
import { IoMdDownload } from "react-icons/io";
import { BiFullscreen } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";

const PostManu = ({ setManuVisible, post, user, postImages }) => {
  const postManuRef = useRef(null);
  const [test, setTest] = useState(post.user._id === user.id ? true : false);

  console.log(postImages);

  OutSideClick(postManuRef, () => {
    setManuVisible(false);
  });

  return (
    <div ref={postManuRef}>
      <div className="absolute top-11 right-0 shadow-xl bg-page_bg z-10 w-48 rounded-md py-2 px-4">
        <ManuIcon icon={VscSave} tittle="Save Post" />
        {postImages && postImages.length && (
          <ManuIcon icon={IoMdDownload} tittle="Download" />
        )}
        {test && <ManuIcon icon={BsPinAngle} tittle="Pin Post" />}
        {test && <ManuIcon icon={TiEdit} tittle="Edit Post" />}
        {postImages && postImages.length && (
          <ManuIcon icon={BiFullscreen} tittle="Full Screen" />
        )}
        {test && <ManuIcon icon={FaRegTrashCan} tittle="Trash" />}
      </div>
    </div>
  );
};

export default PostManu;
