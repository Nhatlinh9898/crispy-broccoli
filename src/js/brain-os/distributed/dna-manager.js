/**
 * Brain OS Distributed - DNA Manager
 * Manages Logic DNA for multi-server neural lineage system
 */

class DNAManager {
    constructor(syncBus) {
        this.syncBus = syncBus;
        this.logicDNA = new Map(); // dna_id -> dna_definition
        this.lineageTree = new Map(); // node_id -> lineage_info
        this.ruleSets = new Map(); // ruleset_id -> rules
        this.stateMachines = new Map(); // sm_id -> state_machine
        this.inheritancePatterns = new Map(); // pattern_id -> inheritance_rules
        
        this.currentDNAVersion = '1.0.0';
        this.dnaHistory = [];
        this.initialized = false;
    }

    /**
     * Initialize DNA Manager
     */
    async initialize() {
        console.log('[DNAManager] Initializing Logic DNA system...');
        
        // Create base Logic DNA
        await this.createBaseLogicDNA();
        
        // Setup sync bus listeners
        this.setupSyncListeners();
        
        this.initialized = true;
        console.log('[DNAManager] Logic DNA system initialized');
    }

    /**
     * Create base Logic DNA for all servers
     */
    async createBaseLogicDNA() {
        const baseDNA = {
            dna_id: 'base_brain_os_v1',
            version: this.currentDNAVersion,
            created_at: new Date(),
            ruleset_id: 'base_ruleset',
            state_machine_id: 'base_sm',
            inheritance_pattern_id: 'standard_inheritance',
            
            // Core processing rules
            processing_rules: {
                task_routing: {
                    inference: { cpu_preference: 'compute', priority: 1 },
                    evolution: { cpu_preference: 'logic', priority: 2 },
                    analysis: { cpu_preference: 'logic', priority: 3 }
                },
                fallback_behavior: {
                    max_retries: 3,
                    timeout_ms: 30000,
                    degradation_strategy: 'graceful'
                },
                optimization_targets: {
                    accuracy_threshold: 0.85,
                    latency_threshold_ms: 200,
                    cost_threshold: 0.01
                }
            },
            
            // Decision making rules
            decision_rules: {
                model_selection: {
                    ensemble_weights: { basic: 0.3, transformer: 0.4, gnn: 0.3 },
                    confidence_threshold: 0.8,
                    fallback_model: 'basic'
                },
                resource_allocation: {
                    max_concurrent_tasks: 10,
                    memory_limit_mb: 1024,
                    cpu_threshold: 0.8
                }
            },
            
            // Evolution rules
            evolution_rules: {
                triggers: {
                    performance_drop: 0.15,
                    error_rate_increase: 0.05,
                    latency_increase: 200
                },
                strategies: {
                    model_distillation: true,
                    architecture_search: true,
                    hyperparameter_tuning: true
                },
                rollout_policy: {
                    canary_threshold: 0.95,
                    rollback_threshold: 0.8
                }
            },
            
            // Communication rules
            communication_rules: {
                sync_frequency_ms: 60000,
                message_batch_size: 100,
                compression_enabled: true,
                encryption_required: false
            }
        };

        this.logicDNA.set(baseDNA.dna_id, baseDNA);
        
        // Create associated ruleset
        await this.createRuleSet('base_ruleset', baseDNA);
        
        // Create state machine
        await this.createStateMachine('base_sm');
        
        // Create inheritance pattern
        await this.createInheritancePattern('standard_inheritance');
        
        console.log('[DNAManager] Base Logic DNA created:', baseDNA.dna_id);
    }

    /**
     * Create ruleset
     */
    async createRuleSet(rulesetId, dna) {
        const ruleset = {
            ruleset_id: rulesetId,
            version: dna.version,
            created_at: new Date(),
            
            // Task processing rules
            task_rules: {
                validation: {
                    required_fields: ['task_id', 'type', 'payload'],
                    optional_fields: ['constraints', 'context_ref']
                },
                routing: {
                    cpu_affinity_rules: dna.processing_rules.task_routing,
                    priority_rules: { inference: 1, evolution: 2, analysis: 3 }
                },
                execution: {
                    timeout_rules: dna.processing_rules.fallback_behavior,
                    retry_rules: dna.processing_rules.fallback_behavior
                }
            },
            
            // Agent management rules
            agent_rules: {
                registration: {
                    required_capabilities: ['input_types', 'output_types'],
                    priority_range: [1, 10],
                    cpu_options: ['cpu0', 'cpu1', 'any']
                },
                monitoring: {
                    heartbeat_interval_ms: 10000,
                    health_check_interval_ms: 30000,
                    failure_threshold: 3
                },
                recovery: {
                    auto_restart: true,
                    fallback_agents: true,
                    graceful_degradation: true
                }
            },
            
            // Data processing rules
            data_rules: {
                validation: {
                    schema_required: true,
                    type_checking: true,
                    size_limits: { max_mb: 100 }
                },
                processing: {
                    batch_size: 32,
                    parallel_workers: 4,
                    memory_optimization: true
                },
                storage: {
                    retention_days: 30,
                    compression: true,
                    encryption_at_rest: false
                }
            }
        };

        this.ruleSets.set(rulesetId, ruleset);
        return ruleset;
    }

    /**
     * Create state machine
     */
    async createStateMachine(smId) {
        const stateMachine = {
            sm_id: smId,
            version: this.currentDNAVersion,
            created_at: new Date(),
            
            states: {
                INIT: {
                    entry_actions: ['initialize_agents', 'load_dna', 'setup_comms'],
                    exit_actions: [],
                    transitions: {
                        start: { target: 'READY', condition: 'initialization_complete' }
                    }
                },
                
                READY: {
                    entry_actions: ['start_health_monitoring', 'open_task_queue'],
                    exit_actions: ['pause_health_monitoring'],
                    transitions: {
                        process_task: { target: 'PROCESSING', condition: 'task_available' },
                        shutdown: { target: 'SHUTDOWN', condition: 'shutdown_signal' }
                    }
                },
                
                PROCESSING: {
                    entry_actions: ['allocate_resources', 'execute_task'],
                    exit_actions: ['release_resources'],
                    transitions: {
                        complete: { target: 'EVALUATING', condition: 'task_complete' },
                        error: { target: 'ERROR_HANDLING', condition: 'task_failed' }
                    }
                },
                
                EVALUATING: {
                    entry_actions: ['collect_metrics', 'validate_results'],
                    exit_actions: [],
                    transitions: {
                        success: { target: 'REPORTING', condition: 'results_valid' },
                        retry: { target: 'PROCESSING', condition: 'retry_allowed' },
                        fail: { target: 'ERROR_HANDLING', condition: 'max_retries_exceeded' }
                    }
                },
                
                REPORTING: {
                    entry_actions: ['send_results', 'update_metrics', 'sync_state'],
                    exit_actions: [],
                    transitions: {
                        done: { target: 'READY', condition: 'reporting_complete' }
                    }
                },
                
                ERROR_HANDLING: {
                    entry_actions: ['log_error', 'trigger_recovery', 'notify_monitor'],
                    exit_actions: [],
                    transitions: {
                        recover: { target: 'READY', condition: 'recovery_successful' },
                        escalate: { target: 'SHUTDOWN', condition: 'recovery_failed' }
                    }
                },
                
                SHUTDOWN: {
                    entry_actions: ['cleanup_resources', 'save_state', 'notify_peers'],
                    exit_actions: [],
                    transitions: {
                        terminated: { target: 'TERMINATED', condition: 'cleanup_complete' }
                    }
                },
                
                TERMINATED: {
                    entry_actions: [],
                    exit_actions: [],
                    transitions: {}
                }
            },
            
            initial_state: 'INIT',
            
            // Global conditions
            conditions: {
                initialization_complete: () => true, // Override in implementation
                task_available: (context) => context.task_queue.length > 0,
                task_complete: (context) => context.task.status === 'completed',
                task_failed: (context) => context.task.status === 'failed',
                results_valid: (context) => context.validation_passed,
                retry_allowed: (context) => context.retry_count < 3,
                max_retries_exceeded: (context) => context.retry_count >= 3,
                recovery_successful: (context) => context.recovery_status === 'success',
                recovery_failed: (context) => context.recovery_status === 'failed',
                reporting_complete: (context) => context.results_sent,
                shutdown_signal: (context) => context.shutdown_requested,
                cleanup_complete: () => true
            }
        };

        this.stateMachines.set(smId, stateMachine);
        return stateMachine;
    }

    /**
     * Create inheritance pattern
     */
    async createInheritancePattern(patternId) {
        const pattern = {
            pattern_id: patternId,
            version: this.currentDNAVersion,
            created_at: new Date(),
            
            inheritance_rules: {
                // What gets inherited from parent
                inherited_attributes: [
                    'ruleset_id',
                    'state_machine_id',
                    'processing_rules',
                    'decision_rules',
                    'communication_rules'
                ],
                
                // What gets mutated/evolved
                mutable_attributes: [
                    'evolution_rules.triggers',
                    'evolution_rules.strategies',
                    'decision_rules.model_selection.ensemble_weights',
                    'processing_rules.optimization_targets'
                ],
                
                // Inheritance probability
                inheritance_probability: 0.85,
                mutation_probability: 0.15,
                
                // Lineage tracking
                lineage_depth_limit: 10,
                branching_factor: 2
            },
            
            evolution_rules: {
                // When to trigger evolution
                evolution_triggers: [
                    'performance_degradation',
                    'new_requirements',
                    'resource_constraints',
                    'security_updates'
                ],
                
                // Evolution strategies
                strategies: {
                    mutation: {
                        weight_adjustment: { range: 0.1, probability: 0.6 },
                        threshold_tuning: { range: 0.05, probability: 0.4 },
                        rule_addition: { probability: 0.2 },
                        rule_removal: { probability: 0.1 }
                    },
                    
                    crossover: {
                        parent_selection: 'best_two',
                        crossover_point: 'random',
                        inheritance_ratio: 0.7
                    },
                    
                    selection: {
                        fitness_function: 'weighted_performance',
                        population_size: 10,
                        elite_ratio: 0.2
                    }
                }
            }
        };

        this.inheritancePatterns.set(patternId, pattern);
        return pattern;
    }

    /**
     * Register a new server node
     */
    async registerNode(nodeId, parentNodeId = null) {
        const lineage = {
            node_id: nodeId,
            parent_node_id: parentNodeId,
            generation: parentNodeId ? this.lineageTree.get(parentNodeId)?.generation + 1 || 1 : 1,
            dna_id: this.inheritDNA(parentNodeId),
            inherited_at: new Date(),
            mutations: [],
            performance_history: []
        };

        this.lineageTree.set(nodeId, lineage);
        
        // Broadcast new node registration
        await this.syncBus.broadcastEvent('node_registered', {
            node_id: nodeId,
            parent_node_id: parentNodeId,
            generation: lineage.generation,
            dna_id: lineage.dna_id
        });

        console.log(`[DNAManager] Node registered: ${nodeId} (Gen ${lineage.generation})`);
        return lineage;
    }

    /**
     * Inherit DNA from parent node
     */
    inheritDNA(parentNodeId) {
        if (!parentNodeId) {
            return 'base_brain_os_v1'; // Base DNA for root nodes
        }

        const parentLineage = this.lineageTree.get(parentNodeId);
        if (!parentLineage) {
            throw new Error(`Parent node not found: ${parentNodeId}`);
        }

        const parentDNA = this.logicDNA.get(parentLineage.dna_id);
        if (!parentDNA) {
            throw new Error(`Parent DNA not found: ${parentLineage.dna_id}`);
        }

        // Create child DNA with potential mutations
        const childDNA = this.mutateDNA(parentDNA, parentLineage);
        
        const childDNAId = `${parentLineage.dna_id}_gen${parentLineage.generation + 1}_${Date.now()}`;
        childDNA.dna_id = childDNAId;
        childDNA.parent_dna_id = parentLineage.dna_id;
        
        this.logicDNA.set(childDNAId, childDNA);
        
        return childDNAId;
    }

    /**
     * Mutate DNA based on inheritance pattern
     */
    mutateDNA(parentDNA, parentLineage) {
        const pattern = this.inheritancePatterns.get('standard_inheritance');
        const childDNA = JSON.parse(JSON.stringify(parentDNA)); // Deep copy
        
        // Apply mutations based on probability
        if (Math.random() < pattern.inheritance_rules.mutation_probability) {
            const mutations = [];
            
            // Mutate ensemble weights
            if (Math.random() < pattern.evolution_rules.strategies.mutation.weight_adjustment.probability) {
                const range = pattern.evolution_rules.strategies.mutation.weight_adjustment.range;
                const weights = childDNA.decision_rules.model_selection.ensemble_weights;
                
                // Random weight adjustment
                const adjustment = (Math.random() - 0.5) * range;
                weights.basic = Math.max(0.1, Math.min(0.6, weights.basic + adjustment));
                weights.transformer = Math.max(0.1, Math.min(0.6, weights.transformer + adjustment));
                weights.gnn = Math.max(0.1, Math.min(0.6, weights.gnn + adjustment));
                
                // Normalize weights
                const sum = weights.basic + weights.transformer + weights.gnn;
                weights.basic /= sum;
                weights.transformer /= sum;
                weights.gnn /= sum;
                
                mutations.push(`ensemble_weights_adjusted: ${adjustment.toFixed(3)}`);
            }
            
            // Mutate thresholds
            if (Math.random() < pattern.evolution_rules.strategies.mutation.threshold_tuning.probability) {
                const range = pattern.evolution_rules.strategies.mutation.threshold_tuning.range;
                const oldThreshold = childDNA.processing_rules.optimization_targets.accuracy_threshold;
                const adjustment = (Math.random() - 0.5) * range;
                childDNA.processing_rules.optimization_targets.accuracy_threshold = 
                    Math.max(0.7, Math.min(0.95, oldThreshold + adjustment));
                
                mutations.push(`accuracy_threshold: ${oldThreshold} → ${childDNA.processing_rules.optimization_targets.accuracy_threshold}`);
            }
            
            // Record mutations
            childDNA.mutations = mutations;
        }
        
        // Update version
        childDNA.version = this.incrementVersion(parentDNA.version);
        childDNA.created_at = new Date();
        
        return childDNA;
    }

    /**
     * Increment version number
     */
    incrementVersion(version) {
        const parts = version.split('.');
        const patch = parseInt(parts[2]) + 1;
        return `${parts[0]}.${parts[1]}.${patch}`;
    }

    /**
     * Get DNA for a node
     */
    getNodeDNA(nodeId) {
        const lineage = this.lineageTree.get(nodeId);
        if (!lineage) {
            throw new Error(`Node not found: ${nodeId}`);
        }
        
        return this.logicDNA.get(lineage.dna_id);
    }

    /**
     * Get lineage tree
     */
    getLineageTree() {
        return Array.from(this.lineageTree.entries()).map(([nodeId, lineage]) => ({
            node_id: nodeId,
            parent_node_id: lineage.parent_node_id,
            generation: lineage.generation,
            dna_id: lineage.dna_id,
            inherited_at: lineage.inherited_at,
            mutations: lineage.mutations
        }));
    }

    /**
     * Setup sync bus listeners
     */
    setupSyncListeners() {
        this.syncBus.subscribe('dna_manager', 'dna_update', async (message) => {
            await this.handleDNAUpdate(message);
        });

        this.syncBus.subscribe('dna_manager', 'node_request', async (message) => {
            await this.handleNodeRequest(message);
        });
    }

    /**
     * Handle DNA update from sync bus
     */
    async handleDNAUpdate(message) {
        const { dna_id, dna_definition, source_node } = message.payload;
        
        // Update local DNA
        this.logicDNA.set(dna_id, dna_definition);
        
        console.log(`[DNAManager] DNA updated from ${source_node}: ${dna_id}`);
    }

    /**
     * Handle node request
     */
    async handleNodeRequest(message) {
        const { request_type, node_id } = message.payload;
        
        switch (request_type) {
            case 'get_dna':
                const dna = this.getNodeDNA(node_id);
                await this.syncBus.sendMessage({
                    type: 'dna_response',
                    to_agent: message.from_agent,
                    payload: { node_id, dna }
                });
                break;
                
            case 'get_lineage':
                const lineage = this.lineageTree.get(node_id);
                await this.syncBus.sendMessage({
                    type: 'lineage_response',
                    to_agent: message.from_agent,
                    payload: { node_id, lineage }
                });
                break;
        }
    }

    /**
     * Sync DNA to all nodes
     */
    async syncDNAToAll(dnaId) {
        const dna = this.logicDNA.get(dnaId);
        if (!dna) {
            throw new Error(`DNA not found: ${dnaId}`);
        }

        await this.syncBus.broadcastEvent('dna_sync', {
            dna_id: dnaId,
            dna_definition: dna
        });
    }

    /**
     * Export DNA Manager state
     */
    exportState() {
        return {
            logicDNA: Array.from(this.logicDNA.entries()),
            lineageTree: Array.from(this.lineageTree.entries()),
            ruleSets: Array.from(this.ruleSets.entries()),
            stateMachines: Array.from(this.stateMachines.entries()),
            inheritancePatterns: Array.from(this.inheritancePatterns.entries()),
            currentDNAVersion: this.currentDNAVersion,
            timestamp: new Date()
        };
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DNAManager;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.DNAManager = DNAManager;
}
