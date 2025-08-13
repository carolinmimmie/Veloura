"use client";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import React, { useEffect } from "react";

const SuccessPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div>
      <h3>Payment successfull</h3>
      <p>Thank you</p>
      <Link href={"/products"}>Continue shopping</Link>
    </div>
  );
};

export default SuccessPage;
