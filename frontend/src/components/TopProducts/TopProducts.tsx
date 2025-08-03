import React from "react";
import Img1 from "../../assets/shirt/shirt.png";
import Img2 from "../../assets/shirt/shirt2.png";
import Img3 from "../../assets/shirt/shirt3.png";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "𝕌𝕟𝕕𝕖𝕣𝕨𝕒𝕥𝕖𝕣 𝔼𝕩𝕡𝕝𝕠𝕣𝕒𝕥𝕚𝕠𝕟",
    description:
      "Uncover the mysteries of the ocean—from vibrant coral reefs to the darkest trenches. Discover marine life, ocean facts, and hidden wonders waiting just beneath the surface.",
  },
  {
    id: 2,
    img: Img2,
    title: "𝕄𝕒𝕜𝕖 𝕟𝕖𝕨 𝕗𝕣𝕚𝕖𝕟𝕕𝕤",
    description:
      "Connect with fellow ocean lovers, share your discoveries, and ride the wave of new friendships across the globe. Dive into conversations as deep as the sea!",
  },
  {
    id: 3,
    img: Img3,
    title: "𝔻𝕠𝕟𝕒𝕥𝕚𝕠𝕟",
    description:
      "Your donation helps protect marine life, fight ocean pollution, and fuel exploration efforts. Every rupee brings us closer to a healthier, bluer planet.",
  },
];
const TopProducts = () => {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            𝐓𝐨𝐩 𝐑𝐚𝐭𝐞𝐝 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬 𝐟𝐨𝐫 𝐲𝐨𝐮
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Discover the best of our ocean-focused platform — from exciting exploration tools to community connections and meaningful impact. Dive into the features making waves!
          </p>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt=""
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
                <Link to="/login">
                <button
                  className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                >
                  𝐄𝐱𝐩𝐥𝐨𝐫𝐞
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;