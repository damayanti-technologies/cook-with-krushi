/**
 * Cook With Krushi - Utilities & Helpers
 * Quantity scaling, fraction formatting, toast notices, URL helpers.
 */

const Utils = {
  /**
   * Format numbers into cooking fractions (e.g. 0.5 -> 1/2, 1.25 -> 1 1/4)
   */
  formatFraction(val) {
    if (val === null || val === undefined || isNaN(val)) return '';
    const num = parseFloat(val);
    if (num <= 0) return '0';
    if (Number.isInteger(num)) return num.toString();

    const whole = Math.floor(num);
    const remainder = num - whole;
    const tolerance = 0.05;

    const fractions = [
      { val: 0.25, str: '1/4' },
      { val: 0.33, str: '1/3' },
      { val: 0.5, str: '1/2' },
      { val: 0.66, str: '2/3' },
      { val: 0.75, str: '3/4' },
      { val: 0.125, str: '1/8' }
    ];

    for (const f of fractions) {
      if (Math.abs(remainder - f.val) < tolerance) {
        return whole > 0 ? `${whole} ${f.str}` : f.str;
      }
    }

    // fallback to clean 2 decimal places if unusual fraction
    return num % 1 === 0 ? num.toString() : num.toFixed(1).replace(/\.0$/, '');
  },

  /**
   * Scale ingredient quantity according to serving size
   */
  scaleQuantity(baseAmount, baseServings = 4, targetServings = 4) {
    if (!baseAmount || isNaN(baseAmount)) return baseAmount;
    const scaled = (parseFloat(baseAmount) / baseServings) * targetServings;
    return this.formatFraction(scaled);
  },

  /**
   * Format duration in minutes to readable string
   */
  formatDuration(minutes) {
    if (!minutes || minutes <= 0) return '0 min';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  },

  /**
   * Display toast notification
   */
  showToast(message, type = 'success', duration = 3200) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--star-gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--badge-nonveg)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    }

    toast.innerHTML = `${iconSvg}<span>${this.escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  },

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [key, value] of params.entries()) {
      obj[key] = value;
    }
    return obj;
  },

  renderDietBadge(dietType) {
    const type = (dietType || '').toLowerCase();
    if (type.includes('vegan')) {
      return `<span class="diet-indicator vegan" title="Vegan"></span>`;
    } else if (type.includes('non') || type.includes('egg') || type.includes('meat') || type.includes('chicken') || type.includes('mutton')) {
      return `<span class="diet-indicator non-veg" title="Non-Vegetarian"></span>`;
    }
    return `<span class="diet-indicator veg" title="Vegetarian"></span>`;
  },

  renderRatingStars(rating = 5) {
    const full = Math.floor(rating);
    let html = '';
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        html += `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      } else {
        html += `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      }
    }
    return html;
  }
};

window.Utils = Utils;
