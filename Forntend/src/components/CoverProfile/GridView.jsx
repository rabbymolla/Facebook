import { formatDistance } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

const GridView = ({ post }) => {
  return (
    <>
      {post.images !== null && (
        <div className="shadow-lg rounded-md w-[49%] border border-page_bg bg-main_bg h-full">
          <div className="flex items-center gap-x-2 p-2">
            <div className="w-9 h-9 bg-primary_bg rounded-full overflow-hidden object-cover">
              <Link to={`/profile/${post.user.userName}`}>
                <img
                  src={
                    post.user.profilePicture ||
                    "../../src/assets/defaultImage/avatar.png"
                  }
                  alt="profile pic"
                />
              </Link>
            </div>
            <div>
              <Link
                to={`/profile/${post.user.userName}`}
                className="font-GilroyMedium text-base text-primary_bg capitalize"
              >
                {post.user.fname + " " + post.user.lname}
              </Link>
              <p className="font-GilroyRegular text-page_bg text-xs">
                {formatDistance(post.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          {post.images && post.images.length && (
            <div
              className={`relative ${
                post.images.length === 1
                  ? "overflow-hidden w-full h-[200px] lg:h-[300px] grid grid-cols-1"
                  : post.images.length === 2
                  ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-[200px] lg:h-[300px]"
                  : post.images.length === 3
                  ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-[200px] lg:h-[300px]"
                  : post.images.length === 4
                  ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-[200px] lg:h-[300px]"
                  : post.images.length >= 5
                  ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-[200px] lg:h-[300px]"
                  : "overflow-hidden"
              }`}
            >
              {post.images.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  className={`object-cover w-full h-full ${
                    post.images.length === 3
                      ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3"
                      : post.images.length === 4 &&
                        "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3 w-[100px]"
                  }`}
                  alt="images"
                />
              ))}
              {post.images.length >= 5 && (
                <div className="flex items-center justify-center absolute bottom-[100px] right-[100px] h-12 w-12 rounded-full bg-primary_bg">
                  <span className="font-GilroyBold text-main_bg text-2xl ">
                    +{post.images.length - 4}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GridView;
