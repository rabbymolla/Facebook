import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useListImagesMutation,
} from "../../features/api/authApi";
import Hedder from "../../components/HomePart/MiddelPart/Hedder";
import { Helmet } from "react-helmet-async";
import CoverPhoto from "../../components/CoverProfile/Cover/CoverPhoto";
import ProfilePictuarInfo from "../../components/CoverProfile/ProfilePictuarInfo";
import ProfileMenu from "../../components/CoverProfile/ProfileMenu";
import ProfileLeft from "../../components/CoverProfile/ProfileLeft";
import ProfileRight from "../../components/CoverProfile/ProfileRight";
import { useMediaQuery } from "react-responsive";

const Profile = ({ posts }) => {
  const user = useSelector((state) => state.counter.value);
  const { userName } = useParams();
  const naviget = useNavigate();
  const profileTop = useRef(null);
  const profileLeftRef = useRef(null);
  const [height, setHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();

  const username = userName === undefined ? user.userName : userName;
  const { data: profile } = useGetUserProfileQuery(username);
  const [listImage, { data: imgData, error: imgErr, isLoading: imgLoding }] =
    useListImagesMutation();

  const path = `${username.replace(/\s+/g, "_")}/*`;
  const sort = "desc";
  const max = 30;

  useEffect(() => {
    if (profile && profile.ok === false) {
      naviget("/profile");
    } else {
      listImage({ path, sort, max });
    }
  }, [profile]);

  const visitor = username !== user.userName ? true : false;
  //console.log(imgLoding);
  // scroll sticki part
  useEffect(() => {
    setHeight(profileTop.current.clientHeight);
    setLeftHeight(profileLeftRef.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", getScroll, { passive: true });
    };
  }, [scrollHeight]);
  const getScroll = () => {
    setScrollHeight(window.scrollY);
  };

  const check = useMediaQuery({
    query: "(min-width: 992px)",
  });
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="shadow-md w-full py-4 fixed top-0 left-0 z-10 bg-main_bg">
        <Hedder />
      </div>
      <div className="container">
        <>
          <div
            ref={profileTop}
            className="border-b border-page_bg pb-20 sm:pb-5 md:pb-12 lg:pb-6 mb-5"
          >
            <div className=" relative">
              <CoverPhoto
                listImage={imgData?.resources}
                error={imgErr}
                isLoading={imgLoding}
                coverImg={profile?.coverPhoto}
                visitor={visitor}
              />
              <div className="absolute -bottom-14 md:-bottom-24 left-5">
                <ProfilePictuarInfo
                  listImage={imgData?.resources}
                  error={imgErr}
                  isLoading={imgLoding}
                  profile={profile}
                  visitor={visitor}
                  user={user}
                />
              </div>
            </div>
            <div className="hidden sm:block w-1/2 ml-auto">
              <ProfileMenu
                imgData={imgData?.resources}
                posts={profile?.posts}
              />
            </div>
          </div>

          <div
            className={`sm:grid sm:grid-cols-[2fr,3fr] sm:gap-x-4 sm:w-[95%] xl:w-[80%] sm:mx-auto ${
              check && scrollHeight > height && leftHeight > 1000
                ? "scrollFixed showless"
                : check &&
                  scrollHeight > height &&
                  leftHeight < 1000 &&
                  "scrollFixed showmore"
            }`}
          >
            <div ref={profileLeftRef} className="profileLeft hidden sm:block ">
              <ProfileLeft
                imgData={imgData}
                imgLoding={imgLoding}
                imgErr={imgErr}
                userInfo={profile?.details}
                visitor={visitor}
                user={user}
              />
            </div>

            <div className="profileRight">
              <ProfileRight profile={profile} visitor={visitor} />
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Profile;
