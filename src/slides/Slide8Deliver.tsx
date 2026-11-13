import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { AudioSpeakerButton } from '../components/AudioSpeakerButton';
import { playSound } from '../utils/audio';
import { Star, Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Slide8DeliverProps {
  onNextOrder: () => void;
}

export const Slide8Deliver: React.FC<Slide8DeliverProps> = ({ onNextOrder }) => {
  const [feedbackShown, setFeedbackShown] = useState(false);

  const instructions = 'Klik butang PELANGGAN SETERUSNYA untuk menyambut Pelanggan 2.';
  const audioText =
    'Terima kasih, Cef! Wafel saya sangat cantik dan sedap! Jumpa lagi!';
  const feedbackText = 'Hebat! Anda telah berjaya mendapat Bintang Cef pertama anda!';

  useEffect(() => {
    playSound.starFanfare();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#f43f5e'],
    });
  }, []);

  const handleNextClick = () => {
    playSound.success();
    setFeedbackShown(true);
    setTimeout(() => {
      onNextOrder();
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
      {/* Background Cafe Interior */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/assets/aistudio/image_cd830d2f.png"
          alt="Cafe Interior"
          className="w-full h-full object-cover object-center filter brightness-[0.96]"
        />
        <div className="absolute inset-0 bg-amber-900/15" />
      </div>

      {/* Floating Animated Hearts & Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '100%',
              x: `${10 + i * 11}%`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              y: '-20%',
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
            className="absolute text-rose-500"
          >
            {i % 2 === 0 ? (
              <Heart className="w-6 h-6 fill-rose-400 text-rose-500 drop-shadow-md" />
            ) : (
              <Star className="w-7 h-7 fill-amber-300 text-amber-500 drop-shadow-md" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Top Banner */}
      <div className="relative z-20 max-w-4xl mx-auto w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-black uppercase tracking-wider">
              Dihantar!
            </span>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Pesanan Selesai
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
            Pesanan Lia Berjaya Dihantar!
          </h1>
          <p className="text-stone-700 text-xs sm:text-sm font-semibold">
            Arahan: <span className="text-rose-600 font-bold">{instructions}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AudioSpeakerButton
            textToSpeak={audioText}
            character="girl"
            label="Ucapan Terima Kasih Lia"
            autoPlayOnMount={true}
          />
        </div>
      </div>

      {/* Center Delivery Showcase: Showing Chef together with Customer Lia! */}
      <div className="relative z-20 max-w-4xl mx-auto w-full my-auto py-4 flex flex-col items-center text-center">
        {/* Star Badge Centerpiece */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-linear-to-r from-amber-400 via-amber-300 to-yellow-400 text-amber-950 border-3 border-white shadow-xl mb-3"
        >
          <Star className="w-7 h-7 fill-amber-500 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-widest block text-amber-900">
              Lencana Dibuka
            </span>
            <span className="text-sm sm:text-base font-black tracking-wide">
              Bintang Cef Pertama Diperoleh! ⭐
            </span>
          </div>
          <Sparkles className="w-5 h-5 fill-amber-500 text-amber-600" />
        </motion.div>

        {/* Chef and Customer Lia Celebrating Delivery Together */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="relative max-w-xs sm:max-w-sm w-full rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-amber-50 group mb-3"
        >
          <img
            src="/src/assets/images/chef_deliver_1794470726104.jpg"
            alt="Cef menghantar wafel kepada Pelanggan Lia"
            className="w-full h-56 sm:h-64 object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-amber-950/90 via-amber-950/60 to-transparent p-3 text-white text-center">
            <p className="text-xs sm:text-sm font-bold">
              "Terima kasih, Cef! Wafel saya sangat cantik dan sedap!"
            </p>
          </div>
        </motion.div>

        {/* Feedback Alert */}
        <AnimatePresence>
          {feedbackShown && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-3 px-6 py-2.5 bg-emerald-500 text-white font-black rounded-2xl shadow-xl flex items-center gap-2 text-base sm:text-lg"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span>{feedbackText}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Customer CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextClick}
          disabled={feedbackShown}
          className="px-8 sm:px-10 py-4 rounded-2xl bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl border-b-4 border-teal-700 transition-all flex items-center gap-3 cursor-pointer animate-pulse-glow"
        >
          <span>PELANGGAN SETERUSNYA (MIA)</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-20 text-center text-xs font-semibold text-amber-900 bg-white/70 backdrop-blur-xs py-1.5 px-4 rounded-xl max-w-xl mx-auto shadow-xs">
        🌟 Seterusnya: Pesanan pelanggan baharu dengan buah-buahan segar!
      </div>
    </div>
  );
};
