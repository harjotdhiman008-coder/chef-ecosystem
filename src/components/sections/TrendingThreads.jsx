import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Heart, Eye } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { formatNumber } from '../../utils/helpers';

const COOK_THREADS = [
  {
    id: 'thread-1', title: 'My 20-minute spicy ramen experiment 🍜', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format&q=80',
    creator: 'Min-jun Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format',
    replies: 24, likes: 892, views: 12400, cuisine: 'Japanese',
    replyAvatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format',
    ],
  },
  {
    id: 'thread-2', title: 'Attempted Nonna\'s carbonara — here\'s what happened 🍝', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop&auto=format&q=80',
    creator: 'Marco DeLuca', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format',
    replies: 42, likes: 1240, views: 18900, cuisine: 'Italian',
    replyAvatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&auto=format',
    ],
  },
  {
    id: 'thread-3', title: 'Biryani from scratch — the 3-hour journey 🍚', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=400&h=300&fit=crop&auto=format&q=80',
    creator: 'Chef Priya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format',
    replies: 67, likes: 2340, views: 34500, cuisine: 'North Indian',
    replyAvatars: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format',
    ],
  },
  {
    id: 'thread-4', title: 'Making Korean fried chicken crispier than takeout 🍗', image: 'https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=400&h=300&fit=crop&auto=format&q=80',
    creator: 'The Spice Lab', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format',
    replies: 31, likes: 1567, views: 22100, cuisine: 'Korean',
    replyAvatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format',
    ],
  },
];

function ThreadCard({ thread }) {
  return (
    <Link to={`/cook-thread/${thread.id}`} className="scroll-item group">
      <motion.div
        className="w-[300px] sm:w-[340px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        {/* Image */}
        <div className="relative h-[180px] overflow-hidden">
          <img src={thread.image} alt={thread.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-deep-red text-white">
            Cook Thread
          </span>
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-charcoal">
            {thread.cuisine}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-charcoal leading-snug mb-3 line-clamp-2 group-hover:text-deep-red transition-colors">
            {thread.title}
          </h3>

          {/* Creator */}
          <div className="flex items-center gap-2 mb-3">
            <img src={thread.avatar} alt={thread.creator} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-sm text-charcoal/60">{thread.creator}</span>
          </div>

          {/* Reply avatars */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-2">
              {thread.replyAvatars.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt="Reply author"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
              ))}
              {thread.replies > 3 && (
                <div className="w-6 h-6 rounded-full border-2 border-white bg-cream flex items-center justify-center text-[10px] font-medium text-charcoal/60">
                  +{thread.replies - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-charcoal/40">{thread.replies} variations</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-charcoal/50 pt-3 border-t border-cream">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" /> {formatNumber(thread.likes)}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> {thread.replies}
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <Eye className="w-3.5 h-3.5" /> {formatNumber(thread.views)}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function TrendingThreads() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-cream overflow-hidden">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-container"
        >
          {/* Header */}
          <div className="flex items-end justify-between mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4 text-deep-red" />
                <span className="text-deep-red text-sm font-semibold tracking-widest uppercase">
                  Cook Threads
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal">
                Cooking is better together
              </h2>
              <p className="text-charcoal/50 mt-2 text-lg">
                Recipes that evolve through community participation.
              </p>
            </div>
            <Link
              to="/feed"
              className="hidden sm:inline-flex items-center gap-2 text-deep-red font-semibold hover:text-dark-burgundy transition-colors group"
            >
              View all threads
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="scroll-container -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 gap-5 max-container">
          {COOK_THREADS.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      </div>
    </section>
  );
}
