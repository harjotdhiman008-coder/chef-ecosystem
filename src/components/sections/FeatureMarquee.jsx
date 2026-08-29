import { motion } from 'framer-motion';

const ITEMS = [
  { text: 'DISCOVER CUISINES', icon: '🌍' },
  { text: 'SHARE RECIPES', icon: '✦' },
  { text: 'COOK TOGETHER', icon: '🍳' },
  { text: 'EARN CHEFCOINS', icon: '✦' },
  { text: 'JOIN COMMUNITIES', icon: '👥' },
  { text: 'SELL FROM HOME', icon: '✦' },
  { text: 'DISCOVER NEW FLAVOURS', icon: '🔥' },
  { text: 'RATE & REVIEW', icon: '✦' },
  { text: 'COOK THREADS', icon: '🍜' },
  { text: 'MOOD FOOD', icon: '✦' },
  { text: 'CHALLENGES', icon: '🏆' },
  { text: 'CREATOR REWARDS', icon: '✦' },
];

export default function FeatureMarquee() {
  // Duplicate items for seamless loop
  const duplicatedItems = [...ITEMS, ...ITEMS];

  return (
    <section className="relative py-4 bg-cream border-y border-muted-cream/50 overflow-hidden group">
      <div
        className="flex items-center gap-6 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{ width: 'max-content' }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="text-sm sm:text-base font-semibold tracking-[0.2em] text-charcoal/70 uppercase">
              {item.text}
            </span>
            <span className="text-deep-red/40 text-xs">{item.icon}</span>
          </div>
        ))}
      </div>

      {/* Edge fade effects */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
    </section>
  );
}
