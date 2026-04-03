// Demo script for Layer Communication System
// Chạy thử nghiệm khả năng giao tiếp giữa các tầng

const { LayerCommunicationHub, CommunicativeLayer, LayerManager } = require('./layer-communication-system.js');

// Demo layer classes
class SearchLayer extends CommunicativeLayer {
  constructor(layerId, config, hub) {
    super(layerId, config, hub);
    this.searchResults = [];
  }

  async processData(data) {
    console.log(`🔍 Layer ${this.layerId} processing search data:`, data.query);
    
    // Simulate search
    const results = [
      { title: `Result 1 for ${data.query}`, url: 'https://example.com/1' },
      { title: `Result 2 for ${data.query}`, url: 'https://example.com/2' },
      { title: `Result 3 for ${data.query}`, url: 'https://example.com/3' }
    ];
    
    this.searchResults = results;
    
    // Gửi kết quả đến tầng phân loại
    await this.sendForward({
      type: 'search_results',
      payload: { results: results, query: data.query }
    });
    
    return { processed: true, results: results };
  }

  async executeControlCommand(command, params) {
    switch (command) {
      case 'clear_results':
        this.searchResults = [];
        return { cleared: true };
      case 'get_stats':
        return { resultCount: this.searchResults.length };
      default:
        return { command: command, executed: false };
    }
  }
}

class ClassificationLayer extends CommunicativeLayer {
  constructor(layerId, config, hub) {
    super(layerId, config, hub);
    this.categories = ['technology', 'business', 'health', 'education'];
    this.classifiedItems = [];
  }

  async processData(data) {
    console.log(`🏷️ Layer ${this.layerId} classifying data:`, data.results?.length || 0, 'items');
    
    if (data.results) {
      const classified = data.results.map(item => ({
        ...item,
        category: this.categories[Math.floor(Math.random() * this.categories.length)],
        confidence: Math.random() * 0.5 + 0.5,
        classifiedAt: new Date()
      }));
      
      this.classifiedItems.push(...classified);
      
      // Gửi đến tầng tạo nội dung
      await this.sendForward({
        type: 'classified_data',
        payload: { items: classified, originalQuery: data.query }
      });
      
      return { processed: true, classified: classified };
    }
    
    return { processed: false, reason: 'No results to classify' };
  }

  async executeControlCommand(command, params) {
    switch (command) {
      case 'get_categories':
        return { categories: this.categories };
      case 'clear_classified':
        this.classifiedItems = [];
        return { cleared: true };
      default:
        return { command: command, executed: false };
    }
  }
}

class ContentCreationLayer extends CommunicativeLayer {
  constructor(layerId, config, hub) {
    super(layerId, config, hub);
    this.createdContent = [];
  }

  async processData(data) {
    console.log(`✍️ Layer ${this.layerId} creating content from ${data.items?.length || 0} classified items`);
    
    if (data.items) {
      const content = {
        title: `Generated Content for ${data.originalQuery}`,
        summary: `Based on ${data.items.length} classified sources`,
        sections: data.items.map(item => ({
          title: item.title,
          category: item.category,
          content: `Content about ${item.title}...`,
          source: item.url
        })),
        createdAt: new Date(),
        wordCount: Math.floor(Math.random() * 1000) + 500
      };
      
      this.createdContent.push(content);
      
      // Gửi đến tầng kiểm định
      await this.sendForward({
        type: 'created_content',
        payload: { content: content, sourceItems: data.items }
      });
      
      return { processed: true, content: content };
    }
    
    return { processed: false, reason: 'No items to create content from' };
  }

  async executeControlCommand(command, params) {
    switch (command) {
      case 'get_content_count':
        return { count: this.createdContent.length };
      case 'clear_content':
        this.createdContent = [];
        return { cleared: true };
      default:
        return { command: command, executed: false };
    }
  }
}

class ValidationLayer extends CommunicativeLayer {
  constructor(layerId, config, hub) {
    super(layerId, config, hub);
    this.validationResults = [];
  }

  async processData(data) {
    console.log(`✅ Layer ${this.layerId} validating content:`, data.content?.title);
    
    if (data.content) {
      const validation = {
        contentId: data.content.createdAt.getTime(),
        title: data.content.title,
        checks: {
          grammar: Math.random() > 0.2,
          spelling: Math.random() > 0.1,
          factual: Math.random() > 0.3,
          readability: Math.random() > 0.15,
          seo: Math.random() > 0.25
        },
        overallScore: Math.random() * 0.4 + 0.6,
        validatedAt: new Date(),
        recommendations: this.generateRecommendations()
      };
      
      this.validationResults.push(validation);
      
      // Gửi kết quả validation
      await this.sendBackward({
        type: 'validation_result',
        payload: { validation: validation, originalContent: data.content }
      });
      
      // Broadcast kết quả đến tất cả các tầng
      await this.broadcast({
        type: 'validation_complete',
        payload: { 
          contentTitle: data.content.title,
          score: validation.overallScore,
          passed: validation.overallScore > 0.7
        }
      });
      
      return { processed: true, validation: validation };
    }
    
    return { processed: false, reason: 'No content to validate' };
  }

  generateRecommendations() {
    const recommendations = [
      'Improve readability by using shorter sentences',
      'Add more relevant keywords for SEO',
      'Include more credible sources',
      'Check factual accuracy',
      'Enhance content structure'
    ];
    
    return recommendations.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  async executeControlCommand(command, params) {
    switch (command) {
      case 'get_validation_stats':
        const avgScore = this.validationResults.reduce((sum, r) => sum + r.overallScore, 0) / this.validationResults.length;
        return { 
          totalValidations: this.validationResults.length,
          averageScore: avgScore,
          passRate: this.validationResults.filter(r => r.overallScore > 0.7).length / this.validationResults.length
        };
      default:
        return { command: command, executed: false };
    }
  }
}

// Demo functions
async function demonstrateDirectCommunication() {
  console.log('=== DIRECT COMMUNICATION DEMO ===\n');

  const hub = new LayerCommunicationHub();
  
  // Tạo các layer
  const searchLayer = new SearchLayer('layer_1', {}, hub);
  const classificationLayer = new ClassificationLayer('layer_16', {}, hub);
  const contentLayer = new ContentCreationLayer('layer_46', {}, hub);
  const validationLayer = new ValidationLayer('layer_61', {}, hub);

  try {
    // Gửi data từ search đến classification
    console.log('📤 Sending data from search to classification...');
    const response1 = await searchLayer.sendToLayer('layer_16', {
      type: 'search_data',
      payload: { 
        query: 'artificial intelligence in healthcare',
        maxResults: 10
      }
    });
    
    console.log('✅ Response from classification:', response1.success ? 'Success' : 'Failed');
    
    // Chờ một chút để xử lý
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Gửi data từ classification đến content creation
    console.log('\n📤 Sending classified data to content creation...');
    const response2 = await classificationLayer.sendToLayer('layer_46', {
      type: 'classified_items',
      payload: {
        items: [
          { title: 'AI in Medicine', category: 'health', confidence: 0.8 },
          { title: 'Machine Learning Healthcare', category: 'technology', confidence: 0.9 }
        ]
      }
    });
    
    console.log('✅ Response from content creation:', response2.success ? 'Success' : 'Failed');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Gửi content đến validation
    console.log('\n📤 Sending content to validation...');
    const response3 = await contentLayer.sendToLayer('layer_61', {
      type: 'content_for_validation',
      payload: {
        content: {
          title: 'AI in Healthcare: A Comprehensive Guide',
          wordCount: 1500,
          sections: ['Introduction', 'Applications', 'Future', 'Conclusion']
        }
      }
    });
    
    console.log('✅ Response from validation:', response3.success ? 'Success' : 'Failed');
    
  } catch (error) {
    console.error('❌ Direct communication demo failed:', error.message);
  }
}

async function demonstrateBroadcastCommunication() {
  console.log('\n=== BROADCAST COMMUNICATION DEMO ===\n');

  const hub = new LayerCommunicationHub();
  
  // Tạo nhiều layer
  const layers = [
    new SearchLayer('layer_1', {}, hub),
    new ClassificationLayer('layer_16', {}, hub),
    new ContentCreationLayer('layer_46', {}, hub),
    new ValidationLayer('layer_61', {}, hub)
  ];

  try {
    // Broadcast từ validation layer
    console.log('📢 Broadcasting validation complete message...');
    const broadcastResult = await layers[3].broadcast({
      type: 'system_update',
      payload: {
        message: 'Validation system is now online',
        version: '1.0.0',
        features: ['grammar_check', 'seo_analysis', 'readability_score']
      }
    });
    
    console.log(`✅ Broadcast sent to ${broadcastResult.deliveredCount} layers`);
    
    // Broadcast với exclude layers
    console.log('\n📢 Broadcasting to selected layers...');
    const selectiveBroadcast = await layers[0].broadcast({
      type: 'search_update',
      payload: {
        message: 'New search algorithms available',
        algorithms: ['semantic_search', 'image_search', 'voice_search']
      }
    }, {
      targetLayers: ['layer_16', 'layer_46']
    });
    
    console.log(`✅ Selective broadcast sent to ${selectiveBroadcast.deliveredCount} target layers`);
    
  } catch (error) {
    console.error('❌ Broadcast communication demo failed:', error.message);
  }
}

async function demonstratePubSubCommunication() {
  console.log('\n=== PUBLISH-SUBSCRIBE DEMO ===\n');

  const hub = new LayerCommunicationHub();
  
  // Tạo layers
  const searchLayer = new SearchLayer('layer_1', {}, hub);
  const classificationLayer = new ClassificationLayer('layer_16', {}, hub);
  const contentLayer = new ContentCreationLayer('layer_46', {}, hub);
  const validationLayer = new ValidationLayer('layer_61', {}, hub);

  try {
    // Subscribe to topics
    console.log('📝 Setting up subscriptions...');
    await classificationLayer.subscribe('search_results');
    await contentLayer.subscribe('classified_data');
    await validationLayer.subscribe('content_created');
    await searchLayer.subscribe('validation_feedback');
    
    // Publish search results
    console.log('\n📤 Publishing search results...');
    const publish1 = await searchLayer.publish('search_results', {
      type: 'data',
      payload: {
        query: 'machine learning trends',
        results: [
          { title: 'ML Trends 2024', url: 'https://example.com/ml-trends' },
          { title: 'Future of AI', url: 'https://example.com/ai-future' }
        ]
      }
    });
    
    console.log(`✅ Published to ${publish1.deliveredCount} subscribers`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Publish classified data
    console.log('\n📤 Publishing classified data...');
    const publish2 = await classificationLayer.publish('classified_data', {
      type: 'data',
      payload: {
        items: [
          { title: 'ML Trends 2024', category: 'technology', confidence: 0.9 },
          { title: 'Future of AI', category: 'technology', confidence: 0.85 }
        ]
      }
    });
    
    console.log(`✅ Published to ${publish2.deliveredCount} subscribers`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Publish created content
    console.log('\n📤 Publishing created content...');
    const publish3 = await contentLayer.publish('content_created', {
      type: 'data',
      payload: {
        content: {
          title: 'Machine Learning Trends 2024',
          summary: 'Comprehensive analysis of ML trends',
          wordCount: 1200
        }
      }
    });
    
    console.log(`✅ Published to ${publish3.deliveredCount} subscribers`);
    
  } catch (error) {
    console.error('❌ Pub-Sub communication demo failed:', error.message);
  }
}

async function demonstrateRequestResponse() {
  console.log('\n=== REQUEST-RESPONSE DEMO ===\n');

  const hub = new LayerCommunicationHub();
  
  // Tạo layers
  const searchLayer = new SearchLayer('layer_1', {}, hub);
  const classificationLayer = new ClassificationLayer('layer_16', {}, hub);
  const contentLayer = new ContentCreationLayer('layer_46', {}, hub);
  const validationLayer = new ValidationLayer('layer_61', {}, hub);

  try {
    // Request status từ classification layer
    console.log('🔍 Requesting status from classification layer...');
    const statusRequest = await searchLayer.request('layer_16', {
      payload: { command: 'get_status' }
    }, 5000);
    
    if (statusRequest.success) {
      console.log('✅ Status response received:', statusRequest.response.status);
    }
    
    // Request stats từ validation layer
    console.log('\n📊 Requesting validation stats...');
    const statsRequest = await contentLayer.request('layer_61', {
      payload: { command: 'get_validation_stats' }
    }, 5000);
    
    if (statsRequest.success) {
      console.log('✅ Stats response received:');
      console.log(`   Total validations: ${statsRequest.response.totalValidations}`);
      console.log(`   Average score: ${statsRequest.response.averageScore?.toFixed(2)}`);
      console.log(`   Pass rate: ${(statsRequest.response.passRate * 100).toFixed(1)}%`);
    }
    
    // Request categories từ classification layer
    console.log('\n🏷️ Requesting available categories...');
    const categoriesRequest = await validationLayer.request('layer_16', {
      payload: { command: 'get_categories' }
    }, 5000);
    
    if (categoriesRequest.success) {
      console.log('✅ Categories received:', categoriesRequest.response.categories.join(', '));
    }
    
  } catch (error) {
    console.error('❌ Request-Response demo failed:', error.message);
  }
}

async function demonstratePipelineCommunication() {
  console.log('\n=== PIPELINE COMMUNICATION DEMO ===\n');

  const hub = new LayerCommunicationHub();
  
  // Tạo layers
  const searchLayer = new SearchLayer('layer_1', {}, hub);
  const classificationLayer = new ClassificationLayer('layer_16', {}, hub);
  const contentLayer = new ContentCreationLayer('layer_46', {}, hub);
  const validationLayer = new ValidationLayer('layer_61', {}, hub);

  try {
    // Forward communication (tầng 1 -> các tầng sau)
    console.log('➡️ Forward communication from search layer...');
    const forwardResult = await searchLayer.sendForward({
      type: 'pipeline_data',
      payload: {
        query: 'blockchain in supply chain',
        source: 'layer_1',
        pipelineStage: 'search'
      }
    });
    
    console.log(`✅ Forward message sent to ${forwardResult.targetLayers.length} layers`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Backward communication (tầng 61 -> các tầng trước)
    console.log('\n⬅️ Backward communication from validation layer...');
    const backwardResult = await validationLayer.sendBackward({
      type: 'pipeline_feedback',
      payload: {
        message: 'Validation completed successfully',
        score: 0.85,
        recommendations: ['Improve readability', 'Add more sources']
      }
    });
    
    console.log(`✅ Backward message sent to ${backwardResult.targetLayers.length} layers`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Adjacent communication (tầng 16 -> tầng 15 và 17)
    console.log('\n↔️ Adjacent communication from classification layer...');
    const adjacentResult = await classificationLayer.sendAdjacent({
      type: 'adjacent_coordination',
      payload: {
        message: 'Classification completed, ready for next stage',
        processedItems: 5,
        categories: ['technology', 'business']
      }
    });
    
    console.log(`✅ Adjacent message sent to ${adjacentResult.targetLayers.length} layers`);
    
  } catch (error) {
    console.error('❌ Pipeline communication demo failed:', error.message);
  }
}

async function demonstrateLayerManager() {
  console.log('\n=== LAYER MANAGER DEMO ===\n');

  const manager = new LayerManager();
  
  // Thêm layers vào manager
  const searchLayer = new SearchLayer('layer_1', {}, manager.hub);
  const classificationLayer = new ClassificationLayer('layer_16', {}, manager.hub);
  const contentLayer = new ContentCreationLayer('layer_46', {}, manager.hub);
  const validationLayer = new ValidationLayer('layer_61', {}, manager.hub);
  
  manager.addLayer('layer_1', searchLayer);
  manager.addLayer('layer_16', classificationLayer);
  manager.addLayer('layer_46', contentLayer);
  manager.addLayer('layer_61', validationLayer);

  try {
    // Manager broadcast đến tất cả layers
    console.log('📢 Manager broadcasting system message...');
    const broadcastResult = await manager.broadcastToAll({
      type: 'system_control',
      payload: {
        command: 'system_status_check',
        timestamp: new Date()
      }
    });
    
    console.log(`✅ Manager broadcast sent to ${broadcastResult.deliveredCount} layers`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Manager gửi control command đến specific layer
    console.log('\n🎛️ Manager sending control command to validation layer...');
    const controlResult = await manager.controlLayer('layer_61', 'get_validation_stats');
    
    if (controlResult) {
      console.log('✅ Control command executed:');
      console.log(`   Total validations: ${controlResult.totalValidations}`);
      console.log(`   Average score: ${controlResult.averageScore?.toFixed(2)}`);
    }
    
    // Lấy status của tất cả layers
    console.log('\n📊 Getting status of all layers...');
    const allStatuses = await manager.getAllLayerStatuses();
    
    for (const [layerId, status] of Object.entries(allStatuses)) {
      if (status) {
        console.log(`   ${layerId}: ${status.status} (${status.subscriptions.length} subscriptions)`);
      }
    }
    
    // Lấy system stats
    console.log('\n📈 Getting system communication stats...');
    const systemStats = await manager.getSystemStats();
    
    console.log(`✅ System stats:`);
    console.log(`   Total layers: ${systemStats.totalLayers}`);
    console.log(`   Active layers: ${systemStats.activeLayers}`);
    console.log(`   Total messages: ${systemStats.totalMessages}`);
    
  } catch (error) {
    console.error('❌ Layer manager demo failed:', error.message);
  }
}

// Main execution function
async function runAllCommunicationDemos() {
  try {
    await demonstrateDirectCommunication();
    await demonstrateBroadcastCommunication();
    await demonstratePubSubCommunication();
    await demonstrateRequestResponse();
    await demonstratePipelineCommunication();
    await demonstrateLayerManager();
    
    console.log('\n🎉 All communication demos completed!');
    
  } catch (error) {
    console.error('💥 Communication demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateDirectCommunication,
  demonstrateBroadcastCommunication,
  demonstratePubSubCommunication,
  demonstrateRequestResponse,
  demonstratePipelineCommunication,
  demonstrateLayerManager,
  runAllCommunicationDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllCommunicationDemos();
}
