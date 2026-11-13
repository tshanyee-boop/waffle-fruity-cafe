import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderCard } from '../components/OrderCard';
import { AudioSpeakerButton } from '../components/AudioSpeakerButton';
import { playSound } from '../utils/audio';
import { ArrowRight, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

interface Slide9Customer2Props {
  onAcceptOrder: () => void;
}

export const Slide9Customer2: React.FC<Slide9Customer2Props> = ({ onAcceptOrder }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const customerDialogue =
    'Hai, Cef! Saya mahu wafel dengan oren, tembikai, dan nanas.';
  const customerAudio =
    'Hai, Cef! Saya mahu wafel istimewa dengan oren, tembikai, dan nanas. Boleh tolong buatkan untuk saya?';
  const instructions =
    'Dengar pesanan pelanggan dan klik butang TERIMA PESANAN.';
  const feedbackText = 'Wah! Pesanan ini lebih istimewa. Jom sediakan!';

  const handleAccept = () => {
    playSound.success();
    setIsAccepted(true);
    setTimeout(() => {
      onAcceptOrder();
    }, 1200);
  };

  return (
    <div className="relative min-h-[calc(100vh-70px)] p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/assets/aistudio/image_cd830d2f.png"
          alt="Dalaman Kafe"
          className="w-full h-full object-cover object-center filter brightness-[0.96]"
        />
        <div className="absolute inset-0 bg-amber-950/15" />
      </div>

      {/* Top Banner */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 max-w-4xl mx-auto w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-3 border-amber-300 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
      >
        <div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black uppercase tracking-wider">
              Pelanggan #2
            </span>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Stesen Pesanan Istimewa
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">
            Pelanggan Kedua!
          </h1>
          <p className="text-stone-700 text-sm font-semibold mt-1">
            Arahan: <span className="text-rose-600 font-bold">{instructions}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AudioSpeakerButton
            textToSpeak={customerAudio}
            character="cute_girl"
            label="Dengar Pelanggan"
            autoPlayOnMount={true}
          />
        </div>
      </motion.div>

      {/* Main Play Area */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Chef and Customer Mia */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="relative bg-white border-3 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-lg max-w-sm w-full mb-3 text-center sm:text-left">
            <div className="flex items-start gap-2.5">
              <MessageSquare className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Pelanggan Mia Berkata:
                </p>
                <p className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  "{customerDialogue}"
                </p>
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 sm:left-16 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
          </div>

          {/* Chef and Customer Mia Order Frame */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-amber-100 group">
            <img
              src="/src/assets/images/customer2_girl_1794470726467.jpg"
              alt="Cef mengambil pesanan daripada Pelanggan Mia"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-amber-950/75 backdrop-blur-xs text-white text-center py-1 rounded-xl text-xs font-bold tracking-wide">
              Cef & Pelanggan Mia · Meja #2
            </div>
          </div>
        </motion.div>

        {/* Right Side: 3-Fruit Order Card */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <OrderCard
            fruits={['orange', 'watermelon', 'pineapple']}
            customerName="Tiket Pesanan Istimewa Mia"
            tableLabel="Meja #2"
            className="shadow-2xl"
          />

          <div className="mt-6 w-full max-w-md flex flex-col items-center">
            <AnimatePresence>
              {isAccepted && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="mb-3 px-4 py-2 bg-emerald-500 text-white font-black rounded-2xl shadow-lg flex items-center gap-2 text-sm sm:text-base"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{feedbackText}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={isAccepted}
              onClick={handleAccept}
              className={`w-full py-4 px-6 rounded-2xl font-black text-lg sm:text-xl shadow-xl border-b-4 transition-all flex items-center justify-center gap-3 cursor-pointer ${
                isAccepted
                  ? 'bg-emerald-600 border-emerald-800 text-white cursor-default'
                  : 'bg-teal-500 hover:bg-teal-600 border-teal-700 text-white hover:shadow-2xl'
              }`}
            >
              <Sparkles className="w-6 h-6 fill-white" />
              <span>{isAccepted ? 'PESANAN DITERIMA!' : 'TERIMA PESANAN'}</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 text-center text-xs font-semibold text-amber-900 bg-white/70 backdrop-blur-xs py-1.5 px-4 rounded-xl max-w-xl mx-auto shadow-xs">
        💡 Tip Cef: Pelanggan Mia mahu buah oren, tembikai, dan nanas!
      </div>
    </div>
  );
};
