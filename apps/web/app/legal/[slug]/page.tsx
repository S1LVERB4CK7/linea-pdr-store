import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";
import { StaticPageView } from "@/components/StaticPageView";
import { legalPages } from "@/lib/staticContent";
import { slugToTitle } from "@/lib/utils";

export async function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const page = legalPages[params.slug];
  if (!page) return <ComingSoon title={slugToTitle(params.slug)} />;
  return <StaticPageView page={page} />;
}
