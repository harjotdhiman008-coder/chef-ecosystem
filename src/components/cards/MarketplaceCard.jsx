import React from 'react';
import { Star } from 'lucide-react';
import { cn, formatCurrency } from '../../utils/helpers';

const MarketplaceCard = ({ item, className }) => {
  const {
    id, name, description, image, price, rating, reviews,
    sellerName, sellerAvatar, cuisine, isVeg, availability, deliveryType, orders
  } = item;

  return (
    <div className={cn('bg-white rounded-2xl shadow-sm card-hover overflow-hidden flex flex-col', className)}>
      <div className="relative aspect-[4/3] overflow-hidden group">
        <img
          src={image || 'https://images.unsplash.com/photo-1596683789643-4ceba14e7a6f?w=800&h=600&fit=crop'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-white/90 p-1 rounded-sm shadow-sm backdrop-blur-sm flex items-center justify-center">
          <div className={cn("w-3 h-3 rounded-full border", isVeg ? "bg-green-500 border-green-700" : "bg-red-500 border-red-700")} />
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded-full text-xs font-semibold text-charcoal shadow-sm">
          {availability || 'In Stock'}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-charcoal text-lg line-clamp-1 mb-1">{name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <img src={sellerAvatar || 'https://i.pravatar.cc/150?u=seller'} alt={sellerName} className="w-5 h-5 rounded-full object-cover" />
          <span className="text-sm text-charcoal/80 truncate">{sellerName}</span>
        </div>

        <div className="flex items-center gap-1 text-sm font-medium mb-3">
          <Star className="w-4 h-4 fill-gold text-gold" />
          <span>{rating?.toFixed(1) || '4.5'}</span>
          <span className="text-charcoal/50 text-xs font-normal">({reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4 mt-auto">
          <span className="text-xs px-2 py-1 bg-cream rounded-md text-charcoal/80 font-medium">
            {deliveryType || 'Standard Delivery'}
          </span>
          <span className="text-xs text-charcoal/60">{orders} orders</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="font-bold text-lg text-deep-red">
            {formatCurrency ? formatCurrency(price) : `₹${price}`}
          </span>
          <button className="px-4 py-1.5 bg-deep-red text-white text-sm font-medium rounded-full hover:bg-dark-burgundy transition-colors shadow-sm">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
