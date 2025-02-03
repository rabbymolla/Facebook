import React from "react";
import RightFriends from "./RightFriends";
import Storis from "./Storis";

const RightPart = () => {
  return (
    <>
      <div>
        <RightFriends />
      </div>
      <div className="mt-7">
        <Storis />
      </div>
    </>
  );
};

export default RightPart;
