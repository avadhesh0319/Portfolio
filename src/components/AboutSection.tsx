import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { icons } from './icons';

/* ─── Only 3 subtle floating particles ─── */
function FloatingParticles() {
  const [particles] = useState(() => [
    { id: 0, size: 3, x: -120, y: -90, delay: 0, dur: 6, opacity: 0.3 },
    { id: 1, size: 4, x: 110, y: 70, delay: 2, dur: 7, opacity: 0.25 },
    { id: 2, size: 2.5, x: -60, y: 120, delay: 3.5, dur: 5.5, opacity: 0.35 },
  ]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            width: p.size,
            height: p.size,
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -18, 6, -12, 0],
            x: [0, 8, -6, 10, 0],
            opacity: [p.opacity, p.opacity * 1.4, p.opacity * 0.6, p.opacity * 1.2, p.opacity],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Orbiting ring dots ─── */
function OrbitRing({
  radius,
  duration,
  dotCount,
  reverse = false,
}: {
  radius: number;
  duration: number;
  dotCount: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (360 / dotCount) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
            style={{
              left: `calc(50% + ${x}px - 3px)`,
              top: `calc(50% + ${y}px - 3px)`,
            }}
          />
        );
      })}
    </motion.div>
  );
}

/* ─── Bio structured data for styled rendering ─── */
const bioParts: { text: string; highlight?: boolean; accent?: boolean }[] = [
  { text: "I'm " },
  { text: 'Avadhesh Sharma', highlight: true },
  { text: ', a ' },
  { text: 'B.Sc Information Technology', accent: true },
  { text: ' student passionate about ' },
  { text: 'AI-powered web experiences', highlight: true },
  { text: ', ' },
  { text: 'modern UI design', accent: true },
  { text: ', and ' },
  { text: 'interactive frontend development', highlight: true },
  { text: '. I enjoy building ' },
  { text: 'futuristic websites', accent: true },
  { text: ' with smooth animations, responsive interfaces, and ' },
  { text: 'intelligent chatbot systems', highlight: true },
  { text: '. My goal is to create ' },
  { text: 'premium digital experiences', accent: true },
  { text: ' that combine ' },
  { text: 'creativity', highlight: true },
  { text: ' with ' },
  { text: 'technology', highlight: true },
  { text: '.' },
];

const infoCards = [
  { label: 'Name', value: 'Avadhesh Sharma', iconKey: 'user' },
  { label: 'Education', value: 'B.Sc IT', iconKey: 'graduation' },
  { label: 'Location', value: 'Navi Mumbai', iconKey: 'pin' },
  { label: 'Focus', value: 'AI + Web Dev', iconKey: 'crosshair' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 lg:py-36 relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/[0.025] rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* section tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-medium uppercase tracking-[0.25em]">
            About Me
          </span>
        </motion.div>

        {/* ─── Main grid: image left, text right ─── */}
        <div className="grid lg:grid-cols-[auto_1fr] gap-16 xl:gap-24 items-center">
          {/* ── Portrait-style image (4:5), clean minimal styling ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center mx-auto lg:mx-0 w-full max-w-[420px]"
            style={{ aspectRatio: '4 / 5' }}
          >
            <div
              className="relative w-full h-full rounded-[1.4rem] overflow-hidden"
              style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.55)' }}
            >
              <img
                src="/images/hero-portrait.jpg"
                alt="Avadhesh Sharma"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* ── Right content ── */}
          <div>
            {/* ════ REDESIGNED BIO ════ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-10 relative"
            >
              {/* decorative quote mark */}
              <span className="absolute -top-6 -left-2 text-accent/10 text-7xl font-serif leading-none select-none pointer-events-none">
                "
              </span>

              <div className="glass rounded-2xl p-6 sm:p-8 neon-border relative overflow-hidden">
                {/* subtle inner glow */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-accent/[0.04] rounded-full blur-[60px] pointer-events-none" />

                <p className="text-base sm:text-lg lg:text-xl leading-[1.9] relative z-10">
                  {bioParts.map((part, i) => {
                    if (part.highlight) {
                      return (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0.15 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                          className="text-white font-semibold"
                          style={{
                            background: 'var(--color-gradient-accent)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {part.text}
                        </motion.span>
                      );
                    }
                    if (part.accent) {
                      return (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0.15 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                          className="text-white font-medium border-b border-accent/30 pb-px"
                        >
                          {part.text}
                        </motion.span>
                      );
                    }
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0.1 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                        className="text-white/60"
                      >
                        {part.text}
                      </motion.span>
                    );
                  })}
                </p>

                {/* decorative bottom line */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-8 h-px bg-accent/40" />
                  <span className="text-text-muted text-[10px] uppercase tracking-[0.2em]">
                    Personal Statement
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Info cards grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  className="glass rounded-2xl p-4 text-center neon-border neon-border-hover transition-all duration-500 hover:-translate-y-1 group"
                >
                  <span className="w-5 h-5 text-accent mb-2 block mx-auto group-hover:scale-110 transition-transform duration-300">
                    {icons[card.iconKey]({ className: 'w-5 h-5', color: 'var(--color-accent)' })}
                  </span>
                  <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1">
                    {card.label}
                  </p>
                  <p className="text-white text-sm font-semibold font-display">
                    {card.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* ── Status strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 neon-border"
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-accent"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/80 text-sm font-medium">
                Fresher&nbsp;
                <span className="text-text-secondary">|</span>&nbsp;Open to
                Internship &amp; Freelance Opportunities
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
