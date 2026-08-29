import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, PlusCircle, Users, User } from 'lucide-react';
import { cn } from '../../utils/helpers';

const MobileNav = () => {
  const navItems = [
    { icon: Home, label: 'HOME', path: '/' },
    { icon: Compass, label: 'DISCOVER', path: '/discover' },
    { icon: PlusCircle, label: 'CREATE', path: '/create', isMain: true },
    { icon: Users, label: 'CIRCLES', path: '/communities' },
    { icon: User, label: 'PROFILE', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-[#141212]/95 backdrop-blur-lg border-t border-[#292424] shadow-[0_-4px_30px_rgba(0,0,0,0.8)] lg:hidden pb-safe">
      <div className="flex justify-around items-end h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isMain) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative -top-3 flex flex-col items-center gap-1 group"
              >
                <div className="w-13 h-13 rounded-full bg-[#D6A84F] text-[#141212] flex items-center justify-center shadow-[0_0_20px_rgba(214,168,79,0.35)] transform transition-transform group-active:scale-95 hover:bg-yellow-400">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[9px] font-bold tracking-wider text-[#D6A84F]">
                  {item.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center w-16 h-full gap-1 mb-1 transition-colors",
                  isActive ? "text-[#D6A84F]" : "text-[#D8CABB]/50 hover:text-[#D8CABB]"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
                  <span
                    className={cn(
                      "text-[9px] tracking-wider",
                      isActive ? "font-extrabold text-[#D6A84F]" : "font-medium"
                    )}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
