// Layer Communication System
// Hệ thống giao tiếp và điều hướng giữa các tầng

class LayerCommunicationHub {
  constructor(config = {}) {
    this.config = config;
    this.layers = new Map();
    this.messageQueue = new Map();
    this.eventListeners = new Map();
    this.routingTable = new Map();
    this.communicationHistory = [];
    this.maxHistorySize = config.maxHistorySize || 1000;
    
    // Communication patterns
    this.patterns = {
      DIRECT: 'direct',           // Trực tiếp giữa các tầng
      BROADCAST: 'broadcast',     // Gửi đến tất cả
      PUBLISH_SUBSCRIBE: 'pubsub', // Publisher-Subscriber
      REQUEST_RESPONSE: 'reqres',  // Request-Response
      PIPELINE: 'pipeline',        // Theo thứ tự pipeline
      CONDITIONAL: 'conditional'   // Có điều kiện
    };
    
    // Message types
    this.messageTypes = {
      DATA: 'data',
      CONTROL: 'control',
      STATUS: 'status',
      ERROR: 'error',
      VALIDATION: 'validation',
      FEEDBACK: 'feedback',
      COORDINATION: 'coordination',
      SYNCHRONIZATION: 'sync'
    };
  }

  // Đăng ký layer với hub
  registerLayer(layerId, layerInstance) {
    this.layers.set(layerId, {
      instance: layerInstance,
      status: 'active',
      lastActivity: new Date(),
      messageCount: 0,
      subscriptions: new Set()
    });
    
    console.log(`📡 Layer ${layerId} registered with communication hub`);
  }

  // Hủy đăng ký layer
  unregisterLayer(layerId) {
    if (this.layers.has(layerId)) {
      this.layers.delete(layerId);
      this.messageQueue.delete(layerId);
      this.eventListeners.delete(layerId);
      console.log(`📡 Layer ${layerId} unregistered from communication hub`);
    }
  }

  // Gửi message trực tiếp đến layer khác
  async sendDirectMessage(fromLayerId, toLayerId, message) {
    const messageId = this.generateMessageId();
    const envelope = {
      id: messageId,
      from: fromLayerId,
      to: toLayerId,
      pattern: this.patterns.DIRECT,
      type: message.type || this.messageTypes.DATA,
      payload: message.payload,
      timestamp: new Date(),
      priority: message.priority || 'normal'
    };

    try {
      // Ghi lại lịch sử
      this.recordMessage(envelope);
      
      // Gửi đến layer đích
      const targetLayer = this.layers.get(toLayerId);
      if (!targetLayer) {
        throw new Error(`Layer ${toLayerId} not found`);
      }

      // Xử lý message
      const response = await this.deliverMessage(toLayerId, envelope);
      
      // Cập nhật thống kê
      this.updateLayerStats(fromLayerId, 'sent');
      this.updateLayerStats(toLayerId, 'received');
      
      return {
        success: true,
        messageId: messageId,
        response: response,
        timestamp: new Date()
      };

    } catch (error) {
      console.error(`❌ Direct message failed from ${fromLayerId} to ${toLayerId}:`, error.message);
      return {
        success: false,
        messageId: messageId,
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  // Gửi broadcast đến tất cả layers
  async sendBroadcast(fromLayerId, message, options = {}) {
    const messageId = this.generateMessageId();
    const envelope = {
      id: messageId,
      from: fromLayerId,
      pattern: this.patterns.BROADCAST,
      type: message.type || this.messageTypes.DATA,
      payload: message.payload,
      timestamp: new Date(),
      priority: message.priority || 'normal',
      excludeLayers: options.excludeLayers || []
    };

    try {
      this.recordMessage(envelope);
      
      const results = [];
      const targetLayers = options.targetLayers || Array.from(this.layers.keys());
      
      for (const layerId of targetLayers) {
        if (layerId !== fromLayerId && !envelope.excludeLayers.includes(layerId)) {
          try {
            const response = await this.deliverMessage(layerId, envelope);
            results.push({
              layerId: layerId,
              success: true,
              response: response
            });
            this.updateLayerStats(layerId, 'received');
          } catch (error) {
            results.push({
              layerId: layerId,
              success: false,
              error: error.message
            });
          }
        }
      }
      
      this.updateLayerStats(fromLayerId, 'sent', targetLayers.length - 1);
      
      return {
        success: true,
        messageId: messageId,
        results: results,
        deliveredCount: results.filter(r => r.success).length,
        timestamp: new Date()
      };

    } catch (error) {
      console.error(`❌ Broadcast failed from ${fromLayerId}:`, error.message);
      return {
        success: false,
        messageId: messageId,
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  // Publisher-Subscriber pattern
  async publish(topic, publisherId, message) {
    const messageId = this.generateMessageId();
    const envelope = {
      id: messageId,
      from: publisherId,
      pattern: this.patterns.PUBLISH_SUBSCRIBE,
      type: message.type || this.messageTypes.DATA,
      payload: message.payload,
      topic: topic,
      timestamp: new Date()
    };

    try {
      this.recordMessage(envelope);
      
      // Tìm subscribers cho topic
      const subscribers = this.getTopicSubscribers(topic);
      const results = [];
      
      for (const subscriberId of subscribers) {
        if (subscriberId !== publisherId) {
          try {
            const response = await this.deliverMessage(subscriberId, envelope);
            results.push({
              subscriberId: subscriberId,
              success: true,
              response: response
            });
            this.updateLayerStats(subscriberId, 'received');
          } catch (error) {
            results.push({
              subscriberId: subscriberId,
              success: false,
              error: error.message
            });
          }
        }
      }
      
      return {
        success: true,
        messageId: messageId,
        topic: topic,
        results: results,
        subscriberCount: subscribers.length,
        deliveredCount: results.filter(r => r.success).length,
        timestamp: new Date()
      };

    } catch (error) {
      console.error(`❌ Publish failed for topic ${topic}:`, error.message);
      return {
        success: false,
        messageId: messageId,
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  // Subscribe to topic
  subscribe(layerId, topic) {
    if (!this.layers.has(layerId)) {
      throw new Error(`Layer ${layerId} not found`);
    }

    const layer = this.layers.get(layerId);
    if (!layer.subscriptions.has(topic)) {
      layer.subscriptions.add(topic);
      console.log(`📡 Layer ${layerId} subscribed to topic: ${topic}`);
    }
  }

  // Unsubscribe from topic
  unsubscribe(layerId, topic) {
    const layer = this.layers.get(layerId);
    if (layer && layer.subscriptions.has(topic)) {
      layer.subscriptions.delete(topic);
      console.log(`📡 Layer ${layerId} unsubscribed from topic: ${topic}`);
    }
  }

  // Request-Response pattern
  async sendRequest(fromLayerId, toLayerId, request, timeout = 10000) {
    const messageId = this.generateMessageId();
    const envelope = {
      id: messageId,
      from: fromLayerId,
      to: toLayerId,
      pattern: this.patterns.REQUEST_RESPONSE,
      type: this.messageTypes.DATA,
      payload: request.payload,
      requestId: messageId,
      timestamp: new Date()
    };

    try {
      this.recordMessage(envelope);
      
      // Tạo promise cho response
      const responsePromise = new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error(`Request timeout after ${timeout}ms`));
        }, timeout);

        // Lưu callback cho response
        this.setResponseHandler(messageId, (response) => {
          clearTimeout(timeoutId);
          resolve(response);
        });
      });

      // Gửi request
      await this.deliverMessage(toLayerId, envelope);
      this.updateLayerStats(fromLayerId, 'sent');
      this.updateLayerStats(toLayerId, 'received');

      // Chờ response
      const response = await responsePromise;
      
      return {
        success: true,
        requestId: messageId,
        response: response,
        timestamp: new Date()
      };

    } catch (error) {
      console.error(`❌ Request failed from ${fromLayerId} to ${toLayerId}:`, error.message);
      return {
        success: false,
        requestId: messageId,
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  // Gửi response cho request
  async sendResponse(fromLayerId, requestId, response) {
    const envelope = {
      id: this.generateMessageId(),
      from: fromLayerId,
      pattern: this.patterns.REQUEST_RESPONSE,
      type: this.messageTypes.DATA,
      payload: response,
      requestId: requestId,
      timestamp: new Date(),
      isResponse: true
    };

    try {
      this.recordMessage(envelope);
      
      // Gọi response handler
      const handler = this.getResponseHandler(requestId);
      if (handler) {
        await handler(envelope);
        this.removeResponseHandler(requestId);
        this.updateLayerStats(fromLayerId, 'sent');
        
        return {
          success: true,
          requestId: requestId,
          timestamp: new Date()
        };
      } else {
        throw new Error(`No handler found for request ${requestId}`);
      }

    } catch (error) {
      console.error(`❌ Response failed for request ${requestId}:`, error.message);
      return {
        success: false,
        requestId: requestId,
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  // Pipeline communication
  async sendPipelineMessage(fromLayerId, direction, message) {
    const currentLayer = this.layers.get(fromLayerId);
    if (!currentLayer) {
      throw new Error(`Layer ${fromLayerId} not found`);
    }

    const targetLayers = this.getPipelineTargets(fromLayerId, direction);
    const results = [];

    for (const targetLayerId of targetLayers) {
      const result = await this.sendDirectMessage(fromLayerId, targetLayerId, {
        ...message,
        type: this.messageTypes.DATA,
        pipelineDirection: direction
      });
      results.push(result);
    }

    return {
      success: true,
      direction: direction,
      fromLayer: fromLayerId,
      targetLayers: targetLayers,
      results: results,
      timestamp: new Date()
    };
  }

  // Conditional routing
  async sendConditionalMessage(fromLayerId, message, condition) {
    const targetLayers = [];
    
    // Đánh giá điều kiện cho mỗi layer
    for (const [layerId, layer] of this.layers) {
      if (layerId !== fromLayerId) {
        try {
          const shouldSend = await condition(layerId, layer.instance);
          if (shouldSend) {
            targetLayers.push(layerId);
          }
        } catch (error) {
          console.warn(`⚠️ Condition evaluation failed for layer ${layerId}:`, error.message);
        }
      }
    }

    const results = [];
    for (const targetLayerId of targetLayers) {
      const result = await this.sendDirectMessage(fromLayerId, targetLayerId, message);
      results.push(result);
    }

    return {
      success: true,
      fromLayer: fromLayerId,
      condition: condition.toString(),
      targetLayers: targetLayers,
      results: results,
      timestamp: new Date()
    };
  }

  // Giao tiếp với layer manager
  async sendToManager(layerId, message) {
    return this.sendDirectMessage(layerId, 'manager', {
      ...message,
      type: this.messageTypes.CONTROL
    });
  }

  // Nhận message từ manager
  async receiveFromManager(managerId, message) {
    return this.sendDirectMessage(managerId, layerId, {
      ...message,
      type: this.messageTypes.CONTROL
    });
  }

  // Internal methods
  async deliverMessage(layerId, envelope) {
    const layer = this.layers.get(layerId);
    if (!layer) {
      throw new Error(`Layer ${layerId} not found`);
    }

    // Kiểm tra nếu layer có handler
    const instance = layer.instance;
    if (typeof instance.onMessage === 'function') {
      return await instance.onMessage(envelope);
    } else if (typeof instance.handleMessage === 'function') {
      return await instance.handleMessage(envelope);
    } else {
      // Lưu vào queue nếu không có handler
      this.addToQueue(layerId, envelope);
      return { queued: true, messageId: envelope.id };
    }
  }

  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  recordMessage(envelope) {
    this.communicationHistory.push({
      ...envelope,
      recordedAt: new Date()
    });

    // Giới hạn kích thước history
    if (this.communicationHistory.length > this.maxHistorySize) {
      this.communicationHistory.shift();
    }
  }

  updateLayerStats(layerId, action, count = 1) {
    const layer = this.layers.get(layerId);
    if (layer) {
      layer.lastActivity = new Date();
      layer.messageCount = (layer.messageCount || 0) + count;
    }
  }

  getTopicSubscribers(topic) {
    const subscribers = [];
    for (const [layerId, layer] of this.layers) {
      if (layer.subscriptions.has(topic)) {
        subscribers.push(layerId);
      }
    }
    return subscribers;
  }

  getPipelineTargets(layerId, direction) {
    const layerNum = parseInt(layerId.replace('layer_', ''));
    const targets = [];

    if (direction === 'forward') {
      // Gửi đến các tầng tiếp theo
      for (let i = layerNum + 1; i <= 100; i++) {
        if (this.layers.has(`layer_${i}`)) {
          targets.push(`layer_${i}`);
        }
      }
    } else if (direction === 'backward') {
      // Gửi đến các tầng trước đó
      for (let i = layerNum - 1; i >= 1; i--) {
        if (this.layers.has(`layer_${i}`)) {
          targets.push(`layer_${i}`);
        }
      }
    } else if (direction === 'adjacent') {
      // Gửi đến tầng liền kề
      if (layerNum > 1 && this.layers.has(`layer_${layerNum - 1}`)) {
        targets.push(`layer_${layerNum - 1}`);
      }
      if (layerNum < 100 && this.layers.has(`layer_${layerNum + 1}`)) {
        targets.push(`layer_${layerNum + 1}`);
      }
    }

    return targets;
  }

  addToQueue(layerId, envelope) {
    if (!this.messageQueue.has(layerId)) {
      this.messageQueue.set(layerId, []);
    }
    this.messageQueue.get(layerId).push(envelope);
  }

  setResponseHandler(requestId, handler) {
    if (!this.responseHandlers) {
      this.responseHandlers = new Map();
    }
    this.responseHandlers.set(requestId, handler);
  }

  getResponseHandler(requestId) {
    return this.responseHandlers ? this.responseHandlers.get(requestId) : null;
  }

  removeResponseHandler(requestId) {
    if (this.responseHandlers) {
      this.responseHandlers.delete(requestId);
    }
  }

  // Monitoring và diagnostics
  getCommunicationStats() {
    const stats = {
      totalLayers: this.layers.size,
      activeLayers: 0,
      totalMessages: this.communicationHistory.length,
      messageTypes: {},
      patterns: {},
      layerStats: {}
    };

    // Layer stats
    for (const [layerId, layer] of this.layers) {
      if (layer.status === 'active') {
        stats.activeLayers++;
      }
      
      stats.layerStats[layerId] = {
        status: layer.status,
        messageCount: layer.messageCount,
        lastActivity: layer.lastActivity,
        subscriptions: Array.from(layer.subscriptions),
        queueSize: this.messageQueue.get(layerId)?.length || 0
      };
    }

    // Message type stats
    for (const message of this.communicationHistory) {
      stats.messageTypes[message.type] = (stats.messageTypes[message.type] || 0) + 1;
      stats.patterns[message.pattern] = (stats.patterns[message.pattern] || 0) + 1;
    }

    return stats;
  }

  getCommunicationHistory(filter = {}) {
    let history = [...this.communicationHistory];

    if (filter.fromLayer) {
      history = history.filter(msg => msg.from === filter.fromLayer);
    }

    if (filter.toLayer) {
      history = history.filter(msg => msg.to === filter.toLayer);
    }

    if (filter.type) {
      history = history.filter(msg => msg.type === filter.type);
    }

    if (filter.pattern) {
      history = history.filter(msg => msg.pattern === filter.pattern);
    }

    if (filter.since) {
      history = history.filter(msg => new Date(msg.timestamp) >= new Date(filter.since));
    }

    return history;
  }

  // Cleanup và maintenance
  cleanup() {
    // Xóa response handlers cũ
    if (this.responseHandlers) {
      this.responseHandlers.clear();
    }

    // Xóa message queue cũ
    for (const [layerId, queue] of this.messageQueue) {
      if (queue.length > 100) {
        this.messageQueue.set(layerId, queue.slice(-50));
      }
    }

    console.log('🧹 Communication hub cleanup completed');
  }
}

// Enhanced Layer class with communication capabilities
class CommunicativeLayer {
  constructor(layerId, config, communicationHub) {
    this.layerId = layerId;
    this.config = config;
    this.hub = communicationHub;
    this.messageHandlers = new Map();
    this.subscriptions = new Set();
    
    // Đăng ký với hub
    this.hub.registerLayer(layerId, this);
    
    // Setup default handlers
    this.setupDefaultHandlers();
  }

  // Setup default message handlers
  setupDefaultHandlers() {
    this.addMessageHandler(this.hub.messageTypes.DATA, this.handleDataMessage.bind(this));
    this.addMessageHandler(this.hub.messageTypes.CONTROL, this.handleControlMessage.bind(this));
    this.addMessageHandler(this.hub.messageTypes.STATUS, this.handleStatusMessage.bind(this));
    this.addMessageHandler(this.hub.messageTypes.ERROR, this.handleErrorMessage.bind(this));
  }

  // Add custom message handler
  addMessageHandler(messageType, handler) {
    this.messageHandlers.set(messageType, handler);
  }

  // Main message handler
  async onMessage(envelope) {
    const handler = this.messageHandlers.get(envelope.type);
    if (handler) {
      try {
        return await handler(envelope);
      } catch (error) {
        console.error(`❌ Message handler error in layer ${this.layerId}:`, error.message);
        return {
          success: false,
          error: error.message,
          layerId: this.layerId
        };
      }
    } else {
      console.warn(`⚠️ No handler for message type ${envelope.type} in layer ${this.layerId}`);
      return {
        success: false,
        error: `No handler for message type ${envelope.type}`,
        layerId: this.layerId
      };
    }
  }

  // Default message handlers
  async handleDataMessage(envelope) {
    console.log(`📨 Layer ${this.layerId} received data message from ${envelope.from}`);
    
    // Process the data based on layer's function
    const processedData = await this.processData(envelope.payload);
    
    return {
      success: true,
      layerId: this.layerId,
      processedData: processedData,
      timestamp: new Date()
    };
  }

  async handleControlMessage(envelope) {
    console.log(`🎛️ Layer ${this.layerId} received control message from ${envelope.from}`);
    
    // Handle control commands
    const command = envelope.payload.command;
    const response = await this.executeControlCommand(command, envelope.payload.params);
    
    return {
      success: true,
      layerId: this.layerId,
      command: command,
      response: response,
      timestamp: new Date()
    };
  }

  async handleStatusMessage(envelope) {
    console.log(`📊 Layer ${this.layerId} received status message from ${envelope.from}`);
    
    const status = this.getStatus();
    
    return {
      success: true,
      layerId: this.layerId,
      status: status,
      timestamp: new Date()
    };
  }

  async handleErrorMessage(envelope) {
    console.error(`💥 Layer ${this.layerId} received error message from ${envelope.from}:`, envelope.payload);
    
    // Handle error propagation
    await this.handleError(envelope.payload);
    
    return {
      success: true,
      layerId: this.layerId,
      errorHandled: true,
      timestamp: new Date()
    };
  }

  // Communication methods
  async sendToLayer(targetLayerId, message) {
    return await this.hub.sendDirectMessage(this.layerId, targetLayerId, message);
  }

  async broadcast(message, options = {}) {
    return await this.hub.sendBroadcast(this.layerId, message, options);
  }

  async publish(topic, message) {
    return await this.hub.publish(topic, this.layerId, message);
  }

  async subscribe(topic) {
    this.subscriptions.add(topic);
    return await this.hub.subscribe(this.layerId, topic);
  }

  async unsubscribe(topic) {
    this.subscriptions.delete(topic);
    return await this.hub.unsubscribe(this.layerId, topic);
  }

  async request(targetLayerId, request, timeout) {
    return await this.hub.sendRequest(this.layerId, targetLayerId, request, timeout);
  }

  async respond(requestId, response) {
    return await this.hub.sendResponse(this.layerId, requestId, response);
  }

  async sendForward(message) {
    return await this.hub.sendPipelineMessage(this.layerId, 'forward', message);
  }

  async sendBackward(message) {
    return await this.hub.sendPipelineMessage(this.layerId, 'backward', message);
  }

  async sendToAdjacent(message) {
    return await this.hub.sendPipelineMessage(this.layerId, 'adjacent', message);
  }

  async sendConditional(message, condition) {
    return await this.hub.sendConditionalMessage(this.layerId, message, condition);
  }

  // Layer-specific methods (to be overridden)
  async processData(data) {
    // Override in subclasses
    return { processed: true, data: data };
  }

  async executeControlCommand(command, params) {
    // Override in subclasses
    return { command: command, executed: true };
  }

  async getStatus() {
    return {
      layerId: this.layerId,
      status: 'active',
      subscriptions: Array.from(this.subscriptions),
      messageHandlers: Array.from(this.messageHandlers.keys())
    };
  }

  async handleError(error) {
    // Override in subclasses
    console.error(`Layer ${this.layerId} handling error:`, error);
  }
}

// Layer Manager with communication capabilities
class LayerManager {
  constructor(config = {}) {
    this.config = config;
    this.hub = new LayerCommunicationHub(config.communication);
    this.layers = new Map();
    this.managementTopics = ['layer_status', 'system_control', 'error_report'];
    
    // Subscribe to management topics
    this.managementTopics.forEach(topic => {
      this.hub.subscribe('manager', topic);
    });
  }

  // Add layer with communication
  addLayer(layerId, layerInstance) {
    const communicativeLayer = new CommunicativeLayer(layerId, layerInstance.config, this.hub);
    this.layers.set(layerId, communicativeLayer);
    
    console.log(`🎯 Layer ${layerId} added to manager with communication`);
  }

  // Manager communication methods
  async broadcastToAll(message) {
    return await this.hub.sendBroadcast('manager', message);
  }

  async sendToLayer(layerId, message) {
    return await this.hub.sendDirectMessage('manager', layerId, message);
  }

  async getLayerStatus(layerId) {
    const response = await this.hub.sendRequest('manager', layerId, {
      payload: { command: 'get_status' }
    });
    
    return response.success ? response.response : null;
  }

  async getAllLayerStatuses() {
    const statuses = {};
    const promises = [];
    
    for (const layerId of this.layers.keys()) {
      promises.push(
        this.getLayerStatus(layerId).then(status => {
          statuses[layerId] = status;
        })
      );
    }
    
    await Promise.all(promises);
    return statuses;
  }

  async controlLayer(layerId, command, params = {}) {
    const response = await this.hub.sendRequest('manager', layerId, {
      payload: { command: command, params: params }
    });
    
    return response.success ? response.response : null;
  }

  // System-wide operations
  async shutdown() {
    console.log('🛑 Shutting down layer manager...');
    
    // Send shutdown signal to all layers
    await this.broadcastToAll({
      type: this.hub.messageTypes.CONTROL,
      payload: { command: 'shutdown' }
    });
    
    // Cleanup hub
    this.hub.cleanup();
    
    console.log('✅ Layer manager shutdown complete');
  }

  async getSystemStats() {
    return this.hub.getCommunicationStats();
  }

  async getCommunicationHistory(filter = {}) {
    return this.hub.getCommunicationHistory(filter);
  }
}

module.exports = {
  LayerCommunicationHub,
  CommunicativeLayer,
  LayerManager
};
