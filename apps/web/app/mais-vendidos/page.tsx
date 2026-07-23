import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { productRepo } from "@/lib/products";

export default async function BestSellersPage() {
  const products = await productRepo.getBestsellers().catch(() => []);

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-[90px]">
      <Link href="/" className="text-[13.5px] text-[#6b7178] hover:text-ink transition-colors">
        ← Back to home
      </Link>
      <h1 className="text-[32px] font-display font-semibold mt-4 mb-2">Best Sellers</h1>
      <p className="text-[#6b7178] mb-10">Our top-performing tools, trusted on the shop floor.</p>
      <ProductGrid products={products} />
    </section>
  );
}
