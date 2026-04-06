/**
 * Brain OS Distributed - Multi-Server Neural Operating System
 * Extends Brain OS for distributed neural lineage architecture
 */

import DNAManager from './dna-manager.js';
import SyncManager from './sync-manager.js';
import NodeRegistry from './node-registry.js';
import { getBrainOS } from '../brain-os-main.js';

class DistributedBrainOS {
    constructor(nodeId, isMasterNode = false) {
        this.nodeId = nodeId;
        this.isMasterNode = isMasterNode;
        
        // Core distributed components
        this.dnaManager = null;
        this.syncManager = null;
        this.nodeRegistry = null;
        
        // Base Brain OS instance
        this.baseBrainOS = null;
        
        // Distributed state
        this.distributedState = {
            generation: 0,
            dna_id: null,
            parent_node_id: null,
            cluster_id: 'default',
            lineage_id: null
        };
        
        this.initialized = false;
        this.startTime = Date.now();
    }

    /**
     * Initialize Distributed Brain OS
     */
    async initialize() {
        console.log(`🧠 Initializing Distributed Brain OS for node: ${this.nodeId}`);
        
        try {
            // Initialize base Brain OS
            this.baseBrainOS = getBrainOS();
            await this.baseBrainOS.initialize();
            
            // Initialize distributed components
            await this.initializeDistributedComponents();
            
            // Setup distributed message handlers
            this.setupDistributedMessageHandlers();
            
            // Register with network
            await this.registerWithNetwork();
            
            // Start distributed monitoring
            this.startDistributedMonitoring();
            
            this.initialized = true;
            
            console.log(`✅ Distributed Brain OS initialized (Gen ${this.distributedState.generation})`);
            console.log(`🧬 DNA ID: ${this.distributedState.dna_id}`);
            console.log(`🌐 Cluster: ${this.distributedState.cluster_id}`);
            
            // Send initialization complete event
            await this.sendDistributedEvent('distributed_node_ready', {
                node_id: this.nodeId,
                generation: this.distributedState.generation,
                dna_id: this.distributedState.dna_id
            });
            
        } catch (error) {
            console.error('❌ Failed to initialize Distributed Brain OS:', error);
            throw error;
        }
    }

    /**
     * Initialize distributed components
     */
    async initializeDistributedComponents() {
        // Initialize Sync Manager
        this.syncManager = new SyncManager(this.nodeId, this.baseBrainOS.messageBus);
        await this.syncManager.initialize();
        
        // Initialize DNA Manager
        this.dnaManager = new DNAManager(this.syncManager);
        await this.dnaManager.initialize();
        
        // Initialize Node Registry
        this.nodeRegistry = new NodeRegistry(this.syncManager);
        await this.nodeRegistry.initialize(this.nodeId, this.isMasterNode);
        
        // Inherit DNA if not master node
        if (!this.isMasterNode) {
            await this.inheritFromParent();
        } else {
            // Master node uses base DNA
            this.distributedState.dna_id = 'base_brain_os_v1';
            this.distributedState.generation = 0;
        }
        
        console.log('📦 Distributed components initialized');
    }

    /**
     * Inherit DNA from parent node
     */
    async inheritFromParent() {
        console.log('[DistributedBrainOS] Inheriting DNA from parent...');
        
        // Find parent node (could be from config or discovery)
        const parentNodeId = this.getParentNodeId();
        
        if (parentNodeId) {
            // Register with DNA Manager
            const lineage = await this.dnaManager.registerNode(this.nodeId, parentNodeId);
            
            this.distributedState.dna_id = lineage.dna_id;
            this.distributedState.generation = lineage.generation;
            this.distributedState.parent_node_id = parentNodeId;
            this.distributedState.lineage_id = lineage.lineage_id;
            
            console.log(`🧬 Inherited DNA: ${this.distributedState.dna_id} (Gen ${this.distributedState.generation})`);
        } else {
            // No parent - use base DNA
            this.distributedState.dna_id = 'base_brain_os_v1';
            this.distributedState.generation = 0;
            
            console.log('🧬 Using base DNA (no parent found)');
        }
    }

    /**
     * Get parent node ID
     */
    getParentNodeId() {
        // This could come from configuration, environment variables, or discovery
        // For demo purposes, return null (no parent)
        return null;
    }

    /**
     * Setup distributed message handlers
     */
    setupDistributedMessageHandlers() {
        // Handle distributed task requests
        this.baseBrainOS.messageBus.subscribe('distributed_brain_os', 'distributed_task', async (message) => {
            await this.handleDistributedTask(message);
        });

        // Handle lineage events
        this.baseBrainOS.messageBus.subscribe('distributed_brain_os', 'lineage_event', async (message) => {
            await this.handleLineageEvent(message);
        });

        // Handle evolution requests
        this.baseBrainOS.messageBus.subscribe('distributed_brain_os', 'evolution_request', async (message) => {
            await this.handleEvolutionRequest(message);
        });

        // Handle cluster operations
        this.baseBrainOS.messageBus.subscribe('distributed_brain_os', 'cluster_operation', async (message) => {
            await this.handleClusterOperation(message);
        });
    }

    /**
     * Register with network
     */
    async registerWithNetwork() {
        const nodeInfo = {
            node_id: this.nodeId,
            generation: this.distributedState.generation,
            dna_id: this.distributedState.dna_id,
            parent_node_id: this.distributedState.parent_node_id,
            cluster_id: this.distributedState.cluster_id,
            capabilities: this.getLocalCapabilities(),
            resources: this.getLocalResources(),
            endpoint: this.getLocalEndpoint()
        };

        if (this.isMasterNode) {
            // Master node registers itself
            await this.nodeRegistry.registerNode(nodeInfo);
        } else {
            // Non-master nodes send registration to master
            await this.sendRegistrationToMaster(nodeInfo);
        }
    }

    /**
     * Send registration to master node
     */
    async sendRegistrationToMaster(nodeInfo) {
        await this.syncManager.broadcastEvent('node_registration_request', {
            node_info: nodeInfo,
            timestamp: new Date()
        });
    }

    /**
     * Start distributed monitoring
     */
    startDistributedMonitoring() {
        // Monitor distributed health every 30 seconds
        setInterval(() => {
            this.updateDistributedHealth();
        }, 30000);

        // Monitor lineage evolution every 5 minutes
        setInterval(() => {
            this.checkEvolutionTriggers();
        }, 300000);
    }

    /**
     * Handle distributed task
     */
    async handleDistributedTask(message) {
        const { task, execution_node, coordination_type } = message.payload;
        
        console.log(`[DistributedBrainOS] Received distributed task: ${task.task_id}`);
        
        // Check if task is for this node
        if (execution_node === this.nodeId || execution_node === 'any') {
            // Submit to local task scheduler
            await this.baseBrainOS.submitTask(task);
        }
        
        // Handle coordination if needed
        if (coordination_type === 'distributed_execution') {
            await this.coordinateDistributedExecution(task);
        }
    }

    /**
     * Handle lineage event
     */
    async handleLineageEvent(message) {
        const { event_type, lineage_data } = message.payload;
        
        console.log(`[DistributedBrainOS] Lineage event: ${event_type}`);
        
        switch (event_type) {
            case 'new_generation':
                await this.handleNewGeneration(lineage_data);
                break;
            case 'lineage_split':
                await this.handleLineageSplit(lineage_data);
                break;
            case 'lineage_merge':
                await this.handleLineageMerge(lineage_data);
                break;
        }
    }

    /**
     * Handle evolution request
     */
    async handleEvolutionRequest(message) {
        const { evolution_type, target_nodes, evolution_params } = message.payload;
        
        console.log(`[DistributedBrainOS] Evolution request: ${evolution_type}`);
        
        // Check if this node is a target
        if (target_nodes.includes(this.nodeId) || target_nodes.includes('all')) {
            await this.executeEvolution(evolution_type, evolution_params);
        }
    }

    /**
     * Handle cluster operation
     */
    async handleClusterOperation(message) {
        const { operation, cluster_id, params } = message.payload;
        
        console.log(`[DistributedBrainOS] Cluster operation: ${operation} on ${cluster_id}`);
        
        switch (operation) {
            case 'rebalance':
                await this.rebalanceCluster(cluster_id, params);
                break;
            case 'scale':
                await this.scaleCluster(cluster_id, params);
                break;
            case 'migrate':
                await this.migrateWorkload(cluster_id, params);
                break;
        }
    }

    /**
     * Submit distributed task
     */
    async submitDistributedTask(task, executionNode = 'any', coordinationType = 'independent') {
        const distributedTask = {
            ...task,
            distributed_metadata: {
                submitted_by: this.nodeId,
                execution_node: executionNode,
                coordination_type: coordinationType,
                submitted_at: new Date()
            }
        };

        await this.sendDistributedEvent('distributed_task', {
            task: distributedTask,
            execution_node: executionNode,
            coordination_type: coordinationType
        });

        return distributedTask.task_id;
    }

    /**
     * Execute evolution on this node
     */
    async executeEvolution(evolutionType, params) {
        console.log(`[DistributedBrainOS] Executing evolution: ${evolutionType}`);
        
        switch (evolutionType) {
            case 'dna_mutation':
                await this.mutateDNA(params);
                break;
            case 'model_evolution':
                await this.evolveModels(params);
                break;
            case 'architecture_evolution':
                await this.evolveArchitecture(params);
                break;
        }
    }

    /**
     * Mutate DNA
     */
    async mutateDNA(params) {
        const currentDNA = this.dnaManager.getNodeDNA(this.nodeId);
        const mutatedDNA = this.dnaManager.mutateDNA(currentDNA, this.distributedState);
        
        // Update local DNA
        this.distributedState.dna_id = mutatedDNA.dna_id;
        this.distributedState.generation += 1;
        
        // Broadcast DNA update
        await this.sendDistributedEvent('dna_mutated', {
            node_id: this.nodeId,
            old_dna_id: currentDNA.dna_id,
            new_dna_id: mutatedDNA.dna_id,
            generation: this.distributedState.generation,
            mutations: mutatedDNA.mutations
        });
    }

    /**
     * Check evolution triggers
     */
    async checkEvolutionTriggers() {
        const systemStatus = this.baseBrainOS.getSystemStatus();
        const health = systemStatus.system_health;
        
        // Trigger evolution if health is low
        if (health < 70) {
            console.log(`[DistributedBrainOS] Health degraded (${health}%), triggering evolution`);
            
            await this.submitDistributedTask({
                type: 'meta_planning',
                origin: 'distributed_brain_os',
                payload: {
                    evolution_trigger: 'health_degradation',
                    current_health: health,
                    target_health: 85
                }
            }, 'cpu0', 'distributed_execution');
        }
    }

    /**
     * Update distributed health
     */
    updateDistributedHealth() {
        const systemStatus = this.baseBrainOS.getSystemStatus();
        const syncStats = this.syncManager.getSyncStats();
        const nodeOverview = this.nodeRegistry.getSystemOverview();
        
        const distributedHealth = {
            node_health: systemStatus.system_health,
            sync_health: syncStats.active_peers > 0 ? 100 : 50,
            network_health: nodeOverview.active_nodes > 1 ? 100 : 70,
            overall_health: 0
        };
        
        // Calculate overall health
        distributedHealth.overall_health = (
            distributedHealth.node_health * 0.5 +
            distributedHealth.sync_health * 0.3 +
            distributedHealth.network_health * 0.2
        );
        
        console.log(`[DistributedBrainOS] Distributed health: ${distributedHealth.overall_health.toFixed(1)}%`);
    }

    /**
     * Send distributed event
     */
    async sendDistributedEvent(eventType, data) {
        await this.syncManager.broadcastEvent(eventType, {
            source_node: this.nodeId,
            generation: this.distributedState.generation,
            dna_id: this.distributedState.dna_id,
            timestamp: new Date(),
            data: data
        });
    }

    /**
     * Get distributed system status
     */
    getDistributedSystemStatus() {
        const baseStatus = this.baseBrainOS.getSystemStatus();
        const syncStats = this.syncManager.getSyncStats();
        const nodeOverview = this.nodeRegistry.getSystemOverview();
        const lineageTree = this.nodeRegistry.getLineageTree();
        
        return {
            ...baseStatus,
            distributed: {
                node_id: this.nodeId,
                is_master: this.isMasterNode,
                generation: this.distributedState.generation,
                dna_id: this.distributedState.dna_id,
                cluster_id: this.distributedState.cluster_id,
                lineage_id: this.distributedState.lineage_id,
                sync_stats: syncStats,
                network_overview: nodeOverview,
                lineage_tree_size: lineageTree.length,
                uptime: Date.now() - this.startTime
            }
        };
    }

    /**
     * Get local capabilities
     */
    getLocalCapabilities() {
        return [
            'distributed_task_execution',
            'dna_inheritance',
            'lineage_tracking',
            'sync_management',
            'evolution_support',
            'cluster_participation'
        ];
    }

    /**
     * Get local resources
     */
    getLocalResources() {
        return {
            cpu_cores: navigator.hardwareConcurrency || 4,
            memory_mb: 4096,
            storage_gb: 100,
            network_bandwidth_mbps: 1000,
            gpu_available: false
        };
    }

    /**
     * Get local endpoint
     */
    getLocalEndpoint() {
        return `${window.location.protocol}//${window.location.host}`;
    }

    /**
     * Shutdown distributed system
     */
    async shutdown() {
        console.log('🛑 Shutting down Distributed Brain OS...');
        
        try {
            // Send shutdown event
            await this.sendDistributedEvent('distributed_node_shutdown', {
                node_id: this.nodeId,
                uptime: Date.now() - this.startTime
            });
            
            // Shutdown components in reverse order
            if (this.nodeRegistry) {
                await this.nodeRegistry.shutdown();
            }
            
            if (this.syncManager) {
                await this.syncManager.shutdown();
            }
            
            if (this.baseBrainOS) {
                await this.baseBrainOS.shutdown();
            }
            
            console.log('✅ Distributed Brain OS shutdown complete');
            
        } catch (error) {
            console.error('❌ Error during distributed shutdown:', error);
        }
    }

    /**
     * Export distributed state
     */
    exportState() {
        return {
            node_id: this.nodeId,
            is_master_node: this.isMasterNode,
            distributed_state: this.distributedState,
            base_brain_os: this.baseBrainOS?.exportState(),
            dna_manager: this.dnaManager?.exportState(),
            sync_manager: this.syncManager?.exportState(),
            node_registry: this.nodeRegistry?.exportState(),
            start_time: this.startTime,
            timestamp: new Date()
        };
    }
}

// Export singleton factory
let distributedBrainOSInstance = null;

export function getDistributedBrainOS(nodeId, isMasterNode = false) {
    if (!distributedBrainOSInstance) {
        distributedBrainOSInstance = new DistributedBrainOS(nodeId, isMasterNode);
    }
    return distributedBrainOSInstance;
}

// Export class for testing
export { DistributedBrainOS };

// Auto-initialize if running as main module
if (typeof window !== 'undefined' && window.location) {
    // Browser environment - auto-initialize with random node ID
    document.addEventListener('DOMContentLoaded', async () => {
        const nodeId = `node_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        const isMaster = window.location.search.includes('master=true');
        
        const distributedBrainOS = getDistributedBrainOS(nodeId, isMaster);
        
        try {
            await distributedBrainOS.initialize();
            window.distributedBrainOS = distributedBrainOS;
        } catch (error) {
            console.error('Failed to initialize Distributed Brain OS:', error);
        }
    });
} else if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = { DistributedBrainOS, getDistributedBrainOS };
}
