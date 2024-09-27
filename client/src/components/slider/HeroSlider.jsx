// import React from 'react'
import { useContext, useState } from "react";
import Slider from "react-slick";
import { ProductContext } from "../../context/ProductContext";
export default function HeroSlider() {
  const { carausols } = useContext(ProductContext);

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
      {carausols[0]?.url.map((img, index) => (
        <div key={index} className="w-full aspect-video  rounded">
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}
    </Slider>
  );
}
