import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const trailImages = [
  '/images/2.jpg',
  '/images/about-portrait.png',
  '/images/3.jpg',
  '/images/1.jpg',
];

const MIN_DISTANCE = 240;

export default function CursorTrailSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      // Only spawn if cursor is inside this section
      if (
        e.clientY < rect.top ||
        e.clientY > rect.bottom ||
        e.clientX < rect.left ||
        e.clientX > rect.right
      ) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > MIN_DISTANCE) {
        spawnImage(x, y, container);
        lastPos.current.x = e.clientX;
        lastPos.current.y = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  function spawnImage(x: number, y: number, container: HTMLDivElement) {
    const img = document.createElement('img');
    img.src = trailImages[Math.floor(Math.random() * trailImages.length)];
    img.alt = '';
    img.draggable = false;

    Object.assign(img.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: '200px',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '0px',
      transform: 'translate(-50%, -50%) scale(0.6)',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1), opacity 1s ease',
      zIndex: '5',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    });

    container.appendChild(img);

    // Pop in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.opacity = '1';
        img.style.transform = 'translate(-50%, -50%) scale(1.05)';

        setTimeout(() => {
          img.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 120);
      });
    });

    // Stay visible for 1s, then fade out over 1s
    setTimeout(() => {
      img.style.opacity = '0';
      img.style.transform = 'translate(-50%, -50%) scale(0.85)';

      setTimeout(() => {
        img.remove();
      }, 1000);
    }, 1000);
  }

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '80vh' }}>
      {/* Trail container — captures mouse and spawns images */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0"
        style={{ cursor: 'none' }}
      />

      {/* Center text — always on top */}
      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: '80vh' }}>
        <motion.h1
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-center select-none pointer-events-none"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 12rem)',
            color: 'rgba(220, 225, 230, 0.75)',
            letterSpacing: '-0.04em',
            textShadow: '0 10px 40px rgba(0,0,0,0.5)',
            lineHeight: 1,
          }}
        >
          AVADHESH
        </motion.h1>
      </div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted text-[10px] sm:text-xs uppercase tracking-[0.3em] z-10 pointer-events-none"
      >
        Move your cursor around
      </motion.p>
    </section>
  );
}
