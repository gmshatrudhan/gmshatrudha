# StudyVerse 🚀

A dark, futuristic **3D study platform** — syllabus, study notes, MCQ tests, old questions, subjective practice and notices, all in one place.

Built with **vanilla HTML/CSS/JS + Three.js** — no build step, no framework, no npm install. Just open it or host it.

---

## ✨ Features

- 🧊 **Real WebGL 3D hero scene** — floating wireframe geometry + particle field (Three.js, mouse-reactive)
- 💎 **Glassmorphism UI** — frosted-glass cards, neon accents, gradient glows
- 🃏 **3D tilt-on-hover cards** with layered depth (pure CSS 3D transforms)
- 📚 **Sections** — Home, Syllabus, 6 Subjects, Study Notes, MCQ/Test, Old Questions, Subjective, Notice
- 🔎 **Live search** (full-site index) — open with the search icon or `Ctrl/⌘ + K`
- 🧪 **Interactive MCQ quiz** with scoring + explanations
- ⚡ Fast & lightweight, fully responsive, keyboard-accessible
- ♿ Respects `prefers-reduced-motion`, degrades gracefully without WebGL

---

## 🚀 Upload to GitHub & publish with GitHub Pages

### Option A — Drag & drop (quickest)

1. Create a new repository on GitHub (e.g. `studyverse`) — **Public**.
2. Upload **everything in this folder** (`index.html`, `css/`, `js/`, `vendor/`, `README.md`) to the repo root.
3. Go to **Settings → Pages**.
4. Under *Build and deployment* → *Source*, choose **Deploy from a branch**, then select branch **`main`** and folder **`/ (root)`**. Save.
5. Wait ~1 minute. Your site will be live at:
   `https://<your-username>.github.io/studyverse/`

### Option B — Git (recommended)

```bash
cd studyverse
git init
git add .
git commit -m "Initial commit — StudyVerse"
git branch -M main
git remote add origin https://github.com/<your-username>/studyverse.git
git push -u origin main
```

Then enable GitHub Pages as in step 3–5 above.

> 💡 **Tip:** To make it the site at `https://<username>.github.io/` (no subfolder),
> name the repository `<your-username>.github.io`.

---

## ✏️ Customizing content

**All site content lives in one file: [`js/data.js`](js/data.js)** — edit it and nothing else needs changing:

| Data | What to edit |
|---|---|
| `SUBJECTS` | Your 6 subjects (name, color, icon, blurb) |
| `SYLLABUS` | Chapter lists per subject |
| `NOTES` | Study note cards |
| `MCQS` | Quiz questions & answers |
| `OLD_QUESTIONS` | Past-paper entries |
| `SUBJECTIVE` | Subjective questions |
| `NOTICES` | Notice-board announcements |
| `SITE` | Site name & tagline |

**Brand name** — change "StudyVerse" in `index.html` (header/footer/title) and `data.js` (`SITE.name`).

**3D scene** — tweak `js/three-scene.js` (shapes, colors, particle count, speed).

---

## 🖥 Running locally

Just open `index.html` in a browser. Or serve it:

```bash
# Python
python3 -m http.server 8000
# then open http://localhost:8000
```

*(The site is fully self-contained — Three.js is bundled in `vendor/`, so no internet is needed to run it.)*

---

## 📁 Structure

```
studyverse/
├── index.html          # Page structure & all sections
├── css/
│   └── styles.css      # Design system (glass, 3D, responsive)
├── js/
│   ├── data.js         # ✏️ ALL site content — edit this
│   ├── main.js         # Rendering, quiz, search, tilt, reveal
│   └── three-scene.js  # WebGL 3D background scene
├── vendor/
│   └── three.min.js    # Three.js r128 (bundled, offline-ready)
└── README.md
```

---

## 🎨 Design tokens

Quick reference if you want to restyle:

| Token | Value |
|---|---|
| Background | `#05080f` |
| Surface | `rgba(255,255,255,0.045)` |
| Accent gradient | cyan `#22d3ee` → indigo `#818cf8` → violet `#a78bfa` |
| Fonts | Space Grotesk (display) + Inter (body) |

---

Made with 💙 for learners. MIT-style — use it freely.
