# 🍲 Cook With Krushi
### A Premium Cooking & Recipe Learning Platform
#### Powered and Developed by **Damayanti Technologies**

> **Tagline:** *Cook. Learn. Enjoy.*  
> **Core Philosophy:** *Discover → Prepare → Cook → Complete → Enjoy*

---

## 🌟 Overview

**Cook With Krushi** is a complete, production-grade, responsive culinary learning and cooking companion web application. Engineered by **Damayanti Technologies**, it guides both kitchen beginners and seasoned home cooks from ingredient discovery to step-by-step culinary execution with zero-drift cooking timers, intelligent serving calculations, interactive prep checklists, and authentic bilingual (English & Telugu) support.

---

## 🚀 Key Features

1. **Bilingual Culinary Experience (English & Telugu):**
   - Instant language switcher in navigation (`EN` / `తెలుగు`).
   - Structured bilingual recipe titles, instructions, ingredients, and culinary guides.
   - Enhanced Telugu typography with `Noto Sans Telugu`.

2. **Smart Recipe Discovery & Filtering (`/explore`):**
   - Multi-parameter live search (title, ingredients, keywords, cuisine).
   - Filter by Meal Type (Breakfast, Lunch, Snacks, Dinner, Starters, Desserts, Drinks, Chutneys & Pickles, Healthy Food, Special Occasions).
   - Filter by Dietary Preference (Vegetarian, Vegan, Non-Vegetarian).
   - Filter by Difficulty (Easy, Medium, Hard) and cooking duration slider.
   - Multiple sort modes (Popularity, Newest, Shortest Cooking Time, Alphabetical).

3. **Intelligent Serving Calculator:**
   - Seamlessly scale ingredient quantities from 1 to 24 people.
   - Fractional and whole kitchen math formatting (e.g. `½ tsp`, `1 ¼ cups`, `200 g`).

4. **Interactive Ingredient Checklist (`/recipe/[slug]/prepare`):**
   - Dedicated "Mise en place" preparation screen before lighting the stove.
   - Interactive checklist with strikethrough state and real-time progress counter.
   - Clear warning banner if required ingredients are missing, without blocking the user.
   - Equipment on counter checklist.

5. **Distraction-Free Step-by-Step Cooking Mode (`/recipe/[slug]/cook`):**
   - Mobile-optimized focused cooking flow.
   - Integrated zero-drift cooking timers using target timestamp calculations.
   - Pleasant synthesized Web Audio bell chimes (no external audio assets required).
   - Safety notices and chef's tips per step.
   - Step skip with confirmation dialog.
   - Confetti celebration screen on dish completion with cooking history logging.

6. **"What Can I Cook?" Smart Pantry Matcher (`/what-can-i-cook`):**
   - Enter ingredients available in your pantry or select quick staples.
   - Transparent matching algorithm: separates 100% ready dishes from partial matches with a detailed breakdown of missing items.

7. **Culinary Guide & Knowledge Base (`/cooking-guide`):**
   - Glossary of terms (Sauté, Simmer, Dum, Temper/Tadka, Knead, Whisk, etc.).
   - Standard measurement conversion table.
   - Kitchen equipment guide.
   - Hygiene and kitchen safety standards.
   - Common cooking mistakes and chef solutions.

8. **My Kitchen Personal Hub (`/my-kitchen`):**
   - Saved favorite recipes.
   - Resume in-progress cooking sessions.
   - Completed dish history log.
   - Personal dietary preferences.

9. **Administrative Dashboard (`/admin`):**
   - Role-guarded admin portal.
   - Full Recipe Management (create, edit, publish/unpublish, delete).
   - Category and subcategory taxonomy manager.
   - Master ingredient library and substitutions.
   - Registered users directory and role switching.
   - Editorial homepage content, banner, and tips manager.
   - **1-Click Firestore Seed Tool**: Uploads all initial sample recipes, categories, and guides into Firestore with one tap!

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom culinary palette: Warm Ivory `#FAF8F2`, Sage Green `#55765C`, Deep Forest Green `#294B35`, Warm Peach `#F3D9C8`, Terracotta `#BD765B`)
- **Backend & Auth:** Google Firebase (Auth, Cloud Firestore, Firebase Storage)
- **Audio:** Web Audio API (Synthesized pleasant chime tones)
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+ installed
- npm or yarn

### 2. Installation
Clone or navigate to the project directory:
```bash
cd "C:\Users\Damayanti Crest\.gemini\antigravity\scratch\cook-with-krushi"
npm install
```

### 3. Environment Setup (Optional for Demo Mode)
The platform is designed to work **100% out of the box** in Demo/Offline Mode even without Firebase credentials!

To connect your own real Google Cloud Firebase project:
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your Firebase Web App credentials from the Firebase Console:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🔒 Firebase Security Rules & Seeding

- **Firestore Security Rules:** Located in [`firestore.rules`](file:///C:/Users/Damayanti%20Crest/.gemini/antigravity/scratch/cook-with-krushi/firestore.rules).
- **Storage Security Rules:** Located in [`storage.rules`](file:///C:/Users/Damayanti%20Crest/.gemini/antigravity/scratch/cook-with-krushi/storage.rules).
- **1-Click Seed:** Log in as Administrator and navigate to `/admin/settings` to populate all initial recipes and categories into your Cloud Firestore collection.

---

## 🏢 Brand Attribution

**Cook With Krushi** is owned, engineered, and maintained by:  
**Damayanti Technologies**  
*Powering modern digital culinary learning.*
