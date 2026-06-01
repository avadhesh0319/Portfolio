import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

const testimonials = [
  { label: 'Professor', text: "Demonstrates exceptional aptitude for emerging technologies. His AI chatbot project showcased innovative thinking and solid technical execution. Always eager to learn and helps fellow students understand complex concepts.", rating: 5 },
  { label: 'Teammate', text: "Working together on the Cricket Club Management System was a great experience. He took the lead on frontend development and delivered clean, responsive interfaces. Attention to detail and problem-solving skills are impressive.", rating: 5 },
  { label: 'Collaborator', text: "Brings creativity and technical skills together seamlessly. Contributions to the UI/UX design elevated the entire product during our smart monitoring project. Highly recommend working together on future projects.", rating: 5 },
  { label: 'Friend', text: "Not just talented but also incredibly helpful. Always ready to explain coding concepts and share resources. Passion for AI and web development is truly inspiring — a great companion and future tech leader!", rating: 5 },
];

function WorldMapDotted() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14]" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" fill="none">
      <defs><pattern id="dotP" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.2" fill="#5F84A2" /></pattern></defs>
      <path d="M130 60 L150 50 L180 45 L210 50 L240 55 L260 70 L270 90 L265 110 L260 125 L250 140 L240 155 L230 165 L215 175 L200 180 L190 185 L175 190 L165 200 L155 210 L145 205 L140 195 L135 185 L130 175 L120 165 L115 155 L110 145 L105 130 L105 115 L110 100 L115 85 L120 70Z" fill="url(#dotP)" />
      <path d="M155 210 L160 220 L165 230 L170 240 L175 250 L178 260 L175 265 L170 262 L165 255 L160 248 L155 240 L150 230 L148 220Z" fill="url(#dotP)" />
      <path d="M195 265 L210 260 L225 265 L235 275 L240 290 L245 310 L248 330 L245 350 L240 370 L232 385 L222 395 L212 400 L205 395 L200 385 L195 370 L192 355 L190 340 L188 325 L188 310 L190 295 L192 280Z" fill="url(#dotP)" />
      <path d="M440 55 L455 50 L470 48 L485 50 L500 52 L510 55 L518 60 L525 68 L530 78 L528 88 L520 95 L510 100 L500 105 L490 110 L480 115 L470 118 L460 115 L450 108 L442 100 L438 90 L435 80 L436 68Z" fill="url(#dotP)" />
      <path d="M430 60 L435 55 L438 62 L435 68 L430 65Z" fill="url(#dotP)" />
      <path d="M470 30 L478 25 L485 28 L490 35 L488 45 L482 50 L475 48 L470 42Z" fill="url(#dotP)" />
      <path d="M450 130 L465 125 L480 128 L495 132 L510 138 L520 150 L528 165 L535 185 L538 205 L535 225 L530 245 L522 265 L512 280 L500 290 L490 295 L478 290 L468 280 L460 268 L455 250 L450 235 L448 218 L445 200 L443 180 L442 165 L445 148Z" fill="url(#dotP)" />
      <path d="M530 100 L545 95 L560 100 L570 110 L575 125 L570 135 L560 140 L548 138 L538 132 L532 120 L530 110Z" fill="url(#dotP)" />
      <path d="M620 120 L635 115 L645 125 L650 140 L648 160 L642 178 L632 190 L620 195 L610 188 L605 175 L605 158 L608 140 L612 130Z" fill="url(#dotP)" />
      <path d="M500 45 L530 38 L570 35 L620 32 L670 30 L720 32 L760 38 L790 45 L810 55 L815 68 L808 78 L795 82 L775 80 L750 75 L720 72 L690 68 L660 65 L630 62 L600 60 L570 58 L540 55 L515 52Z" fill="url(#dotP)" />
      <path d="M680 75 L710 72 L735 78 L755 88 L765 100 L770 115 L768 130 L758 142 L745 148 L730 150 L715 145 L700 138 L690 128 L682 115 L678 100 L678 88Z" fill="url(#dotP)" />
      <path d="M700 155 L715 152 L728 158 L735 168 L738 180 L732 190 L722 195 L710 192 L702 182 L698 170Z" fill="url(#dotP)" />
      <path d="M785 80 L790 75 L795 80 L798 90 L795 100 L790 105 L785 100 L783 90Z" fill="url(#dotP)" />
      <path d="M720 210 L740 208 L760 212 L775 218 L780 225 L775 230 L760 228 L740 224 L725 220Z" fill="url(#dotP)" />
      <path d="M760 290 L785 280 L810 278 L835 282 L855 292 L865 308 L860 325 L850 340 L835 350 L815 355 L795 350 L778 340 L768 325 L762 310Z" fill="url(#dotP)" />
      <path d="M880 350 L885 345 L890 350 L892 360 L888 368 L882 365 L878 358Z" fill="url(#dotP)" />
      <path d="M280 20 L300 15 L320 18 L335 25 L340 35 L335 45 L320 50 L305 48 L290 42 L282 32Z" fill="url(#dotP)" />
    </svg>
  );
}

function GlowStars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={14} height={14} viewBox="0 0 24 24" fill="#5F84A2" style={{ filter: 'drop-shadow(0 0 4px rgba(145,174,196,0.5))' }}>
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t, isActive }: { t: typeof testimonials[0]; isActive: boolean }) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.88,
        y: isActive ? 0 : 10,
        opacity: isActive ? 1 : 0.38,
        filter: isActive ? 'blur(0px)' : 'blur(1.2px)',
      }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div className={`rounded-3xl p-5 sm:p-7 md:p-8 relative transition-all duration-700 h-full ${
        isActive
          ? 'bg-dark-card/60 backdrop-blur-xl border border-accent/20 shadow-[0_0_40px_rgba(145,174,196,0.05)]'
          : 'bg-dark-card/25 backdrop-blur-sm border border-dark-border/15'
      }`}>
        {isActive && (
          <div className="absolute top-4 right-4 sm:top-5 sm:right-6 pointer-events-none">
            <svg className="w-10 h-10 sm:w-14 sm:h-14" viewBox="0 0 24 24" fill="rgba(145,174,196,0.06)">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        )}

        <div className="mb-3 sm:mb-4"><GlowStars /></div>

        <p className={`leading-relaxed mb-5 sm:mb-6 pr-4 sm:pr-8 break-words transition-colors duration-700 ${
          isActive ? 'text-white/85 text-sm sm:text-base md:text-lg' : 'text-white/40 text-xs sm:text-sm'
        }`}>
          &ldquo;{t.text}&rdquo;
        </p>

        <div className="flex items-center gap-3 sm:gap-4 mt-auto">
          <div className={`rounded-full flex items-center justify-center shrink-0 transition-all duration-700 ${
            isActive
              ? 'w-11 h-11 sm:w-14 sm:h-14 bg-accent/10 border border-accent/25 shadow-[0_0_15px_rgba(145,174,196,0.1)]'
              : 'w-8 h-8 sm:w-10 sm:h-10 bg-dark-card border border-dark-border/40'
          }`}>
            <span className={`font-display font-bold transition-colors duration-700 ${
              isActive ? 'text-accent text-base sm:text-lg' : 'text-text-muted text-xs sm:text-sm'
            }`}>{t.label[0]}</span>
          </div>
          <div>
            <p className={`font-display font-semibold text-sm transition-colors duration-700 ${isActive ? 'text-accent' : 'text-white/30'}`}>{t.label}</p>
            {isActive && <p className="text-text-muted text-xs mt-0.5">Feedback</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const total = testimonials.length;

  // Triple-clone strategy for truly seamless infinite loop
  const cloned = [...testimonials, ...testimonials, ...testimonials];
  const [slideIndex, setSlideIndex] = useState(total);
  const [animateTrack, setAnimateTrack] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef(0);
  const lockRef = useRef(false);

  const activeReal = ((slideIndex % total) + total) % total;

  const cardPercent = containerWidth < 640 ? 88 : containerWidth < 1024 ? 72 : 52;
  const itemWidth = containerWidth * (cardPercent / 100);
  const centeredOffset = (containerWidth - itemWidth) / 2;
  const trackX = -(slideIndex * itemWidth) + centeredOffset;

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!lockRef.current) move(1);
    }, 4500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, containerWidth]);

  useEffect(() => {
    resetAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetAutoplay]);

  useEffect(() => {
    const el = trackRef.current?.parentElement;
    if (!el) return;
    const update = () => setContainerWidth(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const move = useCallback((dir: 1 | -1) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimateTrack(true);
    const next = slideIndex + dir;
    setSlideIndex(next);
    resetAutoplay();

    setTimeout(() => {
      // If we drift out of the middle copy, silently recenter to the same card
      // inside the middle block so the loop never visibly jumps.
      if (next < total) {
        setAnimateTrack(false);
        setSlideIndex(next + total);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnimateTrack(true));
        });
      } else if (next >= total * 2) {
        setAnimateTrack(false);
        setSlideIndex(next - total);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnimateTrack(true));
        });
      }
      lockRef.current = false;
    }, 620);
  }, [slideIndex, total, resetAutoplay]);

  const goTo = useCallback((realIndex: number) => {
    if (lockRef.current || realIndex === activeReal) return;
    const diff = realIndex - activeReal;
    move(diff > 0 ? 1 : -1);
  }, [activeReal, move]);

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 lg:py-32 bg-dark relative overflow-hidden"
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const d = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(d) > 50) move(d > 0 ? 1 : -1);
      }}
    >
      <WorldMapDotted />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-accent text-xs sm:text-sm font-medium uppercase tracking-[0.2em]">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold mb-2 sm:mb-3">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-text-secondary text-xs sm:text-base max-w-md mx-auto">
            Feedback from professors, teammates, friends, and collaborators.
          </p>
        </motion.div>

        {/* Seamless infinite track */}
        <div className="relative max-w-5xl mx-auto overflow-hidden min-h-[420px] sm:min-h-[360px] lg:min-h-[320px]">
          <motion.div
            ref={trackRef}
            className="flex"
            animate={{ x: trackX }}
            transition={animateTrack ? { duration: 0.62, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
          >
            {cloned.map((t, i) => {
              const realIndex = i % total;
              // Important: use realIndex instead of exact slideIndex so cloned copies
              // of the same testimonial share the same active visual state. This avoids
              // the pop/fade glitch when the track silently recenters between clone blocks.
              const isActive = realIndex === activeReal;
              return (
                <div
                  key={`${t.label}-${i}`}
                  className="box-border shrink-0 px-2 sm:px-3"
                  style={{ width: `${cardPercent}%`, cursor: realIndex !== activeReal ? 'pointer' : 'default' }}
                  onClick={() => { if (realIndex !== activeReal) goTo(realIndex); }}
                  data-hover={realIndex !== activeReal ? '' : undefined}
                >
                  <Card t={t} isActive={isActive} />
                </div>
              );
            })}
          </motion.div>

          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
          <button onClick={() => move(-1)} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-dark-border flex items-center justify-center hover:border-accent/50 hover:bg-accent/5 transition-all duration-300" data-hover>
            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex gap-1.5 sm:gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`h-2 rounded-full transition-all duration-500 ${activeReal === i ? 'w-6 sm:w-8 bg-accent shadow-[0_0_10px_rgba(145,174,196,0.4)]' : 'w-2 bg-dark-border hover:bg-accent/30'}`} data-hover />
            ))}
          </div>
          <button onClick={() => move(1)} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-dark-border flex items-center justify-center hover:border-accent/50 hover:bg-accent/5 transition-all duration-300" data-hover>
            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
