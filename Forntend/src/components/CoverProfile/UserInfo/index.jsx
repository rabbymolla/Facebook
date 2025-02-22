import React, { Suspense } from "react";
import InfoOptions from "./InfoOptions";
import Skeleton from "react-loading-skeleton";

const UserDeatils = ({ userInfo, user, visitor, setOthername }) => {
  return (
    <>
      <h1 className="font-GilroyBold text-lg text-primary_bg">About me</h1>

      <Suspense fallback={<Skeleton count={10} />}>
        <InfoOptions
          setOthername={setOthername}
          userInfo={userInfo}
          user={user}
          visitor={visitor}
        />
      </Suspense>
    </>
  );
};

export default UserDeatils;
