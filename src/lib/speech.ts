// Web Speech API wrapper optimized for iPadOS / Safari and Chrome

let cachedVoice: SpeechSynthesisVoice | null = null;

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

  // Priority 1: Australian English (en-AU)
  const auVoice = voices.find((v) => v.lang.toLowerCase().replace("_", "-").startsWith("en-au"));
  if (auVoice) {
    cachedVoice = auVoice;
    return auVoice;
  }

  // Priority 2: British English (en-GB)
  const gbVoice = voices.find((v) => v.lang.toLowerCase().replace("_", "-").startsWith("en-gb"));
  if (gbVoice) {
    cachedVoice = gbVoice;
    return gbVoice;
  }

  // Priority 3: Any English voice
  const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
  if (enVoice) {
    cachedVoice = enVoice;
    return enVoice;
  }

  return voices[0] || null;
}

// In some browsers, getVoices() loads asynchronously
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    getPreferredVoice();
  };
}

export function stopSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakText(
  text: string,
  options: {
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
  } = {}
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel(); // Stop any pending utterance

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getPreferredVoice();
  if (voice) {
    utterance.voice = voice;
  }

  utterance.rate = options.rate ?? 0.85; // slightly slower for young learners
  utterance.pitch = options.pitch ?? 1.05; // slightly friendly kid pitch

  if (options.onEnd) {
    utterance.onend = () => options.onEnd?.();
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Standard NAPLAN audio dictation sequence:
 * "Spell: [word]. [sentence]. [word]."
 */
export function speakWordWithSentence(
  word: string,
  sentence: string,
  slowMode = false,
  onEnd?: () => void
): void {
  const rate = slowMode ? 0.7 : 0.85;
  const script = `Spell the word, ${word}. ${sentence} The word is, ${word}.`;
  speakText(script, { rate, onEnd });
}

export function speakSingleWord(word: string, slowMode = false, onEnd?: () => void): void {
  const rate = slowMode ? 0.65 : 0.85;
  speakText(word, { rate, onEnd });
}

export function speakSentenceOnly(sentence: string, slowMode = false, onEnd?: () => void): void {
  const rate = slowMode ? 0.75 : 0.9;
  speakText(sentence, { rate, onEnd });
}
