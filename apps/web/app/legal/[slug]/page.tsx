import { ComingSoon } from "@/components/ComingSoon";
import { slugToTitle } from "@/lib/utils";

export default function LegalPage({ params }: { params: { slug: string } }) {
  return <ComingSoon title={slugToTitle(params.slug)} />;
}