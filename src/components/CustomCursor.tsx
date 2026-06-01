import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { icons } from './icons';

interface SkillCursorData {
  iconKey: string;
  color: string;
}

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [skillData, setSkillData] = useState<SkillCursorData | null>(null);

  const handleSkillHover = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail as SkillCursorData | null;
    setSkillData(detail);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = () => {
      const hoverEls = document.querySelectorAll('a, button, input, textarea, [data-hover]');
      const handler = () => setHovering(true);
      const leave = () => setHovering(false);
      hoverEls.forEach(el => {
        el.addEventListener('mouseenter', handler);
        el.addEventListener('mouseleave', leave);
      });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('skill-cursor', handleSkillHover);

    const observer = new MutationObserver(checkHover);
    observer.observe(document.body, { childList: true, subtree: true });
    checkHover();

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('skill-cursor', handleSkillHover);
      observer.disconnect();
    };
  }, [handleSkillHover]);

  const isSkillActive = !!skillData;
  const IconComp = skillData ? icons[skillData.iconKey] : null;
  const skillColor = skillData?.color || '#39ff14';

  return (
    <>
      {/* ── Main dot — shrinks and recolors when skill is active ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: isSkillActive ? 0 : clicking ? 0.5 : hovering ? 1.5 : 1,
          opacity: isSkillActive ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-2.5 h-2.5 bg-accent rounded-full" />
      </motion.div>

      {/* ── Glow ring — morphs into skill icon container ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: isSkillActive ? pos.x - 22 : pos.x - 20,
          y: isSkillActive ? pos.y - 22 : pos.y - 20,
          scale: isSkillActive ? 1 : clicking ? 0.8 : hovering ? 1.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: isSkillActive ? 200 : 150,
          damping: isSkillActive ? 22 : 15,
          mass: isSkillActive ? 0.6 : 0.8,
        }}
      >
        {/* Default ring — fades out when skill is active */}
        <motion.div
          className="w-10 h-10 rounded-full border border-accent/40"
          animate={{ opacity: isSkillActive ? 0 : 1, scale: isSkillActive ? 0.5 : 1 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Skill icon — morphs in smoothly */}
        <AnimatePresence>
          {isSkillActive && IconComp && (
            <motion.div
              key={skillData.iconKey}
              initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotate: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-xl"
                style={{
                  background: `${skillColor}18`,
                  border: `1px solid ${skillColor}50`,
                  boxShadow: `0 0 24px ${skillColor}30, 0 0 8px ${skillColor}15`,
                }}
              >
                <IconComp className="w-5 h-5" color={skillColor} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Ambient glow — takes skill color when active ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{
          x: pos.x - 100,
          y: pos.y - 100,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1.5 }}
      >
        <motion.div
          className="w-[200px] h-[200px] rounded-full blur-[40px]"
          animate={{
            backgroundColor: isSkillActive
              ? `${skillColor}08`
              : 'rgba(0, 212, 255, 0.03)',
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </>
  );
}
