import React from "react";

const ProfileMenu = ({ posts, imgData }) => {
  return (
    <div>
      <div className="py-2 lg:py-5 flex gap-x-3 md:gap-x-5 justify-end">
        <div className="text-center">
          <p className="font-GilroyRegular text-xs md:text-base text-primary_bg">
            Friends
          </p>
          <span className="font-GilroyRegular text-xs md:text-base text-primary_bg">
            10k
          </span>
        </div>
        <div className="text-center">
          <p className="font-GilroyRegular text-xs md:text-base text-primary_bg">
            Post
          </p>
          <span className="font-GilroyRegular text-xs md:text-base text-primary_bg">
            {posts?.length ? posts?.length.toString().padStart(2, 0) : 0}
          </span>
        </div>
        <div className="text-center">
          <p className="font-GilroyRegular text-xs md:text-base text-primary_bg">
            Followers
          </p>
          <span className="font-GilroyRegular text-xs md:text-base text-primary_bg">
            10k
          </span>
        </div>
        <div className="text-center">
          <p className="font-GilroyRegular text-xs md:text-base text-primary_bg">
            Photos
          </p>
          <span className="font-GilroyRegular text-xs md:text-base text-primary_bg">
            {imgData?.length ? imgData?.length.toString().padStart(2, 0) : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
