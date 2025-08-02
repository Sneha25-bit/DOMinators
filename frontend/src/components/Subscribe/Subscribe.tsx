import React from "react";
import Banner from "../../assets/website/orange-pattern.jpg";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Subscribe = () => {
  return (
    <div
      data-aos="zoom-in"
      className="mb-20 bg-gray-100 dark:bg-gray-800 text-white "
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold">
           𝐆𝐞𝐭 𝐍𝐨𝐭𝐢𝐟𝐢𝐞𝐝 𝐀𝐛𝐨𝐮𝐭 𝐍𝐞𝐰𝐬 𝐚𝐧𝐝 𝐅𝐚𝐜𝐭𝐬 𝐮𝐩𝐝𝐚𝐭𝐞𝐬
          </h1>
          <input
            data-aos="fade-up"
            type="text"
            placeholder="Enter your email"
            className="w-full p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;