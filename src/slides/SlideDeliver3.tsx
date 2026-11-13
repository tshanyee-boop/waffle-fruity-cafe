import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { AudioSpeakerButton } from '../components/AudioSpeakerButton';
import { WafflePlate } from '../components/WafflePlate';
import { playSound } from '../utils/audio';
import {
  Star,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Trophy,
  ClipboardCheck,
} from 'lucide-react';

interface SlideDeliver3Props {
  onComplete: () => void;
}

export const SlideDeliver3: React.FC<SlideDeliver3Props> = ({ onComplete }) => {
  const [feedbackShown, setFeedbackShown] = useState(false);
  const [q1Answer, setQ1Answer] = useState<string | null>(null);
  const [q2Answer, setQ2Answer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{
    questionId: 1 | 2 | null;
    isCorrect: boolean;
    text: string;
  }>({
    questionId: null,
    isCorrect: false,
    text: '',
  });

  const instructions =
    'Jawab 2 soalan mudah di bawah untuk mendapat Bintang Cef ke-3 dan menebus Trofi anda!';
  const audioText =
    'Terima kasih banyak, Cef! Wafel nanas, oren, dan mangga saya sangat sedap! Anda cef paling hebat!';
  const q1AudioText =
    'Soalan 1: Apakah warna buah mangga yang masak? A: Kuning. B: Biru. C: Hitam.';
  const q2AudioText =
    'Soalan 2: Buah manakah yang ada di atas wafel Toby? A: Strawberi. B: Nanas. C: Epal.';
  const feedbackText =
    'Horey! Anda berjaya menjawab kedua-dua soalan dan memperoleh kesemua 3 Bintang Cef!';

  const q1Correct = q1Answer === 'A';
  const q2Correct = q2Answer === 'B';
  const bothQuestionsPassed = q1Correct && q2Correct;

  useEffect(() => {
    playSound.starFanfare();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#10b981', '#f59e0b', '#ea580c', '#3b82f6', '#ec4899'],
    });
  }, []);

  const handleSelectQ1 = (choice: 'A' | 'B' | 'C') => {
    setQ1Answer(choice);
    if (choice === 'A') {
      playSound.success();
      setQuizFeedback({
        questionId: 1,
        isCorrect: true,
        text: 'Syabas! Betul! Buah mangga yang masak berwarna kuning! 🥭',
      });
      if (q2Correct) {
        triggerGrandFanfare();
      }
    } else {
      playSound.error();
      setQuizFeedback({
        questionId: 1,
        isCorrect: false,
        text: 'Tidak mengapa! Cuba lihat warna buah mangga di atas wafel. Cuba lagi!',
      });
    }
  };

  const handleSelectQ2 = (choice: 'A' | 'B' | 'C') => {
    setQ2Answer(choice);
    if (choice === 'B') {
      playSound.success();
      setQuizFeedback({
        questionId: 2,
        isCorrect: true,
        text: 'Pandai! Betul! Nanas ada di atas wafel Toby! 🍍',
      });
      if (q1Correct) {
        triggerGrandFanfare();
      }
    } else {
      playSound.error();
      setQuizFeedback({
        questionId: 2,
        isCorrect: false,
        text: 'Cuba lihat gambar wafel Toby di sebelah kiri. Buah manakah yang ada di atasnya? Cuba lagi!',
      });
    }
  };

  const triggerGrandFanfare = () => {
    playSound.starFanfare();
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#10b981', '#f59e0b', '#ea580c', '#3b82f6', '#ec4899'],
    });
  };

  const handleNextClick = () => {
    playSound.success();
    setFeedbackShown(true);
    setTimeout(() => {
      onComplete();
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
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '100%',
              x: `${8 + i * 10}%`,
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
              delay: i * 0.35,
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
      <div className="relative z-20 max-w-5xl mx-auto w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-black uppercase tracking-wider">
              Dihantar!
            </span>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Hantar & Soalan Pelanggan #3
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
            Wafel Tropika Toby Berjaya Dihantar!
          </h1>
          <p className="text-stone-700 text-xs sm:text-sm font-semibold">
            Arahan: <span className="text-rose-600 font-bold">{instructions}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AudioSpeakerButton
            textToSpeak={audioText}
            character="boy"
            label="Ucapan Toby"
            autoPlayOnMount={true}
          />
        </div>
      </div>

      {/* Center Delivery Showcase: Consistent 1st Chef + Toby on Left, 2 Simple Kid-Friendly Questions on Right */}
      <div className="relative z-20 max-w-6xl mx-auto w-full my-auto py-3 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Column (5 cols): Chef and Toby celebrating together + mini waffle */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Star Badge Centerpiece */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-linear-to-r from-amber-400 via-amber-300 to-yellow-400 text-amber-950 border-2 border-white shadow-lg mb-2.5"
          >
            <Star
              className="w-5 h-5 fill-amber-500 text-amber-600 animate-spin"
              style={{ animationDuration: '8s' }}
            />
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-widest block text-amber-900 leading-none">
                Anugerah Stesen
              </span>
              <span className="text-xs sm:text-sm font-black tracking-wide">
                Bintang Cef Ke-3 ⭐⭐⭐
              </span>
            </div>
            <Sparkles className="w-4 h-4 fill-amber-500 text-amber-600" />
          </motion.div>

          {/* Consistent 1st Chef and Toby Celebrating Together */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-amber-50 group mb-2"
          >
            <img
              src="/src/assets/images/customer3_deliver_toby_1794541189282.jpg"
              alt="Cef menghantar wafel tropika kepada Pelanggan Toby"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-amber-950/90 via-amber-950/60 to-transparent p-2 text-white text-center">
              <p className="text-xs font-bold leading-tight">Cef & Pelanggan Toby</p>
            </div>
          </motion.div>

          {/* Mini Completed Tropical Waffle */}
          <div className="scale-65 sm:scale-75 -my-8 sm:-my-6">
            <WafflePlate
              slotsCount={3}
              placedFruits={['pineapple', 'orange', 'mango']}
              jamFlavor="maple"
              isCompleted={true}
            />
          </div>
        </div>

        {/* Right Column (7 cols): Two Simple Questions + Trophy Button */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {/* Question 1 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-3.5 sm:p-4 rounded-3xl border-3 shadow-md transition-all ${
              q1Correct
                ? 'bg-emerald-50/95 border-emerald-400'
                : 'bg-white/95 border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <ClipboardCheck className="w-4 h-4" />
                <span>Soalan 1: Warna Mangga</span>
              </span>

              <div className="flex items-center gap-2">
                <AudioSpeakerButton
                  textToSpeak={q1AudioText}
                  label="Baca Soalan 1"
                  size="sm"
                  autoPlayOnMount={false}
                />
                {q1Correct && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Betul!
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-2.5">
              Apakah warna buah mangga yang masak?
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'A', label: 'A. Kuning 🥭' },
                { key: 'B', label: 'B. Biru' },
                { key: 'C', label: 'C. Hitam' },
              ].map(({ key, label }) => {
                const isSelected = q1Answer === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectQ1(key as 'A' | 'B' | 'C')}
                    className={`py-2.5 px-2 rounded-2xl font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                      isSelected
                        ? key === 'A'
                          ? 'bg-emerald-500 border-emerald-600 text-white shadow-md'
                          : 'bg-rose-100 border-rose-400 text-rose-900'
                        : 'bg-stone-50 hover:bg-amber-50 border-stone-200 hover:border-amber-400 text-stone-800'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Question 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-3.5 sm:p-4 rounded-3xl border-3 shadow-md transition-all ${
              q2Correct
                ? 'bg-emerald-50/95 border-emerald-400'
                : 'bg-white/95 border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <ClipboardCheck className="w-4 h-4" />
                <span>Soalan 2: Buah Pilihan Toby</span>
              </span>

              <div className="flex items-center gap-2">
                <AudioSpeakerButton
                  textToSpeak={q2AudioText}
                  label="Baca Soalan 2"
                  size="sm"
                  autoPlayOnMount={false}
                />
                {q2Correct && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Betul!
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-2.5">
              Buah manakah yang ada di atas wafel Toby?
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'A', label: 'A. Strawberi' },
                { key: 'B', label: 'B. Nanas 🍍' },
                { key: 'C', label: 'C. Epal' },
              ].map(({ key, label }) => {
                const isSelected = q2Answer === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectQ2(key as 'A' | 'B' | 'C')}
                    className={`py-2.5 px-2 rounded-2xl font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                      isSelected
                        ? key === 'B'
                          ? 'bg-emerald-500 border-emerald-600 text-white shadow-md'
                          : 'bg-rose-100 border-rose-400 text-rose-900'
                        : 'bg-stone-50 hover:bg-amber-50 border-stone-200 hover:border-amber-400 text-stone-800'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Feedback banner */}
          <AnimatePresence>
            {quizFeedback.text && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border-2 ${
                  quizFeedback.isCorrect
                    ? 'bg-emerald-100/90 border-emerald-400 text-emerald-950'
                    : 'bg-rose-100/90 border-rose-400 text-rose-950'
                }`}
              >
                {quizFeedback.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{quizFeedback.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action button: If questions are completed, allow proceeding to Grand Trophy */}
          {bothQuestionsPassed ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-1 flex flex-col gap-2"
            >
              <AnimatePresence>
                {feedbackShown && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-4 py-2 bg-emerald-500 text-white font-black rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{feedbackText}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNextClick}
                disabled={feedbackShown}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-base sm:text-lg shadow-xl hover:shadow-2xl border-b-4 border-amber-700 transition-all flex items-center justify-center gap-2.5 cursor-pointer animate-pulse-glow"
              >
                <Trophy className="w-5 h-5 fill-white" />
                <span>TEBUS TROFI KETUA CEF!</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ) : (
            <div className="p-3 bg-amber-100/80 border border-amber-300 rounded-2xl text-center text-xs font-bold text-amber-900">
              💡 Sila jawab kedua-dua soalan di atas untuk mendapat Bintang Cef ke-3 anda!
            </div>
          )}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-20 text-center text-xs font-semibold text-amber-900 bg-white/70 backdrop-blur-xs py-1.5 px-4 rounded-xl max-w-xl mx-auto shadow-xs">
        🏆 Semua 3 pesanan pelanggan berjaya disediakan dan dihantar! Jawab soalan untuk menebus trofi!
      </div>
    </div>
  );
};
