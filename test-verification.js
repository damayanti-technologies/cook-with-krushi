/**
 * Cook With Krushi - Comprehensive System Verification Script
 * Validates HTTP endpoints, JSON schemas, calculations, and module integrity.
 * Powered by Damayanti Technologies
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(BASE_URL + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data, headers: res.headers });
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('=== STARTING COOK WITH KRUSHI VERIFICATION ===\n');
  let passCount = 0;
  let failCount = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passCount++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failCount++;
    }
  }

  // 1. Verify Pages HTTP 200
  console.log('1. Checking Key HTML Pages:');
  const pages = [
    '/',
    '/index.html',
    '/explore.html',
    '/cuisines.html',
    '/budget.html',
    '/cook-with-me.html?slug=paneer-butter-masala',
    '/recipe.html?slug=paneer-butter-masala',
    '/cook.html?slug=paneer-butter-masala',
    '/prepare.html?slug=paneer-butter-masala',
    '/what-can-i-cook.html',
    '/cooking-guide.html',
    '/my-kitchen.html',
    '/categories.html',
    '/category.html?id=lunch',
    '/about.html',
    '/contact.html',
    '/privacy-policy.html',
    '/terms.html',
    '/offline.html',
    '/manifest.json'
  ];

  for (const page of pages) {
    try {
      const res = await fetchUrl(page);
      assert(res.status === 200, `${page} -> HTTP ${res.status}`);
    } catch (err) {
      assert(false, `${page} request error: ${err.message}`);
    }
  }

  // 2. Verify New JavaScript Modules
  console.log('\n2. Checking JavaScript Modules:');
  const jsModules = [
    '/js/voice-assistant.js',
    '/js/cook-with-me.js',
    '/js/nutrition-calculator.js',
    '/js/cuisine-discovery.js',
    '/js/budget-calculator.js',
    '/js/api.js',
    '/js/storage.js',
    '/js/db.js',
    '/js/audio.js',
    '/js/timer.js',
    '/js/confetti.js',
    '/js/utils.js',
    '/js/i18n.js',
    '/js/app.js',
    '/sw.js'
  ];

  for (const js of jsModules) {
    try {
      const res = await fetchUrl(js);
      assert(res.status === 200 && res.data.length > 50, `${js} -> Loaded (${res.data.length} bytes)`);
    } catch (err) {
      assert(false, `${js} request error: ${err.message}`);
    }
  }

  // 3. Verify JSON Data Files
  console.log('\n3. Checking JSON Data Files:');
  const jsonFiles = [
    '/data/cuisines.json',
    '/data/nutrition-data.json',
    '/data/ingredient-prices.json',
    '/data/categories.json',
    '/data/glossary.json',
    '/data/translations.json',
    '/data/recipes/breakfast.json',
    '/data/recipes/lunch.json',
    '/data/recipes/dinner.json',
    '/data/recipes/snacks.json',
    '/data/recipes/desserts.json',
    '/data/recipes/starters.json',
    '/data/recipes/drinks.json',
    '/data/recipes/chutneys.json',
    '/data/recipes/healthy-food.json',
    '/data/recipes/special-occasions.json'
  ];

  for (const jsonPath of jsonFiles) {
    try {
      const res = await fetchUrl(jsonPath);
      let parsed = null;
      try {
        parsed = JSON.parse(res.data);
      } catch (e) {
        // parse error
      }
      assert(res.status === 200 && parsed !== null, `${jsonPath} -> Valid JSON (${Array.isArray(parsed) ? parsed.length + ' items' : 'Object'})`);
    } catch (err) {
      assert(false, `${jsonPath} request error: ${err.message}`);
    }
  }

  // 4. Verify Cuisines Data
  console.log('\n4. Verifying Cuisine Data Completeness:');
  const cuisinesJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/cuisines.json'), 'utf8'));
  const allCuisines = cuisinesJson.cuisines || [];
  const indianCuisines = allCuisines.filter(c => c.category === 'Indian');
  const intlCuisines = allCuisines.filter(c => c.category === 'International');

  assert(indianCuisines.length === 8, `Indian Cuisines has 8 regions (got ${indianCuisines.length})`);
  assert(intlCuisines.length === 8, `International Cuisines has 8 regions (got ${intlCuisines.length})`);
  
  const indianIds = indianCuisines.map(c => c.id);
  const intlIds = intlCuisines.map(c => c.id);
  assert(indianIds.includes('telugu') && indianIds.includes('andhra') && indianIds.includes('telangana'), 'Has Telugu, Andhra, Telangana');
  assert(intlIds.includes('italian') && intlIds.includes('chinese') && intlIds.includes('mexican'), 'Has Italian, Chinese, Mexican');

  // 5. Test Nutrition Calculation Logic
  console.log('\n5. Verifying Nutrition Calculation Logic:');
  const nutritionJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/nutrition-data.json'), 'utf8'));
  const nutritionItems = nutritionJson.items || [];
  const dinnerRecipes = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/recipes/dinner.json'), 'utf8'));
  const pbm = dinnerRecipes.find(r => r.slug === 'paneer-butter-masala');

  assert(pbm !== undefined, 'Found Paneer Butter Masala recipe');
  const hasPaneerNut = nutritionItems.some(i => i.aliases.includes('paneer'));
  const hasButterNut = nutritionItems.some(i => i.aliases.includes('butter'));
  const hasTomatoNut = nutritionItems.some(i => i.aliases.includes('tomato'));
  assert(hasPaneerNut && hasButterNut && hasTomatoNut, 'Nutrition database contains key ingredients');

  // Match items using aliases
  let totalCal = 0;
  pbm.ingredients.forEach(item => {
    const rawName = typeof item.name === 'object' ? (item.name.en || '') : (item.item || item.name || '');
    const text = String(rawName).toLowerCase();
    const match = nutritionItems.find(n => n.aliases.some(a => text.includes(a)));
    if (match) {
      totalCal += match.calories * 0.5;
    }
  });
  assert(totalCal > 0, `Paneer Butter Masala estimated total calories > 0 (Calculated approx ${Math.round(totalCal)} kcal)`);

  // 6. Test Budget Calculation Logic
  console.log('\n6. Verifying Budget Calculation Logic:');
  const priceJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/ingredient-prices.json'), 'utf8'));
  const priceItems = priceJson.items || [];
  const hasPaneerPrice = priceItems.some(i => i.aliases.includes('paneer'));
  const hasOnionPrice = priceItems.some(i => i.aliases.includes('onion'));
  const hasButterPrice = priceItems.some(i => i.aliases.includes('butter'));
  assert(hasPaneerPrice && hasOnionPrice && hasButterPrice, 'Price database contains staple ingredients');

  let recipeCost = 0;
  pbm.ingredients.forEach(item => {
    const rawName = typeof item.name === 'object' ? (item.name.en || '') : (item.item || item.name || '');
    const text = String(rawName).toLowerCase();
    const match = priceItems.find(p => p.aliases.some(a => text.includes(a)));
    if (match) {
      recipeCost += (match.pricePerGram || 0.1) * (item.quantity || 50);
    }
  });
  assert(recipeCost > 0, `Estimated dish cost > 0 (Calculated approx ₹${Math.round(recipeCost)})`);

  // 7. Verify Attribution
  console.log('\n7. Verifying Brand Attribution:');
  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert(indexHtml.includes('Cook With Krushi'), 'Index contains brand "Cook With Krushi"');
  assert(indexHtml.includes('Damayanti Technologies'), 'Index contains "Damayanti Technologies" attribution');
  assert(indexHtml.includes('Cook. Learn. Enjoy.'), 'Index contains tagline "Cook. Learn. Enjoy."');

  console.log(`\n=== SUMMARY: ${passCount} PASSED, ${failCount} FAILED ===\n`);
  process.exit(failCount > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error('Test run error:', err);
  process.exit(1);
});
