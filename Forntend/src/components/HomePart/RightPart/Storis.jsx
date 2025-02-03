import React from "react";
import { Link } from "react-router-dom";
import { StoryData } from "./StoryData";
import { Swiper, SwiperSlide } from "swiper/react";

const Storis = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h6 className="font-GilroyMedium text-lg text-primary_bg">Stories</h6>
        <Link
          to="/friends"
          className="font-GilroyRegular text-base text-rounded_bg hover:underline"
        >
          See all
        </Link>
      </div>
      <div className="w-full mt-5">
        <Swiper spaceBetween={10} slidesPerView={3} className="h-[200px]">
          {StoryData.map((items, i) => (
            <SwiperSlide
              key={i}
              style={{
                background: `url(${items.bgPic})`,
              }}
              className="bg-cover bg-no-repeat bg-center object-cover cursor-pointer rounded-md h-[200px]"
            >
              <div className="w-9 h-9 rounded-full object-cover overflow-hidden mt-1 ml-1 border border-solid border-primary_bg">
                <img src={items.profilePic} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Storis;
