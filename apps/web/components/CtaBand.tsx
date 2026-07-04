export function CtaBand() {
  return (
    <div className="mx-4 md:mx-8 mb-[100px] rounded-[28px] bg-ink px-8 md:px-15 py-16 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
      <div className="absolute w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.35),transparent_70%)] -top-[260px] -right-[140px]" />
      <div className="relative">
        <h2 className="font-bold text-white text-[28px] md:text-[32px] tracking-tight max-w-[420px]">
          Distributor and fleet pricing, worldwide.
        </h2>
        <p className="text-white/60 text-[14.5px] mt-2.5 max-w-[400px]">
          Volume rates for shops, mobile technicians and dealership networks in 40+ countries.
        </p>
      </div>
      <a href="#" className="relative inline-flex items-center justify-center h-[52px] px-6 rounded-2xl bg-white text-ink text-sm font-semibold hover:-translate-y-0.5 transition-transform shrink-0">
        Become a Distributor
      </a>
    </div>
  );
}
