"use client";

import React, { useState } from "react";
import { YEAR_3_READING_PASSAGES, ReadingPassage } from "../data/reading";
import { ReadingQuestCard } from "./ReadingQuestCard";
import { AppState, PassageProgress } from "../lib/srs";
import { BADGES_CATALOG } from "../lib/gamification";
import {
  BookOpen,
  Star,
  Award,
  Sparkles,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Trophy,
  ArrowLeft,
  Flame,
  Zap,
} from "lucide-react";
import { playSound } from "../lib/storage";

interface ReadingHubProps {
  appState: AppState;
  soundEnabled: boolean;
  onUpdateAppState: (newState: AppState) => void;
  onBackToHome: () => void;
}

export function ReadingHub({
  appState,
  soundEnabled,
  onUpdateAppState,
  onBackToHome,
}: ReadingHubProps) {
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null);
  const [completedSummary, setCompletedSummary] = useState<{
    passage: ReadingPassage;
    correctCount: number;
    totalCount: number;
    stars: number;
    xpEarned: number;
    pointsEarned: number;
    unlockedBadge?: { title: string; icon: string; theme: string };
    results: {
      questionId: string;
      skill: string;
      isCorrect: boolean;
      userAnswer: string;
      correctAnswer: string;
    }[];
  } | null>(null);

  const readingProgress = appState.readingProgress || {};
  const totalPossibleStars = YEAR_3_READING_PASSAGES.length * 3;
  const earnedStars = Object.values(readingProgress).reduce((acc, p) => acc + (p.stars || 0), 0);

  // Determine badge for user's active theme
  const getThemeReadingBadgeId = () => {
    switch (appState.gamification.theme) {
      case "starwars":
        return "reading_sw_archivist";
      case "marvel":
        return "reading_marvel_scholar";
      case "minecraft":
        return "reading_mc_bookworm";
      default:
        return "reading_master_detective";
    }
  };

  const activeBadgeDef = BADGES_CATALOG.find((b) => b.id === getThemeReadingBadgeId());
  const hasUnlockedReadingBadge = appState.gamification.unlockedBadges.includes(
    getThemeReadingBadgeId()
  );

  const handleStartPassage = (passage: ReadingPassage) => {
    setCompletedSummary(null);
    setSelectedPassage(passage);
  };

  const handleQuestComplete = (summary: {
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
  }) => {
    const passage = YEAR_3_READING_PASSAGES.find((p) => p.id === summary.passageId)!;

    // Check existing progress
    const prev = readingProgress[summary.passageId];
    const newStars = Math.max(prev?.stars || 0, summary.stars);
    const newBest = Math.max(prev?.bestScore || 0, summary.correctCount);

    const updatedPassageProgress: PassageProgress = {
      passageId: summary.passageId,
      stars: newStars,
      bestScore: newBest,
      totalQuestions: summary.totalCount,
      completedAt: new Date().toISOString(),
    };

    // Update skill stats
    const updatedSkillStats = { ...(appState.readingSkillStats || {}) };
    summary.results.forEach((r) => {
      if (!updatedSkillStats[r.skill]) {
        updatedSkillStats[r.skill] = { total: 0, correct: 0 };
      }
      updatedSkillStats[r.skill].total += 1;
      if (r.isCorrect) {
        updatedSkillStats[r.skill].correct += 1;
      }
    });

    // Check badge unlock (e.g. earned at least 10 stars or 3 stars on any passage)
    const newUnlockedBadges = [...appState.gamification.unlockedBadges];
    let justUnlockedBadge = undefined;

    const themeBadgeId = getThemeReadingBadgeId();
    if (!newUnlockedBadges.includes(themeBadgeId) && summary.stars >= 2) {
      newUnlockedBadges.push(themeBadgeId);
      if (activeBadgeDef) {
        justUnlockedBadge = {
          title: activeBadgeDef.title,
          icon: activeBadgeDef.icon,
          theme: activeBadgeDef.theme,
        };
      }
    }

    const nextAppState: AppState = {
      ...appState,
      gamification: {
        ...appState.gamification,
        xp: appState.gamification.xp + summary.xpEarned,
        points: appState.gamification.points + summary.pointsEarned,
        unlockedBadges: newUnlockedBadges,
      },
      stats: {
        ...appState.stats,
        totalSessionsCompleted: appState.stats.totalSessionsCompleted + 1,
        totalWordsAnswered: appState.stats.totalWordsAnswered + summary.totalCount,
        totalCorrect: appState.stats.totalCorrect + summary.correctCount,
      },
      readingProgress: {
        ...readingProgress,
        [summary.passageId]: updatedPassageProgress,
      },
      readingSkillStats: updatedSkillStats,
    };

    onUpdateAppState(nextAppState);

    setCompletedSummary({
      passage,
      correctCount: summary.correctCount,
      totalCount: summary.totalCount,
      stars: summary.stars,
      xpEarned: summary.xpEarned,
      pointsEarned: summary.pointsEarned,
      unlockedBadge: justUnlockedBadge,
      results: summary.results,
    });
    setSelectedPassage(null);
  };

  // If in an active passage
  if (selectedPassage) {
    return (
      <ReadingQuestCard
        passage={selectedPassage}
        soundEnabled={soundEnabled}
        onComplete={handleQuestComplete}
        onExit={() => setSelectedPassage(null)}
      />
    );
  }

  // If showing victory / summary screen
  if (completedSummary) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-amber-500/25">
          🏆
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Quest Complete!</h2>
          <p className="text-sm text-slate-400 mt-1">{completedSummary.passage.title}</p>
        </div>

        {/* 3-Star Rating Animation */}
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 2, 3].map((starNum) => (
            <div
              key={starNum}
              className={`p-2 rounded-2xl transition-all duration-500 transform ${
                starNum <= completedSummary.stars
                  ? "scale-110 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                  : "text-slate-700 opacity-40"
              }`}
            >
              <Star
                className="w-10 h-10"
                fill={starNum <= completedSummary.stars ? "currentColor" : "none"}
              />
            </div>
          ))}
        </div>

        {/* Score & Rewards Card */}
        <div className="grid grid-cols-3 gap-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
          <div className="text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Score
            </span>
            <span className="text-xl md:text-2xl font-black text-white">
              {completedSummary.correctCount} / {completedSummary.totalCount}
            </span>
          </div>
          <div className="text-center border-x border-slate-700/60">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              XP Earned
            </span>
            <span className="text-xl md:text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-amber-400" />
              +{completedSummary.xpEarned}
            </span>
          </div>
          <div className="text-center">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
              Perk Points
            </span>
            <span className="text-xl md:text-2xl font-black text-indigo-300">
              +{completedSummary.pointsEarned}
            </span>
          </div>
        </div>

        {/* Badge Unlock Callout */}
        {completedSummary.unlockedBadge && (
          <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/40 rounded-2xl p-4 text-left flex items-center gap-4">
            <div className="text-3xl p-2 bg-amber-500/20 rounded-xl border border-amber-500/30">
              {completedSummary.unlockedBadge.icon}
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 block">
                ⭐ New Realm Badge Unlocked!
              </span>
              <h4 className="text-base font-bold text-white">
                {completedSummary.unlockedBadge.title}
              </h4>
            </div>
          </div>
        )}

        {/* Skill Accuracy Pills */}
        <div className="text-left bg-slate-800/40 rounded-xl p-4 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Skills Tested in this Quest:
          </span>
          <div className="flex flex-wrap gap-2">
            {completedSummary.results.map((r, i) => (
              <span
                key={i}
                className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5 ${
                  r.isCorrect
                    ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                    : "bg-red-950/60 border-red-500/40 text-red-300"
                }`}
              >
                {r.isCorrect ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-red-400 font-bold">✕</span>
                )}
                {r.skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleStartPassage(completedSummary.passage)}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" /> Try Again for 3 Stars
          </button>
          <button
            onClick={() => setCompletedSummary(null)}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition"
          >
            <span>All Reading Quests</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Main Reading Quests Roster Selection
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Hub Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Training Grounds
          </button>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                Reading Quests
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Band 6 Exceeding
                </span>
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Authentic Year 3 NAPLAN reading comprehension with split-screen passages &amp; text evidence.
              </p>
            </div>
          </div>
        </div>

        {/* Global Stars Tracker */}
        <div className="flex items-center gap-4 bg-slate-850/80 border border-slate-700/80 rounded-2xl px-5 py-3 shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Quest Mastery
            </span>
            <span className="text-lg font-black text-white flex items-center gap-1">
              <span className="text-amber-400">{earnedStars}</span> / {totalPossibleStars} Stars
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
        </div>
      </div>

      {/* Reading Passages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {YEAR_3_READING_PASSAGES.map((passage) => {
          const progress = readingProgress[passage.id];
          const stars = progress?.stars || 0;
          const isCompleted = stars > 0;

          const getGenreBadge = () => {
            switch (passage.genre) {
              case "Narrative":
                return "bg-purple-500/20 text-purple-300 border-purple-500/30";
              case "Informational":
                return "bg-sky-500/20 text-sky-300 border-sky-500/30";
              case "Persuasive":
                return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
              case "Poem":
                return "bg-amber-500/20 text-amber-300 border-amber-500/30";
              default:
                return "bg-slate-700 text-slate-300";
            }
          };

          return (
            <div
              key={passage.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${getGenreBadge()}`}
                  >
                    {passage.genre}
                  </span>

                  {/* Stars Pill */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= stars ? "text-amber-400 fill-amber-400" : "text-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition">
                    {passage.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{passage.subtitle}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>⏱️ {passage.estimatedMinutes} mins</span>
                  <span>•</span>
                  <span>❓ {passage.questions.length} questions</span>
                  <span>•</span>
                  <span>📜 {passage.paragraphs.length} paragraphs</span>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={() => handleStartPassage(passage)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition ${
                  isCompleted
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                }`}
              >
                <span>{isCompleted ? "Replay Quest" : "Begin Reading Quest"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Realm Badge Showcase */}
      {activeBadgeDef && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="text-2xl p-2.5 bg-slate-800 rounded-xl border border-slate-700">
              {activeBadgeDef.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Reading Mastery Badge
              </span>
              <h4 className="text-sm font-bold text-white">{activeBadgeDef.title}</h4>
              <p className="text-xs text-slate-400">{activeBadgeDef.description}</p>
            </div>
          </div>
          <div>
            {hasUnlockedReadingBadge ? (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
                Earn 2+ Stars to Unlock
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
