import React from "react";

const ManuIcon = ({ icon, tittle }) => {
  const Icon = icon;
  return (
    <>
      <div className="flex items-center gap-x-2 cursor-pointer hover:border-b hover:border-b-primary_bg hover:border-solid ease-out duration-100 py-2">
        <Icon className="text-primary_bg text-xl" />
        <p className="font-GilroyMedium text-base text-primary_bg">{tittle}</p>
      </div>
    </>
  );
};

export default ManuIcon;
