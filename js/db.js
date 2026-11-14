/**
 * Cook With Krushi - IndexedDB Manager
 * Stores local user data offline: favorites, cooking history, in-progress checkpoints, and recent views.
 * 100% private to device, zero external tracking.
 */

const DBManager = (() => {
  const DB_NAME = 'CookWithKrushiDB';
  const DB_VERSION = 1;
  let dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;

    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Favorites store
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', { keyPath: 'recipeId' });
        }

        // Cooking History store
        if (!db.objectStoreNames.contains('history')) {
          const historyStore = db.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
          historyStore.createIndex('recipeId', 'recipeId', { unique: false });
          historyStore.createIndex('completedAt', 'completedAt', { unique: false });
        }

        // In-Progress Cooking Checkpoints store
        if (!db.objectStoreNames.contains('inProgress')) {
          db.createObjectStore('inProgress', { keyPath: 'recipeId' });
        }

        // Recently Viewed store
        if (!db.objectStoreNames.contains('recentlyViewed')) {
          const recentStore = db.createObjectStore('recentlyViewed', { keyPath: 'recipeId' });
          recentStore.createIndex('viewedAt', 'viewedAt', { unique: false });
        }
      };

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => {
        console.error('IndexedDB open error:', event.target.error);
        reject(event.target.error);
      };
    });

    return dbPromise;
  }

  async function performTx(storeName, mode, callback) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      let result;

      try {
        result = callback(store);
      } catch (err) {
        reject(err);
      }

      tx.oncomplete = () => resolve(result);
      tx.onerror = (e) => reject(e.target.error);
      tx.onabort = (e) => reject(e.target.error);
    });
  }

  return {
    // --- FAVORITES ---
    async addFavorite(recipe) {
      const item = {
        recipeId: recipe.id || recipe.recipeId,
        slug: recipe.slug,
        title: recipe.title,
        titleTe: recipe.titleTe || '',
        image: recipe.image,
        mealType: recipe.mealType || '',
        prepTime: recipe.prepTime || 0,
        cookTime: recipe.cookTime || 0,
        difficulty: recipe.difficulty || 'Easy',
        savedAt: new Date().toISOString()
      };
      return performTx('favorites', 'readwrite', (store) => store.put(item));
    },

    async removeFavorite(recipeId) {
      return performTx('favorites', 'readwrite', (store) => store.delete(recipeId));
    },

    async isFavorite(recipeId) {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction('favorites', 'readonly');
        const req = tx.objectStore('favorites').get(recipeId);
        req.onsuccess = () => resolve(!!req.result);
        req.onerror = () => resolve(false);
      });
    },

    async getFavorites() {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('favorites', 'readonly');
        const req = tx.objectStore('favorites').getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = (e) => reject(e.target.error);
      });
    },

    // --- COOKING HISTORY ---
    async addHistory(dish) {
      const entry = {
        recipeId: dish.recipeId || dish.id,
        slug: dish.slug,
        title: dish.title,
        image: dish.image,
        completedAt: new Date().toISOString(),
        rating: dish.rating || 5,
        notes: dish.notes || ''
      };
      return performTx('history', 'readwrite', (store) => store.add(entry));
    },

    async getHistory() {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('history', 'readonly');
        const req = tx.objectStore('history').getAll();
        req.onsuccess = () => {
          const sorted = (req.result || []).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
          resolve(sorted);
        };
        req.onerror = (e) => reject(e.target.error);
      });
    },

    // --- IN PROGRESS CHECKPOINTS ---
    async saveInProgress(progress) {
      const entry = {
        recipeId: progress.recipeId,
        slug: progress.slug,
        title: progress.title,
        image: progress.image,
        currentStep: progress.currentStep || 0,
        totalSteps: progress.totalSteps || 1,
        completedChecklist: progress.completedChecklist || [],
        updatedAt: new Date().toISOString()
      };
      return performTx('inProgress', 'readwrite', (store) => store.put(entry));
    },

    async getInProgress(recipeId) {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction('inProgress', 'readonly');
        const req = tx.objectStore('inProgress').get(recipeId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    },

    async getAllInProgress() {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('inProgress', 'readonly');
        const req = tx.objectStore('inProgress').getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = (e) => reject(e.target.error);
      });
    },

    async deleteInProgress(recipeId) {
      return performTx('inProgress', 'readwrite', (store) => store.delete(recipeId));
    },

    // --- RECENTLY VIEWED ---
    async addRecentlyViewed(recipe) {
      const item = {
        recipeId: recipe.id || recipe.recipeId,
        slug: recipe.slug,
        title: recipe.title,
        titleTe: recipe.titleTe || '',
        image: recipe.image,
        mealType: recipe.mealType || '',
        cookTime: recipe.cookTime || 0,
        viewedAt: new Date().toISOString()
      };
      return performTx('recentlyViewed', 'readwrite', (store) => store.put(item));
    },

    async getRecentlyViewed(limit = 6) {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('recentlyViewed', 'readonly');
        const req = tx.objectStore('recentlyViewed').getAll();
        req.onsuccess = () => {
          const sorted = (req.result || [])
            .sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt))
            .slice(0, limit);
          resolve(sorted);
        };
        req.onerror = (e) => reject(e.target.error);
      });
    },

    // --- DATA BACKUP & EXPORT ---
    async exportAllData() {
      const [favorites, history, inProgress, recentlyViewed] = await Promise.all([
        this.getFavorites(),
        this.getHistory(),
        this.getAllInProgress(),
        this.getRecentlyViewed(100)
      ]);
      return {
        exportDate: new Date().toISOString(),
        version: DB_VERSION,
        source: 'Cook With Krushi by Damayanti Technologies',
        favorites,
        history,
        inProgress,
        recentlyViewed
      };
    },

    async clearAllData() {
      const db = await openDB();
      return Promise.all([
        performTx('favorites', 'readwrite', (s) => s.clear()),
        performTx('history', 'readwrite', (s) => s.clear()),
        performTx('inProgress', 'readwrite', (s) => s.clear()),
        performTx('recentlyViewed', 'readwrite', (s) => s.clear())
      ]);
    }
  };
})();

window.DBManager = DBManager;
