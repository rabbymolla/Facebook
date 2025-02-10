import React from "react";
import InfoOptions from "./InfoOptions";

const UserDeatils = ({ userInfo, user, visitor }) => {
  return (
    <>
      <h1 className="font-GilroyBold text-lg text-primary_bg">About me</h1>

      <div>
        <InfoOptions userInfo={userInfo} user={user} visitor={visitor} />
      </div>
    </>
  );
};

export default UserDeatils;
