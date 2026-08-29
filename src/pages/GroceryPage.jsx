import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, ChevronDown, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn, formatNumber } from '../utils/helpers';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const mockIngredients = [
  { id: 1, name: 'All-purpose flour', amount: '2 cups', price: 40, selected: true },
  { id: 2, name: 'Active dry yeast', amount: '1 packet', price: 25, selected: true },
  { id: 3, name: 'Olive oil', amount: '2 tbsp', price: 15, selected: true },
  { id: 4, name: 'Sea salt', amount: '1 tsp', price: 10, selected: true },
  { id: 5, name: 'Fresh Rosemary', amount: '1 sprig', price: 20, selected: false },
];

export default function GroceryPage() {
  const balance = 1248;
  const [ingredients, setIngredients] = useState(mockIngredients);
  const [coinInput, setCoinInput] = useState(100);

  const toggleIngredient = (id) => {
    setIngredients(ingredients.map(ing => ing.id === id ? { ...ing, selected: !ing.selected } : ing));
  };

  const selectedTotal = ingredients.filter(i => i.selected).reduce((acc, curr) => acc + curr.price, 0);
  const finalPrice = Math.max(0, selectedTotal - coinInput);

  return (
    <div className="bg-warm-ivory min-h-screen text-charcoal pb-24 pt-12 font-sans">
      <div className="max-container section-padding">
        
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-red mb-4">Missing ingredients?</h1>
          <p className="text-lg text-soft-charcoal">Turn your saved recipes directly into a grocery basket.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Left Column - Recipe & Ingredients */}
          <div className="lg:w-2/3 space-y-6">
            
            {/* Recipe Selector */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-muted-cream">
              <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Shopping list for</label>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-deep-red transition-colors">
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1627914856006-037130283c79?w=100&h=100&fit=crop" alt="Focaccia" className="w-12 h-12 rounded-lg object-cover" />
                  <span className="font-serif font-bold text-xl">Rosemary Focaccia</span>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Ingredients List */}
            <div className="bg-white rounded-2xl shadow-sm border border-muted-cream overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="font-bold text-xl flex items-center gap-2"><ShoppingCart className="w-5 h-5"/> Your Basket</h2>
                <span className="text-sm font-medium text-gray-500">{ingredients.filter(i => i.selected).length} items selected</span>
              </div>
              
              <div className="p-2">
                {ingredients.map(ing => (
                  <div 
                    key={ing.id} 
                    onClick={() => toggleIngredient(ing.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors mb-1",
                      ing.selected ? "bg-red-50/50 hover:bg-red-50" : "hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-6 h-6 rounded flex items-center justify-center border transition-colors",
                        ing.selected ? "bg-deep-red border-deep-red text-white" : "border-gray-300 text-transparent"
                      )}>
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={cn("font-bold", ing.selected ? "text-charcoal" : "text-gray-500 line-through")}>{ing.name}</div>
                        <div className="text-sm text-gray-500">{ing.amount}</div>
                      </div>
                    </div>
                    <div className={cn("font-bold", ing.selected ? "text-deep-red" : "text-gray-400")}>
                      ₹{ing.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Checkout */}
          <div className="lg:w-1/3">
            <div className="bg-charcoal text-white rounded-3xl p-6 md:p-8 sticky top-24 shadow-2xl">
              <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-4 text-gray-300">
                <span>Items Total</span>
                <span>₹{selectedTotal}</span>
              </div>
              
              {/* Apply Coins */}
              <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/20">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold flex items-center gap-2 text-gold">
                    Apply ChefCoins
                  </span>
                  <span className="text-sm text-gray-400">Bal: {formatNumber(balance)}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="0" 
                    max={Math.min(balance, selectedTotal)} 
                    value={coinInput}
                    onChange={(e) => setCoinInput(Number(e.target.value))}
                    className="w-full accent-gold"
                  />
                  <div className="bg-black/30 px-3 py-1 rounded text-white font-bold w-16 text-center">
                    {coinInput}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2 flex items-start gap-1">
                  <Info className="w-3 h-3 mt-0.5 shrink-0" />
                  1 ChefCoin = ₹1. You are saving ₹{coinInput} on this order.
                </div>
              </div>

              <div className="w-full h-px bg-white/20 mb-4"></div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-lg">Amount to Pay</span>
                <span className="text-4xl font-bold text-white">₹{finalPrice}</span>
              </div>

              {/* Partner Buttons */}
              <div className="space-y-3">
                <p className="text-xs text-center text-gray-400 font-bold uppercase tracking-wider mb-2">Fulfill via Partner</p>
                <button className="w-full bg-[#F3C117] hover:bg-[#d6a913] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  Order via Blinkit <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full bg-[#E23744] hover:bg-[#c12632] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  Order via Instamart <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full bg-[#689F38] hover:bg-[#52802a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  Order via BigBasket <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
