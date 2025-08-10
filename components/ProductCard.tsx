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
    <Link href={"/products/1"}>
      <div className="flex flex-col items-center gap-3 pt-6  ">
        <div className=" flex flex-col align-middle">
          {product.images && product.images[0] && (
            <div className="relative w-[420px] h-[500px]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                // width={450}
                // height={500}
                objectFit="contain"
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
