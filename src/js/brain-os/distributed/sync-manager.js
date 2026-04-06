/**
 * Brain OS Distributed - Sync Manager
 * Manages lightweight logic synchronization between server nodes
 */

class SyncManager {
    constructor(nodeId, messageBus) {
        this.nodeId = nodeId;
        this.messageBus = messageBus;
        this.peers = new Map(); // peer_id -> peer_info
        this.syncQueue = [];
        this.syncHistory = [];
        this.lastSyncTimestamp = new Date();
        
        // Sync configuration
        this.config = {
            sync_frequency_ms: 60000,        // 1 minute
            max_sync_batch_size: 100,
            compression_enabled: true,
            encryption_required: false,
            retry_attempts: 3,
            sync_timeout_ms: 30000
        };
        
        // Sync state
        this.syncState = {
            is_syncing: false,
            last_successful_sync: null,
            failed_syncs: 0,
            total_syncs: 0
        };
        
        this.initialized = false;
        this.syncInterval = null;
    }

    /**
     * Initialize Sync Manager
     */
    async initialize() {
        console.log(`[SyncManager] Initializing sync for node: ${this.nodeId}`);
        
        // Setup message handlers
        this.setupMessageHandlers();
        
        // Start periodic sync
        this.startPeriodicSync();
        
        this.initialized = true;
        console.log('[SyncManager] Sync manager initialized');
    }

    /**
     * Setup message handlers for sync communication
     */
    setupMessageHandlers() {
        // Handle sync requests
        this.messageBus.subscribe('sync_manager', 'sync_request', async (message) => {
            await this.handleSyncRequest(message);
        });

        // Handle sync responses
        this.messageBus.subscribe('sync_manager', 'sync_response', async (message) => {
            await this.handleSyncResponse(message);
        });

        // Handle broadcast events
        this.messageBus.subscribe('sync_manager', 'sync_broadcast', async (message) => {
            await this.handleSyncBroadcast(message);
        });

        // Handle peer discovery
        this.messageBus.subscribe('sync_manager', 'peer_discovery', async (message) => {
            await this.handlePeerDiscovery(message);
        });

        // Handle heartbeat
        this.messageBus.subscribe('sync_manager', 'peer_heartbeat', async (message) => {
            await this.handlePeerHeartbeat(message);
        });
    }

    /**
     * Register a peer node
     */
    async registerPeer(peerId, peerInfo) {
        const peer = {
            peer_id: peerId,
            node_id: peerInfo.node_id,
            generation: peerInfo.generation || 1,
            dna_id: peerInfo.dna_id,
            endpoint: peerInfo.endpoint,
            status: 'active',
            last_seen: new Date(),
            sync_history: [],
            capabilities: peerInfo.capabilities || []
        };

        this.peers.set(peerId, peer);
        
        console.log(`[SyncManager] Peer registered: ${peerId} (Gen ${peer.generation})`);
        
        // Send discovery acknowledgment
        await this.messageBus.sendMessage({
            message_id: this.generateMessageId(),
            type: 'peer_ack',
            from_agent: 'sync_manager',
            to_agent: peerId,
            timestamp: new Date(),
            payload: {
                node_id: this.nodeId,
                peer_id: this.nodeId
            }
        });
    }

    /**
     * Start periodic synchronization
     */
    startPeriodicSync() {
        this.syncInterval = setInterval(async () => {
            await this.performPeriodicSync();
        }, this.config.sync_frequency_ms);
    }

    /**
     * Perform periodic sync with all peers
     */
    async performPeriodicSync() {
        if (this.syncState.is_syncing) {
            console.log('[SyncManager] Sync already in progress, skipping');
            return;
        }

        this.syncState.is_syncing = true;
        console.log(`[SyncManager] Starting periodic sync with ${this.peers.size} peers`);

        try {
            const syncPromises = [];
            
            for (const [peerId, peer] of this.peers) {
                if (peer.status === 'active') {
                    syncPromises.push(this.syncWithPeer(peerId));
                }
            }

            const results = await Promise.allSettled(syncPromises);
            
            // Process results
            let successful = 0;
            let failed = 0;
            
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    successful++;
                } else {
                    failed++;
                    console.error(`[SyncManager] Sync failed for peer ${index}:`, result.reason);
                }
            });

            this.syncState.total_syncs++;
            this.syncState.last_successful_sync = new Date();
            
            console.log(`[SyncManager] Periodic sync completed: ${successful} successful, ${failed} failed`);
            
        } catch (error) {
            console.error('[SyncManager] Periodic sync error:', error);
            this.syncState.failed_syncs++;
        } finally {
            this.syncState.is_syncing = false;
            this.lastSyncTimestamp = new Date();
        }
    }

    /**
     * Sync with a specific peer
     */
    async syncWithPeer(peerId) {
        const peer = this.peers.get(peerId);
        if (!peer) {
            throw new Error(`Peer not found: ${peerId}`);
        }

        console.log(`[SyncManager] Syncing with peer: ${peerId}`);

        // Create sync request
        const syncRequest = {
            sync_id: this.generateSyncId(),
            requester_node: this.nodeId,
            requester_generation: this.getLocalGeneration(),
            last_sync_timestamp: peer.last_seen,
            sync_type: 'full' // Could be 'incremental', 'full', 'dna_only'
        };

        // Send sync request
        const response = await this.messageBus.sendMessage({
            message_id: this.generateMessageId(),
            type: 'sync_request',
            from_agent: 'sync_manager',
            to_agent: peerId,
            timestamp: new Date(),
            payload: syncRequest
        });

        // Wait for response with timeout
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Sync timeout')), this.config.sync_timeout_ms);
        });

        const result = await Promise.race([response, timeoutPromise]);
        
        // Update peer sync history
        peer.sync_history.push({
            sync_id: syncRequest.sync_id,
            timestamp: new Date(),
            success: true,
            items_synced: result.payload?.items_count || 0
        });

        peer.last_seen = new Date();

        return result;
    }

    /**
     * Handle sync request from peer
     */
    async handleSyncRequest(message) {
        const { sync_id, requester_node, last_sync_timestamp, sync_type } = message.payload;
        
        console.log(`[SyncManager] Handling sync request from ${requester_node}`);

        try {
            // Prepare sync data based on type
            let syncData;
            
            switch (sync_type) {
                case 'dna_only':
                    syncData = await this.prepareDNASyncData(last_sync_timestamp);
                    break;
                case 'incremental':
                    syncData = await this.prepareIncrementalSyncData(last_sync_timestamp);
                    break;
                case 'full':
                default:
                    syncData = await this.prepareFullSyncData();
                    break;
            }

            // Send response
            await this.messageBus.sendMessage({
                message_id: this.generateMessageId(),
                type: 'sync_response',
                from_agent: 'sync_manager',
                to_agent: message.from_agent,
                timestamp: new Date(),
                payload: {
                    sync_id: sync_id,
                    responder_node: this.nodeId,
                    sync_data: syncData,
                    items_count: Object.keys(syncData).length,
                    timestamp: new Date()
                }
            });

        } catch (error) {
            console.error(`[SyncManager] Error handling sync request:`, error);
            
            // Send error response
            await this.messageBus.sendMessage({
                message_id: this.generateMessageId(),
                type: 'sync_response',
                from_agent: 'sync_manager',
                to_agent: message.from_agent,
                timestamp: new Date(),
                payload: {
                    sync_id: sync_id,
                    error: error.message
                }
            });
        }
    }

    /**
     * Handle sync response from peer
     */
    async handleSyncResponse(message) {
        const { sync_id, sync_data, error } = message.payload;
        
        if (error) {
            console.error(`[SyncManager] Sync response error for ${sync_id}:`, error);
            return;
        }

        console.log(`[SyncManager] Received sync response for ${sync_id}`);
        
        // Process sync data
        await this.processSyncData(sync_data);
        
        // Update sync history
        this.syncHistory.push({
            sync_id: sync_id,
            timestamp: new Date(),
            peer: message.from_agent,
            items_processed: Object.keys(sync_data).length,
            success: true
        });
    }

    /**
     * Handle sync broadcast (one-way sync)
     */
    async handleSyncBroadcast(message) {
        const { broadcast_type, data } = message.payload;
        
        console.log(`[SyncManager] Received broadcast: ${broadcast_type}`);
        
        switch (broadcast_type) {
            case 'dna_update':
                await this.processDNAUpdate(data);
                break;
            case 'ruleset_update':
                await this.processRulesetUpdate(data);
                break;
            case 'node_registered':
                await this.processNodeRegistration(data);
                break;
            default:
                console.log(`[SyncManager] Unknown broadcast type: ${broadcast_type}`);
        }
    }

    /**
     * Handle peer discovery
     */
    async handlePeerDiscovery(message) {
        const { node_id, peer_info } = message.payload;
        
        if (node_id !== this.nodeId) {
            await this.registerPeer(node_id, peer_info);
        }
    }

    /**
     * Handle peer heartbeat
     */
    async handlePeerHeartbeat(message) {
        const { node_id, timestamp, status } = message.payload;
        
        const peer = this.peers.get(node_id);
        if (peer) {
            peer.last_seen = new Date(timestamp);
            peer.status = status || 'active';
        }
    }

    /**
     * Prepare DNA-only sync data
     */
    async prepareDNASyncData(lastSyncTimestamp) {
        // This would interface with DNA Manager
        // For now, return placeholder
        return {
            dna_updates: {
                timestamp: new Date(),
                updates: []
            }
        };
    }

    /**
     * Prepare incremental sync data
     */
    async prepareIncrementalSyncData(lastSyncTimestamp) {
        // Get changes since last sync
        const changes = this.getChangesSince(lastSyncTimestamp);
        
        return {
            incremental_updates: changes,
            timestamp: new Date()
        };
    }

    /**
     * Prepare full sync data
     */
    async prepareFullSyncData() {
        // This would gather all relevant sync data
        // For now, return basic node info
        return {
            node_info: {
                node_id: this.nodeId,
                generation: this.getLocalGeneration(),
                status: 'active',
                capabilities: ['sync', 'dna_inheritance', 'state_sync']
            },
            timestamp: new Date()
        };
    }

    /**
     * Process received sync data
     */
    async processSyncData(syncData) {
        // Process different types of sync data
        for (const [key, value] of Object.entries(syncData)) {
            switch (key) {
                case 'dna_updates':
                    await this.processDNAUpdate(value);
                    break;
                case 'incremental_updates':
                    await this.processIncrementalUpdates(value);
                    break;
                case 'node_info':
                    await this.processNodeInfo(value);
                    break;
                default:
                    console.log(`[SyncManager] Unknown sync data type: ${key}`);
            }
        }
    }

    /**
     * Process DNA update
     */
    async processDNAUpdate(dnaUpdate) {
        console.log('[SyncManager] Processing DNA update');
        // This would interface with DNA Manager
    }

    /**
     * Process incremental updates
     */
    async processIncrementalUpdates(updates) {
        console.log(`[SyncManager] Processing ${updates.length} incremental updates`);
        // Process each update
    }

    /**
     * Process node info
     */
    async processNodeInfo(nodeInfo) {
        console.log(`[SyncManager] Processing node info for ${nodeInfo.node_id}`);
        // Update local node registry
    }

    /**
     * Broadcast event to all peers
     */
    async broadcastEvent(eventType, data) {
        const message = {
            message_id: this.generateMessageId(),
            type: 'sync_broadcast',
            from_agent: 'sync_manager',
            to_agent: null, // Broadcast
            timestamp: new Date(),
            payload: {
                broadcast_type: eventType,
                data: data,
                source_node: this.nodeId
            }
        };

        await this.messageBus.sendBroadcastMessage(message, 'sync_events');
    }

    /**
     * Send heartbeat to all peers
     */
    async sendHeartbeat() {
        const heartbeat = {
            node_id: this.nodeId,
            timestamp: new Date(),
            status: 'active',
            metrics: {
                sync_state: this.syncState,
                peer_count: this.peers.size
            }
        };

        await this.broadcastEvent('peer_heartbeat', heartbeat);
    }

    /**
     * Get local generation (would interface with DNA Manager)
     */
    getLocalGeneration() {
        // Placeholder - would get from DNA Manager
        return 1;
    }

    /**
     * Get changes since timestamp
     */
    getChangesSince(timestamp) {
        // Placeholder - would track local changes
        return [];
    }

    /**
     * Generate unique sync ID
     */
    generateSyncId() {
        return `sync_${this.nodeId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Generate unique message ID
     */
    generateMessageId() {
        return `msg_${this.nodeId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get sync statistics
     */
    getSyncStats() {
        return {
            ...this.syncState,
            peer_count: this.peers.size,
            active_peers: Array.from(this.peers.values()).filter(p => p.status === 'active').length,
            last_sync_timestamp: this.lastSyncTimestamp,
            sync_history_size: this.syncHistory.length
        };
    }

    /**
     * Get peer information
     */
    getPeers() {
        return Array.from(this.peers.values()).map(peer => ({
            peer_id: peer.peer_id,
            node_id: peer.node_id,
            generation: peer.generation,
            status: peer.status,
            last_seen: peer.last_seen,
            sync_count: peer.sync_history.length
        }));
    }

    /**
     * Shutdown sync manager
     */
    async shutdown() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
        
        // Send shutdown notification to peers
        await this.broadcastEvent('node_shutdown', {
            node_id: this.nodeId,
            timestamp: new Date()
        });
        
        console.log('[SyncManager] Sync manager shutdown complete');
    }

    /**
     * Export sync manager state
     */
    exportState() {
        return {
            node_id: this.nodeId,
            peers: Array.from(this.peers.entries()),
            sync_history: this.syncHistory,
            sync_state: this.syncState,
            config: this.config,
            timestamp: new Date()
        };
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SyncManager;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.SyncManager = SyncManager;
}
