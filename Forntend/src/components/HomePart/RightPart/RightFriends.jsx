import React from "react";
import { Link } from "react-router-dom";
import { ReduceText } from "../../Funcation/ReduxText";

const RightFriends = () => {
  const Name = "Lorem";
  const reducerText = ReduceText(Name, 18);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h6 className="font-GilroyMedium text-lg text-primary_bg">
          Friends Request
        </h6>
        <Link
          to="/friends"
          className="font-GilroyRegular text-base text-rounded_bg hover:underline"
        >
          See all
        </Link>
      </div>
      <div className="mt-5 p-3  box-border hover:bg-page_bg rounded-lg w-full">
        <div className="flex items-start gap-x-3">
          <div className="bg-rounded_bg p-2 md:p-3 rounded-full">img</div>
          <div>
            <p className="font-GilroyBold text-base text-primary_bg capitalize">
              {reducerText}
            </p>
            <span className="font-GilroyRegular text-base text-primary_bg mt-2">
              time
            </span>
            <div className="flex items-center gap-x-2 mt-3">
              <button className="font-GilroyBold text-main_bg text-sm px-3 py-1 bg-rounded_bg rounded-md">
                Confirm
              </button>
              <button className="font-GilroyBold px-3 py-1 bg-rounded_bg rounded-md text-main_bg text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightFriends;
