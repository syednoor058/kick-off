// import React from 'react'

export default function featureCard(props) {
  return (
    <div className="w-full aspect-square rounded bg-secondaryColor relative shadow-md group overflow-hidden">
      <img
        className="w-full h-full object-cover rounded group-hover:scale-[1.1] duration-300"
        src={props.image}
        alt=""
      />
      <div className="w-full font-medium text-center text-lg absolute bottom-0 pt-16 pb-5 px-5 text-primaryColor bg-gradient-to-t from-secondaryColor to-transparent rounded leading-5">
        {props.title}
      </div>
    </div>
  );
}
