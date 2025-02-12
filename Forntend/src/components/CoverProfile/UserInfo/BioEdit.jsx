import React, { useRef } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import OutSideClick from "../../HomePart/MiddelPart/click";

const BioEdit = ({
  infos,
  handleInfos,
  setShow,
  show,
  handleChange,
  name,
  max,
  loading,
  placeholder,
  detail,
  setOpen,
  rel,
}) => {
  const clickOutside = useRef(null);

  OutSideClick(clickOutside, () => {
    if (!detail) {
      setShow(false);
    } else setOpen(false);
  });
  return (
    <div ref={clickOutside} className="mt-3">
      {rel ? (
        <select
          className="w-full p-3 outline-none font-GilroyRegular text-base text-primary_bg cursor-pointer bg-page_bg"
          name={name}
          onChange={handleChange}
          value={infos?.relationShip}
        >
          <option>Select relationship status</option>
          <option value="Single">Single</option>
          <option value="In a Relationship">In a Relationship</option>
          <option value="Married">Married</option>
          <option value="Devorced">Devorced</option>
          <option value="Its Complicated">Its Complicated</option>
        </select>
      ) : (
        <textarea
          onChange={handleChange}
          value={infos?.[name]}
          maxLength={100}
          name={name}
          placeholder={placeholder}
          className="font-GilroyMedium text-base text-primary_bg w-full h-28 bg-page_bg outline-none rounded-md p-2 resize-none placeholder:text-primary_bg placeholder:font-GilroyRegular"
        />
      )}
      {!detail && (
        <span className="font-GilroyRegular text-red_color w-full text-right block mt-1">
          {`${max} crechter remainig`}
        </span>
      )}
      <div className="mt-1 flex items-center justify-end gap-x-2">
        <button
          onClick={() => (!detail ? setShow(false) : setOpen(false))}
          className="font-GilroyBold text-base text-main_bg bg-primary_bg px-2 md:px-4 py-1 rounded-b-md"
        >
          Cancel
        </button>
        <button
          onClick={() => handleInfos()}
          disabled={loading}
          className="font-GilroyBold text-base text-main_bg bg-rounded_bg px-2 md:px-4 py-1 rounded-b-md"
        >
          {loading ? <BeatLoader color="#fff" size={9.2} /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default BioEdit;
