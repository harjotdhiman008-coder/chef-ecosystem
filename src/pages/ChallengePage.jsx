import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, Award, ChevronRight, Share2, Info, CheckCircle2, Star } from 'lucide-react';
import { formatNumber, cn } from '../utils/helpers';
import useScrollReveal from '../hooks/useScrollReveal';
import { fadeInUp, staggerContainer, pageTransition } from '../utils/animations';

// Mock data
const CHALLENGE = {
  id: '1',
  title: 'The Ultimate Pasta Showdown',
  description: 'Create your most innovative pasta dish from scratch. Points for unique flavor profiles, perfect al dente texture, and exceptional plating. This is your chance to shine in front of top culinary judges and win big.',
  image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1600&h=600',
  participants: 1240,
  prize: 5000,
  status: 'Active',
  dates: 'Oct 1 - Oct 15, 2023',
  sponsor: 'Barilla',
  rules: [
    'Pasta must be made entirely from scratch.',
    'Video submission required showing the dough-making process.',
    'Final dish must be plated and well-lit.',
    'Include full recipe and ingredient list.',
    'One entry per user.'
  ],
  leaderboard: [
    { rank: 1, name: 'Elena Rossi', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', score: 98 },
    { rank: 2, name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', score: 95 },
    { rank: 3, name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', score: 92 },
    { rank: 4, name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', score: 89 },
    { rank: 5, name: 'Anita Patel', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', score: 88 },
  ],
  entries: [
    { id: 1, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400', author: 'Elena Rossi', likes: 1200 },
    { id: 2, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=400', author: 'Marcus Chen', likes: 950 },
    { id: 3, image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&w=400', author: 'Sarah Jenkins', likes: 820 },
    { id: 4, image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=400', author: 'David Kim', likes: 780 },
    { id: 5, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=400', author: 'Anita Patel', likes: 650 },
    { id: 6, image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=400', author: 'Chef Gordon', likes: 500 },
  ]
};

export default function ChallengePage() {
  const { challengeId } = useParams();
  const [ref, controls] = useScrollReveal();
  const challenge = CHALLENGE; // In real app, fetch by ID

  return (
    <motion.div 
      className="min-h-screen bg-cream pb-20"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Hero Image */}
      <div className="h-[40vh] md:h-[50vh] relative w-full">
        <img src={challenge.image} alt={challenge.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 max-container px-4 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{challenge.status}</span>
                <span className="text-sm font-medium flex items-center gap-1 bg-black/30 backdrop-blur px-3 py-1 rounded-full"><Clock className="w-4 h-4" /> {challenge.dates}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-warm-ivory leading-tight">{challenge.title}</h1>
              <p className="text-lg text-muted-cream max-w-2xl">{challenge.description}</p>
            </div>
            
            <div className="flex gap-3">
              <button className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors border border-white/20">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="btn-primary px-8 py-3 rounded-full text-lg shadow-lg shadow-deep-red/30">
                Submit Entry
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-container px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12" ref={ref}>
        {/* Main Content */}
        <motion.div className="lg:col-span-2 space-y-12" variants={staggerContainer} initial="hidden" animate={controls}>
          
          {/* Stats Bar */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 shadow-sm border border-muted-cream/30 flex flex-wrap gap-8 justify-around">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-soft-charcoal mb-1"><Users className="w-5 h-5" /> Participants</div>
              <div className="text-2xl font-bold text-charcoal">{formatNumber(challenge.participants)}</div>
            </div>
            <div className="w-px bg-muted-cream/30 hidden md:block"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-soft-charcoal mb-1"><Award className="w-5 h-5" /> Prize Pool</div>
              <div className="text-2xl font-bold text-gold flex items-center justify-center gap-1">{formatNumber(challenge.prize)} <span className="text-sm text-soft-charcoal">CC</span></div>
            </div>
            <div className="w-px bg-muted-cream/30 hidden md:block"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-soft-charcoal mb-1"><Star className="w-5 h-5" /> Sponsor</div>
              <div className="text-xl font-bold text-charcoal">{challenge.sponsor}</div>
            </div>
          </motion.div>

          {/* Rules */}
          <motion.div variants={fadeInUp} className="bg-warm-ivory rounded-3xl p-8 border border-muted-cream/40">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-deep-red" /> Challenge Rules
            </h2>
            <ul className="space-y-4">
              {challenge.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-charcoal text-lg">{rule}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Entries Gallery */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-charcoal">Recent Entries</h2>
              <button className="text-deep-red font-semibold hover:underline flex items-center text-sm">View All <ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {challenge.entries.map(entry => (
                <div key={entry.id} className="relative group rounded-xl overflow-hidden aspect-[4/5] cursor-pointer">
                  <img src={entry.image} alt={entry.author} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                    <p className="font-semibold">{entry.author}</p>
                    <p className="text-xs flex items-center gap-1"><Star className="w-3 h-3 text-gold fill-gold" /> {entry.likes} likes</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* Sidebar */}
        <motion.div className="space-y-8" variants={staggerContainer} initial="hidden" animate={controls}>
          
          {/* Submit CTA */}
          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-deep-red to-dark-burgundy rounded-3xl p-8 text-white shadow-xl text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gold" />
            <h3 className="text-2xl font-serif font-bold mb-2 text-warm-ivory">Ready to Cook?</h3>
            <p className="text-white/80 mb-6">Show the community what you've got and compete for the top prize.</p>
            <button className="w-full bg-white text-deep-red font-bold py-3 rounded-full hover:bg-warm-ivory transition-colors shadow-lg">
              Upload Your Entry
            </button>
          </motion.div>

          {/* Leaderboard */}
          <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-6 border border-muted-cream/30 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-charcoal mb-6 flex items-center gap-2 border-b border-muted-cream/30 pb-4">
              <Trophy className="w-5 h-5 text-gold" /> Leaderboard
            </h3>
            <div className="space-y-4">
              {challenge.leaderboard.map((user, idx) => (
                <div key={user.rank} className="flex items-center gap-4 p-2 hover:bg-warm-ivory rounded-xl transition-colors cursor-pointer group">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                    idx === 0 ? "bg-gold text-white shadow-md" : 
                    idx === 1 ? "bg-gray-300 text-charcoal shadow-sm" : 
                    idx === 2 ? "bg-[#CD7F32] text-white shadow-sm" : 
                    "bg-muted-cream/30 text-soft-charcoal"
                  )}>
                    {user.rank}
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-muted-cream" />
                  <div className="flex-1">
                    <h4 className="font-bold text-charcoal group-hover:text-deep-red transition-colors">{user.name}</h4>
                  </div>
                  <div className="font-bold text-deep-red">{user.score} pts</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-semibold text-soft-charcoal hover:text-charcoal border border-muted-cream rounded-xl hover:bg-muted-cream/20 transition-colors">
              View Full Standings
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
