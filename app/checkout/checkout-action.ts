"use server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

// Funktion som hanterar checkout, tar emot formulärdata
export const checkoutAction = async (formData: FormData): Promise<void> => {
  // Hämtar "items" från formuläret, skickat som en JSON-sträng
  const itemsJson = formData.get("items") as string;

  // Konverterar JSON-strängen tillbaka till en array av objekt
  const items = JSON.parse(itemsJson);

  // Skapar en array som Stripe förstår (line_items)
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "cad", // Valuta för betalningen
      product_data: { name: item.name }, // Produktens namn
      unit_amount: item.price, // Pris per enhet i cent
    },
    quantity: item.quantity, // Antal av produkten som ska köpas
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  redirect(session.url!);
};
