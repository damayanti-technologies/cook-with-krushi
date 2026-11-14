/**
 * Cook With Krushi - Core Application Controller
 * Initializes i18n, Service Worker, Offline detection, Global Search, and Card Renderers.
 * Brand: Cook With Krushi | Parent: Damayanti Technologies
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Internationalization
  if (window.I18nManager) {
    await window.I18nManager.init();
  }

  // 2. Language Switcher Buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      window.I18nManager.setLang(lang);
    });
  });

  // 3. Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        // Fallback for subpaths if hosted in non-root
        navigator.serviceWorker.register('sw.js').catch((e) => console.log('SW registration note:', e));
      });
    });
  }

  // 4. Offline Detection
  const offlineBanner = document.querySelector('.offline-banner');
  function updateOnlineStatus() {
    if (offlineBanner) {
      if (!navigator.onLine) {
        offlineBanner.classList.add('visible');
      } else {
        offlineBanner.classList.remove('visible');
      }
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

  // 5. Update Kitchen Badge count
  updateKitchenBadge();

  // 6. Global Favorite Button Click Handler (delegated)
  document.addEventListener('click', async (e) => {
    const favBtn = e.target.closest('.recipe-fav-btn');
    if (!favBtn) return;
    e.preventDefault();
    e.stopPropagation();

    const recipeId = favBtn.getAttribute('data-recipe-id');
    const slug = favBtn.getAttribute('data-recipe-slug');
    const title = favBtn.getAttribute('data-recipe-title');
    const image = favBtn.getAttribute('data-recipe-image');
    const mealType = favBtn.getAttribute('data-recipe-meal');
    const prepTime = parseInt(favBtn.getAttribute('data-recipe-prep') || '15', 10);
    const cookTime = parseInt(favBtn.getAttribute('data-recipe-cook') || '20', 10);

    const isFav = await window.DBManager.isFavorite(recipeId);

    if (isFav) {
      await window.DBManager.removeFavorite(recipeId);
      favBtn.classList.remove('active');
      favBtn.innerHTML = getHeartIcon(false);
      window.Utils.showToast(window.I18nManager.t('toast_removed_fav', 'Removed from Saved Recipes'), 'warning');
    } else {
      await window.DBManager.addFavorite({
        id: recipeId,
        slug,
        title,
        image,
        mealType,
        prepTime,
        cookTime
      });
      favBtn.classList.add('active');
      favBtn.innerHTML = getHeartIcon(true);
      window.Utils.showToast(window.I18nManager.t('toast_saved_fav', 'Added to Saved Recipes!'), 'success');
      if (window.SoundPlayer) window.SoundPlayer.playChime();
    }

    updateKitchenBadge();
  });
});

/**
 * Returns heart SVG icon
 */
function getHeartIcon(filled) {
  if (filled) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="var(--badge-nonveg)" stroke="var(--badge-nonveg)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  }
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

/**
 * Update the badge count in navigation
 */
async function updateKitchenBadge() {
  if (!window.DBManager) return;
  try {
    const favs = await window.DBManager.getFavorites();
    const badges = document.querySelectorAll('.badge-count');
    badges.forEach((b) => {
      b.textContent = favs.length || '0';
      b.style.display = favs.length > 0 ? 'flex' : 'none';
    });
  } catch (e) {
    // silently fail
  }
}

/**
 * Standard Recipe Card Renderer
 */
function renderRecipeCard(recipe, isFavorite = false) {
  const lang = window.I18nManager ? window.I18nManager.getLang() : 'en';
  const title = lang === 'te' && recipe.titleTe ? recipe.titleTe : recipe.title;
  const desc = lang === 'te' && recipe.descriptionTe ? recipe.descriptionTe : recipe.description;
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return `
    <article class="recipe-card" data-id="${recipe.id}">
      <div class="recipe-card-media">
        <img class="recipe-card-img" src="${recipe.image}" alt="${Utils.escapeHTML(title)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80'" />
        <div class="recipe-card-badges">
          <span class="recipe-card-badge">${Utils.renderDietBadge(recipe.mealType || recipe.dietType)} ${Utils.escapeHTML(recipe.difficulty || 'Easy')}</span>
        </div>
        <button class="recipe-fav-btn ${isFavorite ? 'active' : ''}" 
                data-recipe-id="${recipe.id}"
                data-recipe-slug="${recipe.slug}"
                data-recipe-title="${Utils.escapeHTML(recipe.title)}"
                data-recipe-image="${recipe.image}"
                data-recipe-meal="${recipe.mealType || 'Lunch'}"
                data-recipe-prep="${recipe.prepTime || 15}"
                data-recipe-cook="${recipe.cookTime || 20}"
                aria-label="Save Recipe">
          ${getHeartIcon(isFavorite)}
        </button>
      </div>
      <div class="recipe-card-body">
        <div class="recipe-card-meta-top">
          <span class="recipe-card-category">${Utils.escapeHTML(recipe.mealType || 'Special')}</span>
          <span class="recipe-card-rating">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${recipe.rating ? recipe.rating.toFixed(1) : '4.9'}
          </span>
        </div>
        <h3 class="recipe-card-title"><a href="recipe.html?slug=${recipe.slug}">${Utils.escapeHTML(title)}</a></h3>
        <p class="recipe-card-desc">${Utils.escapeHTML(desc)}</p>
        <div class="recipe-card-footer">
          <span class="recipe-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${Utils.formatDuration(totalTime)}
          </span>
          <span class="recipe-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            ${recipe.servings || 4} ${window.I18nManager ? window.I18nManager.t('servings', 'servings') : 'servings'}
          </span>
        </div>
      </div>
    </article>
  `;
}

window.renderRecipeCard = renderRecipeCard;
window.updateKitchenBadge = updateKitchenBadge;
