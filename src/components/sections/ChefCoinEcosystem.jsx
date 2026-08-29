import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShoppingCart, TrendingUp, Heart, Share2, Eye } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Inline ChefHatIcon
function ChefHat({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <ellipse cx="32" cy="46" rx="14" ry="5" fill="white" stroke="#D6A84F" strokeWidth="1.5" />
      <path d="M18 46C18 30 14 20 24 16C28 14 30 14 32 14C34 14 36 14 40 16C50 20 46 30 46 46" fill="white" stroke="#D6A84F" strokeWidth="1.5" />
      <circle cx="32" cy="18" r="7" fill="white" stroke="#D6A84F" strokeWidth="1.5" />
      <circle cx="25" cy="22" r="5" fill="white" stroke="#D6A84F" strokeWidth="1" />
      <circle cx="39" cy="22" r="5" fill="white" stroke="#D6A84F" strokeWidth="1" />
      <rect x="20" y="42" width="24" height="3" rx="1.5" fill="#D6A84F" opacity="0.4" />
    </svg>
  );
}

const EARN_ACTIONS = [
  { icon: Heart, label: '100 likes', coins: 10, color: 'text-red-500' },
  { icon: Eye, label: '500 impressions', coins: 15, color: 'text-blue-500' },
  { icon: Share2, label: '50 shares', coins: 20, color: 'text-green-500' },
  { icon: TrendingUp, label: 'Recipe trending', coins: 50, color: 'text-purple-500' },
];

export default function ChefCoinEcosystem() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-soft-charcoal overflow-hidden relative">
      {/* Floating chef hats */}
      <motion.div
        className="absolute top-10 right-10 opacity-10"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <ChefHat size={80} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 opacity-5"
        animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      >
        <ChefHat size={60} />
      </motion.div>

      <div className="section-padding max-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              animate={{ rotate: [0, 5, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-4"
            >
              <ChefHat size={56} />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              Cook. Create. <span className="text-gold">Collect.</span>
            </h2>
            <p className="text-white/40 mt-3 text-lg max-w-lg mx-auto">
              Earn ChefCoins from your content and community engagement. Use them toward groceries.
            </p>
          </div>

          {/* Three-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Create & Earn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-charcoal rounded-2xl p-6 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-deep-red/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-deep-red" />
                </div>
                <h3 className="text-white font-semibold text-lg">Create & Earn</h3>
              </div>

              <div className="space-y-4">
                {EARN_ACTIONS.map((action) => (
                  <div key={action.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <action.icon className={`w-4 h-4 ${action.color}`} />
                      <span className="text-white/60 text-sm">{action.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gold font-semibold text-sm">+{action.coins}</span>
                      <ChefHat size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Wallet Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-b from-gold/20 to-charcoal rounded-2xl p-6 border border-gold/20 relative overflow-hidden"
            >
              <div className="text-center relative z-10">
                <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Your Kitchen Wallet</p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <ChefHat size={36} />
                  <span className="text-5xl font-bold text-white">1,248</span>
                </div>
                <p className="text-gold font-medium mb-6">ChefCoins</p>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/40 text-xs">Lifetime Earned</p>
                    <p className="text-white font-semibold mt-0.5">3,420</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/40 text-xs">This Month</p>
                    <p className="text-white font-semibold mt-0.5">+248</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-white/30 text-xs mb-2">Redemption Value</p>
                  <p className="text-gold text-2xl font-bold">₹1,248</p>
                  <p className="text-white/40 text-xs mt-1">1 ChefCoin = ₹1</p>
                </div>
              </div>
            </motion.div>

            {/* Shop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-charcoal rounded-2xl p-6 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-white font-semibold text-lg">Shop with ChefCoins</h3>
              </div>

              <p className="text-white/40 text-sm mb-6">
                Turn your recipe into a grocery basket. Use ChefCoins toward your next order.
              </p>

              <div className="space-y-3">
                {['Blinkit', 'Instamart', 'BigBasket'].map((partner, idx) => (
                  <div key={partner} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        idx === 0 ? 'bg-yellow-500 text-charcoal' :
                        idx === 1 ? 'bg-orange-500 text-white' :
                        'bg-green-500 text-white'
                      }`}>
                        {partner[0]}
                      </div>
                      <span className="text-white/70 text-sm font-medium">{partner}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30" />
                  </div>
                ))}
              </div>

              <Link
                to="/grocery"
                className="block mt-6 text-center text-gold text-sm font-semibold hover:text-yellow-400 transition-colors"
              >
                Learn more about grocery redemption →
              </Link>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Link
              to="/wallet"
              className="inline-flex items-center gap-2 bg-gold text-charcoal px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ChefHat size={18} />
              View Your Kitchen Wallet
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
