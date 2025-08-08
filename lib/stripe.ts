// 1. Installerat och konfigurerat Stripe i din kod
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
