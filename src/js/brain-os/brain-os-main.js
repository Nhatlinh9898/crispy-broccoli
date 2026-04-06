/**
 * Brain OS - Main Entry Point
 * Neural Operating System for AmazeBid Self-Evolving AI
 */

// Import core components
import AgentRegistry from './brain-kernel/agent-registry.js';
import TaskScheduler from './brain-kernel/task-scheduler.js';
import MessageBusAdapter from './brain-kernel/message-bus-adapter.js';

class BrainOS {
    constructor() {
        this.agentRegistry = new AgentRegistry();
        this.messageBus = new MessageBusAdapter();
        this.taskScheduler = new TaskScheduler(this.agentRegistry, this.messageBus);
        
        this.initialized = false;
        this.metrics = {
            startup_time: 0,
            agents_registered: 0,
            tasks_processed: 0,
            system_health: 0
        };
        
        this.startTime = Date.now();
    }

    /**
     * Initialize Brain OS
     */
    async initialize() {
        console.log('🧠 Initializing Brain OS...');
        
        try {
            // Initialize core components in order
            await this.messageBus.initialize();
            await this.agentRegistry.initialize();
            await this.taskScheduler.initialize();
            
            // Setup message handlers
            this.setupMessageHandlers();
            
            // Setup system monitoring
            this.setupSystemMonitoring();
            
            this.initialized = true;
            this.metrics.startup_time = Date.now() - this.startTime;
            this.metrics.agents_registered = this.agentRegistry.getAllAgents().length;
            
            console.log(`✅ Brain OS initialized in ${this.metrics.startup_time}ms`);
            console.log(`📊 Registered ${this.metrics.agents_registered} agents`);
            console.log('🚀 Brain OS is ready for operation!');
            
            // Send system ready event
            await this.sendSystemEvent('system_ready', {
                startup_time: this.metrics.startup_time,
                agents_count: this.metrics.agents_registered
            });
            
        } catch (error) {
            console.error('❌ Failed to initialize Brain OS:', error);
            throw error;
        }
    }

    /**
     * Setup message handlers for system coordination
     */
    setupMessageHandlers() {
        // Handle task results
        this.messageBus.subscribe('brain_os', 'result', async (message) => {
            await this.handleTaskResult(message);
        });

        // Handle agent status updates
        this.messageBus.subscribe('brain_os', 'agent_status', async (message) => {
            await this.handleAgentStatus(message);
        });

        // Handle system events
        this.messageBus.subscribe('brain_os', 'system_event', async (message) => {
            await this.handleSystemEvent(message);
        });

        // Handle error messages
        this.messageBus.subscribe('brain_os', 'error', async (message) => {
            await this.handleErrorMessage(message);
        });
    }

    /**
     * Setup system monitoring
     */
    setupSystemMonitoring() {
        // Monitor system health every 30 seconds
        setInterval(() => {
            this.updateSystemHealth();
        }, 30000);

        // Monitor agent heartbeats every 10 seconds
        setInterval(() => {
            this.checkAgentHeartbeats();
        }, 10000);
    }

    /**
     * Submit a task to the system
     */
    async submitTask(task) {
        if (!this.initialized) {
            throw new Error('Brain OS is not initialized');
        }

        return await this.taskScheduler.submitTask(task);
    }

    /**
     * Get system status
     */
    getSystemStatus() {
        if (!this.initialized) {
            return { status: 'not_initialized' };
        }

        return {
            status: 'running',
            uptime: Date.now() - this.startTime,
            metrics: this.metrics,
            agents: this.agentRegistry.getSystemOverview(),
            scheduler: this.taskScheduler.getMetrics(),
            message_bus: this.messageBus.getMetrics(),
            system_health: this.calculateSystemHealth()
        };
    }

    /**
     * Handle task result messages
     */
    async handleTaskResult(message) {
        const { task_id, result, error } = message.payload;
        
        if (error) {
            console.error(`[BrainOS] Task ${task_id} failed:`, error);
        } else {
            console.log(`[BrainOS] Task ${task_id} completed successfully`);
            this.metrics.tasks_processed++;
        }
    }

    /**
     * Handle agent status updates
     */
    async handleAgentStatus(message) {
        const { agent_id, status, metrics } = message.payload;
        
        this.agentRegistry.updateAgentStatus(agent_id, status, metrics);
        
        // Send status update to monitoring systems
        await this.sendSystemEvent('agent_status_updated', {
            agent_id,
            status,
            metrics
        });
    }

    /**
     * Handle system events
     */
    async handleSystemEvent(message) {
        const { event_type, event_data } = message.payload;
        
        console.log(`[BrainOS] System event: ${event_type}`, event_data);
        
        // Route to appropriate handlers
        switch (event_type) {
            case 'performance_degradation':
                await this.handlePerformanceDegradation(event_data);
                break;
            case 'agent_failure':
                await this.handleAgentFailure(event_data);
                break;
            case 'evolution_required':
                await this.handleEvolutionRequired(event_data);
                break;
        }
    }

    /**
     * Handle error messages
     */
    async handleErrorMessage(message) {
        const { error, context } = message.payload;
        
        console.error(`[BrainOS] Error from ${message.from_agent}:`, error);
        
        // Log error and potentially trigger recovery procedures
        await this.logError(error, context);
    }

    /**
     * Handle performance degradation
     */
    async handlePerformanceDegradation(data) {
        console.log('[BrainOS] Performance degradation detected:', data);
        
        // Submit analysis task to meta-analyzer
        await this.submitTask({
            type: 'meta_analysis',
            origin: 'brain_os',
            payload: {
                issue: 'performance_degradation',
                data: data
            },
            constraints: {
                cpu: 'cpu0',
                priority: 2
            }
        });
    }

    /**
     * Handle agent failure
     */
    async handleAgentFailure(data) {
        console.log('[BrainOS] Agent failure detected:', data);
        
        // Mark agent as inactive
        this.agentRegistry.updateAgentStatus(data.agent_id, 'inactive');
        
        // Submit recovery task
        await this.submitTask({
            type: 'agent_recovery',
            origin: 'brain_os',
            payload: data,
            constraints: {
                cpu: 'cpu0',
                priority: 1
            }
        });
    }

    /**
     * Handle evolution requirements
     */
    async handleEvolutionRequired(data) {
        console.log('[BrainOS] Evolution required:', data);
        
        // Submit evolution task to meta-planner
        await this.submitTask({
            type: 'meta_planning',
            origin: 'brain_os',
            payload: {
                evolution_type: data.evolution_type,
                targets: data.targets
            },
            constraints: {
                cpu: 'cpu0',
                priority: 3
            }
        });
    }

    /**
     * Send system event
     */
    async sendSystemEvent(eventType, eventData) {
        const message = MessageBusAdapter.createEventMessage('brain_os', eventType, eventData);
        await this.messageBus.sendBroadcastMessage(message, 'system_events');
    }

    /**
     * Log error for analysis
     */
    async logError(error, context) {
        const logEntry = {
            timestamp: new Date(),
            error: error.message || error,
            stack: error.stack,
            context: context,
            system_state: this.getSystemStatus()
        };

        // In a real system, this would log to external monitoring
        console.error('[BrainOS] Error logged:', logEntry);
    }

    /**
     * Update system health
     */
    updateSystemHealth() {
        const health = this.calculateSystemHealth();
        this.metrics.system_health = health;
        
        if (health < 70) {
            console.warn(`[BrainOS] System health degraded: ${health}%`);
            this.sendSystemEvent('health_warning', { health });
        }
    }

    /**
     * Calculate overall system health
     */
    calculateSystemHealth() {
        const agentHealth = this.agentRegistry.calculateSystemHealth();
        const schedulerMetrics = this.taskScheduler.getMetrics();
        const messageBusMetrics = this.messageBus.getMetrics();
        
        // Calculate component health scores
        const schedulerHealth = schedulerMetrics.success_rate || 0;
        const messageBusHealth = messageBusMetrics.messages_sent > 0 ? 
            ((messageBusMetrics.messages_sent - messageBusMetrics.messages_failed) / messageBusMetrics.messages_sent) * 100 : 100;
        
        // Weighted average (agents: 40%, scheduler: 30%, message bus: 30%)
        const overallHealth = (agentHealth * 0.4) + (schedulerHealth * 0.3) + (messageBusHealth * 0.3);
        
        return Math.round(overallHealth);
    }

    /**
     * Check agent heartbeats
     */
    checkAgentHeartbeats() {
        const agents = this.agentRegistry.getAllAgents();
        const now = new Date();
        
        agents.forEach(agent => {
            const timeSinceHeartbeat = now - agent.last_heartbeat;
            
            // If no heartbeat for 60 seconds, mark as inactive
            if (timeSinceHeartbeat > 60000 && agent.status === 'active') {
                console.warn(`[BrainOS] Agent ${agent.agent_id} missed heartbeat`);
                this.agentRegistry.updateAgentStatus(agent.agent_id, 'inactive');
                
                this.sendSystemEvent('agent_timeout', {
                    agent_id: agent.agent_id,
                    last_heartbeat: agent.last_heartbeat
                });
            }
        });
    }

    /**
     * Shutdown Brain OS gracefully
     */
    async shutdown() {
        console.log('🛑 Shutting down Brain OS...');
        
        try {
            // Send shutdown event
            await this.sendSystemEvent('system_shutdown', {
                timestamp: new Date()
            });
            
            // Wait for tasks to complete (with timeout)
            const shutdownTimeout = 30000; // 30 seconds
            const startTime = Date.now();
            
            while (this.taskScheduler.getMetrics().running_tasks > 0 && 
                   (Date.now() - startTime) < shutdownTimeout) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            console.log('✅ Brain OS shutdown complete');
            
        } catch (error) {
            console.error('❌ Error during shutdown:', error);
        }
    }

    /**
     * Export system state
     */
    exportState() {
        return {
            initialized: this.initialized,
            metrics: this.metrics,
            start_time: this.startTime,
            agent_registry: this.agentRegistry.exportState(),
            task_scheduler: this.taskScheduler.exportState(),
            message_bus: this.messageBus.exportState(),
            timestamp: new Date()
        };
    }

    /**
     * Import system state (for recovery)
     */
    async importState(state) {
        console.log('[BrainOS] Importing system state...');
        
        try {
            await this.messageBus.importState(state.message_bus);
            await this.agentRegistry.importState(state.agent_registry);
            
            // Note: Task scheduler state import would need careful handling
            // of running tasks and might not be fully recoverable
            
            console.log('[BrainOS] State imported successfully');
        } catch (error) {
            console.error('[BrainOS] Failed to import state:', error);
            throw error;
        }
    }
}

// Export singleton instance
let brainOSInstance = null;

export function getBrainOS() {
    if (!brainOSInstance) {
        brainOSInstance = new BrainOS();
    }
    return brainOSInstance;
}

// Export class for testing
export { BrainOS };

// Auto-initialize if running as main module
if (typeof window !== 'undefined' && window.location) {
    // Browser environment - wait for DOM ready
    document.addEventListener('DOMContentLoaded', async () => {
        const brainOS = getBrainOS();
        try {
            await brainOS.initialize();
            window.brainOS = brainOS; // Make available globally
        } catch (error) {
            console.error('Failed to initialize Brain OS:', error);
        }
    });
} else if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = { BrainOS, getBrainOS };
}
