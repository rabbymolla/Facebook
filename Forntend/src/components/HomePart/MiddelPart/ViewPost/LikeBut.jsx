import React from "react";
import { reactEmoji } from "./reactEmoji";

const LikeBut = ({ setVisible }) => {
  return (
    <div
      className="flex items-center gap-x-2"
      onMouseOver={() => {
        setTimeout(() => {
          setVisible(true);
        }, 500);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setVisible(false);
        }, 500);
      }}
    >
      {reactEmoji.map((items, i) => (
        <img
          key={i}
          src={items.image}
          alt="reats"
          className="w-8 h-8 md:w-11 md:h-11 cursor-pointer scale-[1.4] hover:scale-[1.8] duration-75 ease-linear"
        />
      ))}
    </div>
  );
};

export default LikeBut;
