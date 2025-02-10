import React from "react";
import ProLeftPhotos from "./ProLeftPhotos";
import UserDeatils from "./UserInfo";

const ProfileLeft = ({
  imgData,
  imgErr,
  imgLoding,
  userInfo,
  visitor,
  user,
}) => {
  return (
    <>
      <div className="w-full bg-main_bg rounded-md shadow-md p-3 border border-solid border-page_bg mb-5">
        <UserDeatils userInfo={userInfo} user={user} visitor={visitor} />
      </div>
      <div className="w-full bg-main_bg rounded-md shadow-md p-3 border border-solid border-page_bg">
        <ProLeftPhotos
          imgData={imgData}
          imgLoding={imgLoding}
          imgErr={imgErr}
        />
      </div>
    </>
  );
};

export default ProfileLeft;
