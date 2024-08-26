// import React from 'react'
import { useState } from "react";
import Slider from "react-slick";

export default function HeroSlider() {
  const slidersImg = [
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2e80a037869665.574ef20d97dcf.jpg",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/908fe237869665.574ef20d98586.jpg",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9eab7337869665.574ef20d9bc4a.jpg",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8f60b837869665.574ef20d9976a.jpg",
    },
  ];

  const [dotActive, setDotActive] = useState(0);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul className="absolute bottom-10 md:bottom-20 z-10 flex md:gap-3 justify-center items-center">
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "10px",
                height: "10px",
                color: "blue",
                background: "#ffffff",
                borderRadius: "50%",
                cursor: "pointer",
              }
            : {
                width: "10px",
                height: "10px",
                color: "blue",
                borderWidth: "1px",
                borderColor: "#ffffff",
                borderRadius: "50%",
                cursor: "pointer",
              }
        }
      ></div>
    ),
  };
  return (
    <Slider {...settings}>
      {slidersImg.map((img, index) => (
        <div key={index} className="w-full aspect-video  rounded">
          <img
            src={img.url}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}
    </Slider>
  );
}
