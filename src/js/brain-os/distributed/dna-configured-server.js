/**
 * Brain OS Distributed - DNA Configured Server
 * Sample server that reads DNA specification and configures itself accordingly
 */

import DNAReader from './dna-reader.js';
import { getDistributedBrainOS } from './distributed-brain-os.js';

class DNAConfiguredServer {
    constructor(nodeId, dnaFilePath = null) {
        this.nodeId = nodeId;
        this.dnaFilePath = dnaFilePath;
        this.dnaReader = new DNAReader();
        this.distributedBrainOS = null;
        this.currentDNA = null;
        this.serverState = 'UNCONFIGURED';
        
        // Server configuration
        this.config = {
            auto_start: true,
            health_check_interval: 30000,
            sync_interval: 60000,
            max_retries: 3
        };
        
        this.initialized = false;
        this.startTime = Date.now();
    }

    /**
     * Initialize the DNA-configured server
     */
    async initialize() {
        console.log(`🧬 Initializing DNA-configured server: ${this.nodeId}`);
        
        try {
            // Step 1: Initialize DNA reader
            await this.dnaReader.initialize();
            
            // Step 2: Load DNA specification
            await this.loadDNASpecification();
            
            // Step 3: Configure server based on DNA
            await this.configureFromDNA();
            
            // Step 4: Initialize distributed Brain OS
            await this.initializeDistributedBrainOS();
            
            // Step 5: Start server
            if (this.config.auto_start) {
                await this.startServer();
            }
            
            this.initialized = true;
            console.log(`✅ DNA-configured server initialized successfully`);
            console.log(`🧬 DNA: ${this.currentDNA.dna_id} v${this.currentDNA.version}`);
            console.log(`🤖 Agents: ${this.currentDNA.agents.size} configured`);
            
        } catch (error) {
            console.error('❌ Failed to initialize DNA-configured server:', error);
            throw error;
        }
    }

    /**
     * Load DNA specification
     */
    async loadDNASpecification() {
        console.log('[DNAConfiguredServer] Loading DNA specification...');
        
        let dnaContent;
        
        if (this.dnaFilePath) {
            // Load from file
            dnaContent = await this.loadDNAFromFile(this.dnaFilePath);
        } else {
            // Load from default location or embedded
            dnaContent = await this.getDefaultDNASpecification();
        }
        
        // Parse and validate DNA
        this.currentDNA = await this.dnaReader.loadDNAFromYAML(dnaContent);
        
        console.log(`[DNAConfiguredServer] DNA loaded: ${this.currentDNA.dna_id} v${this.currentDNA.version}`);
    }

    /**
     * Load DNA from file
     */
    async loadDNAFromFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load DNA file: ${filePath}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`[DNAConfiguredServer] Error loading DNA file:`, error);
            throw error;
        }
    }

    /**
     * Get default DNA specification
     */
    async getDefaultDNASpecification() {
        // Return embedded DNA specification
        return `dna_id: "amaze-brain-dna"
version: "1.2.0"
description: "Logic DNA cho Brain OS phân tán của AmazeBid"

state_machine:
  states:
    - INIT
    - READY
    - PROCESSING
    - EVALUATING
    - REPORTING
    - IDLE
    - ERROR
  transitions:
    - from: INIT
      to: READY
      condition: "config_loaded && health_ok"
    - from: READY
      to: PROCESSING
      condition: "task_queue_not_empty"
    - from: PROCESSING
      to: EVALUATING
      condition: "task_done"
    - from: EVALUATING
      to: REPORTING
      condition: "metrics_collected"
    - from: REPORTING
      to: IDLE
      condition: "report_sent"
    - from: IDLE
      to: READY
      condition: "new_task_detected"
    - from: ANY
      to: ERROR
      condition: "fatal_error"

routing_rules:
  inference:
    priority: 100
    cpu_affinity: "cpu1"
    max_latency_ms: 200
  evolution:
    priority: 50
    cpu_affinity: "any"
    max_concurrent_experiments: 3

agents:
  - id: "canonicalizer"
    role: "input_normalization"
    brain_region: "broca_area"
    cpu_affinity: "cpu0"
    input_types: ["user_request", "system_event"]
    output_types: ["canonical_task"]
  - id: "planner"
    role: "task_planning"
    brain_region: "prefrontal_cortex"
    cpu_affinity: "cpu0"
    input_types: ["canonical_task"]
    output_types: ["execution_plan"]
  - id: "data_processor"
    role: "feature_preparation"
    brain_region: "parietal_lobe"
    cpu_affinity: "cpu1"
    input_types: ["execution_plan"]
    output_types: ["feature_batch"]
  - id: "model_runner"
    role: "inference"
    brain_region: "cerebellum"
    cpu_affinity: "cpu1"
    input_types: ["feature_batch"]
    output_types: ["raw_prediction"
  - id: "evaluator"
    role: "metrics_evaluation"
    brain_region: "anterior_cingulate_cortex"
    cpu_affinity: "cpu1"
    input_types: ["raw_prediction"]
    output_types: ["metrics"]
  - id: "selector"
    role: "decision_making"
    brain_region: "basal_ganglia"
    cpu_affinity: "cpu0"
    input_types: ["metrics", "raw_prediction"]
    output_types: ["final_decision"]

evolution_policies:
  trigger_conditions:
    - name: "kpi_drop"
      condition: "ctr_7d < ctr_30d * 0.9"
      severity: "high"
  actions:
    - name: "launch_experiment_small_model"
      plan_ref: "plan_small_model_experiment"

inheritance:
  strategy: "versioned_lineage"
  rules:
    - rule: "version_compatibility"
      description: "Server con phải có dna_version >= parent.dna_version"
    - rule: "sync_before_ready"
      description: "Server mới phải sync DNA trước READY state"`;
    }

    /**
     * Configure server based on DNA
     */
    async configureFromDNA() {
        console.log('[DNAConfiguredServer] Configuring server from DNA...');
        
        // Configure agents
        await this.configureAgents();
        
        // Configure state machine
        await this.configureStateMachine();
        
        // Configure routing rules
        await this.configureRoutingRules();
        
        // Configure evolution policies
        await this.configureEvolutionPolicies();
        
        // Configure monitoring
        await this.configureMonitoring();
        
        console.log('[DNAConfiguredServer] Server configured from DNA');
    }

    /**
     * Configure agents from DNA
     */
    async configureAgents() {
        const agents = this.dnaReader.getAgentsConfig();
        
        console.log(`[DNAConfiguredServer] Configuring ${agents.size} agents...`);
        
        for (const [agentId, agentConfig] of agents) {
            console.log(`  - ${agentId}: ${agentConfig.role} (${agentConfig.cpu_affinity})`);
            
            // In a real implementation, this would:
            // 1. Create agent instances
            // 2. Configure them according to DNA
            // 3. Register with agent registry
        }
    }

    /**
     * Configure state machine from DNA
     */
    async configureStateMachine() {
        const stateMachine = this.dnaReader.getStateMachineConfig();
        
        console.log('[DNAConfiguredServer] Configuring state machine...');
        console.log(`  - Initial state: ${stateMachine.initial_state}`);
        console.log(`  - States: ${Array.from(stateMachine.states.keys()).join(', ')}`);
        console.log(`  - Transitions: ${stateMachine.transitions.size}`);
        
        // Set initial state
        this.serverState = stateMachine.initial_state;
    }

    /**
     * Configure routing rules from DNA
     */
    async configureRoutingRules() {
        const routingRules = this.dnaReader.getRoutingRules();
        
        console.log('[DNAConfiguredServer] Configuring routing rules...');
        
        for (const [ruleType, rule] of Object.entries(routingRules)) {
            console.log(`  - ${ruleType}: priority=${rule.priority}, cpu=${rule.cpu_affinity}`);
        }
    }

    /**
     * Configure evolution policies from DNA
     */
    async configureEvolutionPolicies() {
        const evolutionPolicies = this.dnaReader.getEvolutionPolicies();
        
        console.log('[DNAConfiguredServer] Configuring evolution policies...');
        console.log(`  - Trigger conditions: ${evolutionPolicies.trigger_conditions.length}`);
        console.log(`  - Actions: ${evolutionPolicies.actions.length}`);
    }

    /**
     * Configure monitoring from DNA
     */
    async configureMonitoring() {
        const monitoring = this.currentDNA.monitoring;
        
        console.log('[DNAConfiguredServer] Configuring monitoring...');
        console.log(`  - Health checks: ${monitoring.health_checks.length}`);
        console.log(`  - Alerts: ${monitoring.alerts.length}`);
    }

    /**
     * Initialize distributed Brain OS
     */
    async initializeDistributedBrainOS() {
        console.log('[DNAConfiguredServer] Initializing distributed Brain OS...');
        
        // Determine if this is a master node
        const isMaster = this.nodeId.includes('master') || this.nodeId.includes('root');
        
        // Initialize distributed Brain OS
        this.distributedBrainOS = getDistributedBrainOS(this.nodeId, isMaster);
        await this.distributedBrainOS.initialize();
        
        console.log('[DNAConfiguredServer] Distributed Brain OS initialized');
    }

    /**
     * Start the server
     */
    async startServer() {
        console.log('[DNAConfiguredServer] Starting server...');
        
        // Start health checks
        this.startHealthChecks();
        
        // Start periodic sync
        this.startPeriodicSync();
        
        // Transition to READY state
        await this.transitionToState('READY');
        
        console.log('[DNAConfiguredServer] Server started successfully');
    }

    /**
     * Start health checks
     */
    startHealthChecks() {
        setInterval(() => {
            this.performHealthCheck();
        }, this.config.health_check_interval);
    }

    /**
     * Perform health check
     */
    async performHealthCheck() {
        try {
            const health = await this.getHealthStatus();
            
            if (health.overall_health < 70) {
                console.warn(`[DNAConfiguredServer] Health degraded: ${health.overall_health}%`);
                await this.handleHealthDegradation(health);
            }
            
        } catch (error) {
            console.error('[DNAConfiguredServer] Health check failed:', error);
            await this.transitionToState('ERROR');
        }
    }

    /**
     * Get health status
     */
    async getHealthStatus() {
        if (!this.distributedBrainOS) {
            return { overall_health: 0 };
        }
        
        const status = this.distributedBrainOS.getDistributedSystemStatus();
        
        return {
            overall_health: status.system_health,
            node_health: status.distributed.sync_stats.sync_health || 0,
            network_health: status.distributed.network_overview.active_nodes > 1 ? 100 : 50
        };
    }

    /**
     * Handle health degradation
     */
    async handleHealthDegradation(health) {
        console.log('[DNAConfiguredServer] Handling health degradation...');
        
        // Check evolution triggers from DNA
        const evolutionPolicies = this.dnaReader.getEvolutionPolicies();
        
        for (const trigger of evolutionPolicies.trigger_conditions) {
            if (this.evaluateTriggerCondition(trigger.condition, health)) {
                console.log(`[DNAConfiguredServer] Evolution trigger activated: ${trigger.name}`);
                await this.triggerEvolution(trigger);
            }
        }
    }

    /**
     * Evaluate trigger condition
     */
    evaluateTriggerCondition(condition, health) {
        // Simple condition evaluation (in production, use proper expression parser)
        if (condition.includes('health')) {
            const threshold = parseFloat(condition.match(/(\d+\.?\d*)/)?.[1] || 70);
            return health.overall_health < threshold;
        }
        
        return false;
    }

    /**
     * Trigger evolution
     */
    async triggerEvolution(trigger) {
        console.log(`[DNAConfiguredServer] Triggering evolution for: ${trigger.name}`);
        
        // Find corresponding action
        const evolutionPolicies = this.dnaReader.getEvolutionPolicies();
        const action = evolutionPolicies.actions.find(a => a.trigger_conditions?.includes(trigger.name));
        
        if (action) {
            await this.executeEvolutionAction(action);
        }
    }

    /**
     * Execute evolution action
     */
    async executeEvolutionAction(action) {
        console.log(`[DNAConfiguredServer] Executing evolution action: ${action.name}`);
        
        // Submit evolution task to distributed Brain OS
        await this.distributedBrainOS.submitDistributedTask({
            type: 'evolution',
            origin: 'dna_configured_server',
            payload: {
                action_name: action.name,
                plan_ref: action.plan_ref,
                success_criteria: action.success_criteria
            }
        }, 'cpu0', 'distributed_execution');
    }

    /**
     * Start periodic sync
     */
    startPeriodicSync() {
        setInterval(() => {
            this.performPeriodicSync();
        }, this.config.sync_interval);
    }

    /**
     * Perform periodic sync
     */
    async performPeriodicSync() {
        try {
            // Sync DNA with peers if needed
            if (this.distributedBrainOS) {
                const syncStats = this.distributedBrainOS.syncManager.getSyncStats();
                
                if (syncStats.active_peers === 0) {
                    console.log('[DNAConfiguredServer] No active peers for sync');
                } else {
                    console.log(`[DNAConfiguredServer] Synced with ${syncStats.active_peers} peers`);
                }
            }
            
        } catch (error) {
            console.error('[DNAConfiguredServer] Periodic sync failed:', error);
        }
    }

    /**
     * Transition to new state
     */
    async transitionToState(newState) {
        const oldState = this.serverState;
        this.serverState = newState;
        
        console.log(`[DNAConfiguredServer] State transition: ${oldState} -> ${newState}`);
        
        // Execute state entry actions
        await this.executeStateActions(newState, 'entry');
        
        // Execute state exit actions
        await this.executeStateActions(oldState, 'exit');
    }

    /**
     * Execute state actions
     */
    async executeStateActions(state, actionType) {
        const stateMachine = this.dnaReader.getStateMachineConfig();
        const stateConfig = stateMachine.states.get(state);
        
        if (!stateConfig) return;
        
        const actions = actionType === 'entry' ? stateConfig.entry_actions : stateConfig.exit_actions;
        
        for (const action of actions) {
            console.log(`[DNAConfiguredServer] Executing ${actionType} action: ${action}`);
            await this.executeAction(action);
        }
    }

    /**
     * Execute action
     */
    async executeAction(action) {
        switch (action) {
            case 'load_dna':
                // DNA already loaded
                break;
            case 'initialize_agents':
                // Agents already configured
                break;
            case 'setup_comms':
                // Communications already setup
                break;
            case 'start_health_monitoring':
                // Health monitoring already started
                break;
            case 'open_task_queue':
                // Task queue opened via distributed Brain OS
                break;
            default:
                console.log(`[DNAConfiguredServer] Unknown action: ${action}`);
        }
    }

    /**
     * Process incoming task
     */
    async processTask(task) {
        console.log(`[DNAConfiguredServer] Processing task: ${task.type}`);
        
        // Transition to PROCESSING state
        await this.transitionToState('PROCESSING');
        
        try {
            // Submit task to distributed Brain OS
            const taskId = await this.distributedBrainOS.submitDistributedTask(task);
            
            console.log(`[DNAConfiguredServer] Task submitted: ${taskId}`);
            
            // Transition to EVALUATING state
            await this.transitionToState('EVALUATING');
            
            // In a real implementation, wait for task completion
            // For demo, transition directly to REPORTING
            await this.transitionToState('REPORTING');
            
            return taskId;
            
        } catch (error) {
            console.error('[DNAConfiguredServer] Task processing failed:', error);
            await this.transitionToState('ERROR');
            throw error;
        }
    }

    /**
     * Get server status
     */
    getServerStatus() {
        return {
            node_id: this.nodeId,
            server_state: this.serverState,
            dna_id: this.currentDNA?.dna_id,
            dna_version: this.currentDNA?.version,
            uptime: Date.now() - this.startTime,
            initialized: this.initialized,
            agents_configured: this.currentDNA?.agents?.size || 0,
            health_status: this.getHealthStatus()
        };
    }

    /**
     * Shutdown server
     */
    async shutdown() {
        console.log('[DNAConfiguredServer] Shutting down...');
        
        try {
            // Transition to ERROR state for cleanup
            await this.transitionToState('ERROR');
            
            // Shutdown distributed Brain OS
            if (this.distributedBrainOS) {
                await this.distributedBrainOS.shutdown();
            }
            
            console.log('[DNAConfiguredServer] Server shutdown complete');
            
        } catch (error) {
            console.error('[DNAConfiguredServer] Error during shutdown:', error);
        }
    }

    /**
     * Export server state
     */
    exportState() {
        return {
            node_id: this.nodeId,
            server_state: this.serverState,
            current_dna: this.currentDNA,
            config: this.config,
            initialized: this.initialized,
            start_time: this.startTime,
            timestamp: new Date()
        };
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DNAConfiguredServer;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.DNAConfiguredServer = DNAConfiguredServer;
}

// Auto-initialize demo server if running in browser
if (typeof window !== 'undefined' && window.location) {
    document.addEventListener('DOMContentLoaded', async () => {
        const nodeId = `server_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        const dnaFilePath = window.location.search.includes('dna=external') ? 
            '/logic-dna-specification.yaml' : null;
        
        const server = new DNAConfiguredServer(nodeId, dnaFilePath);
        
        try {
            await server.initialize();
            window.dnaConfiguredServer = server;
            console.log('🧬 DNA Configured Server demo ready!');
        } catch (error) {
            console.error('Failed to initialize DNA Configured Server:', error);
        }
    });
}
