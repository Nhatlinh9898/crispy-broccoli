// Integration Examples
// Các ví dụ tích hợp hệ thống vào dự án khác

// Example 1: Basic Node.js Integration
const express = require('express');
const { ContentDataAnalyzer } = require('./content-data-analyzer.js');
const { SystemWorkflowEngine } = require('./system-workflow-engine.js');

class BasicNodeIntegration {
  constructor() {
    this.app = express();
    this.analyzer = new ContentDataAnalyzer();
    this.workflowEngine = new SystemWorkflowEngine();
    
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // CORS
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
  }

  setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'healthy', timestamp: Date.now() });
    });

    // Content analysis endpoint
    this.app.post('/api/analyze', async (req, res) => {
      try {
        const { content, options = {} } = req.body;
        
        if (!content) {
          return res.status(400).json({ error: 'Content is required' });
        }

        const result = await this.analyzer.analyzeSingleContent({
          content: content,
          title: options.title || 'Untitled',
          category: options.category || 'general'
        });

        res.json({
          success: true,
          result: result,
          processedAt: Date.now()
        });
      } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ 
          success: false, 
          error: error.message 
        });
      }
    });

    // Workflow execution endpoint
    this.app.post('/api/workflow/execute', async (req, res) => {
      try {
        const { workflowId, data, options = {} } = req.body;
        
        if (!workflowId || !data) {
          return res.status(400).json({ 
            error: 'Workflow ID and data are required' 
          });
        }

        const result = await this.workflowEngine.executeWorkflow(
          workflowId,
          data,
          options
        );

        res.json({
          success: true,
          executionId: result.executionId,
          status: result.status,
          result: result.result,
          executedAt: Date.now()
        });
      } catch (error) {
        console.error('Workflow error:', error);
        res.status(500).json({ 
          success: false, 
          error: error.message 
        });
      }
    });

    // Get workflow status
    this.app.get('/api/workflow/:executionId/status', (req, res) => {
      try {
        const { executionId } = req.params;
        const status = this.workflowEngine.getWorkflowStatus(executionId);
        
        if (!status) {
          return res.status(404).json({ error: 'Workflow not found' });
        }

        res.json({
          success: true,
          status: status
        });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          error: error.message 
        });
      }
    });
  }

  async start(port = 3000) {
    try {
      // Initialize components
      await this.analyzer.initialize();
      console.log('✅ Content analyzer initialized');

      // Register sample workflows
      this.registerSampleWorkflows();
      console.log('✅ Workflows registered');

      // Start server
      this.app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
        console.log(`📊 API endpoints:`);
        console.log(`   GET  /health - Health check`);
        console.log(`   POST /api/analyze - Content analysis`);
        console.log(`   POST /api/workflow/execute - Execute workflow`);
        console.log(`   GET  /api/workflow/:id/status - Workflow status`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  registerSampleWorkflows() {
    const sampleWorkflow = {
      name: 'Sample Content Workflow',
      description: 'Sample workflow for demonstration',
      steps: [
        {
          type: 'content_analysis',
          name: 'analyze_content',
          timeout: 60000
        },
        {
          type: 'quality_assessment',
          name: 'assess_quality',
          timeout: 30000,
          dependencies: [0]
        }
      ],
      parallel: false,
      timeout: 120000
    };

    this.workflowEngine.defineWorkflow('sample_workflow', sampleWorkflow);
  }
}

// Example 2: React Frontend Integration
class ReactIntegration {
  constructor(apiEndpoint = 'http://localhost:3000/api') {
    this.apiEndpoint = apiEndpoint;
  }

  async analyzeContent(content, options = {}) {
    try {
      const response = await fetch(`${this.apiEndpoint}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, options })
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }

      return result.result;
    } catch (error) {
      console.error('React integration error:', error);
      throw error;
    }
  }

  async executeWorkflow(workflowId, data, options = {}) {
    try {
      const response = await fetch(`${this.apiEndpoint}/workflow/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workflowId, data, options })
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      console.error('Workflow execution error:', error);
      throw error;
    }
  }

  async getWorkflowStatus(executionId) {
    try {
      const response = await fetch(`${this.apiEndpoint}/workflow/${executionId}/status`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }

      return result.status;
    } catch (error) {
      console.error('Status check error:', error);
      throw error;
    }
  }
}

// React Component Example
function ContentAnalyzerComponent() {
  const [content, setContent] = React.useState('');
  const [analysis, setAnalysis] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const integration = new ReactIntegration();

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError('Please enter some content to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await integration.analyzeContent(content, {
        extractTopics: true,
        analyzeSentiment: true
      });
      
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return React.createElement('div', { className: 'content-analyzer' }, [
    React.createElement('h2', { key: 'title' }, 'Content Analyzer'),
    React.createElement('textarea', {
      key: 'textarea',
      value: content,
      onChange: (e) => setContent(e.target.value),
      placeholder: 'Enter content to analyze...',
      rows: 6,
      style: { width: '100%', marginBottom: '10px' }
    }),
    React.createElement('button', {
      key: 'analyze-btn',
      onClick: handleAnalyze,
      disabled: loading,
      style: { 
        padding: '10px 20px', 
        backgroundColor: loading ? '#ccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer'
      }
    }, loading ? 'Analyzing...' : 'Analyze Content'),
    
    error && React.createElement('div', {
      key: 'error',
      style: { color: 'red', marginTop: '10px' }
    }, `Error: ${error}`),
    
    analysis && React.createElement('div', {
      key: 'results',
      style: { marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }
    }, [
      React.createElement('h3', { key: 'results-title' }, 'Analysis Results'),
      React.createElement('p', { key: 'quality' }, `Quality Score: ${analysis.quality?.score || 'N/A'}`),
      React.createElement('p', { key: 'sentiment' }, `Sentiment: ${analysis.sentiment?.sentiment || 'N/A'}`),
      React.createElement('div', { key: 'topics' }, [
        React.createElement('h4', { key: 'topics-title' }, 'Topics:'),
        React.createElement('ul', { key: 'topics-list' }, 
          (analysis.topics || []).map((topic, index) => 
            React.createElement('li', { key: index }, `${topic.name} (${topic.relevance.toFixed(2)})`)
          )
        )
      ]),
      React.createElement('div', { key: 'keywords' }, [
        React.createElement('h4', { key: 'keywords-title' }, 'Keywords:'),
        React.createElement('p', { key: 'keywords-list' }, 
          (analysis.keywords || []).slice(0, 5).map(k => k.word).join(', ')
        )
      ])
    ])
  ]);
}

// Example 3: Python Integration (Documentation)
const PythonIntegrationDocs = `
# Python Integration Example

import requests
import json

class PythonIntegration:
    def __init__(self, api_endpoint="http://localhost:3000/api"):
        self.api_endpoint = api_endpoint

    async def analyze_content(self, content, options=None):
        """Analyze content using the 100-layer system"""
        url = f"{self.api_endpoint}/analyze"
        payload = {
            "content": content,
            "options": options or {}
        }
        
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            result = response.json()
            
            if not result.get("success"):
                raise Exception(result.get("error", "Unknown error"))
                
            return result.get("result")
        except requests.exceptions.RequestException as e:
            raise Exception(f"API request failed: {str(e)}")

    async def execute_workflow(self, workflow_id, data, options=None):
        """Execute a workflow"""
        url = f"{self.api_endpoint}/workflow/execute"
        payload = {
            "workflowId": workflow_id,
            "data": data,
            "options": options or {}
        }
        
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            result = response.json()
            
            if not result.get("success"):
                raise Exception(result.get("error", "Unknown error"))
                
            return result
        except requests.exceptions.RequestException as e:
            raise Exception(f"Workflow execution failed: {str(e)}")

    async def get_workflow_status(self, execution_id):
        """Get workflow execution status"""
        url = f"{self.api_endpoint}/workflow/{execution_id}/status"
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            result = response.json()
            
            if not result.get("success"):
                raise Exception(result.get("error", "Unknown error"))
                
            return result.get("status")
        except requests.exceptions.RequestException as e:
            raise Exception(f"Status check failed: {str(e)}")

# Python usage example
async def python_usage_example():
    """Example usage in Python"""
    client = PythonIntegration()
    
    # Analyze content
    content = "Đây là nội dung mẫu để phân tích bằng hệ thống 100 tầng."
    analysis = await client.analyze_content(content, {
        "extractTopics": True,
        "analyzeSentiment": True
    })
    
    print(f"Analysis result: {analysis}")
    
    # Execute workflow
    workflow_result = await client.execute_workflow(
        "sample_workflow",
        {"content": content},
        {"priority": "high"}
    )
    
    print(f"Workflow result: {workflow_result}")
`;

# Example 4: Docker Integration
class DockerIntegration {
  static createDockerfile() {
    return `
# Multi-stage Dockerfile for 100-layer system
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY lib/ ./lib/
COPY dist/ ./dist/

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Create directories
RUN mkdir -p /app/data /app/logs
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node dist/health-check.js

CMD ["node", "dist/server.js"]
    `.trim();
  }

  static createDockerCompose() {
    return `
version: '3.8'

services:
  # 100-layer system API
  hundred-layer-api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=postgres
      - REDIS_HOST=redis
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    networks:
      - app-network

  # PostgreSQL database
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=hundredlayer
      - POSTGRES_USER=hundredlayer
      - POSTGRES_PASSWORD=hundredlayer123
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped
    networks:
      - app-network

  # Redis cache
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - app-network

  # Nginx reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - hundred-layer-api
    restart: unless-stopped
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
    `.trim();
  }

  static createNginxConfig() {
    return `
events {
    worker_connections 1024;
}

http {
    upstream hundred-layer-api {
        server hundred-layer-api:3000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://hundred-layer-api;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /health {
            proxy_pass http://hundred-layer-api/health;
            access_log off;
        }
    }

    # HTTPS configuration (uncomment and configure)
    # server {
    #     listen 443 ssl;
    #     server_name localhost;
    #
    #     ssl_certificate /etc/nginx/ssl/cert.pem;
    #     ssl_certificate_key /etc/nginx/ssl/key.pem;
    #
    #     location / {
    #         proxy_pass http://hundred-layer-api;
    #         proxy_set_header Host \$host;
    #         proxy_set_header X-Real-IP \$remote_addr;
    #         proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    #         proxy_set_header X-Forwarded-Proto \$scheme;
    #     }
    # }
}
    `.trim();
  }
}

// Example 5: Microservices Integration
class MicroservicesIntegration {
  constructor() {
    this.services = new Map();
    this.registry = new Map();
  }

  registerService(name, config) {
    const service = {
      name: name,
      url: config.url,
      healthEndpoint: config.healthEndpoint || '/health',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      circuitBreaker: {
        enabled: config.circuitBreaker || false,
        threshold: config.circuitBreakerThreshold || 5,
        timeout: config.circuitBreakerTimeout || 60000
      }
    };

    this.services.set(name, service);
    this.registry.set(name, {
      ...service,
      status: 'unknown',
      lastCheck: null,
      failures: 0
    });

    console.log(`✅ Registered service: ${name}`);
  }

  async checkServiceHealth(serviceName) {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service not found: ${serviceName}`);
    }

    const registry = this.registry.get(serviceName);
    
    try {
      const response = await fetch(`${service.url}${service.healthEndpoint}`, {
        method: 'GET',
        timeout: service.timeout
      });

      if (response.ok) {
        registry.status = 'healthy';
        registry.failures = 0;
        registry.lastCheck = Date.now();
        return true;
      } else {
        throw new Error(`Health check failed: ${response.status}`);
      }
    } catch (error) {
      registry.status = 'unhealthy';
      registry.failures += 1;
      registry.lastCheck = Date.now();
      
      console.error(`Health check failed for ${serviceName}:`, error.message);
      return false;
    }
  }

  async callService(serviceName, endpoint, options = {}) {
    const service = this.services.get(serviceName);
    const registry = this.registry.get(serviceName);
    
    if (!service) {
      throw new Error(`Service not found: ${serviceName}`);
    }

    // Circuit breaker check
    if (service.circuitBreaker.enabled && 
        registry.failures >= service.circuitBreaker.threshold) {
      throw new Error(`Circuit breaker open for service: ${serviceName}`);
    }

    const url = `${service.url}${endpoint}`;
    const requestOptions = {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      timeout: options.timeout || service.timeout
    };

    let lastError;
    
    for (let attempt = 1; attempt <= service.retries; attempt++) {
      try {
        const response = await fetch(url, requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        
        // Reset failures on success
        registry.failures = 0;
        
        return result;
      } catch (error) {
        lastError = error;
        registry.failures += 1;
        
        console.error(`Attempt ${attempt} failed for ${serviceName}:`, error.message);
        
        if (attempt < service.retries) {
          // Exponential backoff
          const delay = Math.pow(2, attempt - 1) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  }

  async analyzeContentViaService(content, options = {}) {
    return await this.callService('content-analyzer', '/analyze', {
      body: { content, options }
    });
  }

  async executeWorkflowViaService(workflowId, data, options = {}) {
    return await this.callService('workflow-engine', '/workflow/execute', {
      body: { workflowId, data, options }
    });
  }

  async getAllServiceStatus() {
    const status = {};
    
    for (const [serviceName] of this.services) {
      try {
        await this.checkServiceHealth(serviceName);
        status[serviceName] = this.registry.get(serviceName);
      } catch (error) {
        status[serviceName] = {
          ...this.registry.get(serviceName),
          error: error.message
        };
      }
    }
    
    return status;
  }
}

// Example 6: Custom Integration Wrapper
class CustomIntegrationWrapper {
  constructor(config = {}) {
    this.config = {
      apiEndpoint: config.apiEndpoint || 'http://localhost:3000/api',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      apiKey: config.apiKey,
      customHeaders: config.customHeaders || {},
      ...config
    };
    
    this.cache = new Map();
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0
    };
  }

  async request(endpoint, options = {}) {
    const startTime = Date.now();
    this.metrics.totalRequests++;

    try {
      const url = `${this.config.apiEndpoint}${endpoint}`;
      const requestOptions = {
        method: options.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
          ...this.config.customHeaders,
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      };

      // Check cache for GET requests
      if (options.method === 'GET' && options.cacheKey) {
        const cached = this.cache.get(options.cacheKey);
        if (cached && (Date.now() - cached.timestamp) < (options.cacheTime || 300000)) {
          return cached.data;
        }
      }

      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Cache GET requests
      if (options.method === 'GET' && options.cacheKey) {
        this.cache.set(options.cacheKey, {
          data: result,
          timestamp: Date.now()
        });
      }

      this.metrics.successfulRequests++;
      
      // Update response time metrics
      const responseTime = Date.now() - startTime;
      this.metrics.averageResponseTime = 
        (this.metrics.averageResponseTime * (this.metrics.successfulRequests - 1) + responseTime) / 
        this.metrics.successfulRequests;

      return result;
    } catch (error) {
      this.metrics.failedRequests++;
      console.error(`Request failed for ${endpoint}:`, error.message);
      throw error;
    }
  }

  async analyzeContent(content, options = {}) {
    return await this.request('/analyze', {
      body: { content, options }
    });
  }

  async executeWorkflow(workflowId, data, options = {}) {
    return await this.request('/workflow/execute', {
      body: { workflowId, data, options }
    });
  }

  getMetrics() {
    return {
      ...this.metrics,
      successRate: this.metrics.totalRequests > 0 ? 
        (this.metrics.successfulRequests / this.metrics.totalRequests) * 100 : 0,
      cacheSize: this.cache.size
    };
  }

  clearCache() {
    this.cache.clear();
    console.log('Cache cleared');
  }
}

//// Export all integration examples
module.exports = {
  BasicNodeIntegration,
  ReactIntegration,
  ContentAnalyzerComponent,
  PythonIntegrationDocs,
  DockerIntegration,
  MicroservicesIntegration,
  CustomIntegrationWrapper
};

// Example usage
if (require.main === module) {
  // Start basic Node.js integration
  const server = new BasicNodeIntegration();
  server.start(3000);
}
