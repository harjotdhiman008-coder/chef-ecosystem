import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Zap, Coffee, Moon, Sun, Utensils } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTheme } from '../../contexts/ThemeContext';
import { CloverIcon } from '../layout/Navbar';

const MOODS = [
  { id: 'comfort', emoji: '🫂', name: 'Craving Comfort', vibe: 'Soul Food', color: 'from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/30' },
  { id: 'happy', emoji: '✨', name: 'Pure Joy', vibe: 'Celebratory', color: 'from-yellow-500/20 to-amber-500/20 text-yellow-500 border-yellow-500/30' },
  { id: 'energetic', emoji: '🔥', name: 'Spicy & Fiery', vibe: 'High Voltage', color: 'from-red-500/20 to-orange-500/20 text-red-500 border-red-500/30' },
  { id: 'lazy', emoji: '🛋️', name: 'Lazy & Cozy', vibe: '<15 Min Effort', color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30' },
  { id: 'healthy', emoji: '🌱', name: 'Clean & Fresh', vibe: 'High Protein', color: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30' },
  { id: 'romantic', emoji: '🕯️', name: 'Date Night', vibe: 'Candlelight Vibe', color: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30' },
  { id: 'street', emoji: '🍢', name: 'Street Food Cravings', vibe: 'Chatpata & Tangy', color: 'from-orange-500/20 to-yellow-500/20 text-orange-400 border-orange-500/30' },
  { id: 'sweet', emoji: '🍯', name: 'Sweet Tooth', vibe: 'Mithai & Chocolate', color: 'from-amber-600/20 to-yellow-600/20 text-amber-400 border-amber-500/30' },
];

const MOOD_RECOMMENDATIONS = {
  comfort: {
    title: 'Warm dishes that feel like a warm hug 🫂',
    subtitle: 'When the world is loud, your kitchen should be your sanctuary.',
    dishes: [
      { name: '24-Hr Dal Makhani & Garlic Naan', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Charcoal-infused black lentils simmered with white butter and fresh cream.' },
      { name: 'Desi Ghee Moong Dal Khichdi', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Soothing golden comfort with sizzling cumin ghee tadka and roasted papad.' },
      { name: 'Classic Butter Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae328?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Tandoori-charred chicken bathed in a velvety, sweet-spiced cashew tomato makhani.' }
    ]
  },
  happy: {
    title: 'Celebrate life with bursting aromas ✨',
    subtitle: 'Bright colors, fresh herbs, and unforgettable festive flavors.',
    dishes: [
      { name: 'Royal Hyderabadi Dum Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Aged basmati rice, saffron threads, fried birista onions, and fragrant desi spices.' },
      { name: 'Kesar Pista Rasmalai', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Soft cottage cheese patties submerged in chilled saffron cardamom milk.' },
      { name: 'Crispy Paneer Tikka Shashlik', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Golden charred paneer cubes with bell peppers and zesty pudina chutney.' }
    ]
  },
  energetic: {
    title: 'Bold, spicy & electrifying bites 🔥',
    subtitle: 'Fuel your fire with intense chili kicks and tandoori sizzle.',
    dishes: [
      { name: 'Kashmiri Mutton Rogan Josh', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Melt-in-mouth mutton slow-cooked with whole spices, Kashmiri chili, and fennel.' },
      { name: 'Korean Honey-Chili Fried Chicken', image: 'https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Double-fried crunchy wings glazed in sweet-spicy gochujang and sesame.' },
      { name: 'Amritsari Pindi Chole Bhature', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Dark tangy spiced chickpeas served with balloon-puffed piping hot bhaturas.' }
    ]
  },
  street: {
    title: 'Chatpata street cravings satisfied 🍢',
    subtitle: 'The authentic roadside culinary magic of Mumbai, Delhi, and Kolkata.',
    dishes: [
      { name: 'Mumbai Chowpatty Pav Bhaji', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Mashed spicy buttery vegetables served with warm tawa-toasted ladi pav.' },
      { name: 'Kolkata Paneer Kathi Roll', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Flaky layered paratha packed with tandoori paneer tikka, crunchy onions, and green chutney.' },
      { name: 'Crispy Ghee Roast Masala Dosa', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Paper-thin golden crepe stuffed with tempered spiced potatoes and coconut chutney.' }
    ]
  },
  sweet: {
    title: 'Indulge your sweetest desires 🍯',
    subtitle: 'Decadent desserts made with pure ingredients, nuts, and love.',
    dishes: [
      { name: 'Royal Shahi Gulab Jamun', image: 'https://images.unsplash.com/photo-1666190100906-2bb8d5cf1e0f?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Desi ghee fried mawa dumplings stuffed with pistachios and soaked in saffron syrup.' },
      { name: 'Molten Chocolate Lava Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Rich dark chocolate cake with an irresistible warm flowing molten core.' },
      { name: 'Kesar Rabdi Rasmalai', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Soft melt-in-mouth chenna discs steeped in thick cardamom saffron rabdi.' }
    ]
  },
  healthy: {
    title: 'Nourish your body and mind 🌱',
    subtitle: 'Wholesome, clean ingredients with high natural protein & vibrant micronutrients.',
    dishes: [
      { name: 'Kerala Malabar Prawn Curry', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Lean coastal prawns simmered with fresh coconut milk, kokum, and turmeric.' },
      { name: 'Mediterranean Sprouted Grain Bowl', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Quinoa, sprouted pulses, baby greens, roasted chickpeas, and lemon-tahini dressing.' },
      { name: 'Fluffy Steamed Idli & Sambar', image: 'https://images.unsplash.com/photo-1589301760435-2d423b8f7a03?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Naturally fermented steamed rice cakes with vegetable-packed toor dal sambar.' }
    ]
  },
  lazy: {
    title: 'Maximum flavor with minimum effort 🛋️',
    subtitle: 'Ready in under 20 minutes with zero kitchen stress.',
    dishes: [
      { name: 'Creamy Garlic Parmesan Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Silky 15-minute pasta in roasted garlic cream and cracked black pepper.' },
      { name: 'Quick Tawa Paneer Wrap', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Quick pan-seared paneer cubes rolled in warm flatbread with chaat masala.' },
      { name: 'Instant Ghee Tadka Khichdi', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&auto=format&q=80', reason: 'One-pot pressure cooker comfort ready in 15 minutes.' }
    ]
  },
  romantic: {
    title: 'Candlelight culinary magic 🕯️',
    subtitle: 'Elegant, intimate dishes crafted for unforgettable evenings.',
    dishes: [
      { name: 'Wild Mushroom Truffle Risotto', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Slow-stirred creamy Arborio rice with porcini mushrooms and Grana Padano.' },
      { name: 'Royal Awadhi Biryani Platter', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Scented with kewra, saffron, and tender cuts cooked on royal dum.' },
      { name: 'Decadent Dark Chocolate Lava Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format&q=80', reason: 'Warm molten chocolate shared with a scoop of Madagascar vanilla bean gelato.' }
    ]
  }
};

export default function MoodDiscovery() {
  const [selectedMood, setSelectedMood] = useState('comfort');
  const [ref, isVisible] = useScrollReveal();
  const { isDark } = useTheme();

  const activeRec = MOOD_RECOMMENDATIONS[selectedMood] || MOOD_RECOMMENDATIONS.comfort;

  return (
    <section ref={ref} className={`py-16 sm:py-20 lg:py-24 transition-colors duration-300 relative overflow-hidden ${
      isDark ? 'bg-[#141212]' : 'bg-[#FAF6F0]'
    }`}>
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D6A84F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-padding max-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/40 text-xs font-bold text-[#D6A84F] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MOOD-BASED CULINARY PSYCHOLOGY</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-3 ${
              isDark ? 'text-white' : 'text-[#1E1B18]'
            }`}>
              How are you feeling right now?
            </h2>
            <p className={`text-sm sm:text-base max-w-lg mx-auto ${
              isDark ? 'text-[#D8CABB]/70' : 'text-[#5C5248]'
            }`}>
              Food is emotion. Tap your current state of mind and let our culinary intuition suggest the perfect comfort dish.
            </p>
          </div>

          {/* Mood Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto mb-10">
            {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <motion.button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm ${
                    isSelected
                      ? 'bg-[#D6A84F] text-[#141212] border-[#D6A84F] shadow-lg shadow-[#D6A84F]/20 font-extrabold scale-105'
                      : isDark
                        ? 'bg-[#1E1A1A] hover:bg-[#282222] text-[#D8CABB] border-[#332A2A]'
                        : 'bg-white hover:bg-[#F2E8DA] text-[#4A3F33] border-[#DFD1BD]'
                  }`}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span>{mood.name}</span>
                  <span className={`text-[10px] font-normal px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#141212]/20 text-[#141212]' : 'bg-black/10 text-gold'
                  }`}>
                    {mood.vibe}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Recommendations Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMood}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
                isDark ? 'bg-[#1A1616] border-[#332A2A]' : 'bg-white border-[#E5D7C5]'
              }`}
            >
              <div className="text-center mb-8">
                <h3 className={`text-2xl sm:text-3xl font-serif font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-[#1E1B18]'
                }`}>
                  {activeRec.title}
                </h3>
                <p className={`text-sm sm:text-base ${
                  isDark ? 'text-[#D8CABB]/60' : 'text-[#6C5E50]'
                }`}>
                  {activeRec.subtitle}
                </p>
              </div>

              {/* 3 Recipe Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeRec.dishes.map((dish, idx) => (
                  <motion.div
                    key={dish.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col ${
                      isDark 
                        ? 'bg-[#141212] border-[#2E2424] hover:border-[#D6A84F]/50' 
                        : 'bg-[#FAF6F0] border-[#E2D5C3] hover:border-[#D6A84F]'
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-3 text-xs font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        Chef Curated
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className={`font-serif text-lg font-bold mb-1.5 ${
                          isDark ? 'text-[#F7EEDB]' : 'text-[#1E1B18]'
                        }`}>
                          {dish.name}
                        </h4>
                        <p className={`text-xs leading-relaxed italic ${
                          isDark ? 'text-[#D8CABB]/70' : 'text-[#5C5248]'
                        }`}>
                          "{dish.reason}"
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#D6A84F]/15 flex items-center justify-between">
                        <Link
                          to="/recipe/recipe-1"
                          className="text-xs font-bold text-gold hover:text-yellow-400 flex items-center gap-1 transition-colors"
                        >
                          <span>Cook this mood</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-[10px] text-green-500 font-semibold flex items-center gap-1">
                          <CloverIcon className="w-3 h-3" /> Ready in 30m
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
