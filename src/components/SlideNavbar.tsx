import React from 'react';
import { GameStationId } from '../types';
import { Star, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideNavbarProps {
  currentStation: GameStationId;
  onSelectStation: (station: GameStationId) => void;
  chefStars: number;
  onReset: () => void;
}

export const STATION_ORDER: { id: GameStationId; label: string; shortLabel: string }[] = [
  { id: 'WELCOME', label: 'Lobi Kafe', shortLabel: 'Lobi' },
  { id: 'CUSTOMER_1_ORDER', label: 'Pelanggan 1 (Lia)', shortLabel: 'Pesanan 1' },
  { id: 'CUSTOMER_1_DECORATE', label: 'Hias Wafel 1', shortLabel: 'Dapur 1' },
  { id: 'QUALITY_CHECK', label: 'Semakan Kualiti Cef', shortLabel: 'Semak Kualiti' },
  { id: 'CUSTOMER_1_DELIVER', label: 'Hantar Pesanan 1', shortLabel: 'Hantar 1' },
  { id: 'CUSTOMER_2_ORDER', label: 'Pelanggan 2 (Mia)', shortLabel: 'Pesanan 2' },
  { id: 'CUSTOMER_2_DECORATE', label: 'Wafel Istimewa 2', shortLabel: 'Dapur 2' },
  { id: 'CUSTOMER_2_DELIVER', label: 'Hantar Pesanan 2', shortLabel: 'Hantar 2' },
  { id: 'CUSTOMER_3_ORDER', label: 'Pelanggan 3 (Toby)', shortLabel: 'Pesanan 3' },
  { id: 'CUSTOMER_3_DECORATE', label: 'Wafel Tropika 3', shortLabel: 'Dapur 3' },
  { id: 'CUSTOMER_3_DELIVER', label: 'Hantar Pesanan 3', shortLabel: 'Hantar 3' },
  { id: 'CELEBRATION', label: 'Anugerah & Sijil Cef', shortLabel: 'Trofi Utama' },
];

export const SlideNavbar: React.FC<SlideNavbarProps> = ({
  currentStation,
  onSelectStation,
  chefStars,
  onReset,
}) => {
  const currentIndex = STATION_ORDER.findIndex((s) => s.id === currentStation);

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSound.click();
      onSelectStation(STATION_ORDER[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < STATION_ORDER.length - 1) {
      playSound.click();
      onSelectStation(STATION_ORDER[currentIndex + 1].id);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Brand & Stars Tracker */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <button
            onClick={() => {
              playSound.click();
              onSelectStation('WELCOME');
            }}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-amber-400 to-rose-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <span className="text-xl">🧇</span>
            </div>
            <div>
              <span className="font-black text-base sm:text-lg text-amber-950 tracking-tight block leading-tight">
                Waffle Fruity Café
              </span>
              <span className="text-[11px] font-bold text-rose-600 tracking-wider uppercase">
                Dapur Cef Cilik
              </span>
            </div>
          </button>

          {/* Stars Badges (3 Stars for 3 Customers) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 shadow-xs">
            <span className="text-xs font-black text-amber-950 mr-1">Bintang Cef:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((starNum) => (
                <Star
                  key={starNum}
                  className={`w-5 h-5 transition-all ${
                    chefStars >= starNum
                      ? 'fill-amber-400 text-amber-500 scale-110 drop-shadow-sm'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Café Stations Carousel Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {STATION_ORDER.map((item) => {
            const isActive = item.id === currentStation;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playSound.click();
                  onSelectStation(item.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm scale-105'
                    : 'bg-amber-50 hover:bg-amber-100 text-stone-700 border border-amber-200'
                }`}
                title={item.label}
              >
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Arrows & Reset */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Langkah Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            disabled={currentIndex === STATION_ORDER.length - 1}
            onClick={handleNext}
            className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title="Langkah Seterusnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              playSound.click();
              onReset();
            }}
            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
            title="Mula semula dari awal"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
