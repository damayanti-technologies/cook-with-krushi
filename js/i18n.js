/**
 * Cook With Krushi - Internationalization (i18n) Manager
 * Dynamic bilingual toggling: English and Telugu.
 * Translates elements with [data-i18n] and manages language preference.
 */

const I18nManager = (() => {
  let translations = null;
  let currentLang = 'en';

  async function init() {
    currentLang = window.StorageManager.getLanguage() || 'en';
    document.documentElement.lang = currentLang;

    try {
      translations = await window.APIManager.getTranslations();
    } catch (err) {
      console.warn('Could not load translations:', err);
      translations = {};
    }

    applyTranslations();
    updateUIButtons();
  }

  function t(key, defaultVal = '') {
    if (!translations || !translations[key]) return defaultVal || key;
    return translations[key][currentLang] || translations[key]['en'] || defaultVal || key;
  }

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'te') return;
    currentLang = lang;
    window.StorageManager.setLanguage(lang);
    document.documentElement.lang = lang;

    applyTranslations();
    updateUIButtons();

    // Broadcast custom event so active pages can refresh recipes
    window.dispatchEvent(new CustomEvent('cwk-lang-changed', { detail: { lang } }));
  }

  function applyTranslations() {
    if (!translations) return;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] && translations[key][currentLang]) {
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.setAttribute('placeholder', translations[key][currentLang]);
        } else {
          el.textContent = translations[key][currentLang];
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[key] && translations[key][currentLang]) {
        el.setAttribute('placeholder', translations[key][currentLang]);
      }
    });
  }

  function updateUIButtons() {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const lang = btn.getAttribute('data-lang');
      if (lang === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  return {
    init,
    t,
    getLang,
    setLang,
    applyTranslations
  };
})();

window.I18nManager = I18nManager;
