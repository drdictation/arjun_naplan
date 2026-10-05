"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { AudioDictationCard } from "../components/AudioDictationCard";
import { ProofreadingCard } from "../components/ProofreadingCard";
import { SessionSummary } from "../components/SessionSummary";
import { ParentDashboard } from "../components/ParentDashboard";
import { YEAR_3_NAPLAN_WORDS, SpellingWord } from "../data/words";
import {
  AppState,
  INITIAL_STATE,
  SessionQueueItem,
  buildSessionQueue,
  calculateNextReview,
} from "../lib/srs";
import { loadAppState, saveAppState, updateStreak, playSound } from "../lib/storage";
import {
  Volume2,
  Search,
  Sparkles,
  Flame,
  ArrowRight,
  BookOpen,
  Award,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

export default function Home() {
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"practice" | "dashboard">("practice");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Session state
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionQueue, setSessionQueue] = useState<SessionQueueItem[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [currentStepAnswered, setCurrentStepAnswered] = useState(false);
  const [sessionResults, setSessionResults] = useState<
    { word: SpellingWord; isCorrect: boolean; userAnswer: string }[]
  >([]);
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  // Load state on mount
  useEffect(() => {
    const loaded = loadAppState();
    setAppState(loaded);
    setIsLoaded(true);

    const savedSound = localStorage.getItem("arjun_sound_enabled");
    if (savedSound !== null) {
      setSoundEnabled(savedSound === "true");
    }
  }, []);

  // Save state whenever it updates
  const handleUpdateAppState = (newState: AppState) => {
    setAppState(newState);
    saveAppState(newState);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("arjun_sound_enabled", String(next));
  };

  // Start a new practice round
  const startSession = (modePreference: "mixed" | "audio" | "proofread" = "mixed", customWords?: SpellingWord[]) => {
    playSound("click");
    let queue: SessionQueueItem[] = [];

    if (customWords && customWords.length > 0) {
      queue = customWords.map((w) => ({
        word: w,
        mode: modePreference === "proofread" ? "proofread" : "audio",
        isReview: true,
      }));
    } else {
      queue = buildSessionQueue(YEAR_3_NAPLAN_WORDS, appState.progress, {
        batchSize: 10,
        modePreference,
      });
    }

    if (queue.length === 0) {
      queue = buildSessionQueue(YEAR_3_NAPLAN_WORDS, {}, { batchSize: 10, modePreference });
    }

    setSessionQueue(queue);
    setCurrentQueueIndex(0);
    setCurrentStepAnswered(false);
    setSessionResults([]);
    setIsSessionFinished(false);
    setIsSessionActive(true);
    setActiveTab("practice");
  };

  // Practice specific word from parent dashboard
  const handleStartSpecificWord = (word: SpellingWord, mode: "audio" | "proofread") => {
    setSessionQueue([
      {
        word,
        mode,
        isReview: !!appState.progress[word.id],
      },
    ]);
    setCurrentQueueIndex(0);
    setCurrentStepAnswered(false);
    setSessionResults([]);
    setIsSessionFinished(false);
    setIsSessionActive(true);
    setActiveTab("practice");
  };

  // Called when child submits answer to current question
  const handleAnswerCurrentWord = (isCorrect: boolean, userAnswer: string) => {
    if (!sessionQueue[currentQueueIndex]) return;
    const currentItem = sessionQueue[currentQueueIndex];

    if (soundEnabled) {
      playSound(isCorrect ? "correct" : "incorrect");
    }

    // Update SRS state for this word
    const currentProgress = appState.progress[currentItem.word.id];
    const newWordProgress = calculateNextReview(
      currentProgress,
      isCorrect,
      currentItem.mode,
      userAnswer
    );

    const updatedProgress = {
      ...appState.progress,
      [currentItem.word.id]: newWordProgress,
    };

    const updatedStats = {
      ...appState.stats,
      totalWordsAnswered: appState.stats.totalWordsAnswered + 1,
      totalCorrect: appState.stats.totalCorrect + (isCorrect ? 1 : 0),
    };

    const updatedState: AppState = {
      ...appState,
      progress: updatedProgress,
      stats: updatedStats,
    };

    handleUpdateAppState(updatedState);

    // Save result in local session tracker
    setSessionResults((prev) => [
      ...prev,
      { word: currentItem.word, isCorrect, userAnswer },
    ]);
    setCurrentStepAnswered(true);
  };

  // Advance to next word
  const handleNextWord = () => {
    playSound("click");
    if (currentQueueIndex + 1 < sessionQueue.length) {
      setCurrentQueueIndex((prev) => prev + 1);
      setCurrentStepAnswered(false);
    } else {
      // Session finished!
      if (soundEnabled) {
        playSound("complete");
      }
      const withStreak = updateStreak(appState.stats);
      handleUpdateAppState({
        ...appState,
        stats: {
          ...withStreak,
          totalSessionsCompleted: withStreak.totalSessionsCompleted + 1,
        },
      });
      setIsSessionFinished(true);
      setIsSessionActive(false);
    }
  };

  // Review only missed words from this session
  const handleReviewMissedOnly = () => {
    const missed = sessionResults.filter((r) => !r.isCorrect).map((r) => r.word);
    if (missed.length > 0) {
      startSession("mixed", missed);
    }
  };

  // Calculate master count
  const masteredCount = Object.values(appState.progress).filter(
    (p) => p.status === "mastered"
  ).length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-bold text-slate-600">Loading Arjun&apos;s Spelling App...</p>
        </div>
      </div>
    );
  }

  const currentItem = sessionQueue[currentQueueIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header
        stats={appState.stats}
        masteredCount={masteredCount}
        totalWords={YEAR_3_NAPLAN_WORDS.length}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "dashboard") {
            setIsSessionActive(false);
          }
        }}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {/* VIEW 1: Parent Dashboard */}
        {activeTab === "dashboard" && (
          <ParentDashboard
            appState={appState}
            onImportState={handleUpdateAppState}
            onResetProgress={() => {
              if (confirm("Reset all spelling progress? This cannot be undone.")) {
                handleUpdateAppState(INITIAL_STATE);
              }
            }}
            onStartSpecificWord={handleStartSpecificWord}
          />
        )}

        {/* VIEW 2: Session Finished Summary */}
        {activeTab === "practice" && isSessionFinished && (
          <SessionSummary
            results={sessionResults}
            streakDays={appState.stats.streakDays}
            onRestartSession={() => startSession("mixed")}
            onReviewMissedOnly={
              sessionResults.some((r) => !r.isCorrect) ? handleReviewMissedOnly : undefined
            }
            onGoToDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {/* VIEW 3: Active Practice Card */}
        {activeTab === "practice" && isSessionActive && currentItem && (
          <div className="w-full flex flex-col items-center gap-4 animate-fadeIn">
            {/* Session Progress Header */}
            <div className="w-full max-w-xl flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-500 uppercase">
                Word {currentQueueIndex + 1} of {sessionQueue.length}
              </span>
              <div className="w-36 sm:w-48 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQueueIndex + 1) / sessionQueue.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Display appropriate card based on mode */}
            {currentItem.mode === "audio" ? (
              <AudioDictationCard
                word={currentItem.word}
                currentIndex={currentQueueIndex}
                totalInSession={sessionQueue.length}
                onAnswer={handleAnswerCurrentWord}
                soundEnabled={soundEnabled}
              />
            ) : (
              <ProofreadingCard
                word={currentItem.word}
                currentIndex={currentQueueIndex}
                totalInSession={sessionQueue.length}
                onAnswer={handleAnswerCurrentWord}
                soundEnabled={soundEnabled}
              />
            )}

            {/* Next Word Button shown after answering */}
            {currentStepAnswered && (
              <button
                onClick={handleNextWord}
                className="w-full max-w-xl py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-black text-lg shadow-xl shadow-indigo-300 flex items-center justify-center gap-2 animate-bounce transition"
              >
                <span>
                  {currentQueueIndex + 1 === sessionQueue.length
                    ? "See Results & Stars 🎉"
                    : "Next Word ➔"}
                </span>
              </button>
            )}
          </div>
        )}

        {/* VIEW 4: Practice Hub / Mode Selector (Default Home) */}
        {activeTab === "practice" && !isSessionActive && !isSessionFinished && (
          <div className="w-full max-w-2xl space-y-6 animate-fadeIn">
            {/* Welcoming Hero Banner */}
            <div className="bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-200 text-center sm:text-left relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black uppercase tracking-wider mb-2">
                  Ready for today&apos;s challenge?
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Welcome to Year 3 NAPLAN Spelling!
                </h2>
                <p className="text-indigo-100 text-sm mt-1 max-w-lg">
                  Practice high-frequency words, silent letters, and Australian NAPLAN proofreading
                  with smart spaced repetition.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => startSession("mixed")}
                    className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-extrabold text-base shadow-lg shadow-amber-900/20 transition flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Start Daily 10 Words</span>
                  </button>
                </div>
              </div>

              {/* Decorative background icons */}
              <div className="absolute -right-6 -bottom-6 text-white/10 text-9xl font-black pointer-events-none select-none">
                ABC
              </div>
            </div>

            {/* Choose Practice Mode Cards */}
            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 px-1">
                Choose Practice Mode
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Audio Dictation Card */}
                <div
                  onClick={() => startSession("audio")}
                  className="bg-white hover:border-indigo-300 hover:shadow-md cursor-pointer border border-slate-200 rounded-3xl p-5 transition flex flex-col justify-between group active:scale-[0.98]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition shrink-0">
                      <Volume2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-800 group-hover:text-indigo-600 transition">
                        Audio Dictation
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Listen to the word spoken aloud in a sentence and practice typing the correct spelling.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>10 Words</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                {/* NAPLAN Proofreading Card */}
                <div
                  onClick={() => startSession("proofread")}
                  className="bg-white hover:border-amber-300 hover:shadow-md cursor-pointer border border-slate-200 rounded-3xl p-5 transition flex flex-col justify-between group active:scale-[0.98]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 group-hover:scale-105 transition shrink-0">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-800 group-hover:text-amber-700 transition">
                        NAPLAN Proofreading
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Find the deliberately misspelled word in authentic NAPLAN sentences and type the fix.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                    <span>10 Words</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Practice Tip */}
            <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
              <span className="text-xl">💡</span>
              <p>
                <span className="font-bold text-slate-800">Spaced Repetition Tip:</span> Words you
                find challenging will automatically reappear tomorrow. Mastered words will be spaced out to 3, 6, and 14 days!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
