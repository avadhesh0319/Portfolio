import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { icons } from './icons';

const achievements = [
  { iconKey: 'trophy', title: '1st Place in Push-up Competition', subtitle: '3 Consecutive Years', color: '#FFD700' },
  { iconKey: 'medal', title: 'Winner of Tech Expo', subtitle: 'IT Fest', color: '#5F84A2' },
  { iconKey: 'target', title: '1st Place in IT Meme Competition', subtitle: 'Creative Category', color: '#06B6D4' },
  { iconKey: 'runner', title: '2nd Place in Relay Race', subtitle: 'Sports Event', color: '#8B5CF6' },
];

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="pt-24 lg:pt-32 pb-10 lg:pb-14 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-medium uppercase tracking-[0.2em]">Achievements</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-16"
        >
          Awards & <span className="gradient-text">Milestones</span>
        </motion.h2>

        {/* Achievement Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group glass rounded-3xl p-8 neon-border neon-border-hover transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${a.color}08 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex items-start gap-5">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${a.color}15`, border: `1px solid ${a.color}30` }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {icons[a.iconKey]({ className: 'w-5 h-5', color: a.color })}
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {a.title}
                  </h3>
                  <p className="text-text-secondary text-sm mt-1">{a.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Counter Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { end: 4, suffix: '+', label: 'Awards Won' },
            { end: 10, suffix: '+', label: 'Projects Built' },
            { end: 3, suffix: '', label: 'Years Coding' },
            { end: 14, suffix: '+', label: 'Skills Learned' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center glass rounded-2xl p-6 neon-border hover:shadow-[0_0_25px_rgba(145,174,196,0.1)] transition-all duration-500"
            >
              <p className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-1">
                <Counter end={stat.end} suffix={stat.suffix} />
              </p>
              <p className="text-text-secondary text-xs sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
