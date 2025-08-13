"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ButtonProps {
  text: string;
  href?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ text, href, type = "button" }: ButtonProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const classes = `rounded-none py-4 px-18 bg-transparent border font-extralight text-sm uppercase${
    isHome ? " border-white text-white " : " border-black text-black"
  }`;

  if (href) {
    // Rendera som länk
    return (
      <Link href={href}>
        <button className={classes} type="button">
          {text}
        </button>
      </Link>
    );
  }

  // Rendera som vanlig knapp
  return (
    <button className={classes} type={type}>
      {text}
    </button>
  );
};

export default Button;
