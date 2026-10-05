"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Award, RotateCcw, ArrowRight, CheckCircle2, XCircle, Flame, Star } from "lucide-react";
import { SpellingWord } from "../data/words";

interface SessionResultItem {
  word: SpellingWord;
  isCorrect: boolean;
  userAnswer: string;
}

interface SessionSummaryProps {
  results: SessionResultItem[];
  streakDays: number;
  onRestartSession: () => void;
  onReviewMissedOnly?: () => void;
  onGoToDashboard: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({
  results,
  streakDays,
  onRestartSession,
  onReviewMissedOnly,
  onGoToDashboard,
}) => {
  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalCount = results.length;
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const missedCount = totalCount - correctCount;

  // Confetti celebration
  useEffect(() => {
    if (accuracy >= 60) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [accuracy]);

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-100 p-6 sm:p-8 text-center animate-fadeIn">
      {/* Trophy / Stars */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-white shadow-lg shadow-amber-200 mb-4 animate-bounce">
        <Award className="w-10 h-10" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
        Session Complete! 🎉
      </h2>
      <p className="text-slate-600 font-medium text-sm mt-1">
        Awesome job practicing your Year 3 NAPLAN spelling!
      </p>

      {/* Score Cards */}
      <div className="grid grid-cols-3 gap-3 my-6">
        <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
          <p className="text-xs font-bold text-indigo-600 uppercase">Score</p>
          <p className="text-2xl font-black text-indigo-900 mt-0.5">
            {correctCount}/{totalCount}
          </p>
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
          <p className="text-xs font-bold text-emerald-600 uppercase">Accuracy</p>
          <p className="text-2xl font-black text-emerald-900 mt-0.5">{accuracy}%</p>
        </div>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-xs font-bold text-amber-600 uppercase">Streak</p>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-2xl font-black text-amber-900">{streakDays}</span>
          </div>
        </div>
      </div>

      {/* Words Recap List */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left mb-6 max-h-60 overflow-y-auto">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Words from this session:
        </h4>
        <div className="divide-y divide-slate-200/70">
          {results.map((res, i) => (
            <div key={i} className="py-2 flex items-center justify-between text-sm">
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
      <div className="space-y-3">
        {missedCount > 0 && onReviewMissedOnly && (
          <button
            onClick={onReviewMissedOnly}
            className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow-lg shadow-amber-200 active:scale-[0.99] transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Practice Missed Words ({missedCount})</span>
          </button>
        )}

        <button
          onClick={onRestartSession}
          className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-lg shadow-indigo-200 active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <span>Next 10 Words</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onGoToDashboard}
          className="w-full py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-sm transition"
        >
          View Full Curriculum & Progress
        </button>
      </div>
    </div>
  );
};
