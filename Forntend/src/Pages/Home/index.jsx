import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import MiddelPart from "../../components/HomePart/MiddelPart";
import ViewPost from "../../components/HomePart/MiddelPart/ViewPost/ViewPost";

const Home = ({ posts }) => {
  const user = useSelector((state) => state.counter.value);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <ToastContainer />

      <div className="sm:w-[95%] xl:w-[80%] lg:mx-auto">
        <MiddelPart posts={posts} />
        {posts?.map((item, i) => (
          <ViewPost key={i} post={item} />
        ))}
      </div>
    </>
  );
};

export default Home;
