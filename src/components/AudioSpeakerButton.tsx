import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { speakNarrator, stopSpeaking, playSound, VoiceCharacter } from '../utils/audio';

interface AudioSpeakerButtonProps {
  textToSpeak: string;
  label?: string;
  character?: VoiceCharacter;
  autoPlayOnMount?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioSpeakerButton: React.FC<AudioSpeakerButtonProps> = ({
  textToSpeak,
  label = 'Dengar',
  character = 'chef',
  autoPlayOnMount = false,
  className = '',
  size = 'md',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const startPlayback = () => {
    setIsPlaying(true);
    speakNarrator(
      textToSpeak,
      () => {
        setIsPlaying(false);
      },
      character
    );
  };

  useEffect(() => {
    if (autoPlayOnMount) {
      const timer = setTimeout(() => {
        startPlayback();
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [textToSpeak]);

  const handleSpeak = () => {
    playSound.click();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    startPlayback();
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5 rounded-xl',
    md: 'px-4 py-2 text-sm sm:text-base gap-2 rounded-2xl',
    lg: 'px-5 py-2.5 text-base sm:text-lg gap-2.5 rounded-2xl',
  }[size];

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center font-bold text-white shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer ${
        character === 'boy'
          ? 'bg-emerald-600 hover:bg-emerald-700'
          : character === 'cute_girl'
          ? 'bg-pink-500 hover:bg-pink-600'
          : character === 'girl'
          ? 'bg-rose-500 hover:bg-rose-600'
          : 'bg-amber-500 hover:bg-amber-600'
      } ${
        isPlaying ? 'ring-4 ring-amber-300 ring-offset-2 animate-pulse' : ''
      } ${sizeClasses} ${className}`}
      title="Klik untuk mendengar suara"
    >
      <Volume2 className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5'} ${isPlaying ? 'animate-bounce' : ''}`} />
      <span>{isPlaying ? 'Sedang Bercakap...' : label}</span>
      <Sparkles className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} text-amber-200 fill-amber-200`} />
    </button>
  );
};
