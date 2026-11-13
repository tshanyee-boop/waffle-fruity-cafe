import React from 'react';
import { FruitId, FruitItem } from '../types';

export const FRUIT_DICTIONARY: Record<FruitId, FruitItem> = {
  apple: {
    id: 'apple',
    name: 'Epal',
    color: '#e11d48',
    bgLight: '#ffe4e6',
    borderColor: '#fda4af',
    shapeDescription: 'Epal merah berbentuk bulat dengan daun hijau comel',
  },
  banana: {
    id: 'banana',
    name: 'Pisang',
    color: '#facc15',
    bgLight: '#fef9c3',
    borderColor: '#fde047',
    shapeDescription: 'Pisang segar dikupas berwarna kuning cerah',
  },
  mango: {
    id: 'mango',
    name: 'Mangga',
    color: '#f59e0b',
    bgLight: '#fef3c7',
    borderColor: '#fde68a',
    shapeDescription: 'Mangga masak keemasan dengan daun hijau',
  },
  orange: {
    id: 'orange',
    name: 'Oren',
    color: '#ea580c',
    bgLight: '#ffedd5',
    borderColor: '#fed7aa',
    shapeDescription: 'Hirisan oren berjus yang segar dan manis',
  },
  watermelon: {
    id: 'watermelon',
    name: 'Tembikai',
    color: '#ef4444',
    bgLight: '#fee2e2',
    borderColor: '#fca5a5',
    shapeDescription: 'Potongan tembikai merah dengan kulit hijau',
  },
  pineapple: {
    id: 'pineapple',
    name: 'Nanas',
    color: '#d97706',
    bgLight: '#fef3c7',
    borderColor: '#fde68a',
    shapeDescription: 'Nanas kuning keemasan yang manis',
  },
  strawberry: {
    id: 'strawberry',
    name: 'Strawberi',
    color: '#f43f5e',
    bgLight: '#fff1f2',
    borderColor: '#fecdd3',
    shapeDescription: 'Beri merah berbentuk hati yang comel',
  },
  blueberry: {
    id: 'blueberry',
    name: 'Beri Biru',
    color: '#3b82f6',
    bgLight: '#eff6ff',
    borderColor: '#bfdbfe',
    shapeDescription: 'Beri biru bulat yang manis dan segar',
  },
};

interface FruitIconProps {
  fruitId: FruitId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showShadow?: boolean;
}

export const FruitIcon: React.FC<FruitIconProps> = ({
  fruitId,
  size = 'md',
  className = '',
  showShadow = true,
}) => {
  const pixelSize = {
    sm: 38,
    md: 58,
    lg: 78,
    xl: 104,
  }[size];

  const shadowStyle = showShadow ? 'drop-shadow-md' : '';

  switch (fruitId) {
    case 'banana':
      // Exact light yellow peeled banana with transparent background (no white box)
      return (
        <div
          style={{ width: pixelSize, height: pixelSize }}
          className={`relative flex items-center justify-center p-0.5 ${shadowStyle} ${className}`}
        >
          <img
            src="/public/assets/banana_transparent.png"
            alt="Pisang Kuning Segar"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      );

    case 'mango':
      // Exact deep golden yellow mango with leaf with transparent background (no white box)
      return (
        <div
          style={{ width: pixelSize, height: pixelSize }}
          className={`relative flex items-center justify-center p-0.5 ${shadowStyle} ${className}`}
        >
          <img
            src="/public/assets/mango_transparent.png"
            alt="Mangga Emas Masak"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      );

    case 'apple':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 100 100"
          className={`${shadowStyle} ${className}`}
        >
          <defs>
            <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ff5252" />
              <stop offset="60%" stopColor="#e53935" />
              <stop offset="100%" stopColor="#b71c1c" />
            </radialGradient>
            <radialGradient id="appleGleam" cx="30%" cy="25%" r="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M 50 24 C 52 14, 57 10, 62 8 C 61 14, 56 22, 50 24 Z" fill="#5d4037" />
          <path d="M 50 20 C 58 12, 70 14, 72 20 C 66 26, 54 26, 50 20 Z" fill="#4caf50" />
          <path
            d="M 50 25 C 36 21, 20 28, 16 46 C 12 64, 26 88, 48 92 C 50 92, 50 92, 52 92 C 74 88, 88 64, 84 46 C 80 28, 64 21, 50 25 Z"
            fill="url(#appleGrad)"
          />
          <ellipse cx="34" cy="38" rx="10" ry="16" fill="url(#appleGleam)" transform="rotate(-15 34 38)" />
          <circle cx="68" cy="42" r="3.5" fill="#ffffff" fillOpacity="0.4" />
        </svg>
      );

    case 'orange':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 100 100"
          className={`${shadowStyle} ${className}`}
        >
          <defs>
            <radialGradient id="orangeRind" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
            <radialGradient id="orangePulp" cx="50%" cy="50%" r="48%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="60%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="42" fill="url(#orangeRind)" />
          <circle cx="50" cy="50" r="37" fill="#ffedd5" />
          <circle cx="50" cy="50" r="34" fill="url(#orangePulp)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle} 50 50)`}>
              <path d="M 50 48 L 43 25 C 47 23, 53 23, 57 25 Z" fill="#ea580c" opacity="0.9" />
              <path d="M 50 46 L 44 26 C 47 24, 53 24, 56 26 Z" fill="#fb923c" />
            </g>
          ))}
          <circle cx="50" cy="50" r="4" fill="#ffedd5" />
          <circle cx="50" cy="50" r="2.5" fill="#ea580c" />
        </svg>
      );

    case 'watermelon':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 100 100"
          className={`${shadowStyle} ${className}`}
        >
          <defs>
            <radialGradient id="melonPulp" cx="50%" cy="65%" r="60%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="70%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>
          </defs>
          <path d="M 12 70 C 14 86, 86 86, 88 70 L 50 16 Z" fill="#15803d" />
          <path d="M 15 68 C 17 82, 83 82, 85 68 L 50 20 Z" fill="#bbf7d0" />
          <path d="M 19 65 C 22 76, 78 76, 81 65 L 50 23 Z" fill="url(#melonPulp)" />
          <ellipse cx="40" cy="46" rx="2.5" ry="4" fill="#18181b" transform="rotate(-15 40 46)" />
          <ellipse cx="60" cy="46" rx="2.5" ry="4" fill="#18181b" transform="rotate(15 60 46)" />
          <ellipse cx="50" cy="58" rx="2.5" ry="4" fill="#18181b" />
          <ellipse cx="32" cy="58" rx="2" ry="3.5" fill="#18181b" transform="rotate(-25 32 58)" />
          <ellipse cx="68" cy="58" rx="2" ry="3.5" fill="#18181b" transform="rotate(25 68 58)" />
        </svg>
      );

    case 'pineapple':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 100 100"
          className={`${shadowStyle} ${className}`}
        >
          <defs>
            <radialGradient id="pineBody" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>
          </defs>
          <path d="M 50 32 L 40 10 C 44 20, 48 26, 50 32 Z" fill="#22c55e" />
          <path d="M 50 32 L 60 10 C 56 20, 52 26, 50 32 Z" fill="#16a34a" />
          <path d="M 50 32 L 32 18 C 40 24, 46 28, 50 32 Z" fill="#15803d" />
          <path d="M 50 32 L 68 18 C 60 24, 54 28, 50 32 Z" fill="#16a34a" />
          <path d="M 50 32 L 50 6 C 52 16, 51 24, 50 32 Z" fill="#4ade80" />
          <rect x="24" y="30" width="52" height="58" rx="24" fill="url(#pineBody)" />
          <path
            d="M 32 42 L 68 78 M 40 34 L 74 68 M 26 52 L 60 86 M 68 42 L 32 78 M 60 34 L 26 68 M 74 52 L 40 86"
            stroke="#a16207"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx="50" cy="54" r="3" fill="#fef08a" />
          <circle cx="38" cy="64" r="2.5" fill="#fef08a" />
          <circle cx="62" cy="64" r="2.5" fill="#fef08a" />
        </svg>
      );

    case 'strawberry':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 100 100"
          className={`${shadowStyle} ${className}`}
        >
          <defs>
            <radialGradient id="strawGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#9f1239" />
            </radialGradient>
          </defs>
          <path
            d="M 50 25 C 28 25, 20 45, 26 68 C 32 86, 46 95, 50 96 C 54 95, 68 86, 74 68 C 80 45, 72 25, 50 25 Z"
            fill="url(#strawGrad)"
          />
          <path d="M 50 27 L 44 14 C 47 22, 49 26, 50 27 Z" fill="#22c55e" />
          <path d="M 50 27 L 50 10 C 51 20, 50 26, 50 27 Z" fill="#16a34a" />
          <path d="M 50 27 L 56 14 C 53 22, 51 26, 50 27 Z" fill="#22c55e" />
          {[
            [40, 42],
            [52, 40],
            [62, 44],
            [34, 55],
            [46, 54],
            [58, 56],
            [68, 57],
            [42, 68],
            [54, 69],
          ].map(([x, y], idx) => (
            <ellipse
              key={idx}
              cx={x}
              cy={y}
              rx="1.8"
              ry="2.8"
              fill="#fef08a"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
          ))}
          <ellipse cx="34" cy="40" rx="4" ry="8" fill="#ffffff" opacity="0.4" transform="rotate(-20 34 40)" />
        </svg>
      );

    case 'blueberry':
    default:
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 100 100"
          className={`${shadowStyle} ${className}`}
        >
          <defs>
            <radialGradient id="blueGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="54" r="36" fill="url(#blueGrad)" />
          <polygon
            points="50,22 44,28 38,22 42,32 50,30 58,32 62,22 56,28"
            fill="#1e3a8a"
          />
          <circle cx="50" cy="30" r="4" fill="#172554" />
          <circle cx="38" cy="46" r="5" fill="#93c5fd" opacity="0.6" />
        </svg>
      );
  }
};
