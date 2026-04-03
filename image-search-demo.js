// Image Search and Product Processing Demo
// Demo cho hệ thống tìm kiếm và xử lý hình ảnh sản phẩm

const { ImageSearchEngine, ImageProcessor, ProductImageProcessor } = require('./image-search-processor.js');

// Demo functions
async function demonstrateImageSearch() {
  console.log('=== IMAGE SEARCH ENGINE DEMO ===\n');

  const searchEngine = new ImageSearchEngine({
    googleApiKey: process.env.GOOGLE_API_KEY,
    searchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID,
    bingApiKey: process.env.BING_API_KEY,
    unsplashApiKey: process.env.UNSPLASH_API_KEY,
    maxResults: 10
  });

  // Test different search queries
  const searchQueries = [
    'product photography electronics',
    'fashion clothing white background',
    'food photography professional',
    'furniture modern design'
  ];

  for (const query of searchQueries) {
    console.log(`🔍 Searching for: "${query}"`);
    
    try {
      const results = await searchEngine.searchImages(query, {
        maxResults: 5,
        imageType: 'photo',
        safeSearch: 'off'
      });

      console.log(`📊 Results Summary:`);
      console.log(`   Total Images: ${results.totalResults}`);
      console.log(`   Sources: ${results.sources.join(', ')}`);
      console.log(`   Search Time: ${results.metadata.searchTime.toFixed(2)}ms`);

      if (results.metadata.errors.length > 0) {
        console.log(`   ⚠️ Errors: ${results.metadata.errors.length}`);
      }

      console.log(`\n📋 Top Images:`);
      results.images.slice(0, 3).forEach((image, index) => {
        console.log(`   ${index + 1}. ${image.title}`);
        console.log(`      URL: ${image.url}`);
        console.log(`      Size: ${image.width}×${image.height}px`);
        console.log(`      Source: ${image.source}`);
        if (image.author) {
          console.log(`      Author: ${image.author}`);
        }
        console.log(`      File Size: ${image.fileSize}`);
        console.log('');
      });

    } catch (error) {
      console.log(`❌ Search failed: ${error.message}`);
    }

    console.log('---\n');
  }
}

async function demonstrateBasicImageProcessing() {
  console.log('=== BASIC IMAGE PROCESSING DEMO ===\n');

  const processor = new ImageProcessor({
    maxImageSize: 1024,
    compressionQuality: 0.8,
    enableResize: true,
    enableCompress: true,
    enableEnhance: true,
    enableAnalyze: true
  });

  // Test URLs (sample images)
  const testImages = [
    'https://picsum.photos/seed/product1/800/600.jpg',
    'https://picsum.photos/seed/electronics/1200/800.jpg',
    'https://picsum.photos/seed/fashion/600/800.jpg'
  ];

  for (const imageUrl of testImages) {
    console.log(`🖼️ Processing image: ${imageUrl}`);
    
    try {
      const result = await processor.processImage(imageUrl, {
        targetSize: { width: 400, height: 300 },
        quality: 0.7,
        enhancement: {
          brightness: 110,
          contrast: 105,
          saturation: 110
        }
      });

      console.log(`📊 Processing Results:`);
      console.log(`   Original: ${result.original.width}×${result.original.height}px (${result.original.format})`);
      console.log(`   Processing Time: ${result.metadata.processingTime.toFixed(2)}ms`);
      console.log(`   Operations: ${result.metadata.operations.join(', ')}`);

      if (result.processed.resized) {
        console.log(`   Resized: ${result.processed.resized.width}×${result.processed.resized.height}px`);
      }

      if (result.processed.compressed) {
        console.log(`   Compressed: Quality ${result.processed.compressed.quality}, Size ~${result.processed.compressed.estimatedSize} bytes`);
      }

      if (result.analysis.colors) {
        console.log(`   Color Analysis:`);
        console.log(`     Average RGB: (${result.analysis.colors.average.r}, ${result.analysis.colors.average.g}, ${result.analysis.colors.average.b})`);
        console.log(`     Brightness: ${(result.analysis.colors.brightness.average * 100).toFixed(1)}%`);
        console.log(`     Saturation: ${(result.analysis.colors.saturation * 100).toFixed(1)}%`);
        console.log(`     Dominant Colors: ${result.analysis.colors.dominant.slice(0, 3).map(c => c.hex).join(', ')}`);
      }

      if (result.analysis.edges) {
        console.log(`   Edge Analysis:`);
        console.log(`     Edge Density: ${(result.analysis.edges.edgeDensity * 100).toFixed(2)}%`);
        console.log(`     Has Strong Edges: ${result.analysis.edges.hasStrongEdges}`);
      }

      if (result.analysis.quality) {
        console.log(`   Quality Assessment:`);
        console.log(`     Overall Score: ${result.analysis.quality.score.overall.toFixed(1)}/100`);
        console.log(`     Grade: ${result.analysis.quality.grade}`);
        if (result.analysis.quality.recommendations.length > 0) {
          console.log(`     Recommendations: ${result.analysis.quality.recommendations.join(', ')}`);
        }
      }

    } catch (error) {
      console.log(`❌ Processing failed: ${error.message}`);
    }

    console.log('---\n');
  }
}

async function demonstrateProductImageProcessing() {
  console.log('=== PRODUCT IMAGE PROCESSING DEMO ===\n');

  const productProcessor = new ProductImageProcessor({
    maxImageSize: 1024,
    compressionQuality: 0.85,
    enableBackgroundRemoval: true,
    enableWatermarkDetection: true,
    enableProductClassification: true
  });

  // Test product images with different categories
  const productTests = [
    {
      url: 'https://picsum.photos/seed/laptop/800/600.jpg',
      category: 'electronics',
      name: 'Laptop Product'
    },
    {
      url: 'https://picsum.photos/seed/shirt/600/800.jpg',
      category: 'fashion',
      name: 'Shirt Product'
    },
    {
      url: 'https://picsum.photos/seed/chair/800/600.jpg',
      category: 'furniture',
      name: 'Chair Product'
    }
  ];

  for (const product of productTests) {
    console.log(`🛍️ Processing product: ${product.name}`);
    console.log(`   Category: ${product.category}`);
    console.log(`   URL: ${product.url}`);
    
    try {
      const result = await productProcessor.processProductImage(product.url, product.category);

      console.log(`📊 Product Analysis Results:`);
      console.log(`   Processing Time: ${result.metadata.processingTime.toFixed(2)}ms`);
      console.log(`   Image Quality: ${result.analysis.quality.grade} (${result.analysis.quality.score.overall.toFixed(1)}/100)`);

      if (result.productAnalysis) {
        console.log(`\n🏷️ Product Classification:`);
        console.log(`   Detected Category: ${result.productAnalysis.category}`);
        console.log(`   Suitability Grade: ${result.productAnalysis.suitability.grade}`);
        console.log(`   Is Suitable: ${result.productAnalysis.suitability.isSuitable}`);

        console.log(`\n🎨 Background Analysis:`);
        console.log(`   Is Uniform: ${result.productAnalysis.background.isUniform}`);
        console.log(`   Is Light: ${result.productAnalysis.background.isLight}`);
        console.log(`   Recommendation: ${result.productAnalysis.background.recommendation}`);

        console.log(`\n💡 Lighting Analysis:`);
        console.log(`   Is Well Lit: ${result.productAnalysis.lighting.isWellLit}`);
        console.log(`   Color Temperature: ${result.productAnalysis.lighting.colorTemperature}`);
        console.log(`   Recommendation: ${result.productAnalysis.lighting.recommendation}`);

        console.log(`\n📐 Composition Analysis:`);
        console.log(`   Is Centered: ${result.productAnalysis.composition.isCentered}`);
        console.log(`   Follows Rule of Thirds: ${result.productAnalysis.composition.followsRuleOfThirds}`);
        console.log(`   Has Good Focus: ${result.productAnalysis.composition.hasGoodFocus}`);
        console.log(`   Recommendation: ${result.productAnalysis.composition.recommendation}`);

        console.log(`\n📈 Marketability Assessment:`);
        console.log(`   Marketability Score: ${result.productAnalysis.marketability.score.toFixed(1)}/100`);
        console.log(`   Grade: ${result.productAnalysis.marketability.grade}`);
        console.log(`   Is Marketable: ${result.productAnalysis.marketability.is Marketable}`);
        
        if (result.productAnalysis.marketability.potentialIssues.length > 0) {
          console.log(`   Potential Issues: ${result.productAnalysis.marketability.potentialIssues.join(', ')}`);
        }
        
        if (result.productAnalysis.marketability.improvements.length > 0) {
          console.log(`   Suggested Improvements: ${result.productAnalysis.marketability.improvements.join(', ')}`);
        }
      }

      if (result.recommendations.length > 0) {
        console.log(`\n💬 Overall Recommendations:`);
        result.recommendations.forEach((rec, index) => {
          console.log(`   ${index + 1}. ${rec}`);
        });
      }

    } catch (error) {
      console.log(`❌ Product processing failed: ${error.message}`);
    }

    console.log('---\n');
  }
}

async function demonstrateBatchImageProcessing() {
  console.log('=== BATCH IMAGE PROCESSING DEMO ===\n');

  const processor = new ImageProcessor({
    maxImageSize: 800,
    compressionQuality: 0.75
  });

  // Batch process multiple images
  const imageUrls = [
    'https://picsum.photos/seed/batch1/600/400.jpg',
    'https://picsum.photos/seed/batch2/800/600.jpg',
    'https://picsum.photos/seed/batch3/400/600.jpg',
    'https://picsum.photos/seed/batch4/1000/800.jpg',
    'https://picsum.photos/seed/batch5/500/500.jpg'
  ];

  console.log(`🔄 Processing ${imageUrls.length} images in batch...`);
  
  const startTime = performance.now();
  const results = [];
  
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    console.log(`   Processing image ${i + 1}/${imageUrls.length}: ${url}`);
    
    try {
      const result = await processor.processImage(url, {
        targetSize: { width: 400, height: 300 },
        analyze: true
      });
      
      results.push({
        index: i,
        url: url,
        success: true,
        result: result,
        processingTime: result.metadata.processingTime
      });
      
      console.log(`     ✅ Success - Quality: ${result.analysis.quality.grade}`);
      
    } catch (error) {
      results.push({
        index: i,
        url: url,
        success: false,
        error: error.message,
        processingTime: 0
      });
      
      console.log(`     ❌ Failed - ${error.message}`);
    }
  }
  
  const totalTime = performance.now() - startTime;
  const successCount = results.filter(r => r.success).length;
  const avgTime = results.reduce((sum, r) => sum + r.processingTime, 0) / results.length;
  
  console.log(`\n📊 Batch Processing Summary:`);
  console.log(`   Total Images: ${imageUrls.length}`);
  console.log(`   Successful: ${successCount}`);
  console.log(`   Failed: ${imageUrls.length - successCount}`);
  console.log(`   Total Time: ${totalTime.toFixed(2)}ms`);
  console.log(`   Average Time per Image: ${avgTime.toFixed(2)}ms`);
  
  // Quality distribution
  const qualityGrades = results
    .filter(r => r.success)
    .map(r => r.result.analysis.quality.grade);
  
  const gradeDistribution = {};
  qualityGrades.forEach(grade => {
    gradeDistribution[grade] = (gradeDistribution[grade] || 0) + 1;
  });
  
  console.log(`   Quality Distribution:`);
  Object.entries(gradeDistribution).forEach(([grade, count]) => {
    console.log(`     ${grade}: ${count} images`);
  });
  
  console.log('---\n');
}

async function demonstrateImageSearchAndProcess() {
  console.log('=== SEARCH AND PROCESS WORKFLOW DEMO ===\n');

  const searchEngine = new ImageSearchEngine({
    maxResults: 5
  });

  const processor = new ProductImageProcessor({
    maxImageSize: 600,
    compressionQuality: 0.8
  });

  const searchQuery = 'professional product photography white background';
  
  console.log(`🔍 Step 1: Searching for "${searchQuery}"...`);
  
  try {
    // Step 1: Search for images
    const searchResults = await searchEngine.searchImages(searchQuery, {
      maxResults: 3,
      imageType: 'photo'
    });

    console.log(`📊 Found ${searchResults.totalResults} images in ${searchResults.metadata.searchTime.toFixed(2)}ms`);

    // Step 2: Process top images
    console.log(`\n🔄 Step 2: Processing top images...`);
    
    for (let i = 0; i < Math.min(3, searchResults.images.length); i++) {
      const image = searchResults.images[i];
      console.log(`\n🖼️ Processing image ${i + 1}: ${image.title}`);
      
      try {
        const processResult = await processor.processProductImage(image.url);
        
        console.log(`   Quality: ${processResult.analysis.quality.grade}`);
        console.log(`   Marketability: ${processResult.productAnalysis.marketability.grade}`);
        console.log(`   Suitability: ${processResult.productAnalysis.suitability.grade}`);
        
        // Generate recommendations
        const recommendations = [];
        
        if (processResult.productAnalysis.marketability.score < 75) {
          recommendations.push('Image needs improvement for marketing');
        }
        
        if (processResult.productAnalysis.suitability.score.background < 70) {
          recommendations.push('Background could be cleaner');
        }
        
        if (processResult.analysis.quality.score.resolution < 70) {
          recommendations.push('Higher resolution recommended');
        }
        
        if (recommendations.length > 0) {
          console.log(`   💡 Recommendations: ${recommendations.join(', ')}`);
        } else {
          console.log(`   ✅ Image is ready for use`);
        }
        
      } catch (error) {
        console.log(`   ❌ Processing failed: ${error.message}`);
      }
    }

    // Step 3: Summary
    console.log(`\n📋 Workflow Summary:`);
    console.log(`   Search Query: "${searchQuery}"`);
    console.log(`   Images Found: ${searchResults.totalResults}`);
    console.log(`   Images Processed: ${Math.min(3, searchResults.images.length)}`);
    console.log(`   Total Workflow Time: ${(performance.now() - startTime).toFixed(2)}ms`);

  } catch (error) {
    console.log(`❌ Workflow failed: ${error.message}`);
  }
}

// Main execution function
async function runAllImageDemos() {
  try {
    console.log('🎯 IMAGE SEARCH AND PROCESSING DEMOS\n');
    console.log('='.repeat(50));
    
    await demonstrateImageSearch();
    await demonstrateBasicImageProcessing();
    await demonstrateProductImageProcessing();
    await demonstrateBatchImageProcessing();
    await demonstrateImageSearchAndProcess();
    
    console.log('\n🎉 All image demos completed!');
    
  } catch (error) {
    console.error('💥 Demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateImageSearch,
  demonstrateBasicImageProcessing,
  demonstrateProductImageProcessing,
  demonstrateBatchImageProcessing,
  demonstrateImageSearchAndProcess,
  runAllImageDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllImageDemos();
}
