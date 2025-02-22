import React, { useEffect, useState } from "react";
import { Job } from "../../../assets/svg/Job";
import { Location } from "../../../assets/svg/Location";
import { HomeIcon } from "../../../assets/svg/Home";
import { Learning } from "../../../assets/svg/Learning";
import { Love } from "../../../assets/svg/Love";
import { Instagram } from "../../../assets/svg/Instagram";
import BioEdit from "./BioEdit";
import { useDetailsMutation } from "../../../features/api/authApi";
import EditDetails from "./EditDetails";
import { useDispatch } from "react-redux";

const InfoOptions = ({ userInfo, visitor, user, setOthername }) => {
  const [detail, setDetail] = useState(userInfo);
  const InitialState = {
    bio: detail?.bio ? detail.bio : "",
    aotherName: detail?.aotherName ? detail.aotherName : "",
    job: detail?.job ? detail.job : "",
    workPlace: detail?.workPlace ? detail.workPlace : "",
    currentCity: detail?.currentCity ? detail.currentCity : "",
    homeTown: detail?.homeTown ? detail.homeTown : "",
    school: detail?.school ? detail.school : "",
    highSchool: detail?.highSchool ? detail.highSchool : "",
    instagram: detail?.instagram ? detail.instagram : "",
    relationShip: detail?.relationShip ? detail.relationShip : "",
  };
  const [infos, setInfos] = useState(InitialState);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [max, setMax] = useState(100);
  const [loading, setLoading] = useState(false);
  const [Details, { error, isLoading }] = useDetailsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setDetail(userInfo);
    setInfos(userInfo);
  }, [userInfo]);

  // edit bio
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };

  // submit infos
  const handleInfos = async () => {
    try {
      setLoading(true);
      const { id } = user;
      const details = await Details({ infos, id }).unwrap();
      setDetail(details);
      setOthername(details.aotherName);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, othername: details.aotherName })
      );
      dispatch(increment({ ...user, othername: details.aotherName }));
      setLoading(false);
      setShow(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {!show && (
        <div className="text-center mt-3">
          {detail?.bio && (
            <span className="font-GilroyBold text-base text-primary_bg">
              {detail?.bio}
            </span>
          )}
          {!visitor && !detail?.bio && (
            <>
              <button
                onClick={() => setShow(!show)}
                className="w-full py-1 font-GilroyBold text-base bg-page_bg text-primary_bg rounded-md"
              >
                Add Bio
              </button>
            </>
          )}
          {!visitor && detail?.bio && (
            <button
              onClick={() => setShow(!show)}
              className="w-full py-1 mt-3 font-GilroyBold text-base bg-page_bg text-primary_bg rounded-md"
            >
              Edit Bio
            </button>
          )}
        </div>
      )}

      {show && (
        <BioEdit
          handleChange={handleChange}
          infos={infos}
          show={show}
          setShow={setShow}
          name="bio"
          max={max}
          handleInfos={handleInfos}
          loading={loading}
          placeholder="Add your Bio..."
        />
      )}
      {/* info part */}
      <div className="flex items-start gap-x-1 mt-3">
        <div className="text-rounded_bg">
          <Job />
        </div>
        <div>
          {detail?.job && detail?.workPlace ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              Work as a{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.job}
              </b>{" "}
              at{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.workPlace}
              </b>
            </span>
          ) : detail?.job && !detail?.workPlace ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              Work as a{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.job}
              </b>
            </span>
          ) : !detail?.job && detail?.workPlace ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              Work as a{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.workPlace}
              </b>
            </span>
          ) : (
            <span className="font-GilroyBold text-base text-primary_bg">
              Add your work place and About Your job
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start gap-x-1 mt-3">
        <div className="text-rounded_bg">
          <Location />
        </div>
        <div>
          {detail?.currentCity ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              lives in{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.currentCity}
              </b>
            </span>
          ) : (
            <span className="font-GilroyBold text-base text-primary_bg">
              Add your city name
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start gap-x-1 mt-3">
        <div className="text-rounded_bg">
          <HomeIcon />
        </div>
        <div>
          {detail?.homeTown ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              I am from at{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.homeTown}
              </b>
            </span>
          ) : (
            <span className="font-GilroyBold text-base text-primary_bg">
              Add your place name
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start gap-x-1 mt-3">
        <div className="text-rounded_bg">
          <Learning />
        </div>
        <div>
          {detail?.school && detail?.highSchool ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              Study at junior school name is{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.school}
              </b>{" "}
              & high school name is{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.highSchool}
              </b>
            </span>
          ) : detail?.school && !detail?.highSchool ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              Work as a{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.school}
              </b>
            </span>
          ) : !detail?.school && detail?.highSchool ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              Work as a{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.highSchool}
              </b>
            </span>
          ) : (
            <span className="font-GilroyBold text-base text-primary_bg">
              Add your junior school and high school
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start gap-x-1 mt-3">
        <div className="text-rounded_bg">
          <Love />
        </div>
        <div>
          {detail?.relationShip ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              I am{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.relationShip}
              </b>
            </span>
          ) : (
            <span className="font-GilroyBold text-base text-primary_bg">
              Relationship status
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start gap-x-1 mt-3">
        <div className="text-rounded_bg">
          <Instagram />
        </div>
        <div>
          {detail?.instagram ? (
            <span className="font-GilroyRegular text-base text-primary_bg">
              Instagram Link:{" "}
              <b className="font-GilroyBold text-base text-primary_bg">
                {detail?.instagram}
              </b>
            </span>
          ) : (
            <span className="font-GilroyBold text-base text-primary_bg">
              Instagram account
            </span>
          )}
        </div>
      </div>

      {/* edit deatils */}
      <div className="text-center  mt-3">
        {!visitor &&
        !detail?.aotherName &&
        !detail?.job &&
        !detail?.workPlace &&
        !detail?.currentCity &&
        !detail?.homeTown &&
        !detail?.school &&
        !detail?.highSchool &&
        !detail?.instagram &&
        !detail?.relationShip ? (
          <button
            onClick={() => setModal(!modal)}
            className="w-full py-1 font-GilroyBold text-base bg-page_bg text-primary_bg rounded-md"
          >
            Add Details
          </button>
        ) : (
          !visitor && (
            <button
              onClick={() => setModal(!modal)}
              className="w-full py-1 font-GilroyBold text-base bg-page_bg text-primary_bg rounded-md"
            >
              Edit Details
            </button>
          )
        )}
      </div>
      {/* modal part */}
      <div
        className={`fixed top-0 left-0 flex items-center justify-center w-full h-screen  z-50 transition-all duration-300
              ${
                modal
                  ? "opacity-100 scale-100 bg-opcity_color"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
      >
        <EditDetails
          handleChange={handleChange}
          infos={infos}
          handleInfos={handleInfos}
          loading={loading}
          detail={detail}
          modal={modal}
          setModal={setModal}
        />
      </div>
    </>
  );
};

export default InfoOptions;
