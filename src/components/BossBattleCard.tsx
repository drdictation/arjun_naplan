"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Volume2,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Heart,
  Shield,
  Zap,
  Sword,
  Sparkles,
  RotateCcw,
  Search,
  Award,
} from "lucide-react";
import { SpellingWord } from "../data/words";
import { BossDefinition } from "../lib/gamification";
import { speakWordWithSentence, speakSingleWord, speakText } from "../lib/speech";
import { playSound } from "../lib/storage";

interface BossBattleCardProps {
  boss: BossDefinition;
  word: SpellingWord;
  mode: "audio" | "proofread";
  bossHp: number;
  maxHp: number;
  playerHearts: number;
  currentIndex: number;
  totalWords: number;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  soundEnabled: boolean;
}

export const BossBattleCard: React.FC<BossBattleCardProps> = ({
  boss,
  word,
  mode,
  bossHp,
  maxHp,
  playerHearts,
  currentIndex,
  totalWords,
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-play audio on new word if in audio mode
  useEffect(() => {
    setInputVal("");
    setShowHint(false);
    setHasSubmitted(false);
    setIsCorrect(false);
    setBossShake(false);
    setAttackEffect(null);

    if (mode === "audio" && soundEnabled) {
      speakWordWithSentence(word.word, word.sentence, false);
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [word.id, mode]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = inputVal.trim().toLowerCase();
    if (!cleanInput || hasSubmitted) return;

    const correct = cleanInput === word.word.toLowerCase();
    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      // Trigger attack animation & sounds
      setBossShake(true);
      setAttackEffect(boss.playerAttackName);

      // Play theme-specific strike sound
      if (soundEnabled) {
        if (boss.theme === "starwars") {
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

      // Boss hit reaction
      const randomReaction =
        boss.hitReaction[Math.floor(Math.random() * boss.hitReaction.length)];
      setBossSpeech(randomReaction);

      // Confetti burst for boss damage
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.4 },
        colors:
          boss.theme === "starwars"
            ? ["#38bdf8", "#818cf8", "#f43f5e"]
            : boss.theme === "marvel"
            ? ["#ef4444", "#f59e0b", "#3b82f6"]
            : ["#10b981", "#84cc16", "#065f46"],
      });
    } else {
      if (soundEnabled) {
        playSound("incorrect");
        speakSingleWord(word.word, true);
      }
      setBossSpeech("Ha! That's not the right spelling! My armor holds strong!");
    }

    onAnswer(correct, cleanInput);
  };

  // Proofreading sentence split
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
        {/* Decorative Theme Badges & Level */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 backdrop-blur-sm border border-white/20">
              {boss.theme === "starwars" && "🌌 Star Wars Boss"}
              {boss.theme === "marvel" && "⚡ Marvel Boss"}
              {boss.theme === "minecraft" && "⛏️ Minecraft Boss"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
              Level {boss.level}
            </span>
          </div>

          {/* Player Lives / Shields */}
          <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full border border-white/10">
            <span className="text-xs font-bold text-slate-300 mr-1">Shields:</span>
            {[1, 2, 3].map((heart) => (
              <span
                key={heart}
                className={`text-base transition-all ${
                  heart <= playerHearts ? "opacity-100 scale-100" : "opacity-30 scale-75 grayscale"
                }`}
              >
                {boss.theme === "minecraft" ? "❤️" : boss.theme === "starwars" ? "🛡️" : "⚡"}
              </span>
            ))}
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

        {/* Boss Taunt / Speech Bubble */}
        <div className="mt-3 bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
          <span className="text-lg shrink-0">💬</span>
          <p className="italic font-medium">
            &ldquo;{bossSpeech}&rdquo;
          </p>
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
              Listen to the spell word, then type it to launch your attack:
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
            <label
              htmlFor="boss-input"
              className="block text-sm font-bold text-slate-700 mb-1 text-center"
            >
              {mode === "proofread"
                ? `Correct spelling for "${word.misspelledWord}":`
                : "Type your spelling attack:"}
            </label>
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

          {/* Phonics Hint */}
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
                ⚡ <span className="font-bold">Power Hint:</span> {word.phoneticHint} ({word.word.length} letters)
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
                  <div>
                    <h4 className="font-extrabold text-base text-emerald-800">
                      Direct Hit on {boss.name}! 🌟
                    </h4>
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
