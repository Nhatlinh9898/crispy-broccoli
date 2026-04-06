/**
 * Brain OS Distributed - DNA Reader
 * Reads and parses Logic DNA specification from YAML
 */

class DNAReader {
    constructor() {
        this.currentDNA = null;
        this.dnaHistory = [];
        this.validators = new Map();
        this.parsers = new Map();
        this.initialized = false;
        
        // Setup built-in validators and parsers
        this.setupBuiltInComponents();
    }

    /**
     * Initialize DNA Reader
     */
    async initialize() {
        console.log('[DNAReader] Initializing DNA parsing system...');
        
        // Setup validators
        this.setupValidators();
        
        // Setup parsers
        this.setupParsers();
        
        this.initialized = true;
        console.log('[DNAReader] DNA parsing system initialized');
    }

    /**
     * Load DNA from YAML file
     */
    async loadDNAFromYAML(yamlContent) {
        try {
            console.log('[DNAReader] Loading DNA from YAML...');
            
            // Parse YAML content
            const dnaData = this.parseYAML(yamlContent);
            
            // Validate DNA structure
            this.validateDNA(dnaData);
            
            // Process DNA data
            const processedDNA = this.processDNA(dnaData);
            
            // Store current DNA
            this.currentDNA = processedDNA;
            this.dnaHistory.push({
                version: processedDNA.version,
                loaded_at: new Date(),
                dna_id: processedDNA.dna_id
            });
            
            console.log(`[DNAReader] DNA loaded successfully: ${processedDNA.dna_id} v${processedDNA.version}`);
            
            return processedDNA;
            
        } catch (error) {
            console.error('[DNAReader] Failed to load DNA from YAML:', error);
            throw new Error(`DNA loading failed: ${error.message}`);
        }
    }

    /**
     * Parse YAML content
     */
    parseYAML(yamlContent) {
        // Simple YAML parser (in production, use a proper YAML library)
        const lines = yamlContent.split('\n');
        const result = {};
        const stack = [];
        let currentLevel = result;
        let currentIndent = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();
            
            // Skip empty lines and comments
            if (!trimmed || trimmed.startsWith('#')) {
                continue;
            }
            
            // Calculate indentation
            const indent = line.length - line.trimStart().length;
            
            // Adjust stack based on indentation
            while (stack.length > 0 && indent <= currentIndent) {
                stack.pop();
                currentIndent = stack.length > 0 ? stack[stack.length - 1].indent : 0;
                currentLevel = stack.length > 0 ? stack[stack.length - 1].obj : result;
            }
            
            // Parse key-value pair
            if (trimmed.includes(':')) {
                const [key, ...valueParts] = trimmed.split(':');
                const value = valueParts.join(':').trim();
                
                if (value) {
                    // Simple value
                    currentLevel[key.trim()] = this.parseValue(value);
                } else {
                    // Object/array starts
                    const nextLine = lines[i + 1];
                    if (nextLine && nextLine.trim().startsWith('-')) {
                        // Array
                        currentLevel[key.trim()] = [];
                        stack.push({ obj: currentLevel[key.trim()], indent });
                        currentLevel = currentLevel[key.trim()];
                    } else {
                        // Object
                        currentLevel[key.trim()] = {};
                        stack.push({ obj: currentLevel[key.trim()], indent });
                        currentLevel = currentLevel[key.trim()];
                    }
                }
            } else if (trimmed.startsWith('-')) {
                // Array item
                const item = trimmed.substring(1).trim();
                if (Array.isArray(currentLevel)) {
                    currentLevel.push(this.parseValue(item));
                }
            }
            
            currentIndent = indent;
        }
        
        return result;
    }

    /**
     * Parse value (handle different data types)
     */
    parseValue(value) {
        if (!value) return '';
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
            return value.slice(1, -1);
        }
        
        // Parse as number
        if (/^\d+$/.test(value)) {
            return parseInt(value, 10);
        }
        
        if (/^\d+\.\d+$/.test(value)) {
            return parseFloat(value);
        }
        
        // Parse as boolean
        if (value === 'true') return true;
        if (value === 'false') return false;
        
        // Parse as null
        if (value === 'null' || value === '~') return null;
        
        // Return as string
        return value;
    }

    /**
     * Validate DNA structure
     */
    validateDNA(dnaData) {
        const requiredFields = ['dna_id', 'version', 'state_machine', 'routing_rules', 'agents'];
        
        for (const field of requiredFields) {
            if (!dnaData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }
        
        // Validate version format
        if (!this.isValidVersion(dnaData.version)) {
            throw new Error(`Invalid version format: ${dnaData.version}`);
        }
        
        // Validate state machine
        this.validateStateMachine(dnaData.state_machine);
        
        // Validate agents
        this.validateAgents(dnaData.agents);
        
        // Validate routing rules
        this.validateRoutingRules(dnaData.routing_rules);
        
        console.log('[DNAReader] DNA validation passed');
    }

    /**
     * Validate version format
     */
    isValidVersion(version) {
        return /^\d+\.\d+\.\d+$/.test(version);
    }

    /**
     * Validate state machine
     */
    validateStateMachine(stateMachine) {
        if (!stateMachine.states || !Array.isArray(stateMachine.states)) {
            throw new Error('state_machine.states must be an array');
        }
        
        if (!stateMachine.transitions || !Array.isArray(stateMachine.transitions)) {
            throw new Error('state_machine.transitions must be an array');
        }
        
        const states = new Set(stateMachine.states.map(s => s.name || s));
        
        for (const transition of stateMachine.transitions) {
            const fromState = transition.from;
            const toState = transition.to;
            
            if (fromState !== 'ANY' && !states.has(fromState)) {
                throw new Error(`Invalid transition from state: ${fromState}`);
            }
            
            if (!states.has(toState)) {
                throw new Error(`Invalid transition to state: ${toState}`);
            }
        }
    }

    /**
     * Validate agents
     */
    validateAgents(agents) {
        if (!Array.isArray(agents)) {
            throw new Error('agents must be an array');
        }
        
        const agentIds = new Set();
        
        for (const agent of agents) {
            if (!agent.id) {
                throw new Error('Agent must have an id');
            }
            
            if (agentIds.has(agent.id)) {
                throw new Error(`Duplicate agent id: ${agent.id}`);
            }
            
            agentIds.add(agent.id);
            
            if (!agent.role) {
                throw new Error(`Agent ${agent.id} must have a role`);
            }
            
            if (!agent.cpu_affinity) {
                throw new Error(`Agent ${agent.id} must have cpu_affinity`);
            }
            
            if (!['cpu0', 'cpu1', 'any'].includes(agent.cpu_affinity)) {
                throw new Error(`Invalid cpu_affinity for agent ${agent.id}: ${agent.cpu_affinity}`);
            }
        }
    }

    /**
     * Validate routing rules
     */
    validateRoutingRules(routingRules) {
        const validPriorities = ['inference', 'evolution', 'analysis', 'training'];
        
        for (const [ruleType, rule] of Object.entries(routingRules)) {
            if (!validPriorities.includes(ruleType)) {
                throw new Error(`Invalid routing rule type: ${ruleType}`);
            }
            
            if (typeof rule.priority !== 'number' || rule.priority < 1 || rule.priority > 100) {
                throw new Error(`Invalid priority for ${ruleType}: ${rule.priority}`);
            }
        }
    }

    /**
     * Process DNA data into internal format
     */
    processDNA(dnaData) {
        const processedDNA = {
            // Basic info
            dna_id: dnaData.dna_id,
            version: dnaData.version,
            description: dnaData.description || '',
            metadata: dnaData.metadata || {},
            
            // Processed state machine
            state_machine: this.processStateMachine(dnaData.state_machine),
            
            // Processed routing rules
            routing_rules: this.processRoutingRules(dnaData.routing_rules),
            
            // Processed agents
            agents: this.processAgents(dnaData.agents),
            
            // Processed evolution policies
            evolution_policies: this.processEvolutionPolicies(dnaData.evolution_policies || {}),
            
            // Processed plans
            plans: this.processPlans(dnaData.plans || []),
            
            // Processed inheritance rules
            inheritance: this.processInheritance(dnaData.inheritance || {}),
            
            // Processed monitoring
            monitoring: this.processMonitoring(dnaData.monitoring || {}),
            
            // Processed security
            security: this.processSecurity(dnaData.security || {}),
            
            // Processing metadata
            processed_at: new Date(),
            checksum: this.calculateChecksum(dnaData)
        };
        
        return processedDNA;
    }

    /**
     * Process state machine
     */
    processStateMachine(stateMachine) {
        const states = new Map();
        const transitions = new Map();
        
        // Process states
        for (const state of stateMachine.states) {
            const stateName = typeof state === 'string' ? state : state.name;
            states.set(stateName, {
                name: stateName,
                description: state.description || '',
                entry_actions: state.entry_actions || [],
                exit_actions: state.exit_actions || [],
                timeout_ms: state.timeout_ms || null
            });
        }
        
        // Process transitions
        for (const transition of stateMachine.transitions) {
            const key = `${transition.from}->${transition.to}`;
            transitions.set(key, {
                from: transition.from,
                to: transition.to,
                condition: transition.condition || '',
                action: transition.action || ''
            });
        }
        
        return {
            states: states,
            transitions: transitions,
            initial_state: stateMachine.states[0]?.name || 'INIT'
        };
    }

    /**
     * Process routing rules
     */
    processRoutingRules(routingRules) {
        const processed = {};
        
        for (const [ruleType, rule] of Object.entries(routingRules)) {
            processed[ruleType] = {
                priority: rule.priority,
                cpu_affinity: rule.cpu_affinity,
                max_latency_ms: rule.max_latency_ms || null,
                fallback_strategy: rule.fallback_strategy || [],
                config: rule || {}
            };
        }
        
        return processed;
    }

    /**
     * Process agents
     */
    processAgents(agents) {
        const processed = new Map();
        
        for (const agent of agents) {
            processed.set(agent.id, {
                id: agent.id,
                role: agent.role,
                brain_region: agent.brain_region || '',
                cpu_affinity: agent.cpu_affinity,
                input_types: agent.input_types || [],
                output_types: agent.output_types || [],
                capabilities: agent.capabilities || [],
                config: agent.config || {},
                status: 'inactive'
            });
        }
        
        return processed;
    }

    /**
     * Process evolution policies
     */
    processEvolutionPolicies(evolutionPolicies) {
        return {
            trigger_conditions: evolutionPolicies.trigger_conditions || [],
            actions: evolutionPolicies.actions || []
        };
    }

    /**
     * Process plans
     */
    processPlans(plans) {
        const processed = new Map();
        
        for (const plan of plans) {
            processed.set(plan.id, {
                id: plan.id,
                description: plan.description || '',
                estimated_duration_hours: plan.estimated_duration_hours || 0,
                resource_requirements: plan.resource_requirements || {},
                steps: plan.steps || [],
                rollback_plan: plan.rollback_plan || []
            });
        }
        
        return processed;
    }

    /**
     * Process inheritance
     */
    processInheritance(inheritance) {
        return {
            strategy: inheritance.strategy || 'versioned_lineage',
            rules: inheritance.rules || [],
            mutation_policy: inheritance.mutation_policy || {}
        };
    }

    /**
     * Process monitoring
     */
    processMonitoring(monitoring) {
        return {
            health_checks: monitoring.health_checks || [],
            metrics_collection: monitoring.metrics_collection || {},
            alerts: monitoring.alerts || []
        };
    }

    /**
     * Process security
     */
    processSecurity(security) {
        return {
            authentication: security.authentication || {},
            authorization: security.authorization || {},
            encryption: security.encryption || {},
            audit: security.audit || {}
        };
    }

    /**
     * Calculate checksum for DNA integrity
     */
    calculateChecksum(dnaData) {
        // Simple checksum (in production, use proper hash function)
        const str = JSON.stringify(dnaData);
        let hash = 0;
        
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        return hash.toString(16);
    }

    /**
     * Get current DNA
     */
    getCurrentDNA() {
        return this.currentDNA;
    }

    /**
     * Get DNA version
     */
    getDNAVersion() {
        return this.currentDNA ? this.currentDNA.version : null;
    }

    /**
     * Get agents configuration
     */
    getAgentsConfig() {
        return this.currentDNA ? this.currentDNA.agents : new Map();
    }

    /**
     * Get state machine configuration
     */
    getStateMachineConfig() {
        return this.currentDNA ? this.currentDNA.state_machine : null;
    }

    /**
     * Get routing rules
     */
    getRoutingRules() {
        return this.currentDNA ? this.currentDNA.routing_rules : {};
    }

    /**
     * Get evolution policies
     */
    getEvolutionPolicies() {
        return this.currentDNA ? this.currentDNA.evolution_policies : {};
    }

    /**
     * Get plans
     */
    getPlans() {
        return this.currentDNA ? this.currentDNA.plans : new Map();
    }

    /**
     * Check if DNA is compatible with version
     */
    isCompatibleWithVersion(version) {
        if (!this.currentDNA) return false;
        
        const currentVersion = this.currentDNA.version;
        const currentParts = currentVersion.split('.').map(Number);
        const requiredParts = version.split('.').map(Number);
        
        // Major version must match
        if (currentParts[0] !== requiredParts[0]) {
            return false;
        }
        
        // Minor version must be >= required
        if (currentParts[1] < requiredParts[1]) {
            return false;
        }
        
        // Patch version can be anything
        return true;
    }

    /**
     * Setup built-in components
     */
    setupBuiltInComponents() {
        // Built-in validators will be added in setupValidators()
        // Built-in parsers will be added in setupParsers()
    }

    /**
     * Setup validators
     */
    setupValidators() {
        // Add custom validators if needed
    }

    /**
     * Setup parsers
     */
    setupParsers() {
        // Add custom parsers if needed
    }

    /**
     * Export DNA reader state
     */
    exportState() {
        return {
            current_dna: this.currentDNA,
            dna_history: this.dnaHistory,
            initialized: this.initialized,
            timestamp: new Date()
        };
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DNAReader;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.DNAReader = DNAReader;
}
