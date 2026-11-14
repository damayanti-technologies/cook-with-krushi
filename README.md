# 🍲 Cook With Krushi
### A Premium Cooking & Recipe Learning Platform
**Owned and Developed by Damayanti Technologies**  
*Brand Tagline:* **Cook. Learn. Enjoy.**  
*Brand Philosophy:* **Discover → Prepare → Cook → Complete → Enjoy**  
*Attribution:* **Powered by Damayanti Technologies**

---

## 🌟 Overview

**Cook With Krushi** is a complete, production-grade, responsive culinary and recipe learning website built with clean, modern web standards (**HTML5, CSS3, Vanilla JavaScript, JSON Data, LocalStorage, IndexedDB, and Service Workers**).

The platform eliminates heavy frameworks and backend server dependencies in favor of a **100% static, private, lightning-fast architecture** that runs offline, has zero hosting costs, and requires no logins or user registration.

---

## 🎨 Brand Identity & Design System

- **Background:** `#FAF8F2` (Warm Ivory)
- **Surface:** `#FFFFFF` (Crisp White) & `#F5F1E8` (Light Cream)
- **Primary Accent:** `#55765C` (Sage Green)
- **Deep Action Green:** `#294B35` (Forest Green)
- **Warm Peach:** `#F3D9C8`
- **Terracotta Accent:** `#BD765B`
- **Charcoal Text:** `#292D29`
- **Secondary Text:** `#777B73`
- **Typography:** *Playfair Display* for headings, *Plus Jakarta Sans* for clean UI, and *Noto Sans Telugu* for authentic Telugu script rendering.

---

## 🚀 Key Features

### 1. Multi-Category Discovery
- **Meal-Based Categories:** Breakfast, Lunch, Snacks, Dinner, Starters, Desserts.
- **Special Collections:** Drinks, Chutneys & Pickles, Healthy Food, Special Occasions (Festivals).
- Subcategory pill filtering (e.g. Biryani & Rice, Dal & Pappu, Curries).

### 2. Live Recipe Search & Filtering
- Instant search across recipe titles, descriptions, ingredients, and tags.
- Multi-dimensional filters: Meal Category, Dietary Type (Vegetarian, Vegan, Non-Vegetarian), Difficulty (Easy, Medium, Hard), and Sorting (Popularity, Quickest, Title A-Z).

### 3. Recipe Overview & Serving Calculator
- Dynamic serving scaler (`-` / count / `+`) that recalculates ingredient quantities with fractional formatting (`1/4`, `1/2`, `1 1/2`).
- Grouped ingredient lists (Main, Masala, Gravy, Garnish).
- Equipment required checklist.
- Chef's substitution notes and cooking wisdom.
- Automated Schema.org `Recipe` JSON-LD metadata for search engine indexing.

### 4. Interactive Ingredient Preparation Mode
- Dedicated preparation checklist (`prepare.html`) to facilitate *mise en place*.
- Real-time progress bar tracking collected ingredients.
- Interactive checkboxes with strikethrough styling and audio chime.
- Persistent checklist state saved in IndexedDB.

### 5. Distraction-Free Guided Cooking Mode
- Focused step-by-step cooking interface (`cook.html`).
- Large typography, step media images, chef pro-tips, and safety alerts.
- Built-in zero-drift culinary timers with play, pause, reset, harmonic Web Audio chimes, and native browser notifications.
- Auto-saving checkpoints allowing cooks to exit and resume later.
- Dish completion screen with procedural canvas confetti celebration, star rating, and personal cooking journal notes.

### 6. "What Can I Cook?" Smart Pantry Matcher
- Select ingredients available in your fridge and pantry (Onion, Tomato, Potato, Rice, Dal, etc.).
- Categorizes results into **100% Ready to Cook** (complete matches) and **Almost Ready** (missing 1-2 items) with missing ingredients highlighted in red tags.

### 7. Culinary Guide & Reference Manual
- Bilingual Culinary Glossary (Sauté, Simmer, Dum, Tadka, Blanch, etc.) with live search.
- Essential kitchen cookware guide.
- Accurate measurement conversion table (cups, tbsp, tsp, ml, grams).
- Emergency kitchen remedies for common cooking mistakes (too salty, too spicy, sticky rice).
- Kitchen hygiene and fire safety guidelines.

### 8. My Kitchen (Local Personal Hub)
- **Saved Recipes (Favorites):** Instant access to bookmarked dishes.
- **In-Progress Sessions:** Resume interrupted recipes at their exact step.
- **Cooking Journal:** History of cooked dishes with dates, star ratings, and personal notes.
- **Data Privacy & Backup:** One-click JSON data export and complete local data erasure. 100% on-device via IndexedDB.

### 9. Bilingual Language Support
- One-click toggle between **English** and **తెలుగు (Telugu)**.
- Localized recipe names, instructions, glossary terms, and UI labels.

### 10. Progressive Web App (PWA) & Offline Ready
- Complete `manifest.json` and installable standalone app experience.
- Service Worker (`sw.js`) implementing cache-first strategies for static assets and network-first strategies for recipe JSON data.
- Dedicated offline fallback page (`offline.html`).

---

## 📂 Project Architecture

```
cook-with-krushi/
├── assets/
│   ├── icons/
│   │   ├── icon.svg
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── images/
├── css/
│   ├── style.css           # Design tokens, variables, layout, typography, header, footer
│   └── components.css      # Recipe cards, category cards, cooking mode, timers, checklists
├── data/
│   ├── categories.json     # All 10 category definitions (bilingual)
│   ├── glossary.json       # Culinary terms, equipment, conversions, mistakes, safety
│   ├── translations.json   # Full English and Telugu dictionary
│   └── recipes/
│       ├── breakfast.json
│       ├── lunch.json
│       ├── snacks.json
│       ├── dinner.json
│       ├── starters.json
│       ├── desserts.json
│       ├── drinks.json
│       ├── chutneys.json
│       ├── healthy-food.json
│       └── special-occasions.json
├── js/
│   ├── storage.js          # LocalStorage manager (language, preferences)
│   ├── db.js               # IndexedDB wrapper (favorites, history, in-progress)
│   ├── api.js              # JSON data loader & caching layer
│   ├── audio.js            # Web Audio API procedural chime synthesizer
│   ├── timer.js            # Target-timestamp drift-free cooking timer
│   ├── confetti.js         # Canvas celebratory particle system
│   ├── utils.js            # Scaler fractions, formatting, toasts, diet badges
│   ├── i18n.js             # Bilingual language switcher (EN / TE)
│   └── app.js              # Shared controller, SW registration, card renderer
├── index.html              # Homepage
├── explore.html            # Search & multi-filters
├── categories.html         # Categories directory
├── category.html           # Category detail & subcategories
├── recipe.html             # Recipe details & serving scaler
├── prepare.html            # Mise en place ingredient checklist
├── cook.html               # Step-by-step cooking mode with timers
├── what-can-i-cook.html    # Smart pantry ingredient matcher
├── cooking-guide.html      # Culinary glossary & reference
├── my-kitchen.html         # User hub (favorites, history, in-progress)
├── about.html              # About Cook With Krushi & Damayanti Technologies
├── contact.html            # Feedback & recipe submission form
├── privacy-policy.html     # Privacy-first policy (no tracking)
├── terms.html              # Terms of use
├── offline.html            # Offline fallback page
├── manifest.json           # Web App Manifest
├── sw.js                   # Service Worker (offline caching)
├── netlify.toml            # Netlify deployment configuration
└── README.md
```

---

## ⚡ Deployment & Hosting

### Option A: Netlify (Free)
1. Drag and drop the `cook-with-krushi` folder directly into [Netlify Drop](https://app.netlify.com/drop), or connect your Git repository.
2. Build command: *(Leave blank - No build command needed)*
3. Publish directory: `.` *(Root)*
4. The included `netlify.toml` automatically configures headers, cache control, and PWA security.

### Option B: GitHub Pages (Free)
1. Push the repository to GitHub.
2. In your repository settings, go to **Settings → Pages**.
3. Under **Source**, choose `Deploy from a branch` and select `master` / `/ (root)`.
4. Your site will be live instantly!

### Option C: Local Testing
Run any standard static file server in the project directory:
```bash
# Using Python
python -m http.server 3000

# Or using Node
npx serve -p 3000
```
Open `http://localhost:3000` in your browser.

---

## 🔒 Privacy & Data Policy

Cook With Krushi does not collect, sell, or transmit any user information. All user state is stored on your device using:
- **LocalStorage:** User interface language preference (`cwk_lang`).
- **IndexedDB:** Saved recipes (`favorites`), active cooking state (`inProgress`), and completed dish log (`history`).

---

## 👨‍💻 Ownership & Credits

- **Platform:** Cook With Krushi
- **Tagline:** Cook. Learn. Enjoy.
- **Owner & Developer:** [Damayanti Technologies](https://damayantitechnologies.com)
- **Footer Attribution:** "Powered by Damayanti Technologies"
- **Copyright:** &copy; 2026 Damayanti Technologies. All rights reserved.
