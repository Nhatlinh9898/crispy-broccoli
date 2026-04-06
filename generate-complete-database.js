/**
 * Generate and save the complete database with Fuses & PCBs
 */

const UltimateProductGenerator = require('./src/js/product-generator-1000.js');
const fs = require('fs');

console.log('🚀 Generating complete database with Fuses & PCBs...\n');

try {
    const generator = new UltimateProductGenerator();
    const completeDatabase = generator.exportToJSON();
    
    // Save to file
    const filename = 'complete-product-database-with-fuses-pcbs.json';
    fs.writeFileSync(filename, JSON.stringify(completeDatabase, null, 2));
    
    console.log('✅ Database generated successfully!');
    console.log(`📊 Total products: ${completeDatabase.metadata.total_products}`);
    console.log(`💾 Saved to: ${filename}`);
    
    // Show summary by category
    const categoryCounts = {};
    completeDatabase.products.forEach(product => {
        const categoryId = product.category_id;
        const categoryName = product.subcategory_en || categoryId;
        categoryCounts[categoryId] = {
            name: categoryName,
            count: (categoryCounts[categoryId]?.count || 0) + 1
        };
    });
    
    console.log('\n📈 Products by category:');
    Object.entries(categoryCounts)
        .sort(([,a], [,b]) => b.count - a.count)
        .forEach(([id, info]) => {
            console.log(`   ${info.name}: ${info.count} products`);
        });
    
    // Show some sample products from each new category
    const fuses = completeDatabase.products.filter(p => p.category_id === 'cat_fuses');
    const pcbs = completeDatabase.products.filter(p => p.category_id === 'cat_pcbs');
    
    console.log('\n🔌 Sample Fuses:');
    fuses.slice(0, 2).forEach((fuse, index) => {
        console.log(`   ${index + 1}. ${fuse.name_en}`);
        console.log(`      Price: ${fuse.pricing.base_price} VND`);
        console.log(`      Spec: ${fuse.specifications.basic.rated_current}, ${fuse.specifications.basic.rated_voltage}`);
    });
    
    console.log('\n🔧 Sample PCBs:');
    pcbs.slice(0, 2).forEach((pcb, index) => {
        console.log(`   ${index + 1}. ${pcb.name_en}`);
        console.log(`      Price: ${pcb.pricing.base_price} VND`);
        console.log(`      Spec: ${pcb.specifications.basic.layers} layers, ${pcb.specifications.basic.material}`);
    });
    
    console.log('\n🎉 Fuses & PCBs implementation completed successfully!');
    console.log('📝 Ready for integration with the main system.');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
}
