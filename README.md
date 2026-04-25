# Focus Tax

> **Pay attention before you spend it.**

Focus Tax is a browser-based productivity tool that adds intentional friction before you visit distracting websites. Instead of outright blocking, it asks you to pause, think, and earn your access — turning mindless scrolling into a deliberate choice.

---

## ✨ Features

- **Configurable Challenge Types** — Choose how you "pay" to access distracting sites:
  - 🧮 **Math** — Solve a quick multiplication problem.
  - 💬 **Intent** — Write a short sentence explaining why you're visiting.
  - 🧩 **Puzzle** — Unscramble a mindfulness-themed word.
  - ⏳ **Just Wait** — Simply sit with a countdown timer.

- **Night Watch (Late Night Mode)** — Between 11 PM and 4 AM, the extension automatically forces a harder puzzle challenge. You must solve **5 consecutive word puzzles** to proceed. The timer is hidden — no shortcuts.

- **Bypass Flow** — Need quick access? You can bypass the tax, but you'll be asked for a reason and given a brief delay. A "Research Mode" badge marks your session.

- **Live Demo Website** — A polished React + Vite frontend showcases Focus Tax with a simulated browser chrome, site mocks (Twitter, Facebook, Reddit, YouTube), and a time simulator to preview Night Watch mode.

- **Fully Offline Puzzles** — Both the extension and the backend use a curated local word list. No external API calls needed.

---

## 📁 Project Structure

```
Focus_Tax/
├── backend/            # FastAPI backend (puzzle & tax rules API)
│   ├── main.py         # App entrypoint, CORS, router registration
│   ├── puzzle/         # Puzzle microservice (word scramble + match)
│   │   ├── router.py   # GET /api/puzzle/get, POST /api/puzzle/match
│   │   ├── services.py # Local word list, scramble logic, solution store
│   │   └── schemas.py  # Pydantic request/response models
│   ├── tax/            # Tax rules microservice
│   │   └── router.py   # GET /api/tax/rules (late night detection)
│   └── requirements.txt
│
├── frontend/           # React + Vite landing page & live demo
│   └── src/
│       ├── App.jsx
│       ├── components/
│       │   ├── Demo/           # Interactive demo with simulated browser
│       │   ├── Hero/           # Landing page hero section
│       │   ├── HowItWorks/     # Feature explanation section
│       │   ├── Nav/            # Navigation bar
│       │   ├── Settings/       # Settings panel
│       │   ├── Stack/          # Tech stack section
│       │   ├── Stance/         # Philosophy section
│       │   ├── Plan/           # Pricing/plan section
│       │   ├── Footer/         # Footer
│       │   └── Divider/        # Section divider
│       └── hooks/
│           ├── useMathChallenge.js
│           ├── useIntentChallenge.js
│           ├── usePuzzleChallenge.js
│           ├── useTimer.js
│           └── useDemoState.js
│
├── extension/          # Chrome/Edge browser extension (Manifest V3)
│   ├── manifest.json   # Extension config (permissions, service worker)
│   ├── background.js   # Tab listener, site blocking logic
│   ├── overlay.js      # Content script — full overlay UI + challenges
│   ├── styles.css      # Overlay and UI styles
│   ├── popup.html      # Extension popup settings page
│   ├── popup.js        # Popup logic (blocked sites, timer, challenge)
│   └── popup.css       # Popup styles
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+) and **npm**
- **Python** (3.10+) and **pip**
- **Chrome** or **Edge** browser (for the extension)

---

### 1. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

The dev server will start at `http://localhost:5173`.

---

### 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # Windows
# source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at `http://127.0.0.1:8000`.

#### API Endpoints

| Method | Endpoint             | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | `/api/puzzle/get`    | Returns a scrambled word and puzzle ID   |
| POST   | `/api/puzzle/match`  | Checks if a solution matches the puzzle  |
| GET    | `/api/tax/rules`     | Returns challenge rules based on time    |

---

### 3. Browser Extension

1. Open `chrome://extensions` (or `edge://extensions`).
2. Enable **Developer mode** (toggle in the top-right).
3. Click **Load unpacked** and select the `extension/` folder.
4. Visit any blocked site (default: Twitter, Reddit, YouTube, Facebook) to see Focus Tax in action.

#### Extension Popup Settings

- **Blocked Sites** — Add or remove sites from the block list.
- **Wait Time** — Adjust the countdown timer duration (5–60 seconds).
- **Default Challenge** — Choose between Math, Intent, or Just Wait.

---

## 🌙 Night Watch Mode

Between **11 PM and 4 AM**, the extension automatically activates Night Watch:

- The challenge is forced to **Puzzle** (word unscramble).
- You must solve **5 puzzles in a row** to proceed.
- The countdown timer is hidden.
- Challenge type tabs are hidden — no switching.
- The heading changes to: *"It's late. Your brain needs to rest."*

This runs entirely client-side — no backend needed.

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite 8, CSS Modules      |
| Backend   | Python, FastAPI, Pydantic, Uvicorn  |
| Extension | Chrome Manifest V3, Vanilla JS/CSS |

---

## 📄 License

This project is for educational use.
