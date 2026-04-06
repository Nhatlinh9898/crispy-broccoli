/**
 * Test script for Ultimate Product Generator 2000
 * Generates and validates 2000+ products
 */

const UltimateProductGenerator2000 = require('./src/js/product-generator-2000.js');

function testProductGenerator2000() {
    console.log('=== Ultimate Product Generator 2000 Test ===\n');
    
    // Initialize generator
    const generator = new UltimateProductGenerator2000();
    
    // Get statistics
    const totalCategories = Object.keys(generator.categories).length;
    const totalManufacturers = Object.keys(generator.manufacturers).length;
    const expectedProducts = generator.getTotalProductCount();
    
    console.log('Generator Statistics:');
    console.log(`- Total Categories: ${totalCategories}`);
    console.log(`- Total Manufacturers: ${totalManufacturers}`);
    console.log(`- Expected Products: ${expectedProducts}`);
    console.log('');
    
    // Generate products
    console.log('Generating products...');
    const startTime = Date.now();
    const products = generator.generateAllProducts();
    const endTime = Date.now();
    
    console.log(`Generated ${products.length} products in ${endTime - startTime}ms`);
    console.log('');
    
    // Validate products
    console.log('Validating products...');
    let validProducts = 0;
    let invalidProducts = 0;
    const errors = [];
    
    products.forEach((product, index) => {
        try {
            // Check required fields
            const requiredFields = ['id', 'sku', 'name', 'name_en', 'name_ja', 'category_id', 'manufacturer_id', 'part_number'];
            let isValid = true;
            
            for (const field of requiredFields) {
                if (!product[field]) {
                    isValid = false;
                    errors.push(`Product ${index + 1}: Missing ${field}`);
                    break;
                }
            }
            
            if (isValid) {
                validProducts++;
            } else {
                invalidProducts++;
            }
        } catch (error) {
            invalidProducts++;
            errors.push(`Product ${index + 1}: ${error.message}`);
        }
    });
    
    console.log(`Valid Products: ${validProducts}`);
    console.log(`Invalid Products: ${invalidProducts}`);
    
    if (errors.length > 0) {
        console.log('\nFirst 10 errors:');
        errors.slice(0, 10).forEach(error => console.log(`- ${error}`));
    }
    
    // Category breakdown
    console.log('\nCategory Breakdown:');
    const categoryCount = {};
    products.forEach(product => {
        const category = generator.categories[product.category_id];
        if (category) {
            categoryCount[category.name] = (categoryCount[category.name] || 0) + 1;
        }
    });
    
    Object.entries(categoryCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .forEach(([category, count]) => {
            console.log(`- ${category}: ${count} products`);
        });
    
    // Manufacturer breakdown
    console.log('\nManufacturer Breakdown:');
    const manufacturerCount = {};
    products.forEach(product => {
        const manufacturer = generator.manufacturers[product.manufacturer_id];
        if (manufacturer) {
            manufacturerCount[manufacturer.name] = (manufacturerCount[manufacturer.name] || 0) + 1;
        }
    });
    
    Object.entries(manufacturerCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .forEach(([manufacturer, count]) => {
            console.log(`- ${manufacturer}: ${count} products`);
        });
    
    // Export to JSON
    console.log('\nExporting to JSON...');
    const jsonData = generator.exportToJSON();
    const parsedData = JSON.parse(jsonData);
    
    console.log(`JSON Export Summary:`);
    console.log(`- Total Products: ${parsedData.metadata.total_products}`);
    console.log(`- Total Categories: ${parsedData.metadata.total_categories}`);
    console.log(`- Total Manufacturers: ${parsedData.metadata.total_manufacturers}`);
    
    // Write to file
    const fs = require('fs');
    fs.writeFileSync('generated-products-2000.json', JSON.stringify(parsedData, null, 2));
    console.log('Saved to: generated-products-2000.json');
    
    console.log('\n=== Test Complete ===');
    console.log(`✅ Successfully generated ${validProducts} valid products`);
    console.log(`📊 Total categories: ${totalCategories}`);
    console.log(`🏭 Total manufacturers: ${totalManufacturers}`);
    
    if (invalidProducts > 0) {
        console.log(`⚠️  Found ${invalidProducts} invalid products`);
    }
    
    return {
        success: invalidProducts === 0,
        totalProducts: products.length,
        validProducts: validProducts,
        invalidProducts: invalidProducts,
        categories: totalCategories,
        manufacturers: totalManufacturers
    };
}

// Run test if called directly
if (require.main === module) {
    testProductGenerator2000();
}

module.exports = testProductGenerator2000;
