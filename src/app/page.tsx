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
import { YEAR_3_GRAMMAR_PRACTICE, GrammarQuestion } from "../data/grammar";
import { GrammarPracticeCard } from "../components/GrammarPracticeCard";
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
  calculateSpeedBonus,
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
  Swords,
  Shield,
  Zap,
  Timer,
  ShoppingBag,
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
  const [isGrammarSession, setIsGrammarSession] = useState(false);
  const [grammarQueue, setGrammarQueue] = useState<GrammarQuestion[]>([]);
  const [sessionResults, setSessionResults] = useState<
    { word?: SpellingWord; title?: string; category?: string; isCorrect: boolean; userAnswer: string }[]
  >([]);
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  // Boss Battle state
  const [isBossSession, setIsBossSession] = useState(false);
  const [activeBoss, setActiveBoss] = useState<BossDefinition | null>(null);
  const [bossHp, setBossHp] = useState<number>(0);
  const [playerHearts, setPlayerHearts] = useState<number>(3);
  const [maxHearts, setMaxHearts] = useState<number>(3);
  const [totemUsed, setTotemUsed] = useState<boolean>(false);
  const [isHardcoreTrial, setIsHardcoreTrial] = useState<boolean>(false);
  const [resurrectionUsed, setResurrectionUsed] = useState<boolean>(false);
  const [sessionXpEarned, setSessionXpEarned] = useState<number>(0);
  const [sessionPointsEarned, setSessionPointsEarned] = useState<number>(0);
  const [bossVictoryState, setBossVictoryState] = useState<{
    isVictory: boolean;
    xpEarned: number;
    pointsEarned: number;
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

  // Unlock a Perk in Armory
  const handleUnlockPerk = (perkId: string, cost: number) => {
    if ((appState.gamification?.points || 0) < cost) return;

    const currentUnlocked = appState.gamification?.unlockedPerks || [];
    const currentActive = appState.gamification?.activePerks || [];

    const updatedState: AppState = {
      ...appState,
      gamification: {
        ...appState.gamification,
        points: Math.max(0, (appState.gamification?.points || 0) - cost),
        unlockedPerks: Array.from(new Set([...currentUnlocked, perkId])),
        activePerks: Array.from(new Set([...currentActive, perkId])),
      },
    };

    handleUpdateAppState(updatedState);
  };

  // Toggle active perk on/off
  const handleToggleActivePerk = (perkId: string) => {
    const currentActive = appState.gamification?.activePerks || [];
    const newActive = currentActive.includes(perkId)
      ? currentActive.filter((p) => p !== perkId)
      : [...currentActive, perkId];

    const updatedState: AppState = {
      ...appState,
      gamification: {
        ...appState.gamification,
        activePerks: newActive,
      },
    };

    handleUpdateAppState(updatedState);
  };

  // Equip gear
  const handleEquipGear = (type: "weapon" | "artifact", id: string) => {
    const updatedState: AppState = {
      ...appState,
      gamification: {
        ...appState.gamification,
        equippedGear: {
          ...appState.gamification?.equippedGear,
          [type]: id,
        },
      },
    };

    handleUpdateAppState(updatedState);
  };

  // Start a Grammar & Conventions Session
  const startGrammarSession = () => {
    playSound("click");
    setIsBossSession(false);
    setIsGrammarSession(false);
    setActiveBoss(null);
    setBossVictoryState(null);
    setSessionXpEarned(0);
    setSessionPointsEarned(0);
    setIsGrammarSession(true);

    // Shuffle & take 10 questions
    const shuffled = [...YEAR_3_GRAMMAR_PRACTICE].sort(() => 0.5 - Math.random()).slice(0, 10);
    setGrammarQueue(shuffled);
    setCurrentQueueIndex(0);
    setCurrentStepAnswered(false);
    setSessionResults([]);
    setIsSessionFinished(false);
    setIsSessionActive(true);
    setActiveTab("practice");
  };

  const handleAnswerGrammar = (isCorrect: boolean, chosenOption: string, timeTakenMs: number) => {
    const currentQ = grammarQueue[currentQueueIndex];
    if (!currentQ) return;

    const basePoints = isCorrect ? 35 : 5;
    const baseExp = isCorrect ? 35 : 5;
    const speed = calculateSpeedBonus(timeTakenMs / 1000);
    const roundPts = basePoints + (isCorrect ? speed.bonusPoints : 0);
    const roundXp = baseExp + (isCorrect ? speed.bonusXp : 0);

    const prevGam = appState.gamification || INITIAL_STATE.gamification;
    const newGam = {
      ...prevGam,
      points: (prevGam.points || 0) + roundPts,
      xp: (prevGam.xp || 0) + roundXp,
    };

    const newStats = {
      ...appState.stats,
      totalWordsAnswered: appState.stats.totalWordsAnswered + 1,
      totalCorrect: appState.stats.totalCorrect + (isCorrect ? 1 : 0),
    };

    setSessionPointsEarned((p) => p + roundPts);
    setSessionXpEarned((x) => x + roundXp);

    const newResults = [
      ...sessionResults,
      {
        title: currentQ.prompt,
        category: currentQ.category,
        isCorrect,
        userAnswer: chosenOption,
      },
    ];
    setSessionResults(newResults);

    handleUpdateAppState({
      ...appState,
      stats: newStats,
      gamification: newGam,
    });

    if (currentQueueIndex + 1 < grammarQueue.length) {
      setCurrentQueueIndex((i) => i + 1);
    } else {
      setIsSessionFinished(true);
      setIsSessionActive(false);
      const updatedStats = updateStreak(newStats);
      handleUpdateAppState({
        ...appState,
        stats: updatedStats,
        gamification: newGam,
      });
    }
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
    setSessionPointsEarned(0);

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
  const startBossBattle = (bossId: string, isHardcore?: boolean) => {
    const boss = BOSS_ROSTER.find((b) => b.id === bossId) || BOSS_ROSTER[0];
    const hardcoreMode = isHardcore !== undefined ? isHardcore : isHardcoreTrial;
    setIsHardcoreTrial(hardcoreMode);

    if (soundEnabled) {
      if (boss.theme === "starwars") playSound("lightsaber");
      else if (boss.theme === "marvel") playSound("repulsor");
      else if (boss.theme === "minecraft") playSound("minecraft_hit");
      else playSound("click");
    }

    const effectiveHp = hardcoreMode ? Math.round(boss.hp * 1.5) : boss.hp;

    const queue = buildBossSessionQueue(
      YEAR_3_NAPLAN_WORDS,
      appState.progress,
      effectiveHp,
      boss.level
    );

    const activePerks = appState.gamification?.activePerks || [];
    const hasShieldBoost = activePerks.includes("shield_boost");
    const hasBeskar = activePerks.includes("beskar_forged");
    // Hardcore mode limits player to 2 hearts; otherwise Beskar grants 5, Shield Boost grants 4, base is 3
    const startingHearts = hardcoreMode ? 2 : hasBeskar ? 5 : hasShieldBoost ? 4 : 3;

    setIsBossSession(true);
    setIsGrammarSession(false);
    setActiveBoss(boss);
    setBossHp(effectiveHp);
    setPlayerHearts(startingHearts);
    setMaxHearts(startingHearts);
    setTotemUsed(false);
    setResurrectionUsed(false);
    setBossVictoryState(null);
    setSessionXpEarned(0);
    setSessionPointsEarned(0);

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
  const handleAnswerCurrentWord = (
    isCorrect: boolean,
    userAnswer: string,
    elapsedSeconds: number = 8
  ) => {
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

    // Calculate Speed and Perks bonuses
    const activePerks = appState.gamification?.activePerks || [];
    const hasSpeedPerk = activePerks.includes("speed_spark");
    const hasXpMagnet = activePerks.includes("xp_magnet");
    const hasCriticalRocket = activePerks.includes("critical_rocket") && currentQueueIndex === 0;
    const hasTotem = activePerks.includes("totem_undying");

    const speedBonus = calculateSpeedBonus(elapsedSeconds, hasSpeedPerk);

    // Points and XP award
    const basePointReward = isCorrect ? 25 + speedBonus.bonusPoints : 5;
    let earnedXp = isCorrect ? 40 + speedBonus.bonusXp : 10;
    if (hasXpMagnet && isCorrect) {
      earnedXp = Math.round(earnedXp * 1.25);
    }

    const currentXp = appState.gamification?.xp || 0;
    const newXp = currentXp + earnedXp;
    const currentPoints = appState.gamification?.points || 0;
    const newPoints = currentPoints + basePointReward;

    const rankInfo = getRankForXp(newXp, appState.gamification?.theme || "starwars");

    // Speed record check
    const currentSpeedRecord = appState.gamification?.speedRecords?.fastestAnswerSeconds || 99;
    const isNewSpeedRecord = isCorrect && elapsedSeconds < currentSpeedRecord && elapsedSeconds < 6;
    const fastestSeconds = isNewSpeedRecord ? Number(elapsedSeconds.toFixed(1)) : currentSpeedRecord;

    const updatedBadges = [...(appState.gamification?.unlockedBadges || [])];
    if (elapsedSeconds <= 5.5 && isCorrect && !updatedBadges.includes("speed_demon")) {
      updatedBadges.push("speed_demon");
    }

    // Boss battle damage logic
    let updatedBossHp = bossHp;
    let updatedHearts = playerHearts;
    let newTotemUsed = totemUsed;

    if (isBossSession && activeBoss) {
      if (isCorrect) {
        const hasGrandmasterAura = activePerks.includes("master_grandmaster_aura") && currentItem.word.difficulty === 3;
        const damageDealt = hasCriticalRocket || hasGrandmasterAura ? 2 : 1;
        updatedBossHp = Math.max(0, bossHp - damageDealt);
        setBossHp(updatedBossHp);
      } else {
        if (hasTotem && !totemUsed) {
          // Saved by Totem of Undying!
          newTotemUsed = true;
          setTotemUsed(true);
        } else {
          updatedHearts = Math.max(0, playerHearts - 1);
          if (updatedHearts <= 0 && activePerks.includes("force_resurrection") && !resurrectionUsed) {
            setResurrectionUsed(true);
            updatedHearts = 2;
            if (soundEnabled) playSound("perk_unlock");
          }
          setPlayerHearts(updatedHearts);
        }
      }
    }

    setSessionXpEarned((prev) => prev + earnedXp);
    setSessionPointsEarned((prev) => prev + basePointReward);

    const updatedState: AppState = {
      ...appState,
      progress: updatedProgress,
      stats: updatedStats,
      gamification: {
        ...appState.gamification,
        xp: newXp,
        points: newPoints,
        level: rankInfo.rank.level,
        unlockedBadges: updatedBadges,
        speedRecords: {
          fastestAnswerSeconds: fastestSeconds,
          fastestWord: isNewSpeedRecord ? currentItem.word.word : appState.gamification?.speedRecords?.fastestWord,
          totalSpeedStrikes:
            (appState.gamification?.speedRecords?.totalSpeedStrikes || 0) + (elapsedSeconds <= 6 && isCorrect ? 1 : 0),
        },
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
      const activePerks = appState.gamification?.activePerks || [];
      const hasNetherBeacon = activePerks.includes("nether_beacon");
      const beaconBonus = hasNetherBeacon ? 50 : 0;

      if (isBossSession && activeBoss) {
        // Boss Battle finished
        const finalHp = bossHp;
        const isVictory = finalHp <= 0;
        const rewardMultiplier = isHardcoreTrial ? 3 : 1;
        const bonusXp = (isVictory ? activeBoss.rewardXp : 100) * rewardMultiplier;
        const bonusPoints = (isVictory ? activeBoss.rewardPoints + beaconBonus : 25 + beaconBonus) * rewardMultiplier;

        const totalXp = (appState.gamification?.xp || 0) + bonusXp;
        const totalPoints = (appState.gamification?.points || 0) + bonusPoints;
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
            points: totalPoints,
            level: rankInfo.rank.level,
            bossesDefeated: updatedBossesDefeated,
            unlockedBadges: updatedBadges,
          },
        };

        handleUpdateAppState(finalAppState);
        setBossVictoryState({
          isVictory,
          xpEarned: sessionXpEarned + bonusXp,
          pointsEarned: sessionPointsEarned + bonusPoints,
          unlockedBadge: isVictory ? activeBoss.rewardBadgeId : undefined,
        });
      } else {
        // Regular session finished
        if (soundEnabled) {
          playSound("complete");
        }
        const totalPoints = (appState.gamification?.points || 0) + beaconBonus;
        handleUpdateAppState({
          ...appState,
          stats: {
            ...withStreak,
            totalSessionsCompleted: withStreak.totalSessionsCompleted + 1,
          },
          gamification: {
            ...appState.gamification,
            points: totalPoints,
          },
        });
      }

      setIsSessionFinished(true);
      setIsSessionActive(false);
    }
  };

  // Review only missed words from this session
  const handleReviewMissedOnly = () => {
    const missed = sessionResults.filter((r) => !r.isCorrect && r.word).map((r) => r.word as SpellingWord);
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

  // Filter roster for homepage display (shows all 6 bosses of the active realm)
  const activeRealmKey = appState.gamification?.theme === "standard" ? "starwars" : appState.gamification?.theme;
  const currentThemeBosses = BOSS_ROSTER.filter((b) => b.theme === activeRealmKey);

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

      {/* Hero Armory & Perk Shop Modal */}
      {isArmoryOpen && (
        <HeroArmory
          gamification={appState.gamification}
          onUpdateTheme={handleChangeTheme}
          onSelectBossToFight={startBossBattle}
          onUnlockPerk={handleUnlockPerk}
          onToggleActivePerk={handleToggleActivePerk}
          onEquipGear={handleEquipGear}
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
                results={sessionResults.filter((r) => r.word) as { word: SpellingWord; isCorrect: boolean; userAnswer: string }[]}
                isVictory={bossVictoryState.isVictory}
                xpEarned={bossVictoryState.xpEarned}
                pointsEarned={bossVictoryState.pointsEarned}
                unlockedBadge={bossVictoryState.unlockedBadge}
                onFightAgain={() => startBossBattle(activeBoss.id, isHardcoreTrial)}
                onNextBoss={() => {
                  const nextLevel = activeBoss.level < 10 ? activeBoss.level + 1 : 1;
                  const nextBoss = BOSS_ROSTER.find(
                    (b) => b.theme === activeBoss.theme && b.level === nextLevel
                  );
                  if (nextBoss) startBossBattle(nextBoss.id, isHardcoreTrial);
                  else startBossBattle(BOSS_ROSTER[0].id, isHardcoreTrial);
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

        {/* VIEW 3: Active Card (Grammar Card, Boss Card or Standard Cards) */}
        {activeTab === "practice" && isSessionActive && isGrammarSession && grammarQueue[currentQueueIndex] && (
          <div className="w-full flex flex-col items-center gap-4 animate-fadeIn">
            <GrammarPracticeCard
              question={grammarQueue[currentQueueIndex]}
              currentIndex={currentQueueIndex}
              totalQuestions={grammarQueue.length}
              onAnswer={handleAnswerGrammar}
              soundEnabled={soundEnabled}
            />
          </div>
        )}

        {/* VIEW 3B: Active Card (Boss Card or Standard Cards) */}
        {activeTab === "practice" && isSessionActive && !isGrammarSession && currentItem && (
          <div className="w-full flex flex-col items-center gap-4 animate-fadeIn">
            {isBossSession && activeBoss ? (
              <BossBattleCard
                boss={activeBoss}
                word={currentItem.word}
                mode={currentItem.mode}
                bossHp={bossHp}
                maxHp={isHardcoreTrial ? Math.round(activeBoss.hp * 1.5) : activeBoss.hp}
                playerHearts={playerHearts}
                maxHearts={maxHearts}
                currentIndex={currentQueueIndex}
                totalWords={sessionQueue.length}
                activePerks={appState.gamification?.activePerks || []}
                totemUsed={totemUsed}
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
                    onAnswer={(correct, ans) => handleAnswerCurrentWord(correct, ans, 8)}
                    soundEnabled={soundEnabled}
                  />
                ) : (
                  <ProofreadingCard
                    word={currentItem.word}
                    currentIndex={currentQueueIndex}
                    totalInSession={sessionQueue.length}
                    onAnswer={(correct, ans) => handleAnswerCurrentWord(correct, ans, 8)}
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
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black uppercase tracking-wider">
                    {currentTheme.name}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                    Lvl {rankInfo.rank.level} • {rankInfo.title}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/40 text-amber-300 text-xs font-black border border-white/10">
                    🪙 {appState.gamification?.points || 0} Points
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Welcome to {currentTheme.shortName} Spelling!
                </h2>
                <p className="text-slate-200 text-sm mt-1 max-w-lg">
                  Speed-strike spelling battles, phonics shields, and 18 epic boss encounters
                  await!
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <button
                    onClick={() => startSession("mixed")}
                    className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-extrabold text-sm shadow-lg shadow-amber-900/20 transition flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Daily 10 Spelling</span>
                  </button>

                  <button
                    onClick={() => startGrammarSession()}
                    className="px-5 py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-purple-950/20 transition flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-purple-200" />
                    <span>Top 1% Grammar</span>
                  </button>

                  <button
                    onClick={() => setIsArmoryOpen(true)}
                    className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md active:scale-95 text-white font-extrabold text-sm border border-white/30 transition flex items-center gap-2"
                  >
                    <Swords className="w-4 h-4 text-amber-300" />
                    <span>Boss Arena & Perks</span>
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

            {/* BOSS BATTLES SECTION (All 6 Bosses for Active Realm) */}
            {/* BOSS BATTLES SECTION (All 10 Bosses for Active Realm) */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    ⚔️ {currentTheme.shortName} Boss Battles (Levels 1 - 10)
                  </h3>
                  <button
                    onClick={() => {
                      setIsHardcoreTrial(!isHardcoreTrial);
                      playSound("click");
                    }}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase transition flex items-center gap-1 border ${
                      isHardcoreTrial
                        ? "bg-rose-950 text-rose-300 border-rose-500 animate-pulse"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300"
                    }`}
                    title="Hardcore Trial: 1.5x Boss HP, 2 Hearts Only, 3x XP and Points!"
                  >
                    <span>💀 Hardcore</span>
                    <span>{isHardcoreTrial ? "ON (3x)" : "OFF"}</span>
                  </button>
                </div>
                <button
                  onClick={() => setIsArmoryOpen(true)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  View All 30 Bosses ➔
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentThemeBosses.map((boss) => {
                  const wins = appState.gamification?.bossesDefeated[boss.id] || 0;
                  const isConquered = wins > 0;
                  const displayHp = isHardcoreTrial ? Math.round(boss.hp * 1.5) : boss.hp;
                  const displayXp = isHardcoreTrial ? boss.rewardXp * 3 : boss.rewardXp;

                  return (
                    <div
                      key={boss.id}
                      className={`border rounded-2xl p-3.5 transition flex flex-col justify-between relative overflow-hidden group shadow-sm ${
                        isConquered
                          ? "bg-gradient-to-b from-amber-50/60 to-white border-amber-300"
                          : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="text-3xl group-hover:scale-110 transition">
                            {boss.avatarEmoji}
                          </span>
                          <div className="flex items-center gap-1 flex-wrap justify-end">
                            <span
                              className={`px-1.5 py-0.5 rounded font-black text-[10px] ${
                                boss.level >= 10
                                  ? "bg-rose-100 text-rose-800"
                                  : boss.level >= 7
                                  ? "bg-purple-100 text-purple-800"
                                  : boss.level >= 5
                                  ? "bg-indigo-100 text-indigo-800"
                                  : boss.level >= 3
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              Lvl {boss.level}
                            </span>
                            {boss.tier && (
                              <span
                                className={`px-1 py-0.5 rounded font-black text-[9px] uppercase ${
                                  boss.tier === "Apex"
                                    ? "bg-rose-100 text-rose-800"
                                    : boss.tier === "Nightmare"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {boss.tier}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-2.5">
                          <h4 className="font-black text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-indigo-600 transition line-clamp-1">
                            {boss.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                            {boss.title}
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-600 font-bold bg-slate-50 rounded-lg p-1 border border-slate-100">
                            <span>HP: {displayHp}</span>
                            <span className="text-amber-600">+{displayXp} XP</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => startBossBattle(boss.id, isHardcoreTrial)}
                        className={`mt-3 w-full py-1.5 rounded-xl font-black text-xs shadow-md transition flex items-center justify-center gap-1 active:scale-95 text-white ${
                          isHardcoreTrial
                            ? "bg-rose-600 hover:bg-rose-700 shadow-rose-100"
                            : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-110 shadow-indigo-100"
                        }`}
                      >
                        <Swords className="w-3 h-3 text-amber-300" />
                        <span>{isHardcoreTrial ? "💀 Hardcore" : "Fight Boss"}</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Grammar & Conventions Card */}
                <div
                  onClick={() => startGrammarSession()}
                  className="bg-white hover:border-purple-400 hover:shadow-lg cursor-pointer border-2 border-purple-200/80 rounded-3xl p-5 transition flex flex-col justify-between group active:scale-[0.98] relative overflow-hidden bg-gradient-to-b from-purple-50/40 to-white"
                >
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-600 text-white">
                      Top 1% Skills
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:scale-105 transition shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="pr-12 sm:pr-0">
                      <h4 className="font-extrabold text-base text-slate-800 group-hover:text-purple-700 transition">
                        Grammar & Punctuation
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Apostrophes, speech marks, past tense verbs, pronouns, and sentence structures.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-xs font-bold text-purple-700">
                    <span>10 NAPLAN Questions</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>

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

            {/* Perks Tip Banner */}
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-slate-700 flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <span className="font-bold text-slate-900">Speed Scoring & Perks Active:</span> Type
                answers in under 6 seconds for <span className="font-bold text-amber-800">LIGHTNING SPEED</span> bonus points.
                Spend points in your <span className="font-bold text-indigo-700">Hero Armory</span> to unlock Extra Shield Armor, Jarvis HUD, and Totems of Undying!
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
