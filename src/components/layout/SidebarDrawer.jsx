import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Compass, Sparkles, MessageSquare, Users, 
  ShoppingBag, Smile, Wallet, Trophy, PlusCircle, 
  User, CheckCircle, Flame, X, Layers, Sun, Moon
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useUI } from '../../contexts/UIContext';
import MasterChefCapIcon from '../decorative/MasterChefCapIcon';
import { CloverIcon } from './Navbar';
import { cn } from '../../utils/helpers';

export default function SidebarDrawer({ isOpen, onClose }) {
  const { user } = useApp();
  const { isDark, toggleTheme } = useTheme();
  const { openPanel } = useUI();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const mainNavItems = [
    { icon: Home, label: 'Kitchen Dashboard', path: '/' },
    { icon: Sparkles, label: 'Smart Pantry Cooker', path: '/#pantry', highlight: true },
    { icon: Compass, label: 'Discover Cuisines', path: '/discover' },
    { icon: Layers, label: 'The Table (Feed)', path: '/feed' },
    { icon: Flame, label: 'Cook Threads', path: '/trending' },
    { icon: Users, label: 'Food Communities', path: '/communities' },
    { icon: ShoppingBag, label: 'From My Kitchen (Market)', path: '/marketplace' },
    { icon: Smile, label: 'Mood Food Matcher', path: '/mood' },
  ];

  const toolsItems = [
    { icon: Wallet, label: 'Kitchen Wallet', path: '/wallet', badge: `${user?.chefCoins || 320} Coins` },
    { icon: Trophy, label: 'Cooking Challenges', path: '/challenges' },
    { icon: ShoppingBag, label: 'Grocery Redemption', path: '/grocery' },
    { icon: PlusCircle, label: 'Creator Studio', path: '/create' },
    { icon: User, label: 'Chef Profile', path: '/profile' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Overlay with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-out Sidebar Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className={`relative w-80 sm:w-88 max-w-[85vw] h-full flex flex-col z-10 shadow-2xl border-r overflow-hidden ${
              isDark 
                ? 'bg-[#141212] border-[#2A2323] text-[#F7EEDB]' 
                : 'bg-[#FAF6F0] border-[#E5D7C5] text-[#1E1B18]'
            }`}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#D6A84F]/20 flex items-center justify-between">
              <Link to="/" onClick={onClose} className="flex items-center gap-2.5 group">
                <CloverIcon className="w-7 h-7 text-gold" />
                <div>
                  <span className="font-serif text-lg font-bold tracking-tight block">
                    The Clover Kitchen
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-gold font-extrabold block">
                    Tap-Open Chef Menu
                  </span>
                </div>
              </Link>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gold hover:bg-[#D6A84F]/15 transition-colors"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Menu Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* User Mini Profile Card */}
              <Link
                to="/profile"
                onClick={onClose}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-3 group ${
                  isDark 
                    ? 'bg-[#1D1818] hover:bg-[#251F1F] border-[#332A2A] hover:border-[#D6A84F]/50' 
                    : 'bg-white hover:bg-[#F7EFE3] border-[#E2D5C3] hover:border-[#D6A84F]'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"}
                    alt="Profile"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-gold"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#141212] flex items-center justify-center">
                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className={`font-bold text-xs truncate group-hover:text-gold transition-colors ${
                      isDark ? 'text-white' : 'text-charcoal'
                    }`}>
                      {user?.name || 'Alex Kumar'}
                    </p>
                  </div>
                  <p className="text-[10px] text-gold font-semibold uppercase tracking-wider flex items-center gap-1">
                    <MasterChefCapIcon className="w-3.5 h-3.5" />
                    {user?.levelName || 'Verified Home Chef'}
                  </p>
                </div>
              </Link>

              {/* Main Navigation */}
              <div>
                <p className={`text-[10px] font-extrabold uppercase tracking-widest px-3 mb-2 ${
                  isDark ? 'text-[#D8CABB]/40' : 'text-[#8A7C6E]'
                }`}>
                  CITIZEN & CHEF MENU
                </p>

                <nav className="space-y-1">
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) => cn(
                          "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group",
                          isActive
                            ? "bg-[#D6A84F] text-[#141212] shadow-sm font-extrabold"
                            : isDark
                              ? "text-[#D8CABB]/80 hover:text-white hover:bg-white/[0.05]"
                              : "text-[#4A3F33] hover:text-[#141212] hover:bg-[#EFE4D4]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                          <span>{item.label}</span>
                        </div>

                        {item.highlight && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#7A1820] text-white">
                            AI
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              {/* Tools & Rewards */}
              <div>
                <p className={`text-[10px] font-extrabold uppercase tracking-widest px-3 mb-2 ${
                  isDark ? 'text-[#D8CABB]/40' : 'text-[#8A7C6E]'
                }`}>
                  TOOLS & REWARDS
                </p>

                <nav className="space-y-1">
                  {toolsItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) => cn(
                          "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group",
                          isActive
                            ? "bg-[#D6A84F] text-[#141212] shadow-sm font-extrabold"
                            : isDark
                              ? "text-[#D8CABB]/80 hover:text-white hover:bg-white/[0.05]"
                              : "text-[#4A3F33] hover:text-[#141212] hover:bg-[#EFE4D4]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#D6A84F]/20 text-gold border border-[#D6A84F]/40 flex items-center gap-1">
                            <MasterChefCapIcon className="w-3 h-3" />
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom Drawer Controls */}
            <div className={`p-4 border-t flex items-center justify-between gap-2 ${
              isDark ? 'border-[#292222] bg-[#100D0D]' : 'border-[#E2D5C3] bg-[#F2E7D7]'
            }`}>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#D6A84F]/15 text-gold border border-[#D6A84F]/30"
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  openPanel('wallet');
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D6A84F] text-[#141212] font-extrabold text-xs shadow-sm hover:bg-yellow-400"
              >
                <MasterChefCapIcon className="w-4 h-4" />
                <span>Wallet</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
