import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Bell, Check, Sparkles, Trophy, Heart, MessageCircle, Flame, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { useApp } from '../../contexts/AppContext';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { formatNumber, timeAgo } from '../../utils/helpers';
import { CloverIcon } from '../layout/Navbar';
import MasterChefCapIcon from '../decorative/MasterChefCapIcon';

const slideInRight = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 28, stiffness: 220 } },
  exit: { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
};

const slideInBottom = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { type: 'spring', damping: 28, stiffness: 220 } },
  exit: { y: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
};

function PanelOverlay({ onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50"
      onClick={onClick}
    />
  );
}

// Notifications Panel (Notification Bar / Drawer)
function NotificationsPanel() {
  const [filter, setFilter] = useState('all');
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, type: 'social', icon: '❤️', title: 'New Like', message: 'Chef Priya liked your Hyderabadi Biryani recipe', time: '2m ago', read: false, action: 'View Recipe' },
    { id: 2, type: 'rewards', icon: '🔥', title: 'Trending Bonus', message: 'Your Creamy Garlic Pasta is trending! +50 ChefCoins credited', time: '15m ago', read: false, coins: 50 },
    { id: 3, type: 'rewards', icon: '👨‍🍳', title: 'Recipe Saves Milestone', message: 'Your recipe reached 100 saves. +20 ChefCoins earned', time: '1h ago', read: false, coins: 20 },
    { id: 4, type: 'social', icon: '💬', title: 'Thread Reply', message: 'Marco DeLuca replied to your Cook Thread on Carbonara', time: '2h ago', read: true, action: 'Reply' },
    { id: 5, type: 'rewards', icon: '🏆', title: 'New Challenge', message: '30-Minute Cooking Challenge is now live with a 750 ChefCoins prize pool', time: '3h ago', read: true, action: 'Join' },
    { id: 6, type: 'social', icon: '👥', title: 'Community Update', message: 'Sakura Kitchen and 14 others joined South Indian Home Chefs', time: '5h ago', read: true },
    { id: 7, type: 'social', icon: '⭐', title: 'Marketplace Review', message: 'Your homemade spice kit received a 5.0 rating from Ananya', time: '8h ago', read: true },
    { id: 8, type: 'rewards', icon: '🎉', title: 'Level Up', message: 'Congratulations! You unlocked Chef Level 4: Food Creator', time: '1d ago', read: true },
  ]);

  const markAllRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markSingleRead = (id) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filtered = notificationsList.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'rewards') return n.type === 'rewards';
    if (filter === 'social') return n.type === 'social';
    return true;
  });

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  return (
    <div className="p-5 flex flex-col h-full bg-[#141212] text-[#F7EEDB]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#262121]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center">
            <Bell className="w-4 h-4 text-gold" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#F7EEDB] flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#D6A84F] text-[#141212]">
                  {unreadCount} NEW
                </span>
              )}
            </h3>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-gold hover:text-yellow-300 transition-colors flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 py-3 border-b border-[#262121]">
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'rewards', label: 'Rewards' },
          { id: 'social', label: 'Social' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === tab.id
                ? 'bg-[#D6A84F] text-[#141212]'
                : 'text-[#D8CABB]/60 hover:text-[#F7EEDB] hover:bg-[#1E1A1A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification Items List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[#D8CABB]/40">
            <CloverIcon className="w-10 h-10 mx-auto opacity-30 mb-2" />
            <p className="text-sm font-medium">All caught up!</p>
            <p className="text-xs mt-1">No notifications in this tab.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => markSingleRead(item.id)}
              className={`group p-3.5 rounded-2xl border transition-all cursor-pointer ${
                !item.read
                  ? 'bg-[#1E1A1A] border-[#D6A84F]/30 hover:border-[#D6A84F]/60'
                  : 'bg-[#181515] border-[#292323] hover:border-[#383131]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-[#292222] border border-[#3A3232]">
                  {item.icon}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-gold uppercase tracking-wider">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-[#D8CABB]/50 shrink-0">{item.time}</span>
                  </div>

                  <p className="text-xs text-[#EADECB] mt-1 leading-relaxed">
                    {item.message}
                  </p>

                  {item.coins && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/40 text-[11px] font-bold text-gold">
                      <CloverIcon className="w-3.5 h-3.5" />
                      <span>+{item.coins} ChefCoins</span>
                    </div>
                  )}

                  {item.action && (
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-gold group-hover:translate-x-1 transition-transform">
                      <span>{item.action}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1 shadow-[0_0_8px_#D6A84F]" />
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer Banner */}
      <div className="pt-3 border-t border-[#262121] flex items-center justify-between text-xs text-[#D8CABB]/60">
        <span className="flex items-center gap-1.5">
          <CloverIcon className="w-4 h-4" />
          The Clover Kitchen
        </span>
        <span className="text-gold font-medium">Real-time alerts</span>
      </div>
    </div>
  );
}

// Wallet Panel
function WalletPanel() {
  const { user, transactions } = useApp();

  return (
    <div className="p-5 flex flex-col h-full bg-[#141212] text-[#F7EEDB]">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-[#262121]">
        <div className="w-8 h-8 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center">
          <MasterChefCapIcon className="w-4 h-4 text-gold" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-lg text-[#F7EEDB]">Kitchen Wallet</h3>
          <p className="text-[11px] text-[#D8CABB]/60">1 ChefCoin = ₹1 INR Grocery Value</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {/* Card Canvas */}
        <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#2D2319] via-[#1E1917] to-[#120F0F] border border-[#D6A84F]/40 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <MasterChefCapIcon className="w-32 h-32" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#D6A84F] font-semibold">Total Balance</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-extrabold font-serif text-white tracking-tight">
              {user?.chefCoins ? user.chefCoins.toLocaleString() : '1,248'}
            </span>
            <span className="text-gold text-sm font-bold">ChefCoins</span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-white/40 block text-[10px]">Redemption Value</span>
              <span className="text-[#F7EEDB] font-bold">₹{user?.chefCoins ? user.chefCoins.toLocaleString() : '1,248'}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px]">Lifetime Earned</span>
              <span className="text-gold font-bold">3,420 Coins</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href="/grocery"
            className="flex items-center justify-center gap-1.5 py-2.5 bg-[#D6A84F] text-[#141212] rounded-xl text-xs font-bold hover:bg-yellow-400 transition-colors shadow-sm"
          >
            <CreditCard className="w-3.5 h-3.5" />
            Redeem Grocery
          </a>
          <a
            href="/challenges"
            className="flex items-center justify-center gap-1.5 py-2.5 bg-[#1E1A1A] border border-[#3A3232] hover:border-[#D6A84F] text-[#EADECB] rounded-xl text-xs font-bold transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-gold" />
            Earn More
          </a>
        </div>

        {/* Transactions */}
        <div>
          <h4 className="font-bold text-xs text-[#D8CABB] uppercase tracking-wider mb-2.5">
            Recent Activity
          </h4>
          <div className="space-y-2">
            {(transactions || [
              { id: 'tx-1', type: 'earn', amount: 50, description: 'Recipe reached 1,000 views', date: '2026-08-28T10:00:00' },
              { id: 'tx-2', type: 'earn', amount: 20, description: 'Your recipe received 100 saves', date: '2026-08-27T15:30:00' },
              { id: 'tx-3', type: 'spend', amount: 300, description: 'Grocery redemption on Blinkit', date: '2026-08-25T09:00:00' },
            ]).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1616] border border-[#2B2424]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      tx.type === 'earn'
                        ? 'bg-green-900/40 text-green-400 border border-green-700/50'
                        : 'bg-red-900/40 text-red-400 border border-red-700/50'
                    }`}
                  >
                    {tx.type === 'earn' ? '+' : '-'}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-[#F7EEDB] font-medium truncate">{tx.description}</p>
                    <p className="text-[10px] text-[#D8CABB]/40">{timeAgo(tx.date)}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold shrink-0 ${
                    tx.type === 'earn' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {tx.type === 'earn' ? '+' : '-'}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Sliding Panel Manager
export default function SlidingPanelManager() {
  const { activePanel, closePanel } = useUI();
  const isMobile = useIsMobile();

  const panelVariants = isMobile ? slideInBottom : slideInRight;

  const panelWidths = {
    notifications: 'w-full sm:w-[400px]',
    wallet: 'w-full sm:w-[400px]',
    recipe: 'w-full sm:w-[480px]',
    comments: 'w-full sm:w-[420px]',
    community: 'w-full sm:w-[420px]',
  };

  const panelContent = {
    notifications: <NotificationsPanel />,
    wallet: <WalletPanel />,
  };

  return (
    <AnimatePresence>
      {activePanel && (
        <>
          <PanelOverlay onClick={closePanel} />
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed z-50 bg-[#141212] border-l border-[#2B2424] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ${
              isMobile
                ? 'bottom-0 left-0 right-0 max-h-[88vh] rounded-t-3xl border-t'
                : `top-0 right-0 h-full ${panelWidths[activePanel] || 'w-[400px]'}`
            }`}
          >
            {/* Top Close Bar */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-[#262121] bg-[#171515]">
              {isMobile && (
                <div className="w-12 h-1 bg-[#3A3232] rounded-full mx-auto absolute top-2 left-1/2 -translate-x-1/2" />
              )}
              <span className="text-xs font-semibold text-[#D6A84F] flex items-center gap-1.5">
                <CloverIcon className="w-4 h-4" />
                The Clover Kitchen
              </span>
              <button
                onClick={closePanel}
                className="w-7 h-7 rounded-full bg-[#241F1F] hover:bg-[#332B2B] text-[#D8CABB] hover:text-white flex items-center justify-center transition-colors border border-[#3A3232]"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-hidden">
              {panelContent[activePanel] || (
                <div className="p-8 text-center text-[#D8CABB]/50">
                  <p>Panel content</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
