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
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {products.map((product, key) => {
          return (
            <li key={key}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
