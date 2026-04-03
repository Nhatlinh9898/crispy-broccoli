// Workflow Extensions
// Mở rộng và phát triển thêm cho hệ thống workflow

class WorkflowExtensions {
  constructor(config = {}) {
    this.config = {
      customTaskHandlers: new Map(),
      workflowTemplates: new Map(),
      advancedFeatures: {
        conditionalExecution: config.conditionalExecution !== false,
        dynamicWorkflows: config.dynamicWorkflows !== false,
        workflowComposition: config.workflowComposition !== false,
        eventDrivenWorkflows: config.eventDrivenWorkflows !== false,
        adaptiveWorkflows: config.adaptiveWorkflows !== false,
        workflowVersioning: config.workflowVersioning !== false
      },
      integrationPoints: {
        externalAPIs: config.externalAPIs || {},
        databases: config.databases || {},
        messageQueues: config.messageQueues || {},
        notificationSystems: config.notificationSystems || {}
      }
    };
    
    this.eventListeners = new Map();
    this.workflowVersions = new Map();
    this.adaptiveRules = new Map();
    this.compositionRules = new Map();
  }

  // Register custom task handler
  registerCustomTaskHandler(taskType, handler, metadata = {}) {
    const handlerInfo = {
      handler: handler,
      metadata: {
        name: metadata.name || taskType,
        description: metadata.description || '',
        category: metadata.category || 'custom',
        timeout: metadata.timeout || 60000,
        retryPolicy: metadata.retryPolicy || { maxAttempts: 3, delay: 1000 },
        parameters: metadata.parameters || [],
        returns: metadata.returns || [],
        ...metadata
      }
    };

    this.config.customTaskHandlers.set(taskType, handlerInfo);
    console.log(`✅ Registered custom task handler: ${taskType}`);
  }

  // Create workflow template
  createWorkflowTemplate(templateId, template) {
    const workflowTemplate = {
      id: templateId,
      name: template.name || templateId,
      description: template.description || '',
      category: template.category || 'custom',
      version: template.version || '1.0.0',
      parameters: template.parameters || [],
      steps: template.steps || [],
      conditionalSteps: template.conditionalSteps || [],
      dynamicSteps: template.dynamicSteps || [],
      eventTriggers: template.eventTriggers || [],
      adaptiveRules: template.adaptiveRules || [],
      compositionRules: template.compositionRules || [],
      metadata: {
        ...template.metadata,
        createdAt: Date.now(),
        isTemplate: true
      }
    };

    this.config.workflowTemplates.set(templateId, workflowTemplate);
    console.log(`✅ Created workflow template: ${templateId}`);
    return workflowTemplate;
  }

  // Extended workflow with conditional execution
  createConditionalWorkflow(workflowId, definition) {
    const conditionalWorkflow = {
      ...definition,
      id: workflowId,
      type: 'conditional',
      conditionalSteps: definition.conditionalSteps || [],
      defaultSteps: definition.defaultSteps || definition.steps || []
    };

    // Validate conditional workflow
    this.validateConditionalWorkflow(conditionalWorkflow);

    return conditionalWorkflow;
  }

  // Validate conditional workflow
  validateConditionalWorkflow(workflow) {
    if (!this.config.advancedFeatures.conditionalExecution) {
      throw new Error('Conditional execution is not enabled');
    }

    workflow.conditionalSteps.forEach((step, index) => {
      if (!step.condition) {
        throw new Error(`Conditional step ${index + 1} must have a condition`);
      }

      if (!step.thenSteps && !step.elseSteps) {
        throw new Error(`Conditional step ${index + 1} must have thenSteps or elseSteps`);
      }
    });
  }

  // Create dynamic workflow
  createDynamicWorkflow(workflowId, definition) {
    const dynamicWorkflow = {
      ...definition,
      id: workflowId,
      type: 'dynamic',
      dynamicSteps: definition.dynamicSteps || [],
      stepGenerators: definition.stepGenerators || {},
      adaptationRules: definition.adaptationRules || []
    };

    return dynamicWorkflow;
  }

  // Create event-driven workflow
  createEventDrivenWorkflow(workflowId, definition) {
    const eventDrivenWorkflow = {
      ...definition,
      id: workflowId,
      type: 'event_driven',
      eventTriggers: definition.eventTriggers || [],
      eventHandlers: definition.eventHandlers || {},
      eventFilters: definition.eventFilters || []
    };

    // Register event listeners
    this.registerEventListeners(workflowId, eventDrivenWorkflow);

    return eventDrivenWorkflow;
  }

  // Register event listeners
  registerEventListeners(workflowId, workflow) {
    workflow.eventTriggers.forEach(trigger => {
      if (!this.eventListeners.has(trigger.eventType)) {
        this.eventListeners.set(trigger.eventType, new Map());
      }

      const listeners = this.eventListeners.get(trigger.eventType);
      listeners.set(workflowId, {
        workflowId: workflowId,
        handler: workflow.eventHandlers[trigger.eventType],
        filter: trigger.filter,
        priority: trigger.priority || 0
      });
    });
  }

  // Create composite workflow
  createCompositeWorkflow(workflowId, definition) {
    const compositeWorkflow = {
      ...definition,
      id: workflowId,
      type: 'composite',
      subWorkflows: definition.subWorkflows || [],
      compositionStrategy: definition.compositionStrategy || 'sequential',
      dataFlow: definition.dataFlow || {},
      errorHandling: definition.errorHandling || 'stop_on_error'
    };

    return compositeWorkflow;
  }

  // Create adaptive workflow
  createAdaptiveWorkflow(workflowId, definition) {
    const adaptiveWorkflow = {
      ...definition,
      id: workflowId,
      type: 'adaptive',
      adaptationRules: definition.adaptationRules || [],
      performanceMetrics: definition.performanceMetrics || [],
      learningEnabled: definition.learningEnabled !== false,
      adaptationHistory: []
    };

    return adaptiveWorkflow;
  }

  // Execute conditional workflow
  async executeConditionalWorkflow(workflow, inputData, context = {}) {
    console.log(`🔀 Executing conditional workflow: ${workflow.id}`);

    let currentData = inputData;
    const executionLog = [];

    // Execute default steps first
    for (const step of workflow.defaultSteps) {
      const stepResult = await this.executeStep(step, currentData, context);
      currentData = stepResult.output;
      executionLog.push({
        step: step.name,
        type: 'default',
        result: stepResult
      });
    }

    // Evaluate and execute conditional steps
    for (const conditionalStep of workflow.conditionalSteps) {
      const conditionMet = await this.evaluateCondition(
        conditionalStep.condition,
        currentData,
        context
      );

      const stepsToExecute = conditionMet ? 
        conditionalStep.thenSteps : 
        conditionalStep.elseSteps || [];

      for (const step of stepsToExecute) {
        const stepResult = await this.executeStep(step, currentData, context);
        currentData = stepResult.output;
        executionLog.push({
          step: step.name,
          type: conditionMet ? 'then' : 'else',
          result: stepResult
        });
      }
    }

    return {
      output: currentData,
      executionLog: executionLog,
      conditionalResults: executionLog.filter(log => log.type !== 'default')
    };
  }

  // Execute dynamic workflow
  async executeDynamicWorkflow(workflow, inputData, context = {}) {
    console.log(`🔄 Executing dynamic workflow: ${workflow.id}`);

    let currentData = inputData;
    let steps = [...workflow.steps];
    const executionLog = [];

    // Generate dynamic steps
    for (const stepGenerator of workflow.stepGenerators) {
      if (await this.evaluateCondition(stepGenerator.condition, currentData, context)) {
        const generatedSteps = await stepGenerator.generator(currentData, context);
        steps.push(...generatedSteps);
        executionLog.push({
          type: 'dynamic_generation',
          generator: stepGenerator.name,
          stepsGenerated: generatedSteps.length
        });
      }
    }

    // Execute all steps
    for (const step of steps) {
      const stepResult = await this.executeStep(step, currentData, context);
      currentData = stepResult.output;
      executionLog.push({
        step: step.name,
        result: stepResult
      });
    }

    return {
      output: currentData,
      executionLog: executionLog,
      dynamicStepsGenerated: executionLog.filter(log => log.type === 'dynamic_generation')
    };
  }

  // Execute event-driven workflow
  async executeEventDrivenWorkflow(workflow, eventData, context = {}) {
    console.log(`⚡ Executing event-driven workflow: ${workflow.id}`);

    const eventType = eventData.type;
    const handler = workflow.eventHandlers[eventType];

    if (!handler) {
      console.log(`No handler for event type: ${eventType}`);
      return null;
    }

    // Apply event filters
    if (workflow.eventFilters) {
      for (const filter of workflow.eventFilters) {
        if (!await this.applyEventFilter(filter, eventData, context)) {
          console.log(`Event filtered out by: ${filter.name}`);
          return null;
        }
      }
    }

    // Execute event handler
    const result = await handler(eventData, context);

    return {
      eventType: eventType,
      eventData: eventData,
      result: result,
      timestamp: Date.now()
    };
  }

  // Execute composite workflow
  async executeCompositeWorkflow(workflow, inputData, context = {}) {
    console.log(`🔧 Executing composite workflow: ${workflow.id}`);

    let results = new Map();
    let currentData = inputData;

    switch (workflow.compositionStrategy) {
      case 'sequential':
        for (const subWorkflow of workflow.subWorkflows) {
          const subResult = await this.executeSubWorkflow(
            subWorkflow,
            currentData,
            context
          );
          results.set(subWorkflow.id, subResult);
          currentData = this.applyDataFlow(
            workflow.dataFlow,
            subWorkflow.id,
            subResult,
            currentData
          );
        }
        break;

      case 'parallel':
        const subWorkflowPromises = workflow.subWorkflows.map(subWorkflow =>
          this.executeSubWorkflow(subWorkflow, inputData, context)
        );
        const parallelResults = await Promise.allSettled(subWorkflowPromises);
        
        parallelResults.forEach((result, index) => {
          const subWorkflow = workflow.subWorkflows[index];
          if (result.status === 'fulfilled') {
            results.set(subWorkflow.id, result.value);
          } else {
            if (workflow.errorHandling === 'stop_on_error') {
              throw new Error(`Sub-workflow ${subWorkflow.id} failed: ${result.reason.message}`);
            }
            results.set(subWorkflow.id, { error: result.reason.message });
          }
        });
        break;

      case 'pipeline':
        let pipelineData = inputData;
        for (const subWorkflow of workflow.subWorkflows) {
          const subResult = await this.executeSubWorkflow(
            subWorkflow,
            pipelineData,
            context
          );
          results.set(subWorkflow.id, subResult);
          pipelineData = subResult.output;
        }
        currentData = pipelineData;
        break;
    }

    return {
      output: currentData,
      subResults: Object.fromEntries(results),
      strategy: workflow.compositionStrategy
    };
  }

  // Execute adaptive workflow
  async executeAdaptiveWorkflow(workflow, inputData, context = {}) {
    console.log(`🧠 Executing adaptive workflow: ${workflow.id}`);

    let currentData = inputData;
    let adaptedWorkflow = { ...workflow };
    const adaptationLog = [];

    // Apply initial adaptations
    for (const rule of workflow.adaptationRules) {
      if (await this.evaluateCondition(rule.condition, currentData, context)) {
        adaptedWorkflow = await this.applyAdaptationRule(rule, adaptedWorkflow, currentData);
        adaptationLog.push({
          rule: rule.name,
          applied: true,
          timestamp: Date.now()
        });
      }
    }

    // Execute adapted workflow
    const executionResult = await this.executeWorkflow(adaptedWorkflow, currentData, context);

    // Learn from execution
    if (workflow.learningEnabled) {
      await this.learnFromExecution(workflow, executionResult, adaptationLog);
    }

    return {
      ...executionResult,
      adaptations: adaptationLog,
      originalWorkflow: workflow.id,
      adaptedSteps: adaptedWorkflow.steps.length
    };
  }

  // Evaluate condition
  async evaluateCondition(condition, data, context) {
    if (typeof condition === 'function') {
      return await condition(data, context);
    }

    if (typeof condition === 'string') {
      // Simple expression evaluation
      return this.evaluateExpression(condition, data, context);
    }

    if (typeof condition === 'object') {
      // Complex condition object
      return await this.evaluateComplexCondition(condition, data, context);
    }

    return Boolean(condition);
  }

  // Evaluate expression
  evaluateExpression(expression, data, context) {
    try {
      // Safe expression evaluation (simplified)
      const variables = { ...data, ...context };
      
      // Replace variables in expression
      let evaluatedExpression = expression;
      Object.keys(variables).forEach(key => {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        evaluatedExpression = evaluatedExpression.replace(regex, JSON.stringify(variables[key]));
      });

      // Use Function constructor for safe evaluation
      const func = new Function(`return ${evaluatedExpression}`);
      return func();
    } catch (error) {
      console.error(`Error evaluating expression: ${expression}`, error);
      return false;
    }
  }

  // Evaluate complex condition
  async evaluateComplexCondition(condition, data, context) {
    const { operator, operands, logicalOperator } = condition;
    
    const evaluatedOperands = await Promise.all(
      operands.map(operand => this.evaluateCondition(operand, data, context))
    );

    switch (operator) {
      case 'equals':
        return evaluatedOperands[0] === evaluatedOperands[1];
      case 'greater_than':
        return evaluatedOperands[0] > evaluatedOperands[1];
      case 'less_than':
        return evaluatedOperands[0] < evaluatedOperands[1];
      case 'contains':
        return String(evaluatedOperands[0]).includes(String(evaluatedOperands[1]));
      case 'matches':
        return new RegExp(evaluatedOperands[1]).test(String(evaluatedOperands[0]));
      default:
        return false;
    }
  }

  // Apply event filter
  async applyEventFilter(filter, eventData, context) {
    switch (filter.type) {
      case 'field_equals':
        return eventData[filter.field] === filter.value;
      case 'field_contains':
        return String(eventData[filter.field]).includes(filter.value);
      case 'time_range':
        const eventTime = eventData.timestamp;
        return eventTime >= filter.startTime && eventTime <= filter.endTime;
      case 'custom':
        return await filter.handler(eventData, context);
      default:
        return true;
    }
  }

  // Apply adaptation rule
  async applyAdaptationRule(rule, workflow, data) {
    let adaptedWorkflow = { ...workflow };

    switch (rule.type) {
      case 'add_step':
        adaptedWorkflow.steps.push(rule.step);
        break;
      case 'remove_step':
        adaptedWorkflow.steps = adaptedWorkflow.steps.filter(
          step => step.name !== rule.stepName
        );
        break;
      case 'modify_step':
        const stepIndex = adaptedWorkflow.steps.findIndex(
          step => step.name === rule.stepName
        );
        if (stepIndex !== -1) {
          adaptedWorkflow.steps[stepIndex] = { 
            ...adaptedWorkflow.steps[stepIndex], 
            ...rule.modifications 
          };
        }
        break;
      case 'reorder_steps':
        adaptedWorkflow.steps = rule.newOrder.map(
          stepName => adaptedWorkflow.steps.find(s => s.name === stepName)
        ).filter(Boolean);
        break;
      case 'change_timeout':
        adaptedWorkflow.steps.forEach(step => {
          if (step.name === rule.stepName || rule.applyToAll) {
            step.timeout = rule.newTimeout;
          }
        });
        break;
    }

    return adaptedWorkflow;
  }

  // Apply data flow
  applyDataFlow(dataFlow, sourceId, sourceResult, currentData) {
    if (!dataFlow || !dataFlow[sourceId]) {
      return currentData;
    }

    const flow = dataFlow[sourceId];
    let newData = { ...currentData };

    switch (flow.type) {
      case 'replace':
        newData[flow.target] = sourceResult.output;
        break;
      case 'merge':
        newData = { ...newData, ...sourceResult.output };
        break;
      case 'append':
        if (Array.isArray(newData[flow.target])) {
          newData[flow.target].push(sourceResult.output);
        } else {
          newData[flow.target] = [newData[flow.target], sourceResult.output];
        }
        break;
      case 'transform':
        newData[flow.target] = flow.transform(sourceResult.output);
        break;
    }

    return newData;
  }

  // Learn from execution
  async learnFromExecution(workflow, executionResult, adaptationLog) {
    const learningData = {
      workflowId: workflow.id,
      executionTime: Date.now(),
      success: executionResult.status === 'completed',
      adaptations: adaptationLog,
      performance: executionResult.performance,
      errors: executionResult.errors || []
    };

    // Store learning data
    if (!this.adaptiveRules.has(workflow.id)) {
      this.adaptiveRules.set(workflow.id, []);
    }
    
    this.adaptiveRules.get(workflow.id).push(learningData);

    // Limit history size
    const history = this.adaptiveRules.get(workflow.id);
    if (history.length > 100) {
      history.shift();
    }

    console.log(`🧠 Learned from execution of ${workflow.id}`);
  }

  // Get adaptation suggestions
  getAdaptationSuggestions(workflowId) {
    const history = this.adaptiveRules.get(workflowId) || [];
    
    if (history.length < 5) {
      return [];
    }

    const suggestions = [];
    const recentExecutions = history.slice(-10);
    
    // Analyze common failures
    const failurePatterns = recentExecutions.filter(exec => !exec.success);
    if (failurePatterns.length > 3) {
      suggestions.push({
        type: 'increase_timeout',
        reason: 'Frequent failures detected',
        suggestion: 'Consider increasing timeout for problematic steps'
      });
    }

    // Analyze performance
    const avgExecutionTime = recentExecutions.reduce((sum, exec) => 
      sum + (exec.performance?.executionTime || 0), 0) / recentExecutions.length;
    
    if (avgExecutionTime > 300000) { // 5 minutes
      suggestions.push({
        type: 'optimize_performance',
        reason: 'Slow execution detected',
        suggestion: 'Consider optimizing steps or enabling parallel execution'
      });
    }

    return suggestions;
  }

  // Create workflow version
  createWorkflowVersion(workflowId, workflow, version) {
    const versionedWorkflow = {
      ...workflow,
      version: version,
      versionedAt: Date.now(),
      parentWorkflow: workflowId
    };

    if (!this.workflowVersions.has(workflowId)) {
      this.workflowVersions.set(workflowId, new Map());
    }

    this.workflowVersions.get(workflowId).set(version, versionedWorkflow);
    console.log(`📝 Created version ${version} for workflow ${workflowId}`);

    return versionedWorkflow;
  }

  // Get workflow versions
  getWorkflowVersions(workflowId) {
    return this.workflowVersions.get(workflowId) || new Map();
  }

  // Compare workflow versions
  compareWorkflowVersions(workflowId, version1, version2) {
    const versions = this.getWorkflowVersions(workflowId);
    const v1 = versions.get(version1);
    const v2 = versions.get(version2);

    if (!v1 || !v2) {
      throw new Error('One or both versions not found');
    }

    const comparison = {
      version1: version1,
      version2: version2,
      differences: []
    };

    // Compare steps
    const steps1 = v1.steps || [];
    const steps2 = v2.steps || [];
    
    if (steps1.length !== steps2.length) {
      comparison.differences.push({
        type: 'step_count',
        v1: steps1.length,
        v2: steps2.length
      });
    }

    // Compare other properties
    ['timeout', 'parallel', 'retryPolicy'].forEach(prop => {
      if (JSON.stringify(v1[prop]) !== JSON.stringify(v2[prop])) {
        comparison.differences.push({
          type: 'property',
          property: prop,
          v1: v1[prop],
          v2: v2[prop]
        });
      }
    });

    return comparison;
  }

  // Export workflow extensions
  exportExtensions() {
    return {
      customTaskHandlers: Object.fromEntries(this.config.customTaskHandlers),
      workflowTemplates: Object.fromEntries(this.config.workflowTemplates),
      eventListeners: Object.fromEntries(
        Array.from(this.eventListeners.entries()).map(
          ([eventType, listeners]) => [eventType, Object.fromEntries(listeners)]
        )
      ),
      adaptiveRules: Object.fromEntries(this.adaptiveRules),
      workflowVersions: Object.fromEntries(
        Array.from(this.workflowVersions.entries()).map(
          ([workflowId, versions]) => [workflowId, Object.fromEntries(versions)]
        )
      )
    };
  }

  // Import workflow extensions
  importExtensions(extensions) {
    // Import custom task handlers
    if (extensions.customTaskHandlers) {
      Object.entries(extensions.customTaskHandlers).forEach(([taskType, handlerInfo]) => {
        this.registerCustomTaskHandler(taskType, handlerInfo.handler, handlerInfo.metadata);
      });
    }

    // Import workflow templates
    if (extensions.workflowTemplates) {
      Object.entries(extensions.workflowTemplates).forEach(([templateId, template]) => {
        this.createWorkflowTemplate(templateId, template);
      });
    }

    // Import adaptive rules
    if (extensions.adaptiveRules) {
      Object.entries(extensions.adaptiveRules).forEach(([workflowId, rules]) => {
        this.adaptiveRules.set(workflowId, rules);
      });
    }

    console.log('📥 Imported workflow extensions');
  }
}

// Export class
module.exports = WorkflowExtensions;
