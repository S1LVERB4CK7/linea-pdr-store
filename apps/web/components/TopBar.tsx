export function TopBar() {
  return (
    <div className="bg-ink text-white/70 text-[12.5px]">
      <div className="max-w-[1320px] mx-auto px-8 h-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-[5px] h-[5px] rounded-full bg-green inline-block" />
          Worldwide Shipping to 40+ Countries
        </div>
        <div className="flex items-center gap-5">
          <button className="hover:text-white transition-colors">
            🌐 EN <span className="opacity-50">/ PT / ES / FR / DE / IT</span>
          </button>
          <div className="w-px h-3 bg-white/20" />
          <button className="hover:text-white transition-colors">USD ▾</button>
          <div className="w-px h-3 bg-white/20" />
          <a href="#" className="hover:text-white transition-colors">Log In</a>
          <a href="#" className="hover:text-white transition-colors">Register</a>
        </div>
      </div>
    </div>
  );
}
