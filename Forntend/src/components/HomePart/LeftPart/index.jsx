import React from "react";
import LeftProfile from "./LeftProfile";
import LeftHome from "./LeftHome";
import { LeftData } from "./LeftData";

const LeftPart = () => {
  return (
    <>
      <div>
        <LeftProfile />
      </div>
      <div className="mx-auto">
        {LeftData.map((item, i) => (
          <LeftHome key={i} item={item} />
        ))}
      </div>
    </>
  );
};

export default LeftPart;
