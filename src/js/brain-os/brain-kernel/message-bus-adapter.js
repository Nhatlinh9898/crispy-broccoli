/**
 * Brain OS - Message Bus Adapter
 * Standardized communication layer for all neural agents
 */

class MessageBusAdapter {
    constructor() {
        this.messageQueue = [];
        this.subscribers = new Map(); // topic -> Set of subscribers
        this.messageHistory = new Map(); // message_id -> message
        this.metrics = {
            messages_sent: 0,
            messages_received: 0,
            messages_failed: 0,
            avg_delivery_time: 0,
            queue_size: 0
        };
        this.initialized = false;
        this.maxHistorySize = 10000;
        this.deliveryTimeouts = new Map(); // message_id -> timeout
    }

    /**
     * Initialize the message bus
     */
    async initialize() {
        console.log('[MessageBus] Initializing...');
        
        // Start message processing loop
        this.startMessageProcessing();
        
        // Start cleanup loop for old messages
        this.startCleanupLoop();
        
        this.initialized = true;
        console.log('[MessageBus] Initialized and ready');
    }

    /**
     * Subscribe to messages
     */
    subscribe(agentId, topics, callback) {
        if (!Array.isArray(topics)) {
            topics = [topics];
        }

        topics.forEach(topic => {
            if (!this.subscribers.has(topic)) {
                this.subscribers.set(topic, new Map()); // agent_id -> callback
            }
            this.subscribers.get(topic).set(agentId, callback);
        });

        console.log(`[MessageBus] Agent ${agentId} subscribed to topics: ${topics.join(', ')}`);
    }

    /**
     * Unsubscribe from messages
     */
    unsubscribe(agentId, topics) {
        if (!Array.isArray(topics)) {
            topics = [topics];
        }

        topics.forEach(topic => {
            const topicSubscribers = this.subscribers.get(topic);
            if (topicSubscribers) {
                topicSubscribers.delete(agentId);
                if (topicSubscribers.size === 0) {
                    this.subscribers.delete(topic);
                }
            }
        });

        console.log(`[MessageBus] Agent ${agentId} unsubscribed from topics: ${topics.join(', ')}`);
    }

    /**
     * Send a message
     */
    async sendMessage(message) {
        try {
            // Validate message
            this.validateMessage(message);
            
            // Set timestamp if not provided
            if (!message.timestamp) {
                message.timestamp = new Date();
            }

            // Add to queue
            this.messageQueue.push(message);
            this.metrics.messages_sent++;
            this.metrics.queue_size = this.messageQueue.length;

            // Store in history
            this.messageHistory.set(message.message_id, message);

            // Set delivery timeout
            this.setDeliveryTimeout(message);

            console.log(`[MessageBus] Message queued: ${message.message_id} (${message.type}) from ${message.from_agent} to ${message.to_agent || 'broadcast'}`);
            
            return message.message_id;
            
        } catch (error) {
            this.metrics.messages_failed++;
            console.error('[MessageBus] Failed to send message:', error);
            throw error;
        }
    }

    /**
     * Send broadcast message
     */
    async sendBroadcastMessage(message, topic) {
        message.to_agent = null; // Indicates broadcast
        message.broadcast_topic = topic;
        return await this.sendMessage(message);
    }

    /**
     * Start message processing loop
     */
    startMessageProcessing() {
        setInterval(() => {
            this.processMessageQueue();
        }, 50); // Process every 50ms
    }

    /**
     * Process message queue
     */
    async processMessageQueue() {
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.metrics.queue_size = this.messageQueue.length;
            
            await this.deliverMessage(message);
        }
    }

    /**
     * Deliver message to recipients
     */
    async deliverMessage(message) {
        const startTime = Date.now();
        
        try {
            if (message.to_agent) {
                // Direct message to specific agent
                await this.deliverToAgent(message, message.to_agent);
            } else if (message.broadcast_topic) {
                // Broadcast message to topic subscribers
                await this.deliverToTopic(message, message.broadcast_topic);
            } else {
                // Default broadcast to all subscribers
                await this.deliverToAll(message);
            }

            // Clear delivery timeout
            this.clearDeliveryTimeout(message.message_id);
            
            // Update metrics
            const deliveryTime = Date.now() - startTime;
            this.updateDeliveryMetrics(deliveryTime);
            
        } catch (error) {
            this.metrics.messages_failed++;
            console.error(`[MessageBus] Failed to deliver message ${message.message_id}:`, error);
        }
    }

    /**
     * Deliver message to specific agent
     */
    async deliverToAgent(message, agentId) {
        // Find subscriber across all topics
        for (const [topic, subscribers] of this.subscribers) {
            const callback = subscribers.get(agentId);
            if (callback) {
                await this.executeCallback(callback, message, agentId);
                return; // Delivered, stop searching
            }
        }
        
        throw new Error(`Agent ${agentId} not found in subscribers`);
    }

    /**
     * Deliver message to topic subscribers
     */
    async deliverToTopic(message, topic) {
        const topicSubscribers = this.subscribers.get(topic);
        if (!topicSubscribers || topicSubscribers.size === 0) {
            console.warn(`[MessageBus] No subscribers for topic: ${topic}`);
            return;
        }

        const deliveryPromises = [];
        
        for (const [agentId, callback] of topicSubscribers) {
            // Skip sender if broadcasting to avoid self-messaging
            if (agentId !== message.from_agent) {
                deliveryPromises.push(this.executeCallback(callback, message, agentId));
            }
        }

        await Promise.allSettled(deliveryPromises);
    }

    /**
     * Deliver message to all subscribers
     */
    async deliverToAll(message) {
        const deliveryPromises = [];
        
        for (const [topic, subscribers] of this.subscribers) {
            for (const [agentId, callback] of subscribers) {
                // Skip sender
                if (agentId !== message.from_agent) {
                    deliveryPromises.push(this.executeCallback(callback, message, agentId));
                }
            }
        }

        await Promise.allSettled(deliveryPromises);
    }

    /**
     * Execute callback safely
     */
    async executeCallback(callback, message, agentId) {
        try {
            await callback(message);
            this.metrics.messages_received++;
        } catch (error) {
            console.error(`[MessageBus] Error in callback for agent ${agentId}:`, error);
            this.metrics.messages_failed++;
        }
    }

    /**
     * Set delivery timeout
     */
    setDeliveryTimeout(message) {
        const timeout = setTimeout(() => {
            console.warn(`[MessageBus] Message delivery timeout: ${message.message_id}`);
            this.metrics.messages_failed++;
        }, 30000); // 30 second timeout
        
        this.deliveryTimeouts.set(message.message_id, timeout);
    }

    /**
     * Clear delivery timeout
     */
    clearDeliveryTimeout(messageId) {
        const timeout = this.deliveryTimeouts.get(messageId);
        if (timeout) {
            clearTimeout(timeout);
            this.deliveryTimeouts.delete(messageId);
        }
    }

    /**
     * Update delivery metrics
     */
    updateDeliveryMetrics(deliveryTime) {
        const totalMessages = this.metrics.messages_received + this.metrics.messages_failed;
        if (totalMessages > 0) {
            this.metrics.avg_delivery_time = 
                (this.metrics.avg_delivery_time * (totalMessages - 1) + deliveryTime) / totalMessages;
        }
    }

    /**
     * Validate message structure
     */
    validateMessage(message) {
        if (!message.message_id || typeof message.message_id !== 'string') {
            throw new Error('Message ID is required');
        }
        if (!message.type || typeof message.type !== 'string') {
            throw new Error('Message type is required');
        }
        if (!message.from_agent || typeof message.from_agent !== 'string') {
            throw new Error('From agent is required');
        }
        if (!message.payload) {
            throw new Error('Message payload is required');
        }
    }

    /**
     * Get message status
     */
    getMessageStatus(messageId) {
        const message = this.messageHistory.get(messageId);
        if (!message) {
            return null;
        }

        const isInQueue = this.messageQueue.some(m => m.message_id === messageId);
        const hasTimeout = this.deliveryTimeouts.has(messageId);

        return {
            message: message,
            in_queue: isInQueue,
            delivered: !isInQueue && !hasTimeout,
            timeout: hasTimeout
        };
    }

    /**
     * Get message history
     */
    getMessageHistory(limit = 100) {
        const messages = Array.from(this.messageHistory.values())
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, limit);
        
        return messages;
    }

    /**
     * Get subscriber information
     */
    getSubscriberInfo() {
        const info = {};
        
        for (const [topic, subscribers] of this.subscribers) {
            info[topic] = {
                subscriber_count: subscribers.size,
                subscribers: Array.from(subscribers.keys())
            };
        }
        
        return info;
    }

    /**
     * Get metrics
     */
    getMetrics() {
        return {
            ...this.metrics,
            subscriber_count: this.getSubscriberCount(),
            topic_count: this.subscribers.size,
            history_size: this.messageHistory.size
        };
    }

    /**
     * Get total subscriber count
     */
    getSubscriberCount() {
        const allAgents = new Set();
        
        for (const subscribers of this.subscribers.values()) {
            for (const agentId of subscribers.keys()) {
                allAgents.add(agentId);
            }
        }
        
        return allAgents.size;
    }

    /**
     * Start cleanup loop for old messages
     */
    startCleanupLoop() {
        setInterval(() => {
            this.cleanupOldMessages();
        }, 60000); // Clean every minute
    }

    /**
     * Cleanup old messages from history
     */
    cleanupOldMessages() {
        if (this.messageHistory.size <= this.maxHistorySize) {
            return;
        }

        const messages = Array.from(this.messageHistory.entries())
            .sort((a, b) => a[1].timestamp - b[1].timestamp);
        
        const toRemove = messages.slice(0, this.messageHistory.size - this.maxHistorySize);
        
        toRemove.forEach(([messageId]) => {
            this.messageHistory.delete(messageId);
            this.clearDeliveryTimeout(messageId);
        });

        console.log(`[MessageBus] Cleaned up ${toRemove.length} old messages`);
    }

    /**
     * Create standard message formats
     */
    static createTaskMessage(fromAgent, toAgent, task) {
        return {
            message_id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            type: 'task',
            from_agent: fromAgent,
            to_agent: toAgent,
            timestamp: new Date(),
            payload: task
        };
    }

    static createResultMessage(fromAgent, toAgent, taskId, result, error = null) {
        return {
            message_id: 'result_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            type: 'result',
            from_agent: fromAgent,
            to_agent: toAgent,
            timestamp: new Date(),
            payload: {
                task_id: taskId,
                result: result,
                error: error
            }
        };
    }

    static createEventMessage(fromAgent, eventType, eventData) {
        return {
            message_id: 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            type: 'event',
            from_agent: fromAgent,
            to_agent: null, // Broadcast
            timestamp: new Date(),
            payload: {
                event_type: eventType,
                event_data: eventData
            }
        };
    }

    static createErrorMessage(fromAgent, toAgent, error, context = null) {
        return {
            message_id: 'error_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            type: 'error',
            from_agent: fromAgent,
            to_agent: toAgent,
            timestamp: new Date(),
            payload: {
                error: error.message || error,
                stack: error.stack,
                context: context
            }
        };
    }

    /**
     * Export message bus state
     */
    exportState() {
        return {
            messageQueue: this.messageQueue,
            subscribers: Array.from(this.subscribers.entries()).map(([topic, agents]) => [
                topic, 
                Array.from(agents.entries())
            ]),
            metrics: this.metrics,
            timestamp: new Date()
        };
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MessageBusAdapter;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.MessageBusAdapter = MessageBusAdapter;
}
