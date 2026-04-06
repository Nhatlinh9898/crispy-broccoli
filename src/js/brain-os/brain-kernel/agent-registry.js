/**
 * Brain OS - Agent Registry
 * Central registry for all neural agents in the system
 */

class AgentRegistry {
    constructor() {
        this.agents = new Map();
        this.cpuAgents = new Map(); // cpu0 -> agents, cpu1 -> agents
        this.capabilityIndex = new Map(); // capability -> [agents]
        this.statusListeners = new Map();
        this.initialized = false;
    }

    /**
     * Initialize the agent registry
     */
    async initialize() {
        console.log('[AgentRegistry] Initializing...');
        
        // Register core agents
        await this.registerCoreAgents();
        
        this.initialized = true;
        console.log('[AgentRegistry] Initialized with', this.agents.size, 'agents');
    }

    /**
     * Register a new agent
     */
    async registerAgent(agentConfig) {
        const agent = {
            agent_id: agentConfig.agent_id,
            role: agentConfig.role,
            cpu_affinity: agentConfig.cpu_affinity || 'any',
            capabilities: agentConfig.capabilities || [],
            input_types: agentConfig.input_types || [],
            output_types: agentConfig.output_types || [],
            priority: agentConfig.priority || 5,
            status: 'inactive',
            registered_at: new Date(),
            last_heartbeat: new Date(),
            metrics: {
                tasks_completed: 0,
                tasks_failed: 0,
                avg_response_time: 0,
                cpu_usage: 0
            }
        };

        // Validate agent config
        this.validateAgent(agent);

        // Register in main registry
        this.agents.set(agent.agent_id, agent);

        // Index by CPU
        if (!this.cpuAgents.has(agent.cpu_affinity)) {
            this.cpuAgents.set(agent.cpu_affinity, new Set());
        }
        this.cpuAgents.get(agent.cpu_affinity).add(agent.agent_id);

        // Index by capabilities
        agent.capabilities.forEach(cap => {
            if (!this.capabilityIndex.has(cap)) {
                this.capabilityIndex.set(cap, new Set());
            }
            this.capabilityIndex.get(cap).add(agent.agent_id);
        });

        console.log(`[AgentRegistry] Registered agent: ${agent.agent_id} (${agent.cpu_affinity})`);
        
        // Notify listeners
        this.notifyStatusChange(agent.agent_id, 'registered');
        
        return agent;
    }

    /**
     * Register core system agents
     */
    async registerCoreAgents() {
        const coreAgents = [
            // CPU 0 - Logic Brain
            {
                agent_id: 'canonicalizer',
                role: 'language_processing',
                cpu_affinity: 'cpu0',
                capabilities: ['text_normalization', 'structure_parsing', 'language_understanding'],
                input_types: ['raw_request', 'unstructured_text'],
                output_types: ['canonical_request', 'structured_data'],
                priority: 8
            },
            {
                agent_id: 'planner',
                role: 'task_planning',
                cpu_affinity: 'cpu0',
                capabilities: ['task_decomposition', 'workflow_planning', 'resource_allocation'],
                input_types: ['canonical_request', 'goal_specification'],
                output_types: ['execution_plan', 'task_graph'],
                priority: 9
            },
            {
                agent_id: 'selector',
                role: 'decision_making',
                cpu_affinity: 'cpu0',
                capabilities: ['result_selection', 'confidence_scoring', 'policy_enforcement'],
                input_types: ['candidate_results', 'evaluation_metrics'],
                output_types: ['selected_result', 'decision'],
                priority: 7
            },
            {
                agent_id: 'meta_observer',
                role: 'system_monitoring',
                cpu_affinity: 'cpu0',
                capabilities: ['kpi_monitoring', 'anomaly_detection', 'performance_tracking'],
                input_types: ['system_metrics', 'agent_metrics'],
                output_types: ['health_report', 'anomaly_alerts'],
                priority: 10
            },
            {
                agent_id: 'meta_analyzer',
                role: 'problem_analysis',
                cpu_affinity: 'cpu0',
                capabilities: ['root_cause_analysis', 'trend_analysis', 'opportunity_detection'],
                input_types: ['health_report', 'performance_data'],
                output_types: ['analysis_report', 'optimization_opportunities'],
                priority: 9
            },
            {
                agent_id: 'meta_planner',
                role: 'evolution_planning',
                cpu_affinity: 'cpu0',
                capabilities: ['evolution_strategy', 'optimization_planning', 'roadmap_generation'],
                input_types: ['analysis_report', 'optimization_opportunities'],
                output_types: ['evolution_plan', 'optimization_roadmap'],
                priority: 8
            },

            // CPU 1 - Compute Brain
            {
                agent_id: 'data_processor',
                role: 'data_processing',
                cpu_affinity: 'cpu1',
                capabilities: ['batch_processing', 'data_transformation', 'feature_extraction'],
                input_types: ['raw_data', 'batch_requests'],
                output_types: ['processed_data', 'features'],
                priority: 6
            },
            {
                agent_id: 'embedding_engine',
                role: 'feature_embedding',
                cpu_affinity: 'cpu1',
                capabilities: ['text_embedding', 'image_embedding', 'vector_generation'],
                input_types: ['processed_data', 'text', 'images'],
                output_types: ['embeddings', 'vectors'],
                priority: 7
            },
            {
                agent_id: 'model_runner',
                role: 'model_inference',
                cpu_affinity: 'cpu1',
                capabilities: ['neural_inference', 'model_execution', 'batch_prediction'],
                input_types: ['embeddings', 'features', 'model_inputs'],
                output_types: ['predictions', 'model_outputs'],
                priority: 8
            },
            {
                agent_id: 'evaluator',
                role: 'performance_evaluation',
                cpu_affinity: 'cpu1',
                capabilities: ['metrics_calculation', 'benchmarking', 'performance_analysis'],
                input_types: ['predictions', 'model_outputs', 'test_data'],
                output_types: ['evaluation_metrics', 'performance_reports'],
                priority: 6
            },
            {
                agent_id: 'experiment_runner',
                role: 'experimentation',
                cpu_affinity: 'cpu1',
                capabilities: ['ab_testing', 'experiment_execution', 'result_validation'],
                input_types: ['experiment_config', 'model_candidates'],
                output_types: ['experiment_results', 'validation_reports'],
                priority: 5
            }
        ];

        for (const agentConfig of coreAgents) {
            await this.registerAgent(agentConfig);
        }
    }

    /**
     * Find agents by capability
     */
    findAgentsByCapability(capability) {
        const agentIds = this.capabilityIndex.get(capability) || new Set();
        return Array.from(agentIds).map(id => this.agents.get(id));
    }

    /**
     * Find agents by CPU affinity
     */
    findAgentsByCPU(cpu) {
        const agentIds = this.cpuAgents.get(cpu) || new Set();
        return Array.from(agentIds).map(id => this.agents.get(id));
    }

    /**
     * Get agent by ID
     */
    getAgent(agentId) {
        return this.agents.get(agentId);
    }

    /**
     * Get all agents
     */
    getAllAgents() {
        return Array.from(this.agents.values());
    }

    /**
     * Update agent status
     */
    updateAgentStatus(agentId, status, metrics = {}) {
        const agent = this.agents.get(agentId);
        if (!agent) {
            throw new Error(`Agent not found: ${agentId}`);
        }

        agent.status = status;
        agent.last_heartbeat = new Date();
        
        // Update metrics
        if (metrics) {
            Object.assign(agent.metrics, metrics);
        }

        this.notifyStatusChange(agentId, status);
    }

    /**
     * Get agent metrics
     */
    getAgentMetrics(agentId) {
        const agent = this.agents.get(agentId);
        return agent ? agent.metrics : null;
    }

    /**
     * Get system overview
     */
    getSystemOverview() {
        const agents = this.getAllAgents();
        const overview = {
            total_agents: agents.length,
            cpu0_agents: this.findAgentsByCPU('cpu0').length,
            cpu1_agents: this.findAgentsByCPU('cpu1').length,
            active_agents: agents.filter(a => a.status === 'active').length,
            inactive_agents: agents.filter(a => a.status === 'inactive').length,
            evolving_agents: agents.filter(a => a.status === 'evolving').length,
            capabilities: Array.from(this.capabilityIndex.keys()),
            system_health: this.calculateSystemHealth()
        };

        return overview;
    }

    /**
     * Calculate system health score
     */
    calculateSystemHealth() {
        const agents = this.getAllAgents();
        if (agents.length === 0) return 0;

        const activeRatio = agents.filter(a => a.status === 'active').length / agents.length;
        const avgResponseTime = agents.reduce((sum, a) => sum + a.metrics.avg_response_time, 0) / agents.length;
        const avgSuccessRate = agents.reduce((sum, a) => {
            const total = a.metrics.tasks_completed + a.metrics.tasks_failed;
            return total > 0 ? sum + (a.metrics.tasks_completed / total) : sum;
        }, 0) / agents.length;

        // Health score: 0-100
        const healthScore = (activeRatio * 40) + (avgSuccessRate * 40) + (Math.max(0, 100 - avgResponseTime) * 0.2);
        return Math.round(healthScore);
    }

    /**
     * Validate agent configuration
     */
    validateAgent(agent) {
        if (!agent.agent_id || typeof agent.agent_id !== 'string') {
            throw new Error('Invalid agent_id');
        }
        if (!agent.role || typeof agent.role !== 'string') {
            throw new Error('Invalid role');
        }
        if (!['cpu0', 'cpu1', 'any'].includes(agent.cpu_affinity)) {
            throw new Error('Invalid cpu_affinity');
        }
        if (agent.priority < 1 || agent.priority > 10) {
            throw new Error('Priority must be between 1 and 10');
        }
    }

    /**
     * Add status change listener
     */
    addStatusListener(agentId, callback) {
        if (!this.statusListeners.has(agentId)) {
            this.statusListeners.set(agentId, new Set());
        }
        this.statusListeners.get(agentId).add(callback);
    }

    /**
     * Notify status change listeners
     */
    notifyStatusChange(agentId, status) {
        const listeners = this.statusListeners.get(agentId) || new Set();
        listeners.forEach(callback => {
            try {
                callback(agentId, status);
            } catch (error) {
                console.error(`[AgentRegistry] Error in status listener for ${agentId}:`, error);
            }
        });
    }

    /**
     * Export registry state
     */
    exportState() {
        return {
            agents: Array.from(this.agents.entries()),
            timestamp: new Date(),
            system_health: this.calculateSystemHealth()
        };
    }

    /**
     * Import registry state
     */
    async importState(state) {
        this.agents.clear();
        this.cpuAgents.clear();
        this.capabilityIndex.clear();

        for (const [agentId, agent] of state.agents) {
            await this.registerAgent(agent);
        }

        console.log(`[AgentRegistry] Imported ${state.agents.length} agents`);
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentRegistry;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.AgentRegistry = AgentRegistry;
}
