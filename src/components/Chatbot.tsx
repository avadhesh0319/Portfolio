import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

/* ═══════════════════════ FLOW DATA ═══════════════════════ */
interface FlowNode { botMessage: string; buttons: { label: string; next: string }[]; }
const flow: Record<string, FlowNode> = {
  start: { botMessage: "👋 Hi! I'm AV Assistant — Avadhesh Sharma's portfolio chatbot.\n\nHow can I help you explore his work today?", buttons: [{ label: 'About Me', next: 'about' },{ label: 'Projects', next: 'projects' },{ label: 'Skills', next: 'skills' },{ label: 'AI Experience', next: 'ai' },{ label: 'Education', next: 'education' },{ label: 'Achievements', next: 'achievements' },{ label: 'Contact', next: 'contact' },{ label: 'Resume Highlights', next: 'resume' }] },
  about: { botMessage: "Avadhesh Sharma is a B.Sc Information Technology student from Navi Mumbai, passionate about AI-powered web experiences, modern UI design, and interactive frontend development.\n\nHe builds futuristic websites with smooth animations, responsive interfaces, and intelligent chatbot systems. His goal is to create premium digital experiences that combine creativity with technology.", buttons: [{ label: 'My Skills', next: 'skills' },{ label: 'View Projects', next: 'projects' },{ label: 'AI Work', next: 'ai' },{ label: 'Contact Me', next: 'contact' },{ label: 'Got It', next: 'ack' }] },
  skills: { botMessage: "Technical Skills:\n\nFrontend: HTML, CSS, JavaScript, Responsive Design\nBackend: PHP, MySQL\nAI and ML: AI Prompting, Generative AI, Ollama, AI APIs\nTools: Linux, UI/UX Design, Framer-style Animations\nLanguages: Basic Python\n\nWith 14+ skills mastered and always learning more!", buttons: [{ label: 'Projects Using These Skills', next: 'projects' },{ label: 'AI Skills', next: 'ai' },{ label: 'Education', next: 'education' },{ label: 'Contact', next: 'contact' },{ label: 'Understood', next: 'ack' }] },
  projects: { botMessage: "Featured Projects:\n\n1. AI Chatbot Web Assistant - AI-powered floating chatbot with voice, multilingual support and Ollama integration\n\n2. Smart Garbage Monitoring - Complaint tracking with live maps, image upload and role-based dashboards\n\n3. Cricket Club Management - Full-stack platform for players, matches and performance analytics\n\nWhich project interests you?", buttons: [{ label: 'AI Chatbot', next: 'chatbot' },{ label: 'Smart Garbage Monitoring', next: 'garbage' },{ label: 'Cricket Club System', next: 'cricket' },{ label: 'Contact Developer', next: 'contact' },{ label: 'Nice Projects', next: 'ack' }] },
  chatbot: { botMessage: "AI Chatbot Web Assistant\n\nAn advanced AI-powered floating chatbot featuring:\n- Real-time AI responses with streaming\n- Voice-to-text and text-to-speech\n- Multilingual translation for 10+ languages\n- Image and camera analysis\n- Supabase chat history storage\n- Ollama local AI integration\n- Dark and Light mode toggle\n- GNews API live news updates\n\nTech: HTML, CSS, JavaScript, AI APIs, Ollama, Supabase", buttons: [{ label: 'AI Features', next: 'ai' },{ label: 'Other Projects', next: 'projects' },{ label: 'Contact Developer', next: 'contact' },{ label: 'Impressive', next: 'ack' }] },
  garbage: { botMessage: "Smart Garbage Monitoring System\n\nA smart complaint and monitoring platform featuring:\n- Sanitation complaint reporting\n- Image upload support\n- Live location tracking using Leaflet and OpenStreetMap\n- Role-based access for Citizens, Admins and Workers\n- Complaint monitoring dashboard\n- Worker task management\n- Status tracking and updates\n- Sanitation awareness modules\n\nTech: HTML, CSS, JavaScript, PHP, MySQL, Leaflet.js", buttons: [{ label: 'Other Projects', next: 'projects' },{ label: 'Contact Developer', next: 'contact' },{ label: 'Great Project', next: 'ack' }] },
  cricket: { botMessage: "Cricket Club Management System\n\nA comprehensive sports management platform:\n- Player registration and profiles\n- Team and club administration\n- Match scheduling and tournaments\n- Attendance tracking\n- Performance analytics\n- Contract and installment management\n- Award and achievement records\n- Medical and injury management\n- Secure role-based authentication\n- Report generation\n\nTech: HTML, CSS, JavaScript, PHP, MySQL", buttons: [{ label: 'Other Projects', next: 'projects' },{ label: 'Contact Developer', next: 'contact' },{ label: 'Looks Good', next: 'ack' }] },
  ai: { botMessage: "AI Experience:\n\nAvadhesh has hands-on experience with:\n- Building AI chatbots with Ollama integration\n- AI Prompting and Generative AI workflows\n- Integrating various AI APIs into web apps\n- Voice interaction systems for speech to text and text to speech\n- Image analysis using AI models\n- Multilingual AI translation\n- Real-time streaming responses\n\nHis focus is on making AI accessible through elegant web interfaces.", buttons: [{ label: 'AI Chatbot Project', next: 'chatbot' },{ label: 'All Skills', next: 'skills' },{ label: 'Projects', next: 'projects' },{ label: 'Contact', next: 'contact' },{ label: 'Understood', next: 'ack' }] },
  education: { botMessage: "Education:\n\nDegree: B.Sc in Information Technology\nLocation: Navi Mumbai, Maharashtra\nFocus Areas: AI + Web Development\nStatus: Currently pursuing\n\nActively building real-world projects alongside academics to bridge the gap between theory and practice.", buttons: [{ label: 'Achievements', next: 'achievements' },{ label: 'Skills', next: 'skills' },{ label: 'Resume Highlights', next: 'resume' },{ label: 'Got It', next: 'ack' }] },
  achievements: { botMessage: "Achievements:\n\n- 1st Place in Push-up Competition for 3 Consecutive Years\n- Winner of Tech Expo at IT Fest\n- 1st Place in IT Meme Competition\n- 2nd Place in Relay Race\n\n10+ projects built, 14+ skills mastered, and counting!", buttons: [{ label: 'Projects', next: 'projects' },{ label: 'Skills', next: 'skills' },{ label: 'Contact', next: 'contact' },{ label: 'Amazing', next: 'ack' }] },
  resume: { botMessage: "Resume Highlights:\n\nB.Sc IT Student with strong academic foundation\n10+ Projects including AI chatbot and monitoring systems\n14+ Technical Skills covering full-stack and AI capabilities\nFresher open to internship and freelance\nKey Strengths: AI integration, modern UI/UX, responsive design, quick learner\nLocation: Navi Mumbai, Maharashtra\n\nReady to contribute fresh perspectives and cutting-edge skills!", buttons: [{ label: 'View Projects', next: 'projects' },{ label: 'Skills', next: 'skills' },{ label: 'Hire Me', next: 'hire' },{ label: 'Nice Profile', next: 'ack' }] },
  contact: { botMessage: "Contact Details:\n\nEmail: sharmaavadhesh142@gmail.com\nPhone: +91 8591231893\nLocation: Navi Mumbai, Maharashtra\nGitHub: github.com/avadhesh0319\nLinkedIn: linkedin.com/in/avadheshsharma0319\nInstagram: @avadhesh_135\n\nFeel free to reach out for projects, collaborations, or just to say hi!", buttons: [{ label: 'Hire Me', next: 'hire' },{ label: 'View Projects', next: 'projects' },{ label: 'About Me', next: 'about' },{ label: 'Saved Contact', next: 'ack' }] },
  hire: { botMessage: "Let us Work Together!\n\nAvadhesh is actively looking for:\n- Internship opportunities\n- Freelance web development projects\n- AI integration projects\n- UI/UX design collaborations\n\nBest way to reach out:\nEmail: sharmaavadhesh142@gmail.com\nPhone: +91 8591231893\n\nLooking forward to creating something amazing together!", buttons: [{ label: 'Contact', next: 'contact' },{ label: 'Projects', next: 'projects' },{ label: 'About Me', next: 'about' },{ label: 'Will Contact You', next: 'ack' }] },
  ack: { botMessage: "Thank you for exploring Avadhesh Sharma's portfolio!\n\nFeel free to explore more sections anytime. I am always here to help!", buttons: [{ label: 'Start Again', next: 'start' },{ label: 'View Projects', next: 'projects' },{ label: 'Contact', next: 'contact' }] },
};

/* ═══════════ HARDCODED BUTTON TRANSLATIONS (accurate) ═══════════ */
const btnTranslations: Record<string, Record<string, string>> = {
  hi: { 'About Me': 'मेरे बारे में', 'Projects': 'प्रोजेक्ट्स', 'Skills': 'कौशल', 'AI Experience': 'AI अनुभव', 'Education': 'शिक्षा', 'Achievements': 'उपलब्धियाँ', 'Contact': 'संपर्क', 'Resume Highlights': 'रिज्यूमे हाइलाइट्स', 'My Skills': 'मेरे कौशल', 'View Projects': 'प्रोजेक्ट देखें', 'AI Work': 'AI कार्य', 'Contact Me': 'मुझसे संपर्क करें', 'Got It': 'समझ गया', 'Projects Using These Skills': 'इन कौशल से बने प्रोजेक्ट', 'AI Skills': 'AI कौशल', 'Understood': 'समझ गया', 'AI Chatbot': 'AI चैटबॉट', 'Smart Garbage Monitoring': 'स्मार्ट कचरा निगरानी', 'Cricket Club System': 'क्रिकेट क्लब सिस्टम', 'Contact Developer': 'डेवलपर से संपर्क', 'Nice Projects': 'अच्छे प्रोजेक्ट', 'AI Features': 'AI विशेषताएँ', 'Other Projects': 'अन्य प्रोजेक्ट', 'Impressive': 'प्रभावशाली', 'Great Project': 'बढ़िया प्रोजेक्ट', 'Looks Good': 'अच्छा लग रहा है', 'AI Chatbot Project': 'AI चैटबॉट प्रोजेक्ट', 'All Skills': 'सभी कौशल', 'Amazing': 'अद्भुत', 'Hire Me': 'मुझे हायर करें', 'Nice Profile': 'अच्छी प्रोफाइल', 'Saved Contact': 'संपर्क सेव किया', 'Will Contact You': 'आपसे संपर्क करूँगा', 'Start Again': 'फिर से शुरू करें' },
  mr: { 'About Me': 'माझ्याबद्दल', 'Projects': 'प्रोजेक्ट्स', 'Skills': 'कौशल्ये', 'AI Experience': 'AI अनुभव', 'Education': 'शिक्षण', 'Achievements': 'यश', 'Contact': 'संपर्क', 'Resume Highlights': 'रिज्यूमे हायलाइट्स', 'My Skills': 'माझी कौशल्ये', 'View Projects': 'प्रोजेक्ट पहा', 'AI Work': 'AI काम', 'Contact Me': 'माझ्याशी संपर्क करा', 'Got It': 'समजले', 'Projects Using These Skills': 'या कौशल्यांचे प्रोजेक्ट', 'AI Skills': 'AI कौशल्ये', 'Understood': 'समजले', 'AI Chatbot': 'AI चॅटबॉट', 'Smart Garbage Monitoring': 'स्मार्ट कचरा देखरेख', 'Cricket Club System': 'क्रिकेट क्लब सिस्टम', 'Contact Developer': 'डेव्हलपरशी संपर्क', 'Nice Projects': 'छान प्रोजेक्ट', 'AI Features': 'AI वैशिष्ट्ये', 'Other Projects': 'इतर प्रोजेक्ट', 'Impressive': 'प्रभावी', 'Great Project': 'उत्तम प्रोजेक्ट', 'Looks Good': 'छान दिसतंय', 'AI Chatbot Project': 'AI चॅटबॉट प्रोजेक्ट', 'All Skills': 'सर्व कौशल्ये', 'Amazing': 'अप्रतिम', 'Hire Me': 'मला नियुक्त करा', 'Nice Profile': 'छान प्रोफाइल', 'Saved Contact': 'संपर्क जतन केला', 'Will Contact You': 'तुम्हाला संपर्क करेन', 'Start Again': 'पुन्हा सुरू करा' },
  es: { 'About Me': 'Sobre Mí', 'Projects': 'Proyectos', 'Skills': 'Habilidades', 'AI Experience': 'Experiencia IA', 'Education': 'Educación', 'Achievements': 'Logros', 'Contact': 'Contacto', 'Resume Highlights': 'Resumen', 'My Skills': 'Mis Habilidades', 'View Projects': 'Ver Proyectos', 'AI Work': 'Trabajo IA', 'Contact Me': 'Contáctame', 'Got It': 'Entendido', 'Understood': 'Entendido', 'AI Chatbot': 'Chatbot IA', 'Smart Garbage Monitoring': 'Monitoreo Inteligente', 'Cricket Club System': 'Sistema de Cricket', 'Contact Developer': 'Contactar Desarrollador', 'Nice Projects': 'Buenos Proyectos', 'AI Features': 'Funciones IA', 'Other Projects': 'Otros Proyectos', 'Impressive': 'Impresionante', 'Great Project': 'Gran Proyecto', 'Looks Good': 'Se Ve Bien', 'All Skills': 'Todas las Habilidades', 'Amazing': 'Increíble', 'Hire Me': 'Contrátame', 'Nice Profile': 'Buen Perfil', 'Saved Contact': 'Contacto Guardado', 'Will Contact You': 'Te Contactaré', 'Start Again': 'Empezar de Nuevo', 'Projects Using These Skills': 'Proyectos con estas Habilidades', 'AI Skills': 'Habilidades IA', 'AI Chatbot Project': 'Proyecto Chatbot IA' },
  fr: { 'About Me': 'À Propos', 'Projects': 'Projets', 'Skills': 'Compétences', 'AI Experience': 'Expérience IA', 'Education': 'Formation', 'Achievements': 'Réalisations', 'Contact': 'Contact', 'Resume Highlights': 'Points Clés CV', 'My Skills': 'Mes Compétences', 'View Projects': 'Voir Projets', 'AI Work': 'Travail IA', 'Contact Me': 'Me Contacter', 'Got It': 'Compris', 'Understood': 'Compris', 'AI Chatbot': 'Chatbot IA', 'Smart Garbage Monitoring': 'Surveillance Déchets', 'Cricket Club System': 'Système Cricket', 'Contact Developer': 'Contacter Développeur', 'Nice Projects': 'Beaux Projets', 'AI Features': 'Fonctionnalités IA', 'Other Projects': 'Autres Projets', 'Impressive': 'Impressionnant', 'Great Project': 'Super Projet', 'Looks Good': 'Ça a l\'air bien', 'All Skills': 'Toutes Compétences', 'Amazing': 'Incroyable', 'Hire Me': 'Embauchez-moi', 'Nice Profile': 'Bon Profil', 'Saved Contact': 'Contact Sauvegardé', 'Will Contact You': 'Je vous contacterai', 'Start Again': 'Recommencer', 'Projects Using These Skills': 'Projets avec ces compétences', 'AI Skills': 'Compétences IA', 'AI Chatbot Project': 'Projet Chatbot IA' },
  de: { 'About Me': 'Über Mich', 'Projects': 'Projekte', 'Skills': 'Fähigkeiten', 'AI Experience': 'KI-Erfahrung', 'Education': 'Bildung', 'Achievements': 'Erfolge', 'Contact': 'Kontakt', 'Resume Highlights': 'Lebenslauf', 'My Skills': 'Meine Fähigkeiten', 'View Projects': 'Projekte Ansehen', 'AI Work': 'KI-Arbeit', 'Contact Me': 'Kontaktiere Mich', 'Got It': 'Verstanden', 'Understood': 'Verstanden', 'AI Chatbot': 'KI-Chatbot', 'Smart Garbage Monitoring': 'Müllüberwachung', 'Cricket Club System': 'Cricket-System', 'Contact Developer': 'Entwickler Kontaktieren', 'Nice Projects': 'Tolle Projekte', 'AI Features': 'KI-Funktionen', 'Other Projects': 'Andere Projekte', 'Impressive': 'Beeindruckend', 'Great Project': 'Tolles Projekt', 'Looks Good': 'Sieht Gut Aus', 'All Skills': 'Alle Fähigkeiten', 'Amazing': 'Erstaunlich', 'Hire Me': 'Stellen Sie Mich Ein', 'Nice Profile': 'Gutes Profil', 'Saved Contact': 'Kontakt Gespeichert', 'Will Contact You': 'Werde Sie Kontaktieren', 'Start Again': 'Neu Starten', 'Projects Using These Skills': 'Projekte mit diesen Fähigkeiten', 'AI Skills': 'KI-Fähigkeiten', 'AI Chatbot Project': 'KI-Chatbot Projekt' },
};

function getButtonLabel(original: string, lang: string): string {
  if (lang === 'en') return original;
  return btnTranslations[lang]?.[original] || original;
}

/* ═══════════ TRANSLATION (for long bot messages only) ═══════════ */
const msgCache = new Map<string, string>();

async function translateMessage(text: string, targetLang: string): Promise<string> {
  if (targetLang === 'en') return text;
  const key = `${targetLang}::${text.substring(0, 80)}`;
  if (msgCache.has(key)) return msgCache.get(key)!;
  // Split into chunks of max 450 chars to stay within API limits
  const lines = text.split('\n');
  const chunks: string[] = [];
  let current = '';
  for (const line of lines) {
    if ((current + '\n' + line).length > 450 && current) {
      chunks.push(current);
      current = line;
    } else {
      current = current ? current + '\n' + line : line;
    }
  }
  if (current) chunks.push(current);

  try {
    const translated = await Promise.all(
      chunks.map(async (chunk) => {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|${targetLang}`);
        const data = await res.json();
        return data?.responseData?.translatedText || chunk;
      })
    );
    const result = translated.join('\n');
    msgCache.set(key, result);
    return result;
  } catch {
    return text;
  }
}

/* ═══════════ TYPES ═══════════ */
interface Msg { id: number; type: 'bot' | 'user'; text: string; original: string; }

/* ═══════════ TYPING DOTS ═══════════ */
function Dots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => <motion.div key={i} className="w-2 h-2 rounded-full bg-cyan-400/60" animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />)}
    </div>
  );
}

/* ═══════════ PORTAL DROPDOWN ═══════════ */
function LangPortal({ anchorRef, activeLang, onSelect, onClose }: {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  activeLang: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const dropH = 260;
    const spaceAbove = rect.top;
    const goUp = spaceAbove > dropH;
    setPos({
      top: goUp ? rect.top - dropH - 4 : rect.bottom + 4,
      left: Math.min(rect.left, window.innerWidth - 180),
    });
  }, [anchorRef]);

  // Close on click outside
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (anchorRef.current?.contains(e.target as Node)) return;
      onClose();
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose, anchorRef]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-[999] w-44 rounded-xl overflow-hidden"
      style={{ top: pos.top, left: pos.left, background: 'rgba(8,16,28,0.97)', border: '1px solid rgba(0,212,255,0.18)', backdropFilter: 'blur(24px)', boxShadow: '0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.08)', cursor: 'auto' }}
    >
      <div className="px-3 py-2 border-b border-cyan-500/10">
        <p className="text-[10px] text-cyan-400/60 uppercase tracking-wider font-medium">Translate to</p>
      </div>
      {[
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'Hindi' },
        { code: 'mr', label: 'Marathi' },
        { code: 'es', label: 'Spanish' },
        { code: 'fr', label: 'French' },
        { code: 'de', label: 'German' },
      ].map((l) => (
        <button
          key={l.code}
          onClick={() => { onSelect(l.code); onClose(); }}
          className="w-full text-left px-3 py-2 text-sm flex items-center justify-between transition-colors duration-150 hover:bg-white/5"
          style={{ color: activeLang === l.code ? '#00d4ff' : 'rgba(255,255,255,0.6)', background: activeLang === l.code ? 'rgba(0,212,255,0.08)' : 'transparent', cursor: 'pointer' }}
        >
          {l.label}
          {activeLang === l.code && <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
        </button>
      ))}
    </motion.div>,
    document.body
  );
}

/* ═══════════════════════ MAIN ═══════════════════════ */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(() => { try { return localStorage.getItem('cb-open') === '1'; } catch { return false; } });
  const [msgs, setMsgs] = useState<Msg[]>(() => { try { const s = localStorage.getItem('cb-msgs'); return s ? JSON.parse(s) : []; } catch { return []; } });
  const [node, setNode] = useState(() => { try { return localStorage.getItem('cb-node') || 'start'; } catch { return 'start'; } });
  const [typing, setTyping] = useState(false);
  const [showBtns, setShowBtns] = useState(true);
  const [speakId, setSpeakId] = useState<number | null>(null);
  const [lang, setLang] = useState('en');
  const [dropdownMsgId, setDropdownMsgId] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const translateBtnRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const idRef = useRef(msgs.length);

  useEffect(() => { try { localStorage.setItem('cb-open', isOpen ? '1' : '0'); localStorage.setItem('cb-msgs', JSON.stringify(msgs.slice(-50))); localStorage.setItem('cb-node', node); } catch {} }, [isOpen, msgs, node]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);
  useEffect(() => { if (msgs.length === 0) botSay(flow.start.botMessage); }, []);

  const botSay = useCallback((text: string) => {
    setTyping(true); setShowBtns(false);
    setTimeout(async () => {
      idRef.current++;
      const display = lang !== 'en' ? await translateMessage(text, lang) : text;
      setMsgs(p => [...p, { id: idRef.current, type: 'bot', text: display, original: text }]);
      setTyping(false); setShowBtns(true);
    }, 700 + Math.random() * 400);
  }, [lang]);

  const clickBtn = useCallback((label: string, next: string) => {
    idRef.current++;
    setMsgs(p => [...p, { id: idRef.current, type: 'user', text: label, original: label }]);
    setNode(next);
    if (flow[next]) botSay(flow[next].botMessage);
  }, [botSay]);

  const speak = useCallback((id: number, text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakId === id) { speechSynthesis.cancel(); setSpeakId(null); return; }
    speechSynthesis.cancel();

    // For English: strip emojis/symbols. For other languages: keep all characters (Devanagari, accented, etc.)
    const langMap: Record<string, string> = { en: 'en-US', hi: 'hi-IN', mr: 'mr-IN', es: 'es-ES', fr: 'fr-FR', de: 'de-DE' };
    const targetLang = langMap[lang] || 'en-US';
    const isEnglish = lang === 'en';
    const cleanText = isEnglish
      ? text.replace(/[^\w\s.,!?;:'\-]/g, '')
      : text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim();

    if (!cleanText) return;

    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = targetLang;
    u.rate = isEnglish ? 1 : 0.9;
    u.pitch = 1;
    u.volume = 0.6;

    // Find best matching voice — with fallbacks for rare languages like Marathi
    const voices = speechSynthesis.getVoices();
    const findVoice = (...langs: string[]) => {
      for (const l of langs) {
        const v = voices.find(v => v.lang === l) || voices.find(v => v.lang.startsWith(l.split('-')[0]));
        if (v) return v;
      }
      return null;
    };

    // Marathi (mr-IN) voices are rare — fallback to Hindi (hi-IN) which reads Devanagari
    const voiceFallbacks: Record<string, string[]> = {
      'mr-IN': ['mr-IN', 'hi-IN'],
      'hi-IN': ['hi-IN'],
      'es-ES': ['es-ES', 'es-MX', 'es-US'],
      'fr-FR': ['fr-FR', 'fr-CA'],
      'de-DE': ['de-DE'],
      'en-US': ['en-US', 'en-GB'],
    };
    const candidates = voiceFallbacks[targetLang] || [targetLang];
    const voice = findVoice(...candidates);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    }

    u.onend = () => setSpeakId(null);
    u.onerror = () => setSpeakId(null);
    setSpeakId(id);
    speechSynthesis.speak(u);
  }, [speakId, lang]);

  const changeLang = useCallback(async (code: string) => {
    setLang(code); setDropdownMsgId(null);
    if (code === 'en') { setMsgs(p => p.map(m => ({ ...m, text: m.original }))); return; }
    const updated = await Promise.all(msgs.map(async m => m.type === 'bot' ? { ...m, text: await translateMessage(m.original, code) } : { ...m, text: getButtonLabel(m.original, code) }));
    setMsgs(updated);
  }, [msgs]);

  const reset = () => {
    speechSynthesis?.cancel(); setSpeakId(null); setDropdownMsgId(null);
    setMsgs([]); setNode('start'); setLang('en'); idRef.current = 0;
    setTimeout(() => botSay(flow.start.botMessage), 100);
  };

  const btns = flow[node]?.buttons || flow.start.buttons;

  return (
    <>
      {/* Float Button */}
      <motion.button onClick={() => setIsOpen(p => !p)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#00d4ff,#0099cc)', boxShadow: '0 0 25px rgba(0,212,255,0.35),0 4px 20px rgba(0,0,0,0.4)', cursor: 'pointer' }}
        animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></motion.svg>
          ) : (
            <motion.svg key="c" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }} className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {!isOpen && <div className="fixed bottom-6 right-6 z-[199] w-14 h-14 pointer-events-none"><motion.div className="absolute inset-0 rounded-full border-2 border-cyan-400/40" animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity }} /></div>}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-3 sm:right-6 z-[200] w-[calc(100vw-1.5rem)] sm:w-[390px] flex flex-col rounded-2xl"
            style={{ height: 'min(520px, calc(100dvh - 120px))', background: 'linear-gradient(160deg,rgba(8,15,25,0.97),rgba(5,10,20,0.99))', border: '1px solid rgba(0,212,255,0.15)', boxShadow: '0 0 60px rgba(0,212,255,0.08),0 25px 70px rgba(0,0,0,0.5)', backdropFilter: 'blur(24px)', cursor: 'auto' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/10 shrink-0" style={{ background: 'rgba(0,212,255,0.04)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#00d4ff20,#00d4ff08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                  <span className="text-cyan-400 font-display font-bold text-sm">AV</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold font-display">AV Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-cyan-400/70 text-[10px]">{{ en: 'English', hi: 'हिंदी', mr: 'मराठी', es: 'Español', fr: 'Français', de: 'Deutsch' }[lang] || 'Online'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={reset} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors" title="Reset" style={{ cursor: 'pointer' }}><svg className="w-4 h-4 text-white/40 hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg></button>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors" title="Close" style={{ cursor: 'pointer' }}><svg className="w-4 h-4 text-white/40 hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" /></svg></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide min-h-0">
              {msgs.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[85%]">
                    <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${m.type === 'user' ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/20 rounded-br-md' : 'bg-white/[0.04] text-white/80 border border-white/[0.06] rounded-bl-md'}`}>
                      {m.text}
                    </div>
                    {m.type === 'bot' && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <button onClick={() => speak(m.id, m.text)} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,212,255,0.2)]" style={{ background: speakId === m.id ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${speakId === m.id ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.06)'}`, cursor: 'pointer' }}>
                          {speakId === m.id ? <svg className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg> : <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>}
                        </button>
                        <button ref={(el) => { if (el) translateBtnRefs.current.set(m.id, el); }} onClick={() => setDropdownMsgId(p => p === m.id ? null : m.id)} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,212,255,0.2)]" style={{ background: dropdownMsgId === m.id ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${dropdownMsgId === m.id ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.06)'}`, cursor: 'pointer' }}>
                          <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && <div className="flex justify-start"><div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md"><Dots /></div></div>}
              <div ref={endRef} />
            </div>

            {/* Buttons */}
            <AnimatePresence>
              {showBtns && !typing && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}
                  className="px-4 py-3 border-t border-cyan-500/10 shrink-0" style={{ background: 'rgba(0,212,255,0.02)' }}>
                  <div className="flex flex-wrap gap-2">
                    {btns.map((b) => (
                      <motion.button key={b.label} onClick={() => clickBtn(getButtonLabel(b.label, lang), b.next)}
                        whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                        className="px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                        style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#7dd3fc', cursor: 'pointer' }}>
                        {getButtonLabel(b.label, lang)}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="px-4 py-2 border-t border-cyan-500/5 flex items-center justify-center shrink-0">
              <span className="text-white/20 text-[10px]">Powered by AV Portfolio</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language dropdown portal — renders at body level, never clipped */}
      <AnimatePresence>
        {dropdownMsgId !== null && (
          <LangPortal
            anchorRef={{ current: translateBtnRefs.current.get(dropdownMsgId) || null }}
            activeLang={lang}
            onSelect={changeLang}
            onClose={() => setDropdownMsgId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
