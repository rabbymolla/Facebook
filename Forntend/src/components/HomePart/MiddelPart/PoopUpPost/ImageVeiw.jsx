import React from "react";
import Emoji from "./Emoji";
import MultiUpload from "./MultiUpload";

const ImageVeiw = ({ setImage, image, setShow, toast }) => {
  return (
    <>
      <div>
        <MultiUpload
          setImage={setImage}
          image={image}
          setShow={setShow}
          toast={toast}
        />
      </div>
    </>
  );
};

export default ImageVeiw;
