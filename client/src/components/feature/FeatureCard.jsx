// import React from 'react'

export default function featureCard(props) {
  return (
    <div className="w-full aspect-[16/5] rounded bg-secondaryColor relative shadow-xl group overflow-hidden">
      <img
        className="w-full h-full object-cover rounded group-hover:scale-[1.1] duration-300"
        src={props.image}
        alt=""
      />

      <div className="w-full font-medium text-center text-sm md:text-base lg:text-lg absolute bottom-0 top-0 p-5 flex justify-center items-center text-primaryColor bg-secondaryAccentColor rounded leading-4 md:leading-5 capitalize bg-opacity-70 backdrop-blur-[1px]">
        {props.title}
      </div>
    </div>
  );
}
