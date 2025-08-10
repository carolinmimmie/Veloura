import React from "react";
import Stripe from "stripe";
import ProductCard from "./ProductCard";
interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {
  return (
    <div className="">
      {/* <div>
        <input type="text" placeholder="Search products....." />
      </div> */}
      <ul className="flex flex-wrap gap-6 uppercase">
        {products.map((product, key) => {
          return (
            <li className="flex" key={key}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
