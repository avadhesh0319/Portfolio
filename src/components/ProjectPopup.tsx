import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

/* ══════════════════════════════════════════════════════════════
   PROJECT DATA — detailed info for each popup
══════════════════════════════════════════════════════════════ */
export interface ProjectDetails {
  id: number;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  theme: {
    primary: string;
    glow: string;
    bg: string;
    border: string;
  };
  icon: 'chatbot' | 'recycle' | 'cricket';
}

export const projectDetails: ProjectDetails[] = [
  {
    id: 1,
    title: 'AI Chatbot Web Assistant',
    tagline: 'Intelligent Conversations, Anywhere',
    description:
      'A powerful AI-powered floating chatbot with real-time responses, voice interaction, and seamless integration for modern web experiences.',
    features: [
      'AI-powered real-time responses with streaming',
      'Voice-to-text and text-to-speech integration',
      'Multilingual translation support (10+ languages)',
      'Image and camera analysis capabilities',
      'Supabase chat history storage',
      'Ollama local AI integration',
      'Dark/Light mode toggle',
      'GNews API for live news updates',
      'Responsive floating widget design',
      'Context-aware conversations',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'AI APIs', 'Ollama', 'Supabase', 'GNews API'],
    theme: {
      primary: '#5F84A2',
      glow: 'rgba(95, 132, 162, 0.15)',
      bg: 'rgba(95, 132, 162, 0.03)',
      border: 'rgba(95, 132, 162, 0.2)',
    },
    icon: 'chatbot',
  },
  {
    id: 2,
    title: 'Smart Garbage Monitoring System',
    tagline: 'Sustainable Cities, Smarter Solutions',
    description:
      'An intelligent platform for sanitation management featuring real-time complaint tracking, location mapping, and role-based dashboards.',
    features: [
      'Sanitation complaint reporting system',
      'Image upload support for evidence',
      'Live location tracking with Leaflet & OpenStreetMap',
      'Role-based access (Citizens, Admins, Workers)',
      'Complaint monitoring dashboard',
      'Sanitation worker task management',
      'Complaint status tracking & updates',
      'Centralized MySQL database management',
      'Sanitation awareness modules',
      'Real-time issue management',
      'Responsive UI across devices',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Leaflet.js', 'OpenStreetMap'],
    theme: {
      primary: '#5F84A2',
      glow: 'rgba(95, 132, 162, 0.15)',
      bg: 'rgba(95, 132, 162, 0.03)',
      border: 'rgba(95, 132, 162, 0.2)',
    },
    icon: 'recycle',
  },
  {
    id: 3,
    title: 'Cricket Club Management System',
    tagline: 'Every Match, Every Player, Every Stat',
    description:
      'A comprehensive sports management platform designed for cricket clubs to manage players, matches, tournaments, and performance analytics.',
    features: [
      'Player registration & profile management',
      'Team and club administration',
      'Match scheduling & tournament handling',
      'Attendance tracking system',
      'Player performance analytics',
      'Contract & installment management',
      'Award and achievement records',
      'Medical and injury management',
      'Secure role-based authentication',
      'Report generation & exports',
      'Centralized MySQL database',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    theme: {
      primary: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.15)',
      bg: 'rgba(168, 85, 247, 0.03)',
      border: 'rgba(168, 85, 247, 0.2)',
    },
    icon: 'cricket',
  },
];

/* ══════════════════════════════════════════════════════════════
   ANIMATED ICONS
══════════════════════════════════════════════════════════════ */
function ChatbotIcon({ color }: { color: string }) {
  return (
    <motion.svg
      className="w-12 h-12"
      viewBox="0 0 48 48"
      fill="none"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="8" y="12" width="32" height="24" rx="4" stroke={color} strokeWidth="2" fill={`${color}15`} />
      <circle cx="18" cy="24" r="2" fill={color} />
      <circle cx="30" cy="24" r="2" fill={color} />
      <motion.path
        d="M20 30 Q24 33 28 30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ['M20 30 Q24 33 28 30', 'M20 30 Q24 35 28 30', 'M20 30 Q24 33 28 30'] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="40"
        cy="14"
        r="4"
        fill={color}
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <path d="M16 36 L12 42 L20 38" stroke={color} strokeWidth="2" fill={`${color}15`} />
    </motion.svg>
  );
}

function RecycleIcon({ color }: { color: string }) {
  return (
    <motion.svg
      className="w-12 h-12"
      viewBox="0 0 48 48"
      fill="none"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      <motion.path
        d="M24 8 L30 18 L18 18 Z"
        stroke={color}
        strokeWidth="2"
        fill={`${color}20`}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.path
        d="M36 28 L42 38 L36 38 L30 28 Z"
        stroke={color}
        strokeWidth="2"
        fill={`${color}20`}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <motion.path
        d="M12 28 L6 38 L12 38 L18 28 Z"
        stroke={color}
        strokeWidth="2"
        fill={`${color}20`}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      />
      <path d="M24 18 C30 18 34 22 34 28" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M34 28 C34 34 30 38 24 38" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M24 38 C18 38 14 34 14 28" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M14 28 C14 22 18 18 24 18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

function CricketIcon({ color }: { color: string }) {
  return (
    <motion.svg
      className="w-12 h-12"
      viewBox="0 0 48 48"
      fill="none"
    >
      {/* Bat */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '32px 40px' }}
      >
        <rect x="28" y="8" width="8" height="28" rx="2" fill={`${color}30`} stroke={color} strokeWidth="2" />
        <rect x="30" y="36" width="4" height="8" fill={color} />
      </motion.g>
      {/* Ball */}
      <motion.circle
        cx="16"
        cy="20"
        r="6"
        fill={`${color}20`}
        stroke={color}
        strokeWidth="2"
        animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <path d="M13 17 Q16 20 19 17" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M13 23 Q16 20 19 23" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Stumps */}
      <motion.g
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <rect x="6" y="30" width="2" height="14" fill={color} rx="1" />
        <rect x="10" y="30" width="2" height="14" fill={color} rx="1" />
        <rect x="14" y="30" width="2" height="14" fill={color} rx="1" />
        <rect x="5" y="28" width="12" height="2" fill={color} rx="1" />
      </motion.g>
    </motion.svg>
  );
}

const IconMap = {
  chatbot: ChatbotIcon,
  recycle: RecycleIcon,
  cricket: CricketIcon,
};

/* ══════════════════════════════════════════════════════════════
   MAIN POPUP COMPONENT
══════════════════════════════════════════════════════════════ */
interface ProjectPopupProps {
  project: ProjectDetails | null;
  onClose: () => void;
}

export default function ProjectPopup({ project, onClose }: ProjectPopupProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const IconComp = project ? IconMap[project.icon] : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${project.theme.bg}, rgba(5,5,5,0.95))`,
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl scrollbar-hide"
            style={{
              background: `linear-gradient(145deg, rgba(15,15,15,0.95), rgba(10,10,10,0.98))`,
              border: `1px solid ${project.theme.border}`,
              boxShadow: `0 0 60px ${project.theme.glow}, 0 0 120px ${project.theme.glow}, inset 0 0 60px ${project.theme.bg}`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-20 hover:scale-110"
              style={{
                background: `${project.theme.primary}10`,
                border: `1px solid ${project.theme.border}`,
              }}
              data-hover
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke={project.theme.primary}
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-8 pb-0">
              {/* Icon */}
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 cursor-pointer"
                onClick={onClose}
                style={{
                  background: `${project.theme.primary}10`,
                  border: `1px solid ${project.theme.border}`,
                  boxShadow: `0 0 30px ${project.theme.glow}`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-hover
              >
                {IconComp && <IconComp color={project.theme.primary} />}
              </motion.div>

              {/* Title */}
              <h2
                className="text-2xl sm:text-3xl font-display font-bold mb-2"
                style={{ color: project.theme.primary }}
              >
                {project.title}
              </h2>
              <p className="text-white/60 text-sm font-medium tracking-wide mb-4">
                {project.tagline}
              </p>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
            </div>

            {/* Features */}
            <div className="p-8">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: project.theme.primary }}
                />
                Key Features
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={project.theme.primary}
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="px-8 pb-8">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: project.theme.primary }}
                />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: `${project.theme.primary}12`,
                      border: `1px solid ${project.theme.border}`,
                      color: project.theme.primary,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-8 py-6 border-t flex items-center justify-between"
              style={{ borderColor: project.theme.border }}
            >
              <p className="text-white/40 text-xs">
                Click outside or press ESC to close
              </p>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: project.theme.primary,
                  color: '#000',
                  boxShadow: `0 0 20px ${project.theme.glow}`,
                }}
                data-hover
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
