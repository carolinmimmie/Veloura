"use client";
import React from "react";
import Stripe from "stripe";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
interface Props {
  product: Stripe.Product;
}

const ProductDetail = ({ product }: Props) => {
  // Här hämtar vi från vårt Zustand-store:
  // items = listan med produkter i varukorgen
  // addItem = funktionen för att lägga till produkter i varukorgen
  const { items, addItem, removeItem } = useCartStore();

  // Vi "castar" product.default_price till Stripe.Price för att lättare använda prisinfo
  const price = product.default_price as Stripe.Price;

  // Kolla om produkten redan finns i varukorgen (genom att jämföra id)
  const cartItem = items.find((item) => item.id === product.id);

  // Om produkten finns i varukorgen, ta dess quantity, annars 0
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="py-12">
      {product.images && product.images[0] && (
        <div className="relative h-60 w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        {price && price.unit_amount && (
          <p className="">${(price.unit_amount / 100).toFixed(2)}</p>
        )}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => removeItem(product.id)}
            className="bg-white px-3 py-1 rounded cursor-pointer border border-gray-300 hover:bg-gray-100"
          >
            -
          </button>
          <span className="min-w-[20px] text-center font-medium">
            {quantity}
          </span>
          <button
            onClick={onAddItem}
            className="bg-black px-3 py-1 rounded cursor-pointer text-white hover:bg-gray-800"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
