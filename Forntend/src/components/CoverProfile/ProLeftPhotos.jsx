import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

const ProLeftPhotos = ({ imgData, imgLoding, imgErr }) => {
  const [showMore, setShowMore] = useState(false);
  //console.log(imgData);
  const imgCount = () => {
    const total_count = imgData?.total_count || 0;
    return total_count === 0
      ? "No Photos"
      : total_count === 1
      ? "1 Photo"
      : `${total_count} Photos`;
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="font-GilroyBold text-xl text-primary_bg">Photos</h1>
          <span className="font-GilroyRegular text-sm text-primary_bg ">
            {imgCount()}
          </span>
        </div>
        <div>
          {imgData?.resources.length > 4 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="font-GilroyRegular text-base text-rounded_bg hover:underline"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>

      {imgLoding ? (
        <Skeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          {imgData?.resources &&
            imgData?.resources.length &&
            imgData?.resources
              .slice(0, showMore ? imgData?.resources.length : 4)
              .map((img) => (
                <img
                  key={img.public_id}
                  src={img.secure_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ))}
        </div>
      )}
    </>
  );
};

export default ProLeftPhotos;
