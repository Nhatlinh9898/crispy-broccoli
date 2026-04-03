// Demo script for Web Search Integration
// Chạy thử nghiệm tính năng tìm kiếm web

const { WebSearchService, ContentProcessor } = require('./layer-implementation-code.js');

// Cấu hình mẫu
const config = {
  defaultEngine: 'google',
  google: {
    apiKey: process.env.GOOGLE_API_KEY || 'demo-key',
    searchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID || 'demo-engine-id'
  },
  bing: {
    apiKey: process.env.BING_API_KEY || 'demo-key'
  },
  duckduckgo: {}
};

async function demonstrateWebSearch() {
  console.log('=== WEB SEARCH INTEGRATION DEMO ===\n');

  // Khởi tạo dịch vụ tìm kiếm
  const webSearchService = new WebSearchService(config);

  // Test queries
  const testQueries = [
    'trí tuệ nhân tạo trong y tế Việt Nam',
    'machine learning applications healthcare',
    'AI công nghệ y tế 2024'
  ];

  for (const query of testQueries) {
    console.log(`🔍 Searching for: "${query}"`);
    
    try {
      // Tìm kiếm đơn engine
      const singleResults = await webSearchService.search(query, {
        engine: 'google',
        num: 5,
        language: 'vi'
      });

      console.log(`✅ Found ${singleResults.totalResults} results in ${singleResults.searchTime}s`);
      console.log(`📊 Average relevance: ${(singleResults.items.reduce((sum, item) => sum + item.relevance, 0) / singleResults.items.length).toFixed(2)}`);
      
      // Hiển thị top 3 kết quả
      console.log('🔝 Top Results:');
      singleResults.items.slice(0, 3).forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.title}`);
        console.log(`     ${item.snippet.substring(0, 100)}...`);
        console.log(`     🔗 ${item.link}`);
        console.log(`     📈 Relevance: ${item.relevance.toFixed(2)}, 🛡️ Credibility: ${item.credibility.toFixed(2)}\n`);
      });

      // Tìm kiếm đa engine
      console.log('🔄 Multi-engine search...');
      const multiResults = await webSearchService.multiEngineSearch(query, {
        engines: ['google', 'duckduckgo'],
        num: 3
      });

      console.log(`✅ Multi-engine found ${multiResults.totalResults} unique results`);
      console.log(`🔗 Engines used: ${multiResults.engines.join(', ')}\n`);

    } catch (error) {
      console.error(`❌ Search failed: ${error.message}\n`);
    }

    console.log('─'.repeat(80) + '\n');
  }
}

async function demonstrateContentProcessorWithWebSearch() {
  console.log('=== CONTENT PROCESSOR WITH WEB SEARCH DEMO ===\n');

  // Cấu hình Content Processor với web search
  const processorConfig = {
    processorType: 'websearch',
    webSearch: config
  };

  const processor = new ContentProcessor(processorConfig);

  // Test inputs
  const testInputs = [
    {
      topic: 'phát triển AI trong ngành y tế',
      language: 'vi',
      maxResults: 8,
      searchEngine: 'google',
      multiEngine: false
    },
    {
      query: 'artificial intelligence healthcare trends 2024',
      language: 'en',
      maxResults: 5,
      searchEngine: 'bing',
      multiEngine: true,
      searchOptions: {
        safe: 'strict'
      }
    },
    {
      searchQuery: 'công nghệ blockchain trong chuỗi cung ứng',
      language: 'vi',
      maxResults: 10,
      multiEngine: true,
      engines: ['google', 'duckduckgo']
    }
  ];

  for (const input of testInputs) {
    console.log(`📝 Processing: ${input.topic || input.query || input.searchQuery}`);
    
    try {
      const result = await processor.process(input);

      if (result.webSearchResults) {
        const analysis = result.webSearchResults.analysis;
        
        console.log(`✅ Search completed successfully`);
        console.log(`📊 Results analysis:`);
        console.log(`   - Total items: ${analysis.totalItems}`);
        console.log(`   - Average relevance: ${analysis.averageRelevance.toFixed(2)}`);
        console.log(`   - Average credibility: ${analysis.averageCredibility.toFixed(2)}`);
        console.log(`   - Languages: ${Object.keys(analysis.languageDistribution).join(', ')}`);
        console.log(`   - Top domains: ${analysis.topDomains.slice(0, 3).map(d => d.domain).join(', ')}`);

        if (result.webSearchResults.recommendations.length > 0) {
          console.log(`💡 Recommendations:`);
          result.webSearchResults.recommendations.forEach(rec => {
            console.log(`   - ${rec}`);
          });
        }
      }

      if (result.webSearchError) {
        console.log(`⚠️ Search error: ${result.webSearchError}`);
      }

    } catch (error) {
      console.error(`❌ Processing failed: ${error.message}`);
    }

    console.log('─'.repeat(80) + '\n');
  }
}

async function demonstrateLayerIntegration() {
  console.log('=== LAYER INTEGRATION WITH WEB SEARCH DEMO ===\n');

  const { PipelineManager } = require('./layer-implementation-code.js');

  // Cấu hình pipeline với web search
  const pipelineConfig = {
    mode: 'sequential',
    quality: 'high',
    webSearch: config
  };

  const pipelineManager = new PipelineManager(pipelineConfig);

  // Cấu hình lại các tầng tìm kiếm để sử dụng web search
  for (let i = 1; i <= 15; i++) {
    const layer = pipelineManager.layers[i - 1];
    if (layer.config.processing.processorType === 'search') {
      layer.config.processing.processorType = 'websearch';
      layer.config.processing.webSearch = config;
    }
  }

  // Test input
  const testInput = {
    topic: 'ứng dụng trí tuệ nhân tạo trong chẩn đoán y tế',
    contentType: 'research_article',
    targetAudience: 'medical_professionals',
    language: 'vi',
    searchOptions: {
      maxResults: 8,
      multiEngine: true,
      engines: ['google', 'duckduckgo']
    }
  };

  console.log(`🚀 Starting pipeline with web search integration...`);
  console.log(`📋 Input: ${testInput.topic}\n`);

  try {
    // Chạy chỉ 5 tầng đầu tiên để demo
    const results = [];
    let currentData = testInput;

    for (let i = 0; i < 5; i++) {
      const layer = pipelineManager.layers[i];
      console.log(`⚙️ Processing Layer ${layer.layerId}: ${layer.config.processing.processorType}`);
      
      const result = await layer.process(currentData);
      results.push(result);

      if (result.success) {
        currentData = result.data;
        
        if (result.data.webSearchResults) {
          console.log(`✅ Layer ${layer.layerId} completed: ${result.data.webSearchResults.items.length} search results`);
          console.log(`📊 Avg relevance: ${result.data.webSearchResults.analysis.averageRelevance.toFixed(2)}`);
        } else {
          console.log(`✅ Layer ${layer.layerId} completed successfully`);
        }
      } else {
        console.log(`❌ Layer ${layer.layerId} failed: ${result.error}`);
        break;
      }
    }

    console.log('\n📈 Final Results Summary:');
    console.log(`✅ Completed layers: ${results.filter(r => r.success).length}/5`);
    
    const lastSuccessfulResult = results.filter(r => r.success).pop();
    if (lastSuccessfulResult?.data?.webSearchResults) {
      const searchResults = lastSuccessfulResult.data.webSearchResults;
      console.log(`🔍 Total search results collected: ${searchResults.items.length}`);
      console.log(`🌐 Sources from engines: ${searchResults.engines?.join(', ') || searchResults.metadata?.engine}`);
    }

  } catch (error) {
    console.error(`❌ Pipeline demo failed: ${error.message}`);
  }
}

// Advanced demo with real API calls (requires actual API keys)
async function demonstrateRealAPICalls() {
  console.log('=== REAL API CALLS DEMO (Requires API Keys) ===\n');

  // Check if API keys are available
  const hasGoogleKeys = process.env.GOOGLE_API_KEY && process.env.GOOGLE_SEARCH_ENGINE_ID;
  const hasBingKey = process.env.BING_API_KEY;

  if (!hasGoogleKeys && !hasBingKey) {
    console.log('⚠️ No API keys found. Set environment variables to test real API calls:');
    console.log('   - GOOGLE_API_KEY');
    console.log('   - GOOGLE_SEARCH_ENGINE_ID');
    console.log('   - BING_API_KEY');
    return;
  }

  const webSearchService = new WebSearchService(config);

  if (hasGoogleKeys) {
    console.log('🔍 Testing Google Search API...');
    try {
      const results = await webSearchService.search('machine learning healthcare', {
        engine: 'google',
        num: 3
      });
      console.log(`✅ Google search successful: ${results.items.length} results`);
    } catch (error) {
      console.error(`❌ Google search failed: ${error.message}`);
    }
  }

  if (hasBingKey) {
    console.log('🔍 Testing Bing Search API...');
    try {
      const results = await webSearchService.search('artificial intelligence medicine', {
        engine: 'bing',
        num: 3
      });
      console.log(`✅ Bing search successful: ${results.items.length} results`);
    } catch (error) {
      console.error(`❌ Bing search failed: ${error.message}`);
    }
  }
}

// Main execution function
async function runAllDemos() {
  try {
    await demonstrateWebSearch();
    await demonstrateContentProcessorWithWebSearch();
    await demonstrateLayerIntegration();
    await demonstrateRealAPICalls();
    
    console.log('🎉 All demos completed!');
    
  } catch (error) {
    console.error('💥 Demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateWebSearch,
  demonstrateContentProcessorWithWebSearch,
  demonstrateLayerIntegration,
  demonstrateRealAPICalls,
  runAllDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllDemos();
}
