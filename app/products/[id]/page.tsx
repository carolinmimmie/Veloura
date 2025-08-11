import ProductDetail from "@/components/ProductDetail";
import { stripe } from "@/lib/stripe";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: Params) => {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  // Kolla att produkten och default_price finns
  if (!product || !product.default_price) {
    return <div>Produkten kunde inte hittas.</div>;
  }

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
};

export default ProductPage;
