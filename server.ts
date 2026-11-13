import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: 'v1beta',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

type VoiceCharacter = 'boy' | 'girl' | 'cute_girl' | 'chef';

const VOICE_PROFILES: Record<
  VoiceCharacter,
  { voiceName: string; style: string }
> = {
  girl: {
    voiceName: 'Zephyr',
    style:
      'Authentic native Malaysian female child speaker from Malaysia speaking standard Bahasa Melayu Malaysia (sebutan baku Melayu Malaysia yang asli, loghat Malaysia standard, bukan loghat Indonesia atau Inggeris). Sweet, cheerful 6-year-old Malaysian little girl voice, clear and friendly.',
  },
  cute_girl: {
    voiceName: 'Zephyr',
    style:
      'Authentic native Malaysian female child speaker from Malaysia speaking standard Bahasa Melayu Malaysia (sebutan baku Melayu Malaysia yang asli, loghat Malaysia standard, bukan loghat Indonesia atau Inggeris). Super cute, bubbly, happy 5-year-old Malaysian little girl voice.',
  },
  boy: {
    voiceName: 'Puck',
    style:
      'Authentic native Malaysian male child speaker from Malaysia speaking standard Bahasa Melayu Malaysia (sebutan baku Melayu Malaysia yang asli, loghat Malaysia standard, bukan loghat Indonesia atau Inggeris). Friendly, cheerful 6-year-old Malaysian little boy voice, clear and natural.',
  },
  chef: {
    voiceName: 'Kore',
    style:
      'Authentic native Malaysian female speaker from Malaysia speaking standard Bahasa Melayu Malaysia (sebutan baku Melayu Malaysia yang asli, loghat Malaysia standard, bukan loghat Indonesia atau Inggeris). Warm, gentle, encouraging young Malaysian female chef speaking clearly for young children.',
  },
};

function stripEmojis(input: string): string {
  return input
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const audioCache = new Map<string, Buffer>();
const inFlightCache = new Map<string, Promise<Buffer>>();

async function synthesizeMalaySpeech(
  cleanText: string,
  character: VoiceCharacter
): Promise<Buffer> {
  const cacheKey = `${character}:${cleanText}`;
  const cached = audioCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const existingPromise = inFlightCache.get(cacheKey);
  if (existingPromise) {
    return existingPromise;
  }

  const profile = VOICE_PROFILES[character] || VOICE_PROFILES.chef;

  const task = (async () => {
    const modelsToTry = ['gemini-3.8-flash-lite-tts', 'gemini-3.8-flash-tts'];
    let lastError: unknown = null;

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: cleanText,
                  speechMetadata: {
                    style: profile.style,
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: profile.voiceName,
                },
              },
            },
          },
        });

        const base64Audio =
          response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (base64Audio) {
          const wavBuffer = Buffer.from(base64Audio, 'base64');
          if (audioCache.size >= 120) {
            const firstKey = audioCache.keys().next().value;
            if (firstKey) audioCache.delete(firstKey);
          }
          audioCache.set(cacheKey, wavBuffer);
          return wavBuffer;
        }
      } catch (err) {
        lastError = err;
        console.error(`TTS error with model ${model}:`, err);
      }
    }

    throw lastError ?? new Error('Failed to generate TTS audio');
  })();

  inFlightCache.set(cacheKey, task);
  try {
    return await task;
  } finally {
    inFlightCache.delete(cacheKey);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post('/api/tts', async (req, res) => {
    try {
      const { text, character = 'chef' } = req.body as {
        text?: string;
        character?: VoiceCharacter;
      };

      if (!text || typeof text !== 'string') {
        res.status(400).json({ error: 'Text is required' });
        return;
      }

      const cleanText = stripEmojis(text);
      if (!cleanText) {
        res.status(400).json({ error: 'Text is empty after cleaning' });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
        return;
      }

      const validCharacter: VoiceCharacter =
        character in VOICE_PROFILES ? character : 'chef';

      const wavBuffer = await synthesizeMalaySpeech(cleanText, validCharacter);
      res.set('Content-Type', 'audio/wav');
      res.set('Cache-Control', 'public, max-age=3600');
      res.send(wavBuffer);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      console.error('Error in /api/tts:', error);
      res.status(500).json({
        error: 'Failed to synthesize Malay speech',
        detail,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
