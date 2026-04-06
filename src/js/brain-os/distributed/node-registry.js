/**
 * Brain OS Distributed - Node Registry
 * Manages server node registration and lineage tracking
 */

class NodeRegistry {
    constructor(syncManager) {
        this.syncManager = syncManager;
        this.nodes = new Map(); // node_id -> node_info
        this.lineageTree = new Map(); // lineage_id -> lineage_info
        this.clusters = new Map(); // cluster_id -> cluster_info
        this.localNodeId = null;
        this.isMasterNode = false;
        
        this.initialized = false;
        this.heartbeatInterval = null;
        this.discoveryInterval = null;
    }

    /**
     * Initialize Node Registry
     */
    async initialize(nodeId, isMaster = false) {
        console.log(`[NodeRegistry] Initializing node registry for: ${nodeId}`);
        
        this.localNodeId = nodeId;
        this.isMasterNode = isMaster;
        
        // Register self
        await this.registerSelf();
        
        // Setup message handlers
        this.setupMessageHandlers();
        
        // Start heartbeat if not master
        if (!this.isMasterNode) {
            this.startHeartbeat();
        }
        
        // Start discovery
        this.startDiscovery();
        
        this.initialized = true;
        console.log(`[NodeRegistry] Node registry initialized (Master: ${this.isMasterNode})`);
    }

    /**
     * Register this node
     */
    async registerSelf() {
        const nodeInfo = {
            node_id: this.localNodeId,
            status: 'active',
            registered_at: new Date(),
            last_heartbeat: new Date(),
            capabilities: this.getLocalCapabilities(),
            resources: this.getLocalResources(),
            generation: 0, // Will be updated by DNA Manager
            dna_id: null, // Will be set by DNA Manager
            parent_node_id: null,
            cluster_id: 'default',
            endpoint: this.getLocalEndpoint(),
            metadata: {
                version: '1.0.0',
                hostname: this.getLocalHostname(),
                platform: this.getLocalPlatform()
            }
        };

        this.nodes.set(this.localNodeId, nodeInfo);
        
        console.log(`[NodeRegistry] Self registered: ${this.localNodeId}`);
    }

    /**
     * Register a new node
     */
    async registerNode(nodeInfo) {
        const nodeId = nodeInfo.node_id;
        
        // Validate node info
        this.validateNodeInfo(nodeInfo);
        
        // Set registration timestamp
        nodeInfo.registered_at = new Date();
        nodeInfo.last_heartbeat = new Date();
        nodeInfo.status = 'active';
        
        // Store node
        this.nodes.set(nodeId, nodeInfo);
        
        // Create lineage entry
        await this.createLineageEntry(nodeId, nodeInfo);
        
        // Add to cluster
        await this.addNodeToCluster(nodeId, nodeInfo.cluster_id || 'default');
        
        // Broadcast node registration
        await this.broadcastNodeRegistration(nodeInfo);
        
        console.log(`[NodeRegistry] Node registered: ${nodeId} (Gen ${nodeInfo.generation})`);
        
        return nodeInfo;
    }

    /**
     * Create lineage entry for node
     */
    async createLineageEntry(nodeId, nodeInfo) {
        const lineageId = this.generateLineageId(nodeId);
        
        const lineage = {
            lineage_id: lineageId,
            node_id: nodeId,
            parent_node_id: nodeInfo.parent_node_id,
            generation: nodeInfo.generation || 0,
            dna_id: nodeInfo.dna_id,
            created_at: new Date(),
            children: new Set(),
            mutations: nodeInfo.mutations || [],
            performance_metrics: {
                birth_fitness: 0,
                current_fitness: 0,
                evolution_count: 0
            }
        };

        this.lineageTree.set(lineageId, lineage);
        
        // Update parent's children
        if (nodeInfo.parent_node_id) {
            const parentLineage = this.findLineageByNodeId(nodeInfo.parent_node_id);
            if (parentLineage) {
                parentLineage.children.add(lineageId);
            }
        }
        
        return lineage;
    }

    /**
     * Add node to cluster
     */
    async addNodeToCluster(nodeId, clusterId) {
        if (!this.clusters.has(clusterId)) {
            this.clusters.set(clusterId, {
                cluster_id: clusterId,
                created_at: new Date(),
                nodes: new Set(),
                leader_node: null,
                status: 'active'
            });
        }
        
        const cluster = this.clusters.get(clusterId);
        cluster.nodes.add(nodeId);
        
        // Set leader if first node
        if (cluster.nodes.size === 1) {
            cluster.leader_node = nodeId;
        }
        
        // Update node's cluster
        const node = this.nodes.get(nodeId);
        if (node) {
            node.cluster_id = clusterId;
        }
    }

    /**
     * Setup message handlers
     */
    setupMessageHandlers() {
        // Handle node registration requests
        this.syncManager.messageBus.subscribe('node_registry', 'register_node', async (message) => {
            await this.handleRegisterNode(message);
        });

        // Handle node updates
        this.syncManager.messageBus.subscribe('node_registry', 'update_node', async (message) => {
            await this.handleUpdateNode(message);
        });

        // Handle node unregistration
        this.syncManager.messageBus.subscribe('node_registry', 'unregister_node', async (message) => {
            await this.handleUnregisterNode(message);
        });

        // Handle cluster operations
        this.syncManager.messageBus.subscribe('node_registry', 'cluster_operation', async (message) => {
            await this.handleClusterOperation(message);
        });

        // Handle lineage queries
        this.syncManager.messageBus.subscribe('node_registry', 'lineage_query', async (message) => {
            await this.handleLineageQuery(message);
        });
    }

    /**
     * Handle node registration request
     */
    async handleRegisterNode(message) {
        const nodeInfo = message.payload;
        
        try {
            const registeredNode = await this.registerNode(nodeInfo);
            
            // Send acknowledgment
            await this.syncManager.messageBus.sendMessage({
                message_id: this.generateMessageId(),
                type: 'node_registered',
                from_agent: 'node_registry',
                to_agent: message.from_agent,
                timestamp: new Date(),
                payload: {
                    success: true,
                    node_info: registeredNode
                }
            });
            
        } catch (error) {
            console.error('[NodeRegistry] Error registering node:', error);
            
            // Send error response
            await this.syncManager.messageBus.sendMessage({
                message_id: this.generateMessageId(),
                type: 'node_registered',
                from_agent: 'node_registry',
                to_agent: message.from_agent,
                timestamp: new Date(),
                payload: {
                    success: false,
                    error: error.message
                }
            });
        }
    }

    /**
     * Handle node update
     */
    async handleUpdateNode(message) {
        const { node_id, updates } = message.payload;
        
        const node = this.nodes.get(node_id);
        if (!node) {
            throw new Error(`Node not found: ${node_id}`);
        }
        
        // Apply updates
        Object.assign(node, updates);
        node.last_updated = new Date();
        
        // Broadcast update
        await this.broadcastNodeUpdate(node_id, updates);
    }

    /**
     * Handle node unregistration
     */
    async handleUnregisterNode(message) {
        const nodeId = message.payload.node_id;
        
        const node = this.nodes.get(nodeId);
        if (!node) {
            throw new Error(`Node not found: ${nodeId}`);
        }
        
        // Mark as inactive
        node.status = 'inactive';
        node.unregistered_at = new Date();
        
        // Remove from cluster
        if (node.cluster_id) {
            const cluster = this.clusters.get(node.cluster_id);
            if (cluster) {
                cluster.nodes.delete(nodeId);
                
                // Elect new leader if necessary
                if (cluster.leader_node === nodeId && cluster.nodes.size > 0) {
                    cluster.leader_node = Array.from(cluster.nodes)[0];
                }
            }
        }
        
        console.log(`[NodeRegistry] Node unregistered: ${nodeId}`);
    }

    /**
     * Handle cluster operation
     */
    async handleClusterOperation(message) {
        const { operation, cluster_id, data } = message.payload;
        
        switch (operation) {
            case 'create':
                await this.createCluster(cluster_id, data);
                break;
            case 'delete':
                await this.deleteCluster(cluster_id);
                break;
            case 'join':
                await this.joinCluster(data.node_id, cluster_id);
                break;
            case 'leave':
                await this.leaveCluster(data.node_id, cluster_id);
                break;
            case 'elect_leader':
                await this.electClusterLeader(cluster_id);
                break;
        }
    }

    /**
     * Handle lineage query
     */
    async handleLineageQuery(message) {
        const { query_type, node_id, lineage_id } = message.payload;
        
        let result;
        
        switch (query_type) {
            case 'get_lineage':
                result = this.getLineage(node_id, lineage_id);
                break;
            case 'get_ancestors':
                result = this.getAncestors(node_id);
                break;
            case 'get_descendants':
                result = this.getDescendants(node_id);
                break;
            case 'get_siblings':
                result = this.getSiblings(node_id);
                break;
            default:
                throw new Error(`Unknown lineage query: ${query_type}`);
        }
        
        // Send response
        await this.syncManager.messageBus.sendMessage({
            message_id: this.generateMessageId(),
            type: 'lineage_response',
            from_agent: 'node_registry',
            to_agent: message.from_agent,
            timestamp: new Date(),
            payload: {
                query_type,
                result
            }
        });
    }

    /**
     * Start heartbeat for this node
     */
    startHeartbeat() {
        this.heartbeatInterval = setInterval(async () => {
            await this.sendHeartbeat();
        }, 10000); // Every 10 seconds
    }

    /**
     * Send heartbeat to master node
     */
    async sendHeartbeat() {
        const node = this.nodes.get(this.localNodeId);
        if (!node) return;
        
        node.last_heartbeat = new Date();
        
        const heartbeat = {
            node_id: this.localNodeId,
            timestamp: new Date(),
            status: node.status,
            resources: node.resources,
            metrics: {
                uptime: Date.now() - node.registered_at.getTime(),
                task_count: 0, // Would get from task scheduler
                error_count: 0
            }
        };
        
        await this.syncManager.broadcastEvent('node_heartbeat', heartbeat);
    }

    /**
     * Start node discovery
     */
    startDiscovery() {
        this.discoveryInterval = setInterval(async () => {
            await this.discoverNodes();
        }, 30000); // Every 30 seconds
    }

    /**
     * Discover other nodes
     */
    async discoverNodes() {
        // Send discovery broadcast
        await this.syncManager.broadcastEvent('node_discovery', {
            requesting_node: this.localNodeId,
            timestamp: new Date(),
            capabilities: this.getLocalCapabilities()
        });
    }

    /**
     * Broadcast node registration
     */
    async broadcastNodeRegistration(nodeInfo) {
        await this.syncManager.broadcastEvent('node_registered', {
            node_info: nodeInfo,
            timestamp: new Date()
        });
    }

    /**
     * Broadcast node update
     */
    async broadcastNodeUpdate(nodeId, updates) {
        await this.syncManager.broadcastEvent('node_updated', {
            node_id: nodeId,
            updates: updates,
            timestamp: new Date()
        });
    }

    /**
     * Get lineage for a node
     */
    getLineage(nodeId, lineageId = null) {
        if (lineageId) {
            return this.lineageTree.get(lineageId);
        }
        
        return this.findLineageByNodeId(nodeId);
    }

    /**
     * Find lineage by node ID
     */
    findLineageByNodeId(nodeId) {
        for (const lineage of this.lineageTree.values()) {
            if (lineage.node_id === nodeId) {
                return lineage;
            }
        }
        return null;
    }

    /**
     * Get ancestors of a node
     */
    getAncestors(nodeId) {
        const lineage = this.findLineageByNodeId(nodeId);
        if (!lineage) return [];
        
        const ancestors = [];
        let currentLineage = lineage;
        
        while (currentLineage.parent_node_id) {
            const parentLineage = this.findLineageByNodeId(currentLineage.parent_node_id);
            if (!parentLineage) break;
            
            ancestors.push(parentLineage);
            currentLineage = parentLineage;
        }
        
        return ancestors;
    }

    /**
     * Get descendants of a node
     */
    getDescendants(nodeId) {
        const lineage = this.findLineageByNodeId(nodeId);
        if (!lineage) return [];
        
        const descendants = [];
        const queue = [lineage.lineage_id];
        
        while (queue.length > 0) {
            const currentLineageId = queue.shift();
            const currentLineage = this.lineageTree.get(currentLineageId);
            
            if (currentLineage && currentLineage.lineage_id !== lineage.lineage_id) {
                descendants.push(currentLineage);
                
                // Add children to queue
                currentLineage.children.forEach(childId => {
                    queue.push(childId);
                });
            }
        }
        
        return descendants;
    }

    /**
     * Get siblings of a node
     */
    getSiblings(nodeId) {
        const lineage = this.findLineageByNodeId(nodeId);
        if (!lineage || !lineage.parent_node_id) return [];
        
        const parentLineage = this.findLineageByNodeId(lineage.parent_node_id);
        if (!parentLineage) return [];
        
        return Array.from(parentLineage.children)
            .map(childId => this.lineageTree.get(childId))
            .filter(child => child && child.node_id !== nodeId);
    }

    /**
     * Create cluster
     */
    async createCluster(clusterId, config = {}) {
        const cluster = {
            cluster_id: clusterId,
            created_at: new Date(),
            nodes: new Set(),
            leader_node: null,
            status: 'active',
            config: {
                max_nodes: 10,
                auto_elect_leader: true,
                ...config
            }
        };
        
        this.clusters.set(clusterId, cluster);
        
        await this.syncManager.broadcastEvent('cluster_created', {
            cluster_id: clusterId,
            config: cluster.config
        });
    }

    /**
     * Get node information
     */
    getNode(nodeId) {
        return this.nodes.get(nodeId);
    }

    /**
     * Get all nodes
     */
    getAllNodes() {
        return Array.from(this.nodes.values());
    }

    /**
     * Get active nodes
     */
    getActiveNodes() {
        return Array.from(this.nodes.values()).filter(node => node.status === 'active');
    }

    /**
     * Get cluster information
     */
    getCluster(clusterId) {
        return this.clusters.get(clusterId);
    }

    /**
     * Get all clusters
     */
    getAllClusters() {
        return Array.from(this.clusters.values());
    }

    /**
     * Get lineage tree
     */
    getLineageTree() {
        return Array.from(this.lineageTree.values());
    }

    /**
     * Get system overview
     */
    getSystemOverview() {
        const activeNodes = this.getActiveNodes();
        const clusters = this.getAllClusters();
        
        return {
            total_nodes: this.nodes.size,
            active_nodes: activeNodes.length,
            total_clusters: this.clusters.size,
            local_node_id: this.localNodeId,
            is_master: this.isMasterNode,
            generations: this.getGenerationStats(),
            clusters: clusters.map(c => ({
                cluster_id: c.cluster_id,
                node_count: c.nodes.size,
                leader: c.leader_node
            }))
        };
    }

    /**
     * Get generation statistics
     */
    getGenerationStats() {
        const stats = {};
        
        for (const node of this.nodes.values()) {
            const gen = node.generation || 0;
            stats[gen] = (stats[gen] || 0) + 1;
        }
        
        return stats;
    }

    /**
     * Validate node information
     */
    validateNodeInfo(nodeInfo) {
        if (!nodeInfo.node_id || typeof nodeInfo.node_id !== 'string') {
            throw new Error('Invalid node_id');
        }
        if (!nodeInfo.capabilities || !Array.isArray(nodeInfo.capabilities)) {
            throw new Error('Invalid capabilities');
        }
    }

    /**
     * Get local capabilities
     */
    getLocalCapabilities() {
        return [
            'task_processing',
            'dna_inheritance',
            'sync',
            'state_machine',
            'evolution'
        ];
    }

    /**
     * Get local resources
     */
    getLocalResources() {
        return {
            cpu_cores: navigator.hardwareConcurrency || 4,
            memory_mb: 4096, // Placeholder
            storage_gb: 100, // Placeholder
            network_bandwidth_mbps: 1000 // Placeholder
        };
    }

    /**
     * Get local endpoint
     */
    getLocalEndpoint() {
        return `${window.location.protocol}//${window.location.host}`;
    }

    /**
     * Get local hostname
     */
    getLocalHostname() {
        return window.location.hostname || 'localhost';
    }

    /**
     * Get local platform
     */
    getLocalPlatform() {
        return navigator.platform || 'unknown';
    }

    /**
     * Generate lineage ID
     */
    generateLineageId(nodeId) {
        return `lineage_${nodeId}_${Date.now()}`;
    }

    /**
     * Generate message ID
     */
    generateMessageId() {
        return `msg_${this.localNodeId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Export registry state
     */
    exportState() {
        return {
            local_node_id: this.localNodeId,
            is_master: this.isMasterNode,
            nodes: Array.from(this.nodes.entries()),
            lineage_tree: Array.from(this.lineageTree.entries()),
            clusters: Array.from(this.clusters.entries()),
            timestamp: new Date()
        };
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NodeRegistry;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.NodeRegistry = NodeRegistry;
}
