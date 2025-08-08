import React from "react";
import Image from "next/image";

const DualHero = () => {
  return (
    <div className="relative flex w-full h-[660px]">
      <div className="relative w-1/2 h-full">
        <Image src="/images/luna.jpg" alt="hero1" fill objectFit="cover" />
      </div>
      <div className="relative w-1/2 h-full">
        <Image src="/images/sage.jpg" alt="hero2" fill objectFit="cover" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-end mb-12">
        <button className="rounded-none py-4 px-18 bg-transparent border border-white text-white font-extralight text-sm uppercase">
          Summer sale
        </button>
      </div>
    </div>
  );
};

export default DualHero;
