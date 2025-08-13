import Link from "next/link";
import React from "react";
import Stripe from "stripe";
import Image from "next/image";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  return (
    <Link href={`/products/${product.id}`}>
      <div className="flex flex-col gap-2">
        <div className=" ">
          {product.images && product.images[0] && (
            <div className="relative w-full h-[500px]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                objectFit="cover"
                priority
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 ">
          <h3 className="text-sm font-extralight tracking-widest">
            {product.name}
          </h3>
          {/* <p>{product.description}</p> */}
          {price && price.unit_amount && (
            <p className="text-sm font-light tracking-wide">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
