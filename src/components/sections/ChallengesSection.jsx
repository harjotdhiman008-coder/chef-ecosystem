import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Users, ArrowRight, Calendar } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { formatNumber } from '../../utils/helpers';

const CHALLENGES = [
  { id: 'ch-1', name: '7-Day Breakfast Challenge', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=250&fit=crop&auto=format&q=80', participants: 2340, prize: '500 ChefCoins', status: 'active', entries: 1892, daysLeft: 3 },
  { id: 'ch-2', name: '₹200 Dinner Challenge', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop&auto=format&q=80', participants: 1560, prize: '300 ChefCoins', status: 'active', entries: 987, daysLeft: 5 },
  { id: 'ch-3', name: 'One Ingredient Challenge', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop&auto=format&q=80', participants: 890, prize: '250 ChefCoins', status: 'upcoming', entries: 0, daysLeft: 12 },
  { id: 'ch-4', name: '30-Minute Cooking Challenge', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop&auto=format&q=80', participants: 3120, prize: '750 ChefCoins', status: 'active', entries: 2456, daysLeft: 1 },
];

function ChallengePreviewCard({ challenge }) {
  return (
    <Link to={`/challenge/${challenge.id}`} className="scroll-item group">
      <motion.div
        className="w-[300px] sm:w-[320px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <div className="relative h-[160px] overflow-hidden">
          <img src={challenge.image} alt={challenge.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Status */}
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
            challenge.status === 'active' ? 'bg-green-500 text-white' :
            challenge.status === 'upcoming' ? 'bg-blue-500 text-white' :
            'bg-charcoal/50 text-white'
          }`}>
            {challenge.status === 'active' ? '🔥 Active' : challenge.status === 'upcoming' ? '📅 Upcoming' : 'Completed'}
          </span>

          {challenge.status === 'active' && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-deep-red">
              {challenge.daysLeft}d left
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-charcoal text-base mb-2 group-hover:text-deep-red transition-colors">
            {challenge.name}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            <Trophy className="w-4 h-4 text-gold" />
            <span className="text-gold font-semibold text-sm">{challenge.prize}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-charcoal/50">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {formatNumber(challenge.participants)} joined
            </span>
            {challenge.entries > 0 && (
              <span>{formatNumber(challenge.entries)} entries</span>
            )}
          </div>

          {challenge.status === 'active' && (
            <button className="w-full mt-3 py-2 bg-deep-red text-white rounded-xl text-sm font-semibold hover:bg-dark-burgundy transition-colors">
              Join Challenge
            </button>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

export default function ChallengesSection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-warm-ivory overflow-hidden">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-container"
        >
          <div className="flex items-end justify-between mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-gold" />
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                  Challenges
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal">
                Test your skills
              </h2>
              <p className="text-charcoal/50 mt-2 text-lg">
                Compete, cook, and earn ChefCoins.
              </p>
            </div>
            <Link
              to="/challenges"
              className="hidden sm:inline-flex items-center gap-2 text-deep-red font-semibold hover:text-dark-burgundy transition-colors group"
            >
              All challenges
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="scroll-container -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 gap-5 max-container">
          {CHALLENGES.map((challenge) => (
            <ChallengePreviewCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </section>
  );
}
