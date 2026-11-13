import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { WafflePlate } from '../components/WafflePlate';
import { AudioSpeakerButton } from '../components/AudioSpeakerButton';
import { playSound } from '../utils/audio';
import { CheckCircle2, XCircle, ArrowRight, ClipboardCheck, Sparkles } from 'lucide-react';

interface Slide7QualityCheckProps {
  onPassed: () => void;
}

export const Slide7QualityCheck: React.FC<Slide7QualityCheckProps> = ({ onPassed }) => {
  const [q1Answer, setQ1Answer] = useState<string | null>(null);
  const [q2Answer, setQ2Answer] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{
    questionId: 1 | 2 | null;
    isCorrect: boolean;
    text: string;
  }>({
    questionId: null,
    isCorrect: false,
    text: '',
  });

  const instructions = 'Baca atau dengar soalan. Kemudian, pilih jawapan yang betul.';
  const introAudioText =
    'Wah, wafel sudah siap! Sebelum menghantar pesanan, mari kita jawab dua soalan dahulu!';

  const q1AudioText =
    'Soalan 1: Apakah warna buah pisang? A: Merah. B: Kuning. C: Jingga.';
  const q2AudioText =
    'Soalan 2: Buah manakah yang berbentuk bulat? A: Epal. B: Pisang. C: Nanas.';

  const q1Correct = q1Answer === 'B';
  const q2Correct = q2Answer === 'A';
  const allQuestionsCorrect = q1Correct && q2Correct;

  const handleSelectQ1 = (choice: 'A' | 'B' | 'C') => {
    setQ1Answer(choice);
    if (choice === 'B') {
      playSound.success();
      setFeedbackMsg({
        questionId: 1,
        isCorrect: true,
        text: 'Syabas! Jawapan anda betul! Buah pisang berwarna kuning. 🍌',
      });
    } else {
      playSound.error();
      setFeedbackMsg({
        questionId: 1,
        isCorrect: false,
        text: 'Tidak mengapa. Cuba lagi!',
      });
    }
  };

  const handleSelectQ2 = (choice: 'A' | 'B' | 'C') => {
    setQ2Answer(choice);
    if (choice === 'A') {
      playSound.success();
      setFeedbackMsg({
        questionId: 2,
        isCorrect: true,
        text: 'Syabas! Jawapan anda betul! Buah epal berbentuk bulat. 🍎',
      });
    } else {
      playSound.error();
      setFeedbackMsg({
        questionId: 2,
        isCorrect: false,
        text: 'Tidak mengapa. Cuba lagi!',
      });
    }
  };

  const handleDeliver = () => {
    playSound.starFanfare();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      onPassed();
    }, 700);
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/assets/aistudio/image_cd830d2f.png"
          alt="Cafe Interior"
          className="w-full h-full object-cover object-center filter brightness-[0.97]"
        />
        <div className="absolute inset-0 bg-amber-50/40" />
      </div>

      {/* Top Banner */}
      <div className="relative z-10 max-w-4xl mx-auto w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-black uppercase tracking-wider">
                Stesen Kualiti
              </span>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Stesen Cef
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
              Pemeriksaan Kualiti Cef!
            </h1>
            <p className="text-stone-700 text-xs sm:text-sm font-semibold">
              Arahan: <span className="text-rose-600 font-bold">{instructions}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AudioSpeakerButton
              textToSpeak={introAudioText}
              label="Dengar Cef"
              autoPlayOnMount={true}
            />
          </div>
        </div>

        {/* Main 2-Column Split */}
        <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Side: Chef Holding Checklist & Completed Apple/Banana Waffle */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-xl bg-amber-100 mb-2">
              <img
                src="/src/assets/images/chef_checklist_1794470727217.jpg"
                alt="Cef memegang senarai semak"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-amber-950/80 backdrop-blur-xs text-white text-center py-1 rounded-xl text-xs font-bold">
                Pemeriksa Kualiti Cef Cilik
              </div>
            </div>

          {/* Mini Completed Apple + Banana Waffle Plate preview with Jam */}
          <div className="scale-75 -mt-6">
            <WafflePlate
              slotsCount={2}
              placedFruits={['apple', 'banana']}
              jamFlavor="strawberry"
              isCompleted={true}
            />
          </div>
        </div>

        {/* Right Side: Two Questions with Individual Audio Read-Aloud Buttons */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Question 1 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 sm:p-5 rounded-3xl border-3 shadow-lg transition-all ${
              q1Correct
                ? 'bg-emerald-50/90 border-emerald-400'
                : 'bg-white/95 border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <ClipboardCheck className="w-4 h-4" />
                <span>Soalan 1 daripada 2</span>
              </span>

              <div className="flex items-center gap-2">
                {/* Audio button for Question 1 */}
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

            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3">
              Apakah warna buah pisang?
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'A', label: 'A. Merah' },
                { key: 'B', label: 'B. Kuning 🍌' },
                { key: 'C', label: 'C. Jingga' },
              ].map(({ key, label }) => {
                const isSelected = q1Answer === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectQ1(key as 'A' | 'B' | 'C')}
                    className={`py-3 px-3 rounded-2xl font-bold text-sm sm:text-base border-2 transition-all cursor-pointer ${
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

          {/* Question 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-4 sm:p-5 rounded-3xl border-3 shadow-lg transition-all ${
              q2Correct
                ? 'bg-emerald-50/90 border-emerald-400'
                : 'bg-white/95 border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <ClipboardCheck className="w-4 h-4" />
                <span>Soalan 2 daripada 2</span>
              </span>

              <div className="flex items-center gap-2">
                {/* Audio button for Question 2 */}
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

            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3">
              Buah manakah yang berbentuk bulat?
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'A', label: 'A. Epal 🍎' },
                { key: 'B', label: 'B. Pisang' },
                { key: 'C', label: 'C. Nanas' },
              ].map(({ key, label }) => {
                const isSelected = q2Answer === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectQ2(key as 'A' | 'B' | 'C')}
                    className={`py-3 px-3 rounded-2xl font-bold text-sm sm:text-base border-2 transition-all cursor-pointer ${
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

          {/* Feedback banner */}
          <AnimatePresence>
            {feedbackMsg.text && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border-2 ${
                  feedbackMsg.isCorrect
                    ? 'bg-emerald-100/90 border-emerald-400 text-emerald-950'
                    : 'bg-rose-100/90 border-rose-400 text-rose-950'
                }`}
              >
                {feedbackMsg.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span>{feedbackMsg.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlock Deliver Button */}
          {allQuestionsCorrect && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-2"
            >
              <button
                type="button"
                onClick={handleDeliver}
                className="w-full py-4 px-6 rounded-2xl bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl border-b-4 border-teal-700 transition-all flex items-center justify-center gap-3 cursor-pointer animate-pulse-glow"
              >
                <Sparkles className="w-6 h-6 fill-white" />
                <span>PEMERIKSAAN KUALITI LULUS! HANTAR PESANAN</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 text-center text-xs font-semibold text-amber-900 bg-white/70 backdrop-blur-xs py-1.5 px-4 rounded-xl max-w-xl mx-auto shadow-xs">
        💡 Tip Kanak-Kanak: Klik "Baca Soalan" untuk mendengar setiap soalan dibacakan dengan kuat!
      </div>
    </div>
  );
};
