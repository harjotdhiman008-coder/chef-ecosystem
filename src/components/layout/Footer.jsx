import React from 'react';
import { Link } from 'react-router-dom';
import { CloverIcon } from './Navbar';

const Footer = () => {
  return (
    <footer className="bg-[#121010] text-[#F7EEDB] pt-16 pb-24 lg:pb-12 relative overflow-hidden border-t border-[#242020]">
      {/* Decorative large faint clover */}
      <CloverIcon className="absolute -right-20 -bottom-20 w-96 h-96 text-gold/5 pointer-events-none opacity-20" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 md:mb-16">
          <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="transition-transform group-hover:rotate-6 duration-300">
              <CloverIcon className="w-9 h-9" />
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#F7EEDB]">
              The Clover Kitchen
            </span>
          </Link>
          <p className="text-[#D8CABB]/70 text-base font-medium max-w-md">
            Connect. Create. Cook. Earn. Shop.<br />
            A new category of social technology built around food and cooking.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-8 mb-16 border-t border-[#262121] pt-12">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#D6A84F]">
              DISCOVER
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/recipes" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/discover" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Cuisines
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Trending Dishes
                </Link>
              </li>
              <li>
                <Link to="/mood" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Mood Food
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#D6A84F]">
              COOK
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/feed" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  The Table (Feed)
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Cook Threads
                </Link>
              </li>
              <li>
                <Link to="/communities" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Communities
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Creator Studio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#D6A84F]">
              EARN
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/wallet" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Chef Caps & Coins
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Cooking Challenges
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Sell From Home
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#D6A84F]">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/marketplace" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  The Clover Market
                </Link>
              </li>
              <li>
                <Link to="/grocery" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Grocery Redemption
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Home Chefs
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#D6A84F]">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link to="/" className="text-[#D8CABB]/70 hover:text-gold transition-colors">
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[#262121] text-xs text-[#D8CABB]/50 gap-4">
          <p>© 2026 The Clover Kitchen. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-gold transition-colors">Twitter</a>
            <a href="#" className="hover:text-gold transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
