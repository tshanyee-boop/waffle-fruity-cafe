import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FruitId, JamFlavor } from '../types';
import { WafflePlate } from '../components/WafflePlate';
import { OrderCard } from '../components/OrderCard';
import { JamSqueezer } from '../components/JamSqueezer';
import { FruitIcon, FRUIT_DICTIONARY } from '../components/FruitIcon';
import { AudioSpeakerButton } from '../components/AudioSpeakerButton';
import { playSound } from '../utils/audio';
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

interface SlideCustomer3DecorateProps {
  onComplete: () => void;
}

// Shuffled fruit choices (scrambled order!)
const SIX_FRUITS_CUSTOMER3_SHUFFLED: FruitId[] = [
  'orange',
  'strawberry',
  'pineapple',
  'banana',
  'mango',
  'apple',
];

export const SlideCustomer3Decorate: React.FC<SlideCustomer3DecorateProps> = ({
  onComplete,
}) => {
  const [placedFruits, setPlacedFruits] = useState<(FruitId | null)[]>([null, null, null]);
  const [jamFlavor, setJamFlavor] = useState<JamFlavor>('maple');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'hint' | 'completed' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });
  const [isFinishing, setIsFinishing] = useState(false);

  const audioText =
    'Cef, pelanggan Toby mahu nanas, oren, dan mangga! Letakkan ketiga-tiga buah di atas wafel dan picit jem manis!';
  const instructions =
    'Pilih buah nanas, oren, dan mangga untuk menghias wafel. Picit jem yang sedap, kemudian siapkan pesanan!';

  const requiredFruits: FruitId[] = ['pineapple', 'orange', 'mango'];

  const hasPineapple = placedFruits.includes('pineapple');
  const hasOrange = placedFruits.includes('orange');
  const hasMango = placedFruits.includes('mango');
  const isAllThreeCorrect = hasPineapple && hasOrange && hasMango;

  const handleFruitClick = (fruitId: FruitId) => {
    if (isFinishing) return;

    if (requiredFruits.includes(fruitId)) {
      if (placedFruits.includes(fruitId)) {
        playSound.pop();
        setFeedback({
          type: 'success',
          message: `${FRUIT_DICTIONARY[fruitId].name} sudah diletakkan di atas wafel!`,
        });
        return;
      }

      const emptyIndex = placedFruits.findIndex((f) => f === null);
      if (emptyIndex !== -1) {
        playSound.pop();
        const updated = [...placedFruits];
        updated[emptyIndex] = fruitId;
        setPlacedFruits(updated);

        const checkPineapple = updated.includes('pineapple');
        const checkOrange = updated.includes('orange');
        const checkMango = updated.includes('mango');

        if (checkPineapple && checkOrange && checkMango) {
          playSound.success();
          setFeedback({
            type: 'success',
            message: 'Hebat! Nanas, Oren, dan Mangga semuanya ada di atas wafel! Sekarang picit jem kegemaran anda!',
          });
        } else {
          setFeedback({
            type: 'success',
            message: `Bagus! ${FRUIT_DICTIONARY[fruitId].name} sudah diletakkan! Sekarang pilih buah seterusnya.`,
          });
        }
      } else {
        playSound.pop();
      }
    } else {
      playSound.error();
      setFeedback({
        type: 'hint',
        message: 'Semak semula kad pesanan Toby (Nanas + Oren + Mangga).',
      });
    }
  };

  const handleRemoveFruit = (index: number) => {
    if (isFinishing) return;
    playSound.pop();
    const updated = [...placedFruits];
    updated[index] = null;
    setPlacedFruits(updated);
    setFeedback({
      type: null,
      message: '',
    });
  };

  const handleCompleteWaffle = () => {
    setIsFinishing(true);
    playSound.starFanfare();
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ea580c', '#10b981', '#ef4444', '#3b82f6'],
    });

    setFeedback({
      type: 'completed',
      message: 'Horey! Wafel tropika Toby sudah siap dihias! Bintang Cef ke-3 diperoleh!',
    });

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const checkedFruits = placedFruits.filter(Boolean) as FruitId[];

  return (
    <div className="relative min-h-[calc(100vh-70px)] p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/assets/aistudio/image_cd830d2f.png"
          alt="Cafe Dining Room"
          className="w-full h-full object-cover object-center filter brightness-[0.98]"
        />
        <div className="absolute inset-0 bg-amber-50/50 backdrop-blur-xs" />
      </div>

      {/* Top Section */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col gap-3">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-black uppercase tracking-wider">
                Stesen Dapur 3
              </span>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Pesanan Nanas, Oren & Mangga
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
              Wafel Buah Tropika!
            </h1>
            <p className="text-stone-700 text-xs sm:text-sm font-medium">
              Arahan: <span className="text-rose-600 font-bold">{instructions}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AudioSpeakerButton
              textToSpeak={audioText}
              label="Dengar Arahan"
              autoPlayOnMount={true}
            />
          </div>
        </div>

        {/* Top Order Checklist Banner */}
        <OrderCard
          fruits={requiredFruits}
          checkedFruits={checkedFruits}
          isCompact={true}
        />
      </div>

      {/* Center: Waffle Plate with visible fruit layers + Squeezed Jam */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
        <AnimatePresence mode="wait">
          {feedback.message && (
            <motion.div
              key={feedback.message}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`mb-2 px-5 py-2 rounded-2xl text-sm sm:text-base font-extrabold shadow-lg flex items-center gap-2 border-2 ${
                feedback.type === 'completed' || feedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-400 text-rose-900 animate-wiggle'
              }`}
            >
              {feedback.type === 'completed' || feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waffle Plate with 3 Slots & Jam */}
        <WafflePlate
          slotsCount={3}
          placedFruits={placedFruits}
          jamFlavor={jamFlavor}
          onRemoveFruit={handleRemoveFruit}
          isCompleted={isAllThreeCorrect}
        />

        {/* Jam Squeezer Station */}
        <div className="mt-2 w-full max-w-xl">
          <JamSqueezer
            currentJam={jamFlavor}
            onSelectJam={(flavor) => setJamFlavor(flavor)}
          />
        </div>

        {/* Complete Waffle Button */}
        <AnimatePresence>
          {isAllThreeCorrect && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              className="mt-3"
            >
              <button
                type="button"
                disabled={isFinishing}
                onClick={handleCompleteWaffle}
                className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl border-b-4 border-amber-700 transition-all flex items-center gap-3 cursor-pointer animate-pulse-glow"
              >
                <Sparkles className="w-6 h-6 fill-amber-200" />
                <span>SIAPKAN PESANAN & HANTAR</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Area: Six Shuffled Fruit Choices */}
      <div className="relative z-10 max-w-4xl mx-auto w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <span>🍍</span>
            <span>Sudut Buah Segar (Klik untuk Letak di Atas Wafel):</span>
          </span>
          <span className="text-xs text-stone-500 font-semibold">
            Semak tiket pesanan di atas
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {SIX_FRUITS_CUSTOMER3_SHUFFLED.map((fruitId) => {
            const fruit = FRUIT_DICTIONARY[fruitId];
            const isPlaced = placedFruits.includes(fruitId);

            return (
              <motion.button
                key={fruitId}
                type="button"
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleFruitClick(fruitId)}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
                  isPlaced
                    ? 'bg-amber-100/90 border-amber-400 ring-2 ring-amber-300 ring-offset-1'
                    : 'bg-white hover:bg-amber-50/80 border-amber-200 hover:border-amber-400'
                }`}
                title={`Klik untuk letak ${fruit.name}`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-1">
                  <FruitIcon fruitId={fruitId} size="md" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-amber-950">
                  {fruit.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
