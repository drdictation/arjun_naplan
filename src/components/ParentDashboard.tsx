"use client";

import React, { useState } from "react";
import {
  Download,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Volume2,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { SpellingWord, YEAR_3_NAPLAN_WORDS } from "../data/words";
import { AppState, getTodayDateString, INITIAL_STATS } from "../lib/srs";
import { exportStateToFile } from "../lib/storage";
import { speakSingleWord } from "../lib/speech";
import { INITIAL_GAMIFICATION_STATE } from "../lib/gamification";

interface ParentDashboardProps {
  appState: AppState;
  onImportState: (newState: AppState) => void;
  onResetProgress: () => void;
  onStartSpecificWord: (word: SpellingWord, mode: "audio" | "proofread") => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  appState,
  onImportState,
  onResetProgress,
  onStartSpecificWord,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const today = getTodayDateString();
  const progressMap = appState.progress;

  // Calculate high-level stats
  const totalWords = YEAR_3_NAPLAN_WORDS.length;
  let masteredCount = 0;
  let learningCount = 0;
  let dueTodayCount = 0;
  let unstartedCount = 0;

  YEAR_3_NAPLAN_WORDS.forEach((w) => {
    const p = progressMap[w.id];
    if (!p) {
      unstartedCount += 1;
    } else if (p.status === "mastered") {
      masteredCount += 1;
    } else if (p.nextReviewDate <= today) {
      dueTodayCount += 1;
      learningCount += 1;
    } else {
      learningCount += 1;
    }
  });

  const categories = Array.from(new Set(YEAR_3_NAPLAN_WORDS.map((w) => w.category)));

  // Filter words
  const filteredWords = YEAR_3_NAPLAN_WORDS.filter((word) => {
    const p = progressMap[word.id];
    const matchesSearch =
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.phoneticHint.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || word.category === selectedCategory;

    let matchesStatus = true;
    if (selectedStatus === "mastered") {
      matchesStatus = p?.status === "mastered";
    } else if (selectedStatus === "due") {
      matchesStatus = !!p && p.nextReviewDate <= today && p.status !== "mastered";
    } else if (selectedStatus === "learning") {
      matchesStatus = !!p && p.status !== "mastered";
    } else if (selectedStatus === "unstarted") {
      matchesStatus = !p;
    } else if (selectedStatus === "tricky") {
      matchesStatus = !!p && p.mistakeCount > 0;
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle JSON file import from laptop
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.progress) {
          const safeState: AppState = {
            version: json.version || 1,
            progress: json.progress || {},
            stats: {
              ...INITIAL_STATS,
              ...(json.stats || {}),
            },
            gamification: {
              ...INITIAL_GAMIFICATION_STATE,
              ...(json.gamification || {}),
            },
          };
          onImportState(safeState);
          alert("Progress successfully imported from your backup!");
        } else {
          alert("Invalid backup file format.");
        }
      } catch (err) {
        alert("Could not parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Title & Laptop Sync Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Year 3 Curriculum & Spaced Repetition Stats
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Tracking {totalWords} authentic NAPLAN Year 3 spelling words across 8 key phonics categories.
          </p>
        </div>

        {/* Sync & Backup Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => exportStateToFile(appState)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs border border-indigo-200 shadow-sm transition active:scale-95"
            title="Download Arjun's progress JSON to sync with your laptop"
          >
            <Download className="w-4 h-4" />
            <span>Export to Laptop</span>
          </button>

          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs border border-slate-200 shadow-sm cursor-pointer transition active:scale-95">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Import Backup</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-center">
          <div className="flex items-center justify-center gap-1.5 text-emerald-700 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Mastered</span>
          </div>
          <p className="text-3xl font-black text-emerald-900">{masteredCount}</p>
          <p className="text-xs text-emerald-600 mt-0.5 font-medium">SRS Interval ≥ 14d</p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-center">
          <div className="flex items-center justify-center gap-1.5 text-amber-700 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Due Today</span>
          </div>
          <p className="text-3xl font-black text-amber-900">{dueTodayCount}</p>
          <p className="text-xs text-amber-600 mt-0.5 font-medium">Ready for review</p>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200 text-center">
          <div className="flex items-center justify-center gap-1.5 text-indigo-700 mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Learning</span>
          </div>
          <p className="text-3xl font-black text-indigo-900">{learningCount}</p>
          <p className="text-xs text-indigo-600 mt-0.5 font-medium">In active rotation</p>
        </div>

        <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-center">
          <div className="flex items-center justify-center gap-1.5 text-slate-600 mb-1">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Unstarted</span>
          </div>
          <p className="text-3xl font-black text-slate-800">{unstartedCount}</p>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">New words remaining</p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search word or phonics rule..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="due">Due for Review Today</option>
            <option value="learning">In Learning</option>
            <option value="mastered">Mastered</option>
            <option value="tricky">Needs Practice (Tricky)</option>
            <option value="unstarted">Unstarted</option>
          </select>
        </div>
      </div>

      {/* Word List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
          <span>Showing {filteredWords.length} words</span>
          <span>Spaced Repetition Stats</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
          {filteredWords.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No words match the selected filters.
            </div>
          ) : (
            filteredWords.map((word) => {
              const p = progressMap[word.id];
              const isMastered = p?.status === "mastered";
              const isDue = p && p.nextReviewDate <= today;
              const hasMistakes = p && p.mistakeCount > 0;

              return (
                <div
                  key={word.id}
                  className="p-4 hover:bg-slate-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-base text-slate-800 capitalize">
                        {word.word}
                      </span>
                      <button
                        onClick={() => speakSingleWord(word.word)}
                        className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                        title="Hear pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      {isMastered && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                          MASTERED 🌟
                        </span>
                      )}
                      {isDue && !isMastered && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800">
                          DUE TODAY
                        </span>
                      )}
                      {hasMistakes && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                          {p.mistakeCount} {p.mistakeCount === 1 ? "miss" : "misses"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-600">{word.category}</span> •{" "}
                      {word.phoneticHint}
                    </p>
                  </div>

                  {/* Reps & Interval + Practice Now triggers */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="text-right text-xs">
                      <p className="font-bold text-slate-700">
                        {p ? `Rep ${p.repetitions} (${p.interval}d interval)` : "Not practiced yet"}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {p?.nextReviewDate ? `Review: ${p.nextReviewDate}` : "New"}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onStartSpecificWord(word, "audio")}
                        className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition"
                        title="Practice with Audio Dictation"
                      >
                        Audio
                      </button>
                      <button
                        onClick={() => onStartSpecificWord(word, "proofread")}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition"
                        title="Practice with Proofreading"
                      >
                        Proofread
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
