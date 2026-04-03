// Content Analysis Demo
// Demo phân tích và tạo tài liệu từ data hệ thống

const ContentDataAnalyzer = require('./content-data-analyzer.js');
const ContentWritingGenerator = require('./content-writing-generator.js');

// Demo functions
async function demonstrateContentAnalysis() {
  console.log('=== CONTENT ANALYSIS DEMO ===\n');

  const analyzer = new ContentDataAnalyzer({
    extractTopics: true,
    extractKeywords: true,
    analyzeSentiment: true,
    generateSummary: true,
    findRelationships: true,
    categorizeContent: true,
    detectLanguage: true,
    extractEntities: true,
    parallelProcessing: true,
    enableCaching: true
  });

  await analyzer.initialize();

  console.log('🔍 Analyzing all content...\n');
  
  // Analyze all content
  const analysisResults = await analyzer.analyzeAllContent();
  
  console.log('📊 Analysis Results:');
  console.log(`   Total Content: ${analysisResults.totalContent}`);
  console.log(`   Analyzed Content: ${analysisResults.analyzedContent}`);
  console.log(`   Analysis Progress: ${analysisResults.analysisProgress.toFixed(1)}%`);
  console.log(`   Total Words: ${analysisResults.statistics.totalWords}`);
  console.log(`   Total Topics: ${analysisResults.statistics.totalTopics}`);
  console.log(`   Total Relationships: ${analysisResults.statistics.totalRelationships}`);

  // Show top topics
  console.log('\n🏆 Top Topics:');
  analysisResults.topTopics.forEach((topic, index) => {
    console.log(`   ${index + 1}. ${topic.name} (${topic.count} items)`);
  });

  // Show content by category
  console.log('\n📂 Content by Category:');
  Object.entries(analysisResults.contentByCategory).forEach(([category, count]) => {
    console.log(`   ${category}: ${count}`);
  });

  // Show content by source
  console.log('\n🏢 Content by Source:');
  Object.entries(analysisResults.contentBySource).forEach(([source, count]) => {
    console.log(`   ${source}: ${count}`);
  });

  // Show quality distribution
  console.log('\n⭐ Quality Distribution:');
  Object.entries(analysisResults.qualityDistribution).forEach(([grade, count]) => {
    console.log(`   ${grade}: ${count}`);
  });

  return analyzer;
}

async function demonstrateContentSearch() {
  console.log('=== CONTENT SEARCH DEMO ===\n');

  const analyzer = new ContentDataAnalyzer();
  await analyzer.initialize();
  await analyzer.analyzeAllContent();

  // Test different search queries
  const searchQueries = [
    { query: 'hệ thống', options: { limit: 5 } },
    { query: 'tìm kiếm', options: { category: 'feature', limit: 3 } },
    { query: '', options: { source: 'system', limit: 10 } },
    { query: 'ai', options: { minQuality: 70, limit: 5 } },
    { query: '', options: { topic: 'system_design', limit: 3 } }
  ];

  for (const search of searchQueries) {
    console.log(`🔍 Searching: "${search.query || 'all'}"`);
    console.log(`   Options: ${JSON.stringify(search.options)}`);
    
    const results = analyzer.searchContent(search.query, search.options);
    
    console.log(`📊 Search Results:`);
    console.log(`   Total Results: ${results.totalResults}`);
    
    results.content.forEach((content, index) => {
      console.log(`   ${index + 1}. ${content.title}`);
      console.log(`      Score: ${content.searchScore}`);
      console.log(`      Category: ${content.category}`);
      console.log(`      Source: ${content.source}`);
      console.log(`      Quality: ${content.analysis?.quality?.score || 'N/A'}`);
      
      if (content.analysis && content.analysis.topics.length > 0) {
        console.log(`      Topics: ${content.analysis.topics.map(t => t.name).join(', ')}`);
      }
      
      console.log('');
    });
  }

  return analyzer;
}

async function demonstrateContentRecommendations() {
  console.log('=== CONTENT RECOMMENDATIONS DEMO ===\n');

  const analyzer = new ContentDataAnalyzer();
  await analyzer.initialize();
  await analyzer.analyzeAllContent();

  // Get content items for recommendation testing
  const contentItems = Array.from(analyzer.contentIndex.values());
  
  if (contentItems.length > 0) {
    // Test recommendations for first few content items
    for (let i = 0; i < Math.min(3, contentItems.length); i++) {
      const content = contentItems[i];
      
      console.log(`🎯 Recommendations for: ${content.title}`);
      console.log(`   Content ID: ${content.id}`);
      console.log(`   Category: ${content.category}`);
      console.log(`   Source: ${content.source}`);
      
      const recommendations = await analyzer.generateContentRecommendations(content.id, 3);
      
      if (recommendations.length > 0) {
        console.log(`   Related Content:`);
        recommendations.forEach((rec, index) => {
          console.log(`     ${index + 1}. ${rec.content.title}`);
          console.log(`        Relationship Strength: ${rec.relationshipStrength.toFixed(2)}`);
          console.log(`        Reasons: ${rec.reasons.join(', ')}`);
        });
      } else {
        console.log(`   No related content found`);
      }
      
      console.log('');
    }
  }

  return analyzer;
}

async function demonstrateContentExport() {
  console.log('=== CONTENT EXPORT DEMO ===\n');

  const analyzer = new ContentDataAnalyzer();
  await analyzer.initialize();
  await analyzer.analyzeAllContent();

  // Export to different formats
  const formats = ['json', 'csv', 'markdown'];
  
  for (const format of formats) {
    console.log(`📤 Exporting to ${format.toUpperCase()}...`);
    
    try {
      const exportedData = await analyzer.exportAnalysisResults(format);
      
      console.log(`✅ Export successful (${format})`);
      console.log(`   Data length: ${exportedData.length} characters`);
      
      // Show preview
      const preview = exportedData.substring(0, 200) + '...';
      console.log(`   Preview: ${preview}`);
      
    } catch (error) {
      console.log(`❌ Export failed (${format}): ${error.message}`);
    }
    
    console.log('');
  }

  return analyzer;
}

async function demonstrateDocumentGeneration() {
  console.log('=== DOCUMENT GENERATION DEMO ===\n');

  const analyzer = new ContentDataAnalyzer();
  await analyzer.initialize();
  await analyzer.analyzeAllContent();

  const generator = new ContentWritingGenerator({
    qualityThreshold: 70,
    maxContentLength: 5000,
    includeImages: true,
    includeTables: true,
    generateTOC: true
  });

  // Get analysis results for document generation
  const analysisResults = analyzer.getAnalysisResults();
  
  console.log('📝 Generating documents from analysis results...\n');

  // Generate different types of documents
  const documentTypes = ['report', 'documentation'];
  
  for (const docType of documentTypes) {
    console.log(`📄 Generating ${docType}...`);
    
    try {
      const document = await generator.generateDocument(analysisResults, docType);
      
      console.log(`✅ ${docType.charAt(0).toUpperCase() + docType.slice(1)} generated successfully`);
      console.log(`   Document length: ${document.length} characters`);
      
      // Show preview
      const lines = document.split('\n').slice(0, 10);
      console.log(`   Preview:`);
      lines.forEach((line, index) => {
        console.log(`     ${index + 1}. ${line}`);
      });
      
    } catch (error) {
      console.log(`❌ Failed to generate ${docType}: ${error.message}`);
    }
    
    console.log('');
  }

  return { analyzer, generator };
}

async function demonstrateAdvancedContentFeatures() {
  console.log('=== ADVANCED CONTENT FEATURES DEMO ===\n');

  const analyzer = new ContentDataAnalyzer({
    extractTopics: true,
    extractKeywords: true,
    analyzeSentiment: true,
    generateSummary: true,
    findRelationships: true,
    categorizeContent: true,
    detectLanguage: true,
    extractEntities: true,
    parallelProcessing: true,
    enableCaching: true
  });

  await analyzer.initialize();
  await analyzer.analyzeAllContent();

  // 1. Topic clustering
  console.log('1️⃣ Topic Clustering Analysis:');
  const contentItems = Array.from(analyzer.contentIndex.values());
  const topicClusters = new Map();
  
  contentItems.forEach(content => {
    if (content.analysis && content.analysis.topics.length > 0) {
      const primaryTopic = content.analysis.topics[0].name;
      
      if (!topicClusters.has(primaryTopic)) {
        topicClusters.set(primaryTopic, []);
      }
      
      topicClusters.get(primaryTopic).push({
        id: content.id,
        title: content.title,
        score: content.analysis.topics[0].relevance
      });
    }
  });
  
  topicClusters.forEach((items, topic) => {
    console.log(`   ${topic}: ${items.length} items`);
    items.slice(0, 3).forEach(item => {
      console.log(`     - ${item.title} (score: ${item.score.toFixed(2)})`);
    });
  });

  // 2. Sentiment analysis by category
  console.log('\n2️⃣ Sentiment Analysis by Category:');
  const sentimentByCategory = new Map();
  
  contentItems.forEach(content => {
    if (content.analysis && content.analysis.sentiment) {
      const category = content.category || 'unknown';
      
      if (!sentimentByCategory.has(category)) {
        sentimentByCategory.set(category, { positive: 0, negative: 0, neutral: 0 });
      }
      
      const sentiment = content.analysis.sentiment.sentiment;
      sentimentByCategory.get(category)[sentiment]++;
    }
  });
  
  sentimentByCategory.forEach((sentiments, category) => {
    const total = sentiments.positive + sentiments.negative + sentiments.neutral;
    console.log(`   ${category}:`);
    console.log(`     Positive: ${sentiments.positive} (${(sentiments.positive/total*100).toFixed(1)}%)`);
    console.log(`     Neutral: ${sentiments.neutral} (${(sentiments.neutral/total*100).toFixed(1)}%)`);
    console.log(`     Negative: ${sentiments.negative} (${(sentiments.negative/total*100).toFixed(1)}%)`);
  });

  // 3. Quality trends over time
  console.log('\n3️⃣ Quality Trends Over Time:');
  const qualityByTime = new Map();
  
  contentItems.forEach(content => {
    if (content.analysis && content.analysis.quality) {
      const date = new Date(content.createdAt).toDateString();
      
      if (!qualityByTime.has(date)) {
        qualityByTime.set(date, []);
      }
      
      qualityByTime.get(date).push(content.analysis.quality.score);
    }
  });
  
  const sortedDates = Array.from(qualityByTime.keys()).sort();
  sortedDates.forEach(date => {
    const scores = qualityByTime.get(date);
    const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    console.log(`   ${date}: Average quality ${avgScore.toFixed(1)} (${scores.length} items)`);
  });

  // 4. Entity extraction analysis
  console.log('\n4️⃣ Entity Extraction Analysis:');
  const entityTypes = new Map();
  
  contentItems.forEach(content => {
    if (content.analysis && content.analysis.entities) {
      content.analysis.entities.forEach(entity => {
        if (!entityTypes.has(entity.type)) {
          entityTypes.set(entity.type, { count: 0, examples: [] });
        }
        
        entityTypes.get(entity.type).count++;
        if (entityTypes.get(entity.type).examples.length < 3) {
          entityTypes.get(entity.type).examples.push(entity.value);
        }
      });
    }
  });
  
  entityTypes.forEach((data, type) => {
    console.log(`   ${type}: ${data.count} occurrences`);
    console.log(`     Examples: ${data.examples.join(', ')}`);
  });

  // 5. Content length analysis
  console.log('\n5️⃣ Content Length Analysis:');
  const lengths = contentItems
    .filter(c => c.wordCount)
    .map(c => c.wordCount)
    .sort((a, b) => a - b);
  
  if (lengths.length > 0) {
    const stats = {
      min: lengths[0],
      max: lengths[lengths.length - 1],
      average: lengths.reduce((sum, len) => sum + len, 0) / lengths.length,
      median: lengths[Math.floor(lengths.length / 2)]
    };
    
    console.log(`   Min length: ${stats.min} words`);
    console.log(`   Max length: ${stats.max} words`);
    console.log(`   Average length: ${stats.average.toFixed(1)} words`);
    console.log(`   Median length: ${stats.median} words`);
  }

  return analyzer;
}

async function demonstrateContentWorkflowIntegration() {
  console.log('=== CONTENT WORKFLOW INTEGRATION DEMO ===\n');

  const analyzer = new ContentDataAnalyzer({
    parallelProcessing: true,
    enableCaching: true
  });

  const generator = new ContentWritingGenerator({
    qualityThreshold: 75,
    generateTOC: true
  });

  await analyzer.initialize();

  // Simulate a complete workflow
  console.log('🔄 Simulating complete content workflow...\n');

  // Step 1: Add new content
  console.log('1️⃣ Adding new content to system...');
  const newContent = {
    title: 'Hướng dẫn tích hợp AI vào hệ thống',
    content: 'Hệ thống AI có thể được tích hợp vào các quy trình hiện có thông qua nhiều phương pháp khác nhau. Phương pháp phổ biến nhất là sử dụng API để kết nối với các dịch vụ AI có sẵn. Ngoài ra, có thể triển khai các mô hình AI trực tiếp trong hệ thống để đảm bảo tính bảo mật và hiệu suất. Việc lựa chọn phương pháp phù hợp phụ thuộc vào yêu cầu cụ thể của dự án và nguồn lực có sẵn.',
    type: 'tutorial',
    category: 'ai_integration',
    createdAt: Date.now(),
    wordCount: 65,
    language: 'vi'
  };

  const contentId = analyzer.generateContentId(newContent, 'user');
  newContent.id = contentId;
  analyzer.contentIndex.set(contentId, {
    ...newContent,
    source: 'user',
    indexedAt: Date.now(),
    analyzed: false,
    analysis: null
  });

  console.log(`   Added: ${newContent.title} (ID: ${contentId})`);

  // Step 2: Analyze new content
  console.log('\n2️⃣ Analyzing new content...');
  const analysis = await analyzer.analyzeSingleContent(newContent);
  const content = analyzer.contentIndex.get(contentId);
  content.analyzed = true;
  content.analysis = analysis;

  console.log(`   Analysis completed for: ${content.title}`);
  console.log(`   Topics: ${analysis.topics.map(t => t.name).join(', ')}`);
  console.log(`   Keywords: ${analysis.keywords.slice(0, 5).map(k => k.word).join(', ')}`);
  console.log(`   Quality: ${analysis.quality.score} (${analysis.quality.grade})`);

  // Step 3: Find related content
  console.log('\n3️⃣ Finding related content...');
  await analyzer.findContentRelationships();
  const recommendations = await analyzer.generateContentRecommendations(contentId, 3);

  if (recommendations.length > 0) {
    console.log(`   Found ${recommendations.length} related items:`);
    recommendations.forEach((rec, index) => {
      console.log(`     ${index + 1}. ${rec.content.title}`);
      console.log(`        Strength: ${rec.relationshipStrength.toFixed(2)}`);
    });
  } else {
    console.log('   No related content found');
  }

  // Step 4: Generate report
  console.log('\n4️⃣ Generating analysis report...');
  const analysisResults = analyzer.getAnalysisResults();
  const report = await generator.generateDocument(analysisResults, 'report');

  console.log(`   Report generated (${report.length} characters)`);
  console.log('   Report preview:');
  const reportLines = report.split('\n').slice(0, 8);
  reportLines.forEach((line, index) => {
    console.log(`     ${index + 1}. ${line}`);
  });

  // Step 5: Export results
  console.log('\n5️⃣ Exporting analysis results...');
  const exportedData = await analyzer.exportAnalysisResults('markdown');

  console.log(`   Exported to markdown (${exportedData.length} characters)`);
  console.log('   Export preview:');
  const exportLines = exportedData.split('\n').slice(0, 5);
  exportLines.forEach((line, index) => {
    console.log(`     ${index + 1}. ${line}`);
  });

  console.log('\n✅ Complete workflow integration demo finished!');

  return { analyzer, generator, newContentId: contentId };
}

// Main execution function
async function runAllContentAnalysisDemos() {
  try {
    console.log('🎯 CONTENT ANALYSIS DEMOS\n');
    console.log('='.repeat(60));
    
    await demonstrateContentAnalysis();
    await demonstrateContentSearch();
    await demonstrateContentRecommendations();
    await demonstrateContentExport();
    await demonstrateDocumentGeneration();
    await demonstrateAdvancedContentFeatures();
    await demonstrateContentWorkflowIntegration();
    
    console.log('\n🎉 All content analysis demos completed!');
    
  } catch (error) {
    console.error('💥 Demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateContentAnalysis,
  demonstrateContentSearch,
  demonstrateContentRecommendations,
  demonstrateContentExport,
  demonstrateDocumentGeneration,
  demonstrateAdvancedContentFeatures,
  demonstrateContentWorkflowIntegration,
  runAllContentAnalysisDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllContentAnalysisDemos();
}
