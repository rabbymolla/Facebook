import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const SearchBox = ({ setShowOne }) => {
  const [show, setShow] = useState(true);
  const inputBox = useRef(null);

  useEffect(() => {
    inputBox.current.focus();
  }, []);
  return (
    <div className="shadow-lg bg-main_bg  h-[170vh] w-full px-4 box-border pt-4">
      <div className="flex items-center gap-x-2">
        <div
          onClick={() => setShowOne(false)}
          className="cursor-pointer text-primary_bg text-lg"
        >
          <IoArrowBack />
        </div>
        <div
          onClick={() => inputBox.current.focus()}
          className="flex items-center gap-x-2 border border-primary_bg border-solid py-1 px-5 rounded-full"
        >
          {show && <IoIosSearch size={20} className="text-primary_bg" />}

          <input
            ref={inputBox}
            onFocus={() => setShow(false)}
            onBlur={() => setShow(true)}
            type="text"
            placeholder="Search"
            className="font-GilroyRegular  outline-none focus:px-3.5 w-full bg-transparent placeholder:text-primary_bg text-primary_bg"
          />
        </div>
      </div>
      <div className="py-2 px-5">
        <p>Recent</p>
      </div>
    </div>
  );
};

export default SearchBox;
