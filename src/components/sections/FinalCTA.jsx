import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function FloatingElement({ children, x, y, delay, duration = 6 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -10, 5, -7, 0],
        rotate: [0, 3, -2, 1, 0],
        opacity: [0.1, 0.2, 0.15, 0.2, 0.1],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function FinalCTA() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-charcoal overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern id="final-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#final-grid)" />
        </svg>

        {/* Floating elements */}
        <FloatingElement x="5%" y="20%" delay={0}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(214,168,79,0.15)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20" />
          </svg>
        </FloatingElement>
        <FloatingElement x="92%" y="30%" delay={1.5}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(122,24,32,0.15)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
          </svg>
        </FloatingElement>
        <FloatingElement x="85%" y="65%" delay={3}>
          <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
            <ellipse cx="32" cy="46" rx="14" ry="5" fill="none" stroke="rgba(214,168,79,0.1)" strokeWidth="1.5" />
            <path d="M18 46C18 30 14 20 24 16C28 14 30 14 32 14C34 14 36 14 40 16C50 20 46 30 46 46" fill="none" stroke="rgba(214,168,79,0.1)" strokeWidth="1.5" />
            <circle cx="32" cy="18" r="7" fill="none" stroke="rgba(214,168,79,0.12)" strokeWidth="1.5" />
          </svg>
        </FloatingElement>
        <FloatingElement x="10%" y="70%" delay={2}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
          </svg>
        </FloatingElement>

        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(122,24,32,0.08) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 section-padding max-container text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight">
            Your kitchen has a <span className="text-gold">story.</span>
          </h2>
          <p className="text-white/40 mt-5 text-lg sm:text-xl max-w-lg mx-auto leading-relaxed">
            Cook something. Share it. Find your people. Earn from your creativity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to="/create"
              className="group inline-flex items-center gap-2 bg-deep-red text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-dark-burgundy hover:-translate-y-0.5 hover:shadow-xl hover:shadow-deep-red/20"
            >
              <Sparkles className="w-5 h-5" />
              Start Cooking
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/communities"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5"
            >
              Explore the Community
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
