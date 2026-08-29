import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Star, Clock, Filter, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn, formatCurrency } from '../utils/helpers';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const mockItems = [
  { id: '1', name: 'Artisan Sourdough Loaf', seller: 'Alice M.', sellerId: 's1', price: 250, rating: 4.8, reviews: 34, image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fa08?w=600&h=400&fit=crop', isVeg: true, status: 'Available Now' },
  { id: '2', name: 'Spicy Chicken Pickle', seller: 'Chef Raj', sellerId: 's2', price: 450, rating: 4.9, reviews: 120, image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop', isVeg: false, status: 'Pre-order' },
  { id: '3', name: 'Vegan Choco Truffles', seller: 'Sweet Treats', sellerId: 's3', price: 300, rating: 4.7, reviews: 56, image: 'https://images.unsplash.com/photo-1548883354-94cbdbcb43ee?w=600&h=400&fit=crop', isVeg: true, status: 'Available Now' },
  { id: '4', name: 'Authentic Mutton Biryani', seller: 'Nizam Kitchen', sellerId: 's4', price: 650, rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop', isVeg: false, status: 'Pre-order' },
  { id: '5', name: 'Organic Honey (500g)', seller: 'Farm Fresh', sellerId: 's5', price: 400, rating: 5.0, reviews: 210, image: 'https://images.unsplash.com/photo-1587049352847-81a56d773c1c?w=600&h=400&fit=crop', isVeg: true, status: 'Available Now' },
  { id: '6', name: 'Gluten-Free Brownies', seller: 'Healthy Bakes', sellerId: 's6', price: 350, rating: 4.6, reviews: 42, image: 'https://images.unsplash.com/photo-1605807616999-bc565f1337b5?w=600&h=400&fit=crop', isVeg: true, status: 'Available Now' },
];

const filters = ['All', 'Vegetarian', 'Non-Veg', 'Desserts', 'Available Now', 'Pre-order'];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.seller.toLowerCase().includes(search.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter === 'Vegetarian') matchesFilter = item.isVeg;
    if (activeFilter === 'Non-Veg') matchesFilter = !item.isVeg;
    if (activeFilter === 'Available Now') matchesFilter = item.status === 'Available Now';
    if (activeFilter === 'Pre-order') matchesFilter = item.status === 'Pre-order';
    // 'Desserts' omitted for simplicity, could filter based on tags if added

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-warm-ivory min-h-screen font-sans pb-24">
      {/* Header */}
      <div className="bg-charcoal text-white pt-20 pb-24">
        <div className="max-container section-padding">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-2xl">
            <div className="flex items-center gap-3 text-gold mb-4">
              <ShoppingBag className="w-8 h-8" />
              <span className="font-bold tracking-widest uppercase text-sm">Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">From My Kitchen <br/>To Yours</h1>
            <p className="text-lg text-gray-300">Discover authentic, homemade delicacies crafted by passionate cooks in your neighborhood.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-container section-padding -mt-10">
        {/* Search & Filters */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-12"
        >
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search dishes or sellers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-deep-red focus-ring transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <Filter className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "whitespace-nowrap px-5 py-2 rounded-full font-medium text-sm transition-colors border",
                  activeFilter === filter
                    ? "bg-deep-red text-white border-deep-red"
                    : "bg-white text-soft-charcoal border-gray-200 hover:border-deep-red"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={staggerContainer} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map(item => (
            <motion.div key={item.id} variants={staggerItem} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-muted-cream group flex flex-col h-full">
              <div className="relative h-56 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {/* Veg/Non-Veg Indicator */}
                <div className="absolute top-4 left-4 bg-white p-1 rounded">
                  <div className={cn("w-4 h-4 border-2 rounded-sm flex items-center justify-center", item.isVeg ? "border-green-600" : "border-red-600")}>
                    <div className={cn("w-2 h-2 rounded-full", item.isVeg ? "bg-green-600" : "bg-red-600")}></div>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <span className={cn(
                    "px-3 py-1 text-xs font-bold rounded-full shadow-sm backdrop-blur-md",
                    item.status === 'Available Now' ? "bg-green-100/90 text-green-800" : "bg-orange-100/90 text-orange-800"
                  )}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-bold text-xl text-charcoal leading-tight line-clamp-2">{item.name}</h3>
                  <span className="font-bold text-lg text-deep-red whitespace-nowrap ml-4">{formatCurrency(item.price)}</span>
                </div>
                
                <Link to={`/seller/${item.sellerId}`} className="text-sm font-medium text-gray-500 hover:text-deep-red transition-colors inline-block mb-4">
                  by {item.seller}
                </Link>
                
                <div className="flex items-center gap-1 mb-6 text-sm">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="font-bold text-charcoal">{item.rating}</span>
                  <span className="text-gray-400">({item.reviews})</span>
                </div>

                <div className="mt-auto">
                  <button className="w-full bg-charcoal hover:bg-black text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2">
                    {item.status === 'Available Now' ? (
                      <>Order Now</>
                    ) : (
                      <><Clock className="w-4 h-4" /> Pre-order</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif text-charcoal mb-2">No items found</h3>
            <p className="text-soft-charcoal">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
