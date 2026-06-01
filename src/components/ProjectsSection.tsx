import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { icons } from './icons';
import ProjectPopup, { projectDetails } from './ProjectPopup';

/* ──────────────────── project data ──────────────────── */
const projects = [
  {
    id: 1,
    title: 'AI Chatbot Web Assistant',
    description:
      'An AI-powered floating chatbot with voice interaction, multilingual support, real-time responses, and Ollama integration.',
    tech: ['HTML', 'CSS', 'JavaScript', 'AI APIs', 'Ollama'],
    color: '#5F84A2',
    iconKey: 'chatbot',
    images: [
      '/images/ai1.png',
      '/images/project-chatbot.jpg',
      '/images/ai2.png',
    ],
    imageLabels: ['Chat Interface', 'Voice Mode', 'Multi-language'],
    features: [
      'Real-time AI responses with streaming',
      'Voice-to-text and text-to-voice interaction',
      'Multilingual support for 10+ languages',
    ],
    role: 'Full-Stack Developer',
    year: '2024',
  },
  {
    id: 2,
    title: 'Smart Garbage Monitoring',
    description:
      'A smart complaint and monitoring platform with image upload, location tracking, and role-based dashboard system.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Leaflet.js'],
    color: '#39FF14',  /* keep green for this eco-project */
    iconKey: 'globe',
    images: [
      '/images/s1.png',
      '/images/s3.png',
      '/images/s2.png',
    ],
    imageLabels: ['Dashboard', 'Map View', 'Complaint Panel'],
    features: [
      'Interactive map with real-time location pins',
      'Image upload for complaint evidence',
      'Role-based access: Admin, Inspector, Citizen',
    ],
    role: 'Full-Stack Developer',
    year: '2024',
  },
  {
    id: 3,
    title: 'Cricket Club Management',
    description:
      'Full-stack sports management platform for handling players, matches, and performance tracking.',
    tech: ['JavaScript', 'PHP', 'MySQL'],
    color: '#A855F7',
    iconKey: 'bat',
    images: [
      '/images/c1.png',
      '/images/c2.png',
      '/images/c3.png',
    ],
    imageLabels: ['Dashboard', 'Match Schedule', 'Performance'],
    features: [
      'Complete player and team roster management',
      'Match scheduling with live score updates',
      'Performance analytics and stat tracking',
    ],
    role: 'Full-Stack Developer',
    year: '2023',
  },
];

/* ──────────────────── single project slide ──────────────────── */
function ProjectSlide({
  project,
  index,
  total,
  containerRef,
  onOpenPopup,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onOpenPopup: (id: number) => void;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;

  const scale = useTransform(scrollYProgress, [start, end], [1, 0.92]);
  const borderRadius = useTransform(scrollYProgress, [start, end], [0, 24]);

  const isLast = index === total - 1;

  return (
    <motion.div
      className="h-screen w-full sticky top-0 overflow-hidden"
      style={{
        zIndex: index + 1,
        scale: isLast ? 1 : scale,
        borderRadius: isLast ? 0 : borderRadius,
      }}
    >
      {!isLast && (
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none z-20"
          style={{ opacity: useTransform(scrollYProgress, [start, end], [0, 0.45]) }}
        />
      )}

      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, #0e0e0e 0%, ${project.color}08 45%, #0a0a0a 100%)`,
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}30, transparent)` }}
      />

      <div
        className="absolute top-8 right-8 text-[7rem] sm:text-[10rem] lg:text-[14rem] font-display font-black leading-none pointer-events-none select-none"
        style={{ color: 'transparent', WebkitTextStroke: `1px ${project.color}10` }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-center justify-between mb-8 lg:mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
                {icons[project.iconKey]({ className: 'w-5 h-5', color: project.color })}
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] font-semibold"
                  style={{ color: project.color }}
                >
                  Project {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </p>
                <p className="text-text-muted text-xs mt-0.5">
                  {project.role} · {project.year}
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-wrap gap-2 justify-end max-w-sm">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-[11px] font-medium border backdrop-blur-sm"
                  style={{
                    borderColor: `${project.color}30`,
                    color: project.color,
                    background: `${project.color}08`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-14 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.05] mb-5">
                {project.title.split(' ').map((w, wi, arr) => (
                  <span key={wi}>
                    {wi === arr.length - 1 ? (
                      <span style={{ color: project.color }}>{w}</span>
                    ) : (
                      w
                    )}{' '}
                  </span>
                ))}
              </h2>

              <p className="text-text-secondary text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-lg">
                {project.description}
              </p>

              <ul className="space-y-2.5 mb-6">
                {project.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-sm text-white/70">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={project.color}
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex md:hidden flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-[10px] font-medium border"
                    style={{
                      borderColor: `${project.color}30`,
                      color: project.color,
                      background: `${project.color}08`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onOpenPopup(project.id)}
                className="group flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-4 px-5 py-2.5 rounded-full"
                style={{ 
                  color: project.color,
                  background: `${project.color}10`,
                  border: `1px solid ${project.color}30`,
                }}
                data-hover
              >
                View Project Details
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 h-[260px] sm:h-[340px] lg:h-[420px]">
              <div
                className="row-span-2 rounded-2xl overflow-hidden border relative group"
                style={{ borderColor: `${project.color}18` }}
              >
                <img
                  src={project.images[0]}
                  alt={project.imageLabels[0]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                <span
                  className="absolute bottom-3 left-3 text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${project.color}22`, color: project.color }}
                >
                  {project.imageLabels[0]}
                </span>
              </div>

              <div
                className="rounded-2xl overflow-hidden border relative group"
                style={{ borderColor: `${project.color}18` }}
              >
                <img
                  src={project.images[1]}
                  alt={project.imageLabels[1]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                <span
                  className="absolute bottom-3 left-3 text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${project.color}22`, color: project.color }}
                >
                  {project.imageLabels[1]}
                </span>
              </div>

              <div
                className="rounded-2xl overflow-hidden border relative group"
                style={{ borderColor: `${project.color}18` }}
              >
                <img
                  src={project.images[2]}
                  alt={project.imageLabels[2]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                <span
                  className="absolute bottom-3 left-3 text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${project.color}22`, color: project.color }}
                >
                  {project.imageLabels[2]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {index === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-30">
          <span className="text-text-muted text-[9px] uppercase tracking-[0.3em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-4 h-4 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function ProgressDots({
  scrollYProgress,
  total,
}: {
  scrollYProgress: any;
  total: number;
}) {
  return (
    <div className="fixed right-5 sm:right-7 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      {Array.from({ length: total }).map((_, i) => {
        const seg = 1 / total;
        const midpoint = i * seg + seg / 2;
        return (
          <motion.div
            key={i}
            className="relative w-3 h-3 rounded-full border border-dark-border flex items-center justify-center"
            style={{
              borderColor: useTransform(
                scrollYProgress,
                [midpoint - seg / 2, midpoint, midpoint + seg / 2],
                ['rgba(30,30,30,1)', 'rgba(145,174,196,0.8)', 'rgba(30,30,30,1)']
              ),
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-accent"
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [midpoint - seg / 2, midpoint, midpoint + seg / 2],
                  [0, 1, 0]
                ),
              }}
            />
          </motion.div>
        );
      })}
      <div className="w-px h-8 bg-gradient-to-b from-accent/20 to-transparent mt-1" />
    </div>
  );
}

/* ──────────────────── main export ──────────────────── */
export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activePopupId, setActivePopupId] = useState<number | null>(null);
  const activeProject = activePopupId !== null 
    ? projectDetails.find(p => p.id === activePopupId) || null
    : null;

  return (
    <>
      <div id="projects" className="py-20 lg:py-28 bg-dark relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-accent text-sm font-medium uppercase tracking-[0.2em]">
              Featured Projects
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold"
          >
            Selected <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-text-secondary mt-4 text-base sm:text-lg max-w-lg"
          >
            Scroll through my featured projects — click "View Project Details" for more info.
          </motion.p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <ProgressDots scrollYProgress={scrollYProgress} total={projects.length} />

        {projects.map((project, i) => (
          <ProjectSlide
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            containerRef={containerRef}
            onOpenPopup={setActivePopupId}
          />
        ))}
      </div>

      {/* Project Detail Popup */}
      <ProjectPopup
        project={activeProject}
        onClose={() => setActivePopupId(null)}
      />
    </>
  );
}
