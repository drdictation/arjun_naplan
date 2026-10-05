import { AppState, INITIAL_STATE, getTodayDateString, addDays } from "./srs";

const STORAGE_KEY = "arjun_naplan_spelling_v1";

export function loadAppState(): AppState {
  if (typeof window === "undefined") {
    return INITIAL_STATE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_STATE;
    }
    const parsed = JSON.parse(raw);
    return {
      version: parsed.version || 1,
      progress: parsed.progress || {},
      stats: {
        ...INITIAL_STATE.stats,
        ...(parsed.stats || {}),
      },
    };
  } catch (err) {
    console.error("Failed to load app state from localStorage:", err);
    return INITIAL_STATE;
  }
}

export function saveAppState(state: AppState): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save app state to localStorage:", err);
  }
}

/**
 * Updates user streak based on activity date
 */
export function updateStreak(currentStats: AppState["stats"]): AppState["stats"] {
  const today = getTodayDateString();
  const lastActive = currentStats.lastActiveDate;

  if (lastActive === today) {
    // Already active today, maintain current streak
    return currentStats;
  }

  const yesterday = addDays(today, -1);
  let newStreak = currentStats.streakDays;

  if (lastActive === yesterday) {
    // Continued streak!
    newStreak += 1;
  } else {
    // Broken streak or first day
    newStreak = 1;
  }

  return {
    ...currentStats,
    streakDays: newStreak,
    lastActiveDate: today,
  };
}

/**
 * Export state as JSON file for download on iPad / laptop sync
 */
export function exportStateToFile(state: AppState): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement("a");
  const fileName = `arjun-naplan-progress-${getTodayDateString()}.json`;
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Play kid-friendly synthesized audio feedback using Web Audio API
 */
export function playSound(type: "correct" | "incorrect" | "complete" | "click"): void {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === "correct") {
      // Cheerful chime: C5 to G5
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5

      osc2.frequency.setValueAtTime(659.25, now + 0.05); // E5
      osc2.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25); // C6

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.05);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } else if (type === "incorrect") {
      // Soft gentle 'oops' tone (not harsh)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.2);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "complete") {
      // Fanfare arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, High C
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.12;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } else if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    // Audio context may be restricted before user gesture
    console.debug("Web Audio blocked or unsupported:", e);
  }
}
