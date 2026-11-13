import React from 'react';
import { motion } from 'motion/react';
import { JamFlavor } from '../types';
import { playSound } from '../utils/audio';
import { Sparkles } from 'lucide-react';

interface JamSqueezerProps {
  currentJam: JamFlavor;
  onSelectJam: (flavor: JamFlavor) => void;
}

const JAM_OPTIONS: { id: JamFlavor; name: string; emoji: string; color: string; bg: string }[] = [
  {
    id: 'strawberry',
    name: 'Jem Strawberi',
    emoji: '🍓',
    color: '#e11d48',
    bg: '#ffe4e6',
  },
  {
    id: 'chocolate',
    name: 'Sos Coklat',
    emoji: '🍫',
    color: '#713f12',
    bg: '#fef3c7',
  },
  {
    id: 'maple',
    name: 'Sirap Maple',
    emoji: '🍯',
    color: '#b45309',
    bg: '#fef9c3',
  },
  {
    id: 'blueberry',
    name: 'Jem Beri Biru',
    emoji: '🫐',
    color: '#2563eb',
    bg: '#eff6ff',
  },
];

export const JamSqueezer: React.FC<JamSqueezerProps> = ({
  currentJam,
  onSelectJam,
}) => {
  const handleSqueeze = (flavor: JamFlavor) => {
    playSound.squirtJam();
    onSelectJam(flavor);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-3 border-2 border-amber-300 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-extrabold text-amber-900 flex items-center gap-1.5 uppercase tracking-wide">
          <span>🧴</span>
          <span>Stesen Picit Jem:</span>
        </span>
        <span className="text-[11px] font-semibold text-rose-600">
          {currentJam !== 'none'
            ? `Dipicit: ${JAM_OPTIONS.find((j) => j.id === currentJam)?.name}`
            : 'Tekan botol untuk picit jem!'}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {JAM_OPTIONS.map((jam) => {
          const isSelected = currentJam === jam.id;
          return (
            <motion.button
              key={jam.id}
              type="button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.92, rotate: -5 }}
              onClick={() => handleSqueeze(jam.id)}
              className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? 'ring-3 ring-amber-400 border-amber-500 shadow-md scale-102'
                  : 'border-stone-200 hover:border-amber-300 bg-stone-50 hover:bg-amber-50/60'
              }`}
              style={{
                backgroundColor: isSelected ? jam.bg : undefined,
              }}
              title={`Klik untuk picit ${jam.name}`}
            >
              {/* Bottle Icon */}
              <div className="relative text-2xl mb-1">
                <span>{jam.emoji}</span>
                {isSelected && (
                  <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-amber-500 fill-amber-400" />
                )}
              </div>
              <span
                className="text-[11px] sm:text-xs font-bold text-center leading-tight line-clamp-1"
                style={{ color: jam.color }}
              >
                {jam.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
