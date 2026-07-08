import { TopBar } from "@/components/TopBar";
import Header from '@/components/Header';
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Categories } from "@/components/Categories";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import { Trust } from "@/components/Trust";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { getCategories } from "@/lib/db";

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <Features />
      <Categories categories={categories} />
      <ProductSpotlight />
      <Trust />
      <CtaBand />
      <Footer />
    </>
  );
}