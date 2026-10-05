// Hybrid TTS Engine: Edge Neural TTS (Studio Australian Voice) with automatic Web Speech API fallback

let cachedVoice: SpeechSynthesisVoice | null = null;
let currentAudio: HTMLAudioElement | null = null;

export function getPreferredVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }

  if (cachedVoice) {
    return cachedVoice;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    return null;
  }

  // Priority 1: Australian Enhanced / Premium / Natural / Siri voices
  const auHighQuality = voices.find(
    (v) =>
      v.lang.toLowerCase().replace("_", "-").startsWith("en-au") &&
      /enhanced|premium|natural|siri/i.test(v.name)
  );
  if (auHighQuality) {
    cachedVoice = auHighQuality;
    return auHighQuality;
  }

  // Priority 2: Standard Australian English (en-AU)
  const auVoice = voices.find((v) =>
    v.lang.toLowerCase().replace("_", "-").startsWith("en-au")
  );
  if (auVoice) {
    cachedVoice = auVoice;
    return auVoice;
  }

  // Priority 3: British / US High Quality
  const enHighQuality = voices.find(
    (v) =>
      (v.lang.toLowerCase().replace("_", "-").startsWith("en-gb") ||
        v.lang.toLowerCase().replace("_", "-").startsWith("en-us")) &&
      /enhanced|premium|natural|siri/i.test(v.name)
  );
  if (enHighQuality) {
    cachedVoice = enHighQuality;
    return enHighQuality;
  }

  // Priority 4: Any English voice
  const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
  if (enVoice) {
    cachedVoice = enVoice;
    return enVoice;
  }

  return (cachedVoice = voices[0] || null);
}

// In some browsers, getVoices() loads asynchronously
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    getPreferredVoice();
  };
}

export function stopSpeech(): void {
  // Stop HTML5 Audio if playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  // Stop browser synthesis
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  slowMode?: boolean;
  onEnd?: () => void;
}

/**
 * Fallback synthesizer using browser SpeechSynthesis API with natural unshifted pitch
 */
export function speakWithBrowserSynthesis(text: string, options: SpeakOptions = {}): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    options.onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getPreferredVoice();
  if (voice) {
    utterance.voice = voice;
  }

  const isSlow = options.slowMode || (options.rate !== undefined && options.rate < 0.8);
  utterance.rate = isSlow ? 0.72 : (options.rate ?? 0.88);
  utterance.pitch = 1.0; // 1.0 preserves natural human pitch without robotic distortion

  if (options.onEnd) {
    utterance.onend = () => options.onEnd?.();
    utterance.onerror = () => options.onEnd?.();
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Speak text using Edge Neural Australian TTS (en-AU-NatashaNeural)
 * Automatically falls back to high-grade browser speech synthesis if offline or on network error.
 */
export function speakText(text: string, options: SpeakOptions = {}): void {
  if (typeof window === "undefined") return;

  stopSpeech();

  const isSlow = options.slowMode || (options.rate !== undefined && options.rate < 0.8);
  const rateParam = isSlow ? "-25%" : "-5%";
  const encodedText = encodeURIComponent(text);
  const audioUrl = `/api/tts?text=${encodedText}&voice=en-AU-NatashaNeural&rate=${encodeURIComponent(rateParam)}`;

  const audio = new Audio(audioUrl);
  currentAudio = audio;

  let ended = false;
  const handleEnd = () => {
    if (!ended) {
      ended = true;
      if (currentAudio === audio) {
        currentAudio = null;
      }
      options.onEnd?.();
    }
  };

  audio.onended = handleEnd;

  audio.onerror = () => {
    // If the server route fails or device is offline, fallback immediately to browser speech
    if (currentAudio === audio) {
      currentAudio = null;
      speakWithBrowserSynthesis(text, options);
    }
  };

  audio.play().catch(() => {
    // Play was interrupted or blocked by browser autoplay policy
    if (currentAudio === audio) {
      currentAudio = null;
      speakWithBrowserSynthesis(text, options);
    }
  });
}

/**
 * Standard NAPLAN audio dictation sequence:
 * "Spell the word, [word]. [sentence]. The word is, [word]."
 */
export function speakWordWithSentence(
  word: string,
  sentence: string,
  slowMode = false,
  onEnd?: () => void
): void {
  const script = `Spell the word, ${word}. ${sentence} The word is, ${word}.`;
  speakText(script, { slowMode, onEnd });
}

export function speakSingleWord(word: string, slowMode = false, onEnd?: () => void): void {
  speakText(word, { slowMode, onEnd });
}

export function speakSentenceOnly(sentence: string, slowMode = false, onEnd?: () => void): void {
  speakText(sentence, { slowMode, onEnd });
}

/**
 * Preload audio for a word so subsequent clicks or steps play instantly
 */
export function preloadAudio(text: string, slowMode = false): void {
  if (typeof window === "undefined") return;
  const rateParam = slowMode ? "-25%" : "-5%";
  const audioUrl = `/api/tts?text=${encodeURIComponent(text)}&voice=en-AU-NatashaNeural&rate=${encodeURIComponent(rateParam)}`;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = audioUrl;
  link.as = "fetch";
  document.head.appendChild(link);
}
