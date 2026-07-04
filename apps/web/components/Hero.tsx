export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_15%_10%,#EFF4FF_0%,#FFFFFF_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,#F5F7FA_0%,#FFFFFF_60%)] pt-[88px]">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid md:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold tracking-wide uppercase text-blue-600 bg-blue/[0.08] px-3.5 py-1.5 rounded-full mb-5">
              ● New — Glass LED Reflector Series
            </span>
            <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.04] tracking-tight mb-5">
              See the dent
              <br />
              before it{" "}
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #111" }}>
                disappears
              </span>
              .
            </h1>
            <p className="text-[17px] leading-relaxed text-[#565c64] max-w-[460px] mb-8">
              Reflection boards, glue systems and carbon tools built to the tolerances
              professional PDR technicians actually work to. Shipped worldwide, trusted
              on the shop floor.
            </p>
            <div className="flex items-center gap-3.5 mb-11">
              <a href="#" className="inline-flex items-center justify-center h-[52px] px-6 rounded-2xl bg-ink text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(17,17,17,0.22)] transition-all">
                Shop Now
              </a>
              <a href="#" className="inline-flex items-center justify-center h-[52px] px-6 rounded-2xl border-[1.5px] border-silver text-sm font-semibold hover:border-ink transition-colors">
                Explore Collection
              </a>
            </div>
            <div className="flex gap-10">
              <Stat value="40+" label="Countries served" />
              <Stat value="12,400" label="Technicians equipped" />
              <Stat value="4.9★" label="Average pro rating" />
            </div>
          </div>

          <ReflectionRig />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <strong className="font-bold text-2xl">{value}</strong>
      <span className="text-[12.5px] text-[#7a828c]">{label}</span>
    </div>
  );
}

// Elemento de assinatura: simula o "line-board" que técnicos de PDR usam
// de verdade pra localizar amassados por reflexo de luz — não é um banner
// genérico de carro, é a técnica real do ofício em forma visual.
function ReflectionRig() {
  return (
    <div className="relative aspect-square rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgba(17,17,17,0.08)] bg-gradient-to-br from-[#16181B] to-[#0B0C0E]">
      <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <linearGradient id="sweep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -20 320 C 100 260, 220 250, 260 200 C 300 150, 380 140, 540 170 L 540 520 L -20 520 Z"
          fill="#1B1E22"
        />
        <g strokeWidth={6} stroke="url(#sweep)" fill="none" opacity={0.85}>
          <path d="M -20 140 C 120 120, 260 170, 540 130" />
          <path d="M -20 175 C 120 155, 260 205, 540 165" />
          <path d="M -20 210 C 120 190, 260 240, 540 200" />
          <path d="M -20 245 C 120 225, 260 260, 540 235" opacity={0.5} />
          <path d="M -20 280 C 120 258, 260 232, 540 270" opacity={0.35} />
        </g>
      </svg>
      <div className="absolute top-5 right-5 bg-white/10 backdrop-blur border border-white/10 text-white text-[11.5px] font-medium px-3 py-1.5 rounded-full">
        Line-board simulation
      </div>
      <div className="absolute left-5 bottom-5 bg-white/95 backdrop-blur px-3.5 py-2.5 rounded-xl shadow-md flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green shadow-[0_0_0_3px_rgba(34,197,94,0.18)]" />
        <span className="text-xs font-semibold">Dent detected — 0.4mm</span>
      </div>
    </div>
  );
}
