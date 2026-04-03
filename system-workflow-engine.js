// System Workflow Engine
// Xây dựng quy trình workflow cho hệ thống 100 tầng

class SystemWorkflowEngine {
  constructor(config = {}) {
    this.config = {
      workflows: config.workflows || {},
      taskQueue: [],
      activeWorkflows: new Map(),
      completedWorkflows: new Map(),
      failedWorkflows: new Map(),
      maxConcurrentWorkflows: config.maxConcurrentWorkflows || 5,
      defaultTimeout: config.defaultTimeout || 300000, // 5 minutes
      retryAttempts: config.retryAttempts || 3,
      retryDelay: config.retryDelay || 5000, // 5 seconds
      enableLogging: config.enableLogging !== false,
      enableMetrics: config.enableMetrics !== false
    };
    
    this.taskHandlers = new Map();
    this.middleware = [];
    this.metrics = {
      totalWorkflows: 0,
      completedWorkflows: 0,
      failedWorkflows: 0,
      averageExecutionTime: 0,
      totalExecutionTime: 0
    };
    
    this.initializeDefaultHandlers();
  }

  // Initialize default task handlers
  initializeDefaultHandlers() {
    // Content processing handlers
    this.registerTaskHandler('content_analysis', this.handleContentAnalysis.bind(this));
    this.registerTaskHandler('document_processing', this.handleDocumentProcessing.bind(this));
    this.registerTaskHandler('media_processing', this.handleMediaProcessing.bind(this));
    this.registerTaskHandler('image_search', this.handleImageSearch.bind(this));
    this.registerTaskHandler('web_search', this.handleWebSearch.bind(this));
    
    // AI processing handlers
    this.registerTaskHandler('neural_processing', this.handleNeuralProcessing.bind(this));
    this.registerTaskHandler('content_generation', this.handleContentGeneration.bind(this));
    this.registerTaskHandler('quality_assessment', this.handleQualityAssessment.bind(this));
    
    // Data management handlers
    this.registerTaskHandler('data_extraction', this.handleDataExtraction.bind(this));
    this.registerTaskHandler('data_validation', this.handleDataValidation.bind(this));
    this.registerTaskHandler('data_transformation', this.handleDataTransformation.bind(this));
    
    // System management handlers
    this.registerTaskHandler('system_monitoring', this.handleSystemMonitoring.bind(this));
    this.registerTaskHandler('performance_optimization', this.handlePerformanceOptimization.bind(this));
    this.registerTaskHandler('error_recovery', this.handleErrorRecovery.bind(this));
  }

  // Register task handler
  registerTaskHandler(taskType, handler) {
    this.taskHandlers.set(taskType, handler);
  }

  // Register middleware
  registerMiddleware(middleware) {
    this.middleware.push(middleware);
  }

  // Define workflow
  defineWorkflow(workflowId, workflowDefinition) {
    const workflow = {
      id: workflowId,
      name: workflowDefinition.name || workflowId,
      description: workflowDefinition.description || '',
      steps: workflowDefinition.steps || [],
      parallel: workflowDefinition.parallel || false,
      retryPolicy: workflowDefinition.retryPolicy || {
        maxAttempts: this.config.retryAttempts,
        delay: this.config.retryDelay
      },
      timeout: workflowDefinition.timeout || this.config.defaultTimeout,
      metadata: workflowDefinition.metadata || {},
      createdAt: Date.now()
    };

    // Validate workflow
    this.validateWorkflow(workflow);

    this.config.workflows[workflowId] = workflow;
    console.log(`✅ Workflow defined: ${workflowId} with ${workflow.steps.length} steps`);

    return workflow;
  }

  // Validate workflow
  validateWorkflow(workflow) {
    if (!workflow.steps || workflow.steps.length === 0) {
      throw new Error(`Workflow ${workflow.id} must have at least one step`);
    }

    workflow.steps.forEach((step, index) => {
      if (!step.type) {
        throw new Error(`Step ${index + 1} in workflow ${workflow.id} must have a type`);
      }

      if (!this.taskHandlers.has(step.type)) {
        throw new Error(`No handler registered for task type: ${step.type}`);
      }

      if (step.dependencies && step.dependencies.length > 0) {
        step.dependencies.forEach(dep => {
          if (dep >= index) {
            throw new Error(`Step ${index + 1} cannot depend on future step ${dep + 1}`);
          }
        });
      }
    });
  }

  // Execute workflow
  async executeWorkflow(workflowId, inputData, options = {}) {
    const workflow = this.config.workflows[workflowId];
    
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    const executionId = this.generateExecutionId();
    const startTime = Date.now();

    console.log(`🚀 Executing workflow: ${workflowId} (Execution: ${executionId})`);

    const execution = {
      id: executionId,
      workflowId: workflowId,
      status: 'running',
      startTime: startTime,
      endTime: null,
      input: inputData,
      output: null,
      steps: [],
      errors: [],
      metadata: {
        ...workflow.metadata,
        ...options
      }
    };

    this.activeWorkflows.set(executionId, execution);
    this.metrics.totalWorkflows++;

    try {
      // Apply pre-execution middleware
      await this.applyMiddleware('pre-execution', execution);

      // Execute workflow steps
      const result = await this.executeWorkflowSteps(workflow, inputData, execution);

      execution.output = result;
      execution.status = 'completed';
      execution.endTime = Date.now();

      // Apply post-execution middleware
      await this.applyMiddleware('post-execution', execution);

      // Move to completed
      this.activeWorkflows.delete(executionId);
      this.completedWorkflows.set(executionId, execution);
      this.metrics.completedWorkflows++;
      this.metrics.totalExecutionTime += (execution.endTime - execution.startTime);
      this.metrics.averageExecutionTime = this.metrics.totalExecutionTime / this.metrics.completedWorkflows;

      console.log(`✅ Workflow completed: ${workflowId} in ${execution.endTime - execution.startTime}ms`);

      return {
        executionId: executionId,
        status: 'completed',
        result: result,
        execution: execution
      };

    } catch (error) {
      execution.status = 'failed';
      execution.errors.push({
        message: error.message,
        stack: error.stack,
        timestamp: Date.now()
      });
      execution.endTime = Date.now();

      // Apply error middleware
      await this.applyMiddleware('error', execution);

      // Move to failed
      this.activeWorkflows.delete(executionId);
      this.failedWorkflows.set(executionId, execution);
      this.metrics.failedWorkflows++;

      console.error(`❌ Workflow failed: ${workflowId} - ${error.message}`);

      throw error;
    }
  }

  // Execute workflow steps
  async executeWorkflowSteps(workflow, inputData, execution) {
    const steps = workflow.steps;
    const results = new Map();
    let currentData = inputData;

    if (workflow.parallel) {
      // Execute steps in parallel
      const stepPromises = steps.map((step, index) => 
        this.executeStep(step, currentData, index, results, execution)
      );

      const parallelResults = await Promise.allSettled(stepPromises);

      // Collect results
      parallelResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.set(index, result.value);
        } else {
          throw new Error(`Step ${index + 1} failed: ${result.reason.message}`);
        }
      });

      return this.combineParallelResults(results, steps);

    } else {
      // Execute steps sequentially
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        
        // Check dependencies
        if (step.dependencies) {
          const dependenciesMet = step.dependencies.every(depIndex => 
            results.has(depIndex)
          );
          
          if (!dependenciesMet) {
            throw new Error(`Dependencies not met for step ${i + 1}`);
          }
        }

        // Execute step
        const stepResult = await this.executeStep(step, currentData, i, results, execution);
        results.set(i, stepResult);
        
        // Update current data for next step
        currentData = stepResult;

        // Add step to execution log
        execution.steps.push({
          stepIndex: i,
          stepType: step.type,
          stepName: step.name || `Step ${i + 1}`,
          status: 'completed',
          startTime: Date.now(),
          endTime: Date.now(),
          result: stepResult
        });
      }

      return currentData;
    }
  }

  // Execute individual step
  async executeStep(step, inputData, stepIndex, previousResults, execution) {
    const handler = this.taskHandlers.get(step.type);
    
    if (!handler) {
      throw new Error(`No handler found for step type: ${step.type}`);
    }

    console.log(`   ⚙️ Executing step ${stepIndex + 1}: ${step.type}`);

    const stepContext = {
      step: step,
      stepIndex: stepIndex,
      execution: execution,
      previousResults: previousResults,
      inputData: inputData
    };

    // Apply pre-step middleware
    await this.applyMiddleware('pre-step', stepContext);

    try {
      // Execute with timeout
      const result = await this.executeWithTimeout(
        () => handler(inputData, step, stepContext),
        step.timeout || this.config.defaultTimeout
      );

      // Apply post-step middleware
      await this.applyMiddleware('post-step', { ...stepContext, result });

      return result;

    } catch (error) {
      // Apply error middleware
      await this.applyMiddleware('step-error', { ...stepContext, error });

      // Handle retry policy
      if (step.retryPolicy && step.retryPolicy.maxAttempts > 0) {
        return await this.retryStep(step, inputData, stepIndex, previousResults, execution, error);
      }

      throw error;
    }
  }

  // Execute with timeout
  async executeWithTimeout(fn, timeout) {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeout}ms`));
      }, timeout);

      try {
        const result = await fn();
        clearTimeout(timeoutId);
        resolve(result);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  // Retry step
  async retryStep(step, inputData, stepIndex, previousResults, execution, originalError) {
    const maxAttempts = step.retryPolicy.maxAttempts || this.config.retryAttempts;
    const delay = step.retryPolicy.delay || this.config.retryDelay;

    console.log(`   🔄 Retrying step ${stepIndex + 1} (${maxAttempts} attempts)`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`   🔄 Attempt ${attempt}/${maxAttempts} for step ${stepIndex + 1}`);
        
        // Wait before retry
        if (attempt > 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        const handler = this.taskHandlers.get(step.type);
        const result = await handler(inputData, step, {
          step: step,
          stepIndex: stepIndex,
          execution: execution,
          previousResults: previousResults,
          inputData: inputData,
          retryAttempt: attempt
        });

        console.log(`   ✅ Step ${stepIndex + 1} succeeded on attempt ${attempt}`);
        return result;

      } catch (error) {
        console.log(`   ❌ Step ${stepIndex + 1} attempt ${attempt} failed: ${error.message}`);
        
        if (attempt === maxAttempts) {
          throw new Error(`Step ${stepIndex + 1} failed after ${maxAttempts} attempts: ${originalError.message}`);
        }
      }
    }
  }

  // Combine parallel results
  combineParallelResults(results, steps) {
    const combined = {
      results: {},
      metadata: {
        totalSteps: steps.length,
        completedSteps: results.size,
        parallelExecution: true
      }
    };

    results.forEach((result, index) => {
      const step = steps[index];
      const stepName = step.name || `step_${index}`;
      combined.results[stepName] = result;
    });

    return combined;
  }

  // Apply middleware
  async applyMiddleware(phase, context) {
    for (const middleware of this.middleware) {
      if (middleware[phase]) {
        await middleware[phase](context);
      }
    }
  }

  // Generate execution ID
  generateExecutionId() {
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get workflow status
  getWorkflowStatus(executionId) {
    const active = this.activeWorkflows.get(executionId);
    if (active) return active;

    const completed = this.completedWorkflows.get(executionId);
    if (completed) return completed;

    const failed = this.failedWorkflows.get(executionId);
    if (failed) return failed;

    return null;
  }

  // Get all workflows
  getAllWorkflows() {
    return {
      active: Array.from(this.activeWorkflows.values()),
      completed: Array.from(this.completedWorkflows.values()),
      failed: Array.from(this.failedWorkflows.values()),
      total: this.activeWorkflows.size + this.completedWorkflows.size + this.failedWorkflows.size
    };
  }

  // Cancel workflow
  async cancelWorkflow(executionId) {
    const workflow = this.activeWorkflows.get(executionId);
    
    if (workflow) {
      workflow.status = 'cancelled';
      workflow.endTime = Date.now();
      
      this.activeWorkflows.delete(executionId);
      this.failedWorkflows.set(executionId, workflow);
      
      console.log(`🚫 Workflow cancelled: ${executionId}`);
      return true;
    }

    return false;
  }

  // Get metrics
  getMetrics() {
    return {
      ...this.metrics,
      successRate: this.metrics.totalWorkflows > 0 ? 
        (this.metrics.completedWorkflows / this.metrics.totalWorkflows) * 100 : 0,
      failureRate: this.metrics.totalWorkflows > 0 ? 
        (this.metrics.failedWorkflows / this.metrics.totalWorkflows) * 100 : 0,
      activeWorkflows: this.activeWorkflows.size,
      definedWorkflows: Object.keys(this.config.workflows).length
    };
  }

  // Clear completed workflows
  clearCompletedWorkflows(maxAge = 3600000) { // 1 hour
    const now = Date.now();
    const toDelete = [];

    this.completedWorkflows.forEach((workflow, executionId) => {
      if (now - workflow.endTime > maxAge) {
        toDelete.push(executionId);
      }
    });

    toDelete.forEach(executionId => {
      this.completedWorkflows.delete(executionId);
    });

    console.log(`🧹 Cleared ${toDelete.length} completed workflows`);
    return toDelete.length;
  }

  // Default task handlers
  async handleContentAnalysis(inputData, step, context) {
    const ContentDataAnalyzer = require('./content-data-analyzer.js');
    const analyzer = new ContentDataAnalyzer();
    await analyzer.initialize();
    
    const analysis = await analyzer.analyzeAllContent();
    return analysis;
  }

  async handleDocumentProcessing(inputData, step, context) {
    const DocumentProcessor = require('./document-processor.js');
    const processor = new DocumentProcessor();
    await processor.initialize();
    
    const result = await processor.processDocument(inputData);
    return result;
  }

  async handleMediaProcessing(inputData, step, context) {
    const MediaDataManager = require('./media-data-manager.js');
    const mediaManager = new MediaDataManager();
    await mediaManager.initialize();
    
    const result = await mediaManager.addUserMedia(inputData);
    return result;
  }

  async handleImageSearch(inputData, step, context) {
    const ImageSearchEngine = require('./image-search-processor.js');
    const searchEngine = new ImageSearchEngine();
    
    const results = await searchEngine.searchImages(inputData.query, inputData.options);
    return results;
  }

  async handleWebSearch(inputData, step, context) {
    const WebSearchService = require('./layer-implementation-code.js');
    const searchService = new WebSearchService();
    
    const results = await searchService.search(inputData.query, inputData.options);
    return results;
  }

  async handleNeuralProcessing(inputData, step, context) {
    const InformationProcessingNetwork = require('./neural-network-layers.js');
    const network = new InformationProcessingNetwork();
    
    const result = await network.process(inputData);
    return result;
  }

  async handleContentGeneration(inputData, step, context) {
    const ContentWritingGenerator = require('./content-writing-generator.js');
    const generator = new ContentWritingGenerator();
    
    const result = await generator.generateDocument(inputData, inputData.templateType);
    return result;
  }

  async handleQualityAssessment(inputData, step, context) {
    // Simulate quality assessment
    const quality = {
      score: Math.random() * 100,
      grade: ['excellent', 'good', 'fair', 'poor'][Math.floor(Math.random() * 4)],
      factors: ['content', 'structure', 'readability'],
      recommendations: ['Improve clarity', 'Add more examples']
    };
    
    return quality;
  }

  async handleDataExtraction(inputData, step, context) {
    // Simulate data extraction
    const extracted = {
      entities: [],
      keywords: [],
      metadata: {},
      summary: ''
    };
    
    return extracted;
  }

  async handleDataValidation(inputData, step, context) {
    // Simulate data validation
    const validation = {
      valid: true,
      errors: [],
      warnings: [],
      score: 95
    };
    
    return validation;
  }

  async handleDataTransformation(inputData, step, context) {
    // Simulate data transformation
    const transformed = {
      originalFormat: 'unknown',
      newFormat: 'json',
      transformedData: inputData,
      transformationRules: []
    };
    
    return transformed;
  }

  async handleSystemMonitoring(inputData, step, context) {
    // Simulate system monitoring
    const monitoring = {
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      disk: Math.random() * 100,
      network: Math.random() * 100,
      timestamp: Date.now()
    };
    
    return monitoring;
  }

  async handlePerformanceOptimization(inputData, step, context) {
    // Simulate performance optimization
    const optimization = {
      optimized: true,
      improvements: ['cache', 'compression', 'parallelization'],
      performanceGain: Math.random() * 50 + 10
    };
    
    return optimization;
  }

  async handleErrorRecovery(inputData, step, context) {
    // Simulate error recovery
    const recovery = {
      recovered: true,
      recoveryMethod: 'retry',
      originalError: 'simulated error',
      recoveryTime: Date.now()
    };
    
    return recovery;
  }
}

// Export class
module.exports = SystemWorkflowEngine;
