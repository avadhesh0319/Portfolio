import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { icons } from './icons';

interface Skill {
  name: string;
  iconKey: string;
  color: string;
}

const skills: Skill[] = [
  { name: 'HTML', iconKey: 'html', color: '#E34F26' },
  { name: 'CSS', iconKey: 'css', color: '#1572B6' },
  { name: 'JavaScript', iconKey: 'javascript', color: '#F7DF1E' },
  { name: 'Basic Python', iconKey: 'python', color: '#3776AB' },
  { name: 'MySQL', iconKey: 'mysql', color: '#4479A1' },
  { name: 'PHP', iconKey: 'php', color: '#777BB4' },
  { name: 'Linux', iconKey: 'linux', color: '#FCC624' },
  { name: 'AI Prompting', iconKey: 'ai', color: '#5F84A2' },
  { name: 'Generative AI', iconKey: 'brain', color: '#8B5CF6' },
  { name: 'Ollama', iconKey: 'ollama', color: '#00D4AA' },
  { name: 'Responsive Design', iconKey: 'responsive', color: '#06B6D4' },
  { name: 'UI/UX Design', iconKey: 'uiux', color: '#EC4899' },
  { name: 'Framer Animation', iconKey: 'framer', color: '#0055FF' },
  { name: 'AI APIs', iconKey: 'api', color: '#10B981' },
];

/* ── Dispatch custom event to morph the global cursor ── */
function emitSkillCursor(data: { iconKey: string; color: string } | null) {
  window.dispatchEvent(new CustomEvent('skill-cursor', { detail: data }));
}

function SkillCapsule({
  skill,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  skill: Skill;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const isHovered = hoveredIndex === index;
  const someoneElseHovered = hoveredIndex !== null && hoveredIndex !== index;

  const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : 99;
  const isNeighbor = distance === 1;
  const isFar = distance > 2;

  const handleEnter = useCallback(
    (_e: React.MouseEvent | React.TouchEvent) => {
      setHoveredIndex(index);
      emitSkillCursor({ iconKey: skill.iconKey, color: skill.color });
    },
    [index, setHoveredIndex, skill]
  );

  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
    emitSkillCursor(null);
  }, [setHoveredIndex]);

  // dimming
  let capsuleOpacity = 1;
  let capsuleBlur = 0;
  let capsuleScale = 1;
  if (someoneElseHovered) {
    if (isNeighbor) {
      capsuleOpacity = 0.55;
      capsuleBlur = 0.5;
      capsuleScale = 0.97;
    } else if (isFar) {
      capsuleOpacity = 0.3;
      capsuleBlur = 1;
      capsuleScale = 0.95;
    } else {
      capsuleOpacity = 0.45;
      capsuleBlur = 0.8;
      capsuleScale = 0.96;
    }
  }
  if (isHovered) {
    capsuleOpacity = 1;
    capsuleBlur = 0;
    capsuleScale = 1.08;
  }

  const IconComp = icons[skill.iconKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
      className="relative"
      data-hover
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
          opacity: capsuleOpacity,
          scale: capsuleScale,
          filter: `blur(${capsuleBlur}px)`,
        }}
        transition={{
          y: {
            duration: 3 + (index % 3),
            repeat: Infinity,
            delay: index * 0.25,
            ease: 'easeInOut',
          },
          opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
          scale: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
          filter: { duration: 0.4 },
        }}
        className={`
          px-5 sm:px-6 py-3 sm:py-3.5 rounded-full
          border font-medium text-sm sm:text-base font-display
          select-none whitespace-nowrap flex items-center gap-2
          transition-colors duration-300
          ${
            isHovered
              ? 'bg-accent/10 text-white'
              : 'bg-dark-card/60 border-dark-border/60 text-white/80'
          }
        `}
        style={
          isHovered
            ? {
                borderColor: `${skill.color}90`,
                boxShadow: `0 0 28px ${skill.color}25, inset 0 0 18px ${skill.color}08, 0 0 0 1px ${skill.color}20`,
                color: skill.color,
              }
            : {}
        }
      >
        {/* Inline mini icon */}
        <motion.span
          className="w-4 h-4 shrink-0"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {IconComp && (
            <IconComp
              className="w-4 h-4"
              color={isHovered ? skill.color : '#888'}
            />
          )}
        </motion.span>
        {skill.name}
      </motion.div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Clean up cursor morph when leaving the section entirely
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleLeave = () => {
      setHoveredIndex(null);
      emitSkillCursor(null);
    };
    el.addEventListener('mouseleave', handleLeave);
    return () => el.removeEventListener('mouseleave', handleLeave);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-accent text-sm font-medium uppercase tracking-[0.2em]">
              Technical Skills
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold"
          >
            My <span className="gradient-text">Tech Stack</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-text-secondary mt-4 max-w-md mx-auto"
          >
            Hover over each skill to discover more. These are the tools I use to
            craft digital experiences.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <SkillCapsule
              key={skill.name}
              skill={skill}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 neon-border">
            <span className="text-accent text-lg">+</span>
            <span className="text-text-secondary text-sm">
              And many more tools & technologies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
