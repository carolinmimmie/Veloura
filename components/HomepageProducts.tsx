import React from "react";
import Stripe from "stripe";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}
const HomepageProducts = ({ products }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {products.map((product) => {
        const price = product.default_price as Stripe.Price | undefined;

        return (
          <div
            key={product.id}
            className="flex flex-col text-center gap-2 uppercase tracking-widest flex-1 min-w-0"
          >
            {/* flex-1 gör att kortet kan växa, min-w-0 för att tillåta krympning korrekt i flexbox */}
            <div className="relative w-full h-[400px]">
              <Image
                alt={product.name}
                src={product.images[0]}
                fill
                objectFit="cover"
              />
            </div>

            <h3 className="text-sm font-extralight ">{product.name}</h3>
            {price && price.unit_amount && (
              <p className="text-xs">${(price.unit_amount / 100).toFixed(2)}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HomepageProducts;
