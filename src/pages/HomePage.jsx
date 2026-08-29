import HeroSection from '../components/sections/HeroSection';
import FeatureMarquee from '../components/sections/FeatureMarquee';
import CuisineDiscovery from '../components/sections/CuisineDiscovery';
import TrendingRecipes from '../components/sections/TrendingRecipes';
import MoodDiscovery from '../components/sections/MoodDiscovery';
import TrendingThreads from '../components/sections/TrendingThreads';
import CreatorSpotlight from '../components/sections/CreatorSpotlight';
import CommunitiesShowcase from '../components/sections/CommunitiesShowcase';
import MarketplacePreview from '../components/sections/MarketplacePreview';
import ChefCoinEcosystem from '../components/sections/ChefCoinEcosystem';
import ChallengesSection from '../components/sections/ChallengesSection';
import FinalCTA from '../components/sections/FinalCTA';
import SmartPantryCooker from '../components/pantry/SmartPantryCooker';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. CORE STAR ATTRACTION POINT: Smart Pantry Cooker */}
      <section id="pantry" className="py-12 sm:py-16 scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <SmartPantryCooker />
        </div>
      </section>

      {/* 3. Feature Marquee */}
      <FeatureMarquee />

      {/* 4. Mood Discovery (Humanized Mood Recommender) */}
      <MoodDiscovery />

      {/* 5. Cuisine Discovery */}
      <CuisineDiscovery />

      {/* 6. Trending Recipes */}
      <TrendingRecipes />

      {/* 7. Trending Threads */}
      <TrendingThreads />

      {/* 8. Creator Spotlight */}
      <CreatorSpotlight />

      {/* 9. Communities Showcase */}
      <CommunitiesShowcase />

      {/* 10. Marketplace Preview */}
      <MarketplacePreview />

      {/* 11. ChefCoin Ecosystem */}
      <ChefCoinEcosystem />

      {/* 12. Challenges Section */}
      <ChallengesSection />

      {/* 13. Final CTA */}
      <FinalCTA />
    </div>
  );
}
