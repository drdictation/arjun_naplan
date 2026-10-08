"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Volume2,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Zap,
  Sparkles,
  RotateCcw,
  Search,
  Timer,
  Shield,
  Flame,
} from "lucide-react";
import { SpellingWord } from "../data/words";
import { BossDefinition, calculateSpeedBonus, PERKS_CATALOG } from "../lib/gamification";
import { speakWordWithSentence, speakSingleWord, speakText } from "../lib/speech";
import { playSound } from "../lib/storage";

interface BossBattleCardProps {
  boss: BossDefinition;
  word: SpellingWord;
  mode: "audio" | "proofread";
  bossHp: number;
  maxHp: number;
  playerHearts: number;
  maxHearts: number;
  currentIndex: number;
  totalWords: number;
  activePerks?: string[];
  totemUsed?: boolean;
  onAnswer: (isCorrect: boolean, userAnswer: string, elapsedSeconds: number) => void;
  soundEnabled: boolean;
}

export const BossBattleCard: React.FC<BossBattleCardProps> = ({
  boss,
  word,
  mode,
  bossHp,
  maxHp,
  playerHearts,
  maxHearts,
  currentIndex,
  totalWords,
  activePerks = [],
  totemUsed = false,
  onAnswer,
  soundEnabled,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [bossShake, setBossShake] = useState(false);
  const [attackEffect, setAttackEffect] = useState<string | null>(null);
  const [bossSpeech, setBossSpeech] = useState<string>(boss.introTaunt);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [speedResult, setSpeedResult] = useState<ReturnType<typeof calculateSpeedBonus> | null>(null);
  const [totemActivated, setTotemActivated] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasSubmittedRef = useRef<boolean>(false);

  const hasHolocron = activePerks.includes("holocron_vision");
  const hasSpeedPerk = activePerks.includes("speed_spark");
  const hasCriticalRocket = activePerks.includes("critical_rocket") && currentIndex === 0;
  const hasGrandmasterAura = activePerks.includes("master_grandmaster_aura") && word.difficulty === 3;
  const effectiveEnrage = boss.enrageSeconds
    ? boss.enrageSeconds + (activePerks.includes("chronos_freeze") ? 10 : 0)
    : null;

  // Handle enrage timeout strike
  const handleTimeout = () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    setHasSubmitted(true);
    setIsCorrect(false);

    if (activePerks.includes("totem_undying") && !totemUsed) {
      setTotemActivated(true);
      if (soundEnabled) playSound("perk_unlock");
      setBossSpeech("The Totem of Undying absorbed my enrage blast! Your shield remains intact!");
    } else {
      if (soundEnabled) {
        playSound("incorrect");
        speakSingleWord(word.word, true);
      }
      setBossSpeech(`${boss.name} ENRAGED! You took too long to strike, and my counterattack broke through!`);
    }

    onAnswer(false, "(timed out)", effectiveEnrage || 25);
  };

  // Reset & start timer on new word
  useEffect(() => {
    setInputVal("");
    setShowHint(hasHolocron);
    setHasSubmitted(false);
    hasSubmittedRef.current = false;
    setIsCorrect(false);
    setBossShake(false);
    setAttackEffect(null);
    setElapsedSeconds(0);
    setSpeedResult(null);
    setTotemActivated(false);

    startTimeRef.current = Date.now();

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      const sec = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(sec);
      if (effectiveEnrage && sec >= effectiveEnrage && !hasSubmittedRef.current) {
        handleTimeout();
      }
    }, 500);

    if (mode === "audio" && soundEnabled) {
      speakWordWithSentence(word.word, word.sentence, false);
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => {
      clearTimeout(timer);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [word.id, mode, hasHolocron, effectiveEnrage]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = inputVal.trim().toLowerCase();
    if (!cleanInput || hasSubmittedRef.current) return;

    hasSubmittedRef.current = true;
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const secondsTaken = Math.max(1, (Date.now() - startTimeRef.current) / 1000);
    const speedBonus = calculateSpeedBonus(secondsTaken, hasSpeedPerk);
    setSpeedResult(speedBonus);

    const correct = cleanInput === word.word.toLowerCase();
    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      // Trigger attack animation & sounds
      setBossShake(true);

      const attackLabel = hasCriticalRocket
        ? `${boss.playerAttackName} + STARK/TNT CRITICAL (2x DMG)!`
        : hasGrandmasterAura
        ? `${boss.playerAttackName} + GRANDMASTER AURA (2x DMG)!`
        : speedBonus.tier === "lightning"
        ? `${boss.playerAttackName} (LIGHTNING SPEED)!`
        : boss.playerAttackName;

      setAttackEffect(attackLabel);

      if (soundEnabled) {
        if (speedBonus.tier === "lightning") {
          playSound("speed_strike");
          setTimeout(() => playSound("boss_hit"), 200);
        } else if (boss.theme === "starwars") {
          playSound("lightsaber");
          setTimeout(() => playSound("boss_hit"), 150);
        } else if (boss.theme === "marvel") {
          playSound("repulsor");
          setTimeout(() => playSound("boss_hit"), 150);
        } else if (boss.theme === "minecraft") {
          playSound("minecraft_hit");
          setTimeout(() => playSound("minecraft_xp"), 180);
        } else {
          playSound("correct");
        }
      }

      const randomReaction =
        boss.hitReaction[Math.floor(Math.random() * boss.hitReaction.length)];
      setBossSpeech(randomReaction);

      confetti({
        particleCount: speedBonus.tier === "lightning" ? 70 : 40,
        spread: 60,
        origin: { y: 0.4 },
        colors:
          boss.theme === "starwars"
            ? ["#38bdf8", "#818cf8", "#f43f5e"]
            : boss.theme === "marvel"
            ? ["#ef4444", "#f59e0b", "#3b82f6"]
            : ["#10b981", "#84cc16", "#065f46"],
      });
    } else {
      // Check if Totem saves him
      if (activePerks.includes("totem_undying") && !totemUsed) {
        setTotemActivated(true);
        if (soundEnabled) playSound("perk_unlock");
        setBossSpeech("What?! The Totem of Undying absorbed my attack! Your shield remains intact!");
      } else {
        if (soundEnabled) {
          playSound("incorrect");
          speakSingleWord(word.word, true);
        }
        setBossSpeech("Ha! That's not the right spelling! My armor holds strong!");
      }
    }

    onAnswer(correct, cleanInput, secondsTaken);
  };

  const parts =
    mode === "proofread"
      ? word.proofreadSentence.split(new RegExp(`(${word.misspelledWord})`, "i"))
      : [];

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 animate-fadeIn">
      {/* Boss Arena Card */}
      <div
        className={`w-full rounded-3xl p-5 sm:p-6 text-white bg-gradient-to-b ${boss.colorScheme.bgGradient} border-2 ${boss.colorScheme.border} shadow-2xl relative overflow-hidden transition-all duration-300 ${
          bossShake ? "animate-wiggle" : ""
        }`}
      >
        {/* Top Badges & Live Timer */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 backdrop-blur-sm border border-white/20">
              {boss.theme === "starwars" && "🌌 Star Wars Boss"}
              {boss.theme === "marvel" && "⚡ Marvel Boss"}
              {boss.theme === "minecraft" && "⛏️ Minecraft Boss"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
              Level {boss.level}
            </span>
            {boss.tier && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  boss.tier === "Apex"
                    ? "bg-rose-500/30 text-rose-300 border-rose-400/50 animate-pulse"
                    : boss.tier === "Nightmare"
                    ? "bg-purple-500/30 text-purple-300 border-purple-400/50"
                    : "bg-blue-500/20 text-blue-300 border-blue-400/30"
                }`}
              >
                💀 {boss.tier}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Live Enrage Countdown Timer */}
            {effectiveEnrage && !hasSubmitted && (
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-black ${
                  effectiveEnrage - elapsedSeconds <= 6
                    ? "bg-red-950/90 text-rose-300 border-red-500 animate-pulse"
                    : "bg-black/50 text-slate-300 border-white/10"
                }`}
                title="Enrage Countdown: Answer before time expires!"
              >
                <Flame className={`w-3.5 h-3.5 ${effectiveEnrage - elapsedSeconds <= 6 ? "text-rose-400 animate-bounce" : "text-amber-400"}`} />
                <span>Enrage: {Math.max(0, effectiveEnrage - elapsedSeconds)}s</span>
              </div>
            )}

            {/* Live Speed & Timer */}
            <div className="flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full border border-white/10 text-xs font-black">
              <Timer className={`w-3.5 h-3.5 ${elapsedSeconds < 6 ? "text-amber-400 animate-pulse" : "text-slate-400"}`} />
              <span className={elapsedSeconds < 6 ? "text-amber-300" : "text-slate-300"}>
                {elapsedSeconds}s
              </span>
              {elapsedSeconds < 6 && (
                <span className="text-[10px] text-amber-400 hidden sm:inline font-bold">
                  (⚡ SPEED)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Boss Profile & Health Bar */}
        <div className="flex items-center gap-4 my-2">
          {/* Boss Avatar */}
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/50 border-2 ${
              boss.colorScheme.border
            } flex items-center justify-center text-4xl sm:text-5xl shadow-lg shrink-0 relative transition-transform ${
              bossShake ? "scale-110 rotate-6" : "hover:scale-105"
            }`}
          >
            <span>{boss.avatarEmoji}</span>
            {attackEffect && (
              <span className="absolute -top-3 -right-3 text-2xl animate-bounce">
                {boss.playerAttackIcon}
              </span>
            )}
          </div>

          {/* Boss HP info */}
          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-black text-lg sm:text-xl tracking-tight text-white leading-snug">
                {boss.name}
              </h3>
              <span className="text-xs font-bold text-amber-300">
                HP: {Math.max(0, bossHp)} / {maxHp}
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-2 font-medium">{boss.title}</p>

            {/* Health Bar */}
            <div className="w-full bg-black/60 h-3.5 rounded-full p-0.5 border border-white/20 overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 ${boss.colorScheme.hpBar}`}
                style={{
                  width: `${Math.max(0, (bossHp / maxHp) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Player Shields & Active Perks Bar */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-white/10 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-300">Shields:</span>
            {Array.from({ length: maxHearts }).map((_, idx) => (
              <span
                key={idx}
                className={`text-base transition-all ${
                  idx < playerHearts ? "opacity-100 scale-100" : "opacity-30 scale-75 grayscale"
                }`}
              >
                {boss.theme === "minecraft" ? "❤️" : boss.theme === "starwars" ? "🛡️" : "⚡"}
              </span>
            ))}
          </div>

          {/* Active Perk Badges */}
          {activePerks.length > 0 && (
            <div className="flex items-center gap-1">
              {activePerks.map((pId) => {
                const perk = PERKS_CATALOG.find((p) => p.id === pId);
                if (!perk) return null;
                return (
                  <span
                    key={pId}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-amber-300 text-[10px] font-bold border border-white/10"
                    title={perk.name + ": " + perk.description}
                  >
                    {perk.icon} {perk.name}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Totem of Undying Activation Banner */}
        {totemActivated && (
          <div className="mt-2 p-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black text-center animate-bounce">
            🗿 TOTEM OF UNDYING ACTIVATED! Your heart was preserved!
          </div>
        )}

        {/* Boss Taunt / Speech Bubble */}
        <div className="mt-3 bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
          <span className="text-lg shrink-0">💬</span>
          <p className="italic font-medium">&ldquo;{bossSpeech}&rdquo;</p>
        </div>

        {/* Attack Effect Toast */}
        {attackEffect && (
          <div className="mt-2 text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider animate-bounce shadow-lg">
              💥 {attackEffect}! Critical Hit!
            </span>
          </div>
        )}
      </div>

      {/* Question Card */}
      <div className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
            {mode === "audio" ? "🔊 Audio Attack" : "🔍 Proofreading Strike"} • {word.category}
          </span>
          <span className="text-xs font-bold text-slate-400">
            Word {currentIndex + 1} of {totalWords}
          </span>
        </div>

        {/* Audio Mode Content */}
        {mode === "audio" && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-5 text-center">
            <p className="text-slate-600 font-medium text-xs mb-3">
              Listen to the spell word, then type it quickly for speed bonus:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => speakWordWithSentence(word.word, word.sentence, false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 active:scale-95 transition"
              >
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Hear Word & Sentence</span>
              </button>
              <button
                type="button"
                onClick={() => speakSingleWord(word.word, false)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 font-bold text-xs shadow-sm active:scale-95 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Word Only</span>
              </button>
            </div>
          </div>
        )}

        {/* Proofreading Mode Content */}
        {mode === "proofread" && (
          <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200 mb-5 text-center">
            <p className="text-xs font-bold text-amber-900 mb-2">
              Find the misspelled word and enter the correct spelling to strike!
            </p>
            <p className="text-lg sm:text-xl font-serif text-slate-800 leading-relaxed mb-3">
              {parts.map((part, i) =>
                part.toLowerCase() === word.misspelledWord.toLowerCase() ? (
                  <span
                    key={i}
                    className="bg-rose-100 text-rose-800 underline decoration-wavy decoration-rose-500 font-bold px-1.5 py-0.5 rounded border border-rose-300 mx-1 inline-block"
                  >
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>
            <button
              type="button"
              onClick={() => speakText(word.proofreadSentence.replace(word.misspelledWord, word.word))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-amber-800 border border-amber-200 text-xs font-bold shadow-sm hover:bg-amber-50 active:scale-95 transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Listen to Sentence</span>
            </button>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="boss-input"
                className="block text-sm font-bold text-slate-700 text-center flex-1"
              >
                {mode === "proofread"
                  ? `Correct spelling for "${word.misspelledWord}":`
                  : "Type your spelling attack:"}
              </label>
            </div>
            <input
              id="boss-input"
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={hasSubmitted}
              placeholder="Type spelling here..."
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className={`w-full px-5 py-4 text-center text-2xl font-extrabold tracking-wide rounded-2xl border-2 transition-all outline-none shadow-inner ${
                hasSubmitted
                  ? isCorrect
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                    : "bg-rose-50 border-rose-400 text-rose-900"
                  : "bg-white border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 text-slate-800"
              }`}
            />
          </div>

          {/* Phonics Hint & Auto Holocron */}
          <div className="text-center">
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need Phonics Power? ({word.word.length} letters)</span>
              </button>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 font-medium animate-fadeIn">
                {hasHolocron ? "🔮 Jarvis/Holocron HUD: " : "💡 Phonics Hint: "}
                Starts with &quot;<span className="font-mono font-bold uppercase">{word.word[0]}</span>&quot; • {word.phoneticHint} ({word.word.length} letters)
              </div>
            )}
          </div>

          {/* Strike Button */}
          {!hasSubmitted ? (
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:brightness-110 active:scale-[0.99] disabled:bg-slate-200 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white font-black text-lg shadow-xl shadow-indigo-200 disabled:shadow-none transition flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>Launch Spelling Strike!</span>
            </button>
          ) : (
            <div className="space-y-3 pt-2">
              {isCorrect ? (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-emerald-900 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h4 className="font-extrabold text-base text-emerald-800">
                        Direct Hit on {boss.name}! 🌟
                      </h4>
                      {speedResult && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-300 text-slate-950 font-black text-xs uppercase animate-bounce">
                          {speedResult.emoji} +{speedResult.bonusPoints} Speed Pts!
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-700 mt-0.5">{word.ruleExplanation}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 text-rose-900 flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <h4 className="font-extrabold text-base text-rose-800">
                      The boss deflected your strike!
                    </h4>
                    <div className="mt-2 text-sm">
                      <p className="text-slate-600">
                        You typed:{" "}
                        <span className="font-mono font-bold line-through text-rose-600">
                          {inputVal}
                        </span>
                      </p>
                      <p className="text-emerald-700 font-bold mt-1">
                        Correct spelling:{" "}
                        <span className="font-mono text-lg underline">{word.word}</span>
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 bg-white/70 p-2 rounded-lg border border-rose-200">
                      💡 <span className="font-semibold">Rule:</span> {word.ruleExplanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
