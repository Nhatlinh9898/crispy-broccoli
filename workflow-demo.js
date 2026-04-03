// Workflow Demo
// Demo hệ thống workflow engine và các quy trình định nghĩa

const SystemWorkflowEngine = require('./system-workflow-engine.js');
const { workflowDefinitions, complexWorkflows, workflowUtils } = require('./workflow-definitions.js');

// Demo functions
async function demonstrateWorkflowEngine() {
  console.log('=== WORKFLOW ENGINE DEMO ===\n');

  // Initialize workflow engine
  const engine = new SystemWorkflowEngine({
    maxConcurrentWorkflows: 3,
    defaultTimeout: 120000, // 2 minutes
    retryAttempts: 2,
    retryDelay: 3000,
    enableLogging: true,
    enableMetrics: true
  });

  // Register all workflow definitions
  console.log('📋 Registering workflows...');
  Object.entries(workflowDefinitions).forEach(([workflowId, definition]) => {
    engine.defineWorkflow(workflowId, definition);
  });

  console.log(`✅ Registered ${Object.keys(workflowDefinitions).length} workflows\n`);

  // Show workflow statistics
  const stats = engine.getMetrics();
  console.log('📊 Initial Engine Statistics:');
  console.log(`   Defined Workflows: ${stats.definedWorkflows}`);
  console.log(`   Total Workflows: ${stats.totalWorkflows}`);
  console.log(`   Completed Workflows: ${stats.completedWorkflows}`);
  console.log(`   Failed Workflows: ${stats.failedWorkflows}`);
  console.log(`   Success Rate: ${stats.successRate.toFixed(1)}%`);

  return engine;
}

async function demonstrateSimpleWorkflow() {
  console.log('=== SIMPLE WORKFLOW EXECUTION DEMO ===\n');

  const engine = await demonstrateWorkflowEngine();

  // Execute a simple content analysis workflow
  console.log('🚀 Executing Content Analysis Workflow...\n');

  const inputData = {
    content: 'Đây là nội dung mẫu để phân tích trong hệ thống workflow.',
    source: 'demo',
    timestamp: Date.now()
  };

  try {
    const result = await engine.executeWorkflow(
      'content_analysis_workflow',
      inputData,
      { priority: 'high', userId: 'demo_user' }
    );

    console.log('✅ Workflow Execution Results:');
    console.log(`   Execution ID: ${result.executionId}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Result Type: ${typeof result.result}`);

    if (result.result) {
      console.log('   Result Summary:');
      if (result.result.totalContent) {
        console.log(`     Total Content: ${result.result.totalContent}`);
      }
      if (result.result.analyzedContent) {
        console.log(`     Analyzed Content: ${result.result.analyzedContent}`);
      }
      if (result.result.topTopics) {
        console.log(`     Top Topics: ${result.result.topTopics.length}`);
      }
    }

    // Show execution details
    console.log('\n📋 Execution Details:');
    const execution = result.execution;
    console.log(`   Start Time: ${new Date(execution.startTime).toLocaleString()}`);
    console.log(`   End Time: ${new Date(execution.endTime).toLocaleString()}`);
    console.log(`   Duration: ${execution.endTime - execution.startTime}ms`);
    console.log(`   Steps Executed: ${execution.steps.length}`);

    execution.steps.forEach((step, index) => {
      console.log(`     ${index + 1}. ${step.stepName} (${step.stepType}) - ${step.endTime - step.startTime}ms`);
    });

  } catch (error) {
    console.error(`❌ Workflow execution failed: ${error.message}`);
  }

  return engine;
}

async function demonstrateParallelWorkflow() {
  console.log('=== PARALLEL WORKFLOW EXECUTION DEMO ===\n');

  const engine = new SystemWorkflowEngine({
    maxConcurrentWorkflows: 5
  });

  // Register parallel workflow
  engine.defineWorkflow('system_monitoring_workflow', workflowDefinitions.system_monitoring_workflow);

  console.log('🚀 Executing System Monitoring Workflow (Parallel Steps)...\n');

  const inputData = {
    systemId: 'demo_system',
    checkLevel: 'comprehensive',
    timestamp: Date.now()
  };

  try {
    const result = await engine.executeWorkflow(
      'system_monitoring_workflow',
      inputData,
      { alertThreshold: 80 }
    );

    console.log('✅ Parallel Workflow Results:');
    console.log(`   Execution ID: ${result.executionId}`);
    console.log(`   Status: ${result.status}`);

    if (result.result && result.result.metadata) {
      console.log(`   Parallel Execution: ${result.result.metadata.parallelExecution}`);
      console.log(`   Total Steps: ${result.result.metadata.totalSteps}`);
      console.log(`   Completed Steps: ${result.result.metadata.completedSteps}`);
    }

    // Show parallel results
    if (result.result && result.result.results) {
      console.log('\n📊 Parallel Step Results:');
      Object.entries(result.result.results).forEach(([stepName, stepResult]) => {
        console.log(`   ${stepName}:`);
        if (typeof stepResult === 'object') {
          console.log(`     Type: ${stepResult.constructor.name}`);
          console.log(`     Keys: ${Object.keys(stepResult).join(', ')}`);
        } else {
          console.log(`     Value: ${stepResult}`);
        }
      });
    }

  } catch (error) {
    console.error(`❌ Parallel workflow execution failed: ${error.message}`);
  }

  return engine;
}

async function demonstrateWorkflowChaining() {
  console.log('=== WORKFLOW CHAINING DEMO ===\n');

  const engine = new SystemWorkflowEngine();

  // Register workflows
  engine.defineWorkflow('web_research_workflow', workflowDefinitions.web_research_workflow);
  engine.defineWorkflow('content_analysis_workflow', workflowDefinitions.content_analysis_workflow);
  engine.defineWorkflow('content_generation_workflow', workflowDefinitions.content_generation_workflow);

  console.log('🔗 Executing Chained Workflows...\n');

  try {
    // Step 1: Web Research
    console.log('1️⃣ Step 1: Web Research');
    const researchInput = {
      query: 'trí tuệ nhân tạo trong xử lý ngôn ngữ tự nhiên',
      sources: ['academic', 'news', 'technical'],
      maxResults: 10
    };

    const researchResult = await engine.executeWorkflow(
      'web_research_workflow',
      researchInput
    );

    console.log(`   ✅ Research completed: ${researchResult.executionId}`);

    // Step 2: Content Analysis
    console.log('\n2️⃣ Step 2: Content Analysis');
    const analysisInput = {
      content: researchResult.result,
      analysisType: 'comprehensive',
      extractTopics: true,
      analyzeSentiment: true
    };

    const analysisResult = await engine.executeWorkflow(
      'content_analysis_workflow',
      analysisInput
    );

    console.log(`   ✅ Analysis completed: ${analysisResult.executionId}`);

    // Step 3: Content Generation
    console.log('\n3️⃣ Step 3: Content Generation');
    const generationInput = {
      researchData: researchResult.result,
      analysisData: analysisResult.result,
      contentType: 'article',
      tone: 'professional',
      length: 'medium'
    };

    const generationResult = await engine.executeWorkflow(
      'content_generation_workflow',
      generationInput
    );

    console.log(`   ✅ Generation completed: ${generationResult.executionId}`);

    // Show chain summary
    console.log('\n📋 Workflow Chain Summary:');
    console.log(`   Total Workflows: 3`);
    console.log(`   Total Execution Time: ${Date.now() - researchInput.timestamp}ms`);
    console.log(`   Final Output: ${typeof generationResult.result}`);

  } catch (error) {
    console.error(`❌ Workflow chaining failed: ${error.message}`);
  }

  return engine;
}

async function demonstrateErrorHandling() {
  console.log('=== ERROR HANDLING DEMO ===\n');

  const engine = new SystemWorkflowEngine({
    retryAttempts: 3,
    retryDelay: 1000
  });

  // Register workflow with error handling
  const errorProneWorkflow = {
    name: 'Error Prone Workflow',
    description: 'Demo workflow with potential errors',
    steps: [
      {
        type: 'data_validation',
        name: 'validate_input',
        description: 'Validate input data',
        timeout: 5000
      },
      {
        type: 'system_monitoring',
        name: 'simulate_error',
        description: 'Simulate an error',
        timeout: 3000,
        retryPolicy: {
          maxAttempts: 3,
          delay: 1000
        }
      },
      {
        type: 'error_recovery',
        name: 'recover_from_error',
        description: 'Recover from error',
        timeout: 5000,
        dependencies: [1]
      }
    ],
    parallel: false,
    timeout: 30000
  };

  engine.defineWorkflow('error_prone_workflow', errorProneWorkflow);

  console.log('🚀 Executing Error Prone Workflow...\n');

  const inputData = {
    testScenario: 'error_simulation',
    errorType: 'timeout',
    shouldRecover: true
  };

  try {
    const result = await engine.executeWorkflow(
      'error_prone_workflow',
      inputData
    );

    console.log('✅ Error Handling Results:');
    console.log(`   Execution ID: ${result.executionId}`);
    console.log(`   Status: ${result.status}`);

  } catch (error) {
    console.log('⚠️ Expected Error Caught:');
    console.log(`   Error: ${error.message}`);
    console.log(`   This demonstrates the error handling capability`);
  }

  // Show error statistics
  const metrics = engine.getMetrics();
  console.log('\n📊 Error Handling Statistics:');
  console.log(`   Total Workflows: ${metrics.totalWorkflows}`);
  console.log(`   Failed Workflows: ${metrics.failedWorkflows}`);
  console.log(`   Failure Rate: ${metrics.failureRate.toFixed(1)}%`);

  return engine;
}

async function demonstrateWorkflowMonitoring() {
  console.log('=== WORKFLOW MONITORING DEMO ===\n');

  const engine = new SystemWorkflowEngine({
    maxConcurrentWorkflows: 3,
    enableMetrics: true
  });

  // Register multiple workflows
  Object.entries(workflowDefinitions).slice(0, 3).forEach(([id, def]) => {
    engine.defineWorkflow(id, def);
  });

  console.log('🚀 Executing Multiple Workflows for Monitoring...\n');

  const workflowPromises = [];
  const workflowIds = Object.keys(workflowDefinitions).slice(0, 3);

  // Start multiple workflows
  workflowIds.forEach((workflowId, index) => {
    const promise = engine.executeWorkflow(workflowId, {
      testId: index,
      timestamp: Date.now()
    });
    workflowPromises.push(promise);
  });

  // Monitor workflows while they run
  const monitoringInterval = setInterval(() => {
    const allWorkflows = engine.getAllWorkflows();
    
    console.log('📊 Real-time Monitoring:');
    console.log(`   Active Workflows: ${allWorkflows.active.length}`);
    console.log(`   Completed Workflows: ${allWorkflows.completed.length}`);
    console.log(`   Failed Workflows: ${allWorkflows.failed.length}`);

    allWorkflows.active.forEach(workflow => {
      console.log(`     ${workflow.workflowId}: ${workflow.status} (${Date.now() - workflow.startTime}ms)`);
    });

  }, 2000);

  try {
    // Wait for all workflows to complete
    const results = await Promise.allSettled(workflowPromises);
    
    clearInterval(monitoringInterval);

    console.log('\n✅ All Workflows Completed:');
    results.forEach((result, index) => {
      const workflowId = workflowIds[index];
      if (result.status === 'fulfilled') {
        console.log(`   ${workflowId}: ✅ Success (${result.value.executionId})`);
      } else {
        console.log(`   ${workflowId}: ❌ Failed (${result.reason.message})`);
      }
    });

  } catch (error) {
    clearInterval(monitoringInterval);
    console.error(`❌ Monitoring demo failed: ${error.message}`);
  }

  // Show final metrics
  const finalMetrics = engine.getMetrics();
  console.log('\n📈 Final Metrics:');
  console.log(`   Total Workflows: ${finalMetrics.totalWorkflows}`);
  console.log(`   Success Rate: ${finalMetrics.successRate.toFixed(1)}%`);
  console.log(`   Average Execution Time: ${finalMetrics.averageExecutionTime.toFixed(2)}ms`);

  return engine;
}

async function demonstrateWorkflowUtils() {
  console.log('=== WORKFLOW UTILITIES DEMO ===\n');

  console.log('🔧 Testing Workflow Utilities...\n');

  // Get workflows by category
  console.log('1️⃣ Workflows by Category:');
  const categories = ['content_processing', 'document_processing', 'media_processing', 'system_monitoring'];
  
  categories.forEach(category => {
    const workflows = workflowUtils.getWorkflowsByCategory(category);
    console.log(`   ${category}: ${workflows.length} workflows`);
    workflows.forEach(wf => {
      console.log(`     - ${wf.name} (${wf.id})`);
    });
  });

  // Get workflows by priority
  console.log('\n2️⃣ Workflows by Priority:');
  const priorities = ['high', 'medium', 'low'];
  
  priorities.forEach(priority => {
    const workflows = workflowUtils.getWorkflowsByPriority(priority);
    console.log(`   ${priority}: ${workflows.length} workflows`);
  });

  // Get automated workflows
  console.log('\n3️⃣ Automated Workflows:');
  const automatedWorkflows = workflowUtils.getAutomatedWorkflows();
  console.log(`   Total: ${automatedWorkflows.length} automated workflows`);
  automatedWorkflows.forEach(wf => {
    console.log(`     - ${wf.name} (${wf.id})`);
  });

  // Get scheduled workflows
  console.log('\n4️⃣ Scheduled Workflows:');
  const scheduledWorkflows = workflowUtils.getScheduledWorkflows();
  console.log(`   Total: ${scheduledWorkflows.length} scheduled workflows`);
  scheduledWorkflows.forEach(wf => {
    console.log(`     - ${wf.name} (${wf.id}) - Schedule: ${wf.schedule}`);
  });

  // Estimate execution times
  console.log('\n5️⃣ Execution Time Estimates:');
  const sampleWorkflowIds = ['content_analysis_workflow', 'document_processing_workflow', 'neural_processing_workflow'];
  
  sampleWorkflowIds.forEach(workflowId => {
    const estimate = workflowUtils.estimateExecutionTime(workflowId);
    if (estimate) {
      console.log(`   ${workflowId}:`);
      console.log(`     Estimated Time: ${estimate.formattedTime}`);
      console.log(`     Steps: ${estimate.steps}`);
    }
  });

  // Validate workflows
  console.log('\n6️⃣ Workflow Validation:');
  const validationResults = {};
  
  Object.entries(workflowDefinitions).forEach(([id, workflow]) => {
    const validation = workflowUtils.validateWorkflow(workflow);
    validationResults[id] = validation;
    
    if (!validation.valid) {
      console.log(`   ${id}: ❌ Invalid`);
      validation.errors.forEach(error => {
        console.log(`     - ${error}`);
      });
    }
  });

  const validWorkflows = Object.values(validationResults).filter(v => v.valid).length;
  const invalidWorkflows = Object.values(validationResults).filter(v => !v.valid).length;
  
  console.log(`\n   Validation Summary:`);
  console.log(`     Valid Workflows: ${validWorkflows}`);
  console.log(`     Invalid Workflows: ${invalidWorkflows}`);

  return workflowUtils;
}

async function demonstrateComplexWorkflow() {
  console.log('=== COMPLEX WORKFLOW DEMO ===\n');

  const engine = new SystemWorkflowEngine({
    maxConcurrentWorkflows: 2,
    defaultTimeout: 600000 // 10 minutes
  });

  console.log('🚀 Executing Complex Multi-Source Research Workflow...\n');

  // Simulate complex research workflow
  const complexWorkflow = {
    name: 'Complex Research Pipeline',
    description: 'Nghiên cứu phức tạp từ nhiều nguồn',
    steps: [
      {
        type: 'web_search',
        name: 'initial_web_search',
        description: 'Tìm kiếm web ban đầu',
        timeout: 60000
      },
      {
        type: 'document_processing',
        name: 'process_documents',
        description: 'Xử lý tài liệu liên quan',
        timeout: 120000
      },
      {
        type: 'content_analysis',
        name: 'analyze_web_content',
        description: 'Phân tích nội dung web',
        timeout: 90000,
        dependencies: [0]
      },
      {
        type: 'media_search',
        name: 'find_related_media',
        description: 'Tìm media liên quan',
        timeout: 80000,
        dependencies: [0]
      },
      {
        type: 'neural_processing',
        name: 'neural_analysis',
        description: 'Phân tích với neural network',
        timeout: 150000,
        dependencies: [2, 3]
      },
      {
        type: 'content_generation',
        name: 'generate_final_report',
        description: 'Tạo báo cáo cuối cùng',
        timeout: 120000,
        dependencies: [1, 4]
      },
      {
        type: 'quality_assessment',
        name: 'final_quality_check',
        description: 'Kiểm tra chất lượng cuối',
        timeout: 30000,
        dependencies: [5]
      }
    ],
    parallel: false,
    timeout: 600000, // 10 minutes
    metadata: {
      category: 'complex_research',
      priority: 'high',
      automated: false
    }
  };

  engine.defineWorkflow('complex_research_workflow', complexWorkflow);

  const inputData = {
    researchTopic: 'ứng dụng AI trong xử lý nội dung lớn',
    sources: ['academic', 'industry', 'news'],
    depth: 'comprehensive',
    outputFormat: 'detailed_report',
    timestamp: Date.now()
  };

  try {
    const startTime = Date.now();
    
    const result = await engine.executeWorkflow(
      'complex_research_workflow',
      inputData,
      { 
        priority: 'high',
        userId: 'research_user',
        sessionId: 'complex_demo_session'
      }
    );

    const executionTime = Date.now() - startTime;

    console.log('✅ Complex Workflow Results:');
    console.log(`   Execution ID: ${result.executionId}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Total Execution Time: ${executionTime}ms`);
    console.log(`   Steps Completed: ${result.execution.steps.length}`);

    // Show step-by-step execution
    console.log('\n📋 Step-by-Step Execution:');
    result.execution.steps.forEach((step, index) => {
      const duration = step.endTime - step.startTime;
      console.log(`   ${index + 1}. ${step.stepName}`);
      console.log(`      Type: ${step.stepType}`);
      console.log(`      Duration: ${duration}ms`);
      console.log(`      Status: ${step.status}`);
    });

    // Show final result summary
    if (result.result) {
      console.log('\n📊 Final Result Summary:');
      console.log(`   Result Type: ${typeof result.result}`);
      
      if (result.result.results) {
        console.log(`   Sub-results: ${Object.keys(result.result.results).length}`);
      }
      
      if (result.result.metadata) {
        console.log(`   Metadata: ${JSON.stringify(result.result.metadata)}`);
      }
    }

  } catch (error) {
    console.error(`❌ Complex workflow execution failed: ${error.message}`);
  }

  return engine;
}

// Main execution function
async function runAllWorkflowDemos() {
  try {
    console.log('🎯 WORKFLOW SYSTEM DEMOS\n');
    console.log('='.repeat(60));
    
    await demonstrateWorkflowEngine();
    await demonstrateSimpleWorkflow();
    await demonstrateParallelWorkflow();
    await demonstrateWorkflowChaining();
    await demonstrateErrorHandling();
    await demonstrateWorkflowMonitoring();
    await demonstrateWorkflowUtils();
    await demonstrateComplexWorkflow();
    
    console.log('\n🎉 All workflow demos completed!');
    
  } catch (error) {
    console.error('💥 Demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateWorkflowEngine,
  demonstrateSimpleWorkflow,
  demonstrateParallelWorkflow,
  demonstrateWorkflowChaining,
  demonstrateErrorHandling,
  demonstrateWorkflowMonitoring,
  demonstrateWorkflowUtils,
  demonstrateComplexWorkflow,
  runAllWorkflowDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllWorkflowDemos();
}
