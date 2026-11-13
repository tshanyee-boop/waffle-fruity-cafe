import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { FruitId, JamFlavor, GameStationId } from '../types';
import { WafflePlate } from '../components/WafflePlate';
import { JamSqueezer } from '../components/JamSqueezer';
import { FruitIcon, FRUIT_DICTIONARY } from '../components/FruitIcon';
import { AudioSpeakerButton } from '../components/AudioSpeakerButton';
import { playSound } from '../utils/audio';
import { Star, Trophy, Sparkles, RotateCcw, Heart, ChefHat } from 'lucide-react';

interface SlideVictoryProps {
  onRestart: () => void;
  onJumpStation: (station: GameStationId) => void;
}

// 8 fruits - Kiwi replaced with Mango!
const ALL_FRUITS: FruitId[] = [
  'strawberry',
  'banana',
  'mango',
  'orange',
  'pineapple',
  'watermelon',
  'apple',
  'blueberry',
];

export const SlideVictory: React.FC<SlideVictoryProps> = ({
  onRestart,
  onJumpStation,
}) => {
  const [freePlayFruits, setFreePlayFruits] = useState<(FruitId | null)[]>([
    'strawberry',
    'banana',
    'mango',
  ]);
  const [freePlayJam, setFreePlayJam] = useState<JamFlavor>('strawberry');

  const celebrationSpeech =
    'Tahniah Cef Cilik! Anda telah berjaya menyiapkan semua tiga pesanan pelanggan, memicit jem yang sedap, dan memperoleh ketiga-tiga Bintang Cef! Anda kini ialah Ketua Cef Cilik rasmi!';

  useEffect(() => {
    playSound.starFanfare();
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.4 },
    });
  }, []);

  const handleFruitClick = (fruitId: FruitId) => {
    playSound.pop();
    const emptyIdx = freePlayFruits.findIndex((f) => f === null);
    if (emptyIdx !== -1) {
      const updated = [...freePlayFruits];
      updated[emptyIdx] = fruitId;
      setFreePlayFruits(updated);
    } else {
      const updated = [...freePlayFruits];
      updated[0] = fruitId;
      setFreePlayFruits(updated);
    }
  };

  const handleRemoveFruit = (index: number) => {
    playSound.pop();
    const updated = [...freePlayFruits];
    updated[index] = null;
    setFreePlayFruits(updated);
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/assets/aistudio/image_cdd61237.png"
          alt="Cafe Interior"
          className="w-full h-full object-cover object-center filter brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-amber-950/80 via-amber-950/40 to-amber-900/40" />
      </div>

      {/* Floating Sparkles & Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', x: `${8 + i * 9}%`, opacity: 0 }}
            animate={{
              y: '-20%',
              opacity: [0, 1, 0],
              scale: [0.6, 1.2, 0.8],
            }}
            transition={{
              duration: 4.5 + (i % 2),
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute"
          >
            {i % 2 === 0 ? (
              <Star className="w-6 h-6 fill-amber-300 text-amber-500" />
            ) : (
              <Heart className="w-5 h-5 fill-rose-400 text-rose-500" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Top Banner */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-20 max-w-4xl mx-auto w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-4 border-amber-400 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Trophy className="w-8 h-8 fill-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black uppercase tracking-wider">
                Acara Kemuncak
              </span>
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider">
                Sijil Kecemerlangan
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-amber-950 mt-0.5">
              Tahniah, Ketua Cef Cilik! 🏆
            </h1>
            <p className="text-xs sm:text-sm font-bold text-amber-800">
              Semua 3 Pesanan Dihantar · 3 / 3 Bintang Cef Diperoleh! ⭐⭐⭐
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AudioSpeakerButton
            textToSpeak={celebrationSpeech}
            label="Dengar Ucapan Anugerah"
            autoPlayOnMount={true}
          />
        </div>
      </motion.div>

      {/* Center Layout: Certificate & Free Play Kitchen with Jam Squeezer */}
      <div className="relative z-20 max-w-6xl mx-auto w-full my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Certificate Card on Left */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-6 bg-amber-50/95 border-6 border-amber-300 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-2 left-2 text-amber-400">
            <Sparkles className="w-6 h-6 fill-amber-300" />
          </div>
          <div className="absolute top-2 right-2 text-amber-400">
            <Sparkles className="w-6 h-6 fill-amber-300" />
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/80 text-amber-950 text-xs font-extrabold uppercase tracking-widest mb-2">
              <ChefHat className="w-4 h-4 text-rose-600" />
              <span>Anugerah Rasmi</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-amber-950 tracking-wide uppercase">
              Diploma Cef Cilik Hebat
            </h2>
            <div className="h-0.5 w-24 bg-amber-400 mx-auto my-2" />

            <p className="text-stone-700 text-xs sm:text-sm font-semibold mb-3">
              Sijil ini dianugerahkan kepada Cef Cilik berbakat besar kerana berjaya menyiapkan pesanan Lia, Mia, dan Toby, menghias buah-buahan segar, memicit jem manis, dan menjadi cef terhebat!
            </p>

            {/* Three Golden Stars */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="flex flex-col items-center">
                <Star className="w-10 h-10 fill-amber-400 text-amber-500 drop-shadow-md animate-bounce" />
                <span className="text-[10px] font-extrabold text-amber-900 mt-1">
                  Bintang Lia
                </span>
              </div>
              <div className="text-amber-400 text-xl font-black">+</div>
              <div className="flex flex-col items-center">
                <Star
                  className="w-10 h-10 fill-amber-400 text-amber-500 drop-shadow-md animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                />
                <span className="text-[10px] font-extrabold text-amber-900 mt-1">
                  Bintang Mia
                </span>
              </div>
              <div className="text-amber-400 text-xl font-black">+</div>
              <div className="flex flex-col items-center">
                <Star
                  className="w-10 h-10 fill-amber-400 text-amber-500 drop-shadow-md animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                />
                <span className="text-[10px] font-extrabold text-amber-900 mt-1">
                  Bintang Toby
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-amber-300 flex items-center justify-between text-xs text-amber-900 font-bold">
              <span>Waffle Fruity Café</span>
              <span className="text-rose-600">Gred: Ketua Cef Cilik Terhebat</span>
            </div>
          </div>
        </motion.div>

        {/* Free Play Kitchen on Right (Includes Jam Squeezer!) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-3 border-amber-300 shadow-2xl flex flex-col items-center"
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
              <span>🎨</span>
              <span>Dapur Bebas: Reka Wafel Anda Sendiri!</span>
            </span>
            <span className="text-xs text-stone-600 font-semibold">
              Klik buah & picit jem
            </span>
          </div>

          {/* Waffle with Fruits & Jam */}
          <div className="scale-85 sm:scale-90 -my-4">
            <WafflePlate
              slotsCount={3}
              placedFruits={freePlayFruits}
              jamFlavor={freePlayJam}
              onRemoveFruit={handleRemoveFruit}
              isCompleted={true}
            />
          </div>

          {/* Jam Squeezer in Free Play */}
          <div className="w-full mt-1">
            <JamSqueezer
              currentJam={freePlayJam}
              onSelectJam={(flavor) => setFreePlayJam(flavor)}
            />
          </div>

          {/* Fruit selector ribbon (Kiwi replaced with Mango) */}
          <div className="w-full mt-2">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {ALL_FRUITS.map((fruitId) => (
                <button
                  key={fruitId}
                  type="button"
                  onClick={() => handleFruitClick(fruitId)}
                  className="p-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
                  title={FRUIT_DICTIONARY[fruitId]?.name}
                >
                  <FruitIcon fruitId={fruitId} size="sm" showShadow={false} />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Replay Action Bar */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            playSound.click();
            onRestart();
          }}
          className="px-5 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-300 shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-700" />
          <span>MULA SEMULA</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playSound.click();
            onJumpStation('CUSTOMER_1_ORDER');
          }}
          className="px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>ULANG PELANGGAN 1 (LIA)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playSound.click();
            onJumpStation('CUSTOMER_2_ORDER');
          }}
          className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>ULANG PELANGGAN 2 (MIA)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playSound.click();
            onJumpStation('CUSTOMER_3_ORDER');
          }}
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>ULANG PELANGGAN 3 (TOBY)</span>
        </button>
      </div>
    </div>
  );
};
