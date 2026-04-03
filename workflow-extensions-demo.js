// Workflow Extensions Demo
// Demo các tính năng mở rộng của hệ thống workflow

const SystemWorkflowEngine = require('./system-workflow-engine.js');
const WorkflowExtensions = require('./workflow-extensions.js');
const { advancedWorkflowDefinitions, workflowTemplates, customTaskHandlers } = require('./advanced-workflow-definitions.js');

// Demo functions
async function demonstrateConditionalWorkflows() {
  console.log('=== CONDITIONAL WORKFLOWS DEMO ===\n');

  const engine = new SystemWorkflowEngine();
  const extensions = new WorkflowExtensions({
    conditionalExecution: true,
    dynamicWorkflows: true,
    adaptiveWorkflows: true
  });

  // Register custom task handlers
  Object.entries(customTaskHandlers).forEach(([taskType, handler]) => {
    engine.registerTaskHandler(taskType, handler);
  });

  // Register conditional workflow
  const conditionalWorkflow = extensions.createConditionalWorkflow(
    'conditional_content_processing',
    advancedWorkflowDefinitions.conditional_content_processing
  );

  engine.defineWorkflow('conditional_content_processing', conditionalWorkflow);

  console.log('🔀 Testing conditional workflow with different inputs...\n');

  // Test case 1: Document input
  console.log('1️⃣ Test Case 1: Document Input');
  const documentInput = {
    contentType: 'document',
    requireHighQuality: true,
    content: 'Sample document content for testing'
  };

  try {
    const result1 = await engine.executeWorkflow(
      'conditional_content_processing',
      documentInput
    );

    console.log('✅ Document workflow completed:');
    console.log(`   Execution ID: ${result1.executionId}`);
    console.log(`   Conditional Results: ${result1.result.conditionalResults.length}`);

    result1.result.conditionalResults.forEach((conditional, index) => {
      console.log(`     ${index + 1}. ${conditional.step} (${conditional.type})`);
    });

  } catch (error) {
    console.error(`❌ Document workflow failed: ${error.message}`);
  }

  // Test case 2: Media input
  console.log('\n2️⃣ Test Case 2: Media Input');
  const mediaInput = {
    contentType: 'media',
    requireHighQuality: false,
    content: 'Sample media content for testing'
  };

  try {
    const result2 = await engine.executeWorkflow(
      'conditional_content_processing',
      mediaInput
    );

    console.log('✅ Media workflow completed:');
    console.log(`   Execution ID: ${result2.executionId}`);
    console.log(`   Conditional Results: ${result2.result.conditionalResults.length}`);

  } catch (error) {
    console.error(`❌ Media workflow failed: ${error.message}`);
  }

  return { engine, extensions };
}

async function demonstrateDynamicWorkflows() {
  console.log('=== DYNAMIC WORKFLOWS DEMO ===\n');

  const engine = new SystemWorkflowEngine();
  const extensions = new WorkflowExtensions({
    dynamicWorkflows: true
  });

  // Register custom handlers
  Object.entries(customTaskHandlers).forEach(([taskType, handler]) => {
    engine.registerTaskHandler(taskType, handler);
  });

  // Register dynamic workflow
  const dynamicWorkflow = extensions.createDynamicWorkflow(
    'dynamic_research_workflow',
    advancedWorkflowDefinitions.dynamic_research_workflow
  );

  engine.defineWorkflow('dynamic_research_workflow', dynamicWorkflow);

  console.log('🔄 Testing dynamic workflow with varying search results...\n');

  // Test case 1: Many search results
  console.log('1️⃣ Test Case 1: Many Search Results');
  const manyResultsInput = {
    query: 'artificial intelligence',
    searchResults: Array.from({ length: 10 }, (_, i) => ({
      url: `https://example.com/result${i + 1}`,
      title: `Result ${i + 1}`
    })),
    analysisComplete: false
  };

  try {
    const result1 = await engine.executeWorkflow(
      'dynamic_research_workflow',
      manyResultsInput
    );

    console.log('✅ Dynamic workflow (many results) completed:');
    console.log(`   Execution ID: ${result1.executionId}`);
    console.log(`   Dynamic Steps Generated: ${result1.result.dynamicStepsGenerated.length}`);

    result1.result.dynamicStepsGenerated.forEach(gen => {
      console.log(`     ${gen.generator}: Generated ${gen.stepsGenerated} steps`);
    });

  } catch (error) {
    console.error(`❌ Dynamic workflow (many results) failed: ${error.message}`);
  }

  // Test case 2: Analysis complete
  console.log('\n2️⃣ Test Case 2: Analysis Complete');
  const analysisCompleteInput = {
    query: 'machine learning',
    searchResults: Array.from({ length: 3 }, (_, i) => ({
      url: `https://example.com/result${i + 1}`,
      title: `Result ${i + 1}`
    })),
    analysisComplete: true
  };

  try {
    const result2 = await engine.executeWorkflow(
      'dynamic_research_workflow',
      analysisCompleteInput
    );

    console.log('✅ Dynamic workflow (analysis complete) completed:');
    console.log(`   Execution ID: ${result2.executionId}`);
    console.log(`   Dynamic Steps Generated: ${result2.result.dynamicStepsGenerated.length}`);

  } catch (error) {
    console.error(`❌ Dynamic workflow (analysis complete) failed: ${error.message}`);
  }

  return { engine, extensions };
}

async function demonstrateEventDrivenWorkflows() {
  console.log('=== EVENT-DRIVEN WORKFLOWS DEMO ===\n');

  const engine = new SystemWorkflowEngine();
  const extensions = new WorkflowExtensions({
    eventDrivenWorkflows: true
  });

  // Register custom handlers
  Object.entries(customTaskHandlers).forEach(([taskType, handler]) => {
    engine.registerTaskHandler(taskType, handler);
  });

  // Register event-driven workflow
  const eventDrivenWorkflow = extensions.createEventDrivenWorkflow(
    'event_driven_monitoring',
    advancedWorkflowDefinitions.event_driven_monitoring
  );

  engine.defineWorkflow('event_driven_monitoring', eventDrivenWorkflow);

  console.log('⚡ Testing event-driven workflow with different events...\n');

  // Simulate events
  const events = [
    {
      type: 'content_created',
      data: {
        contentId: 'content_001',
        contentType: 'document',
        priority: 1
      }
    },
    {
      type: 'content_updated',
      data: {
        contentId: 'content_002',
        contentType: 'image',
        priority: 2
      }
    },
    {
      type: 'quality_threshold_breached',
      data: {
        contentId: 'content_003',
        qualityScore: 45,
        threshold: 70
      }
    },
    {
      type: 'content_created',
      data: {
        contentId: 'content_004',
        contentType: 'video',
        priority: 4 // Should be filtered out
      }
    }
  ];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    console.log(`${i + 1}. Processing Event: ${event.type}`);
    
    try {
      const result = await extensions.executeEventDrivenWorkflow(
        eventDrivenWorkflow,
        event.data,
        { eventId: `event_${i + 1}`, timestamp: Date.now() }
      );

      if (result) {
        console.log(`   ✅ Event handled: ${result.action}`);
        console.log(`   Steps: ${result.steps.join(', ')}`);
        console.log(`   Priority: ${result.priority}`);
      } else {
        console.log(`   ⚠️ Event filtered out`);
      }

    } catch (error) {
      console.error(`   ❌ Event handling failed: ${error.message}`);
    }

    console.log('');
  }

  return { engine, extensions };
}

async function demonstrateCompositeWorkflows() {
  console.log('=== COMPOSITE WORKFLOWS DEMO ===\n');

  const engine = new SystemWorkflowEngine();
  const extensions = new WorkflowExtensions({
    workflowComposition: true
  });

  // Register custom handlers
  Object.entries(customTaskHandlers).forEach(([taskType, handler]) => {
    engine.registerTaskHandler(taskType, handler);
  });

  // Register composite workflow
  const compositeWorkflow = extensions.createCompositeWorkflow(
    'composite_multisource_processing',
    advancedWorkflowDefinitions.composite_multisource_processing
  );

  engine.defineWorkflow('composite_multisource_processing', compositeWorkflow);

  console.log('🔧 Testing composite workflow execution...\n');

  const inputData = {
    query: 'digital transformation',
    sources: ['web', 'documents', 'social_media'],
    analysisDepth: 'comprehensive'
  };

  try {
    const result = await extensions.executeCompositeWorkflow(
      compositeWorkflow,
      inputData,
      { sessionId: 'composite_demo_session' }
    );

    console.log('✅ Composite workflow completed:');
    console.log(`   Execution Strategy: ${result.strategy}`);
    console.log(`   Sub-workflows: ${Object.keys(result.subResults).length}`);

    Object.entries(result.subResults).forEach(([subWorkflowId, subResult]) => {
      console.log(`   ${subWorkflowId}:`);
      if (subResult.error) {
        console.log(`     ❌ Error: ${subResult.error}`);
      } else {
        console.log(`     ✅ Success`);
        if (subResult.output) {
          console.log(`     Output Type: ${typeof subResult.output}`);
        }
      }
    });

  } catch (error) {
    console.error(`❌ Composite workflow failed: ${error.message}`);
  }

  return { engine, extensions };
}

async function demonstrateAdaptiveWorkflows() {
  console.log('=== ADAPTIVE WORKFLOWS DEMO ===\n');

  const engine = new SystemWorkflowEngine();
  const extensions = new WorkflowExtensions({
    adaptiveWorkflows: true
  });

  // Register custom handlers
  Object.entries(customTaskHandlers).forEach(([taskType, handler]) => {
    engine.registerTaskHandler(taskType, handler);
  });

  // Register adaptive workflow
  const adaptiveWorkflow = extensions.createAdaptiveWorkflow(
    'adaptive_content_optimization',
    advancedWorkflowDefinitions.adaptive_content_optimization
  );

  engine.defineWorkflow('adaptive_content_optimization', adaptiveWorkflow);

  console.log('🧠 Testing adaptive workflow with different performance data...\n');

  // Test case 1: Slow performance
  console.log('1️⃣ Test Case 1: Slow Performance');
  const slowPerformanceInput = {
    content: 'Sample content for optimization',
    performance: {
      averageLoadTime: 4000, // > 3000ms
      engagementRate: 0.3,
      bounceRate: 0.8
    }
  };

  try {
    const result1 = await extensions.executeAdaptiveWorkflow(
      adaptiveWorkflow,
      slowPerformanceInput,
      { scenario: 'slow_performance' }
    );

    console.log('✅ Adaptive workflow (slow performance) completed:');
    console.log(`   Execution ID: ${result1.executionId}`);
    console.log(`   Adaptations: ${result1.adaptations.length}`);

    result1.adaptations.forEach(adaptation => {
      console.log(`     ${adaptation.rule}: Applied at ${new Date(adaptation.timestamp).toLocaleTimeString()}`);
    });

  } catch (error) {
    console.error(`❌ Adaptive workflow (slow performance) failed: ${error.message}`);
  }

  // Test case 2: Good performance
  console.log('\n2️⃣ Test Case 2: Good Performance');
  const goodPerformanceInput = {
    content: 'Sample content for optimization',
    performance: {
      averageLoadTime: 1500, // < 3000ms
      engagementRate: 0.8,
      bounceRate: 0.2
    }
  };

  try {
    const result2 = await extensions.executeAdaptiveWorkflow(
      adaptiveWorkflow,
      goodPerformanceInput,
      { scenario: 'good_performance' }
    );

    console.log('✅ Adaptive workflow (good performance) completed:');
    console.log(`   Execution ID: ${result2.executionId}`);
    console.log(`   Adaptations: ${result2.adaptations.length}`);

  } catch (error) {
    console.error(`❌ Adaptive workflow (good performance) failed: ${error.message}`);
  }

  // Get adaptation suggestions
  console.log('\n📋 Adaptation Suggestions:');
  const suggestions = extensions.getAdaptationSuggestions('adaptive_content_optimization');
  
  if (suggestions.length > 0) {
    suggestions.forEach((suggestion, index) => {
      console.log(`   ${index + 1}. ${suggestion.type}`);
      console.log(`      Reason: ${suggestion.reason}`);
      console.log(`      Suggestion: ${suggestion.suggestion}`);
    });
  } else {
    console.log('   No suggestions available');
  }

  return { engine, extensions };
}

async function demonstrateWorkflowTemplates() {
  console.log('=== WORKFLOW TEMPLATES DEMO ===\n');

  const extensions = new WorkflowExtensions();

  // Create workflow from template
  console.log('📋 Creating workflows from templates...\n');

  // Create content analysis workflow from template
  const contentAnalysisWorkflow = extensions.createWorkflowTemplate(
    'my_content_analysis',
    workflowTemplates.content_analysis_template
  );

  console.log('✅ Created Content Analysis Workflow from Template:');
  console.log(`   ID: ${contentAnalysisWorkflow.id}`);
  console.log(`   Name: ${contentAnalysisWorkflow.name}`);
  console.log(`   Parameters: ${contentAnalysisWorkflow.parameters.length}`);
  console.log(`   Steps: ${contentAnalysisWorkflow.steps.length}`);
  console.log(`   Conditional Steps: ${contentAnalysisWorkflow.conditionalSteps.length}`);

  // Create research workflow from template
  const researchWorkflow = extensions.createWorkflowTemplate(
    'my_research_workflow',
    workflowTemplates.research_template
  );

  console.log('\n✅ Created Research Workflow from Template:');
  console.log(`   ID: ${researchWorkflow.id}`);
  console.log(`   Name: ${researchWorkflow.name}`);
  console.log(`   Parameters: ${researchWorkflow.parameters.length}`);

  // Test template instantiation with different parameters
  console.log('\n🧪 Testing template instantiation...\n');

  // Test 1: Basic content analysis
  console.log('1️⃣ Test: Basic Content Analysis');
  const basicParams = {
    content: { text: 'Basic content for analysis' },
    analysisDepth: 'basic',
    includeSentiment: false
  };

  console.log(`   Parameters: ${JSON.stringify(basicParams, null, 2)}`);
  console.log(`   Expected steps: content_analysis`);

  // Test 2: Comprehensive content analysis
  console.log('\n2️⃣ Test: Comprehensive Content Analysis');
  const comprehensiveParams = {
    content: { text: 'Comprehensive content for deep analysis' },
    analysisDepth: 'comprehensive',
    includeSentiment: true
  };

  console.log(`   Parameters: ${JSON.stringify(comprehensiveParams, null, 2)}`);
  console.log(`   Expected steps: content_analysis, deep_analysis, sentiment_check`);

  // Test 3: Deep research
  console.log('\n3️⃣ Test: Deep Research');
  const deepResearchParams = {
    query: 'artificial intelligence applications',
    sources: ['web', 'academic', 'industry'],
    depth: 'deep'
  };

  console.log(`   Parameters: ${JSON.stringify(deepResearchParams, null, 2)}`);
  console.log(`   Expected steps: initial_search, search_academic, deep_analysis`);

  return extensions;
}

async function demonstrateCustomTaskHandlers() {
  console.log('=== CUSTOM TASK HANDLERS DEMO ===\n');

  const engine = new SystemWorkflowEngine();
  const extensions = new WorkflowExtensions();

  // Register custom task handlers
  console.log('🔧 Registering custom task handlers...\n');

  Object.entries(customTaskHandlers).forEach(([taskType, handler]) => {
    extensions.registerCustomTaskHandler(taskType, handler, {
      name: taskType,
      description: `Custom handler for ${taskType}`,
      category: 'custom',
      timeout: 60000,
      parameters: [
        {
          name: 'inputData',
          type: 'object',
          required: true,
          description: 'Input data for processing'
        }
      ]
    });

    engine.registerTaskHandler(taskType, handler);
    
    console.log(`✅ Registered: ${taskType}`);
  });

  // Create workflow using custom handlers
  const customWorkflow = {
    name: 'Custom Handlers Workflow',
    description: 'Workflow using custom task handlers',
    steps: [
      {
        type: 'social_media_scraping',
        name: 'scrape_social_data',
        description: 'Scrape social media data',
        timeout: 90000
      },
      {
        type: 'sentiment_analysis',
        name: 'analyze_sentiment',
        description: 'Analyze sentiment',
        timeout: 60000,
        dependencies: [0]
      },
      {
        type: 'performance_analysis',
        name: 'analyze_performance',
        description: 'Analyze performance',
        timeout: 45000,
        dependencies: [0]
      },
      {
        type: 'audience_analysis',
        name: 'analyze_audience',
        description: 'Analyze audience',
        timeout: 75000,
        dependencies: [0]
      }
    ],
    parallel: false,
    timeout: 300000
  };

  engine.defineWorkflow('custom_handlers_workflow', customWorkflow);

  console.log('\n🚀 Executing workflow with custom handlers...\n');

  const inputData = {
    platform: 'twitter',
    query: 'artificial intelligence',
    timeframe: 'last_7_days'
  };

  try {
    const result = await engine.executeWorkflow(
      'custom_handlers_workflow',
      inputData
    );

    console.log('✅ Custom handlers workflow completed:');
    console.log(`   Execution ID: ${result.executionId}`);
    console.log(`   Status: ${result.status}`);

    if (result.result) {
      console.log('   Results Summary:');
      Object.entries(result.result).forEach(([key, value]) => {
        console.log(`   ${key}:`);
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            console.log(`     ${subKey}: ${subValue}`);
          });
        } else {
          console.log(`     ${value}`);
        }
      });
    }

  } catch (error) {
    console.error(`❌ Custom handlers workflow failed: ${error.message}`);
  }

  return { engine, extensions };
}

async function demonstrateWorkflowVersioning() {
  console.log('=== WORKFLOW VERSIONING DEMO ===\n');

  const extensions = new WorkflowExtensions({
    workflowVersioning: true
  });

  console.log('📝 Creating workflow versions...\n');

  // Version 1.0
  const workflowV1 = {
    name: 'Content Processing Workflow',
    description: 'Initial version',
    steps: [
      { type: 'content_analysis', name: 'analyze' },
      { type: 'quality_assessment', name: 'check_quality' }
    ],
    timeout: 120000
  };

  const versionedWorkflow1 = extensions.createWorkflowVersion(
    'content_processing',
    workflowV1,
    '1.0.0'
  );

  console.log('✅ Created Version 1.0.0');
  console.log(`   Steps: ${versionedWorkflow1.steps.length}`);

  // Version 1.1
  const workflowV1_1 = {
    name: 'Content Processing Workflow',
    description: 'Added sentiment analysis',
    steps: [
      { type: 'content_analysis', name: 'analyze' },
      { type: 'sentiment_analysis', name: 'analyze_sentiment' },
      { type: 'quality_assessment', name: 'check_quality' }
    ],
    timeout: 150000
  };

  const versionedWorkflow1_1 = extensions.createWorkflowVersion(
    'content_processing',
    workflowV1_1,
    '1.1.0'
  );

  console.log('✅ Created Version 1.1.0');
  console.log(`   Steps: ${versionedWorkflow1_1.steps.length}`);

  // Version 2.0
  const workflowV2 = {
    name: 'Content Processing Workflow',
    description: 'Major update with parallel processing',
    steps: [
      { type: 'content_analysis', name: 'analyze' },
      { type: 'sentiment_analysis', name: 'analyze_sentiment' }
    ],
    parallel: true,
    timeout: 180000
  };

  const versionedWorkflow2 = extensions.createWorkflowVersion(
    'content_processing',
    workflowV2,
    '2.0.0'
  );

  console.log('✅ Created Version 2.0.0');
  console.log(`   Steps: ${versionedWorkflow2.steps.length}`);
  console.log(`   Parallel: ${versionedWorkflow2.parallel}`);

  // Compare versions
  console.log('\n🔍 Comparing workflow versions...\n');

  const comparison1_1 = extensions.compareWorkflowVersions(
    'content_processing',
    '1.0.0',
    '1.1.0'
  );

  console.log('📊 Comparison 1.0.0 vs 1.1.0:');
  comparison1_1.differences.forEach(diff => {
    console.log(`   ${diff.type}: ${JSON.stringify(diff)}`);
  });

  const comparison1_2 = extensions.compareWorkflowVersions(
    'content_processing',
    '1.1.0',
    '2.0.0'
  );

  console.log('\n📊 Comparison 1.1.0 vs 2.0.0:');
  comparison1_2.differences.forEach(diff => {
    console.log(`   ${diff.type}: ${JSON.stringify(diff)}`);
  });

  // Get all versions
  console.log('\n📚 All workflow versions:');
  const allVersions = extensions.getWorkflowVersions('content_processing');
  
  Array.from(allVersions.keys()).sort().forEach(version => {
    const workflow = allVersions.get(version);
    console.log(`   ${version}:`);
    console.log(`     Created: ${new Date(workflow.versionedAt).toLocaleString()}`);
    console.log(`     Steps: ${workflow.steps.length}`);
    console.log(`     Parallel: ${workflow.parallel || false}`);
  });

  return extensions;
}

async function demonstrateExtensionsImportExport() {
  console.log('=== EXTENSIONS IMPORT/EXPORT DEMO ===\n');

  const extensions1 = new WorkflowExtensions({
    conditionalExecution: true,
    dynamicWorkflows: true,
    adaptiveWorkflows: true
  });

  // Register some custom handlers and templates
  extensions1.registerCustomTaskHandler('custom_handler_1', async (data) => {
    return { result: 'Custom handler 1 result', data };
  });

  extensions1.createWorkflowTemplate('custom_template_1', {
    name: 'Custom Template 1',
    parameters: [{ name: 'param1', type: 'string' }],
    steps: [{ type: 'custom_handler_1' }]
  });

  console.log('📤 Exporting extensions...\n');

  // Export extensions
  const exportedExtensions = extensions1.exportExtensions();

  console.log('✅ Exported extensions:');
  console.log(`   Custom Task Handlers: ${Object.keys(exportedExtensions.customTaskHandlers).length}`);
  console.log(`   Workflow Templates: ${Object.keys(exportedExtensions.workflowTemplates).length}`);
  console.log(`   Adaptive Rules: ${Object.keys(exportedExtensions.adaptiveRules).length}`);
  console.log(`   Workflow Versions: ${Object.keys(exportedExtensions.workflowVersions).length}`);

  // Create new instance and import
  console.log('\n📥 Importing extensions to new instance...\n');

  const extensions2 = new WorkflowExtensions();
  extensions2.importExtensions(exportedExtensions);

  console.log('✅ Imported extensions:');
  console.log(`   Custom Task Handlers: ${extensions2.config.customTaskHandlers.size}`);
  console.log(`   Workflow Templates: ${extensions2.config.workflowTemplates.size}`);

  // Verify imported data
  const importedHandler = extensions2.config.customTaskHandlers.get('custom_handler_1');
  if (importedHandler) {
    console.log(`   ✅ Custom handler imported: ${importedHandler.metadata.name}`);
  }

  const importedTemplate = extensions2.config.workflowTemplates.get('custom_template_1');
  if (importedTemplate) {
    console.log(`   ✅ Custom template imported: ${importedTemplate.name}`);
  }

  return { extensions1, extensions2, exportedExtensions };
}

// Main execution function
async function runAllWorkflowExtensionDemos() {
  try {
    console.log('🎯 WORKFLOW EXTENSIONS DEMOS\n');
    console.log('='.repeat(60));
    
    await demonstrateConditionalWorkflows();
    await demonstrateDynamicWorkflows();
    await demonstrateEventDrivenWorkflows();
    await demonstrateCompositeWorkflows();
    await demonstrateAdaptiveWorkflows();
    await demonstrateWorkflowTemplates();
    await demonstrateCustomTaskHandlers();
    await demonstrateWorkflowVersioning();
    await demonstrateExtensionsImportExport();
    
    console.log('\n🎉 All workflow extension demos completed!');
    
  } catch (error) {
    console.error('💥 Demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateConditionalWorkflows,
  demonstrateDynamicWorkflows,
  demonstrateEventDrivenWorkflows,
  demonstrateCompositeWorkflows,
  demonstrateAdaptiveWorkflows,
  demonstrateWorkflowTemplates,
  demonstrateCustomTaskHandlers,
  demonstrateWorkflowVersioning,
  demonstrateExtensionsImportExport,
  runAllWorkflowExtensionDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllWorkflowExtensionDemos();
}
