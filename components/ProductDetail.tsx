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
    <div className="px-0 sm:px-16 py-18 flex flex-col sm:flex-row gap-6 min-h-screen">
      {product.images && product.images[0] && (
        <div className="relative h-200  w-full sm:w-1/2">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      )}
      <div className="flex flex-col gap-6 px-8 w-full sm:w-1/2">
        <div className="flex flex-row gap-0 sm:flex-col sm:gap-4 justify-between uppercase tracking-widest text-sm font-light">
          <h2 className=""> {product.name}</h2>
          {price && price.unit_amount && (
            <p className="tracking ">${(price.unit_amount / 100).toFixed(2)}</p>
          )}
        </div>
        <p className="tracking-widest font-light">{product.description}</p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => removeItem(product.id)}
            className="cursor-pointer"
          >
            -
          </button>
          <span className="normal">{quantity}</span>
          <button onClick={onAddItem} className="cursor-pointer">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
