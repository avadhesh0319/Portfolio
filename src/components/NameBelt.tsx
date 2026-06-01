function BeltContent() {
  return (
    <div className="flex items-center shrink-0">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center shrink-0">
          <span
            className="font-display font-black uppercase tracking-tighter shrink-0 whitespace-nowrap px-4 sm:px-6"
            style={{
              fontSize: 'clamp(5.4rem, 17vw, 19rem)',
              color: 'rgba(62, 68, 96, 0.58)',
              lineHeight: 1,
            }}
          >
            AVADHESH
          </span>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0 mx-2" style={{ background: 'rgba(62, 68, 96, 0.4)' }} />
        </div>
      ))}
    </div>
  );
}

export default function NameBelt() {
  return (
    <div className="relative overflow-hidden py-2 sm:py-3 bg-transparent border-y border-dark-border/30">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
      {/* Right-to-left: uses normal marquee (translateX 0 → -50%) */}
      <div className="flex w-max animate-namebelt">
        <BeltContent />
        <BeltContent />
      </div>
    </div>
  );
}
