import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideTitleProps {
  onStart: () => void;
}

export const SlideTitle: React.FC<SlideTitleProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Cafe Interior */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/assets/aistudio/image_cdd61237.png"
          alt="Waffle Fruity Cafe"
          className="w-full h-full object-cover object-center filter brightness-[0.94]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-amber-950/40 via-transparent to-amber-950/20" />
      </div>

      {/* Center Welcome Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 bg-white/92 backdrop-blur-md px-8 py-8 sm:px-14 sm:py-10 rounded-3xl border-4 border-amber-300 shadow-2xl flex flex-col items-center text-center max-w-xl mx-auto"
      >
        <span className="text-base sm:text-lg font-bold text-rose-600 mb-1 tracking-wide">
          Selamat Datang ke
        </span>

        {/* Restaurant Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-950 tracking-tight leading-tight mb-2">
          WAFFLE FRUITY CAFÉ
        </h1>

        <p className="text-stone-600 text-sm sm:text-base font-semibold mb-6">
          Jom jadi Cef Cilik! 🍓🍌🧇
        </p>

        {/* Big Start Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            playSound.pop();
            onStart();
          }}
          className="px-10 py-4 sm:px-12 sm:py-5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-2xl sm:text-3xl shadow-xl hover:shadow-2xl border-b-4 border-teal-700 transition-all flex items-center gap-3 cursor-pointer"
        >
          <Play className="w-7 h-7 fill-white" />
          <span>MULA</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
