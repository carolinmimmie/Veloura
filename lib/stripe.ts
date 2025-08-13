// 1. Installerat och konfigurerat Stripe i din kod
import Stripe from "stripe";

// Skapar en Stripe-instans med din hemliga API-nyckel
// Denna instans används för att göra alla anrop mot Stripe, t.ex. hämta produkter eller skapa betalningar
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
