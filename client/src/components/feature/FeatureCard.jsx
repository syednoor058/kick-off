// import React from 'react'

export default function featureCard(props) {
  return (
    <div className="w-[250px] h-[250px] rounded bg-secondaryColor relative shadow-md">
      <img
        className="w-full h-full object-cover rounded"
        src={props.image}
        alt=""
      />
      <div className="w-full font-bold text-center text-xl absolute bottom-0 pt-16 pb-5 px-5 text-primaryColor bg-gradient-to-t from-secondaryColor to-transparent rounded">
        {props.title}
      </div>
    </div>
  );
}
