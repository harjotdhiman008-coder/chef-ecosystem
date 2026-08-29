import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Bell, Menu, Sun, Moon, Plus, Sparkles, 
  Mic, ChefHat, CheckCircle, Database 
} from 'lucide-react';
import { cn, formatNumber } from '../../utils/helpers';
import { useUI } from '../../contexts/UIContext';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import MasterChefCapIcon from '../decorative/MasterChefCapIcon';
import SupabaseConnectModal from '../modals/SupabaseConnectModal';

// Custom Golden Clover Brand Icon
export const CloverIcon = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className={cn("text-gold inline-block shrink-0", className)}
    style={size ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="9.5" r="5.2" fill="#D6A84F" />
    <circle cx="10.8" cy="17.5" r="5.2" fill="#D6A84F" />
    <circle cx="21.2" cy="17.5" r="5.2" fill="#D6A84F" />
    <circle cx="16" cy="15" r="3.2" fill="#D6A84F" />
    <path
      d="M16 17.5 C16 22, 14 25.5, 12 27.5"
      stroke="#D6A84F"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const Navbar = ({ onOpenSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const navigate = useNavigate();

  const { openPanel } = useUI();
  const { user } = useApp();
  const { isDark, toggleTheme } = useTheme();

  const isDbConnected = isSupabaseConfigured();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 inset-x-0 z-40 transition-all duration-300 border-b",
          isDark 
            ? "bg-[#141212]/95 border-[#292424] text-[#F7EEDB]" 
            : "bg-white/95 border-[#E8DCCF] text-[#1E1B18]",
          scrolled ? "shadow-md py-2.5 backdrop-blur-md" : "py-3"
        )}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Left: 3-line Menu Button + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Tap-Open 3-line Hamburger Menu Button for Sidebar Drawer */}
            <button
              onClick={onOpenSidebar}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-gold border flex items-center gap-2 transition-all active:scale-95 shadow-sm ${
                isDark 
                  ? 'bg-[#1E1A1A] border-[#382E2E] hover:bg-[#282222] hover:border-gold' 
                  : 'bg-[#FAF2E6] border-[#DFD0BD] hover:bg-[#EFE2CE] hover:border-gold'
              }`}
              title="Tap to open Chef Dashboard menu"
              aria-label="Open left sidebar menu"
            >
              <Menu className="w-5 h-5 text-gold stroke-[2.5]" />
              <span className="text-xs font-extrabold hidden md:inline text-gold uppercase tracking-wider">
                Menu
              </span>
            </button>

            <Link
              to="/"
              className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="transition-transform group-hover:rotate-6 duration-300">
                <CloverIcon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="flex flex-col">
                <span className={`font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight ${
                  isDark ? 'text-[#F7EEDB]' : 'text-[#1E1B18]'
                }`}>
                  The Clover Kitchen
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gold font-extrabold hidden sm:block">
                  Social Cooking Ecosystem
                </span>
              </div>
            </Link>

            {/* Supabase Connection Status Pill */}
            <button
              onClick={() => setIsSupabaseModalOpen(true)}
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                isDbConnected
                  ? 'bg-green-500/10 border-green-500/30 text-green-500 hover:bg-green-500/20'
                  : isDark
                    ? 'bg-[#221B1B] border-[#D6A84F]/40 text-[#D6A84F] hover:bg-[#2D2323]'
                    : 'bg-[#FAF2E6] border-[#D6A84F]/50 text-[#8C6215] hover:bg-[#EFE2CE]'
              }`}
              title="Click to configure Supabase Database Connection"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isDbConnected ? 'Supabase Connected' : 'Connect Supabase'}</span>
              <span className={`w-2 h-2 rounded-full ${isDbConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`} />
            </button>
          </div>

          {/* Center Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block flex-1 max-w-md lg:max-w-lg mx-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, pantry ingredients, creators, dishes..."
              className={`w-full pl-4 pr-10 py-2 rounded-full text-xs sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#D6A84F] ${
                isDark 
                  ? 'bg-[#1E1A1A] border border-[#332B2B] text-[#EADECB] placeholder-[#8C7E70]' 
                  : 'bg-[#F5EDE0] border border-[#D9CAB7] text-[#1E1B18] placeholder-[#786C5E]'
              }`}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gold hover:scale-110 transition-transform"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border shadow-xs ${
                isDark 
                  ? 'bg-[#1E1A1A] border-[#3A3232] text-gold hover:bg-[#282222]' 
                  : 'bg-[#FAF2E6] border-[#D9CAB7] text-[#7A1820] hover:bg-[#EFE3D3]'
              }`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#7A1820]" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Quick Action: Voice / Cooking Mode */}
            <Link
              to="/recipe/recipe-1"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7A1820] text-white text-xs font-bold hover:bg-[#5C1117] transition-all active:scale-95 shadow-sm"
              title="Start Distraction-Free Cooking Mode"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Cook Mode</span>
            </Link>

            {/* Quick Action: + Create Recipe */}
            <Link
              to="/create"
              className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#D6A84F] text-[#141212] text-xs font-extrabold hover:bg-yellow-400 transition-all active:scale-95 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Create</span>
            </Link>

            {/* MasterChef Cap Coin Balance Badge */}
            <button
              onClick={() => openPanel('wallet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all border shadow-xs ${
                isDark
                  ? 'bg-[#1E1A1A] border-[#D6A84F]/60 text-gold hover:bg-[#D6A84F]/15'
                  : 'bg-[#FFF8EE] border-[#D6A84F] text-[#916719] hover:bg-[#FBE8CD]'
              }`}
              title="Open Kitchen Wallet (ChefCoins)"
            >
              <MasterChefCapIcon className="w-4.5 h-4.5" />
              <span>{user?.chefCoins ? formatNumber(user.chefCoins) : '320'}</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => openPanel('notifications')}
              className={`relative p-2 rounded-full transition-colors border ${
                isDark 
                  ? 'bg-[#1E1A1A] border-[#332B2B] text-[#EADECB] hover:text-gold' 
                  : 'bg-[#F5EDE0] border-[#D9CAB7] text-[#4A3F33] hover:text-gold'
              }`}
              aria-label="Open notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#7A1820] rounded-full ring-2 ring-gold" />
            </button>

            {/* User Profile Avatar */}
            <Link
              to="/profile"
              className="shrink-0 rounded-full ring-2 ring-gold ring-offset-2 ring-offset-transparent overflow-hidden hover:opacity-90 transition-opacity"
              title="View Chef Profile"
            >
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"}
                alt="Profile"
                className="w-8 h-8 object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Supabase Connection Modal */}
      <SupabaseConnectModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
