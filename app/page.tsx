import { stripe } from "@/lib/stripe";
import Image from "next/image";

import HomepageProducts from "@/components/HomepageProducts";
import DualHero from "@/components/DualHero";
import Button from "@/components/Button";
import Link from "next/link";
import Form from "@/components/Form";

export default async function Home() {
  // 2. Anropar Stripe API:t för att hämta produkter

  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 4,
  });
  console.log(products);

  return (
    <div>
      <section className="relative h-[56vh] w-full uppercase tracking-widest">
        <div className="absolute inset-0">
          <Image
            alt="Banner image"
            src={products.data[3].images[0]}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-opacity-40 " />
        <div className="absolute inset-0 flex flex-col items-center justify-end z-10 text-white px-4 gap-22">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl md:text-8xl font-extralight">
              Season Favorites
            </h2>
            <p className="text-4xl">Up to 40% off</p>
          </div>
          <div className="mb-12">
            <Button />
          </div>
        </div>
      </section>
      <section className="py-10 sm:px-12">
        <Link href="/products">
          <HomepageProducts products={products.data} />
        </Link>
      </section>
      <section>
        <DualHero />
      </section>
      <section className="flex justify-center py-10 px-8">
        <Form />
      </section>
    </div>
  );
}
