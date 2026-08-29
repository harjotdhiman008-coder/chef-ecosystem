import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, ArrowDown, 
  ChevronRight, ChefHat, Flame, Utensils, ChevronLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem } from '../../utils/animations';
import { useTheme } from '../../contexts/ThemeContext';
import MasterChefCapIcon from '../decorative/MasterChefCapIcon';
import { CloverIcon } from '../layout/Navbar';

// Cinematic Culinary Slides with reliable high-definition imagery & videos
const HERO_SLIDES = [
  {
    id: 'sizzle',
    title: 'Tandoori Sizzle & Grills',
    headline: 'Tandoori Fire & Charcoal Grills',
    subtext: 'Live clay-oven skewers, smoking spices, and sizzling tandoori delicacies.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-food-in-a-pan-43098-large.mp4',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop&auto=format&q=85',
    tag: '🔥 Tandoori Sizzle',
    badge: 'Charcoal Roasted'
  },
  {
    id: 'dum-saute',
    title: 'Dum Biryani & Royal Sauté',
    headline: 'Royal Dum & Aromatic Sauté',
    subtext: 'Slow-cooked dum handis layered with aged basmati, saffron milk, and caramelized ghee.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vegetables-falling-into-a-pan-with-oil-43100-large.mp4',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1920&h=1080&fit=crop&auto=format&q=85',
    tag: '🍲 Dum & Sauté',
    badge: 'Slow Cooked Dum'
  },
  {
    id: 'artistry',
    title: 'Gourmet Plating & Chef Artistry',
    headline: 'Chef Artistry & Modern Plating',
    subtext: 'Exquisite food presentation, saffron garnishes, and culinary mastery.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-garnishing-a-plate-43097-large.mp4',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop&auto=format&q=85',
    tag: '✨ Chef Artistry',
    badge: 'MasterChef Plating'
  }
];

const SLIDE_DURATION = 1900; // 1.9 seconds per slide

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [cookCount, setCookCount] = useState(12842);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const { isDark } = useTheme();

  const activeSlide = HERO_SLIDES[currentSlide];

  // 3-second automatic slide transition
  useEffect(() => {
    if (!isPlaying) return;

    setProgress(0);
    const stepTime = 50; // update progress every 50ms
    const totalSteps = SLIDE_DURATION / stepTime;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep += 1;
      setProgress((currentStep / totalSteps) * 100);
    }, stepTime);

    const slideTimer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [currentSlide, isPlaying]);

  // Live cook counter simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setCookCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToPantry = (e) => {
    e.preventDefault();
    const pantryEl = document.getElementById('pantry');
    if (pantryEl) {
      pantryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen overflow-hidden flex items-center justify-center bg-[#0C0A0A]">
      {/* 1. CINEMATIC 3-SECOND SLIDING BACKGROUND WITH VIDEO & IMAGE */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image Layer (Always visible, guarantees no blank or broken video screen) */}
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.55] contrast-[1.12]"
            />

            {/* Optional HTML5 Video Overlay (if streamable) */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={activeSlide.image}
              className="absolute inset-0 w-full h-full object-cover opacity-80 brightness-[0.65] contrast-[1.1]"
            >
              <source src={activeSlide.videoUrl} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette & Theme Shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A0A] via-black/45 to-black/65 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.75)_100%)] pointer-events-none" />
      </div>

      {/* 2. HERO CONTENT OVERLAY */}
      <div className="relative z-10 section-padding max-container w-full py-16 sm:py-24 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-6 flex flex-col items-center"
        >
          {/* Eyebrow Pill with Live Slide Badge */}
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#D6A84F]/60 backdrop-blur-md text-xs sm:text-sm font-bold text-[#D6A84F] shadow-lg"
          >
            <MasterChefCapIcon className="w-5 h-5" />
            <span>THE GLOBAL SOCIAL COOKING ECOSYSTEM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-white text-xs font-semibold">{activeSlide.badge}</span>
          </motion.div>

          {/* Dynamic Headline with Smooth Transition */}
          <motion.div
            key={`headline-${activeSlide.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-md">
              Connect. Create. Cook.
              <br />
              <span className="text-gradient-gold bg-gradient-to-r from-[#D6A84F] via-yellow-300 to-[#D6A84F] bg-clip-text text-transparent">
                Earn Rewards. Shop Fresh.
              </span>
            </h1>
          </motion.div>

          {/* Subtitle & Slide Story */}
          <motion.p
            key={`sub-${activeSlide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-base sm:text-xl text-[#F7EEDB]/90 max-w-2xl font-normal leading-relaxed drop-shadow-sm"
          >
            {activeSlide.subtext} Match what's in your fridge with <strong>zero food waste</strong> and earn ChefCoins with every bite.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
          >
            <a
              href="#pantry"
              onClick={scrollToPantry}
              className="group inline-flex items-center gap-2.5 bg-[#D6A84F] text-[#141212] px-8 py-4 rounded-2xl font-extrabold text-sm sm:text-base transition-all duration-300 hover:bg-yellow-400 hover:scale-105 active:scale-95 shadow-xl shadow-[#D6A84F]/30"
            >
              <Sparkles className="w-5 h-5" />
              <span>Match My Pantry Ingredients</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <Link
              to="/discover"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              <span>Explore Cuisines</span>
            </Link>
          </motion.div>

          {/* Active Cooks & Reward Stats */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs sm:text-sm text-[#F7EEDB]/80"
          >
            <div className="flex items-center gap-2 bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
              <span><strong className="text-green-400">{cookCount.toLocaleString()}</strong> cooks live in kitchen</span>
            </div>

            <div className="flex items-center gap-1.5 bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xs">
              <MasterChefCapIcon className="w-4 h-4" />
              <span>Earn <strong>ChefCoins</strong> on every recipe</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. INTERACTIVE 3-SECOND SLIDE CONTROLS (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-black/70 p-2 rounded-2xl border border-white/15 backdrop-blur-md shadow-2xl">
        {/* Previous slide arrow */}
        <button
          onClick={handlePrevSlide}
          className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Previous slide"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Tabs with 3-Second Progress Bar */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = currentSlide === idx;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`relative overflow-hidden px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'text-[#141212] bg-[#D6A84F] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {/* 3s Active Progress Fill Bar */}
              {isActive && isPlaying && (
                <motion.div
                  className="absolute inset-0 bg-yellow-300 opacity-40 origin-left"
                  style={{ width: `${progress}%` }}
                />
              )}
              <span className="relative z-10">{slide.tag}</span>
            </button>
          );
        })}

        {/* Next slide arrow */}
        <button
          onClick={handleNextSlide}
          className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Next slide"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-white/20 mx-1" />

        {/* Play / Pause Toggle */}
        <button
          onClick={togglePlay}
          className="p-2 rounded-xl text-white hover:bg-white/15 transition-colors"
          title={isPlaying ? 'Pause 3s auto-slide' : 'Resume auto-slide'}
          aria-label="Toggle auto-slide"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        {/* Mute / Audio Toggle */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-xl text-white hover:bg-white/15 transition-colors"
          title={isMuted ? 'Unmute audio' : 'Mute audio'}
          aria-label="Toggle audio"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 4. SCROLL DOWN TO EXPLORE PROMPT (Bottom Center) */}
      <a
        href="#pantry"
        onClick={scrollToPantry}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/70 hover:text-gold transition-colors cursor-pointer group"
      >
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D6A84F] group-hover:underline">
          Scroll to explore features
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-[#D6A84F]/50 flex items-center justify-center bg-black/40 backdrop-blur-xs"
        >
          <ArrowDown className="w-4 h-4 text-gold" />
        </motion.div>
      </a>
    </section>
  );
}
