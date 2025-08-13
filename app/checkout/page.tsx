"use client"; // Markerar att detta är en client component i Next.js

import { useCartStore } from "@/store/cart-store"; // Hämtar zustand store för kundvagn
import Image from "next/image"; // Next.js komponent för optimerade bilder
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  // Hämtar data och funktioner från kundvagnsstore
  const { items, removeItem, addItem } = useCartStore();

  // Beräknar totalpriset av alla produkter i kundvagnen
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log(items);
  // Om kundvagnen är tom, visa meddelande och sluta rendera här
  if (total === 0 || items.length === 0) {
    return (
      <div>
        <h3>Your cart is empty</h3>
      </div>
    );
  }

  // Om kundvagnen inte är tom, rendera orderöversikt
  return (
    <div className="pt-28 uppercase text-center text-xs font-extralight">
      <h2>Order summary</h2>

      {/* Container för alla produkter */}
      <div className="flex flex-col gap-6 bg-gray-50 my-8 mx-8 py-8 px-8 ">
        {/* Loopar igenom varje produkt */}
        {items.map((item, key) => (
          <div className="flex gap-6" key={key}>
            <div>
              {/* Visa produktbild om den finns */}
              {item.imageUrl && item.imageUrl[0] && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={150}
                  priority
                />
              )}
            </div>

            {/* Produktinformation */}
            <div className="flex flex-col justify-between">
              <div className="">
                <h4 className="text-left">{item.name}</h4> {/* Produktnamn */}
              </div>
              <div className="flex gap-4">
                {/* Visar pris per produkt baserat på antal */}
                <span className="font-medium">
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </span>

                {/* Knapp för att ändra antal */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => removeItem(item.id)} // Tar bort 1 produkt
                    className="cursor-pointer "
                  >
                    -
                  </button>
                  <span className="font-normal">{item.quantity}</span>{" "}
                  {/* Antal */}
                  <button
                    onClick={() => addItem({ ...item, quantity: 1 })} // Lägger till 1 produkt
                    className="cursor-pointer "
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <hr className="border-t-1 border-gray-200" />

        {/* Totalpris längst ner */}
        <div className="flex gap-6">
          <p>Total: $ {(total / 100).toFixed(2)}</p>
        </div>
      </div>

      {/* Formulär för att gå vidare produkten till betalning till stripe*/}
      <form action={checkoutAction}>
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <button type="submit">Proceed to payment</button>
        {/* <button onClick={() => clearCart()}>Clear Cart</button> */}
      </form>
    </div>
  );
}
