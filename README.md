# Arjun's NAPLAN Year 3 Spelling Master 🌟

A local-first Progressive Web App (PWA) built with **Next.js 14**, **Tailwind CSS**, and **TypeScript** for Australian Year 3 NAPLAN spelling preparation on iPad.

---

## 🎯 Architecture at a Glance

```
src/
├── app/
│   ├── page.tsx               # Main game loop, session controller, tab routing
│   ├── layout.tsx             # Root viewport, PWA meta tags
│   ├── manifest.ts            # PWA Web App Manifest
│   └── globals.css            # Tailwind directives, animations
├── components/
│   ├── Header.tsx             # Top bar: theme picker, level, streak, sound, armory toggle
│   ├── AudioDictationCard.tsx # "Listen & Spell" mode with audio synthesis & hints
│   ├── ProofreadingCard.tsx   # "Find & Fix" mode (ACARA NAPLAN test format)
│   ├── BossBattleCard.tsx     # Boss fight combat arena with HP bars and attacks
│   ├── BossVictorySummary.tsx # Victory screen: badge unlock, XP/loot awards
│   ├── HeroArmory.tsx         # Shop & loadout: titles, perks, collectible gear
│   ├── SessionSummary.tsx     # 10-word daily practice review & stats recap
│   └── ParentDashboard.tsx    # Analytics, mastery breakdown, JSON export/import
├── data/
│   └── words.ts               # 146 ACARA Year 3 words with audio sentences & distractors
└── lib/
    ├── srs.ts                 # Modified SM-2 spaced repetition queue engine
    ├── gamification.ts        # Themes, bosses, badges, perks, armory items, ranks
    ├── speech.ts              # Web Speech API wrapper (en-AU preferred, pitch/rate controls)
    └── storage.ts             # localStorage persistence, auto-backup, Web Audio sound effects
```

---

## 🔑 Core Systems

### 1. Assessment Modes
- **Audio Dictation (`AudioDictationCard.tsx`)**: Reads word and context sentence via Web Speech (`en-AU`). Features slow playback, letter hints, and instant phonics feedback.
- **Proofreading (`ProofreadingCard.tsx`)**: Replicates official ACARA NAPLAN online interface. Displays sentence with 1 intentional misspelling; student spots error and types correct spelling.
- **Boss Battles (`BossBattleCard.tsx`)**: Multi-round battle where correct answers deal damage to bosses. Dynamic HP bar, combat taunts, and defeat cinematics.

### 2. Spaced Repetition Engine (`src/lib/srs.ts`)
- Modified **SM-2 algorithm** tracking `interval`, `repetitions`, `easeFactor`, and `mistakeCount` per word.
- **Graduation curve**: 1 day $\to$ 3 days $\to$ 6 days $\to$ 14 days $\to$ Mastered.
- Daily sessions assemble 10-word queues balanced across:
  - Overdue review words (`dueReviews`)
  - Problem words with mistakes (`problemWords`)
  - New unlearned words (`newWords`)
- Missed words in current session loop back for intra-session reinforcement.

### 3. Gamification Engine (`src/lib/gamification.ts`)
- **4 Themes**: Star Wars, Marvel, Minecraft, Standard.
- **Bosses**: 6 themed bosses per realm (e.g., Stormtrooper Commander, Darth Vader, Green Goblin, Thanos, Ender Dragon, Warden).
- **Hero Armory**:
  - Spendable Perk Points earned from correct answers and speed bonuses.
  - Perks across defense (shield mistakes), speed (extra time), intel (reveal clues), and loot.
  - Collectible weapons, armor, artifacts, and power items unlocked by XP rank.
  - Titles equipable by player.
- **Speed Bonuses**: Lightning (<3s), Swift (<6s), Steady (<10s).

### 4. Storage & Offline Resilience (`src/lib/storage.ts`)
- Primary key: `arjun_naplan_spelling_v1` in `localStorage`.
- Automatic redundancy: mirrors state to `arjun_naplan_spelling_backup_auto`.
- Web Audio API synthesizer for sound effects (success chime, error buzz, boss hit, victory fanfare) — zero external audio assets required.
- **Parent Dashboard**: Full JSON export and import for seamless sync between iPad and desktop.

### 5. Curriculum Content (`src/data/words.ts`)
146 curated Year 3 Australian Curriculum words across 8 phonics categories:
1. High-Frequency Tricky Words
2. Silent Letters
3. Tricky Vowels & Digraphs
4. Double Consonants
5. Suffixes & Endings
6. Prefixes & Plurals
7. Year 3 Homophones
8. Australian Animals & Everyday Terms

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# Open http://localhost:3000

# Build production bundle
npm run build
```

---

## 📱 iPad Setup & Deployment

1. **Deploy to Vercel**:
   ```bash
   npx vercel
   ```
2. **Add to Home Screen (iPad Safari)**:
   - Visit deployed URL in Safari.
   - Tap Share $\to$ **Add to Home Screen**.
   - Runs full-screen standalone PWA with touch-friendly 48px+ targets.
