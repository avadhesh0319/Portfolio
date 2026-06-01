import { motion } from 'framer-motion';
import { icons } from './icons';

export default function ExperienceSection() {
  return (
    <section className="pt-10 lg:pt-14 pb-24 lg:pb-32 bg-dark-light/30 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-medium uppercase tracking-[0.2em]">Experience</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Ready to<br />
              <span className="gradient-text">Contribute</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              As a dedicated fresher, I bring fresh perspectives, cutting-edge knowledge of AI technologies,
              and an unrelenting passion for creating beautiful, functional web experiences.
            </p>

            <div className="glass rounded-2xl p-6 neon-border inline-block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold font-display">Fresher</p>
                  <p className="text-text-secondary text-sm">Open to Internship & Freelance Opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - What I bring */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { iconKey: 'rocket', title: 'Quick Learner', desc: 'Adapts to new technologies and frameworks rapidly', color: '#5F84A2' },
              { iconKey: 'palette', title: 'Design Eye', desc: 'Strong sense of aesthetics and modern UI patterns', color: '#EC4899' },
              { iconKey: 'chip', title: 'AI Integration', desc: 'Experience with AI APIs, Ollama, and generative AI', color: '#8B5CF6' },
              { iconKey: 'code', title: 'Full-Stack Basics', desc: 'Frontend + PHP/MySQL backend knowledge', color: '#06B6D4' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass rounded-2xl p-5 neon-border neon-border-hover transition-all duration-500 group flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}>
                  {icons[item.iconKey]({ className: 'w-5 h-5', color: item.color })}
                </div>
                <div>
                  <h4 className="text-white font-semibold group-hover:text-accent transition-colors">{item.title}</h4>
                  <p className="text-text-secondary text-sm mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
