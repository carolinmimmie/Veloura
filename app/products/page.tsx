import ProductList from "@/components/ProductList";
import { stripe } from "@/lib/stripe";

//Här ska vi fetcha produkterna
export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  console.log(products);

  return (
    <div className="pt-18 px-8">
      <h2 className="uppercase text-center text-xs font-extralight">New in</h2>
      <ProductList products={products.data} />
    </div>
  );
}
