import { SpellingWord, YEAR_3_NAPLAN_WORDS } from "../data/words";
import { GamificationState, INITIAL_GAMIFICATION_STATE } from "./gamification";

export interface WordReviewHistory {
  date: string;
  result: "correct" | "incorrect";
  mode: "audio" | "proofread";
  userAnswer?: string;
}

export interface WordProgress {
  wordId: string;
  interval: number; // in days
  repetitions: number; // consecutive correct reviews
  easeFactor: number; // default 2.5
  nextReviewDate: string; // ISO date string (YYYY-MM-DD)
  lastReviewedDate?: string;
  mistakeCount: number;
  history: WordReviewHistory[];
  status: "new" | "learning" | "reviewing" | "mastered";
}

export interface UserStats {
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalSessionsCompleted: number;
  totalWordsAnswered: number;
  totalCorrect: number;
}

export interface AppState {
  version: number;
  progress: Record<string, WordProgress>;
  stats: UserStats;
  gamification: GamificationState;
}

export const INITIAL_STATS: UserStats = {
  streakDays: 0,
  lastActiveDate: "",
  totalSessionsCompleted: 0,
  totalWordsAnswered: 0,
  totalCorrect: 0,
};

export const INITIAL_STATE: AppState = {
  version: 1,
  progress: {},
  stats: INITIAL_STATS,
  gamification: INITIAL_GAMIFICATION_STATE,
};

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calculateNextReview(
  currentProgress: WordProgress | undefined,
  isCorrect: boolean,
  mode: "audio" | "proofread",
  userAnswer: string
): WordProgress {
  const today = getTodayDateString();
  const progress: WordProgress = currentProgress
    ? JSON.parse(JSON.stringify(currentProgress))
    : {
        wordId: "",
        interval: 0,
        repetitions: 0,
        easeFactor: 2.5,
        nextReviewDate: today,
        mistakeCount: 0,
        history: [],
        status: "new",
      };

  progress.history.push({
    date: new Date().toISOString(),
    result: isCorrect ? "correct" : "incorrect",
    mode,
    userAnswer,
  });
  progress.lastReviewedDate = today;

  if (isCorrect) {
    if (progress.repetitions === 0) {
      progress.interval = 1;
    } else if (progress.repetitions === 1) {
      progress.interval = 3;
    } else if (progress.repetitions === 2) {
      progress.interval = 6;
    } else {
      progress.interval = Math.round(progress.interval * progress.easeFactor);
    }

    progress.repetitions += 1;
    progress.easeFactor = Math.min(3.0, progress.easeFactor + 0.1);

    if (progress.interval >= 14 && progress.repetitions >= 3) {
      progress.status = "mastered";
    } else {
      progress.status = "reviewing";
    }

    progress.nextReviewDate = addDays(today, progress.interval);
  } else {
    // Incorrect answer: reset interval to 1 day for next day review
    progress.repetitions = 0;
    progress.interval = 1;
    progress.mistakeCount += 1;
    progress.easeFactor = Math.max(1.3, progress.easeFactor - 0.2);
    progress.status = "learning";
    progress.nextReviewDate = addDays(today, 1);
  }

  return progress;
}

export interface SessionQueueItem {
  word: SpellingWord;
  mode: "audio" | "proofread";
  isReview: boolean;
}

/**
 * Builds a balanced session queue:
 * 1. Due reviews (nextReviewDate <= today)
 * 2. Tricky words (mistakeCount > 0, needs extra reinforcement)
 * 3. New words to introduce (up to sessionBatchSize)
 */
export function buildSessionQueue(
  allWords: SpellingWord[],
  progressMap: Record<string, WordProgress>,
  options: {
    batchSize?: number;
    modePreference?: "mixed" | "audio" | "proofread";
  } = {}
): SessionQueueItem[] {
  const batchSize = options.batchSize || 10;
  const preferredMode = options.modePreference || "mixed";
  const today = getTodayDateString();

  const dueItems: SpellingWord[] = [];
  const trickyItems: SpellingWord[] = [];
  const unstartedItems: SpellingWord[] = [];

  for (const word of allWords) {
    const p = progressMap[word.id];
    if (!p) {
      unstartedItems.push(word);
    } else if (p.nextReviewDate <= today) {
      dueItems.push(word);
    } else if (p.mistakeCount >= 2 && p.status !== "mastered") {
      trickyItems.push(word);
    }
  }

  // Shuffle arrays for variety
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const selectedWords: { word: SpellingWord; isReview: boolean }[] = [];

  // Add due reviews first
  for (const w of shuffle(dueItems)) {
    if (selectedWords.length < batchSize) {
      selectedWords.push({ word: w, isReview: true });
    }
  }

  // Add tricky words if room
  for (const w of shuffle(trickyItems)) {
    if (selectedWords.length < batchSize && !selectedWords.some((x) => x.word.id === w.id)) {
      selectedWords.push({ word: w, isReview: true });
    }
  }

  // Fill remaining slots with new unstarted words
  for (const w of shuffle(unstartedItems)) {
    if (selectedWords.length < batchSize) {
      selectedWords.push({ word: w, isReview: false });
    }
  }

  // If still room (e.g. all words mastered or studied), take any word
  if (selectedWords.length < batchSize) {
    for (const w of shuffle(allWords)) {
      if (selectedWords.length < batchSize && !selectedWords.some((x) => x.word.id === w.id)) {
        selectedWords.push({ word: w, isReview: true });
      }
    }
  }

  // Assign mode based on preference or alternating
  return selectedWords.map((item, index) => {
    let mode: "audio" | "proofread";
    if (preferredMode === "audio") {
      mode = "audio";
    } else if (preferredMode === "proofread") {
      mode = "proofread";
    } else {
      mode = index % 2 === 0 ? "audio" : "proofread";
    }
    return {
      word: item.word,
      mode,
      isReview: item.isReview,
    };
  });
}

/**
 * Builds a curated session queue specifically for a Boss Battle
 * Boss Level 1: Starter & core words (diff 1-2)
 * Boss Level 2: Core words & tricky/due reviews (diff 2)
 * Boss Level 3: Band 6 challenge words & tricky mistakes (diff 2-3)
 */
export function buildBossSessionQueue(
  allWords: SpellingWord[],
  progressMap: Record<string, WordProgress>,
  bossHp: number,
  bossLevel: 1 | 2 | 3
): SessionQueueItem[] {
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  // 1. Tricky words child previously struggled with
  const trickyWords = allWords.filter(
    (w) => progressMap[w.id] && progressMap[w.id].mistakeCount > 0 && progressMap[w.id].status !== "mastered"
  );

  // 2. Filter words matching boss level difficulty
  const targetDifficultyWords = allWords.filter((w) => {
    if (bossLevel === 1) return w.difficulty <= 2;
    if (bossLevel === 2) return w.difficulty === 2 || w.difficulty === 3;
    return w.difficulty >= 2;
  });

  const selectedWords: { word: SpellingWord; isReview: boolean }[] = [];

  // Prioritize 1-2 tricky words for boss battles to test real mastery!
  for (const w of shuffle(trickyWords)) {
    if (selectedWords.length < Math.min(2, Math.floor(bossHp / 2))) {
      selectedWords.push({ word: w, isReview: true });
    }
  }

  // Fill remainder with target level words
  for (const w of shuffle(targetDifficultyWords)) {
    if (selectedWords.length < bossHp && !selectedWords.some((x) => x.word.id === w.id)) {
      selectedWords.push({ word: w, isReview: !!progressMap[w.id] });
    }
  }

  // Fallback to any words if needed
  if (selectedWords.length < bossHp) {
    for (const w of shuffle(allWords)) {
      if (selectedWords.length < bossHp && !selectedWords.some((x) => x.word.id === w.id)) {
        selectedWords.push({ word: w, isReview: !!progressMap[w.id] });
      }
    }
  }

  // Alternate between audio dictation and proofreading for dynamic boss challenge
  return selectedWords.map((item, index) => ({
    word: item.word,
    mode: index % 2 === 0 ? "audio" : "proofread",
    isReview: item.isReview,
  }));
}
