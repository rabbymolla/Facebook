import React from "react";
import ProLeftPhotos from "./ProLeftPhotos";

const ProfileLeft = ({ imgData }) => {
  return (
    <div className="w-full bg-main_bg rounded-md shadow-md p-3 border border-solid border-page_bg">
      <ProLeftPhotos imgData={imgData} />
    </div>
  );
};

export default ProfileLeft;
