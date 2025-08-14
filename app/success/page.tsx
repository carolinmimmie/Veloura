"use client";
import Button from "@/components/Button";
import { useCartStore } from "@/store/cart-store";
import React, { useEffect } from "react";

const SuccessPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h3 className="uppercase font-extralight text-3xl">
        Payment successfull
      </h3>
      <p className="uppercase font-extralight text-2xl">Thank you</p>
      <Button text="Continue shopping" href="/products" />
    </div>
  );
};

export default SuccessPage;
