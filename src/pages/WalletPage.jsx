import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, TrendingUp, TrendingDown, Clock, ShoppingCart, ArrowRight, Award, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn, formatNumber } from '../utils/helpers';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const transactions = [
  { id: 1, type: 'earn', title: 'Recipe Published: Artisan Sourdough', amount: 50, date: 'Today, 2:30 PM', icon: Award },
  { id: 2, type: 'spend', title: 'Grocery Partner: Blinkit Order', amount: 120, date: 'Yesterday', icon: ShoppingCart },
  { id: 3, type: 'earn', title: 'Community Challenge Winner', amount: 500, date: 'Oct 15, 2023', icon: Award },
  { id: 4, type: 'spend', title: 'Marketplace: Spicy Pickle', amount: 45, date: 'Oct 12, 2023', icon: Gift },
  { id: 5, type: 'earn', title: 'Received 100 Likes on Post', amount: 10, date: 'Oct 10, 2023', icon: Award },
];

export default function WalletPage() {
  const balance = 1248;
  const redemptionValue = balance * 1; // Assuming 1 Coin = 1 Rupee for simplicity

  return (
    <div className="bg-cream min-h-screen pb-24 pt-12 font-sans">
      <div className="max-container section-padding max-w-5xl">
        
        {/* Header & Balance Card */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">Your Kitchen Wallet</h1>
          <p className="text-lg text-soft-charcoal">Earn by contributing, spend on your passion.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Main Balance */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 bg-gradient-to-br from-charcoal to-black rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
            {/* BG pattern */}
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
              <ChefHat className="w-64 h-64" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gold p-3 rounded-full">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-widest uppercase text-gray-300">ChefCoins</span>
              </div>
              
              <div className="mb-2 text-gray-300 font-medium">Available Balance</div>
              <div className="text-6xl md:text-7xl font-bold text-gold mb-6 tracking-tight">
                {formatNumber(balance)}
              </div>
              
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <span className="text-sm text-gray-300">Equivalent Value:</span>
                <span className="ml-2 font-bold text-lg text-white">₹{formatNumber(redemptionValue)}</span>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl p-8 border border-muted-cream shadow-sm flex flex-col justify-center space-y-6">
            <div>
              <div className="text-sm text-gray-500 font-medium mb-1">Lifetime Earned</div>
              <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> 4,500
              </div>
            </div>
            <div className="w-full h-px bg-gray-100"></div>
            <div>
              <div className="text-sm text-gray-500 font-medium mb-1">Lifetime Spent</div>
              <div className="text-2xl font-bold text-red-500 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" /> 3,252
              </div>
            </div>
            <div className="w-full h-px bg-gray-100"></div>
            <div>
              <div className="text-sm text-gray-500 font-medium mb-1">Pending</div>
              <div className="text-2xl font-bold text-gray-400 flex items-center gap-2">
                <Clock className="w-5 h-5" /> 120
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* History */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Recent Transactions</h2>
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="bg-white rounded-3xl shadow-sm border border-muted-cream p-2">
              {transactions.map((tx, idx) => {
                const Icon = tx.icon;
                const isEarn = tx.type === 'earn';
                return (
                  <motion.div key={tx.id} variants={staggerItem} className={cn(
                    "flex items-center justify-between p-4 md:p-6",
                    idx !== transactions.length - 1 ? "border-b border-gray-100" : ""
                  )}>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                        isEarn ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-charcoal text-lg">{tx.title}</div>
                        <div className="text-sm text-gray-500">{tx.date}</div>
                      </div>
                    </div>
                    <div className={cn(
                      "font-bold text-xl",
                      isEarn ? "text-green-600" : "text-charcoal"
                    )}>
                      {isEarn ? '+' : '-'}{tx.amount}
                    </div>
                  </motion.div>
                );
              })}
              <button className="w-full py-4 text-center text-sm font-bold text-gray-500 hover:text-deep-red transition-colors border-t border-gray-100 mt-2">
                View All History
              </button>
            </motion.div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Spend Coins</h2>
            
            <Link to="/grocery" className="block bg-deep-red hover:bg-dark-burgundy transition-colors rounded-3xl p-8 text-white shadow-lg group relative overflow-hidden">
              <div className="relative z-10">
                <ShoppingCart className="w-10 h-10 mb-4 text-gold" />
                <h3 className="text-2xl font-serif font-bold mb-2">Grocery Partners</h3>
                <p className="text-white/80 mb-6">Convert your ChefCoins directly into grocery deliveries.</p>
                <div className="flex items-center font-bold text-gold group-hover:translate-x-2 transition-transform">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </div>
            </Link>

            <Link to="/marketplace" className="block bg-white hover:bg-gray-50 transition-colors border border-muted-cream rounded-3xl p-8 text-charcoal shadow-sm group">
              <Gift className="w-10 h-10 mb-4 text-deep-red" />
              <h3 className="text-xl font-serif font-bold mb-2">Marketplace</h3>
              <p className="text-gray-500 mb-6 text-sm">Buy artisanal foods from local creators using your coins.</p>
              <div className="flex items-center font-bold text-deep-red group-hover:translate-x-2 transition-transform text-sm">
                Explore Marketplace <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
