import { RiNewsFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { PiVideoBold } from "react-icons/pi";
import { IoIosSettings } from "react-icons/io";
import { FaFacebookMessenger } from "react-icons/fa";

export const LeftData = [
  {
    icon: RiNewsFill,
    tittle: "Feeds",
    to: "/",
  },
  {
    icon: FaFacebookMessenger,
    tittle: "Massenger",
    to: "/massage",
  },
  {
    icon: FaUserFriends,
    tittle: "Friends",
    to: "/friend",
  },
  {
    icon: PiVideoBold,
    tittle: "Media",
    to: "/media",
  },
  {
    icon: IoIosSettings,
    tittle: "Setting",
  },
];
