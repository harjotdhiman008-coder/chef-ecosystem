import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';

import Navbar from './components/layout/Navbar';
import SidebarDrawer from './components/layout/SidebarDrawer';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';
import SlidingPanelManager from './components/panels/SlidingPanelManager';
import { useTheme } from './contexts/ThemeContext';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const CuisinePage = lazy(() => import('./pages/CuisinePage'));
const RecipePage = lazy(() => import('./pages/RecipePage'));
const FeedPage = lazy(() => import('./pages/FeedPage'));
const CookThreadPage = lazy(() => import('./pages/CookThreadPage'));
const CommunitiesPage = lazy(() => import('./pages/CommunitiesPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const CreateCommunityPage = lazy(() => import('./pages/CreateCommunityPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const SellerPage = lazy(() => import('./pages/SellerPage'));
const MoodPage = lazy(() => import('./pages/MoodPage'));
const CreatePage = lazy(() => import('./pages/CreatePage'));
const WalletPage = lazy(() => import('./pages/WalletPage'));
const GroceryPage = lazy(() => import('./pages/GroceryPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CreatorPage = lazy(() => import('./pages/CreatorPage'));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage'));
const ChallengePage = lazy(() => import('./pages/ChallengePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const TrendingPage = lazy(() => import('./pages/TrendingPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-[#D6A84F] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold text-[#D6A84F]">Loading The Clover Kitchen...</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const { isDark } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${
      isDark ? 'bg-[#121010] text-[#F7EEDB]' : 'bg-[#FAF6F0] text-[#1E1B18]'
    }`}>
      <ScrollToTop />
      
      {/* Top Navbar with Tap-To-Open Sidebar Trigger */}
      <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />

      {/* Tap-Open Left Sidebar Drawer */}
      <SidebarDrawer 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Full-width Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/discover/:cuisineId" element={<CuisinePage />} />
              <Route path="/recipes" element={<DiscoverPage />} />
              <Route path="/recipe/:recipeId" element={<RecipePage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/cook-thread/:threadId" element={<CookThreadPage />} />
              <Route path="/communities" element={<CommunitiesPage />} />
              <Route path="/community/:communityId" element={<CommunityPage />} />
              <Route path="/create-community" element={<CreateCommunityPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/marketplace/:itemId" element={<SellerPage />} />
              <Route path="/seller/:sellerId" element={<SellerPage />} />
              <Route path="/mood" element={<MoodPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/grocery" element={<GroceryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/creator/:creatorId" element={<CreatorPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/challenge/:challengeId" element={<ChallengePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>

        {/* Footer */}
        <Footer />
      </main>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Sliding Panels (Notifications & Kitchen Wallet) */}
      <SlidingPanelManager />
    </div>
  );
}
