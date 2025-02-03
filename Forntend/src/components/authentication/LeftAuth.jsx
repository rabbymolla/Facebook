import React from "react";

const LeftAuth = ({ icon, hadding, pargrap }) => {
  return (
    <div>
      <div>{icon}</div>
      <h1 className="font-GilroyBold md:text-xl lg:text-3xl xl:text-4xl text-rounded_bg mt-5">
        {hadding}
      </h1>
      <p className="font-GilroyRegular text-primary_bg text-sm leading-6 mt-2">
        {pargrap}
      </p>
    </div>
  );
};

export default LeftAuth;
