export type GameTheme = "starwars" | "marvel" | "minecraft" | "standard";

export interface BossDefinition {
  id: string;
  theme: "starwars" | "marvel" | "minecraft";
  name: string;
  title: string;
  level: 1 | 2 | 3;
  hp: number; // number of correct words to defeat
  avatarEmoji: string;
  colorScheme: {
    primary: string; // Tailwind color class or hex
    bgGradient: string;
    accent: string;
    border: string;
    hpBar: string;
  };
  introTaunt: string;
  hitReaction: string[];
  defeatQuote: string;
  playerAttackName: string;
  playerAttackIcon: string;
  rewardBadgeId: string;
  rewardBadgeName: string;
  rewardBadgeIcon: string;
  rewardXp: number;
  wordCategoryPreference?: string;
}

export interface BadgeDefinition {
  id: string;
  theme: GameTheme;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface GamificationState {
  theme: GameTheme;
  xp: number;
  level: number;
  bossesDefeated: Record<string, number>;
  unlockedBadges: string[];
  equippedTitle?: string;
}

export const INITIAL_GAMIFICATION_STATE: GamificationState = {
  theme: "starwars",
  xp: 150,
  level: 1,
  bossesDefeated: {},
  unlockedBadges: ["recruit_badge"],
  equippedTitle: "Youngling Padawan",
};

export const BOSS_ROSTER: BossDefinition[] = [
  // --- STAR WARS REALM ---
  {
    id: "sw-stormtrooper",
    theme: "starwars",
    name: "Stormtrooper Commander",
    title: "Imperial Vanguard",
    level: 1,
    hp: 4,
    avatarEmoji: "🪖",
    colorScheme: {
      primary: "from-slate-700 to-zinc-900",
      bgGradient: "from-slate-900 via-zinc-900 to-black",
      accent: "text-red-400",
      border: "border-red-500/30",
      hpBar: "bg-red-500",
    },
    introTaunt: "Halt, rebel! Your spelling blasters can't penetrate Imperial armor!",
    hitReaction: [
      "Armor breach! That spelling was right on target!",
      "Blaster hit! The Imperial line is faltering!",
      "Critical hit! My helmet display is glitching!",
    ],
    defeatQuote: "Blast it! You've broken through our defense perimeter! Report to Lord Vader...",
    playerAttackName: "Lightsaber Strike",
    playerAttackIcon: "⚡",
    rewardBadgeId: "sw_rebel_hero",
    rewardBadgeName: "Rebel Vanguard Badge",
    rewardBadgeIcon: "🎖️",
    rewardXp: 300,
  },
  {
    id: "sw-kylo",
    theme: "starwars",
    name: "Kylo Ren",
    title: "Master of the Knights of Ren",
    level: 2,
    hp: 5,
    avatarEmoji: "⚔️",
    colorScheme: {
      primary: "from-red-950 via-zinc-900 to-black",
      bgGradient: "from-red-950 via-slate-950 to-black",
      accent: "text-red-500",
      border: "border-red-600/50",
      hpBar: "bg-gradient-to-r from-red-600 to-amber-500",
    },
    introTaunt: "Let the past die. Spell incorrectly, and you will be crushed by the First Order!",
    hitReaction: [
      "No! The Force is surprisingly strong in your phonics!",
      "Aarrgh! Crossguard blocked by your perfect vowels!",
      "Impossible! That syllable strike pierced my defense!",
    ],
    defeatQuote: "The Force... it calls to you. I will finish what our grandfather started next time!",
    playerAttackName: "Dual Saber Flurry",
    playerAttackIcon: "✨",
    rewardBadgeId: "sw_jedi_knight",
    rewardBadgeName: "Jedi Knight Crossguard",
    rewardBadgeIcon: "🗡️",
    rewardXp: 500,
  },
  {
    id: "sw-vader",
    theme: "starwars",
    name: "Lord Darth Vader",
    title: "Dark Lord of the Sith",
    level: 3,
    hp: 6,
    avatarEmoji: "🌌",
    colorScheme: {
      primary: "from-red-900 via-black to-slate-950",
      bgGradient: "from-black via-zinc-950 to-red-950",
      accent: "text-red-400",
      border: "border-red-500/60",
      hpBar: "bg-gradient-to-r from-red-600 via-rose-500 to-red-700",
    },
    introTaunt: "I find your lack of spelling faith disturbing. Face the full might of the Dark Side!",
    hitReaction: [
      "*Heavy breathing* ...Impressive. Most impressive.",
      "The spelling Force is powerful in you, Arjun!",
      "A direct hit against the Death Star core!",
    ],
    defeatQuote: "You have mastered the ancient spelling texts... Truly, you are a Jedi Master!",
    playerAttackName: "Master Jedi Force Surge",
    playerAttackIcon: "🌟",
    rewardBadgeId: "sw_jedi_master",
    rewardBadgeName: "Grandmaster Kyber Crystal",
    rewardBadgeIcon: "💎",
    rewardXp: 1000,
  },

  // --- MARVEL REALM ---
  {
    id: "marvel-chitauri",
    theme: "marvel",
    name: "Chitauri Leviathan",
    title: "Cosmic Invasion Force",
    level: 1,
    hp: 4,
    avatarEmoji: "👾",
    colorScheme: {
      primary: "from-blue-900 via-slate-900 to-indigo-950",
      bgGradient: "from-slate-950 via-blue-950 to-indigo-950",
      accent: "text-blue-400",
      border: "border-blue-500/40",
      hpBar: "bg-blue-500",
    },
    introTaunt: "New York skies are open! No Earthling can spell fast enough to stop the invasion!",
    hitReaction: [
      "Boom! Repulsor blast deflected the alien flyer!",
      "Captain's shield bounced right off their armor plates!",
      "Hawkeye arrow hit the target word perfectly!",
    ],
    defeatQuote: "The portal is closing! The Avengers have defended the city!",
    playerAttackName: "Iron Man Repulsor Blast",
    playerAttackIcon: "💥",
    rewardBadgeId: "marvel_avenger_cadet",
    rewardBadgeName: "Avengers Initiative Crest",
    rewardBadgeIcon: "🛡️",
    rewardXp: 300,
  },
  {
    id: "marvel-ultron",
    theme: "marvel",
    name: "Ultron Prime",
    title: "Sentient Vibranium AI",
    level: 2,
    hp: 5,
    avatarEmoji: "🤖",
    colorScheme: {
      primary: "from-zinc-900 via-red-950 to-zinc-900",
      bgGradient: "from-zinc-950 via-neutral-900 to-red-950",
      accent: "text-red-500",
      border: "border-red-600/40",
      hpBar: "bg-gradient-to-r from-red-600 to-orange-500",
    },
    introTaunt: "You want to save the world, but your spelling syntax contains fatal errors. Extinction begins!",
    hitReaction: [
      "Warning: System logic overwhelmed by grammatically correct root words!",
      "Crack! Thor's hammer shattered an Ultron sentry!",
      "Vibranium hull damaged by precise letter sequencing!",
    ],
    defeatQuote: "There are... no strings on me... You have out-computed the Prime AI!",
    playerAttackName: "Mjolnir Thunder Strike",
    playerAttackIcon: "⚡",
    rewardBadgeId: "marvel_thor_hammer",
    rewardBadgeName: "Worthy of Mjolnir",
    rewardBadgeIcon: "🔨",
    rewardXp: 500,
  },
  {
    id: "marvel-thanos",
    theme: "marvel",
    name: "Titan Thanos",
    title: "Wielder of the Infinity Gauntlet",
    level: 3,
    hp: 6,
    avatarEmoji: "🧤",
    colorScheme: {
      primary: "from-purple-950 via-slate-900 to-amber-950",
      bgGradient: "from-slate-950 via-purple-950 to-zinc-950",
      accent: "text-amber-400",
      border: "border-amber-500/50",
      hpBar: "bg-gradient-to-r from-purple-500 via-amber-400 to-emerald-400",
    },
    introTaunt: "I am inevitable. One misspelled word, and half the universe turns to dust!",
    hitReaction: [
      "Gaaah! An Infinity Stone chipped by your spelling precision!",
      "Iron Man's nano-gauntlet absorbs the cosmic energy!",
      "Avengers Assemble strike! Thanos stumbles backwards!",
    ],
    defeatQuote: "I went for the head... and your spelling was supreme. The universe is saved!",
    playerAttackName: "Infinity Gauntlet Snap",
    playerAttackIcon: "💎",
    rewardBadgeId: "marvel_infinity_champion",
    rewardBadgeName: "Infinity Gauntlet Master",
    rewardBadgeIcon: "✨",
    rewardXp: 1000,
  },

  // --- MINECRAFT REALM ---
  {
    id: "mc-creeper",
    theme: "minecraft",
    name: "Charged Creeper",
    title: "High-Voltage Nether Mob",
    level: 1,
    hp: 4,
    avatarEmoji: "🧨",
    colorScheme: {
      primary: "from-emerald-900 via-green-950 to-zinc-950",
      bgGradient: "from-zinc-950 via-green-950 to-neutral-900",
      accent: "text-emerald-400",
      border: "border-emerald-500/40",
      hpBar: "bg-emerald-500",
    },
    introTaunt: "Sssssssss... that's a nice spelling streak you have there. Shame if something blew it up!",
    hitReaction: [
      "Thwack! Diamond arrow knockback activated!",
      "Sssss-ouch! The fuse was interrupted by correct spelling!",
      "Critical hit! 12 hearts damage dealt!",
    ],
    defeatQuote: "*Poof!* Drops 5 Gunpowder and an Enchanted Emerald! You diffused the blast!",
    playerAttackName: "Diamond Sword Slash",
    playerAttackIcon: "🗡️",
    rewardBadgeId: "mc_creeper_defuser",
    rewardBadgeName: "Creeper Defuser Trophy",
    rewardBadgeIcon: "🟩",
    rewardXp: 300,
  },
  {
    id: "mc-wither",
    theme: "minecraft",
    name: "The Three-Headed Wither",
    title: "Nether Netherite Destroyer",
    level: 2,
    hp: 5,
    avatarEmoji: "💀",
    colorScheme: {
      primary: "from-neutral-950 via-stone-900 to-zinc-900",
      bgGradient: "from-black via-neutral-950 to-stone-900",
      accent: "text-purple-400",
      border: "border-purple-500/40",
      hpBar: "bg-gradient-to-r from-purple-600 to-blue-500",
    },
    introTaunt: "ROAARRR! Black skulls raining from above! Only enchanted spelling armor can survive!",
    hitReaction: [
      "Ding! Netherite shield deflected a wither skull!",
      "Smite V strike! Wither health drops rapidly!",
      "Golden apple health boost! Arjun counters with double consonants!",
    ],
    defeatQuote: "*BOOOM!* Drops Nether Star! Arjun crafts a legendary Beacon of Knowledge!",
    playerAttackName: "Enchanted Bow Snipeshot",
    playerAttackIcon: "🏹",
    rewardBadgeId: "mc_nether_star",
    rewardBadgeName: "Nether Star Beacon",
    rewardBadgeIcon: "⭐",
    rewardXp: 500,
  },
  {
    id: "mc-ender-dragon",
    theme: "minecraft",
    name: "The Ender Dragon",
    title: "Ruler of The End Dimension",
    level: 3,
    hp: 6,
    avatarEmoji: "🐉",
    colorScheme: {
      primary: "from-purple-950 via-black to-fuchsia-950",
      bgGradient: "from-black via-purple-950 to-slate-950",
      accent: "text-fuchsia-400",
      border: "border-fuchsia-500/50",
      hpBar: "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400",
    },
    introTaunt: "ROOOAAAR! Purple dragon breath blankets the obsidian towers! Free the End!",
    hitReaction: [
      "End Crystal destroyed by your accurate phonetic shot!",
      "Direct hit to the dragon's snout with a Netherite blade!",
      "Critical spelling combo! Purple sparks fly across the arena!",
    ],
    defeatQuote: "The Ender Dragon disintegrates into 10,000 XP orbs! The portal opens back home!",
    playerAttackName: "Netherite Sword & Elytra Dive",
    playerAttackIcon: "⚔️",
    rewardBadgeId: "mc_dragon_slayer",
    rewardBadgeName: "Ender Dragon Egg & Elytra",
    rewardBadgeIcon: "🥚",
    rewardXp: 1000,
  },
];

export const BADGES_CATALOG: BadgeDefinition[] = [
  // Starter
  {
    id: "recruit_badge",
    theme: "standard",
    title: "Spelling Recruit",
    description: "Started the Year 3 NAPLAN Spelling Journey!",
    icon: "🎒",
    rarity: "common",
  },
  // Star Wars
  {
    id: "sw_rebel_hero",
    theme: "starwars",
    title: "Rebel Vanguard",
    description: "Defeated the Stormtrooper Commander in a galactic spelling duel.",
    icon: "🎖️",
    rarity: "common",
  },
  {
    id: "sw_jedi_knight",
    theme: "starwars",
    title: "Jedi Knight",
    description: "Out-spelled Kylo Ren and mastered the dual crossguard combat.",
    icon: "🗡️",
    rarity: "rare",
  },
  {
    id: "sw_jedi_master",
    theme: "starwars",
    title: "Jedi Grandmaster",
    description: "Conquered Lord Darth Vader and restored balance to the Galaxy!",
    icon: "💎",
    rarity: "legendary",
  },
  // Marvel
  {
    id: "marvel_avenger_cadet",
    theme: "marvel",
    title: "Avenger Cadet",
    description: "Repelled the Chitauri invasion with quick-fire spelling.",
    icon: "🛡️",
    rarity: "common",
  },
  {
    id: "marvel_thor_hammer",
    theme: "marvel",
    title: "Worthy of Mjolnir",
    description: "Shattered Ultron Prime with thunderous phonics power.",
    icon: "🔨",
    rarity: "rare",
  },
  {
    id: "marvel_infinity_champion",
    theme: "marvel",
    title: "Infinity Champion",
    description: "Defeated Titan Thanos and collected all six Spelling Stones!",
    icon: "✨",
    rarity: "legendary",
  },
  // Minecraft
  {
    id: "mc_creeper_defuser",
    theme: "minecraft",
    title: "Creeper Defuser",
    description: "Disarmed a charged creeper before the fuse reached zero.",
    icon: "🟩",
    rarity: "common",
  },
  {
    id: "mc_nether_star",
    theme: "minecraft",
    title: "Nether Star Beacon",
    description: "Constructed the ultimate beacon after overcoming the Wither.",
    icon: "⭐",
    rarity: "rare",
  },
  {
    id: "mc_dragon_slayer",
    theme: "minecraft",
    title: "Ender Dragon Slayer",
    description: "Conquered The End dimension and hatched the legendary Dragon Egg!",
    icon: "🥚",
    rarity: "legendary",
  },
  // General streaks
  {
    id: "streak_3",
    theme: "standard",
    title: "3-Day Fire Streak",
    description: "Practiced 3 days in a row!",
    icon: "🔥",
    rarity: "common",
  },
  {
    id: "streak_7",
    theme: "standard",
    title: "Week-Long Hero",
    description: "Practiced 7 days in a row!",
    icon: "👑",
    rarity: "epic",
  },
  {
    id: "master_25",
    theme: "standard",
    title: "Silver Scholar",
    description: "Mastered 25 NAPLAN words!",
    icon: "🥈",
    rarity: "rare",
  },
  {
    id: "master_50",
    theme: "standard",
    title: "Gold Wordsmith",
    description: "Mastered 50 NAPLAN words!",
    icon: "🥇",
    rarity: "legendary",
  },
];

export interface PlayerRank {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  themeTitles: Record<GameTheme, string>;
}

export const PLAYER_RANKS: PlayerRank[] = [
  {
    level: 1,
    title: "Spelling Novice",
    minXp: 0,
    maxXp: 400,
    themeTitles: {
      starwars: "Youngling Padawan",
      marvel: "S.H.I.E.L.D. Cadet",
      minecraft: "Wooden Sword Crafter",
      standard: "Junior Speller",
    },
  },
  {
    level: 2,
    title: "Apprentice Scholar",
    minXp: 400,
    maxXp: 1000,
    themeTitles: {
      starwars: "Jedi Padawan",
      marvel: "Stark Tech Trainee",
      minecraft: "Iron Miner",
      standard: "Skilled Reader",
    },
  },
  {
    level: 3,
    title: "Spelling Knight",
    minXp: 1000,
    maxXp: 2000,
    themeTitles: {
      starwars: "Jedi Knight",
      marvel: "Avenger Assembled",
      minecraft: "Diamond Warrior",
      standard: "Grammar Champion",
    },
  },
  {
    level: 4,
    title: "Spelling Master",
    minXp: 2000,
    maxXp: 3500,
    themeTitles: {
      starwars: "Jedi Master",
      marvel: "Earth's Mightiest Hero",
      minecraft: "Netherite Champion",
      standard: "NAPLAN Ace",
    },
  },
  {
    level: 5,
    title: "Legendary Grandmaster",
    minXp: 3500,
    maxXp: 99999,
    themeTitles: {
      starwars: "Grandmaster Arjun",
      marvel: "Infinity Master Arjun",
      minecraft: "End Realm Overlord Arjun",
      standard: "Spelling Genius Arjun",
    },
  },
];

export function getRankForXp(xp: number, theme: GameTheme = "standard"): { rank: PlayerRank; title: string; progressPercent: number } {
  for (let i = 0; i < PLAYER_RANKS.length; i++) {
    const r = PLAYER_RANKS[i];
    if (xp >= r.minXp && (i === PLAYER_RANKS.length - 1 || xp < r.maxXp)) {
      const range = r.maxXp - r.minXp;
      const progressPercent = Math.min(100, Math.round(((xp - r.minXp) / range) * 100));
      return {
        rank: r,
        title: r.themeTitles[theme] || r.title,
        progressPercent,
      };
    }
  }
  const top = PLAYER_RANKS[PLAYER_RANKS.length - 1];
  return { rank: top, title: top.themeTitles[theme] || top.title, progressPercent: 100 };
}

export function getThemeDetails(theme: GameTheme) {
  switch (theme) {
    case "starwars":
      return {
        name: "Star Wars: Galactic Realm",
        shortName: "Star Wars",
        tagline: "Wield the Force with spelling power!",
        icon: "🌌",
        colorClass: "from-slate-900 via-indigo-950 to-blue-900",
        badgeBg: "bg-blue-950/80 text-cyan-300 border-cyan-500/40",
        accentColor: "#38bdf8",
      };
    case "marvel":
      return {
        name: "Marvel: Avengers Gauntlet",
        shortName: "Marvel",
        tagline: "Assemble your superhero spelling might!",
        icon: "⚡",
        colorClass: "from-red-950 via-amber-950 to-slate-950",
        badgeBg: "bg-red-950/80 text-amber-300 border-amber-500/40",
        accentColor: "#fbbf24",
      };
    case "minecraft":
      return {
        name: "Minecraft: Overworld & Nether",
        shortName: "Minecraft",
        tagline: "Craft diamond-tier spelling mastery!",
        icon: "⛏️",
        colorClass: "from-emerald-950 via-zinc-950 to-stone-900",
        badgeBg: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
        accentColor: "#34d399",
      };
    default:
      return {
        name: "Standard School Edition",
        shortName: "Classic",
        tagline: "Official Australian NAPLAN practice",
        icon: "📚",
        colorClass: "from-indigo-900 via-slate-900 to-violet-900",
        badgeBg: "bg-indigo-950/80 text-indigo-300 border-indigo-500/40",
        accentColor: "#6366f1",
      };
  }
}
