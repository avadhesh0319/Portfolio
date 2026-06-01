import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const typingTexts = [
  'Building Modern AI Experiences',
  'Frontend + AI Enthusiast',
  'Creating Interactive Web Interfaces',
  'AI Assisted Web Developer',
];

function TypingText() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typingTexts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 30);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((textIndex + 1) % typingTexts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex]);

  return (
    <span className="text-accent">
      {typingTexts[textIndex].substring(0, charIndex)}
      <span className="typing-cursor" />
    </span>
  );
}

export default function HeroSection() {
  const firstName = 'Avadhesh'.split('');
  const lastName = 'Sharma'.split('');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content — always first on mobile and desktop-left */}
          <div className="space-y-8">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <p className="text-text-secondary text-sm uppercase tracking-[0.35em] font-medium">
                Hello My Name Is
              </p>
            </motion.div>

            {/* Name */}
            <div className="space-y-0">
              <div className="overflow-hidden">
                <motion.h1
                  className="text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-display font-bold leading-[0.95] tracking-tight"
                >
                  {firstName.map((letter, i) => (
                    <motion.span
                      key={`f-${i}`}
                      initial={{ opacity: 0, y: 80, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.4 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-display font-bold leading-[0.95] tracking-tight gradient-text"
                >
                  {lastName.map((letter, i) => (
                    <motion.span
                      key={`l-${i}`}
                      initial={{ opacity: 0, y: 80, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.8 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-text-secondary text-base sm:text-lg max-w-lg leading-relaxed"
            >
              B.Sc IT Student | AI Web Developer | Creative Frontend Designer
            </motion.p>

            {/* Typing text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="text-lg sm:text-xl font-display font-medium h-8"
            >
              <TypingText />
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#projects"
                className="group px-8 py-4 bg-accent text-dark font-bold text-sm rounded-full hover:shadow-[0_0_30px_rgba(145,174,196,0.3)] transition-all duration-500 flex items-center gap-2"
                data-hover
              >
                View My Projects
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-dark-border text-white font-bold text-sm rounded-full hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(145,174,196,0.1)] transition-all duration-500"
                data-hover
              >
                Hire Me
              </a>
            </motion.div>
          </div>

          {/* Right — Image. On mobile this renders AFTER name (natural DOM order) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* ===== SOFT GLOW behind image ===== */}
        



              {/* Rotating badge */}
              <div className="absolute -top-6 -right-6 z-20">
                <div className="animate-spin-slow w-28 h-28 sm:w-32 sm:h-32 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text fill="#5F84A2" fontSize="7.5" fontFamily="Space Grotesk" fontWeight="600" letterSpacing="2.5">
                      <textPath href="#circlePath">
                        AI DEVELOPER • DESIGNER • CREATIVE •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(145,174,196,0.4)]">
                      <svg className="w-4 h-4 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== FLOATING Portrait ===== */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="w-full max-w-[520px] sm:max-w-[560px] md:max-w-[640px] aspect-square rounded-3xl overflow-hidden neon-border relative group shadow-[0_0_80px_rgba(145,174,196,0.08)]">
                  <img
                    src="/images/about-portrait.png"
                    alt="Avadhesh Sharma"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                  <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
                </div>
              </motion.div>

           
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="absolute top-4 -left-4 sm:-left-8 glass rounded-full px-4 py-2 flex items-center gap-2 neon-border z-20"
              >
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs text-accent font-medium">Available for work</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
