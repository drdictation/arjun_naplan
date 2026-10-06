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
  ShoppingBag,
  Timer,
  Check,
} from "lucide-react";
import {
  GameTheme,
  GamificationState,
  BOSS_ROSTER,
  BADGES_CATALOG,
  PERKS_CATALOG,
  GOODIES_CATALOG,
  getRankForXp,
  getThemeDetails,
} from "../lib/gamification";
import { playSound } from "../lib/storage";

interface HeroArmoryProps {
  gamification: GamificationState;
  onUpdateTheme: (newTheme: GameTheme) => void;
  onSelectBossToFight: (bossId: string) => void;
  onUnlockPerk: (perkId: string, cost: number) => void;
  onToggleActivePerk: (perkId: string) => void;
  onEquipGear: (type: "weapon" | "artifact", id: string) => void;
  onClose: () => void;
}

export const HeroArmory: React.FC<HeroArmoryProps> = ({
  gamification,
  onUpdateTheme,
  onSelectBossToFight,
  onUnlockPerk,
  onToggleActivePerk,
  onEquipGear,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"bosses" | "perks" | "goodies" | "badges" | "themes">("bosses");
  const rankInfo = getRankForXp(gamification.xp, gamification.theme);
  const currentTheme = getThemeDetails(gamification.theme);

  const totalBossesDefeated = Object.values(gamification.bossesDefeated || {}).reduce(
    (acc, cur) => acc + cur,
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
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
                Arjun&apos;s Armory, Perks & Trophies
              </h2>
            </div>
          </div>

          {/* Level, XP & Points Bar */}
          <div className="mt-4 bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs flex-wrap gap-1">
              <span className="font-extrabold text-amber-300">
                Level {rankInfo.rank.level}: {rankInfo.title}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-black border border-amber-400/30">
                  🪙 {gamification.points} Perk Points
                </span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {gamification.xp} XP
                </span>
              </div>
            </div>
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${rankInfo.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1.5 mt-4 overflow-x-auto pb-1">
            <button
              onClick={() => {
                setActiveTab("bosses");
                playSound("click");
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 whitespace-nowrap ${
                activeTab === "bosses"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Bosses (18)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("perks");
                playSound("click");
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 whitespace-nowrap ${
                activeTab === "perks"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Perks & Skills</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("goodies");
                playSound("click");
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 whitespace-nowrap ${
                activeTab === "goodies"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Gear & Loot</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("badges");
                playSound("click");
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 whitespace-nowrap ${
                activeTab === "badges"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Badges</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("themes");
                playSound("click");
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 whitespace-nowrap ${
                activeTab === "themes"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Realms</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {/* TAB 1: Boss Arena Selection */}
          {activeTab === "bosses" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold uppercase tracking-wider">All 18 Boss Encounters</span>
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  🏆 {totalBossesDefeated} Victories
                </span>
              </div>

              {(["starwars", "marvel", "minecraft"] as const).map((realmTheme) => {
                const realmBosses = BOSS_ROSTER.filter((b) => b.theme === realmTheme);
                const realmTitle =
                  realmTheme === "starwars"
                    ? "🌌 Star Wars: The Galactic Sith & Empire"
                    : realmTheme === "marvel"
                    ? "⚡ Marvel: Avengers Cosmic Gauntlet"
                    : "⛏️ Minecraft: Nether, The End & Ancient Dark";

                return (
                  <div key={realmTheme} className="space-y-2.5">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      {realmTitle}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {realmBosses.map((boss) => {
                        const winCount = gamification.bossesDefeated[boss.id] || 0;
                        const isDefeated = winCount > 0;

                        return (
                          <div
                            key={boss.id}
                            className={`border rounded-2xl p-3 flex flex-col justify-between transition relative text-left ${
                              isDefeated
                                ? "bg-amber-50/40 border-amber-300 shadow-sm"
                                : "bg-white border-slate-200 hover:border-indigo-300"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-3xl">{boss.avatarEmoji}</span>
                              <div className="flex items-center gap-1">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${
                                    boss.level >= 5
                                      ? "bg-purple-100 text-purple-800"
                                      : boss.level >= 3
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-emerald-100 text-emerald-800"
                                  }`}
                                >
                                  Lvl {boss.level}
                                </span>
                                {isDefeated && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                                    x{winCount}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="mt-2">
                              <h5 className="font-black text-xs sm:text-sm text-slate-800 leading-snug">
                                {boss.name}
                              </h5>
                              <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
                                HP: {boss.hp} Words • +{boss.rewardXp} XP • +{boss.rewardPoints} Pts
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                onSelectBossToFight(boss.id);
                                onClose();
                              }}
                              className="mt-2.5 w-full py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs shadow-sm transition"
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

          {/* TAB 2: Perks & Skills Tree */}
          {activeTab === "perks" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-wider">
                  Hero Skills & Battle Perks
                </span>
                <span className="font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                  🪙 {gamification.points} Points Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PERKS_CATALOG.map((perk) => {
                  const isUnlocked = gamification.unlockedPerks.includes(perk.id);
                  const isActive = (gamification.activePerks || []).includes(perk.id);
                  const canAfford = gamification.points >= perk.costPoints;

                  return (
                    <div
                      key={perk.id}
                      className={`p-3.5 rounded-2xl border transition flex flex-col justify-between ${
                        isActive
                          ? "bg-amber-50/70 border-amber-400 shadow-sm ring-1 ring-amber-300"
                          : isUnlocked
                          ? "bg-white border-slate-200"
                          : "bg-slate-50/80 border-slate-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                          {perk.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-black text-xs sm:text-sm text-slate-900 leading-tight">
                              {perk.name}
                            </h5>
                            {isActive && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-800">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {perk.description}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                            {perk.bonusEffect}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        {!isUnlocked ? (
                          <>
                            <span className="text-xs font-black text-amber-700">
                              🪙 {perk.costPoints} Pts
                            </span>
                            <button
                              disabled={!canAfford}
                              onClick={() => {
                                onUnlockPerk(perk.id, perk.costPoints);
                                playSound("perk_unlock");
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                                canAfford
                                  ? "bg-amber-400 hover:bg-amber-500 text-slate-950 active:scale-95 shadow-sm"
                                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                              }`}
                            >
                              Unlock Perk
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Unlocked
                            </span>
                            <button
                              onClick={() => {
                                onToggleActivePerk(perk.id);
                                playSound("click");
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                                isActive
                                  ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                              }`}
                            >
                              {isActive ? "Unequip" : "Equip for Battle"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Gear & Goodies */}
          {activeTab === "goodies" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span>Collectibles & Equippable Relics</span>
                <span>Unlocked by XP Milestone</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOODIES_CATALOG.map((item) => {
                  const isUnlocked = gamification.xp >= item.unlockedAtXp;
                  const isEquipped =
                    gamification.equippedGear?.weapon === item.id ||
                    gamification.equippedGear?.artifact === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border transition flex items-start gap-3 ${
                        isEquipped
                          ? "bg-indigo-50/80 border-indigo-500 shadow-sm"
                          : isUnlocked
                          ? "bg-white border-slate-200"
                          : "bg-slate-50/60 border-slate-200 opacity-60"
                      }`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                        {item.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-black text-xs sm:text-sm text-slate-900 leading-snug">
                            {item.name}
                          </h5>
                          {isEquipped && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-600 text-white">
                              EQUIPPED
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>

                        <div className="mt-2 flex items-center justify-between">
                          {isUnlocked ? (
                            <button
                              onClick={() => {
                                onEquipGear(item.type === "armor" ? "artifact" : "weapon", item.id);
                                if (item.realm === "starwars") playSound("lightsaber");
                                else if (item.realm === "marvel") playSound("repulsor");
                                else playSound("minecraft_xp");
                              }}
                              className="text-[11px] font-black text-indigo-700 hover:underline"
                            >
                              {isEquipped ? "Currently Equipped" : "Equip Gear ➔"}
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Unlocks at {item.unlockedAtXp} XP
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Badges Catalog */}
          {activeTab === "badges" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Earned Badges ({gamification.unlockedBadges.length} Unlocked)
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
                              badge.rarity === "mythic"
                                ? "bg-fuchsia-100 text-fuchsia-800"
                                : badge.rarity === "legendary"
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

          {/* TAB 5: Realm / Theme Switcher */}
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
