"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { AudioDictationCard } from "../components/AudioDictationCard";
import { ProofreadingCard } from "../components/ProofreadingCard";
import { SessionSummary } from "../components/SessionSummary";
import { ParentDashboard } from "../components/ParentDashboard";
import { BossBattleCard } from "../components/BossBattleCard";
import { BossVictorySummary } from "../components/BossVictorySummary";
import { HeroArmory } from "../components/HeroArmory";
import { YEAR_3_NAPLAN_WORDS, SpellingWord } from "../data/words";
import {
  AppState,
  INITIAL_STATE,
  SessionQueueItem,
  buildSessionQueue,
  buildBossSessionQueue,
  calculateNextReview,
} from "../lib/srs";
import {
  GameTheme,
  BossDefinition,
  BOSS_ROSTER,
  getRankForXp,
  getThemeDetails,
} from "../lib/gamification";
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
  Swords,
  Shield,
  Zap,
} from "lucide-react";

export default function Home() {
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"practice" | "dashboard">("practice");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isArmoryOpen, setIsArmoryOpen] = useState(false);

  // Session state
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionQueue, setSessionQueue] = useState<SessionQueueItem[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [currentStepAnswered, setCurrentStepAnswered] = useState(false);
  const [sessionResults, setSessionResults] = useState<
    { word: SpellingWord; isCorrect: boolean; userAnswer: string }[]
  >([]);
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  // Boss Battle state
  const [isBossSession, setIsBossSession] = useState(false);
  const [activeBoss, setActiveBoss] = useState<BossDefinition | null>(null);
  const [bossHp, setBossHp] = useState<number>(0);
  const [playerHearts, setPlayerHearts] = useState<number>(3);
  const [sessionXpEarned, setSessionXpEarned] = useState<number>(0);
  const [bossVictoryState, setBossVictoryState] = useState<{
    isVictory: boolean;
    xpEarned: number;
    unlockedBadge?: string;
  } | null>(null);

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

  const handleChangeTheme = (newTheme: GameTheme) => {
    const updated: AppState = {
      ...appState,
      gamification: {
        ...appState.gamification,
        theme: newTheme,
      },
    };
    handleUpdateAppState(updated);
  };

  // Start a new regular practice round
  const startSession = (
    modePreference: "mixed" | "audio" | "proofread" = "mixed",
    customWords?: SpellingWord[]
  ) => {
    playSound("click");
    setIsBossSession(false);
    setActiveBoss(null);
    setBossVictoryState(null);
    setSessionXpEarned(0);

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

  // Start a Boss Battle
  const startBossBattle = (bossId: string) => {
    const boss = BOSS_ROSTER.find((b) => b.id === bossId) || BOSS_ROSTER[0];

    if (soundEnabled) {
      if (boss.theme === "starwars") playSound("lightsaber");
      else if (boss.theme === "marvel") playSound("repulsor");
      else if (boss.theme === "minecraft") playSound("minecraft_hit");
      else playSound("click");
    }

    // Curate words matching boss level and difficulty
    const queue = buildBossSessionQueue(
      YEAR_3_NAPLAN_WORDS,
      appState.progress,
      boss.hp,
      boss.level
    );

    setIsBossSession(true);
    setActiveBoss(boss);
    setBossHp(boss.hp);
    setPlayerHearts(3);
    setBossVictoryState(null);
    setSessionXpEarned(0);

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
    setIsBossSession(false);
    setActiveBoss(null);
    setBossVictoryState(null);
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

    if (soundEnabled && !isBossSession) {
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

    // Calculate XP earned
    const wordXp = isCorrect ? 40 : 10;
    const newXp = (appState.gamification?.xp || 0) + wordXp;
    const rankInfo = getRankForXp(newXp, appState.gamification?.theme || "starwars");

    let updatedBossHp = bossHp;
    let updatedHearts = playerHearts;

    if (isBossSession && activeBoss) {
      if (isCorrect) {
        updatedBossHp = Math.max(0, bossHp - 1);
        setBossHp(updatedBossHp);
      } else {
        updatedHearts = Math.max(0, playerHearts - 1);
        setPlayerHearts(updatedHearts);
      }
    }

    setSessionXpEarned((prev) => prev + wordXp);

    const updatedState: AppState = {
      ...appState,
      progress: updatedProgress,
      stats: updatedStats,
      gamification: {
        ...appState.gamification,
        xp: newXp,
        level: rankInfo.rank.level,
      },
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
      const withStreak = updateStreak(appState.stats);

      if (isBossSession && activeBoss) {
        // Boss Battle finished
        const finalHp = bossHp;
        const isVictory = finalHp <= 0;
        const bonusXp = isVictory ? activeBoss.rewardXp : 100;
        const totalXp = (appState.gamification?.xp || 0) + bonusXp;
        const rankInfo = getRankForXp(totalXp, appState.gamification?.theme || "starwars");

        const updatedBossesDefeated = {
          ...(appState.gamification?.bossesDefeated || {}),
        };
        const updatedBadges = [...(appState.gamification?.unlockedBadges || [])];

        if (isVictory) {
          updatedBossesDefeated[activeBoss.id] = (updatedBossesDefeated[activeBoss.id] || 0) + 1;
          if (!updatedBadges.includes(activeBoss.rewardBadgeId)) {
            updatedBadges.push(activeBoss.rewardBadgeId);
          }
        }

        const finalAppState: AppState = {
          ...appState,
          stats: {
            ...withStreak,
            totalSessionsCompleted: withStreak.totalSessionsCompleted + 1,
          },
          gamification: {
            ...appState.gamification,
            xp: totalXp,
            level: rankInfo.rank.level,
            bossesDefeated: updatedBossesDefeated,
            unlockedBadges: updatedBadges,
          },
        };

        handleUpdateAppState(finalAppState);
        setBossVictoryState({
          isVictory,
          xpEarned: sessionXpEarned + bonusXp,
          unlockedBadge: isVictory ? activeBoss.rewardBadgeId : undefined,
        });
      } else {
        // Regular session finished
        if (soundEnabled) {
          playSound("complete");
        }
        handleUpdateAppState({
          ...appState,
          stats: {
            ...withStreak,
            totalSessionsCompleted: withStreak.totalSessionsCompleted + 1,
          },
        });
      }

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
  const currentTheme = getThemeDetails(appState.gamification?.theme || "starwars");
  const rankInfo = getRankForXp(appState.gamification?.xp || 0, appState.gamification?.theme || "starwars");

  // Filter roster for homepage display
  const currentThemeBosses = BOSS_ROSTER.filter(
    (b) => b.theme === (appState.gamification?.theme === "standard" ? "starwars" : appState.gamification?.theme)
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <Header
        stats={appState.stats}
        gamification={appState.gamification}
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
        onOpenArmory={() => setIsArmoryOpen(true)}
      />

      {/* Hero Armory Modal */}
      {isArmoryOpen && (
        <HeroArmory
          gamification={appState.gamification}
          onUpdateTheme={handleChangeTheme}
          onSelectBossToFight={startBossBattle}
          onClose={() => setIsArmoryOpen(false)}
        />
      )}

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

        {/* VIEW 2: Session Finished Summary (Boss or Regular) */}
        {activeTab === "practice" && isSessionFinished && (
          <>
            {isBossSession && activeBoss && bossVictoryState ? (
              <BossVictorySummary
                boss={activeBoss}
                results={sessionResults}
                isVictory={bossVictoryState.isVictory}
                xpEarned={bossVictoryState.xpEarned}
                unlockedBadge={bossVictoryState.unlockedBadge}
                onFightAgain={() => startBossBattle(activeBoss.id)}
                onNextBoss={() => {
                  const nextBoss = BOSS_ROSTER.find(
                    (b) => b.theme === activeBoss.theme && b.level === ((activeBoss.level % 3) + 1)
                  );
                  if (nextBoss) startBossBattle(nextBoss.id);
                  else startBossBattle(BOSS_ROSTER[0].id);
                }}
                onReturnHome={() => {
                  setIsSessionFinished(false);
                  setIsBossSession(false);
                  setActiveBoss(null);
                }}
                soundEnabled={soundEnabled}
              />
            ) : (
              <SessionSummary
                results={sessionResults}
                streakDays={appState.stats.streakDays}
                xpEarned={sessionXpEarned}
                onRestartSession={() => startSession("mixed")}
                onReviewMissedOnly={
                  sessionResults.some((r) => !r.isCorrect) ? handleReviewMissedOnly : undefined
                }
                onChallengeBoss={() => setIsArmoryOpen(true)}
                onGoToDashboard={() => setActiveTab("dashboard")}
              />
            )}
          </>
        )}

        {/* VIEW 3: Active Card (Boss Card or Standard Cards) */}
        {activeTab === "practice" && isSessionActive && currentItem && (
          <div className="w-full flex flex-col items-center gap-4 animate-fadeIn">
            {isBossSession && activeBoss ? (
              <BossBattleCard
                boss={activeBoss}
                word={currentItem.word}
                mode={currentItem.mode}
                bossHp={bossHp}
                maxHp={activeBoss.hp}
                playerHearts={playerHearts}
                currentIndex={currentQueueIndex}
                totalWords={sessionQueue.length}
                onAnswer={handleAnswerCurrentWord}
                soundEnabled={soundEnabled}
              />
            ) : (
              <>
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
              </>
            )}

            {/* Next Word Button shown after answering */}
            {currentStepAnswered && (
              <button
                onClick={handleNextWord}
                className="w-full max-w-xl py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-black text-lg shadow-xl shadow-indigo-300 flex items-center justify-center gap-2 animate-bounce transition"
              >
                <span>
                  {currentQueueIndex + 1 === sessionQueue.length
                    ? isBossSession
                      ? "See Boss Battle Results ⚔️"
                      : "See Results & Stars 🎉"
                    : "Next Word ➔"}
                </span>
              </button>
            )}
          </div>
        )}

        {/* VIEW 4: Practice Hub / Mode Selector (Default Home) */}
        {activeTab === "practice" && !isSessionActive && !isSessionFinished && (
          <div className="w-full max-w-2xl space-y-6 animate-fadeIn">
            {/* Themed Hero Banner */}
            <div
              className={`bg-gradient-to-tr ${currentTheme.colorClass} rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-900/20 text-center sm:text-left relative overflow-hidden`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black uppercase tracking-wider">
                    {currentTheme.name}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                    Level {rankInfo.rank.level} • {rankInfo.title}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Welcome to {currentTheme.shortName} Spelling!
                </h2>
                <p className="text-slate-200 text-sm mt-1 max-w-lg">
                  Master Year 3 NAPLAN spelling through epic boss fights, phonics strikes, and
                  Australian proofreading trials.
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <button
                    onClick={() => startSession("mixed")}
                    className="px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-900/20 transition flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Daily 10 Words</span>
                  </button>

                  <button
                    onClick={() => setIsArmoryOpen(true)}
                    className="px-5 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md active:scale-95 text-white font-extrabold text-sm sm:text-base border border-white/30 transition flex items-center gap-2"
                  >
                    <Swords className="w-5 h-5 text-amber-300" />
                    <span>Boss Arena & Badges</span>
                  </button>
                </div>
              </div>

              {/* Decorative background icons */}
              <div className="absolute -right-4 -bottom-6 text-white/10 text-9xl font-black pointer-events-none select-none">
                {currentTheme.icon}
              </div>
            </div>

            {/* Realm Switcher Tabs */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-1 overflow-x-auto">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider px-2 hidden sm:inline">
                Realm:
              </span>
              {(["starwars", "marvel", "minecraft", "standard"] as const).map((tKey) => {
                const t = getThemeDetails(tKey);
                const isActive = appState.gamification?.theme === tKey;
                return (
                  <button
                    key={tKey}
                    onClick={() => handleChangeTheme(tKey)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition whitespace-nowrap ${
                      isActive
                        ? "bg-slate-900 text-amber-300 shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* BOSS BATTLES SECTION */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    ⚔️ Boss Battle Arena
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-700 animate-pulse">
                    Bosses Ready
                  </span>
                </div>
                <button
                  onClick={() => setIsArmoryOpen(true)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  View All 9 Bosses ➔
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentThemeBosses.map((boss) => {
                  const wins = appState.gamification?.bossesDefeated[boss.id] || 0;
                  const isConquered = wins > 0;

                  return (
                    <div
                      key={boss.id}
                      className={`border rounded-2xl p-4 transition flex flex-col justify-between relative overflow-hidden group shadow-sm ${
                        isConquered
                          ? "bg-gradient-to-b from-amber-50/60 to-white border-amber-300"
                          : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="text-4xl group-hover:scale-110 transition">
                            {boss.avatarEmoji}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-black text-[10px] ${
                              boss.level === 1
                                ? "bg-emerald-100 text-emerald-800"
                                : boss.level === 2
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            Lvl {boss.level}
                          </span>
                        </div>

                        <div className="mt-3">
                          <h4 className="font-black text-sm text-slate-900 leading-snug group-hover:text-indigo-600 transition">
                            {boss.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                            {boss.title}
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600 font-bold bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                            <span>HP: {boss.hp} Words</span>
                            <span className="text-amber-600">+{boss.rewardXp} XP</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => startBossBattle(boss.id)}
                        className="mt-3.5 w-full py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-110 active:scale-95 text-white font-black text-xs shadow-md shadow-indigo-100 transition flex items-center justify-center gap-1.5"
                      >
                        <Swords className="w-3.5 h-3.5 text-amber-300" />
                        <span>Fight Boss</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Standard Practice Modes */}
            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 px-1">
                Standard Practice Modes
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

            {/* Gamification Tip */}
            <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
              <span className="text-xl">🏆</span>
              <p>
                <span className="font-bold text-slate-800">Boss Level Tip:</span> Defeating bosses
                in the Boss Arena grants massive XP boosts (+300 to +1000 XP) and unlocks exclusive
                Star Wars, Marvel, and Minecraft trophies in your Hero Armory!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
