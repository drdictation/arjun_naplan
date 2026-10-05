"use client";

import { Sparkles, Flame, Volume2, VolumeX, BarChart2, BookOpen } from "lucide-react";
import { UserStats } from "../lib/srs";

interface HeaderProps {
  stats: UserStats;
  masteredCount: number;
  totalWords: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeTab: "practice" | "dashboard";
  onTabChange: (tab: "practice" | "dashboard") => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  masteredCount,
  totalWords,
  soundEnabled,
  onToggleSound,
  activeTab,
  onTabChange,
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange("practice")}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-slate-800 tracking-tight leading-none">
              Arjun&apos;s NAPLAN
            </h1>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-0.5">
              Year 3 Spelling Master
            </p>
          </div>
        </div>

        {/* Gamification Stats: Streak & Mastery */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-bold shadow-sm"
            title={`${stats.streakDays} Day Streak`}
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{stats.streakDays} {stats.streakDays === 1 ? "day" : "days"}</span>
          </div>

          {/* Mastered Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold shadow-sm"
            title={`${masteredCount} of ${totalWords} words mastered`}
          >
            <span className="text-emerald-600">🌟</span>
            <span>
              {masteredCount}/{totalWords}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-95"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onTabChange("practice")}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition ${
                activeTab === "practice"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Practice</span>
            </button>
            <button
              onClick={() => onTabChange("dashboard")}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition ${
                activeTab === "dashboard"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Progress</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
