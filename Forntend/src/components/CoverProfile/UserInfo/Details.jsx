import React, { useState } from "react";
import { PlusCircle } from "../../../assets/svg/PlusCircle";
import BioEdit from "./BioEdit";
import { EditPost } from "../../../assets/svg/EditPost";

const Details = ({
  text,
  placeholder,
  value,
  icon,
  handleChange,
  infos,
  handleInfos,
  loading,
  name,
  rel,
}) => {
  const [show, setShow] = useState(false);
  const Icon = () => {
    return icon;
  };
  return (
    <>
      {value ? (
        <div
          onClick={() => setShow(true)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-x-1">
            <div className="text-rounded_bg">
              <Icon />
            </div>
            <div>
              <span className="font-GilroyMedium text-sm text-primary_bg">
                {value}
              </span>
            </div>
          </div>
          <div className="text-primary_bg hover:text-rounded_bg duration-100 ease-in-out ">
            <EditPost />
          </div>
        </div>
      ) : (
        <div
          onClick={() => setShow(true)}
          className="flex items-center gap-x-1 cursor-pointer"
        >
          <div className="text-primary_bg text-sm">
            <PlusCircle />
          </div>
          <div>
            <span className="font-GilroyMedium text-sm text-primary_bg">
              Add {text}
            </span>
          </div>
        </div>
      )}

      {/* modal part */}

      {show && (
        <BioEdit
          handleChange={handleChange}
          infos={infos}
          handleInfos={handleInfos}
          loading={loading}
          placeholder={placeholder}
          setOpen={setShow}
          name={name}
          detail
          rel={rel}
        />
      )}
    </>
  );
};

export default Details;
