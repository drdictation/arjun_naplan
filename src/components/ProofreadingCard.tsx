"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, HelpCircle, CheckCircle2, XCircle, Search, Edit3 } from "lucide-react";
import { SpellingWord } from "../data/words";
import { speakText, speakSingleWord } from "../lib/speech";

interface ProofreadingCardProps {
  word: SpellingWord;
  currentIndex: number;
  totalInSession: number;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  soundEnabled: boolean;
}

export const ProofreadingCard: React.FC<ProofreadingCardProps> = ({
  word,
  currentIndex,
  totalInSession,
  onAnswer,
  soundEnabled,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputVal("");
    setShowHint(false);
    setHasSubmitted(false);
    setIsCorrect(false);

    // Auto-focus input for iPad / desktop
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [word.id]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = inputVal.trim().toLowerCase();
    if (!cleanInput || hasSubmitted) return;

    const correct = cleanInput === word.word.toLowerCase();
    setIsCorrect(correct);
    setHasSubmitted(true);
    onAnswer(correct, cleanInput);

    if (!correct && soundEnabled) {
      speakSingleWord(word.word, true);
    }
  };

  // Split sentence around the misspelled word to highlight it nicely
  const parts = word.proofreadSentence.split(new RegExp(`(${word.misspelledWord})`, "i"));

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-xl shadow-amber-100/50 border border-amber-100 p-6 sm:p-8 transition-all">
      {/* Category / Test Type Badge */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
          NAPLAN Proofreading • {word.category}
        </span>
        <span className="text-xs font-bold text-slate-400">
          Word {currentIndex + 1} of {totalInSession}
        </span>
      </div>

      {/* NAPLAN Instructions */}
      <div className="flex items-center gap-2 text-slate-700 text-sm font-bold mb-3">
        <Search className="w-4 h-4 text-amber-600" />
        <span>Find the incorrect word in the sentence and write the correct spelling:</span>
      </div>

      {/* Sentence with Highlighted Target Misspelled Word */}
      <div className="bg-gradient-to-r from-amber-50/60 via-slate-50 to-amber-50/60 rounded-2xl p-5 border border-amber-200/80 mb-6 text-center shadow-inner">
        <p className="text-xl sm:text-2xl font-serif text-slate-800 leading-relaxed">
          {parts.map((part, i) =>
            part.toLowerCase() === word.misspelledWord.toLowerCase() ? (
              <span
                key={i}
                className="bg-rose-100 text-rose-800 underline decoration-wavy decoration-rose-500 font-bold px-2 py-0.5 rounded-lg border border-rose-300 mx-1 inline-block"
              >
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>

        {/* Read Sentence Audio Button */}
        <div className="mt-4 pt-3 border-t border-amber-100 flex justify-center">
          <button
            type="button"
            onClick={() => speakText(word.proofreadSentence.replace(word.misspelledWord, word.word))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-amber-800 border border-amber-200 text-xs font-bold shadow-sm hover:bg-amber-50 active:scale-95 transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Hear Correct Sentence</span>
          </button>
        </div>
      </div>

      {/* Target Word Identification & Correction Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="proofread-input" className="block text-sm font-bold text-slate-700 mb-1.5 text-center">
            Write the correct spelling for &quot;<span className="text-rose-600 line-through">{word.misspelledWord}</span>&quot;:
          </label>
          <div className="relative">
            <input
              id="proofread-input"
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={hasSubmitted}
              placeholder="Type the corrected word..."
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className={`w-full px-5 py-4 text-center text-2xl font-extrabold tracking-wide rounded-2xl border-2 transition-all outline-none shadow-inner ${
                hasSubmitted
                  ? isCorrect
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                    : "bg-rose-50 border-rose-400 text-rose-900"
                  : "bg-white border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 text-slate-800"
              }`}
            />
          </div>
        </div>

        {/* Hint Disclosure */}
        <div className="text-center">
          {!showHint ? (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-700 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Need a hint? ({word.word.length} letters)</span>
            </button>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 font-medium animate-fadeIn">
              💡 <span className="font-bold">Hint:</span> {word.phoneticHint} ({word.word.length} letters)
            </div>
          )}
        </div>

        {/* Action Button */}
        {!hasSubmitted ? (
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-lg shadow-lg shadow-amber-200 disabled:shadow-none transition"
          >
            Submit Correction
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            {isCorrect ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-base text-emerald-800">Excellent Proofreading! 🌟</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">{word.ruleExplanation}</p>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 text-rose-900 flex items-start gap-3">
                <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="w-full">
                  <h4 className="font-extrabold text-base text-rose-800">Not quite! Let&apos;s check:</h4>
                  <div className="mt-2 text-sm">
                    <p className="text-slate-600">
                      Misspelling in text: <span className="font-mono text-rose-500 line-through">{word.misspelledWord}</span>
                    </p>
                    <p className="text-emerald-700 font-bold mt-1">
                      Correct spelling: <span className="font-mono text-lg underline">{word.word}</span>
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
  );
};
