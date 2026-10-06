"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Award,
  Sparkles,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Zap,
} from "lucide-react";
import { BossDefinition, BADGES_CATALOG } from "../lib/gamification";
import { SpellingWord } from "../data/words";
import { playSound } from "../lib/storage";

interface BossVictorySummaryProps {
  boss: BossDefinition;
  results: { word: SpellingWord; isCorrect: boolean; userAnswer: string }[];
  isVictory: boolean;
  xpEarned: number;
  pointsEarned?: number;
  unlockedBadge?: string;
  onFightAgain: () => void;
  onNextBoss?: () => void;
  onReturnHome: () => void;
  soundEnabled: boolean;
}

export const BossVictorySummary: React.FC<BossVictorySummaryProps> = ({
  boss,
  results,
  isVictory,
  xpEarned,
  pointsEarned = 100,
  unlockedBadge,
  onFightAgain,
  onNextBoss,
  onReturnHome,
  soundEnabled,
}) => {
  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalCount = results.length;
  const badgeDef = BADGES_CATALOG.find((b) => b.id === (unlockedBadge || boss.rewardBadgeId));

  useEffect(() => {
    if (isVictory) {
      if (soundEnabled) {
        playSound("boss_defeat");
      }
      // Big multi-stage celebration confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
      }, 300);
    }
  }, [isVictory, soundEnabled]);

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-center animate-fadeIn">
      {/* Victory or Escaped Avatar Header */}
      {isVictory ? (
        <div className="relative mb-4">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center text-5xl shadow-xl shadow-amber-300 animate-bounce">
            <span>{boss.rewardBadgeIcon}</span>
          </div>
          <span className="inline-block mt-3 px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
            Boss Conquered!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Victory Over {boss.name}! 🏆
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto italic font-medium">
            &ldquo;{boss.defeatQuote}&rdquo;
          </p>
        </div>
      ) : (
        <div className="relative mb-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-200 flex items-center justify-center text-4xl text-slate-700 shadow-md">
            <span>🛡️</span>
          </div>
          <span className="inline-block mt-3 px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider">
            Battle Complete
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Good Effort Against {boss.name}!
          </h2>
          <p className="text-slate-600 text-xs mt-1">
            You softened up the boss defenses! Practice the tricky words and challenge again!
          </p>
        </div>
      )}

      {/* Rewards Bar */}
      <div className="grid grid-cols-3 gap-2.5 my-5">
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
          <p className="text-[10px] font-extrabold text-amber-700 uppercase">XP Awarded</p>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-lg sm:text-xl font-black text-amber-900">+{xpEarned}</span>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
          <p className="text-[10px] font-extrabold text-emerald-700 uppercase">Perk Points</p>
          <p className="text-lg sm:text-xl font-black text-emerald-900 mt-0.5">
            🪙 +{pointsEarned}
          </p>
        </div>

        <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
          <p className="text-[10px] font-extrabold text-indigo-700 uppercase">Strikes</p>
          <p className="text-lg sm:text-xl font-black text-indigo-900 mt-0.5">
            {correctCount} / {totalCount}
          </p>
        </div>
      </div>

      {/* Unlocked Badge Trophy Display */}
      {isVictory && badgeDef && (
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl p-4 border border-amber-200 mb-5 flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-400/30 flex items-center justify-center text-3xl shrink-0">
            {badgeDef.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                Loot Unlocked
              </span>
              <span className="text-xs font-bold text-amber-600 capitalize">
                {badgeDef.rarity}
              </span>
            </div>
            <h4 className="font-black text-slate-900 text-sm mt-0.5">{badgeDef.title}</h4>
            <p className="text-xs text-slate-600">{badgeDef.description}</p>
          </div>
        </div>
      )}

      {/* Words Recap */}
      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-left mb-6 max-h-48 overflow-y-auto">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Battle Spellings:
        </p>
        <div className="divide-y divide-slate-200/70">
          {results.map((res, i) => (
            <div key={i} className="py-1.5 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                {res.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <span className="font-bold text-slate-800 capitalize">{res.word.word}</span>
                <span className="text-xs text-slate-400">({res.word.category})</span>
              </div>
              {!res.isCorrect && (
                <span className="text-xs text-rose-600 font-mono">
                  typed: {res.userAnswer || "none"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        {isVictory && onNextBoss && (
          <button
            onClick={onNextBoss}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-base shadow-lg shadow-amber-300 active:scale-[0.99] transition flex items-center justify-center gap-2"
          >
            <span>Next Boss Challenge ➔</span>
          </button>
        )}

        <button
          onClick={onFightAgain}
          className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-lg shadow-indigo-200 active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Rematch {boss.name}</span>
        </button>

        <button
          onClick={onReturnHome}
          className="w-full py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-sm transition"
        >
          Back to Battle Hub
        </button>
      </div>
    </div>
  );
};
