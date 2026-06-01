import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { icons } from './icons';

const interests = [
  'Web Design',
  'AI Chatbot',
  'Frontend Dev',
  'Full Stack',
  'Freelance',
  'Internship',
  'Other',
];

const TARGET_EMAIL = 'sharmaavadhesh142@gmail.com';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ── popup state ── */
  const [popup, setPopup] = useState<{
    show: boolean;
    type: 'error' | 'success';
    title: string;
    text: string;
  }>({ show: false, type: 'error', title: '', text: '' });

  const showPopup = (
    type: 'error' | 'success',
    title: string,
    text: string
  ) => {
    setPopup({ show: true, type, title, text });
  };

  const closePopup = () => setPopup((p) => ({ ...p, show: false }));

  /* ── validation ── */
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  /* ── submit handler ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      showPopup('error', 'Name Required', 'Please enter your name before sending the message.');
      return;
    }
    if (!trimmedEmail) {
      showPopup('error', 'Email Required', 'Please enter your email address so I can get back to you.');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      showPopup('error', 'Invalid Email', 'Please enter a valid email address (e.g. you@example.com).');
      return;
    }
    if (!selectedInterest) {
      showPopup('error', 'Interest Required', 'Please select what you\'re interested in from the options above.');
      return;
    }
    if (!trimmedMessage) {
      showPopup('error', 'Message Required', 'Please write a short message about your project or inquiry.');
      return;
    }

    setSending(true);

    // Build email content
    const subject = `Portfolio Contact: ${selectedInterest} — from ${trimmedName}`;
    const body = [
      `Hi Avadhesh,`,
      ``,
      `You have a new message from your portfolio website:`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `Name:        ${trimmedName}`,
      `Email:       ${trimmedEmail}`,
      `Interested:  ${selectedInterest}`,
      ``,
      `Message:`,
      `${trimmedMessage}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `Sent via Portfolio Contact Form`,
    ].join('\n');

    const mailtoLink =
      `mailto:${TARGET_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    // Small delay for visual feedback
    await new Promise((r) => setTimeout(r, 600));

    // Open the mailto link
    window.location.href = mailtoLink;

    setSending(false);
    setSubmitted(true);

    showPopup(
      'success',
      'Email Client Opened!',
      'Your email client has been opened with all the details pre-filled. Just hit Send in your email app to deliver the message to Avadhesh.'
    );

    // Reset form after a delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setSelectedInterest('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-dark-light/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-accent text-sm font-medium uppercase tracking-[0.2em]">
              Contact
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
            Let's Build Something
            <br />
            <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-md mx-auto">
            Have a project idea? Let's bring it to life together.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { iconKey: 'mail', label: 'Email', value: TARGET_EMAIL },
            { iconKey: 'phone', label: 'Phone', value: '8591231893' },
            { iconKey: 'pin', label: 'Location', value: 'Navi Mumbai, Maharashtra' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-5 text-center neon-border hover:shadow-[0_0_25px_rgba(145,174,196,0.1)] transition-all duration-500"
            >
              <span className="w-6 h-6 mb-2 block mx-auto text-accent">
                {icons[item.iconKey]({ className: 'w-6 h-6', color: 'var(--color-accent)' })}
              </span>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-white text-sm font-medium break-all">
                {item.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ════════ Form ════════ */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 sm:p-10 neon-border space-y-6"
          noValidate
        >
          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-text-secondary text-sm mb-2 block">
                Your Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-dark/60 border border-dark-border rounded-xl px-5 py-4 text-white placeholder-text-muted focus:border-accent/60 focus:shadow-[0_0_15px_rgba(145,174,196,0.1)] focus:outline-none transition-all duration-300 text-sm"
              />
            </div>
            <div>
              <label className="text-text-secondary text-sm mb-2 block">
                Your Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full bg-dark/60 border border-dark-border rounded-xl px-5 py-4 text-white placeholder-text-muted focus:border-accent/60 focus:shadow-[0_0_15px_rgba(145,174,196,0.1)] focus:outline-none transition-all duration-300 text-sm"
              />
            </div>
          </div>

          {/* Interest Tags */}
          <div>
            <label className="text-text-secondary text-sm mb-3 block">
              I'm interested in... <span className="text-accent">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => setSelectedInterest(interest)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedInterest === interest
                      ? 'bg-accent text-dark shadow-[0_0_15px_rgba(145,174,196,0.3)]'
                      : 'border border-dark-border text-text-secondary hover:border-accent/40 hover:text-white'
                  }`}
                  data-hover
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-text-secondary text-sm mb-2 block">
              Your Message <span className="text-accent">*</span>
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              className="w-full bg-dark/60 border border-dark-border rounded-xl px-5 py-4 text-white placeholder-text-muted focus:border-accent/60 focus:shadow-[0_0_15px_rgba(145,174,196,0.1)] focus:outline-none transition-all duration-300 resize-none text-sm"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={sending}
            whileHover={{ scale: sending ? 1 : 1.02 }}
            whileTap={{ scale: sending ? 1 : 0.98 }}
            className={`w-full py-4 font-bold rounded-full transition-all duration-500 text-sm uppercase tracking-wider flex items-center justify-center gap-2 ${
              submitted
                ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                : sending
                ? 'bg-accent/60 text-dark/70 cursor-wait'
                : 'bg-accent text-dark hover:shadow-[0_0_40px_rgba(145,174,196,0.3)]'
            }`}
            data-hover
          >
            {sending ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Preparing...
              </>
            ) : submitted ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Email Client Opened!
              </>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </motion.form>
      </div>

      {/* ════════ POPUP MODAL ════════ */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closePopup}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-sm glass-strong rounded-3xl p-8 text-center"
              style={{
                border: `1px solid ${
                  popup.type === 'error'
                    ? 'rgba(239, 68, 68, 0.3)'
                    : 'rgba(57, 255, 20, 0.3)'
                }`,
                boxShadow:
                  popup.type === 'error'
                    ? '0 0 40px rgba(239, 68, 68, 0.1)'
                    : '0 0 40px rgba(57, 255, 20, 0.1)',
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{
                  background:
                    popup.type === 'error'
                      ? 'rgba(239, 68, 68, 0.1)'
                      : 'rgba(57, 255, 20, 0.1)',
                  border: `1px solid ${
                    popup.type === 'error'
                      ? 'rgba(239, 68, 68, 0.3)'
                      : 'rgba(57, 255, 20, 0.3)'
                  }`,
                }}
              >
                {popup.type === 'error' ? (
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>

              <h3 className="text-white text-lg font-display font-bold mb-2">
                {popup.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {popup.text}
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={closePopup}
                className={`w-full py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  popup.type === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-accent text-dark hover:shadow-[0_0_25px_rgba(145,174,196,0.3)]'
                }`}
                data-hover
              >
                OK
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
