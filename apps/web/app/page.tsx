import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Categories } from "@/components/Categories";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import { Trust } from "@/components/Trust";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <Features />
      <Categories />
      <ProductSpotlight />
      <Trust />
      <CtaBand />
      <Footer />
    </>
  );
}
