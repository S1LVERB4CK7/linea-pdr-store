import { ComingSoon } from "@/components/ComingSoon";
import { StaticPageView } from "@/components/StaticPageView";
import { suportePages } from "@/lib/staticContent";
import { slugToTitle } from "@/lib/utils";

export async function generateStaticParams() {
  return Object.keys(suportePages).map((slug) => ({ slug }));
}

export default function SupportSubPage({ params }: { params: { slug: string } }) {
  const page = suportePages[params.slug];
  if (!page) return <ComingSoon title={slugToTitle(params.slug)} />;
  return <StaticPageView page={page} />;
}
