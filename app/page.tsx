import { stripe } from "@/lib/stripe";
import Image from "next/image";

import HomepageProducts from "@/components/HomepageProducts";
import Form from "@/components/Form";
import DualHero from "@/components/DualHero";
import Button from "@/components/Button";

export default async function Home() {
  // 2. Anropar Stripe API:t för att hämta produkter

  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 4,
  });
  console.log(products);

  return (
    <div>
      <section className="relative h-[66vh] w-full flex items-center justify-center uppercase tracking-widest">
        <div>
          <Image
            alt="Banner image"
            src={products.data[3].images[0]}
            fill
            className="object-fit"
          />
        </div>
        <div className="absolute bg-opacity-40 " />
        <div className="relative z-10 text-center text-white px-4 flex flex-col gap-8 pt-86">
          <h2 className="text-xl md:text-8xl font-extralight">Summer Sale</h2>
          <p className="mb-6 text-4xl">Up to 40% off</p>
          <div className="mt-16">
            <Button />
          </div>
        </div>
      </section>
      <section className="py-10 px-6">
        <HomepageProducts products={products.data} />
      </section>
      <section>
        <DualHero />
      </section>
    </div>
  );
}
