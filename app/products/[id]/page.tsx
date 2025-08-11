import ProductDetail from "@/components/ProductDetail";
import { stripe } from "@/lib/stripe";
import React from "react";

interface PageProps {
  params: { id: string | string[] }; // kan vara string eller string[]
}

const ProductPage = async ({ params }: PageProps) => {
  // Om id är en array (t.ex. pga catch-all routes) plocka första elementet
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  if (!product || !product.default_price) {
    return <div>Produkten kunde inte hittas.</div>;
  }

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
};

export default ProductPage;
