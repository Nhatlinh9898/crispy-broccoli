// Demo script for Web Content Extraction
// Chạy thử nghiệm khả năng đọc nội dung từ các URL tìm thấy

const { WebContentExtractor, WebContentProcessor, WebSearchService } = require('./layer-implementation-code.js');

// Cấu hình cho content extraction
const extractionConfig = {
  extractor: {
    timeout: 15000,
    maxContentSize: 2000000, // 2MB
    userAgent: 'Mozilla/5.0 (compatible; ContentExtractor/1.0)'
  },
  webSearch: {
    defaultEngine: 'google',
    google: {
      apiKey: process.env.GOOGLE_API_KEY || 'demo-key',
      searchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID || 'demo-engine-id'
    },
    duckduckgo: {}
  }
};

async function demonstrateContentExtraction() {
  console.log('=== WEB CONTENT EXTRACTION DEMO ===\n');

  const extractor = new WebContentExtractor(extractionConfig.extractor);

  // Test URLs with different content types
  const testUrls = [
    'https://example.com',
    'https://httpbin.org/json',
    'https://httpbin.org/xml',
    'https://www.wikipedia.org/wiki/Artificial_intelligence'
  ];

  for (const url of testUrls) {
    console.log(`📖 Extracting content from: ${url}`);
    
    try {
      const result = await extractor.extractContent(url);
      
      if (result.success) {
        console.log(`✅ Extraction successful`);
        console.log(`📄 Content Type: ${result.contentType}`);
        console.log(`📝 Title: ${result.title}`);
        console.log(`📊 Content Length: ${result.content.length} characters`);
        
        if (result.metadata && Object.keys(result.metadata).length > 0) {
          console.log(`📋 Metadata keys: ${Object.keys(result.metadata).join(', ')}`);
        }
        
        if (result.links && result.links.length > 0) {
          console.log(`🔗 Links found: ${result.links.length}`);
          console.log(`   External links: ${result.links.filter(l => l.isExternal).length}`);
        }
        
        if (result.images && result.images.length > 0) {
          console.log(`🖼️ Images found: ${result.images.length}`);
        }
        
        // Show content preview
        const preview = result.content.substring(0, 200);
        console.log(`📖 Content preview: "${preview}..."`);
        
      } else {
        console.log(`❌ Extraction failed: ${result.error}`);
      }
      
    } catch (error) {
      console.error(`💥 Unexpected error: ${error.message}`);
    }
    
    console.log('─'.repeat(80) + '\n');
  }
}

async function demonstrateBatchExtraction() {
  console.log('=== BATCH CONTENT EXTRACTION DEMO ===\n');

  const processor = new WebContentProcessor({
    processorType: 'batch_extract',
    extractor: extractionConfig.extractor
  });

  // Test URLs for batch extraction
  const testUrls = [
    'https://example.com',
    'https://httpbin.org/json',
    'https://httpbin.org/uuid',
    'https://www.wikipedia.org/wiki/Machine_learning'
  ];

  const input = {
    urls: testUrls,
    maxConcurrent: 2,
    extractionOptions: {
      timeout: 10000
    }
  };

  console.log(`🔄 Processing ${testUrls.length} URLs concurrently...`);
  
  try {
    const result = await processor.process(input);
    
    if (result.extractionPerformed) {
      const batchResults = result.batchExtractionResults;
      console.log(`✅ Batch extraction completed`);
      console.log(`📊 Results summary:`);
      console.log(`   - Total URLs: ${batchResults.total}`);
      console.log(`   - Successful: ${batchResults.successful}`);
      console.log(`   - Failed: ${batchResults.failed}`);
      console.log(`   - Success Rate: ${batchResults.successRate}`);
      
      console.log(`\n📋 Detailed Results:`);
      batchResults.results.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.url}`);
        if (item.success) {
          console.log(`      ✅ Success - ${item.contentType} - ${item.content.length} chars`);
          if (item.title) {
            console.log(`      📝 Title: ${item.title}`);
          }
        } else {
          console.log(`      ❌ Failed: ${item.error}`);
        }
      });
    } else {
      console.log(`❌ Batch extraction failed: ${result.extractionError}`);
    }
    
  } catch (error) {
    console.error(`💥 Batch extraction error: ${error.message}`);
  }
}

async function demonstrateSearchAndExtract() {
  console.log('=== SEARCH AND EXTRACT DEMO ===\n');

  const processor = new WebContentProcessor({
    processorType: 'search_extract',
    extractor: extractionConfig.extractor,
    webSearch: extractionConfig.webSearch
  });

  const testQueries = [
    'artificial intelligence healthcare applications',
    'machine learning in medicine',
    'AI medical diagnosis'
  ];

  for (const query of testQueries) {
    console.log(`🔍 Searching and extracting for: "${query}"`);
    
    const input = {
      query: query,
      maxResults: 5,
      extractCount: 3,
      searchOptions: {
        engine: 'duckduckgo' // Using free engine for demo
      },
      extractionOptions: {
        timeout: 10000
      }
    };

    try {
      const result = await processor.process(input);
      
      if (result.searchAndExtractPerformed) {
        console.log(`✅ Search and extract completed`);
        console.log(`🔍 Search results: ${result.searchResults.items.length}`);
        console.log(`📖 Extracted contents: ${result.extractedContents.length}`);
        
        // Show combined results
        result.extractedContents.forEach((item, index) => {
          console.log(`\n   ${index + 1}. ${item.title}`);
          console.log(`      🔗 ${item.link}`);
          console.log(`      📊 Relevance: ${item.relevance?.toFixed(2) || 'N/A'}`);
          
          if (item.extractedContent?.success) {
            const extracted = item.extractedContent;
            console.log(`      ✅ Content extracted: ${extracted.content.length} chars`);
            console.log(`      📝 Extracted title: ${extracted.title || 'No title'}`);
            
            // Show content preview
            const preview = extracted.content.substring(0, 100);
            console.log(`      📖 Preview: "${preview}..."`);
          } else {
            console.log(`      ❌ Extraction failed: ${item.extractedContent?.error || 'Unknown error'}`);
          }
        });
        
      } else {
        console.log(`❌ Search and extract failed: ${result.searchAndExtractError}`);
      }
      
    } catch (error) {
      console.error(`💥 Search and extract error: ${error.message}`);
    }
    
    console.log('─'.repeat(80) + '\n');
  }
}

async function demonstrateLayerIntegrationWithExtraction() {
  console.log('=== LAYER INTEGRATION WITH CONTENT EXTRACTION DEMO ===\n');

  const { PipelineManager } = require('./layer-implementation-code.js');

  // Cấu hình pipeline với content extraction
  const pipelineConfig = {
    mode: 'sequential',
    quality: 'high',
    webSearch: extractionConfig.webSearch,
    contentExtraction: extractionConfig.extractor
  };

  const pipelineManager = new PipelineManager(pipelineConfig);

  // Cấu hình lại các tầng để sử dụng content extraction
  for (let i = 11; i <= 15; i++) {
    const layer = pipelineManager.layers[i - 1];
    layer.config.processing.processorType = 'extract';
    layer.config.processing.extractor = extractionConfig.extractor;
  }

  // Test input with URLs
  const testInput = {
    topic: 'artificial intelligence in healthcare',
    contentType: 'research_summary',
    urls: [
      'https://example.com/ai-healthcare',
      'https://example.com/machine-learning-medicine'
    ],
    extractionOptions: {
      timeout: 8000,
      maxContentSize: 500000
    }
  };

  console.log(`🚀 Running pipeline with content extraction...`);
  console.log(`📋 Input URLs: ${testInput.urls.length}`);

  try {
    // Chạy các tầng 1-15 để demo
    const results = [];
    let currentData = testInput;

    for (let i = 0; i < 15; i++) {
      const layer = pipelineManager.layers[i];
      console.log(`⚙️ Processing Layer ${layer.layerId}: ${layer.config.processing.processorType}`);
      
      const result = await layer.process(currentData);
      results.push(result);

      if (result.success) {
        currentData = result.data;
        
        if (result.data.extractedContent?.success) {
          console.log(`✅ Layer ${layer.layerId} extracted: ${result.data.extractedContent.content.length} chars`);
        } else if (result.data.webSearchResults) {
          console.log(`✅ Layer ${layer.layerId} found: ${result.data.webSearchResults.items.length} search results`);
        } else {
          console.log(`✅ Layer ${layer.layerId} completed successfully`);
        }
      } else {
        console.log(`❌ Layer ${layer.layerId} failed: ${result.error}`);
        break;
      }
    }

    console.log('\n📈 Final Pipeline Results:');
    console.log(`✅ Completed layers: ${results.filter(r => r.success).length}/15`);
    
    // Check for extracted content
    const extractedContents = results.filter(r => 
      r.success && r.data.extractedContent?.success
    );
    
    if (extractedContents.length > 0) {
      console.log(`📖 Total content extracted: ${extractedContents.length} layers`);
      const totalChars = extractedContents.reduce((sum, r) => 
        sum + r.data.extractedContent.content.length, 0
      );
      console.log(`📊 Total characters extracted: ${totalChars}`);
    }

  } catch (error) {
    console.error(`❌ Pipeline demo failed: ${error.message}`);
  }
}

async function demonstrateContentAnalysis() {
  console.log('=== CONTENT ANALYSIS DEMO ===\n');

  const extractor = new WebContentExtractor(extractionConfig.extractor);

  // Test with a real website (using a simple example)
  const testUrl = 'https://example.com';

  try {
    console.log(`📖 Extracting and analyzing: ${testUrl}`);
    const result = await extractor.extractContent(testUrl);
    
    if (result.success) {
      console.log(`✅ Content extracted successfully\n`);
      
      // Analyze content
      const analysis = {
        wordCount: result.content.split(/\s+/).length,
        sentenceCount: result.content.split(/[.!?]+/).length,
        paragraphCount: result.content.split(/\n\n+/).length,
        avgWordsPerSentence: 0,
        readabilityScore: 0,
        keywordDensity: {},
        hasImages: result.images.length > 0,
        hasExternalLinks: result.links.some(l => l.isExternal),
        hasStructuredData: Object.keys(result.structuredData).length > 0
      };

      // Calculate average words per sentence
      if (analysis.sentenceCount > 0) {
        analysis.avgWordsPerSentence = analysis.wordCount / analysis.sentenceCount;
      }

      // Simple readability score (based on sentence length)
      if (analysis.avgWordsPerSentence < 15) {
        analysis.readabilityScore = 'Easy';
      } else if (analysis.avgWordsPerSentence < 25) {
        analysis.readabilityScore = 'Medium';
      } else {
        analysis.readabilityScore = 'Difficult';
      }

      // Keyword density (simple version)
      const words = result.content.toLowerCase().split(/\s+/);
      const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'];
      const filteredWords = words.filter(word => 
        word.length > 3 && !commonWords.includes(word)
      );
      
      filteredWords.forEach(word => {
        analysis.keywordDensity[word] = (analysis.keywordDensity[word] || 0) + 1;
      });

      // Get top keywords
      const topKeywords = Object.entries(analysis.keywordDensity)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([word, count]) => `${word} (${count})`);

      console.log('📊 Content Analysis Results:');
      console.log(`   - Word Count: ${analysis.wordCount}`);
      console.log(`   - Sentence Count: ${analysis.sentenceCount}`);
      console.log(`   - Paragraph Count: ${analysis.paragraphCount}`);
      console.log(`   - Avg Words/Sentence: ${analysis.avgWordsPerSentence.toFixed(1)}`);
      console.log(`   - Readability: ${analysis.readabilityScore}`);
      console.log(`   - Has Images: ${analysis.hasImages} (${result.images.length})`);
      console.log(`   - Has External Links: ${analysis.hasExternalLinks}`);
      console.log(`   - Has Structured Data: ${analysis.hasStructuredData}`);
      console.log(`   - Top Keywords: ${topKeywords.join(', ')}`);

      // Metadata analysis
      if (result.metadata && Object.keys(result.metadata).length > 0) {
        console.log('\n📋 Metadata Found:');
        Object.entries(result.metadata).forEach(([key, value]) => {
          console.log(`   - ${key}: ${value}`);
        });
      }

    } else {
      console.log(`❌ Extraction failed: ${result.error}`);
    }

  } catch (error) {
    console.error(`💥 Analysis failed: ${error.message}`);
  }
}

// Main execution function
async function runAllExtractionDemos() {
  try {
    await demonstrateContentExtraction();
    await demonstrateBatchExtraction();
    await demonstrateSearchAndExtract();
    await demonstrateLayerIntegrationWithExtraction();
    await demonstrateContentAnalysis();
    
    console.log('🎉 All content extraction demos completed!');
    
  } catch (error) {
    console.error('💥 Demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateContentExtraction,
  demonstrateBatchExtraction,
  demonstrateSearchAndExtract,
  demonstrateLayerIntegrationWithExtraction,
  demonstrateContentAnalysis,
  runAllExtractionDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllExtractionDemos();
}
