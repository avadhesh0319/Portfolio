const tickerItems = [
  'AI DEVELOPMENT',
  'WEB DESIGN',
  'FRONTEND',
  'CREATIVE UI',
  'MODERN TECH',
  'AI PROMPTING',
  'RESPONSIVE DESIGN',
];

function TickerContent() {
  return (
    <div className="flex items-center shrink-0">
      {tickerItems.map((item, i) => (
        <div key={i} className="flex items-center shrink-0">
          <span className="text-lg sm:text-xl font-display font-bold text-white/70 uppercase tracking-[0.15em] px-8 shrink-0 whitespace-nowrap">
            {item}
          </span>
          <div className="w-2 h-2 bg-accent/60 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  );
}

export default function MarqueeTicker() {
  return (
    <div className="py-5 border-y border-dark-border/50 bg-dark-light/50 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-light to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-light to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
