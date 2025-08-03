import React from "react";
import Image1 from "../../assets/hero/women.png";
import Image2 from "../../assets/hero/shopping.png";
import Image3 from "../../assets/hero/sale.png";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "𝔼𝕩𝕡𝕝𝕠𝕣𝕖 𝕥𝕙𝕖 𝕠𝕔𝕖𝕒𝕟 𝕨𝕚𝕥𝕙 𝕛𝕦𝕤𝕥 𝕒 𝕤𝕔𝕣𝕠𝕝𝕝",
    description:
      "Dive into the mysteries of the deep blue sea—discover marine life, ecosystems, and stories from the heart of the ocean, all from your screen.",
  },
  {
    id: 2,
    img: Image2,
    title: "𝔽𝕦𝕟 𝕆𝕔𝕖𝕒𝕟 𝔾𝕒𝕞𝕖𝕤 𝕒𝕟𝕕 𝔸𝕔𝕥𝕚𝕧𝕚𝕥𝕚𝕖𝕤",
    description:
      "Learn while you play! Challenge yourself with fun, interactive games that raise awareness about marine conservation and the wonders of the ocean.",
  },
  {
    id: 3,
    img: Image3,
    title: "𝕃𝕚𝕧𝕖 𝕆𝕔𝕖𝕒𝕟 𝕔𝕒𝕞𝕤",
    description:
      "Watch real-time footage from oceanic hotspots around the world—observe dolphins, coral reefs, and the daily rhythm of marine life from anywhere.",
  },
];


const Hero = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
      {/* hero section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    className="text-sm"
                  >
                    {data.description}
                  </p>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="300"
                  >
                    <Link to="/login">
                    <button
                      className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                    >
                      𝐄𝐱𝐩𝐥𝐨𝐫𝐞 𝐍𝐨𝐰
                    </button>
                    </Link>
                  </div>
                </div>
                {/* image section */}
                <div className="order-1 sm:order-2">
                  <div
                    data-aos="zoom-in"
                    data-aos-once="true"
                    className="relative z-10"
                  >
                    <img
                      src={data.img}
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;