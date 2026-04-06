/**
 * Brain OS - Task Scheduler
 * Intelligent task scheduling across CPU 0 and CPU 1 with priority management
 */

class TaskScheduler {
    constructor(agentRegistry, messageBus) {
        this.agentRegistry = agentRegistry;
        this.messageBus = messageBus;
        this.taskQueue = [];
        this.runningTasks = new Map();
        this.completedTasks = new Map();
        this.schedulingRules = new Map();
        this.metrics = {
            tasks_scheduled: 0,
            tasks_completed: 0,
            tasks_failed: 0,
            avg_wait_time: 0,
            cpu_utilization: { cpu0: 0, cpu1: 0 }
        };
        this.initialized = false;
        
        // Initialize scheduling rules
        this.initializeSchedulingRules();
    }

    /**
     * Initialize the task scheduler
     */
    async initialize() {
        console.log('[TaskScheduler] Initializing...');
        
        // Start scheduling loop
        this.startSchedulingLoop();
        
        this.initialized = true;
        console.log('[TaskScheduler] Initialized and running');
    }

    /**
     * Initialize scheduling rules
     */
    initializeSchedulingRules() {
        // CPU affinity rules
        this.schedulingRules.set('cpu_affinity', {
            'cpu0': ['canonicalizer', 'planner', 'selector', 'meta_observer', 'meta_analyzer', 'meta_planner'],
            'cpu1': ['data_processor', 'embedding_engine', 'model_runner', 'evaluator', 'experiment_runner']
        });

        // Priority rules
        this.schedulingRules.set('priority', {
            'inference': 1,
            'evolution': 2,
            'analysis': 3,
            'training': 4,
            'logging': 5
        });

        // Task type to agent mapping
        this.schedulingRules.set('task_agents', {
            'canonicalization': 'canonicalizer',
            'planning': 'planner',
            'selection': 'selector',
            'data_processing': 'data_processor',
            'embedding': 'embedding_engine',
            'inference': 'model_runner',
            'evaluation': 'evaluator',
            'experiment': 'experiment_runner',
            'meta_observation': 'meta_observer',
            'meta_analysis': 'meta_analyzer',
            'meta_planning': 'meta_planner'
        });
    }

    /**
     * Submit a new task
     */
    async submitTask(task) {
        // Validate task
        this.validateTask(task);
        
        // Generate task ID if not provided
        if (!task.task_id) {
            task.task_id = this.generateTaskId();
        }

        // Set default values
        task.status = 'queued';
        task.submitted_at = new Date();
        task.priority = task.priority || this.schedulingRules.get('priority')[task.type] || 5;
        task.wait_time = 0;
        task.execution_time = 0;

        // Add to queue
        this.taskQueue.push(task);
        
        // Sort queue by priority and submission time
        this.sortTaskQueue();
        
        this.metrics.tasks_scheduled++;
        
        console.log(`[TaskScheduler] Task submitted: ${task.task_id} (${task.type}, priority: ${task.priority})`);
        
        return task.task_id;
    }

    /**
     * Start the main scheduling loop
     */
    startSchedulingLoop() {
        setInterval(() => {
            this.processTaskQueue();
        }, 100); // Process every 100ms
    }

    /**
     * Process the task queue
     */
    async processTaskQueue() {
        while (this.taskQueue.length > 0) {
            const task = this.taskQueue.shift();
            
            // Check if task is ready to execute
            if (this.isTaskReady(task)) {
                await this.executeTask(task);
            } else {
                // Put back in queue if not ready
                this.taskQueue.push(task);
                break;
            }
        }
    }

    /**
     * Check if a task is ready to execute
     */
    isTaskReady(task) {
        // Check deadline
        if (task.deadline && new Date() > task.deadline) {
            task.status = 'expired';
            this.metrics.tasks_failed++;
            return false;
        }

        // Check CPU availability
        const targetCPU = this.determineTargetCPU(task);
        if (!this.isCPUAvailable(targetCPU)) {
            return false;
        }

        // Check agent availability
        const targetAgent = this.determineTargetAgent(task);
        if (!this.isAgentAvailable(targetAgent)) {
            return false;
        }

        return true;
    }

    /**
     * Execute a task
     */
    async executeTask(task) {
        task.status = 'running';
        task.started_at = new Date();
        task.wait_time = task.started_at - task.submitted_at;

        const targetAgent = this.determineTargetAgent(task);
        const targetCPU = this.determineTargetCPU(task);

        // Track running task
        this.runningTasks.set(task.task_id, {
            task: task,
            agent: targetAgent,
            cpu: targetCPU,
            started_at: task.started_at
        });

        // Update CPU utilization
        this.updateCPUUtilization(targetCPU, 1);

        console.log(`[TaskScheduler] Executing task ${task.task_id} on ${targetAgent} (${targetCPU})`);

        try {
            // Send task to agent via message bus
            const result = await this.sendTaskToAgent(task, targetAgent);
            
            // Handle successful completion
            await this.handleTaskCompletion(task, result, null);
            
        } catch (error) {
            // Handle task failure
            await this.handleTaskCompletion(task, null, error);
        }
    }

    /**
     * Send task to agent
     */
    async sendTaskToAgent(task, agentId) {
        const message = {
            message_id: this.generateMessageId(),
            type: 'task',
            from_agent: 'task_scheduler',
            to_agent: agentId,
            timestamp: new Date(),
            payload: task
        };

        return await this.messageBus.sendMessage(message);
    }

    /**
     * Handle task completion
     */
    async handleTaskCompletion(task, result, error) {
        task.completed_at = new Date();
        task.execution_time = task.completed_at - task.started_at;

        const runningTask = this.runningTasks.get(task.task_id);
        if (runningTask) {
            // Update CPU utilization
            this.updateCPUUtilization(runningTask.cpu, -1);
            
            // Remove from running tasks
            this.runningTasks.delete(task.task_id);
        }

        if (error) {
            task.status = 'failed';
            task.error = error.message;
            this.metrics.tasks_failed++;
            
            console.error(`[TaskScheduler] Task ${task.task_id} failed:`, error);
        } else {
            task.status = 'completed';
            task.result = result;
            this.metrics.tasks_completed++;
            
            console.log(`[TaskScheduler] Task ${task.task_id} completed in ${task.execution_time}ms`);
        }

        // Store in completed tasks
        this.completedTasks.set(task.task_id, task);

        // Update metrics
        this.updateMetrics(task);

        // Send completion notification
        await this.sendCompletionNotification(task, result, error);
    }

    /**
     * Send completion notification
     */
    async sendCompletionNotification(task, result, error) {
        const message = {
            message_id: this.generateMessageId(),
            type: 'result',
            from_agent: 'task_scheduler',
            to_agent: task.origin,
            timestamp: new Date(),
            payload: {
                task_id: task.task_id,
                status: task.status,
                result: result,
                error: error ? error.message : null,
                execution_time: task.execution_time
            }
        };

        await this.messageBus.sendMessage(message);
    }

    /**
     * Determine target CPU for task
     */
    determineTargetCPU(task) {
        // Use specified CPU if constraint exists
        if (task.constraints && task.constraints.cpu && task.constraints.cpu !== 'any') {
            return task.constraints.cpu;
        }

        // Use scheduling rules based on task type
        const taskAgents = this.schedulingRules.get('task_agents');
        const agentId = taskAgents[task.type];
        
        if (agentId) {
            const agent = this.agentRegistry.getAgent(agentId);
            if (agent) {
                return agent.cpu_affinity;
            }
        }

        // Default to CPU with lower utilization
        return this.metrics.cpu_utilization.cpu0 <= this.metrics.cpu_utilization.cpu1 ? 'cpu0' : 'cpu1';
    }

    /**
     * Determine target agent for task
     */
    determineTargetAgent(task) {
        // Use specified agent if provided
        if (task.target_agent) {
            return task.target_agent;
        }

        // Use scheduling rules based on task type
        const taskAgents = this.schedulingRules.get('task_agents');
        return taskAgents[task.type] || 'model_runner'; // Default fallback
    }

    /**
     * Check if CPU is available
     */
    isCPUAvailable(cpu) {
        const maxConcurrentTasks = cpu === 'cpu0' ? 10 : 8; // Configurable limits
        const currentTasks = Array.from(this.runningTasks.values())
            .filter(t => t.cpu === cpu).length;
        
        return currentTasks < maxConcurrentTasks;
    }

    /**
     * Check if agent is available
     */
    isAgentAvailable(agentId) {
        const agent = this.agentRegistry.getAgent(agentId);
        if (!agent || agent.status !== 'active') {
            return false;
        }

        const maxConcurrentTasks = 5; // Configurable per agent
        const currentTasks = Array.from(this.runningTasks.values())
            .filter(t => t.agent === agentId).length;
        
        return currentTasks < maxConcurrentTasks;
    }

    /**
     * Update CPU utilization
     */
    updateCPUUtilization(cpu, delta) {
        this.metrics.cpu_utilization[cpu] = Math.max(0, Math.min(100, 
            this.metrics.cpu_utilization[cpu] + (delta * 10)));
    }

    /**
     * Update scheduler metrics
     */
    updateMetrics(task) {
        // Update average wait time
        const totalTasks = this.metrics.tasks_completed + this.metrics.tasks_failed;
        if (totalTasks > 0) {
            this.metrics.avg_wait_time = 
                (this.metrics.avg_wait_time * (totalTasks - 1) + task.wait_time) / totalTasks;
        }
    }

    /**
     * Sort task queue by priority and submission time
     */
    sortTaskQueue() {
        this.taskQueue.sort((a, b) => {
            if (a.priority !== b.priority) {
                return a.priority - b.priority; // Lower number = higher priority
            }
            return a.submitted_at - b.submitted_at; // FIFO for same priority
        });
    }

    /**
     * Validate task structure
     */
    validateTask(task) {
        if (!task.type || typeof task.type !== 'string') {
            throw new Error('Task type is required');
        }
        if (!task.origin || typeof task.origin !== 'string') {
            throw new Error('Task origin is required');
        }
        if (!task.payload) {
            throw new Error('Task payload is required');
        }
    }

    /**
     * Get task status
     */
    getTaskStatus(taskId) {
        // Check running tasks
        const running = this.runningTasks.get(taskId);
        if (running) {
            return {
                status: 'running',
                task: running.task,
                agent: running.agent,
                cpu: running.cpu,
                started_at: running.started_at
            };
        }

        // Check completed tasks
        const completed = this.completedTasks.get(taskId);
        if (completed) {
            return {
                status: completed.status,
                task: completed,
                result: completed.result,
                error: completed.error
            };
        }

        // Check queue
        const queued = this.taskQueue.find(t => t.task_id === taskId);
        if (queued) {
            return {
                status: 'queued',
                task: queued,
                queue_position: this.taskQueue.indexOf(queued)
            };
        }

        return null;
    }

    /**
     * Get scheduler metrics
     */
    getMetrics() {
        return {
            ...this.metrics,
            queue_length: this.taskQueue.length,
            running_tasks: this.runningTasks.size,
            completed_tasks: this.completedTasks.size,
            success_rate: this.metrics.tasks_scheduled > 0 ? 
                (this.metrics.tasks_completed / this.metrics.tasks_scheduled) * 100 : 0
        };
    }

    /**
     * Cancel a task
     */
    async cancelTask(taskId) {
        // Remove from queue if queued
        const queueIndex = this.taskQueue.findIndex(t => t.task_id === taskId);
        if (queueIndex !== -1) {
            const task = this.taskQueue.splice(queueIndex, 1)[0];
            task.status = 'cancelled';
            this.completedTasks.set(taskId, task);
            return true;
        }

        // Cannot cancel running tasks (would require agent support)
        const running = this.runningTasks.get(taskId);
        if (running) {
            console.warn(`[TaskScheduler] Cannot cancel running task: ${taskId}`);
            return false;
        }

        return false;
    }

    /**
     * Generate unique task ID
     */
    generateTaskId() {
        return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Generate unique message ID
     */
    generateMessageId() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Export scheduler state
     */
    exportState() {
        return {
            taskQueue: this.taskQueue,
            runningTasks: Array.from(this.runningTasks.entries()),
            completedTasks: Array.from(this.completedTasks.entries()),
            metrics: this.metrics,
            timestamp: new Date()
        };
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TaskScheduler;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.TaskScheduler = TaskScheduler;
}
