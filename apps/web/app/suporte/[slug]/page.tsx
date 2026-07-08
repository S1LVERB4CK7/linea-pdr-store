import { ComingSoon } from "@/components/ComingSoon";
import { slugToTitle } from "@/lib/utils";

export default function SupportSubPage({ params }: { params: { slug: string } }) {
  return <ComingSoon title={slugToTitle(params.slug)} />;
}