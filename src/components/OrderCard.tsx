import React from 'react';
import { FruitId } from '../types';
import { FruitIcon, FRUIT_DICTIONARY } from './FruitIcon';
import { Check, ClipboardList, Sparkles } from 'lucide-react';

interface OrderCardProps {
  fruits: FruitId[];
  checkedFruits?: FruitId[];
  customerName?: string;
  tableLabel?: string;
  isCompact?: boolean;
  className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  fruits,
  checkedFruits = [],
  customerName = 'Pesanan Pelanggan',
  tableLabel = 'Meja #1',
  isCompact = false,
  className = '',
}) => {
  if (isCompact) {
    // Compact banner for top of decorating screen
    return (
      <div
        className={`bg-white/95 backdrop-blur-sm border-2 border-amber-300 rounded-2xl px-4 py-2.5 shadow-md flex items-center justify-between gap-3 ${className}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
            <ClipboardList className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
              Pesanan Pelanggan
            </span>
            <span className="text-sm font-bold text-stone-800">
              {fruits.map((f) => FRUIT_DICTIONARY[f]?.name).join(' + ')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          {fruits.map((fruitId, idx) => {
            const isFilled = checkedFruits.includes(fruitId);
            return (
              <div
                key={`${fruitId}-${idx}`}
                className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-semibold transition-all ${
                  isFilled
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600'
                }`}
              >
                <FruitIcon fruitId={fruitId} size="sm" showShadow={false} />
                <span>{FRUIT_DICTIONARY[fruitId]?.name}</span>
                {isFilled && (
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Full Order Ticket
  return (
    <div
      className={`relative bg-amber-50/95 border-4 border-amber-300 rounded-3xl p-6 sm:p-7 shadow-xl max-w-md w-full overflow-hidden ${className}`}
    >
      {/* Decorative cute top clip / header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-amber-400 text-white rounded-xl shadow-xs">
            <ClipboardList className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-amber-950 tracking-wide">
              {customerName}
            </h3>
            <p className="text-xs text-amber-700 font-medium">Tiket Wafel Segar</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-200/80 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>Kafe Wafel</span>
        </div>
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-3">
        Buah Pilihan Pelanggan:
      </p>

      {/* Grid of fruit items on the card */}
      <div className={`grid gap-3 ${fruits.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {fruits.map((fruitId, idx) => {
          const fruit = FRUIT_DICTIONARY[fruitId];
          return (
            <div
              key={`${fruitId}-${idx}`}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border-2 border-amber-200 shadow-sm hover:border-amber-400 transition-colors"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-1">
                <FruitIcon fruitId={fruitId} size="lg" />
              </div>
              <span className="text-sm sm:text-base font-bold text-amber-950">
                {fruit?.name}
              </span>
              <span className="text-[11px] text-amber-600 text-center line-clamp-1">
                Hirisan segar
              </span>
            </div>
          );
        })}
      </div>

      {/* Decorative footer stamp */}
      <div className="mt-5 pt-3 border-t-2 border-dashed border-amber-300 flex items-center justify-between text-xs text-amber-700">
        <span>Status: Menunggu Cef Sediakan</span>
        <span className="font-bold text-amber-900">{tableLabel}</span>
      </div>
    </div>
  );
};
