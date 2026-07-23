import { ComingSoon } from "@/components/ComingSoon";
import { StaticPageView } from "@/components/StaticPageView";
import { empresaPages } from "@/lib/staticContent";
import { slugToTitle } from "@/lib/utils";

export async function generateStaticParams() {
  return Object.keys(empresaPages).map((slug) => ({ slug }));
}

export default function CompanyPage({ params }: { params: { slug: string } }) {
  const page = empresaPages[params.slug];
  if (!page) return <ComingSoon title={slugToTitle(params.slug)} />;
  return <StaticPageView page={page} />;
}
