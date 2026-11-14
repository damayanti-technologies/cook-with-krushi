/**
 * Cook With Krushi - Storage Manager
 * Simple, privacy-first LocalStorage wrapper for client preferences.
 */

const StorageManager = {
  KEYS: {
    LANG: 'cwk_lang',
    DIET: 'cwk_diet_filter',
    SOUND: 'cwk_sound_enabled',
    INSTALLED_PWA: 'cwk_pwa_installed'
  },

  getLanguage() {
    return localStorage.getItem(this.KEYS.LANG) || 'en';
  },

  setLanguage(lang) {
    if (lang === 'en' || lang === 'te') {
      localStorage.setItem(this.KEYS.LANG, lang);
    }
  },

  getDietFilter() {
    return localStorage.getItem(this.KEYS.DIET) || 'all';
  },

  setDietFilter(diet) {
    localStorage.setItem(this.KEYS.DIET, diet);
  },

  isSoundEnabled() {
    const val = localStorage.getItem(this.KEYS.SOUND);
    return val !== 'false'; // default to true
  },

  setSoundEnabled(enabled) {
    localStorage.setItem(this.KEYS.SOUND, enabled ? 'true' : 'false');
  }
};

window.StorageManager = StorageManager;
