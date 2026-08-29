import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Award, CheckCircle, Package, Mail } from 'lucide-react';
import { cn, formatCurrency } from '../utils/helpers';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const sellerData = {
  id: 's1',
  name: 'Alice M.',
  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  bio: 'Cooking authentic recipes passed down through three generations. Specializing in artisanal sourdough and handmade pastas.',
  rating: 4.8,
  reviewsCount: 156,
  orders: 850,
  location: 'Koramangala, Bangalore',
  joined: '2022',
  items: [
    { id: '1', name: 'Artisan Sourdough Loaf', price: 250, image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fa08?w=400&h=300&fit=crop', isVeg: true },
    { id: '2', name: 'Focaccia with Herbs', price: 300, image: 'https://images.unsplash.com/photo-1627914856006-037130283c79?w=400&h=300&fit=crop', isVeg: true },
    { id: '3', name: 'Handmade Ravioli (500g)', price: 450, image: 'https://images.unsplash.com/photo-1589227365533-cee630bd59bd?w=400&h=300&fit=crop', isVeg: true },
  ],
  reviews: [
    { id: 1, user: 'Rahul D.', rating: 5, date: '2 weeks ago', text: 'Best sourdough in town! The crust is perfect and the crumb is so soft.' },
    { id: 2, user: 'Priya K.', rating: 4, date: '1 month ago', text: 'Loved the focaccia. A bit pricey but worth the quality.' }
  ]
};

export default function SellerPage() {
  const { sellerId } = useParams(); // Can fetch actual data based on ID
  const [activeTab, setActiveTab] = useState('menu');
  const s = sellerData; // Using mock data

  const tabs = ['Menu', 'Reviews', 'About'];

  return (
    <div className="bg-cream min-h-screen pb-20">
      
      {/* Hero Profile */}
      <div className="bg-white border-b border-muted-cream pt-24 pb-12 shadow-sm">
        <div className="max-container section-padding">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <img src={s.photo} alt={s.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white" />
              <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1.5 rounded-full shadow-md border-2 border-white" title="Verified Seller">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-2">{s.name}</h1>
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto md:mx-0">{s.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 text-sm font-medium text-charcoal">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-gold text-gold" />
                  <span className="text-lg">{s.rating}</span>
                  <span className="text-gray-400">({s.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span>{s.orders}+ Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>{s.location}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button className="bg-deep-red hover:bg-dark-burgundy text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm">
                Follow Chef
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-charcoal font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> Contact
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-container section-padding mt-8">
        
        {/* Tabs */}
        <div className="flex border-b border-muted-cream mb-8 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                "px-8 py-4 font-bold text-lg transition-colors border-b-2 whitespace-nowrap",
                activeTab === tab.toLowerCase() 
                  ? "border-deep-red text-deep-red" 
                  : "border-transparent text-gray-500 hover:text-charcoal"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[40vh]">
          {activeTab === 'menu' && (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {s.items.map(item => (
                <motion.div key={item.id} variants={staggerItem} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-muted-cream hover:shadow-md transition-shadow group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-3 left-3 bg-white p-1 rounded shadow-sm">
                      <div className={cn("w-3 h-3 border-2 rounded-sm flex items-center justify-center", item.isVeg ? "border-green-600" : "border-red-600")}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", item.isVeg ? "bg-green-600" : "bg-red-600")}></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-charcoal mb-1">{item.name}</h3>
                      <div className="font-bold text-deep-red">{formatCurrency(item.price)}</div>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-charcoal font-bold py-2 px-4 rounded-lg transition-colors">
                      Add
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-6">
              {s.reviews.map(review => (
                <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-muted-cream">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-bold text-charcoal">{review.user}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-gold text-gold" : "text-gray-300")} />
                    ))}
                  </div>
                  <p className="text-soft-charcoal">{review.text}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-muted-cream max-w-3xl">
              <h3 className="text-2xl font-serif font-bold mb-4 text-charcoal">The Kitchen Story</h3>
              <p className="text-soft-charcoal leading-relaxed mb-8">
                {s.bio} Our kitchen is built on the belief that good food brings people together. We source our ingredients locally and prepare everything fresh on order. No preservatives, just pure love for cooking.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div>
                  <h4 className="font-bold text-charcoal mb-2 flex items-center gap-2"><Award className="w-4 h-4 text-gold"/> Certifications</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>FSSAI Registered</li>
                    <li>Food Safety Trained</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400"/> Availability</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Mon-Sat: 10 AM - 8 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
