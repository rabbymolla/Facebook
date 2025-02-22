import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance, set } from "date-fns";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { PiShareFatLight } from "react-icons/pi";
import LikeBut from "./LikeBut";
import { useSelector } from "react-redux";
import CommentPart from "./CommentPart";
import PostManu from "./PostManu";
import avater from "../../../../assets/defaultImage/avatar.png";
import coverimg from "../../../../assets/defaultImage/defaultcover.jpg";

const ViewPost = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const [manuVisible, setManuVisible] = useState(false);
  const user = useSelector((state) => state.counter.value);
  const [text, setText] = useState("");
  const [commentImg, setCommentImg] = useState("");
  const [error, setError] = useState("");
  const textRef = useRef(null);

  return (
    <div className="bg-main_bg rounded-lg shadow-md py-3 border border-solid border-page_bg mb-5">
      <div className="flex items-center justify-between mb-3 px-5">
        <div className="flex items-center gap-x-2">
          <div className="w-12 h-12  bg-primary_bg rounded-full overflow-hidden object-cover">
            <Link to={`/profile/${post.user.userName}`}>
              <img src={post.user.profilePicture || avater} alt="profile pic" />
            </Link>
          </div>
          <div>
            <div className="flex items-center gap-x-1">
              <Link
                to={`/profile/${post.user.userName}`}
                className="font-GilroyMedium text-lg text-primary_bg capitalize"
              >
                {post.user.fname + " " + post.user.lname || "Your Name"}
              </Link>
              {post.type === "coverPhoto" && (
                <span className="font-GilroyMedium text-xs md:text-base text-page_bg">
                  updated {post.user.gender === "male" ? "his" : "her"} Profile
                </span>
              )}
              {post.type === "profilePicture" && (
                <span className="font-GilroyMedium text-xs md:text-base text-page_bg">
                  updated {post.user.gender === "male" ? "his" : "her"} Profile
                </span>
              )}
            </div>
            <p className="font-GilroyRegular text-page_bg text-xs">
              {formatDistance(post.createdAt, new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="relative">
          <div
            onClick={() => setManuVisible(true)}
            className={
              !manuVisible
                ? "hover:bg-page_bg p-3 rounded-full ease-linear duration-100 cursor-pointer"
                : "bg-page_bg rounded-full p-3"
            }
          >
            <BsThreeDots className="text-primary_bg tex-xl font-GilroyBlack" />
          </div>
          {manuVisible && (
            <PostManu
              setManuVisible={setManuVisible}
              post={post}
              user={user}
              postImages={post?.images}
            />
          )}
        </div>
      </div>

      <div>
        {post.background ? (
          <div
            className="h-[380px] flex items-center justify-center"
            style={{
              backgroundImage: `url(${post.background})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h4 className="font-GilroyMedium text-xl text-main_bg text-center px-3">
              {post.text}
            </h4>
          </div>
        ) : (
          <>
            <div className="px-5">
              <h4 className="font-GilroyMedium text-base text-primary_bg mb-2">
                {post.text}
              </h4>
            </div>
            {post.images && post.images.length && (
              <>
                <div
                  className={`relative ${
                    post.images.length === 1
                      ? "overflow-hidden w-full h-full grid grid-cols-1"
                      : post.images.length === 2
                      ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-full"
                      : post.images.length === 3
                      ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-full"
                      : post.images.length === 4
                      ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-full"
                      : post.images.length >= 5
                      ? "overflow-hidden grid grid-cols-2 gap-2 w-full h-full"
                      : "overflow-hidden"
                  }`}
                >
                  {post.type === "profilePicture" ? (
                    <>
                      <div className="w-full h-40 lg:h-52">
                        <img
                          className="w-full h-full object-cover"
                          src={post.user.coverPhoto || coverimg}
                          alt="profile Cover"
                        />
                      </div>
                      <div className="-mt-8 lg:-mt-16">
                        <div
                          style={{
                            backgroundImage: `url(${
                              post.user.profilePicture || avater
                            })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                          className="w-20 h-20 md:w-32 md:h-32 rounded-full mx-auto overflow-hidden"
                        ></div>
                      </div>
                    </>
                  ) : (
                    post.images
                      .slice(0, 4)
                      .map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          className={`object-cover w-full h-full ${
                            post.images.length === 3
                              ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3"
                              : post.images.length === 4 &&
                                "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3 w-[100px]"
                          }`}
                          alt="images"
                        />
                      ))
                  )}
                  {post.images.length >= 5 && (
                    <div className="flex items-center justify-center absolute bottom-[50px] md:bottom-[100px] right-[50px] md:right-[100px] h-9 w-9 md:h-12 md:w-12 rounded-full bg-primary_bg">
                      <span className="font-GilroyBold text-main_bg text-sm lg:text-2xl ">
                        +{post.images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="px-5">
        <div className="flex items-center justify-between my-3">
          <div>like</div>
          <div>comment</div>
        </div>

        <div className="flex items-center justify-around border-y border-page_bg border-solid py-1 gap-x-1 relative">
          <div className="w-1/3 ">
            {visible && (
              <div className="bg-page_bg shadow-md rounded-full px-1 absolute bottom-11 left-0 z-10">
                <LikeBut setVisible={setVisible} />
              </div>
            )}
            <div
              onMouseOver={() => {
                setTimeout(() => {
                  setVisible(true);
                }, 500);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setVisible(false);
                }, 500);
              }}
              className="hover:bg-page_bg  py-1 ease-linear duration-100 rounded-sm flex items-center justify-center gap-x-1 cursor-pointer"
            >
              <AiOutlineLike className="text-primary_bg text-base md:text-xl" />
              <span className="font-GilroyBold text-primary_bg text-xs md:text-base">
                Like
              </span>
            </div>
          </div>
          <div
            className="hover:bg-page_bg w-1/3 py-1 ease-linear duration-100 rounded-sm flex items-center justify-center gap-x-1"
            onClick={() => textRef.current.focus()}
          >
            <FaRegCommentDots className="text-primary_bg text-base md:text-base" />
            <span className="font-GilroyBold text-primary_bg text-xs md:text-base">
              Comment
            </span>
          </div>
          <div className="hover:bg-page_bg w-1/3 py-1 ease-linear duration-100 rounded-sm flex items-center justify-center gap-x-1">
            <PiShareFatLight className="text-primary_bg text-base md:text-xl" />
            <span className="font-GilroyBold text-primary_bg text-xs md:text-base">
              Share
            </span>
          </div>
        </div>
        <div className="mt-5">
          <CommentPart
            user={user}
            text={text}
            setText={setText}
            commentImg={commentImg}
            setCommentImg={setCommentImg}
            setError={setError}
            error={error}
            textRef={textRef}
            post={post}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
