import { AppState, INITIAL_STATE, getTodayDateString, addDays } from "./srs";
import { INITIAL_GAMIFICATION_STATE } from "./gamification";

const STORAGE_KEY = "arjun_naplan_spelling_v1";
const BACKUP_STORAGE_KEY = "arjun_naplan_spelling_backup_auto";

export function loadAppState(): AppState {
  if (typeof window === "undefined") {
    return INITIAL_STATE;
  }

  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    // If primary is empty, fallback to auto backup
    if (!raw) {
      raw = localStorage.getItem(BACKUP_STORAGE_KEY);
    }

    if (!raw) {
      return INITIAL_STATE;
    }

    // Double-secure backup immediately
    try {
      localStorage.setItem(BACKUP_STORAGE_KEY, raw);
    } catch (_) {}

    const parsed = JSON.parse(raw);
    const existingGamification = parsed.gamification || {};

    const mergedGamification = {
      ...INITIAL_GAMIFICATION_STATE,
      ...existingGamification,
      points:
        typeof existingGamification.points === "number"
          ? existingGamification.points
          : Math.max(250, existingGamification.xp || 250),
      bossesDefeated: {
        ...(INITIAL_GAMIFICATION_STATE.bossesDefeated || {}),
        ...(existingGamification.bossesDefeated || {}),
      },
      unlockedBadges: Array.from(
        new Set([
          ...(INITIAL_GAMIFICATION_STATE.unlockedBadges || []),
          ...(existingGamification.unlockedBadges || []),
        ])
      ),
      unlockedPerks: Array.from(
        new Set([
          ...(INITIAL_GAMIFICATION_STATE.unlockedPerks || []),
          ...(existingGamification.unlockedPerks || []),
        ])
      ),
      activePerks: Array.from(
        new Set([
          ...(INITIAL_GAMIFICATION_STATE.activePerks || []),
          ...(existingGamification.activePerks || []),
        ])
      ),
      equippedGear: {
        ...INITIAL_GAMIFICATION_STATE.equippedGear,
        ...(existingGamification.equippedGear || {}),
      },
      speedRecords: {
        ...INITIAL_GAMIFICATION_STATE.speedRecords,
        ...(existingGamification.speedRecords || {}),
      },
    };

    return {
      version: parsed.version || 1,
      progress: parsed.progress || {},
      stats: {
        ...INITIAL_STATE.stats,
        ...(parsed.stats || {}),
      },
      gamification: mergedGamification,
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
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    localStorage.setItem(BACKUP_STORAGE_KEY, serialized);
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

export type SoundEffectType =
  | "correct"
  | "incorrect"
  | "complete"
  | "click"
  | "lightsaber"
  | "laser"
  | "repulsor"
  | "minecraft_hit"
  | "minecraft_xp"
  | "boss_hit"
  | "boss_defeat"
  | "speed_strike"
  | "perk_unlock";

/**
 * Play kid-friendly synthesized audio feedback using Web Audio API
 */
export function playSound(type: SoundEffectType): void {
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
    } else if (type === "lightsaber") {
      // Star Wars: Lightsaber slash hum
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = "sawtooth";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(120, now);
      osc1.frequency.exponentialRampToValueAtTime(260, now + 0.12);
      osc1.frequency.exponentialRampToValueAtTime(95, now + 0.35);

      osc2.frequency.setValueAtTime(240, now);
      osc2.frequency.exponentialRampToValueAtTime(520, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(190, now + 0.35);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1500, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.35);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.38);
      osc2.stop(now + 0.38);
    } else if (type === "laser") {
      // Blaster pew-pew
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.18);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === "repulsor") {
      // Marvel: Iron Man Repulsor blast
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(300, now);
      osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
      osc1.frequency.exponentialRampToValueAtTime(100, now + 0.28);

      osc2.type = "square";
      osc2.frequency.setValueAtTime(80, now + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(40, now + 0.28);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.setValueAtTime(0.25, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.08);
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.3);
    } else if (type === "minecraft_hit") {
      // Minecraft: Critical melee hit thud & wooden snap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "minecraft_xp") {
      // Minecraft: XP orb chime sequence
      const freqs = [880, 1174.66, 1479.98]; // A5, D6, F#6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.07;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } else if (type === "boss_hit") {
      // Heavy boss hit impact
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 0.25);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(80, now);
      osc2.frequency.exponentialRampToValueAtTime(30, now + 0.3);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.3);
    } else if (type === "boss_defeat") {
      // Epic grand boss victory fanfare
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major triumphant chord
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.1;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.22, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.6);
      });
    } else if (type === "speed_strike") {
      // High-energy fast rising chime (A5 -> C#6 -> E6 -> A6)
      const freqs = [880, 1108.73, 1318.51, 1760];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.05;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.22);
      });
    } else if (type === "perk_unlock") {
      // Magic power-up arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.08;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    }
  } catch (e) {
    // Audio context may be restricted before user gesture
    console.debug("Web Audio blocked or unsupported:", e);
  }
}
