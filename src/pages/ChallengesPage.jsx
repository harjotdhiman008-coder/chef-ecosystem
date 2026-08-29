import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, ChevronRight, Award } from 'lucide-react';
import { formatNumber, cn } from '../utils/helpers';
import useScrollReveal from '../hooks/useScrollReveal';
import { fadeInUp, staggerContainer, staggerItem, pageTransition } from '../utils/animations';

const FILTERS = ['All', 'Active', 'Upcoming', 'Completed'];

// Mock data since we might not have a challenges data file yet
const MOCK_CHALLENGES = [
  {
    id: '1',
    title: 'The Ultimate Pasta Showdown',
    description: 'Create your most innovative pasta dish from scratch. Points for unique flavor profiles and plating.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800',
    participants: 1240,
    prize: 5000,
    status: 'Active',
    daysLeft: 3,
    sponsor: 'Barilla'
  },
  {
    id: '2',
    title: 'Vegan Dessert Master',
    description: 'Bake a decadent dessert using zero animal products. Must include a secret ingredient: Avocado.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?auto=format&fit=crop&q=80&w=800',
    participants: 850,
    prize: 3000,
    status: 'Upcoming',
    daysLeft: 10,
    sponsor: 'Oatly'
  },
  {
    id: '3',
    title: '15-Minute Meals',
    description: 'Fast, healthy, and delicious. Show us what you can cook when you only have 15 minutes.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    participants: 3200,
    prize: 2000,
    status: 'Active',
    daysLeft: 1,
    sponsor: 'ChefEcosystem'
  },
  {
    id: '4',
    title: 'Sourdough September',
    description: 'The classic bread baking challenge. Best crumb structure and ear wins.',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050eb046?auto=format&fit=crop&q=80&w=800',
    participants: 4100,
    prize: 10000,
    status: 'Completed',
    daysLeft: 0,
    sponsor: 'King Arthur'
  }
];

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, controls] = useScrollReveal();

  const filteredChallenges = MOCK_CHALLENGES.filter(c => 
    activeFilter === 'All' ? true : c.status === activeFilter
  );

  return (
    <motion.div 
      className="min-h-screen bg-cream pb-20"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Header */}
      <section className="bg-charcoal text-white pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600&h=400" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="max-container relative z-10 text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 rounded-full font-semibold text-sm mb-6 border border-gold/30">
              <Trophy className="w-4 h-4" /> Challenge Arena
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-serif font-bold mb-4 text-warm-ivory">Cooking Challenges</motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-cream max-w-2xl mx-auto">Compete with chefs globally, push your culinary boundaries, and earn ChefCoins and exclusive badges.</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-muted-cream/30 bg-warm-ivory sticky top-16 z-20">
        <div className="max-container px-4 py-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-6 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap",
                  activeFilter === filter 
                    ? "bg-deep-red text-white shadow-md" 
                    : "bg-white text-soft-charcoal hover:bg-muted-cream border border-muted-cream/30"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="section-padding max-container px-4" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredChallenges.map(challenge => (
            <motion.div key={challenge.id} variants={fadeInUp} className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover flex flex-col sm:flex-row group border border-muted-cream/20">
              <div className="w-full sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <img src={challenge.image} alt={challenge.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-3 left-3">
                  <span className={cn(
                    "px-3 py-1 text-xs font-bold rounded-full shadow-sm backdrop-blur",
                    challenge.status === 'Active' ? "bg-green-500/90 text-white" :
                    challenge.status === 'Upcoming' ? "bg-blue-500/90 text-white" :
                    "bg-gray-500/90 text-white"
                  )}>
                    {challenge.status}
                  </span>
                </div>
              </div>
              <div className="p-6 w-full sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-soft-charcoal uppercase tracking-wider mb-2">
                    Sponsored by {challenge.sponsor}
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-2 leading-tight">{challenge.title}</h3>
                  <p className="text-soft-charcoal text-sm line-clamp-2 mb-4">{challenge.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-soft-charcoal bg-warm-ivory p-3 rounded-xl">
                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {formatNumber(challenge.participants)}</div>
                    <div className="flex items-center gap-1.5 font-bold text-gold"><Award className="w-4 h-4" /> {formatNumber(challenge.prize)} CC</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {challenge.daysLeft}d left</div>
                  </div>
                  
                  <Link to={`/challenges/${challenge.id}`} className={cn(
                    "w-full py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors",
                    challenge.status === 'Active' ? "btn-primary" : "btn-secondary"
                  )}>
                    {challenge.status === 'Completed' ? 'View Results' : 'Join Challenge'} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredChallenges.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <Trophy className="w-16 h-16 text-muted-cream mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-charcoal">No challenges found</h2>
              <p className="text-soft-charcoal mt-2">Try selecting a different filter.</p>
            </div>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
}
