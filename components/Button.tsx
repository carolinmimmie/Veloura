import Link from "next/link";
import React from "react";

const Button = () => {
  return (
    <Link href={"/products"}>
      <button className="rounded-none py-4 px-18 bg-transparent border border-white text-white font-extralight text-sm uppercase">
        Discover Now
      </button>
    </Link>
  );
};

export default Button;
