"use client";

import React, { useState, useRef, useEffect } from "react";
import { ReadingPassage, ReadingQuestion } from "../data/reading";
import {
  BookOpen,
  Award,
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Search,
  Star,
  RotateCcw,
  BookMarked,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { playSound } from "../lib/storage";

interface ReadingQuestCardProps {
  passage: ReadingPassage;
  soundEnabled: boolean;
  onComplete: (summary: {
    passageId: string;
    correctCount: number;
    totalCount: number;
    stars: number;
    xpEarned: number;
    pointsEarned: number;
    results: {
      questionId: string;
      skill: string;
      isCorrect: boolean;
      userAnswer: string;
      correctAnswer: string;
    }[];
  }) => void;
  onExit: () => void;
}

export function ReadingQuestCard({
  passage,
  soundEnabled,
  onComplete,
  onExit,
}: ReadingQuestCardProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [mobileTab, setMobileTab] = useState<"passage" | "question">("passage");
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<number | null>(null);

  // Results accumulator
  const [answers, setAnswers] = useState<
    {
      questionId: string;
      skill: string;
      isCorrect: boolean;
      userAnswer: string;
      correctAnswer: string;
    }[]
  >([]);

  // Passage scroll ref
  const passageContainerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const currentQuestion: ReadingQuestion = passage.questions[currentQuestionIndex];
  const totalQuestions = passage.questions.length;

  // Auto scroll and highlight paragraph when question changes or is answered
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentQuestion?.paragraphRef) {
      setHighlightedParagraphId(currentQuestion.paragraphRef);
      const targetEl = paragraphRefs.current[currentQuestion.paragraphRef];
      if (targetEl && passageContainerRef.current) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      setHighlightedParagraphId(null);
    }
  }, [currentQuestionIndex, currentQuestion?.paragraphRef]);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const isCorrect = selectedOption === currentQuestion.correctOptionIndex;
    setIsAnswered(true);

    if (soundEnabled) {
      playSound(isCorrect ? "correct" : "incorrect");
    }

    // Scroll to relevant paragraph on answer
    if (currentQuestion.paragraphRef) {
      setHighlightedParagraphId(currentQuestion.paragraphRef);
      const targetEl = paragraphRefs.current[currentQuestion.paragraphRef];
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        skill: currentQuestion.cognitiveSkill,
        isCorrect,
        userAnswer: currentQuestion.options[selectedOption],
        correctAnswer: currentQuestion.options[currentQuestion.correctOptionIndex],
      },
    ]);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      // On mobile, auto-switch to question tab
      setMobileTab("question");
    } else {
      // Finished all questions! Calculate stars & rewards
      const totalCorrect = answers.filter((a) => a.isCorrect).length;
      const accuracy = totalCorrect / totalQuestions;

      let stars = 1;
      if (accuracy === 1) stars = 3;
      else if (accuracy >= 0.75) stars = 2;

      const xpEarned = totalCorrect * 25 + (stars === 3 ? 50 : 25);
      const pointsEarned = totalCorrect * 10 + (stars === 3 ? 30 : 15);

      if (soundEnabled) {
        playSound(stars >= 2 ? "complete" : "correct");
      }

      onComplete({
        passageId: passage.id,
        correctCount: totalCorrect,
        totalCount: totalQuestions,
        stars,
        xpEarned,
        pointsEarned,
        results: answers,
      });
    }
  };

  // Helper to render paragraph with evidence highlighting
  const renderParagraphContent = (para: { id: number; text: string }) => {
    const isTargetPara = currentQuestion?.paragraphRef === para.id;
    const shouldHighlightQuote = isAnswered && isTargetPara && currentQuestion?.evidenceQuote;

    if (!shouldHighlightQuote) {
      return (
        <p className="text-slate-200 leading-relaxed text-base font-normal whitespace-pre-line">
          {para.text}
        </p>
      );
    }

    // Highlight the evidence quote within the text
    const quote = currentQuestion.evidenceQuote.trim();
    const paraText = para.text;
    const quoteIndex = paraText.toLowerCase().indexOf(quote.toLowerCase());

    if (quoteIndex === -1) {
      return (
        <p className="text-slate-200 leading-relaxed text-base font-normal whitespace-pre-line">
          {paraText}
        </p>
      );
    }

    const before = paraText.slice(0, quoteIndex);
    const matched = paraText.slice(quoteIndex, quoteIndex + quote.length);
    const after = paraText.slice(quoteIndex + quote.length);

    return (
      <p className="text-slate-200 leading-relaxed text-base font-normal whitespace-pre-line">
        {before}
        <mark className="bg-amber-400/25 text-amber-200 border-b-2 border-amber-400 font-medium px-1 rounded transition-all animate-pulse duration-1000">
          {matched}
        </mark>
        {after}
      </p>
    );
  };

  const getGenreColor = (genre: string) => {
    switch (genre) {
      case "Narrative":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Informational":
        return "bg-sky-500/20 text-sky-300 border-sky-500/30";
      case "Persuasive":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Poem":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-slate-700 text-slate-300 border-slate-600";
    }
  };

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case "Direct Retrieval":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "Inference":
        return "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
      case "Vocabulary in Context":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "Author Craft":
        return "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30";
      case "Main Idea":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      default:
        return "bg-slate-700 text-slate-300 border-slate-600";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Top Bar with Exit and Progress */}
      <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl px-5 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            ← Exit Quest
          </button>
          <div>
            <h2 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
              <span>{passage.title}</span>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getGenreColor(
                  passage.genre
                )}`}
              >
                {passage.genre}
              </span>
            </h2>
          </div>
        </div>

        {/* Question Counter Pill */}
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-slate-400">
            Question{" "}
            <span className="text-amber-400 font-extrabold">{currentQuestionIndex + 1}</span> of{" "}
            <span>{totalQuestions}</span>
          </div>
          <div className="hidden sm:flex gap-1.5 ml-2">
            {passage.questions.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-2 rounded-full transition-all ${
                  i < answers.length
                    ? answers[i].isCorrect
                      ? "bg-emerald-400"
                      : "bg-red-400"
                    : i === currentQuestionIndex
                    ? "bg-amber-400 ring-2 ring-amber-400/30"
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden bg-slate-900 border border-slate-800 p-1 rounded-xl">
        <button
          onClick={() => setMobileTab("passage")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${
            mobileTab === "passage"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Read Passage
        </button>
        <button
          onClick={() => setMobileTab("question")}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${
            mobileTab === "question"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Question {currentQuestionIndex + 1}
        </button>
      </div>

      {/* Split Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Passage Viewer (7 cols) */}
        <div
          ref={passageContainerRef}
          className={`lg:col-span-7 bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 lg:p-7 shadow-xl max-h-[75vh] overflow-y-auto space-y-6 scroll-smooth ${
            mobileTab !== "passage" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Passage Header */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                ⏱️ Approx. {passage.estimatedMinutes} min read • Silent Reading Mode
              </span>
              {currentQuestion?.paragraphRef && (
                <button
                  onClick={() => {
                    const targetEl = paragraphRefs.current[currentQuestion.paragraphRef!];
                    if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md"
                >
                  <Search className="w-3 h-3" /> Jump to ¶ {currentQuestion.paragraphRef}
                </button>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-2 tracking-tight">
              {passage.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 italic">{passage.subtitle}</p>
          </div>

          {/* Paragraphs with paragraph numbers */}
          <div className="space-y-5">
            {passage.paragraphs.map((para) => {
              const isTarget = currentQuestion?.paragraphRef === para.id;
              return (
                <div
                  key={para.id}
                  ref={(el) => {
                    paragraphRefs.current[para.id] = el;
                  }}
                  className={`relative p-3.5 rounded-xl transition-all duration-300 ${
                    isTarget
                      ? "bg-slate-800/80 border border-amber-500/30 shadow-md"
                      : "bg-transparent border border-transparent hover:bg-slate-850/40"
                  }`}
                >
                  {/* Paragraph Number Marker */}
                  <span
                    className={`inline-block text-[11px] font-black px-2 py-0.5 rounded-md mb-2 mr-2 ${
                      isTarget
                        ? "bg-amber-400 text-slate-950 font-extrabold shadow-sm"
                        : "bg-slate-800 text-slate-400 border border-slate-700/60"
                    }`}
                  >
                    ¶ {para.id}
                  </span>

                  {renderParagraphContent(para)}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-center">
            <span className="text-xs text-slate-500 italic">— End of Reading Passage —</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Question & Answer Card (5 cols) */}
        <div
          className={`lg:col-span-5 space-y-4 ${
            mobileTab !== "question" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            {/* Cognitive Skill & Target Reference */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${getSkillColor(
                  currentQuestion.cognitiveSkill
                )}`}
              >
                {currentQuestion.cognitiveSkill}
              </span>

              {currentQuestion.paragraphRef && (
                <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <BookMarked className="w-3 h-3 text-amber-400" />
                  Refer to Paragraph {currentQuestion.paragraphRef}
                </span>
              )}
            </div>

            {/* Question Prompt */}
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {currentQuestion.prompt}
            </h3>

            {/* 4 Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === currentQuestion.correctOptionIndex;

                let cardClasses =
                  "border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700 text-slate-200";

                if (isSelected && !isAnswered) {
                  cardClasses =
                    "border-indigo-500 bg-indigo-950/40 text-white ring-2 ring-indigo-500/40";
                }

                if (isAnswered) {
                  if (isCorrectOption) {
                    cardClasses =
                      "border-emerald-500 bg-emerald-950/50 text-emerald-100 ring-2 ring-emerald-500/50";
                  } else if (isSelected && !isCorrectOption) {
                    cardClasses =
                      "border-red-500 bg-red-950/50 text-red-100 ring-2 ring-red-500/50";
                  } else {
                    cardClasses = "border-slate-800/60 bg-slate-900/40 text-slate-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition flex items-start gap-3 cursor-pointer ${cardClasses}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                        isAnswered && isCorrectOption
                          ? "bg-emerald-500 text-white"
                          : isAnswered && isSelected && !isCorrectOption
                          ? "bg-red-500 text-white"
                          : isSelected
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1 leading-snug">{option}</span>
                    {isAnswered && isCorrectOption && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Confirm or Next Actions */}
            {!isAnswered ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleConfirmAnswer}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                  selectedOption !== null
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 cursor-pointer"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                }`}
              >
                <span>Lock In Answer</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-4 pt-2">
                {/* Instant Strategy Explanation Banner */}
                <div
                  className={`p-4 rounded-xl border text-sm space-y-2 ${
                    selectedOption === currentQuestion.correctOptionIndex
                      ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200"
                      : "bg-red-950/40 border-red-500/30 text-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                    {selectedOption === currentQuestion.correctOptionIndex ? (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Excellent! +25 XP</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400">NAPLAN Strategy Breakdown</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed text-slate-200 font-normal">
                    {currentQuestion.explanation}
                  </p>

                  {/* Evidence Citation Callout */}
                  {currentQuestion.evidenceQuote && (
                    <div className="mt-2 pt-2 border-t border-slate-800 text-xs text-amber-300/90 flex items-start gap-1.5 bg-amber-950/30 p-2 rounded-lg border-amber-500/20">
                      <Search className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-amber-200">Text Evidence:</strong> &ldquo;
                        {currentQuestion.evidenceQuote}&rdquo;
                      </span>
                    </div>
                  )}
                </div>

                {/* Next Question / Finish Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentQuestionIndex + 1 < totalQuestions
                      ? "Next Question"
                      : "Complete Reading Quest 🎉"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
