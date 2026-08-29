import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Home, Compass, Sparkles, MessageSquare, Users, 
  ShoppingBag, Smile, Wallet, Trophy, PlusCircle, 
  User, CheckCircle, Flame, ChefHat, Layers, ShieldCheck
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useUI } from '../../contexts/UIContext';
import { CloverIcon } from './Navbar';
import { cn } from '../../utils/helpers';

export default function Sidebar({ className = "" }) {
  const { user } = useApp();
  const { isDark } = useTheme();
  const { openPanel } = useUI();

  const mainNavItems = [
    { icon: Home, label: 'Kitchen Dashboard', path: '/' },
    { icon: Sparkles, label: 'Smart Pantry Cooker', path: '/#pantry', highlight: true },
    { icon: Compass, label: 'Discover Cuisines', path: '/discover' },
    { icon: Layers, label: 'The Table (Feed)', path: '/feed' },
    { icon: Flame, label: 'Cook Threads', path: '/trending' },
    { icon: Users, label: 'Food Communities', path: '/communities' },
    { icon: ShoppingBag, label: 'From My Kitchen', path: '/marketplace' },
    { icon: Smile, label: 'Mood Food Matcher', path: '/mood' },
  ];

  const toolsItems = [
    { icon: Wallet, label: 'Kitchen Wallet', path: '/wallet', badge: `${user?.chefCoins || 320} 🪙` },
    { icon: Trophy, label: 'Cooking Challenges', path: '/challenges' },
    { icon: ShoppingBag, label: 'Grocery Redemption', path: '/grocery' },
    { icon: PlusCircle, label: 'Creator Studio', path: '/create' },
    { icon: User, label: 'Chef Profile', path: '/profile' },
  ];

  return (
    <aside className={cn(
      "w-64 xl:w-72 shrink-0 hidden lg:flex flex-col border-r transition-colors duration-300 min-h-[calc(100vh-4.5rem)] sticky top-18 z-30",
      isDark ? "bg-[#141212] border-[#262020]" : "bg-[#FDFBF7] border-[#E8DDCF]",
      className
    )}>
      <div className="p-4 flex-1 flex flex-col gap-6 overflow-y-auto">
        {/* User Mini Profile Card */}
        <Link
          to="/profile"
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
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gold"
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
              <CloverIcon className="w-3 h-3" />
              {user?.levelName || 'Food Creator'}
            </p>
          </div>
        </Link>

        {/* Main Menu Section */}
        <div>
          <p className={`text-[10px] font-extrabold uppercase tracking-widest px-3 mb-2 ${
            isDark ? 'text-[#D8CABB]/40' : 'text-[#8A7C6E]'
          }`}>
            MAIN MENU
          </p>

          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group",
                    isActive
                      ? "bg-[#D6A84F] text-[#141212] shadow-sm font-extrabold"
                      : isDark
                        ? "text-[#D8CABB]/80 hover:text-white hover:bg-white/[0.04]"
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

        {/* Tools & Earnings Section */}
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
                  className={({ isActive }) => cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group",
                    isActive
                      ? "bg-[#D6A84F] text-[#141212] shadow-sm font-extrabold"
                      : isDark
                        ? "text-[#D8CABB]/80 hover:text-white hover:bg-white/[0.04]"
                        : "text-[#4A3F33] hover:text-[#141212] hover:bg-[#EFE4D4]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#D6A84F]/20 text-gold border border-[#D6A84F]/40">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Support Banner */}
        <div className={`mt-auto p-4 rounded-2xl border text-center relative overflow-hidden ${
          isDark ? 'bg-[#181313] border-[#2E2424]' : 'bg-[#F2E7D5] border-[#D8C8B4]'
        }`}>
          <CloverIcon className="w-8 h-8 mx-auto mb-1.5 text-gold" />
          <p className="text-xs font-bold text-gold">The Clover Kitchen</p>
          <p className={`text-[10px] mt-0.5 ${isDark ? 'text-[#D8CABB]/60' : 'text-[#6C5E50]'}`}>
            100% Indian Legal Cuisines & Global Flavours
          </p>
        </div>
      </div>
    </aside>
  );
}
