import React from "react";
import { LeftData } from "../HomePart/LeftPart/LeftData";
import { Link, NavLink, useLocation } from "react-router-dom";

const ResManu = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex items-center justify-around">
      {LeftData.slice(0, 4).map((items, i) => (
        <div key={i} className="relative group">
          <Link
            to={items.to}
            className={`text-lg cursor-pointer text-primary_bg p-2 hover:bg-page_bg rounded-full transition-all ease-linear duration-100 block ${
              path === items.to ? "bg-page_bg" : ""
            }`}
          >
            <items.icon />
          </Link>
          <div className="absolute top-[55px] left-2/4 -translate-x-2/4 bg-page_bg rounded-md invisible group-hover:visible transition-all ease-linear z-10 duration-100 block">
            <p className="font-GilroyMedium text-sm text-primary_bg py-1  px-2">
              {items.tittle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResManu;
