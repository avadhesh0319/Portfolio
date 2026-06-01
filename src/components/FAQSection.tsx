import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef } from 'react';

const faqs = [
  {
    question: 'What technologies do you work with?',
    answer:
      "I primarily work with HTML, CSS, JavaScript, PHP, and MySQL for full-stack development. I'm also experienced with AI tools including Ollama, various AI APIs, and prompt engineering for generative AI applications.",
  },
  {
    question: 'Are you available for freelance projects?',
    answer:
      "Yes! I'm actively seeking freelance opportunities. Whether you need a modern portfolio website, an AI-powered chatbot, a full-stack web application, or UI/UX design work, I'd love to discuss your project. Feel free to reach out through the contact form above.",
  },
  {
    question: 'What is your typical project timeline?',
    answer:
      'Project timelines vary based on complexity. A simple landing page takes 2-3 days, a multi-page website 1 weeks, and full-stack applications with AI integration can take 2 weeks or more based on complexity of project. I always provide detailed timelines before starting any project.',
  },
  {
    question: 'Do you provide ongoing support after project completion?',
    answer:
      "Absolutely. I believe in building lasting relationships with clients. After project delivery, I offer support for bug fixes, minor updates, and guidance on maintaining your application. Extended support packages can be discussed for larger projects.",
  },
  {
    question: 'Can you work with AI and integrate chatbots?',
    answer:
      "Yes, AI integration is one of my specialties! I can build custom AI chatbots with features like voice interaction, multilingual support, real-time responses, and local AI using Ollama. I've also worked with image analysis, text-to-speech, and various AI APIs.",
  },
  {
    question: 'What makes your approach unique?',
    answer:
      "I combine modern design aesthetics with cutting-edge technology. My focus is on creating premium digital experiences with smooth animations, responsive interfaces, and intelligent features. I stay updated with the latest trends in AI and web development to deliver future-proof solutions.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  toggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-b border-dark-border/50"
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 text-left group"
        data-hover
      >
        <span
          className={`text-base sm:text-lg font-semibold pr-8 transition-colors duration-300 ${
            isOpen ? 'text-accent' : 'text-white group-hover:text-accent'
          }`}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'border-accent bg-accent/10'
              : 'border-dark-border group-hover:border-accent/50'
          }`}
        >
          <svg
            className={`w-4 h-4 transition-colors duration-300 ${
              isOpen ? 'text-accent' : 'text-white group-hover:text-accent'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary leading-relaxed pb-6 pr-16 text-sm sm:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 bg-dark-light/30 relative">
      <div ref={sectionRef} className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-accent text-sm font-medium uppercase tracking-[0.2em]">
              Most Asked Questions
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold"
          >
            FAQ<span className="gradient-text">s</span>
          </motion.h2>
        </motion.div>

        {/* FAQ Accordion */}
        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              toggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary text-sm mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
            data-hover
          >
            Get in touch
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
