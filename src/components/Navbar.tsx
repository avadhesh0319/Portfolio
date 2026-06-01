import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Top bar (logo + location) — hidden when menu open ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'glass-strong shadow-[0_4px_30px_rgba(145,174,196,0.03)]' : 'bg-transparent'
        }`}
        style={{ pointerEvents: mobileOpen ? 'none' : 'auto' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left - Location */}
            <motion.div
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="hidden md:flex items-center gap-2 text-text-secondary text-sm"
            >
              <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Navi Mumbai, India</span>
            </motion.div>

            {/* Center - Logo */}
            <motion.a
              href="#home"
              animate={{ opacity: mobileOpen ? 0 : 1, scale: mobileOpen ? 0.5 : 1 }}
              transition={{ duration: 0.25 }}
              className="absolute left-1/2 -translate-x-1/2"
              data-hover
            >
              <div className="w-11 h-11 rounded-full border border-accent/40 flex items-center justify-center bg-accent/10 animate-pulse-glow">
                <span className="text-accent font-bold text-base font-display">AV</span>
              </div>
            </motion.a>

            {/* Right spacer (hamburger is rendered separately below) */}
            <div className="w-11" />
          </div>
        </div>
      </motion.nav>

      {/* ── Hamburger button — rendered OUTSIDE nav, always on top of everything ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-[1.15rem] right-6 lg:right-8 w-11 h-11 rounded-full border border-dark-border flex items-center justify-center hover:border-accent/50 transition-all duration-300 group z-[70]"
        style={{ background: mobileOpen ? 'rgba(5,5,5,0.8)' : 'transparent' }}
        data-hover
      >
        <div className="flex flex-col gap-[5px] items-center">
          <span className={`w-[18px] h-[1.5px] bg-white transition-all duration-500 group-hover:bg-accent ${mobileOpen ? 'rotate-45 translate-y-[3.25px]' : ''}`} />
          <span className={`w-[18px] h-[1.5px] bg-white transition-all duration-500 group-hover:bg-accent ${mobileOpen ? '-rotate-45 -translate-y-[3.25px]' : ''}`} />
        </div>
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(145,174,196,0.15)" strokeWidth="0.5" strokeDasharray="3 5" />
        </svg>
      </motion.button>

      {/* ── Full Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 48px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 48px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 48px) 40px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-dark/98 backdrop-blur-2xl flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="text-4xl sm:text-5xl font-display font-bold text-white hover:text-accent transition-colors duration-300 py-2"
                  data-hover
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 flex gap-6"
              >
                {[
                  { name: 'GitHub', href: 'https://github.com/avadhesh0319/' },
                  { name: 'LinkedIn', href: 'https://in.linkedin.com/in/avadheshsharma0319' },
                  { name: 'Instagram', href: 'https://www.instagram.com/avadhesh_135/' },
                ].map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors text-sm" data-hover>{s.name}</a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
