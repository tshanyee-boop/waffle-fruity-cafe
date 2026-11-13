import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FruitId, JamFlavor } from '../types';
import { FruitIcon, FRUIT_DICTIONARY } from './FruitIcon';
import { Sparkles, X } from 'lucide-react';

interface WafflePlateProps {
  slotsCount: 2 | 3;
  placedFruits: (FruitId | null)[];
  jamFlavor?: JamFlavor;
  onRemoveFruit?: (index: number) => void;
  isCompleted?: boolean;
}

export const WafflePlate: React.FC<WafflePlateProps> = ({
  slotsCount,
  placedFruits,
  jamFlavor = 'none',
  onRemoveFruit,
  isCompleted = false,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Porcelain Serving Plate */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full bg-linear-to-b from-white via-rose-50/50 to-amber-50/80 border-8 border-amber-200/90 shadow-2xl flex items-center justify-center transition-all">
        {/* Decorative inner plate rim ring */}
        <div className="absolute inset-3 sm:inset-4 rounded-full border-2 border-dashed border-rose-300/60 pointer-events-none" />

        {/* Golden Heart Waffle Base */}
        <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 flex items-center justify-center">
          {/* Heart SVG Waffle Base */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="waffleBake" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="40%" stopColor="#fba04b" />
                <stop offset="85%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#c2410c" />
              </radialGradient>
              <pattern
                id="waffleGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect width="20" height="20" fill="transparent" />
                <rect
                  x="2"
                  y="2"
                  width="16"
                  height="16"
                  rx="3"
                  fill="#9a3412"
                  fillOpacity="0.32"
                  stroke="#7c2d12"
                  strokeWidth="1.2"
                />
                <rect
                  x="3"
                  y="3"
                  width="14"
                  height="14"
                  rx="2"
                  fill="#fed7aa"
                  fillOpacity="0.25"
                />
              </pattern>
            </defs>

            {/* Heart waffle body */}
            <path
              d="M 100,180 C 100,180 20,130 20,68 C 20,32 46,16 75,16 C 92,16 100,28 100,28 C 100,28 108,16 125,16 C 154,16 180,32 180,68 C 180,130 100,180 100,180 Z"
              fill="url(#waffleBake)"
              stroke="#9a3412"
              strokeWidth="4"
            />
            {/* Grid overlay */}
            <path
              d="M 100,172 C 100,172 26,124 26,68 C 26,38 48,22 75,22 C 89,22 97,32 100,32 C 103,32 111,22 125,22 C 152,22 174,38 174,68 C 174,124 100,172 100,172 Z"
              fill="url(#waffleGrid)"
            />
          </svg>

          {/* Central Whipped Cream Dollop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none drop-shadow-md z-10 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <defs>
                <radialGradient id="creamGrad" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#fffbeb" />
                  <stop offset="100%" stopColor="#fef3c7" />
                </radialGradient>
              </defs>
              <circle cx="40" cy="48" r="22" fill="url(#creamGrad)" />
              <circle cx="28" cy="50" r="16" fill="url(#creamGrad)" />
              <circle cx="52" cy="50" r="16" fill="url(#creamGrad)" />
              <circle cx="40" cy="34" r="15" fill="#ffffff" />
              <path d="M 40 20 Q 42 26 40 32" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
              <circle cx="40" cy="22" r="5" fill="#f43f5e" />
            </svg>
          </div>

          {/* Squeezed Jam Drizzle Layer (Rendered across waffle and fruit toppings) */}
          {jamFlavor !== 'none' && (
            <div className="absolute inset-0 pointer-events-none z-25 flex items-center justify-center">
              <JamDrizzleSVG flavor={jamFlavor} />
            </div>
          )}

          {/* Fruit Flesh Toppings: Positioned directly ON the waffle without any rigid boxes/grids */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {slotsCount === 2 ? (
              // 2 Fruit Toppings on the two heart lobes
              <div className="w-full h-full relative pointer-events-auto">
                {/* Fruit 1: Left Lobe */}
                <div className="absolute top-8 left-5 sm:top-10 sm:left-7 md:top-12 md:left-9">
                  <FruitToppingOnWaffle
                    slotNumber={1}
                    fruitId={placedFruits[0]}
                    rotation={-8}
                    onRemove={() => onRemoveFruit && onRemoveFruit(0)}
                  />
                </div>
                {/* Fruit 2: Right Lobe */}
                <div className="absolute top-8 right-5 sm:top-10 sm:right-7 md:top-12 md:right-9">
                  <FruitToppingOnWaffle
                    slotNumber={2}
                    fruitId={placedFruits[1]}
                    rotation={10}
                    onRemove={() => onRemoveFruit && onRemoveFruit(1)}
                  />
                </div>
              </div>
            ) : (
              // 3 Fruit Toppings on Left lobe, Right lobe, and Center lower lobe
              <div className="w-full h-full relative pointer-events-auto">
                {/* Fruit 1: Top-Left */}
                <div className="absolute top-7 left-5 sm:top-9 sm:left-7 md:top-10 md:left-8">
                  <FruitToppingOnWaffle
                    slotNumber={1}
                    fruitId={placedFruits[0]}
                    rotation={-12}
                    onRemove={() => onRemoveFruit && onRemoveFruit(0)}
                  />
                </div>
                {/* Fruit 2: Top-Right */}
                <div className="absolute top-7 right-5 sm:top-9 sm:right-7 md:top-10 md:right-8">
                  <FruitToppingOnWaffle
                    slotNumber={2}
                    fruitId={placedFruits[1]}
                    rotation={12}
                    onRemove={() => onRemoveFruit && onRemoveFruit(1)}
                  />
                </div>
                {/* Fruit 3: Bottom Center */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-5 md:bottom-7">
                  <FruitToppingOnWaffle
                    slotNumber={3}
                    fruitId={placedFruits[2]}
                    rotation={0}
                    onRemove={() => onRemoveFruit && onRemoveFruit(2)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Completion Badge */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5 z-30 font-bold text-xs uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 fill-amber-200" />
            <span>Wafel Siap!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface FruitToppingOnWaffleProps {
  slotNumber: number;
  fruitId: FruitId | null;
  rotation?: number;
  onRemove: () => void;
}

// Pure Fruit Flesh placed directly on the waffle surface (No boxes, no square grids!)
const FruitToppingOnWaffle: React.FC<FruitToppingOnWaffleProps> = ({
  slotNumber,
  fruitId,
  rotation = 0,
  onRemove,
}) => {
  return (
    <div className="relative group flex items-center justify-center">
      <AnimatePresence mode="wait">
        {fruitId ? (
          <motion.div
            key={fruitId}
            initial={{ scale: 0, y: -25, rotate: rotation - 20 }}
            animate={{ scale: 1, y: 0, rotate: rotation }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 14, stiffness: 220 }}
            className="relative cursor-pointer select-none"
            onClick={onRemove}
            title={`Klik untuk buang ${FRUIT_DICTIONARY[fruitId]?.name}`}
          >
            {/* Pure fruit flesh lying naturally on the waffle with realistic shadow */}
            <div className="relative transform hover:scale-110 transition-transform filter drop-shadow-[0_8px_12px_rgba(120,53,15,0.45)]">
              <FruitIcon fruitId={fruitId} size="lg" showShadow={false} />

              {/* Discreet hover remove badge */}
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-95 shadow-md transition-opacity cursor-pointer z-30"
                aria-label={`Buang ${FRUIT_DICTIONARY[fruitId]?.name}`}
              >
                <X className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
          </motion.div>
        ) : (
          // Soft natural glow guide on the waffle surface (No ugly square boxes!)
          <motion.div
            key="empty"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-dashed border-amber-300/80 bg-amber-200/20 backdrop-blur-[1px] flex flex-col items-center justify-center pointer-events-none text-amber-900/90 shadow-xs"
          >
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 drop-shadow-xs">
              Letak {slotNumber}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Squeezed Jam Drizzle SVG
const JamDrizzleSVG: React.FC<{ flavor: JamFlavor }> = ({ flavor }) => {
  const flavorConfig = {
    strawberry: {
      color: '#e11d48',
      strokeWidth: 6,
      filter: 'drop-shadow(0 2px 4px rgba(225, 29, 72, 0.45))',
      opacity: 0.9,
    },
    chocolate: {
      color: '#451a03',
      strokeWidth: 7,
      filter: 'drop-shadow(0 2px 4px rgba(69, 26, 3, 0.55))',
      opacity: 0.95,
    },
    maple: {
      color: '#ca8a04',
      strokeWidth: 6,
      filter: 'drop-shadow(0 2px 4px rgba(202, 138, 4, 0.45))',
      opacity: 0.88,
    },
    blueberry: {
      color: '#2563eb',
      strokeWidth: 6,
      filter: 'drop-shadow(0 2px 4px rgba(37, 99, 235, 0.45))',
      opacity: 0.9,
    },
    none: {
      color: 'transparent',
      strokeWidth: 0,
      filter: '',
      opacity: 0,
    },
  }[flavor];

  if (flavor === 'none') return null;

  return (
    <motion.svg
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: flavorConfig.opacity }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewBox="0 0 200 200"
      className="w-full h-full pointer-events-none"
      style={{ filter: flavorConfig.filter }}
    >
      <path
        d="M 45 65 Q 75 40 100 70 T 155 60"
        stroke={flavorConfig.color}
        strokeWidth={flavorConfig.strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 35 100 Q 70 80 100 115 T 165 95"
        stroke={flavorConfig.color}
        strokeWidth={flavorConfig.strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 55 135 Q 90 120 100 150 T 145 130"
        stroke={flavorConfig.color}
        strokeWidth={flavorConfig.strokeWidth - 1}
        strokeLinecap="round"
        fill="none"
      />
      {/* Glossy syrup gleams */}
      <path
        d="M 48 63 Q 76 38 100 68 T 153 58"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
      />
      <path
        d="M 38 98 Q 72 78 100 113 T 163 93"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
      />
    </motion.svg>
  );
};
