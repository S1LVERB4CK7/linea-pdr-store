import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Categories } from "@/components/Categories";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import { Trust } from "@/components/Trust";
import { CtaBand } from "@/components/CtaBand";
import { getCategories } from "@/lib/db";

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <Hero />
      <Features />
      <Categories categories={categories} />
      <ProductSpotlight />
      <Trust />
      <CtaBand />
    </>
  );
}