/**
 * Test the Fuses & PCBs implementation
 */

const UltimateProductGenerator = require('./src/js/product-generator-1000.js');

console.log('Testing Ultimate Product Generator with Fuses & PCBs...\n');

try {
    const generator = new UltimateProductGenerator();
    const database = generator.exportToJSON();
    
    console.log('✅ Generator initialized successfully!');
    console.log(`📊 Total products generated: ${database.metadata.total_products}`);
    console.log(`📅 Generation date: ${database.metadata.generated_date}`);
    console.log(`📝 Version: ${database.metadata.version}`);
    
    // Count products by category
    const categoryCounts = {};
    database.products.forEach(product => {
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
    
    // Show sample Fuses
    const fuses = database.products.filter(p => p.category_id === 'cat_fuses');
    console.log('\n🔌 Sample Fuses:');
    fuses.slice(0, 3).forEach((fuse, index) => {
        console.log(`   ${index + 1}. ${fuse.name} - ${fuse.pricing.base_price} VND`);
        console.log(`      Spec: ${fuse.specifications.basic.rated_current}, ${fuse.specifications.basic.rated_voltage}`);
    });
    
    // Show sample PCBs
    const pcbs = database.products.filter(p => p.category_id === 'cat_pcbs');
    console.log('\n🔧 Sample PCBs:');
    pcbs.slice(0, 3).forEach((pcb, index) => {
        console.log(`   ${index + 1}. ${pcb.name} - ${pcb.pricing.base_price} VND`);
        console.log(`      Spec: ${pcb.specifications.basic.layers} layers, ${pcb.specifications.basic.material}`);
    });
    
    // Verify we have the expected number of fuses and PCBs
    const expectedFuses = 40;
    const expectedPCBs = 50;
    
    console.log('\n✅ Verification:');
    console.log(`   Fuses generated: ${fuses.length}/${expectedFuses} ${fuses.length === expectedFuses ? '✅' : '❌'}`);
    console.log(`   PCBs generated: ${pcbs.length}/${expectedPCBs} ${pcbs.length === expectedPCBs ? '✅' : '❌'}`);
    
    if (fuses.length === expectedFuses && pcbs.length === expectedPCBs) {
        console.log('\n🎉 Fuses & PCBs implementation completed successfully!');
    } else {
        console.log('\n❌ Some products may be missing.');
    }
    
} catch (error) {
    console.error('❌ Error testing generator:', error.message);
    console.error(error.stack);
}
