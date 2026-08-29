import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CUISINES_PREVIEW = [
  { id: 'italian', name: 'Italian', region: 'Europe', dishCount: 248, image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=300&fit=crop&auto=format&q=80', color: '#C41E3A' },
  { id: 'japanese', name: 'Japanese', region: 'Asia', dishCount: 312, image: 'https://images.unsplash.com/photo-1553621042-f16356401f0d?w=400&h=300&fit=crop&auto=format&q=80', color: '#E5383B' },
  { id: 'north-indian', name: 'North Indian', region: 'South Asia', dishCount: 456, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format&q=80', color: '#D6A84F' },
  { id: 'mexican', name: 'Mexican', region: 'Americas', dishCount: 189, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop&auto=format&q=80', color: '#E85D04' },
  { id: 'korean', name: 'Korean', region: 'Asia', dishCount: 203, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop&auto=format&q=80', color: '#BA181B' },
  { id: 'thai', name: 'Thai', region: 'Southeast Asia', dishCount: 178, image: 'https://images.unsplash.com/photo-1562565652-7bc1c3da3c04?w=400&h=300&fit=crop&auto=format&q=80', color: '#F48C06' },
  { id: 'mediterranean', name: 'Mediterranean', region: 'Mediterranean', dishCount: 234, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&auto=format&q=80', color: '#2D6A4F' },
  { id: 'chinese', name: 'Chinese', region: 'East Asia', dishCount: 389, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop&auto=format&q=80', color: '#DC2F02' },
  { id: 'south-indian', name: 'South Indian', region: 'South Asia', dishCount: 342, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop&auto=format&q=80', color: '#E76F51' },
  { id: 'french', name: 'French', region: 'Europe', dishCount: 267, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format&q=80', color: '#264653' },
  { id: 'desserts', name: 'Desserts', region: 'Worldwide', dishCount: 523, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&auto=format&q=80', color: '#E56B6F' },
  { id: 'street-food', name: 'Street Food', region: 'Worldwide', dishCount: 412, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format&q=80', color: '#F77F00' },
];

function CuisineCard({ cuisine }) {
  return (
    <Link to={`/discover/${cuisine.id}`} className="scroll-item group">
      <motion.div
        className="relative w-[220px] sm:w-[260px] rounded-2xl overflow-hidden bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
      >
        {/* Image */}
        <div className="relative h-[160px] sm:h-[180px] overflow-hidden">
          <img
            src={cuisine.image}
            alt={cuisine.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-serif font-bold text-xl leading-tight group-hover:translate-x-1 transition-transform duration-300">
              {cuisine.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-charcoal/50">
              <MapPin className="w-3 h-3" />
              {cuisine.region}
            </div>
            <p className="text-sm text-charcoal/70 mt-0.5">
              {cuisine.dishCount} dishes
            </p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-deep-red group-hover:text-white"
            style={{ backgroundColor: cuisine.color + '10', color: cuisine.color }}
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: cuisine.color }}
        />
      </motion.div>
    </Link>
  );
}

export default function CuisineDiscovery() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-warm-ivory overflow-hidden">
      <div className="section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="max-container"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="mb-10 sm:mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[2px] bg-deep-red" />
              <span className="text-deep-red text-sm font-semibold tracking-widest uppercase">
                Discover
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal leading-tight">
              Where are we eating today?
            </h2>
            <p className="text-charcoal/50 mt-3 text-lg max-w-md">
              One world. Thousands of flavours.
            </p>
          </motion.div>

          {/* Horizontal scroll */}
          <motion.div variants={staggerItem}>
            <div className="scroll-container -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 gap-5">
              {CUISINES_PREVIEW.map((cuisine, idx) => (
                <CuisineCard key={cuisine.id} cuisine={cuisine} />
              ))}
            </div>
          </motion.div>

          {/* View all link */}
          <motion.div variants={staggerItem} className="mt-8 flex justify-center">
            <Link
              to="/discover"
              className="group inline-flex items-center gap-2 text-deep-red font-semibold hover:text-dark-burgundy transition-colors"
            >
              Explore all cuisines
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
