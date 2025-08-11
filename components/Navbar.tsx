"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <nav
      className={`top-0 left-0 w-full z-50 uppercase fixed ${
        isHome ? "bg-transparent" : "bg-transparant"
      }`}
    >
      <div
        className={`container flex-row-reverse mx-auto flex items-center justify-between py-2 px-4 ${
          isHome ? "text-white" : "text-black"
        }`}
      >
        <div className="flex gap-2 md:gap-8 font-extralight text-xs">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
        <div>
          <Link href="/" className="font-light text-2xl">
            Veloura
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-2 font-extralight text-xs">
          <span>United States</span>
          <span>/</span>
          <span>USD</span>
        </div>
      </div>
    </nav>
  );
};
