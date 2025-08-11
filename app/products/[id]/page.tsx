import { Metadata } from "next";
import { stripe } from "@/lib/stripe";
import ProductDetail from "@/components/ProductDetail";

// Typ för params (kan skrivas inline också)
type Params = { params: { id: string } };

// generateMetadata - dynamiskt sätter sidans titel baserat på produkten
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = await stripe.products.retrieve(params.id);

  if (!product) {
    return {
      title: "Produkt saknas",
    };
  }

  return {
    title: product.name || "Produkt",
  };
}

// Själva sidan som hämtar produkten och renderar detaljer
const ProductPage = async ({ params }: Params) => {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  if (!product || !product.default_price) {
    return <div>Produkten kunde inte hittas.</div>;
  }

  // Gör om produkten till plain JSON så Next.js kan skicka den som prop
  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
};

export default ProductPage;
