// Synthesized sound effects and gentle child-friendly speech synthesizer

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playSound = {
  click: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // Ignore
    }
  },

  pop: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  },

  squirtJam: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.linearRampToValueAtTime(320, now + 0.15);
      osc.frequency.linearRampToValueAtTime(550, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // Ignore
    }
  },

  success: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.14, now + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.3);
      });
    } catch {
      // Ignore
    }
  },

  error: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.18);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Ignore
    }
  },

  starFanfare: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0 },
        { freqs: [587.33, 739.99, 880.0], time: 0.14 },
        { freqs: [659.25, 830.61, 987.77], time: 0.28 },
        { freqs: [783.99, 987.77, 1174.66, 1567.98], time: 0.42, duration: 0.7 },
      ];
      chords.forEach(({ freqs, time, duration = 0.35 }) => {
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + time);
          gain.gain.setValueAtTime(0, now + time);
          gain.gain.linearRampToValueAtTime(0.12, now + time + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + time + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + time);
          osc.stop(now + time + duration);
        });
      });
    } catch {
      // Ignore
    }
  },
};

export type VoiceCharacter = 'boy' | 'girl' | 'cute_girl' | 'chef';

const clientAudioCache = new Map<string, string>();
let activeAudio: HTMLAudioElement | null = null;
let activeAbortController: AbortController | null = null;
let speechRequestToken = 0;

function fallbackBrowserSpeech(
  text: string,
  onEnd?: () => void,
  character: VoiceCharacter = 'chef'
) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ms-MY';
    utterance.volume = 0.85;
    utterance.pitch =
      character === 'cute_girl'
        ? 1.45
        : character === 'girl'
        ? 1.28
        : character === 'boy'
        ? 1.1
        : 1.15;
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const malayVoices = voices.filter((v) =>
      v.lang.toLowerCase().startsWith('ms')
    );
    if (malayVoices.length > 0) {
      utterance.voice = malayVoices[0];
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };
    window.speechSynthesis.speak(utterance);
  } catch {
    if (onEnd) onEnd();
  }
}

export async function speakNarrator(
  text: string,
  onEnd?: () => void,
  character: VoiceCharacter = 'chef'
) {
  const token = ++speechRequestToken;
  stopActiveAudioOnly();

  const cacheKey = `${character}:${text}`;
  const cachedUrl = clientAudioCache.get(cacheKey);

  const playBlobUrl = (blobUrl: string) => {
    if (token !== speechRequestToken) {
      if (onEnd) onEnd();
      return;
    }

    const audio = new Audio(blobUrl);
    audio.volume = 0.92;
    activeAudio = audio;

    audio.onended = () => {
      if (activeAudio === audio) {
        activeAudio = null;
      }
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      if (activeAudio === audio) {
        activeAudio = null;
      }
      if (onEnd) onEnd();
    };

    audio.play().catch(() => {
      if (activeAudio === audio) {
        activeAudio = null;
      }
      if (onEnd) onEnd();
    });
  };

  if (cachedUrl) {
    playBlobUrl(cachedUrl);
    return;
  }

  const controller = new AbortController();
  activeAbortController = controller;

  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, character }),
      signal: controller.signal,
    });

    if (token !== speechRequestToken) {
      if (onEnd) onEnd();
      return;
    }

    if (!response.ok) {
      throw new Error(`TTS HTTP ${response.status}`);
    }

    const wavBlob = await response.blob();
    if (token !== speechRequestToken) {
      if (onEnd) onEnd();
      return;
    }

    const blobUrl = URL.createObjectURL(wavBlob);
    clientAudioCache.set(cacheKey, blobUrl);
    playBlobUrl(blobUrl);
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') {
      if (onEnd) onEnd();
      return;
    }
    if (token === speechRequestToken) {
      fallbackBrowserSpeech(text, onEnd, character);
    } else if (onEnd) {
      onEnd();
    }
  } finally {
    if (activeAbortController === controller) {
      activeAbortController = null;
    }
  }
}

function stopActiveAudioOnly() {
  if (activeAbortController) {
    activeAbortController.abort();
    activeAbortController = null;
  }
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function stopSpeaking() {
  speechRequestToken++;
  stopActiveAudioOnly();
}
