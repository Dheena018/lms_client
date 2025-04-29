import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Learn Anything, anytime, anywhere
      </h1>
      <p className="text-gray-500 sm:text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quae
        mollitia atque nobis sequi autem facere tempore deserunt. Similique, in?
      </p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <button className="px-10 py-3 rounded-md text-white bg-blue-600">
          Get Started
        </button>
        <button className="flex items-center gap-2">
          Learn More <Image src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
