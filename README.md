[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)
[![WebGL2](https://img.shields.io/badge/WebGL2-raw%20scene-orange)](https://www.khronos.org/webgl/)
[![Netlify](https://img.shields.io/badge/Netlify-deployed-00C7B7)](https://www.netlify.com/)

# Zaid Shabir — Portfolio

Source for **[zai14.netlify.app](https://zai14.netlify.app/)** — a personal site that pairs a React/Next.js two-pane layout with a **raw WebGL2 desk scene** and a **retro terminal you can actually type into**. No game engine, no 3D library, no UI framework on the scene.

**[Live site](https://zai14.netlify.app/)** · **[GitHub](https://github.com/Zai14)** · **[LinkedIn](https://www.linkedin.com/in/zai14/)** · **[Email](mailto:ZaidShabir67@gmail.com)**

---

## About

B.Tech Computer Science graduate (University of Kashmir, Nov 2025) building AI/ML applications, satellite-imagery pipelines, and cloud-backed full-stack systems. Currently **AI/ML Software Developer at Applekul**, previously **AI Vibe Analysis Engineer Intern at Rochester Institute of Technology**. Available for work.

### At a glance

| Area | What is used |
| --- | --- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5, static export |
| **3D scene** | WebGL2, custom GLSL (`#version 300 es`), 2048×2048 shadow mapping |
| **Terminal** | Vanilla-JS CLI rendered to a canvas texture, fake filesystem, 8 playable games |
| **Styling** | Hand-written CSS (4 stylesheets), no CSS framework |
| **Theme** | Light/dark, persisted to `localStorage`, synced across React + DOM |
| **Offline** | Service worker with network-first caching and an offline fallback |
| **SEO** | Metadata, Open Graph / Twitter cards, `Person` JSON-LD, canonical URL |

---

## Codebase breakdown

Counts cover tracked source only (`node_modules`, `.next` and `out` excluded).

> **Note on the language bar:** GitHub reports this repo as **~81% JavaScript**. That is misleading — `public/Scripts/ModelFiles.js` is **11,831 lines of Blender-exported OBJ geometry** (`# Blender 4.0.2`, raw `v x y z` vertices), not code. It is broken out separately below.

| | Lines | Share of hand-written code |
| --- | ---: | ---: |
| JavaScript (runtime) | 3,542 | 48.4% |
| CSS | 2,576 | 35.2% |
| TypeScript + TSX | 1,182 | 16.1% |
| JS config (`.mjs`) | 25 | 0.3% |
| **Hand-written total** | **7,325** | **100%** |
| *Blender OBJ model data* | *11,831* | *excluded* |

### Where the JavaScript lives

| File | Lines | Role |
| --- | ---: | --- |
| `public/Scripts/TerminalFunction.js` | 2,106 | Command dispatch, fake filesystem, all 8 games |
| `public/Scripts/Main.js` | 781 | WebGL2 bootstrap, camera, input, text texture upload |
| `public/Scripts/RenderingFunctions.js` | 595 | Shaders, shadow pass, OBJ/MTL parsing |
| `public/sw.js` | 60 | Service worker (network-first offline cache) |

### Where the TypeScript lives

| File | Lines | Role |
| --- | ---: | --- |
| `components/PortfolioShell.tsx` | 530 | Page shell, section nav, scroll-reveal, legacy script loader |
| `components/LeftPanelHero.tsx` | 270 | Profile card, socials, CV, clock, theme toggle |
| `app/layout.tsx` | 95 | Metadata, fonts, JSON-LD, theme bootstrap |
| `components/site-theme/SiteThemeProvider.tsx` | 87 | Theme context over `useSyncExternalStore` |
| `components/tech-stack/*` | 170 | Marquee rows, icon data, intersection observer |
| `components/ServiceWorkerRegistrar.tsx` | 19 | Registers `sw.js` |

---

## Projects

### Applekul One / GongulOS — AI Farm Management Platform

**2025 – Present** · private company project, repository not public

Full-stack farm management platform that pulls **Planet.com and SentinelHub satellite imagery** through TensorFlow models for crop-health monitoring.

- Crop disease detection and yield prediction from satellite + weather data
- Weather-station sensors integrated through AWS IoT for live environmental readings
- Financial tracking and advisory recommendations
- REST APIs and cloud backend on Supabase edge functions, AWS S3 and Lambda
- TypeScript/React frontend

**Stack:** TypeScript · React · TensorFlow · Supabase · AWS

### NodeLink / Kraken — Decentralized E2E Encrypted Messenger

**2024 – 2025** · [github.com/Zai14/Node-Link](https://github.com/Zai14/Node-Link)

Privacy-focused messaging platform serving **100+ concurrent users**.

- AES-GCM message encryption, ECDH key exchange, ECDSA authentication
- MetaMask Web3 login
- Decentralized storage over Supabase and GUN.js

**Stack:** JavaScript · AES-GCM · ECDH · ECDSA · MetaMask · Supabase · GUN.js

### AI Medical Diagnosis System

**2024 – 2025** · [github.com/Zai14/AI-Powered-Medical-Diagnosis-System](https://github.com/Zai14/AI-Powered-Medical-Diagnosis-System)

- ML pipeline reaching **87% accuracy** for disease prediction on healthcare datasets
- Streamlit dashboard for real-time analysis and interactive visualizations

**Stack:** Python · Scikit-learn · Streamlit

### Magisk on WSA — Android Root Solution

**2021** · [github.com/Zai14/MagiskOnWSAScript](https://github.com/Zai14/MagiskOnWSAScript)

- Ported Magisk root to Windows Subsystem for Android
- Enabled sideloading APKs across all apps without Amazon Appstore restrictions

**Stack:** Android · WSA · Magisk

### This site

The project you are reading. See [Architecture](#architecture) below.

---

## Experience

**AI/ML Software Developer — Applekul** · Jan 2026 – Present

- Built a TypeScript/React farm management platform integrating Planet.com and SentinelHub satellite imagery for crop disease detection
- Integrated weather-station sensors with AWS IoT services
- Designed REST API-backed backend services using Supabase, edge functions and AWS components

**AI Vibe Analysis Engineer Intern — Rochester Institute of Technology** · Mar 2025 – May 2025

- Built and evaluated a PyTorch sentiment-analysis pipeline, improving NLP dataset interpretability by 25%
- Developed React AI frontend modules supporting 500+ user interactions with real-time visualizations

## Education

**University of Kashmir** — B.Tech Computer Science & Engineering, graduated Nov 2025

**New Convent School** — Higher Secondary (Non-Medical), Jan 2019 – Jan 2021

---

## Tech stack

| Category | Tools |
| --- | --- |
| Languages | Python, TypeScript, JavaScript, C, HTML/CSS |
| AI / ML | TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, Matplotlib |
| Backend | REST APIs, FastAPI, Node.js, Supabase |
| Cloud | AWS (S3, Lambda, IoT, edge functions), Supabase, Netlify |
| Frontend | React, Next.js, WebGL2, GLSL |
| Tooling | Git, VS Code, Blender (asset export), ESLint |

---

## Architecture

### Two-pane shell

`components/PortfolioShell.tsx` owns `#MainDiv`, a fixed `#LeftPanel` (profile, nav) and a scrollable `#RightPanel` holding five sections: **Tech stack → Projects → Experience → Certifications → Education**. Section nav scrolls the panel on desktop and the window at 1024px and below, and an `IntersectionObserver` adds `.rp-visible` for scroll-reveal animations.

The shell also lazily injects the four legacy scene scripts (`ModelFiles.js`, `RenderingFunctions.js`, `TerminalFunction.js`, `Main.js`) with a cache-busting query, keeping the React tree free of canvas globals.

### WebGL2 scene

`public/Scripts/Main.js` boots a raw WebGL2 context on `#Canvas3D`: custom GLSL programs, a 2048×2048 shadow-map pass, mouse-driven camera, and a 1024×1024 2D canvas uploaded as a texture for terminal text (32px monospace, ~51 characters per line, 30 lines).

### Retro terminal

`public/Scripts/TerminalFunction.js` implements a prompt over a fake filesystem rooted at `C:/Users/guest`, plus eight games that all drive the same text buffer.

| Command | Description |
| --- | --- |
| `ls` | List the current directory |
| `cd <dir>` | Change directory — `..` up, `/` for root |
| `start <file>` | Open a file, follow a `.lnk`, or launch an `.exe` |
| `about` | Who I am and what I build |
| `projects` | List project links with their tech |
| `experience` | Work history |
| `resume` | Open the CV in a new tab |
| `hire` | Availability and contact details |
| `socials [name]` | List links, or open one — e.g. `socials github` |
| `certs` | List all 10 certifications by category — `certs <n>` opens one |
| `theme` | Toggle the site theme — pass `light` or `dark` to force it. Syncs with the hero toggle. |
| `clear` | Reset to the boot sequence |
| `help` | List every command |

**Games:** `snake` · `tetris` · `minesweeper` · `pong` · `breakout` · `2048` · `maze` · `typetest` — arrow keys to play, `Esc` to exit. `Tab` auto-completes commands and filenames.

### Theming

`SiteThemeProvider` exposes `{ dark, toggleTheme }` backed by `useSyncExternalStore`, a `storage` event listener and the `zaid-embed-theme` key. The resolved state is mirrored onto `html.embed-site-light`, which every stylesheet keys off. The terminal's `theme` command writes the same key and dispatches the same event, so the whole UI — including the hero's sun/moon icon — stays in sync.

### Offline

`public/sw.js` serves `/_next/static/`, documents and static assets **network-first**, falling back to cache when the network is unavailable. Cache versions are rotated on activate.

### Static export and deploy

`next.config.mjs` sets `output: "export"`, so `npm run build` emits a fully static `out/` directory with no server runtime. `netlify.toml` publishes `out/` and rewrites `/* → /index.html`.

---

## Getting started

Requires **Node.js 20+**.

```bash
git clone https://github.com/Zai14/PF.git
cd PF
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Description |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build → `out/` (static) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |

## Project structure

| Path | Role |
| --- | --- |
| `app/` | App Router: `layout.tsx` (metadata, fonts, JSON-LD), `page.tsx` |
| `components/PortfolioShell.tsx` | Page shell: `#MainDiv`, `#RightPanel`, section nav |
| `components/LeftPanelHero.tsx` | Left column profile card |
| `components/tech-stack/` | Tech-stack marquees and icon data |
| `components/site-theme/` | Light/dark context |
| `public/Scripts/` | WebGL2 scene, terminal and model geometry |
| `public/Images/`, `public/Sounds/` | Static assets — profile, logos, resume, UI audio |
| `styles/` | `portfolio-layout.css`, `right-panel-*.css`, `left-panel-hero.css` |
| `constants/` | Rotating hero headline words |

---

## Inspirations

- Modern layout influenced by [Brittany Chiang's portfolio](https://brittanychiang.com/).
- Retro terminal / desk vibe influenced by [Edward Hwang's site](https://www.edwardh.io/).

## Contact

Questions or opportunities: [ZaidShabir67@gmail.com](mailto:ZaidShabir67@gmail.com)
