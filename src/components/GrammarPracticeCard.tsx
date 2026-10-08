"use client";

import React, { useState, useEffect } from "react";
import { GrammarQuestion } from "../data/grammar";
import { Sparkles, CheckCircle2, XCircle, ArrowRight, BookOpen, AlertCircle, Award } from "lucide-react";
import { playSound } from "../lib/storage";

interface GrammarPracticeCardProps {
  question: GrammarQuestion;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, chosenOption: string, timeTakenMs: number) => void;
  soundEnabled: boolean;
}

export function GrammarPracticeCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  soundEnabled,
}: GrammarPracticeCardProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    setSelectedIdx(null);
    setIsAnswered(false);
    setStartTime(Date.now());
  }, [question.id]);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    const timeTaken = Date.now() - startTime;
    setSelectedIdx(index);
    setIsAnswered(true);

    const isCorrect = index === question.correctOptionIndex;
    if (soundEnabled) {
      playSound(isCorrect ? "correct" : "incorrect");
    }

    // Delay slightly before callback so user sees feedback button
  };

  const isCorrect = selectedIdx === question.correctOptionIndex;

  return (
    <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 flex flex-col justify-between min-h-[460px] animate-fadeIn">
      {/* Top badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {question.category}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                question.difficulty === 3
                  ? "bg-purple-100 text-purple-800"
                  : question.difficulty === 2
                  ? "bg-amber-100 text-amber-800"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {question.difficulty === 3 ? "★ Top 1% Challenge" : question.difficulty === 2 ? "Year 3 Core" : "Warmup"}
            </span>
          </div>

          <span className="text-xs font-black text-slate-400">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Prompt */}
        <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
          {question.prompt}
        </h3>

        {/* Sentence context if any */}
        {question.sentenceContext && (
          <div className="mt-3.5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-slate-800 font-medium text-base sm:text-lg italic">
            "{question.sentenceContext}"
          </div>
        )}

        {/* Options */}
        <div className="mt-5 space-y-2.5">
          {question.options.map((option, idx) => {
            const isThisChosen = selectedIdx === idx;
            const isThisCorrect = idx === question.correctOptionIndex;

            let buttonStyle = "bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-slate-50";

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30";
              } else if (isThisChosen && !isThisCorrect) {
                buttonStyle = "bg-rose-50 border-rose-400 text-rose-950";
              } else {
                buttonStyle = "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-between group active:scale-[0.99] ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      isAnswered && isThisCorrect
                        ? "bg-emerald-600 text-white"
                        : isAnswered && isThisChosen
                        ? "bg-rose-500 text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isThisChosen && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation & Next Button Footer */}
      {isAnswered && (
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-3 animate-fadeIn">
          <div
            className={`p-3.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-start gap-2.5 ${
              isCorrect
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
          >
            {isCorrect ? (
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-black text-xs uppercase tracking-wider mb-0.5">
                {isCorrect ? "🎯 Excellent! Top 1% Rule:" : "💡 NAPLAN Rule Tip:"}
              </p>
              <p>{question.explanation}</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (selectedIdx !== null) {
                onAnswer(isCorrect, question.options[selectedIdx], Date.now() - startTime);
              }
            }}
            className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
