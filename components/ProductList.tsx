import React from "react";
import Stripe from "stripe";
import ProductCard from "./ProductCard";
interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {
  return (
    <div className="container mx-auto">
      {/* <div>
        <input type="text" placeholder="Search products....." />
      </div> */}
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
        {products.map((product, key) => {
          return (
            <li className="flex-1 min-w-[350px] max-w-[400px]" key={key}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
