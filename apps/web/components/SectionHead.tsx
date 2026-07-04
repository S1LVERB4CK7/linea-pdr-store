export function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-11 max-w-[560px]">
      <span className="block text-[12.5px] font-semibold tracking-wide uppercase text-blue-600 mb-2.5">
        {kicker}
      </span>
      <h2 className="font-bold text-[28px] md:text-[34px] tracking-tight leading-[1.15]">{title}</h2>
    </div>
  );
}
