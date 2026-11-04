"use client";

import React, { useState, useEffect } from "react";
import { NumeracyQuestion } from "../data/numeracy";
import { playSound } from "../lib/storage";
import { CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight, Lightbulb, Calculator } from "lucide-react";

interface NumeracyPracticeCardProps {
  question: NumeracyQuestion;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, chosenOption: string, timeTakenMs: number) => void;
  soundEnabled: boolean;
}

export function NumeracyPracticeCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  soundEnabled,
}: NumeracyPracticeCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setStartTime(Date.now());
  }, [question.id]);

  const handleSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);
    const timeTaken = Date.now() - startTime;
    const isCorrect = option === question.options[question.correctOptionIndex];

    if (soundEnabled) {
      playSound(isCorrect ? "correct" : "incorrect");
    }

    setTimeout(() => {
      onAnswer(isCorrect, option, timeTaken);
    }, 1400);
  };

  const getStrandBadgeColor = (strand: string) => {
    switch (strand) {
      case "Number & Algebra":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "Measurement & Geometry":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Statistics & Probability":
        return "bg-violet-50 text-violet-700 border-violet-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden transition-all duration-300">
      {/* Progress & Strand Bar */}
      <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border bg-blue-100 text-blue-800 border-blue-200">
            <Calculator className="w-3.5 h-3.5" />
            Numeracy
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${getStrandBadgeColor(
              question.strand
            )}`}
          >
            {question.strand}
          </span>
        </div>
        <span className="text-xs font-black text-slate-400">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Topic Tag & Difficulty */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Topic: {question.topic}
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`text-xs ${
                  star <= question.difficulty ? "text-amber-400" : "text-slate-200"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Question Prompt */}
        <div className="bg-blue-50/70 border-2 border-blue-100 rounded-2xl p-5 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((option, idx) => {
            const isCorrectOption = idx === question.correctOptionIndex;
            const isChosen = selectedOption === option;

            let buttonClass =
              "w-full p-4 rounded-2xl font-bold text-left transition flex items-center justify-between border-2 text-base ";

            if (!isAnswered) {
              buttonClass +=
                "bg-slate-50 hover:bg-blue-50/50 hover:border-blue-400 border-slate-200 text-slate-700 active:scale-[0.98]";
            } else if (isCorrectOption) {
              buttonClass += "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm";
            } else if (isChosen && !isCorrectOption) {
              buttonClass += "bg-rose-50 border-rose-500 text-rose-900 shadow-sm";
            } else {
              buttonClass += "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <span className="flex-1 font-semibold">{option}</span>
                {isAnswered && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                )}
                {isAnswered && isChosen && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl border-2 flex items-start gap-3 animate-fadeIn ${
              selectedOption === question.options[question.correctOptionIndex]
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-amber-50 border-amber-200 text-amber-900"
            }`}
          >
            <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-600" />
            <div className="text-sm">
              <span className="font-black block mb-0.5">
                {selectedOption === question.options[question.correctOptionIndex]
                  ? "Brilliant Math Work! 🎯"
                  : "Math Strategy Tip 💡"}
              </span>
              <p className="font-medium text-slate-700">{question.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
