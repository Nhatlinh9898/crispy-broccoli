const fs = require('fs');

// Read 5000 generator content
const gen5000Content = fs.readFileSync('src/js/product-generator-5000.js', 'utf8');
const gen5000Matches = gen5000Content.match(/products: (\d+)/g) || [];
let gen5000Total = 0;
gen5000Matches.forEach(match => {
    const num = parseInt(match.split(': ')[1]);
    gen5000Total += num;
});

console.log('=== 5000 GENERATOR ANALYSIS ===');
console.log('Total categories:', gen5000Matches.length);
console.log('Total products:', gen5000Total);

// Show new categories added
console.log('\n=== NEW CATEGORIES IN 5000 GENERATOR ===');
const gen5000Lines = gen5000Content.split('\n');
const newCategories5000 = [];
let inPhase1Section = false;

gen5000Lines.forEach((line, index) => {
    if (line.includes('// NEW CATEGORIES - PHASE 1: Industrial Components')) {
        inPhase1Section = true;
    }
    if (inPhase1Section && line.includes('products:')) {
        const categoryMatch = line.match(/(\w+): \{[^}]+products: (\d+)/);
        if (categoryMatch) {
            newCategories5000.push({
                name: categoryMatch[1],
                products: parseInt(categoryMatch[2])
            });
        }
    }
});

newCategories5000.forEach(cat => {
    console.log(`${cat.name}: ${cat.products} products`);
});

console.log('\nTotal Phase 1 category products:', newCategories5000.reduce((sum, cat) => sum + cat.products, 0));
console.log('Target: 5000+ products');
console.log('Current progress:', gen5000Total, 'products');
console.log('Remaining to reach 5000:', 5000 - gen5000Total, 'products');
