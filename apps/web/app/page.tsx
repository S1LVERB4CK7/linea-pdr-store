import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Categories } from "@/components/Categories";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import { RecommendedProducts } from "@/components/RecommendedProducts";
import { Trust } from "@/components/Trust";
import { CtaBand } from "@/components/CtaBand";
import { getCategories } from "@/lib/db";
import { featuredProduct } from "@/lib/data";

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <Hero />
      <Features />
      <Categories categories={categories} />
      <ProductSpotlight />
      <RecommendedProducts productIdentifier={featuredProduct.sku} />
      <Trust />
      <CtaBand />
    </>
  );
}