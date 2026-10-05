# Arjun's NAPLAN Year 3 Spelling Master 🌟

A local-first Progressive Web App (PWA) built with **Next.js**, **Tailwind CSS**, and **TypeScript**, designed for **iPad** practice and deployed to **Vercel**.

---

## 🚀 Features

1. **Curated 146 Year 3 NAPLAN Spelling Words**:
   - Covers all Australian Curriculum Year 3 phonics conventions:
     - High-Frequency Tricky Words (*because, friend, people, beautiful, caught, bought, thought*)
     - Silent Letters (*knight, knee, wrist, wrong, climb, island, whistle, autumn, gnome*)
     - Tricky Vowels & Digraphs (*straight, weight, neighbour, piece, believe, receive, ceiling, juice, guide*)
     - Double Consonants (*happen, rabbit, dinner, summer, difficult, disappear, address*)
     - Suffixes & Endings (*happiness, careful, hoping, hopping, safely, easily, action, station*)
     - Prefixes & Plurals (*disagree, rewrite, babies, leaves, wolves, knives, children, mice*)
     - Year 3 Homophones (*their/there/they're, weather/whether, through/threw, whole/hole, peace/piece*)
     - Australian Animals & Everyday (*kangaroo, koala, platypus, echidna, wombat, dolphin, cockatoo*)

2. **Dual Assessment Modes**:
   - **Audio Dictation Mode ("Listen & Spell")**: The iPad reads out the word and context sentence using Australian English speech synthesis (`en-AU`). Arjun types the spelling, with optional slow-speed and phonics hints.
   - **NAPLAN Proofreading Mode ("Find & Fix")**: Replicates official ACARA NAPLAN online test questions where Arjun spots the misspelled word in a sentence and provides the correct spelling.

3. **SM-2 Spaced Repetition System (SRS)**:
   - Words Arjun gets right graduate into increasing intervals (1 day $\to$ 3 days $\to$ 6 days $\to$ 14 days $\to$ Mastered).
   - Words Arjun misses are repeated within the session and scheduled for review the following day.
   - Smart daily 10-word queues combine due reviews, tricky words, and new introductions.

4. **Local-First PWA (Zero Downtime on iPad)**:
   - Operates 100% locally on the iPad using `localStorage` — works seamlessly with or without internet.
   - **Laptop Sync & Backup**: The Parent Dashboard features **Export to Laptop** (downloads a timestamped JSON backup) and **Import Backup** so you can easily archive, inspect, and sync progress between Arjun's iPad and your laptop.

5. **Gamification & Kid-Friendly iPad UI**:
   - Daily streak tracking 🔥
   - Star rewards & confetti animations 🎉
   - Web Audio synthesized chimes (no external assets required)
   - Large touch targets (minimum 48px) and auto-zoom disabled for iPad Safari.

---

## 📱 iPad Setup ("Add to Home Screen")

1. Open Safari on Arjun's iPad and navigate to your deployed Vercel URL.
2. Tap the **Share** button (box with an arrow pointing up).
3. Scroll down and tap **"Add to Home Screen"**.
4. The app icon will appear on the iPad home screen and open full-screen just like a native app.

---

## 💻 Deploying to Vercel

### Option 1: Vercel CLI (Fastest)
From this project directory, run:
```bash
npx vercel
```
Follow the quick prompts to link and deploy.

### Option 2: GitHub + Vercel
1. Create a repository on GitHub.
2. Push this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Arjun NAPLAN Spelling App"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
3. Import the repo in [vercel.com](https://vercel.com). Deploy takes under 60 seconds.
