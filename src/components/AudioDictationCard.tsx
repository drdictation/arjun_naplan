"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, HelpCircle, CheckCircle2, XCircle, ArrowRight, Snail, RotateCcw } from "lucide-react";
import { SpellingWord } from "../data/words";
import { speakWordWithSentence, speakSingleWord, speakSentenceOnly } from "../lib/speech";

interface AudioDictationCardProps {
  word: SpellingWord;
  currentIndex: number;
  totalInSession: number;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  soundEnabled: boolean;
}

export const AudioDictationCard: React.FC<AudioDictationCardProps> = ({
  word,
  currentIndex,
  totalInSession,
  onAnswer,
  soundEnabled,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [slowMode, setSlowMode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-play pronunciation once when card loads
  useEffect(() => {
    setInputVal("");
    setShowHint(false);
    setHasSubmitted(false);
    setIsCorrect(false);

    if (soundEnabled) {
      speakWordWithSentence(word.word, word.sentence, slowMode);
    }

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
      // Speak the correct word again so he hears the right pronunciation
      speakSingleWord(word.word, true);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 p-6 sm:p-8 transition-all">
      {/* Question Progress and Category Badge */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
          Audio Dictation • {word.category}
        </span>
        <span className="text-xs font-bold text-slate-400">
          Word {currentIndex + 1} of {totalInSession}
        </span>
      </div>

      {/* Audio Controls Section */}
      <div className="bg-gradient-to-b from-indigo-50/70 to-slate-50/50 rounded-2xl p-5 border border-indigo-100/80 mb-6 text-center">
        <p className="text-slate-600 font-medium text-sm mb-4">
          Tap to listen to the word and hear it used in a sentence:
        </p>

        {/* Primary Audio Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => speakWordWithSentence(word.word, word.sentence, slowMode)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-base shadow-lg shadow-indigo-200 transition"
          >
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span>Play Word & Sentence</span>
          </button>

          <button
            type="button"
            onClick={() => speakSingleWord(word.word, slowMode)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 text-indigo-700 border border-indigo-200 font-bold text-sm shadow-sm transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Word Only</span>
          </button>
        </div>

        {/* Sentence Audio and Slow Speed Toggle */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-indigo-100/60 text-xs">
          <button
            type="button"
            onClick={() => speakSentenceOnly(word.sentence, slowMode)}
            className="text-slate-500 hover:text-indigo-600 font-semibold underline decoration-dotted"
          >
            Hear Sentence Only
          </button>

          <button
            type="button"
            onClick={() => setSlowMode(!slowMode)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold transition ${
              slowMode
                ? "bg-amber-100 text-amber-800 border border-amber-300"
                : "bg-slate-200/70 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Snail className="w-3.5 h-3.5" />
            <span>{slowMode ? "Slow Speed ON" : "Slow Speed"}</span>
          </button>
        </div>
      </div>

      {/* Answer Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="spelling-input" className="block text-sm font-bold text-slate-700 mb-1.5 text-center">
            Type the spelling below:
          </label>
          <div className="relative">
            <input
              id="spelling-input"
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={hasSubmitted}
              placeholder="Type your answer here..."
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className={`w-full px-5 py-4 text-center text-2xl font-extrabold tracking-wide rounded-2xl border-2 transition-all outline-none shadow-inner ${
                hasSubmitted
                  ? isCorrect
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                    : "bg-rose-50 border-rose-400 text-rose-900"
                  : "bg-white border-indigo-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 text-slate-800"
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Need a phonics hint? ({word.word.length} letters)</span>
            </button>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 font-medium animate-fadeIn">
              💡 <span className="font-bold">Hint:</span> {word.phoneticHint} ({word.word.length} letters)
            </div>
          )}
        </div>

        {/* Submit or Next Action Button */}
        {!hasSubmitted ? (
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-lg shadow-lg shadow-indigo-200 disabled:shadow-none transition"
          >
            Check Spelling
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Feedback Alert */}
            {isCorrect ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-base text-emerald-800">Spot on, Arjun! 🌟</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">{word.ruleExplanation}</p>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 text-rose-900 flex items-start gap-3">
                <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="w-full">
                  <h4 className="font-extrabold text-base text-rose-800">Keep trying! We&apos;ll practice this one again.</h4>
                  <div className="mt-2 text-sm">
                    <p className="text-slate-600">
                      You typed: <span className="font-mono font-bold line-through text-rose-600">{inputVal}</span>
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
