/**
 * Brain OS Neural Integration
 * Integrates neural networks with existing Brain OS architecture
 */

import NeuralCore from './neural-core.js';
import NeuralAgents from './neural-agents.js';
import { getDistributedBrainOS } from '../distributed/distributed-brain-os.js';

class NeuralIntegration {
    constructor() {
        this.neuralCore = null;
        this.neuralAgents = null;
        this.distributedBrainOS = null;
        this.integrationMetrics = new Map();
        this.initialized = false;
        
        // Integration configuration
        this.config = {
            enable_neural_processing: true,
            fallback_to_classic: true,
            neural_confidence_threshold: 0.7,
            evolution_interval_ms: 300000, // 5 minutes
            training_interval_ms: 600000,  // 10 minutes
            performance_monitoring: true
        };
    }

    /**
     * Initialize Neural Integration
     */
    async initialize(nodeId = null) {
        console.log('[NeuralIntegration] Initializing neural integration with Brain OS...');
        
        try {
            // Initialize neural core
            this.neuralCore = new NeuralCore();
            await this.neuralCore.initialize();
            
            // Initialize neural agents
            this.neuralAgents = new NeuralAgents(this.neuralCore);
            await this.neuralAgents.initialize();
            
            // Get distributed Brain OS instance
            this.distributedBrainOS = getDistributedBrainOS(nodeId || 'neural_integration_node');
            
            // Setup integration hooks
            await this.setupIntegrationHooks();
            
            // Start monitoring and evolution
            this.startNeuralMonitoring();
            this.startNeuralEvolution();
            
            this.initialized = true;
            console.log('[NeuralIntegration] Neural integration initialized successfully');
            
        } catch (error) {
            console.error('[NeuralIntegration] Failed to initialize neural integration:', error);
            throw error;
        }
    }

    /**
     * Setup integration hooks with Brain OS
     */
    async setupIntegrationHooks() {
        if (!this.distributedBrainOS || !this.distributedBrainOS.initialized) {
            console.log('[NeuralIntegration] Brain OS not initialized, skipping hooks');
            return;
        }
        
        // Hook into task processing
        const originalSubmitTask = this.distributedBrainOS.submitDistributedTask;
        this.distributedBrainOS.submitDistributedTask = async (task, executionNode, coordinationType) => {
            return await this.processTaskWithNeuralIntegration(task, executionNode, coordinationType);
        };
        
        // Hook into message bus for neural events
        this.distributedBrainOS.baseBrainOS.messageBus.subscribe('neural_integration', 'neural_event', async (message) => {
            await this.handleNeuralEvent(message);
        });
        
        // Hook into DNA updates for neural evolution
        this.distributedBrainOS.baseBrainOS.messageBus.subscribe('neural_integration', 'dna_update', async (message) => {
            await this.handleDNAUpdate(message);
        });
        
        console.log('[NeuralIntegration] Integration hooks setup complete');
    }

    /**
     * Process task with neural integration
     */
    async processTaskWithNeuralIntegration(task, executionNode, coordinationType) {
        console.log(`[NeuralIntegration] Processing task ${task.type} with neural integration...`);
        
        const startTime = Date.now();
        
        try {
            // Determine if neural processing should be used
            const useNeural = this.shouldUseNeuralProcessing(task);
            
            let result;
            
            if (useNeural && this.config.enable_neural_processing) {
                // Process through neural pipeline
                result = await this.processWithNeuralPipeline(task);
                
                // Check confidence and fallback if needed
                if (result.neural_confidence < this.config.neural_confidence_threshold && this.config.fallback_to_classic) {
                    console.log('[NeuralIntegration] Neural confidence low, falling back to classic processing');
                    result = await this.processWithClassicPipeline(task);
                    result.processing_method = 'classic_fallback';
                } else {
                    result.processing_method = 'neural';
                }
            } else {
                // Use classic processing
                result = await this.processWithClassicPipeline(task);
                result.processing_method = 'classic';
            }
            
            // Add integration metadata
            result.integration_metadata = {
                processing_time: Date.now() - startTime,
                neural_enabled: this.config.enable_neural_processing,
                neural_used: useNeural,
                confidence_threshold: this.config.neural_confidence_threshold
            };
            
            // Update metrics
            this.updateIntegrationMetrics(task.type, result);
            
            // Send neural event if significant
            if (result.neural_confidence > 0.9) {
                await this.sendNeuralEvent('high_confidence_result', {
                    task_type: task.type,
                    confidence: result.neural_confidence,
                    processing_time: result.integration_metadata.processing_time
                });
            }
            
            return result;
            
        } catch (error) {
            console.error('[NeuralIntegration] Task processing failed:', error);
            
            // Fallback to classic processing on error
            if (this.config.fallback_to_classic) {
                console.log('[NeuralIntegration] Error occurred, falling back to classic processing');
                return await this.processWithClassicPipeline(task);
            }
            
            throw error;
        }
    }

    /**
     * Process with neural pipeline
     */
    async processWithNeuralPipeline(task) {
        console.log('[NeuralIntegration] Processing through neural pipeline...');
        
        // Process through neural agents
        const neuralResult = await this.neuralAgents.processNeuralPipeline(task);
        
        // Enhance with neural insights
        const enhancedResult = {
            ...neuralResult.final_result,
            neural_insights: this.extractNeuralInsights(neuralResult),
            pipeline_confidence: neuralResult.neural_confidence,
            neural_agents_used: neuralResult.pipeline_results.map(r => r.agent),
            processing_stages: neuralResult.pipeline_results.map(r => ({
                agent: r.agent,
                confidence: r.result.confidence || 0.8,
                processing_time: r.timestamp
            }))
        };
        
        return enhancedResult;
    }

    /**
     * Process with classic pipeline (fallback)
     */
    async processWithClassicPipeline(task) {
        console.log('[NeuralIntegration] Processing through classic pipeline...');
        
        // Use original Brain OS processing
        if (this.distributedBrainOS && this.distributedBrainOS.baseBrainOS) {
            const taskId = await this.distributedBrainOS.baseBrainOS.submitTask(task);
            
            // Simulate getting result (in real implementation, would wait for completion)
            return {
                task_id: taskId,
                result: `Classic processing result for ${task.type}`,
                confidence: 0.8,
                processing_method: 'classic'
            };
        }
        
        // Fallback basic processing
        return {
            result: `Basic processing for ${task.type}`,
            confidence: 0.7,
            processing_method: 'basic_fallback'
        };
    }

    /**
     * Determine if neural processing should be used
     */
    shouldUseNeuralProcessing(task) {
        // Task types that benefit from neural processing
        const neuralPreferredTasks = ['inference', 'analysis', 'search', 'recommendation'];
        
        // Check if task type is neural-preferred
        if (neuralPreferredTasks.includes(task.type)) {
            return true;
        }
        
        // Check if task payload suggests neural processing
        if (task.payload && typeof task.payload === 'string') {
            const payload = task.payload.toLowerCase();
            const neuralKeywords = ['search', 'find', 'recommend', 'analyze', 'predict'];
            
            return neuralKeywords.some(keyword => payload.includes(keyword));
        }
        
        // Check task constraints
        if (task.constraints && task.constraints.neural_processing === true) {
            return true;
        }
        
        return false;
    }

    /**
     * Extract neural insights from processing results
     */
    extractNeuralInsights(neuralResult) {
        const insights = [];
        
        // Analyze pipeline results for insights
        for (const stage of neuralResult.pipeline_results) {
            const result = stage.result;
            
            // Extract confidence insights
            if (result.confidence > 0.9) {
                insights.push({
                    type: 'high_confidence',
                    agent: stage.agent,
                    confidence: result.confidence,
                    description: `${stage.agent} achieved high confidence`
                });
            }
            
            // Extract processing time insights
            if (stage.processing_time && stage.processing_time > 1000) {
                insights.push({
                    type: 'processing_time',
                    agent: stage.agent,
                    time_ms: stage.processing_time,
                    description: `${stage.agent} took longer than expected`
                });
            }
        }
        
        return insights;
    }

    /**
     * Handle neural events
     */
    async handleNeuralEvent(message) {
        const { event_type, event_data } = message.payload;
        
        console.log(`[NeuralIntegration] Received neural event: ${event_type}`);
        
        switch (event_type) {
            case 'high_confidence_result':
                await this.handleHighConfidenceResult(event_data);
                break;
            case 'neural_evolution_complete':
                await this.handleNeuralEvolutionComplete(event_data);
                break;
            case 'performance_degradation':
                await this.handlePerformanceDegradation(event_data);
                break;
            default:
                console.log(`[NeuralIntegration] Unknown neural event: ${event_type}`);
        }
    }

    /**
     * Handle DNA updates for neural evolution
     */
    async handleDNAUpdate(message) {
        const { dna_version, changes } = message.payload;
        
        console.log(`[NeuralIntegration] DNA updated to version ${dna_version}`);
        
        // Trigger neural evolution based on DNA changes
        if (changes && changes.some(change => change.affects_neural)) {
            await this.triggerNeuralEvolution('dna_update', changes);
        }
    }

    /**
     * Handle high confidence results
     */
    async handleHighConfidenceResult(eventData) {
        console.log('[NeuralIntegration] High confidence result detected');
        
        // Potentially update neural models based on successful predictions
        if (eventData.confidence > 0.95) {
            await this.reinforceSuccessfulPatterns(eventData);
        }
    }

    /**
     * Handle neural evolution completion
     */
    async handleNeuralEvolutionComplete(eventData) {
        console.log('[NeuralIntegration] Neural evolution completed');
        
        // Update integration metrics
        this.updateIntegrationMetrics('evolution', {
            evolution_type: eventData.evolution_type,
            success: eventData.success,
            performance_improvement: eventData.performance_improvement
        });
    }

    /**
     * Handle performance degradation
     */
    async handlePerformanceDegradation(eventData) {
        console.log('[NeuralIntegration] Performance degradation detected');
        
        // Trigger neural evolution to improve performance
        await this.triggerNeuralEvolution('performance_improvement', eventData);
    }

    /**
     * Start neural monitoring
     */
    startNeuralMonitoring() {
        if (!this.config.performance_monitoring) {
            return;
        }
        
        setInterval(() => {
            this.performNeuralHealthCheck();
        }, 60000); // Every minute
    }

    /**
     * Perform neural health check
     */
    async performNeuralHealthCheck() {
        console.log('[NeuralIntegration] Performing neural health check...');
        
        const metrics = this.neuralAgents.getComprehensiveMetrics();
        const neuralCoreMetrics = this.neuralCore.getAllModelMetrics();
        
        // Check for performance issues
        const issues = [];
        
        if (metrics.average_confidence < this.config.neural_confidence_threshold) {
            issues.push({
                type: 'low_confidence',
                value: metrics.average_confidence,
                threshold: this.config.neural_confidence_threshold
            });
        }
        
        if (metrics.total_processing === 0) {
            issues.push({
                type: 'no_processing',
                description: 'No neural processing detected'
            });
        }
        
        // Check individual model health
        for (const [region, modelMetrics] of Object.entries(neuralCoreMetrics)) {
            if (modelMetrics.parameter_count === 0) {
                issues.push({
                    type: 'model_not_initialized',
                    region: region
                });
            }
        }
        
        if (issues.length > 0) {
            console.warn('[NeuralIntegration] Neural health issues detected:', issues);
            await this.sendNeuralEvent('health_issues', { issues });
        }
    }

    /**
     * Start neural evolution
     */
    startNeuralEvolution() {
        setInterval(async () => {
            await this.performPeriodicEvolution();
        }, this.config.evolution_interval_ms);
    }

    /**
     * Perform periodic evolution
     */
    async performPeriodicEvolution() {
        console.log('[NeuralIntegration] Performing periodic neural evolution...');
        
        // Check if evolution is needed
        const shouldEvolve = await this.shouldTriggerEvolution();
        
        if (shouldEvolve) {
            await this.triggerNeuralEvolution('periodic', {});
        }
    }

    /**
     * Check if evolution should be triggered
     */
    async shouldTriggerEvolution() {
        const metrics = this.neuralAgents.getComprehensiveMetrics();
        
        // Trigger evolution if confidence is low
        if (metrics.average_confidence < 0.8) {
            return true;
        }
        
        // Trigger evolution if processing volume is high
        if (metrics.total_processing > 1000) {
            return true;
        }
        
        // Trigger evolution if it's been a while since last evolution
        const lastEvolution = this.neuralCore.evolutionHistory[this.neuralCore.evolutionHistory.length - 1];
        if (lastEvolution) {
            const timeSinceLastEvolution = Date.now() - lastEvolution.timestamp.getTime();
            if (timeSinceLastEvolution > this.config.evolution_interval_ms) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Trigger neural evolution
     */
    async triggerNeuralEvolution(evolutionType, evolutionData) {
        console.log(`[NeuralIntegration] Triggering neural evolution: ${evolutionType}`);
        
        try {
            // Evolve neural agents
            await this.neuralAgents.evolveAllAgents(0.1);
            
            // Evolve neural core models
            for (const region of Object.keys(this.neuralCore.architectures)) {
                await this.neuralCore.evolveModel(region, 0.05);
            }
            
            // Send evolution completion event
            await this.sendNeuralEvent('neural_evolution_complete', {
                evolution_type: evolutionType,
                success: true,
                performance_improvement: 0.05 // Simplified
            });
            
            console.log('[NeuralIntegration] Neural evolution completed successfully');
            
        } catch (error) {
            console.error('[NeuralIntegration] Neural evolution failed:', error);
            
            await this.sendNeuralEvent('neural_evolution_complete', {
                evolution_type: evolutionType,
                success: false,
                error: error.message
            });
        }
    }

    /**
     * Reinforce successful patterns
     */
    async reinforceSuccessfulPatterns(eventData) {
        console.log('[NeuralIntegration] Reinforcing successful patterns...');
        
        // In a real implementation, this would:
        // 1. Identify successful patterns
        // 2. Increase weights for successful pathways
        // 3. Save patterns to memory
        // 4. Update training data
        
        console.log('[NeuralIntegration] Pattern reinforcement completed');
    }

    /**
     * Send neural event
     */
    async sendNeuralEvent(eventType, data) {
        if (this.distributedBrainOS && this.distributedBrainOS.baseBrainOS) {
            await this.distributedBrainOS.sendDistributedEvent('neural_event', {
                event_type: eventType,
                event_data: data,
                source: 'neural_integration',
                timestamp: new Date()
            });
        }
    }

    /**
     * Update integration metrics
     */
    updateIntegrationMetrics(taskType, result) {
        if (!this.integrationMetrics.has(taskType)) {
            this.integrationMetrics.set(taskType, {
                total_processed: 0,
                neural_processed: 0,
                classic_processed: 0,
                average_confidence: 0,
                average_processing_time: 0
            });
        }
        
        const metrics = this.integrationMetrics.get(taskType);
        metrics.total_processed++;
        
        if (result.processing_method === 'neural') {
            metrics.neural_processed++;
        } else {
            metrics.classic_processed++;
        }
        
        if (result.neural_confidence) {
            metrics.average_confidence = 
                (metrics.average_confidence * (metrics.total_processed - 1) + result.neural_confidence) / metrics.total_processed;
        }
        
        if (result.integration_metadata && result.integration_metadata.processing_time) {
            metrics.average_processing_time = 
                (metrics.average_processing_time * (metrics.total_processed - 1) + result.integration_metadata.processing_time) / metrics.total_processed;
        }
    }

    /**
     * Get integration status
     */
    getIntegrationStatus() {
        return {
            initialized: this.initialized,
            config: this.config,
            neural_core_status: this.neuralCore ? 'active' : 'inactive',
            neural_agents_status: this.neuralAgents ? 'active' : 'inactive',
            distributed_brain_os_status: this.distributedBrainOS ? 'active' : 'inactive',
            integration_metrics: Object.fromEntries(this.integrationMetrics),
            neural_metrics: this.neuralAgents ? this.neuralAgents.getComprehensiveMetrics() : null,
            evolution_history: this.neuralCore ? this.neuralCore.evolutionHistory : []
        };
    }

    /**
     * Train neural system with data
     */
    async trainNeuralSystem(trainingData) {
        console.log('[NeuralIntegration] Training neural system...');
        
        if (!this.neuralAgents) {
            throw new Error('Neural agents not initialized');
        }
        
        await this.neuralAgents.trainAllAgents(trainingData);
        
        console.log('[NeuralIntegration] Neural system training completed');
    }

    /**
     * Export integration state
     */
    exportState() {
        return {
            initialized: this.initialized,
            config: this.config,
            integration_metrics: Array.from(this.integrationMetrics.entries()),
            neural_core_state: this.neuralCore?.exportState(),
            neural_agents_state: this.neuralAgents?.getComprehensiveMetrics(),
            timestamp: new Date()
        };
    }

    /**
     * Shutdown neural integration
     */
    async shutdown() {
        console.log('[NeuralIntegration] Shutting down neural integration...');
        
        this.initialized = false;
        
        // Clear intervals
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
        }
        
        if (this.evolutionInterval) {
            clearInterval(this.evolutionInterval);
        }
        
        console.log('[NeuralIntegration] Neural integration shutdown complete');
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeuralIntegration;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.NeuralIntegration = NeuralIntegration;
}

// Auto-initialize if running as main module
if (typeof window !== 'undefined' && window.location) {
    document.addEventListener('DOMContentLoaded', async () => {
        const neuralIntegration = new NeuralIntegration();
        
        try {
            await neuralIntegration.initialize('neural_integration_demo');
            window.neuralIntegration = neuralIntegration;
            console.log('🧠 Neural Integration demo ready!');
        } catch (error) {
            console.error('Failed to initialize Neural Integration:', error);
        }
    });
}
