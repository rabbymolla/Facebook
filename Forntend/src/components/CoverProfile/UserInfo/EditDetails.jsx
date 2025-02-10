import React, { useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import OutSideClick from "../../HomePart/MiddelPart/click";
import Details from "./Details";
import { Job } from "../../../assets/svg/Job";
import { Location } from "../../../assets/svg/Location";
import { HomeIcon } from "../../../assets/svg/Home";
import { Learning } from "../../../assets/svg/Learning";
import { Love } from "../../../assets/svg/Love";
import { Instagram } from "../../../assets/svg/Instagram";
import { CircleProfileIcon } from "../../../assets/svg/Circleprofile";

const EditDetails = ({
  modal,
  setModal,
  detail,
  handleChange,
  infos,
  handleInfos,
  loading,
}) => {
  const clickOutside = useRef(null);

  //modal open part
  OutSideClick(clickOutside, () => {
    setModal(false);
  });
  useEffect(() => {
    const scroll = document.body;
    if (modal) {
      scroll.classList.add("no-scroll");
    } else {
      scroll.classList.remove("no-scroll");
    }
    return () => {
      scroll.classList.remove("no-scroll");
    };
  }, [modal]);
  return (
    <>
      <div
        ref={clickOutside}
        className="bg-main_bg rounded-md shadow-xl w-11/12 sm:w-[500px] relative "
      >
        <div className="border-b p-4 border-b-primary_bg border-solid">
          <div className="text-center ">
            <h1 className="font-GilroyBold text-xs sm:text-lg text-primary_bg">
              Edit details
            </h1>
          </div>
          <div
            onClick={() => setModal(!modal)}
            className="absolute top-4 right-4 p-1 bg-page_bg text-sm sm:text-xl text-primary_bg rounded-full cursor-pointer"
          >
            <IoCloseSharp />
          </div>
        </div>

        <div className="p-5 h-[500px] overflow-y-auto">
          <div>
            <p className="font-GilroyBold text-primary_bg text-sm mb-2">
              Other Name
            </p>

            <Details
              value={detail?.aotherName}
              text="Other Name"
              placeholder="Add other name..."
              icon={<CircleProfileIcon />}
              handleChange={handleChange}
              infos={infos}
              handleInfos={handleInfos}
              loading={loading}
              name="aotherName"
            />
          </div>
          <div className="mt-3">
            <p className="font-GilroyBold text-primary_bg text-sm mb-2">
              Job & Workplace
            </p>

            <Details
              value={detail?.job}
              text="Job"
              placeholder="Add about your job..."
              icon={<Job />}
              handleChange={handleChange}
              infos={infos}
              handleInfos={handleInfos}
              loading={loading}
              name="job"
            />
            <div className="mt-3">
              <Details
                value={detail?.workPlace}
                text="Work Place"
                placeholder="Add about your work Place..."
                icon={<Job />}
                handleChange={handleChange}
                infos={infos}
                handleInfos={handleInfos}
                loading={loading}
                name="workPlace"
              />
            </div>
          </div>
          <div className="mt-3">
            <p className="font-GilroyBold text-primary_bg text-sm mb-2">
              Current City
            </p>

            <Details
              value={detail?.currentCity}
              text="Current City"
              placeholder="Add about your current city..."
              icon={<Location />}
              handleChange={handleChange}
              infos={infos}
              handleInfos={handleInfos}
              loading={loading}
              name="currentCity"
            />
          </div>
          <div className="mt-3">
            <p className="font-GilroyBold text-primary_bg text-sm mb-2">
              Home Town
            </p>

            <Details
              value={detail?.homeTown}
              text="Home town"
              placeholder="Add about your home town..."
              icon={<HomeIcon />}
              handleChange={handleChange}
              infos={infos}
              handleInfos={handleInfos}
              loading={loading}
              name="homeTown"
            />
          </div>
          <div className="mt-3">
            <p className="font-GilroyBold text-primary_bg text-sm mb-2">
              Education
            </p>

            <Details
              value={detail?.school}
              text="School"
              placeholder="Add about your School..."
              icon={<Learning />}
              handleChange={handleChange}
              infos={infos}
              handleInfos={handleInfos}
              loading={loading}
              name="school"
            />
            <div className="mt-3">
              <Details
                value={detail?.highSchool}
                text="High school"
                placeholder="Add about your High school..."
                icon={<Learning />}
                handleChange={handleChange}
                infos={infos}
                handleInfos={handleInfos}
                loading={loading}
                name="highSchool"
              />
            </div>
          </div>
          <div className="mt-3">
            <p className="font-GilroyBold text-primary_bg text-sm mb-2">
              Instagram
            </p>

            <Details
              value={detail?.instagram}
              text="Instagram"
              placeholder="Add your instagram account link..."
              icon={<Instagram />}
              handleChange={handleChange}
              infos={infos}
              handleInfos={handleInfos}
              loading={loading}
              name="instagram"
            />
          </div>
          <div className="mt-3">
            <p className="font-GilroyBold text-primary_bg text-sm mb-2">
              Relationship Status
            </p>

            <Details
              value={detail?.relationShip}
              text="Relationship"
              placeholder="Add about your relationship..."
              icon={<Love />}
              handleChange={handleChange}
              infos={infos}
              handleInfos={handleInfos}
              loading={loading}
              name="relationShip"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDetails;
