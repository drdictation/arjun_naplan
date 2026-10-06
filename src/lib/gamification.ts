export type GameTheme = "starwars" | "marvel" | "minecraft" | "standard";

export interface BossDefinition {
  id: string;
  theme: "starwars" | "marvel" | "minecraft";
  name: string;
  title: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  hp: number; // number of correct words to defeat
  avatarEmoji: string;
  colorScheme: {
    primary: string;
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
  rewardPoints: number;
  wordCategoryPreference?: string;
}

export interface BadgeDefinition {
  id: string;
  theme: GameTheme;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
}

export interface PerkDefinition {
  id: string;
  name: string;
  realm: GameTheme;
  description: string;
  icon: string;
  category: "defense" | "speed" | "intel" | "damage" | "loot";
  costPoints: number;
  bonusEffect: string;
}

export interface CollectibleGoodie {
  id: string;
  name: string;
  realm: GameTheme;
  type: "weapon" | "armor" | "artifact" | "power";
  icon: string;
  description: string;
  unlockedAtXp: number;
}

export interface SpeedBonusResult {
  tier: "lightning" | "swift" | "steady" | "standard";
  label: string;
  bonusPoints: number;
  bonusXp: number;
  multiplier: number;
  emoji: string;
}

export interface GamificationState {
  theme: GameTheme;
  xp: number;
  points: number; // Spendable Perk Points
  level: number;
  bossesDefeated: Record<string, number>;
  unlockedBadges: string[];
  equippedTitle?: string;
  unlockedPerks: string[];
  activePerks: string[];
  equippedGear: {
    weapon?: string;
    artifact?: string;
  };
  speedRecords: {
    fastestAnswerSeconds: number;
    fastestWord?: string;
    totalSpeedStrikes: number;
  };
}

export const INITIAL_GAMIFICATION_STATE: GamificationState = {
  theme: "starwars",
  xp: 150,
  points: 250,
  level: 1,
  bossesDefeated: {},
  unlockedBadges: ["recruit_badge"],
  equippedTitle: "Youngling Padawan",
  unlockedPerks: ["shield_boost"],
  activePerks: ["shield_boost"],
  equippedGear: {
    weapon: "blue_lightsaber",
    artifact: "kyber_crystal",
  },
  speedRecords: {
    fastestAnswerSeconds: 99,
    totalSpeedStrikes: 0,
  },
};

// ==========================================
// 18 BOSS ROSTER (6 per realm)
// ==========================================
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
    rewardPoints: 100,
  },
  {
    id: "sw-boba",
    theme: "starwars",
    name: "Boba Fett",
    title: "Mandalorian Bounty Hunter",
    level: 2,
    hp: 5,
    avatarEmoji: "🚀",
    colorScheme: {
      primary: "from-emerald-950 via-zinc-900 to-black",
      bgGradient: "from-emerald-950 via-slate-950 to-black",
      accent: "text-emerald-400",
      border: "border-emerald-500/40",
      hpBar: "bg-emerald-600",
    },
    introTaunt: "As you wish. You're worth a fortune, but your spelling won't save you from my jetpack missile!",
    hitReaction: [
      "Beskar shield dented! Your vowels struck my thruster!",
      "Rocket deflected by clean spelling!",
      "Flame-thrower extinguished by perfect syllables!",
    ],
    defeatQuote: "My jetpack is malfunctioning! The Mandalorian code respects a worthy speller...",
    playerAttackName: "Blaster Deflection Strike",
    playerAttackIcon: "💥",
    rewardBadgeId: "sw_boba_hunter",
    rewardBadgeName: "Mandalorian Bounty Hunter Crest",
    rewardBadgeIcon: "🚀",
    rewardXp: 450,
    rewardPoints: 150,
  },
  {
    id: "sw-grievous",
    theme: "starwars",
    name: "General Grievous",
    title: "Supreme Droid Commander",
    level: 3,
    hp: 5,
    avatarEmoji: "🦾",
    colorScheme: {
      primary: "from-zinc-800 via-stone-900 to-black",
      bgGradient: "from-stone-950 via-zinc-900 to-black",
      accent: "text-cyan-400",
      border: "border-cyan-500/40",
      hpBar: "bg-cyan-500",
    },
    introTaunt: "Your spelling will make a fine addition to my collection! *Coughs violently*",
    hitReaction: [
      "One of my 4 lightsabers was knocked away!",
      "D-droid chassis cracked by your double consonant attack!",
      "Cough... impossible! You were trained in the Jedi arts!",
    ],
    defeatQuote: "Time to abandon ship! You truly are a bold one, Arjun!",
    playerAttackName: "Quad-Saber Clash",
    playerAttackIcon: "⚔️",
    rewardBadgeId: "sw_grievous_sabers",
    rewardBadgeName: "Four-Blade Collection",
    rewardBadgeIcon: "🦾",
    rewardXp: 600,
    rewardPoints: 200,
  },
  {
    id: "sw-kylo",
    theme: "starwars",
    name: "Kylo Ren",
    title: "Master of the Knights of Ren",
    level: 4,
    hp: 6,
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
    rewardXp: 750,
    rewardPoints: 250,
  },
  {
    id: "sw-vader",
    theme: "starwars",
    name: "Lord Darth Vader",
    title: "Dark Lord of the Sith",
    level: 5,
    hp: 7,
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
    rewardPoints: 350,
  },
  {
    id: "sw-palpatine",
    theme: "starwars",
    name: "Emperor Palpatine",
    title: "Galactic Sith Overlord",
    level: 6,
    hp: 8,
    avatarEmoji: "⚡",
    colorScheme: {
      primary: "from-purple-950 via-black to-red-950",
      bgGradient: "from-black via-purple-950 to-zinc-950",
      accent: "text-purple-400",
      border: "border-purple-500/70",
      hpBar: "bg-gradient-to-r from-purple-500 via-red-600 to-amber-400",
    },
    introTaunt: "UNLIMITED POWER! Everything has transpired according to my design... Spell now or be electrocuted!",
    hitReaction: [
      "Lightning redirected! The Light Side spelling is too pure!",
      "My throne room shields are crumbling!",
      "Gaaah! No! The spelling prophecy is true!",
    ],
    defeatQuote: "Defeated by a Year 3 Jedi! The Empire has fallen... The Galaxy is saved forever!",
    playerAttackName: "Cosmic Force Retaliation",
    playerAttackIcon: "⚡",
    rewardBadgeId: "sw_emperor_slayer",
    rewardBadgeName: "Galaxy Savior Crest",
    rewardBadgeIcon: "👑",
    rewardXp: 1500,
    rewardPoints: 500,
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
    rewardPoints: 100,
  },
  {
    id: "marvel-goblin",
    theme: "marvel",
    name: "Green Goblin",
    title: "Glider & Pumpkin Bomb Nemesis",
    level: 2,
    hp: 5,
    avatarEmoji: "🎃",
    colorScheme: {
      primary: "from-green-950 via-purple-950 to-zinc-950",
      bgGradient: "from-zinc-950 via-green-950 to-purple-950",
      accent: "text-green-400",
      border: "border-green-500/40",
      hpBar: "bg-green-500",
    },
    introTaunt: "Can Spider-Man come out to spell?! Hahahahaha! Dodge my pumpkin bombs if you can!",
    hitReaction: [
      "Web-shot jammed my glider throttle!",
      "A pumpkin bomb detonated in mid-air from that spelling blast!",
      "Curse your spidey-sense for finding the silent letters!",
    ],
    defeatQuote: "Godspeed, Spidey Arjun... The Goblin glider is grounded!",
    playerAttackName: "Spider Web-Shooter Barrage",
    playerAttackIcon: "🕸️",
    rewardBadgeId: "marvel_goblin_tamer",
    rewardBadgeName: "Spider-Sense Medallion",
    rewardBadgeIcon: "🕷️",
    rewardXp: 450,
    rewardPoints: 150,
  },
  {
    id: "marvel-loki",
    theme: "marvel",
    name: "Loki, God of Mischief",
    title: "Master of Illusions & The Tesseract",
    level: 3,
    hp: 5,
    avatarEmoji: "🎭",
    colorScheme: {
      primary: "from-emerald-950 via-yellow-950 to-black",
      bgGradient: "from-black via-emerald-950 to-yellow-950",
      accent: "text-amber-400",
      border: "border-emerald-500/50",
      hpBar: "bg-gradient-to-r from-emerald-500 to-amber-400",
    },
    introTaunt: "I am burdened with glorious purpose! You puny mortal cannot see through my holographic words!",
    hitReaction: [
      "How did you know which was the real spelling illusion?!",
      "Scepter blast redirected by sheer vocabulary strength!",
      "I am a god, you dull creature... ouch, that hurt!",
    ],
    defeatQuote: "Enough! Your grammar is indisputable... I yield to the Earth's mightiest speller!",
    playerAttackName: "Hulk Smash & Shield Toss",
    playerAttackIcon: "💥",
    rewardBadgeId: "marvel_loki_scepter",
    rewardBadgeName: "Tesseract Keeper",
    rewardBadgeIcon: "💠",
    rewardXp: 600,
    rewardPoints: 200,
  },
  {
    id: "marvel-ultron",
    theme: "marvel",
    name: "Ultron Prime",
    title: "Sentient Vibranium AI",
    level: 4,
    hp: 6,
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
    rewardXp: 750,
    rewardPoints: 250,
  },
  {
    id: "marvel-thanos",
    theme: "marvel",
    name: "Titan Thanos",
    title: "Wielder of the Infinity Gauntlet",
    level: 5,
    hp: 7,
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
    rewardPoints: 350,
  },
  {
    id: "marvel-galactus",
    theme: "marvel",
    name: "Galactus, World Eater",
    title: "Cosmic Entity of the Multiverse",
    level: 6,
    hp: 8,
    avatarEmoji: "🪐",
    colorScheme: {
      primary: "from-fuchsia-950 via-violet-950 to-black",
      bgGradient: "from-black via-fuchsia-950 to-indigo-950",
      accent: "text-fuchsia-400",
      border: "border-fuchsia-500/60",
      hpBar: "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-500",
    },
    introTaunt: "I hunger for whole galaxies! No puny mortal alphabet can satiate the Cosmic Devourer!",
    hitReaction: [
      "Cosmic hunger suppressed by radiant correct vowels!",
      "The Silver Surfer breaks free from my command!",
      "Galactic armor fractured by pure Year 3 literacy power!",
    ],
    defeatQuote: "The Earth is spared! You are crowned the Supreme Protector of the Multiverse!",
    playerAttackName: "Cosmic Avengers Assembled Smash",
    playerAttackIcon: "🌌",
    rewardBadgeId: "marvel_multiverse_protector",
    rewardBadgeName: "Multiverse Defender Trophy",
    rewardBadgeIcon: "🪐",
    rewardXp: 1500,
    rewardPoints: 500,
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
    rewardPoints: 100,
  },
  {
    id: "mc-phantom",
    theme: "minecraft",
    name: "Phantom Swarm & Skeleton Horse",
    title: "Night Sky Mob Predators",
    level: 2,
    hp: 5,
    avatarEmoji: "🦇",
    colorScheme: {
      primary: "from-sky-950 via-slate-900 to-black",
      bgGradient: "from-black via-slate-950 to-sky-950",
      accent: "text-sky-400",
      border: "border-sky-500/40",
      hpBar: "bg-sky-500",
    },
    introTaunt: "*Screeeech!* You haven't slept in 3 days! The night sky belongs to the phantom swarm!",
    hitReaction: [
      "Crossbow with Fireworks fired straight into the swarm!",
      "Phantom membrane collected! One less predator in the sky!",
      "Enchanted shield blocked the diving swoop!",
    ],
    defeatQuote: "*Poof!* The phantoms burn in the morning sunrise! Daybreak is here!",
    playerAttackName: "Firework Crossbow Snipeshot",
    playerAttackIcon: "🏹",
    rewardBadgeId: "mc_phantom_hunter",
    rewardBadgeName: "Night Sky Conqueror",
    rewardBadgeIcon: "🪽",
    rewardXp: 450,
    rewardPoints: 150,
  },
  {
    id: "mc-warden",
    theme: "minecraft",
    name: "The Deep Dark Warden",
    title: "Blind Guardian of the Ancient City",
    level: 3,
    hp: 5,
    avatarEmoji: "👹",
    colorScheme: {
      primary: "from-teal-950 via-zinc-950 to-black",
      bgGradient: "from-black via-teal-950 to-slate-950",
      accent: "text-teal-400",
      border: "border-teal-500/50",
      hpBar: "bg-teal-500",
    },
    introTaunt: "*Heartbeat thumping: THUMP-THUMP* The sculk shrieker activated! Roaaar! Sonic boom incoming!",
    hitReaction: [
      "Sneak attack successful! Wool blocks muffled your approach!",
      "Sonic boom absorbed by enchanted Netherite armor!",
      "Soul fire torch illuminated the dark cavern!",
    ],
    defeatQuote: "*Grumble* The Warden sinks back into the sculk bedrock! Ancient City looted!",
    playerAttackName: "Netherite Axe Smash",
    playerAttackIcon: "🪓",
    rewardBadgeId: "mc_warden_horn",
    rewardBadgeName: "Sculk Catalyst Trophy",
    rewardBadgeIcon: "💠",
    rewardXp: 600,
    rewardPoints: 200,
  },
  {
    id: "mc-wither",
    theme: "minecraft",
    name: "The Three-Headed Wither",
    title: "Nether Netherite Destroyer",
    level: 4,
    hp: 6,
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
    rewardXp: 750,
    rewardPoints: 250,
  },
  {
    id: "mc-ender-dragon",
    theme: "minecraft",
    name: "The Ender Dragon",
    title: "Ruler of The End Dimension",
    level: 5,
    hp: 7,
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
    rewardPoints: 350,
  },
  {
    id: "mc-herobrine",
    theme: "minecraft",
    name: "Herobrine & The Redstone Titan",
    title: "Mythical Legend of the Minecraft Fog",
    level: 6,
    hp: 8,
    avatarEmoji: "👁️",
    colorScheme: {
      primary: "from-red-950 via-stone-950 to-black",
      bgGradient: "from-black via-red-950 to-stone-900",
      accent: "text-red-400",
      border: "border-red-500/60",
      hpBar: "bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400",
    },
    introTaunt: "You built your world out of blocks, but can you spell when the fog clears?! *White eyes glowing*",
    hitReaction: [
      "Lightning strike absorbed by Redstone Conduit!",
      "The haunted fog parts as correct letters form a beacon!",
      "Critical Netherite Cleave! Herobrine loses his glitch powers!",
    ],
    defeatQuote: "The myth is broken! Arjun has defeated the legendary Herobrine of Minecraft lore!",
    playerAttackName: "Enchanted Beacon Supercharge",
    playerAttackIcon: "✨",
    rewardBadgeId: "mc_herobrine_legend",
    rewardBadgeName: "Minecraft Mythic Master",
    rewardBadgeIcon: "👑",
    rewardXp: 1500,
    rewardPoints: 500,
  },
];

// ==========================================
// 8 BATTLE PERKS & SKILLS
// ==========================================
export const PERKS_CATALOG: PerkDefinition[] = [
  {
    id: "shield_boost",
    name: "Extra Armor Plating",
    realm: "standard",
    description: "Start every boss fight with +1 extra Shield (4 Hearts total!)",
    icon: "🛡️",
    category: "defense",
    costPoints: 150,
    bonusEffect: "+1 Heart in Boss Battles",
  },
  {
    id: "speed_spark",
    name: "Hyper Speed Booster",
    realm: "standard",
    description: "Double your speed bonus points whenever you spell in under 6 seconds!",
    icon: "⚡",
    category: "speed",
    costPoints: 200,
    bonusEffect: "2x Speed Points on fast answers",
  },
  {
    id: "holocron_vision",
    name: "Jedi Holocron / Jarvis HUD",
    realm: "starwars",
    description: "Free phonics hint always revealed without clicking the hint button!",
    icon: "🔮",
    category: "intel",
    costPoints: 250,
    bonusEffect: "Auto-reveals first letter & letter count",
  },
  {
    id: "critical_rocket",
    name: "Stark Missile / TNT Blast",
    realm: "marvel",
    description: "Your very first correct answer against a boss deals DOUBLE (2x) damage!",
    icon: "💣",
    category: "damage",
    costPoints: 300,
    bonusEffect: "First hit deals 2 HP damage",
  },
  {
    id: "totem_undying",
    name: "Totem of Undying",
    realm: "minecraft",
    description: "If you make a spelling error, the Totem revives your heart once per battle!",
    icon: "🗿",
    category: "defense",
    costPoints: 350,
    bonusEffect: "Negates 1 mistake per battle",
  },
  {
    id: "xp_magnet",
    name: "Infinity XP Magnet",
    realm: "marvel",
    description: "Earn 25% extra XP across every single word you spell correctly!",
    icon: "🧲",
    category: "loot",
    costPoints: 400,
    bonusEffect: "+25% XP on all correct answers",
  },
  {
    id: "combo_fire",
    name: "Blaster Overcharge",
    realm: "starwars",
    description: "3 correct answers in a row trigger 3x bonus points and celebratory sparks!",
    icon: "🔥",
    category: "damage",
    costPoints: 350,
    bonusEffect: "Streak combos award 3x points",
  },
  {
    id: "nether_beacon",
    name: "Nether Star Beacon",
    realm: "minecraft",
    description: "Awards 50 extra Perk Points every time you complete a 10-word round!",
    icon: "⭐",
    category: "loot",
    costPoints: 450,
    bonusEffect: "+50 Perk Points per round",
  },
];

// ==========================================
// 18 COLLECTIBLE ARMORY GOODIES
// ==========================================
export const GOODIES_CATALOG: CollectibleGoodie[] = [
  // Star Wars
  { id: "blue_lightsaber", name: "Anakin's Blue Lightsaber", realm: "starwars", type: "weapon", icon: "🗡️", description: "The classic Jedi weapon of peace and truth.", unlockedAtXp: 100 },
  { id: "green_lightsaber", name: "Luke's Green Lightsaber", realm: "starwars", type: "weapon", icon: "⚡", description: "Crafted on Tatooine with a purified green Kyber crystal.", unlockedAtXp: 400 },
  { id: "purple_lightsaber", name: "Mace Windu's Purple Saber", realm: "starwars", type: "weapon", icon: "💜", description: "Rare amethyst blade channeled with Vaapad combat form.", unlockedAtXp: 800 },
  { id: "darksaber", name: "The Mandalorian Darksaber", realm: "starwars", type: "weapon", icon: "⚔️", description: "Ancient black-energy blade belonging to the ruler of Mandalore.", unlockedAtXp: 1400 },
  { id: "kyber_crystal", name: "Pure Kyber Crystal", realm: "starwars", type: "artifact", icon: "💎", description: "Attuned to the Force; resonates when words are spelled right.", unlockedAtXp: 200 },
  { id: "mando_jetpack", name: "Beskar Jetpack", realm: "starwars", type: "armor", icon: "🚀", description: "Enables aerial dodging and rapid speed strikes.", unlockedAtXp: 1000 },

  // Marvel
  { id: "arc_reactor", name: "Stark Arc Reactor", realm: "marvel", type: "artifact", icon: "⚛️", description: "Clean fusion energy powering repulsor spelling blasts.", unlockedAtXp: 100 },
  { id: "cap_shield", name: "Vibranium Shield", realm: "marvel", type: "armor", icon: "🛡️", description: "Absorbs all spelling kinetic vibrations. When Cap throws it, it returns!", unlockedAtXp: 400 },
  { id: "mjolnir", name: "Mjolnir Thunder Hammer", realm: "marvel", type: "weapon", icon: "🔨", description: "Whosoever holds this hammer, if he be worthy, shall possess the power of Thor.", unlockedAtXp: 800 },
  { id: "web_shooters", name: "Spider Web-Shooters", realm: "marvel", type: "weapon", icon: "🕸️", description: "Rapid-fire web fluid that traps misspelled words in place.", unlockedAtXp: 600 },
  { id: "nano_gauntlet", name: "Stark Nano Gauntlet", realm: "marvel", type: "power", icon: "🧤", description: "Holds all 6 Spelling Stones: Phonics, Syllables, Vowels, Prefixes, Suffixes, & Rules.", unlockedAtXp: 1500 },
  { id: "eye_agamotto", name: "Eye of Agamotto", realm: "marvel", type: "artifact", icon: "👁️", description: "Time Stone amulet allowing Arjun to bend spelling time.", unlockedAtXp: 1100 },

  // Minecraft
  { id: "diamond_sword", name: "Enchanted Diamond Sword", realm: "minecraft", type: "weapon", icon: "🗡️", description: "Sharpness IV and Unbreaking III for slicing through tough words.", unlockedAtXp: 100 },
  { id: "netherite_blade", name: "Netherite Cleaver", realm: "minecraft", type: "weapon", icon: "⚔️", description: "Fireproof alloy forged in the depths of the Nether.", unlockedAtXp: 800 },
  { id: "flame_bow", name: "Enchanted Bow of Flame", realm: "minecraft", type: "weapon", icon: "🏹", description: "Shoots blazing arrows with Infinity enchantment.", unlockedAtXp: 500 },
  { id: "totem_item", name: "Golden Totem of Undying", realm: "minecraft", type: "artifact", icon: "🗿", description: "Grants second chances when held in the offhand.", unlockedAtXp: 900 },
  { id: "elytra_wings", name: "Dragon Elytra Wings", realm: "minecraft", type: "armor", icon: "🪽", description: "Glide across the skies using firework rocket boosts.", unlockedAtXp: 1200 },
  { id: "golden_apple", name: "Enchanted Golden Apple (Notch)", realm: "minecraft", type: "power", icon: "🍏", description: "Grants Regeneration V and Resistance to spelling fatigue.", unlockedAtXp: 300 },
];

// ==========================================
// SPEED SCORING CALCULATION
// ==========================================
export function calculateSpeedBonus(seconds: number, hasSpeedPerk: boolean = false): SpeedBonusResult {
  const multiplier = hasSpeedPerk ? 2 : 1;

  if (seconds <= 5.5) {
    return {
      tier: "lightning",
      label: "⚡ LIGHTNING SPEED STRIKE!",
      bonusPoints: 100 * multiplier,
      bonusXp: 50 * multiplier,
      multiplier: 2.0,
      emoji: "⚡",
    };
  } else if (seconds <= 10) {
    return {
      tier: "swift",
      label: "🚀 SWIFT ATTACK!",
      bonusPoints: 60 * multiplier,
      bonusXp: 30 * multiplier,
      multiplier: 1.5,
      emoji: "🚀",
    };
  } else if (seconds <= 18) {
    return {
      tier: "steady",
      label: "🎯 STEADY HIT!",
      bonusPoints: 30 * multiplier,
      bonusXp: 15 * multiplier,
      multiplier: 1.0,
      emoji: "🎯",
    };
  } else {
    return {
      tier: "standard",
      label: "🌟 SPELLING HIT!",
      bonusPoints: 15,
      bonusXp: 10,
      multiplier: 1.0,
      emoji: "🌟",
    };
  }
}

// ==========================================
// BADGES
// ==========================================
export const BADGES_CATALOG: BadgeDefinition[] = [
  { id: "recruit_badge", theme: "standard", title: "Spelling Recruit", description: "Started the Year 3 NAPLAN Spelling Journey!", icon: "🎒", rarity: "common" },
  { id: "sw_rebel_hero", theme: "starwars", title: "Rebel Vanguard", description: "Defeated the Stormtrooper Commander in a galactic spelling duel.", icon: "🎖️", rarity: "common" },
  { id: "sw_boba_hunter", theme: "starwars", title: "Bounty Hunter Defuser", description: "Out-smarted Boba Fett and grounded his jetpack rocket.", icon: "🚀", rarity: "rare" },
  { id: "sw_grievous_sabers", theme: "starwars", title: "General's Collector", description: "Disarmed General Grievous's four spinning lightsabers.", icon: "🦾", rarity: "rare" },
  { id: "sw_jedi_knight", theme: "starwars", title: "Jedi Knight", description: "Out-spelled Kylo Ren and mastered the dual crossguard combat.", icon: "🗡️", rarity: "rare" },
  { id: "sw_jedi_master", theme: "starwars", title: "Jedi Grandmaster", description: "Conquered Lord Darth Vader and restored balance to the Galaxy!", icon: "💎", rarity: "legendary" },
  { id: "sw_emperor_slayer", theme: "starwars", title: "Galaxy Savior", description: "Overcame Emperor Palpatine's Sith lightning and saved the Galaxy!", icon: "👑", rarity: "mythic" },

  { id: "marvel_avenger_cadet", theme: "marvel", title: "Avenger Cadet", description: "Repelled the Chitauri invasion with quick-fire spelling.", icon: "🛡️", rarity: "common" },
  { id: "marvel_goblin_tamer", theme: "marvel", title: "Spider-Sense Medallion", description: "Avoided the Green Goblin's pumpkin bombs with sharp spelling.", icon: "🕷️", rarity: "rare" },
  { id: "marvel_loki_scepter", theme: "marvel", title: "Tesseract Keeper", description: "Saw through Loki's trickster illusions and reclaimed the scepter.", icon: "💠", rarity: "rare" },
  { id: "marvel_thor_hammer", theme: "marvel", title: "Worthy of Mjolnir", description: "Shattered Ultron Prime with thunderous phonics power.", icon: "🔨", rarity: "rare" },
  { id: "marvel_infinity_champion", theme: "marvel", title: "Infinity Champion", description: "Defeated Titan Thanos and collected all six Spelling Stones!", icon: "✨", rarity: "legendary" },
  { id: "marvel_multiverse_protector", theme: "marvel", title: "Multiverse Defender", description: "Defeated Galactus and saved entire galaxies from being devoured!", icon: "🪐", rarity: "mythic" },

  { id: "mc_creeper_defuser", theme: "minecraft", title: "Creeper Defuser", description: "Disarmed a charged creeper before the fuse reached zero.", icon: "🟩", rarity: "common" },
  { id: "mc_phantom_hunter", theme: "minecraft", title: "Night Sky Conqueror", description: "Cleared the nighttime skies of phantoms and skeleton horsemen.", icon: "🪽", rarity: "rare" },
  { id: "mc_warden_horn", theme: "minecraft", title: "Sculk Catalyst Trophy", description: "Overcame the Warden in the deepest Ancient City caves.", icon: "💠", rarity: "rare" },
  { id: "mc_nether_star", theme: "minecraft", title: "Nether Star Beacon", description: "Constructed the ultimate beacon after overcoming the Wither.", icon: "⭐", rarity: "rare" },
  { id: "mc_dragon_slayer", theme: "minecraft", title: "Ender Dragon Slayer", description: "Conquered The End dimension and hatched the legendary Dragon Egg!", icon: "🥚", rarity: "legendary" },
  { id: "mc_herobrine_legend", theme: "minecraft", title: "Minecraft Mythic Master", description: "Defeated the legendary Herobrine in the mythical redstone fog!", icon: "👑", rarity: "mythic" },

  { id: "speed_demon", theme: "standard", title: "Lightning Speller", description: "Spelled a tricky word in under 5 seconds!", icon: "⚡", rarity: "rare" },
  { id: "streak_3", theme: "standard", title: "3-Day Fire Streak", description: "Practiced 3 days in a row!", icon: "🔥", rarity: "common" },
  { id: "streak_7", theme: "standard", title: "Week-Long Hero", description: "Practiced 7 days in a row!", icon: "👑", rarity: "epic" },
  { id: "master_25", theme: "standard", title: "Silver Scholar", description: "Mastered 25 NAPLAN words!", icon: "🥈", rarity: "rare" },
  { id: "master_50", theme: "standard", title: "Gold Wordsmith", description: "Mastered 50 NAPLAN words!", icon: "🥇", rarity: "legendary" },
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
    title: "Legendary Champion",
    minXp: 3500,
    maxXp: 5500,
    themeTitles: {
      starwars: "Jedi Council Member Arjun",
      marvel: "Cosmic Avenger Arjun",
      minecraft: "End Realm Conqueror Arjun",
      standard: "Spelling Prodigy Arjun",
    },
  },
  {
    level: 6,
    title: "Supreme Grandmaster",
    minXp: 5500,
    maxXp: 99999,
    themeTitles: {
      starwars: "Grandmaster Arjun of the Jedi Order",
      marvel: "Infinity Master Arjun of the Multiverse",
      minecraft: "Mythic Overlord Arjun of Minecraft",
      standard: "National NAPLAN Grandmaster Arjun",
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
