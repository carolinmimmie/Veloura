import ProductDetail from "@/components/ProductDetail";
import { stripe } from "@/lib/stripe";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

// Serverkomponent som tar emot "params" med produktens id från URL:en
const ProductPage = async ({ params }: Params) => {
  // Hämtar produktdata från Stripe baserat på produktens id
  // "expand" gör att vi får med detaljer om default priset direkt i svaret
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  // Gör om produkten till ren JSON-data för att ta bort
  // saker som Next.js inte kan skicka som props (t.ex. metoder eller specialobjekt)
  const plainProduct = JSON.parse(JSON.stringify(product));

  // Skickar in produktdata till vår ProductDetail-komponent som visar info på sidan
  return <ProductDetail product={plainProduct} />;
};

export default ProductPage;
