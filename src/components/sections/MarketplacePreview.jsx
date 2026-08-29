import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, MapPin, Clock } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { formatNumber } from '../../utils/helpers';

const MARKETPLACE_ITEMS = [
  { id: 'mp-1', name: "Amma's Sunday Biryani", image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=400&h=400&fit=crop&auto=format&q=80', price: 249, rating: 4.9, reviews: 128, sellerName: 'Chef Priya', sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format', isVeg: false, availability: 'Weekends Only', orders: 1284 },
  { id: 'mp-2', name: 'Handmade Fresh Ravioli', image: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=400&h=400&fit=crop&auto=format&q=80', price: 349, rating: 4.8, reviews: 89, sellerName: 'Marco DeLuca', sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format', isVeg: true, availability: 'Available Now', orders: 892 },
  { id: 'mp-3', name: 'Korean Rice Bowl Set', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop&auto=format&q=80', price: 299, rating: 4.7, reviews: 64, sellerName: 'Min-jun Park', sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format', isVeg: false, availability: 'Available Now', orders: 456 },
  { id: 'mp-4', name: 'Artisan Chocolate Box', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop&auto=format&q=80', price: 499, rating: 4.9, reviews: 234, sellerName: 'Ananya Iyer', sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format', isVeg: true, availability: 'Pre-order', orders: 2100 },
  { id: 'mp-5', name: 'South Indian Breakfast Box', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=400&fit=crop&auto=format&q=80', price: 199, rating: 4.8, reviews: 156, sellerName: 'Preethi Reddy', sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format', isVeg: true, availability: 'Available Now', orders: 890 },
];

function MarketplaceItemCard({ item }) {
  return (
    <Link to={`/marketplace/${item.id}`} className="scroll-item group">
      <motion.div
        className="w-[240px] sm:w-[260px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Veg indicator */}
          <div className={`absolute top-3 left-3 w-5 h-5 rounded border-2 flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
            <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
          </div>

          {/* Availability */}
          <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-semibold ${
            item.availability === 'Available Now' ? 'bg-green-100 text-green-700' :
            item.availability === 'Pre-order' ? 'bg-blue-100 text-blue-700' :
            'bg-amber-100 text-amber-700'
          }`}>
            {item.availability}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-charcoal text-sm leading-snug mb-2 line-clamp-2 group-hover:text-deep-red transition-colors">
            {item.name}
          </h3>

          {/* Seller */}
          <div className="flex items-center gap-2 mb-2">
            <img src={item.sellerAvatar} alt={item.sellerName} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-xs text-charcoal/50">{item.sellerName}</span>
          </div>

          {/* Price & Rating */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-charcoal">₹{item.price}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span className="text-sm font-semibold">{item.rating}</span>
              <span className="text-xs text-charcoal/40">({item.reviews})</span>
            </div>
          </div>

          {/* Orders */}
          <p className="text-xs text-charcoal/40 mt-1">
            {formatNumber(item.orders)} orders
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function MarketplacePreview() {
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
                <ShoppingBag className="w-4 h-4 text-deep-red" />
                <span className="text-deep-red text-sm font-semibold tracking-widest uppercase">
                  From My Kitchen
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal">
                Homemade, with love
              </h2>
              <p className="text-charcoal/50 mt-2 text-lg">
                Discover food made by home chefs in your area.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="hidden sm:inline-flex items-center gap-2 text-deep-red font-semibold hover:text-dark-burgundy transition-colors group"
            >
              Browse marketplace
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="scroll-container -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 gap-5 max-container">
          {MARKETPLACE_ITEMS.map((item) => (
            <MarketplaceItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
