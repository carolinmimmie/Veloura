"use client";
import React, { useState } from "react";
import Stripe from "stripe";
import ProductCard from "./ProductCard";
interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filterProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    return nameMatch;
  });

  return (
    <div className="container mx-auto pb-10">
      <div>
        <input
          className="uppercase tracking-widest text-sm pb-2"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search..."
        />
      </div>
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
        {filterProduct.map((product, key) => {
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
