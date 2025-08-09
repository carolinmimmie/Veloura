import React from "react";
import Image from "next/image";
import Button from "./Button";

const DualHero = () => {
  return (
    <div className="relative flex flex-col sm:flex-row w-full h-[660px]">
      <div className="relative w-full sm:w-1/2 h-full">
        <Image src="/images/luna.jpg" alt="hero1" fill objectFit="cover" />
      </div>
      <div className="relative w-full sm:w-1/2 h-full">
        <Image src="/images/sage.jpg" alt="hero2" fill objectFit="cover" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-end mb-12">
        <Button />
      </div>
    </div>
  );
};

export default DualHero;
