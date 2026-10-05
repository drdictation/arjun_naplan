"use client";

import React, { useState } from "react";
import {
  Award,
  Sparkles,
  Shield,
  Zap,
  CheckCircle2,
  Lock,
  X,
  Swords,
  Layers,
} from "lucide-react";
import {
  GameTheme,
  GamificationState,
  BOSS_ROSTER,
  BADGES_CATALOG,
  getRankForXp,
  getThemeDetails,
} from "../lib/gamification";
import { playSound } from "../lib/storage";

interface HeroArmoryProps {
  gamification: GamificationState;
  onUpdateTheme: (newTheme: GameTheme) => void;
  onSelectBossToFight: (bossId: string) => void;
  onClose: () => void;
}

export const HeroArmory: React.FC<HeroArmoryProps> = ({
  gamification,
  onUpdateTheme,
  onSelectBossToFight,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"bosses" | "badges" | "themes">("bosses");
  const rankInfo = getRankForXp(gamification.xp, gamification.theme);
  const currentTheme = getThemeDetails(gamification.theme);

  const totalBossesDefeated = Object.values(gamification.bossesDefeated || {}).reduce(
    (acc, cur) => acc + cur,
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header with Close */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
            aria-label="Close Hero Armory"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl shadow-lg shadow-amber-400/30">
              🏆
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Hero Headquarters
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                Arjun&apos;s Armory & Trophies
              </h2>
            </div>
          </div>

          {/* Level & XP Bar */}
          <div className="mt-4 bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-extrabold text-amber-300">
                Level {rankInfo.rank.level}: {rankInfo.title}
              </span>
              <span className="text-slate-300 font-mono">
                {gamification.xp} XP ({rankInfo.progressPercent}% to next rank)
              </span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${rankInfo.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setActiveTab("bosses");
                playSound("click");
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === "bosses"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Boss Arena</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("badges");
                playSound("click");
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === "badges"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Badges ({gamification.unlockedBadges.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("themes");
                playSound("click");
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === "themes"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Active Realm</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {/* TAB 1: Boss Arena Selection */}
          {activeTab === "bosses" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold uppercase tracking-wider">Select a Boss to Battle</span>
                <span>{totalBossesDefeated} Total Defeats</span>
              </div>

              {/* Grouped by theme */}
              {(["starwars", "marvel", "minecraft"] as const).map((realmTheme) => {
                const realmBosses = BOSS_ROSTER.filter((b) => b.theme === realmTheme);
                const realmTitle =
                  realmTheme === "starwars"
                    ? "🌌 Star Wars: Galactic Empire"
                    : realmTheme === "marvel"
                    ? "⚡ Marvel: Avengers Assemble"
                    : "⛏️ Minecraft: Nether & The End";

                return (
                  <div key={realmTheme} className="space-y-2">
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                      {realmTitle}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {realmBosses.map((boss) => {
                        const winCount = gamification.bossesDefeated[boss.id] || 0;
                        const isDefeated = winCount > 0;

                        return (
                          <div
                            key={boss.id}
                            className={`border rounded-2xl p-3.5 flex flex-col justify-between transition relative overflow-hidden text-left ${
                              isDefeated
                                ? "bg-amber-50/40 border-amber-300 shadow-sm"
                                : "bg-white border-slate-200 hover:border-indigo-300"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-3xl">{boss.avatarEmoji}</span>
                              {isDefeated ? (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>x{winCount}</span>
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                                  Lvl {boss.level}
                                </span>
                              )}
                            </div>

                            <div className="mt-2">
                              <h5 className="font-black text-sm text-slate-800 leading-snug">
                                {boss.name}
                              </h5>
                              <p className="text-[11px] text-slate-500 font-medium">
                                HP: {boss.hp} Words • +{boss.rewardXp} XP
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                onSelectBossToFight(boss.id);
                                onClose();
                              }}
                              className="mt-3 w-full py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs shadow-sm transition"
                            >
                              Battle ➔
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: Badges Catalog */}
          {activeTab === "badges" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Earned Badges & Unlocked Loot
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BADGES_CATALOG.map((badge) => {
                  const isUnlocked = gamification.unlockedBadges.includes(badge.id);

                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 transition ${
                        isUnlocked
                          ? "bg-white border-amber-200 shadow-sm"
                          : "bg-slate-50/70 border-slate-200 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                          isUnlocked ? "bg-amber-100" : "bg-slate-200 grayscale"
                        }`}
                      >
                        {badge.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-black text-sm text-slate-800">{badge.title}</h5>
                          <span
                            className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                              badge.rarity === "legendary"
                                ? "bg-amber-100 text-amber-800"
                                : badge.rarity === "epic"
                                ? "bg-purple-100 text-purple-800"
                                : badge.rarity === "rare"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {badge.rarity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{badge.description}</p>
                        {!isUnlocked && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 mt-1">
                            <Lock className="w-3 h-3" /> Locked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Realm / Theme Switcher */}
          {activeTab === "themes" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Choose Arjun&apos;s Active Realm Theme
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(["starwars", "marvel", "minecraft", "standard"] as const).map((themeKey) => {
                  const t = getThemeDetails(themeKey);
                  const isSelected = gamification.theme === themeKey;

                  return (
                    <div
                      key={themeKey}
                      onClick={() => {
                        onUpdateTheme(themeKey);
                        if (themeKey === "starwars") playSound("lightsaber");
                        else if (themeKey === "marvel") playSound("repulsor");
                        else if (themeKey === "minecraft") playSound("minecraft_xp");
                        else playSound("click");
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                        isSelected
                          ? "bg-indigo-50/70 border-indigo-600 shadow-md ring-2 ring-indigo-200"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-3xl">{t.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-black text-sm text-slate-800">{t.name}</h5>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{t.tagline}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
