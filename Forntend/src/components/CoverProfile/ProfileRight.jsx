import React, { useState } from "react";
import MiddelPart from "../HomePart/MiddelPart";
import ProfileViewPost from "./ProfileViewPost";
import ViewPost from "../HomePart/MiddelPart/ViewPost/ViewPost";
import GridView from "./GridView";

const ProfileRight = ({ profile, visitor }) => {
  const [grid, setGrid] = useState("List");

  return (
    <>
      {visitor ? (
        ""
      ) : (
        <div>
          <MiddelPart />
        </div>
      )}

      <div>
        <ProfileViewPost setGrid={setGrid} grid={grid} />
      </div>

      {profile?.posts && profile?.posts.length ? (
        <div className="mt-5 ">
          {grid === "List" ? (
            profile.posts?.map((item, i) => <ViewPost key={i} post={item} />)
          ) : (
            <div className="flex items-center justify-between flex-wrap gap-y-3 py-3">
              {profile.posts?.map((item, i) => (
                <GridView key={i} post={item} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="shadow-md w-full mt-5 text-center rounded-md bg-main_bg">
          <p className="font-GilroyMedium text-xs md:text-xl text-primary_bg">
            No posts availabel.
          </p>
        </div>
      )}
    </>
  );
};

export default ProfileRight;
