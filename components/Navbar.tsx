"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

export const Navbar = () => {
  // State för om mobilmenyn är öppen eller stängd
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Körs en gång när komponenten laddas
  useEffect(() => {
    // Funktion som kollar fönstrets bredd vid resize
    const handleResize = () => {
      // Om skärmen är bredare än 730px, stäng mobilmenyn automatiskt
      if (window.innerWidth >= 730) {
        setMobileOpen(false);
      }
    };

    // Lyssna på resize-event
    window.addEventListener("resize", handleResize);
    // Ta bort event-lyssnaren när komponenten tas bort (städning)
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hämta varor i kundvagnen från global store (zustand)
  const { items } = useCartStore();

  // Räkna samman alla kvantiteter från varorna i kundvagnen
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Hämta aktuell path (url)
  const pathname = usePathname();

  // Kolla om vi är på startsidan
  const isHome = pathname === "/";

  return (
    // Navbar med position fixed, överst på sidan
    <nav
      className={`top-0 left-0 w-full z-50 uppercase fixed ${
        // Om vi är på startsidan, använd transparent bakgrund
        // annars använd 'bg-transparant' (OBS: felstavat, borde vara 'bg-transparent')
        isHome ? "bg-transparent" : "bg-transparant"
      }`}
    >
      {/* Container för navbarens innehåll, centrerad med padding */}
      <div
        className={`container mx-auto flex items-center justify-between py-2 px-4 ${
          // Textfärg: vit på startsidan, svart annars
          isHome ? "text-white" : "text-black"
        }`}
      >
        {/* Meny för större skärmar */}
        <div className="hidden sm:flex gap-8 font-extralight text-xs">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/checkout">Checkout</Link>
        </div>

        {/* Loggan / sidans namn */}
        <div>
          <Link href="/" className="font-light text-xl sm:text-2xl">
            Veloura
          </Link>
        </div>

        {/* Högerdel med språk/info, kundvagn och hamburgermeny */}
        <div className="flex items-center space-x-4">
          {/* Länder och valuta (syns bara på sm och upp) */}
          <div className="hidden sm:flex items-center gap-2 font-extralight text-xs">
            <span>United States</span>
            <span>/</span>
            <span>USD</span>
          </div>

          {/* Länk till kundvagnen */}
          <Link
            href="/checkout"
            className={`w-6 h-6 ${isHome ? "text-white" : "text-black"}`}
          >
            {/* Icon + badge */}
            <div className="relative">
              {/* Kundvagnsikon */}
              <ShoppingCartIcon className="w-5 h-5" />
              {/* Om det finns varor, visa en liten röd cirkel med antal */}
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center
                  w-4 h-4 text-[10px] font-semibold rounded-full
                  bg-gray-800 shadow-md text-white"
                >
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* Knapp för att öppna/stänga mobilmenyn (syns bara på små skärmar) */}
          <button
            className="sm:hidden"
            onClick={() => setMobileOpen((prev) => !prev)} // Växla state för menyöppning
          >
            {/* Visa kors (stäng) om mobilmenyn är öppen, annars hamburgermeny */}
            {mobileOpen ? (
              <XMarkIcon
                className={`w-5 h-5 ${isHome ? "text-white" : "text-black"}`}
              />
            ) : (
              <Bars3Icon
                className={`w-5 h-5  ${isHome ? "text-white" : "text-black"}`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobilmeny som visas om mobileOpen är true */}
      {mobileOpen && (
        <nav>
          <ul
            className={`container mx-auto flex items-center justify-between py-2 px-4 font-extralight text-xs ${
              isHome ? "text-white" : "text-black"
            }`}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/checkout">Checkout</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
