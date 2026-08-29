import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon, Users, Lock, Globe, CheckCircle } from 'lucide-react';
import { cn } from '../utils/helpers';
import { pageTransition } from '../utils/animations';

const CATEGORIES = ['Baking', 'Cuisine', 'Lifestyle', 'Regional', 'Discovery', 'Diet', 'Challenge'];

export default function CreateCommunityPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    isPrivate: false,
    tags: '',
    rules: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/communities'); // Route to communities list or new community
      }, 2000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-white p-12 rounded-3xl text-center shadow-xl max-w-md w-full border border-muted-cream/30"
        >
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Community Created!</h2>
          <p className="text-soft-charcoal mb-8">Your new food circle is ready to gather people around the table.</p>
          <div className="w-8 h-8 border-4 border-deep-red border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-cream pb-20 pt-24"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-deep-red to-dark-burgundy rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-charcoal mb-3">Start your food circle</h1>
          <p className="text-soft-charcoal text-lg">Create a space for people to share, learn, and obsess over specific culinary niches.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-muted-cream/30 space-y-8">
          
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-bold text-charcoal mb-3">Cover Image</label>
            <div className="h-48 w-full border-2 border-dashed border-muted-cream rounded-2xl bg-warm-ivory flex flex-col items-center justify-center text-soft-charcoal hover:bg-muted-cream/20 hover:border-deep-red/50 transition-colors cursor-pointer group">
              <Camera className="w-8 h-8 mb-2 text-muted-cream group-hover:text-deep-red transition-colors" />
              <span className="font-medium">Click to upload cover image</span>
              <span className="text-xs mt-1">1600 x 400px recommended</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-charcoal mb-2">Community Name *</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sourdough Masters" 
                className="w-full p-4 bg-warm-ivory border border-muted-cream rounded-xl focus:outline-none focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-charcoal mb-2">Description *</label>
              <textarea 
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows="3" 
                placeholder="What is this community about?"
                className="w-full p-4 bg-warm-ivory border border-muted-cream rounded-xl focus:outline-none focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal mb-2">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 bg-warm-ivory border border-muted-cream rounded-xl focus:outline-none focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all appearance-none"
              >
                <option value="" disabled>Select category...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal mb-2">Visibility</label>
              <div className="flex gap-4">
                <label className={cn(
                  "flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all",
                  !formData.isPrivate ? "border-deep-red bg-deep-red/5 text-deep-red" : "border-muted-cream bg-warm-ivory text-soft-charcoal"
                )}>
                  <input type="radio" name="isPrivate" checked={!formData.isPrivate} onChange={() => setFormData(prev => ({...prev, isPrivate: false}))} className="hidden" />
                  <Globe className="w-6 h-6" />
                  <span className="font-bold text-sm">Public</span>
                </label>
                <label className={cn(
                  "flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all",
                  formData.isPrivate ? "border-deep-red bg-deep-red/5 text-deep-red" : "border-muted-cream bg-warm-ivory text-soft-charcoal"
                )}>
                  <input type="radio" name="isPrivate" checked={formData.isPrivate} onChange={() => setFormData(prev => ({...prev, isPrivate: true}))} className="hidden" />
                  <Lock className="w-6 h-6" />
                  <span className="font-bold text-sm">Private</span>
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-charcoal mb-2">Tags</label>
              <input 
                type="text" 
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. baking, bread, yeast (comma separated)" 
                className="w-full p-4 bg-warm-ivory border border-muted-cream rounded-xl focus:outline-none focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-charcoal mb-2">Rules (Optional)</label>
              <textarea 
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                rows="4" 
                placeholder="1. Be kind&#10;2. Share full recipes..."
                className="w-full p-4 bg-warm-ivory border border-muted-cream rounded-xl focus:outline-none focus:border-deep-red focus:ring-1 focus:ring-deep-red transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-muted-cream/30">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-5 rounded-xl font-bold text-lg text-white bg-deep-red hover:bg-dark-burgundy transition-colors shadow-lg shadow-deep-red/30 flex justify-center items-center"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Create Community'
              )}
            </button>
            <p className="text-center text-xs text-soft-charcoal mt-4">By creating a community, you agree to the ChefEcosystem Community Guidelines.</p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
