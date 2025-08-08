"use client";

import Stripe from "stripe";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "./card";

interface Props {
  products: Stripe.Product[]; // Props: lista med produkter från Stripe
}

const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);
  // current: index för nuvarande produkt
  // setCurrent: funktion för att uppdatera current

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
      // Uppdaterar current till nästa index, loopar om vi är på sista
    }, 3000); // Byter produkt var tredje sekund

    return () => clearInterval(interval);
    // Tar bort intervallet när komponenten tas bort
  }, [products.length]); // Kör om antalet produkter ändras

  const currentProduct = products[current];
  // Hämtar produkten som ska visas just nu

  const price = currentProduct.default_price as Stripe.Price;
  // Hämtar produktens pris (typad som Stripe.Price)

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image
            alt={currentProduct.name}
            src={currentProduct.images[0]}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          {currentProduct.name}
        </CardTitle>
        {price && price.unit_amount && (
          <p className="text-xl text-white">
            {" "}
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Carousel;
