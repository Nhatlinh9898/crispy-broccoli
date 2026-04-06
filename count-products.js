const fs = require('fs');

// Read ultimate generator
const ultimateContent = fs.readFileSync('src/js/product-generator-ultimate.js', 'utf8');
const ultimateMatches = ultimateContent.match(/products: (\d+)/g) || [];
let ultimateTotal = 0;
ultimateMatches.forEach(match => {
    const num = parseInt(match.split(': ')[1]);
    ultimateTotal += num;
});

// Read 2000 generator
const gen2000Content = fs.readFileSync('src/js/product-generator-2000.js', 'utf8');
const gen2000Matches = gen2000Content.match(/products: (\d+)/g) || [];
let gen2000Total = 0;
gen2000Matches.forEach(match => {
    const num = parseInt(match.split(': ')[1]);
    gen2000Total += num;
});

console.log('=== PRODUCT COUNT ANALYSIS ===');
console.log('Ultimate Generator (85 categories):', ultimateTotal, 'products');
console.log('2000 Generator (105+ categories):', gen2000Total, 'products');
console.log('Difference:', gen2000Total - ultimateTotal, 'additional products');
console.log('Categories added:', gen2000Matches.length - ultimateMatches.length);

// Show new categories in 2000 generator
console.log('\n=== NEW CATEGORIES IN 2000 GENERATOR ===');
const gen2000Lines = gen2000Content.split('\n');
const newCategories = [];
let inNewSection = false;

gen2000Lines.forEach((line, index) => {
    if (line.includes('// NEW CATEGORIES - 500+ additional products')) {
        inNewSection = true;
    }
    if (inNewSection && line.includes('products:')) {
        const categoryMatch = line.match(/(\w+): \{[^}]+products: (\d+)/);
        if (categoryMatch) {
            newCategories.push({
                name: categoryMatch[1],
                products: parseInt(categoryMatch[2])
            });
        }
    }
});

newCategories.forEach(cat => {
    console.log(`${cat.name}: ${cat.products} products`);
});

console.log('\nTotal new category products:', newCategories.reduce((sum, cat) => sum + cat.products, 0));
