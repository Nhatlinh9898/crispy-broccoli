// Resource-Adaptive Neural Network
// Hệ thống mạng neuron tự động điều chỉnh theo tài nguyên phần cứng

class ResourceDetector {
  constructor() {
    this.systemInfo = {
      cpu: {
        cores: 0,
        threads: 0,
        architecture: 'unknown',
        speed: 0
      },
      memory: {
        total: 0,
        available: 0,
        used: 0
      },
      gpu: {
        available: false,
        memory: 0,
        computeCapability: 0,
        name: 'unknown'
      }
    };
  }

  async detectSystemResources() {
    // Detect CPU info
    this.detectCPUInfo();
    
    // Detect Memory info
    this.detectMemoryInfo();
    
    // Detect GPU info
    await this.detectGPUInfo();
    
    return this.systemInfo;
  }

  detectCPUInfo() {
    // Simplified CPU detection (in real implementation would use system APIs)
    const navigatorCores = navigator.hardwareConcurrency || 4;
    this.systemInfo.cpu = {
      cores: navigatorCores,
      threads: navigatorCores, // Simplified
      architecture: this.detectArchitecture(),
      speed: this.estimateCPUSpeed()
    };
  }

  detectArchitecture() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('x86_64') || userAgent.includes('x64')) return 'x64';
    if (userAgent.includes('arm') || userAgent.includes('aarch64')) return 'arm';
    return 'unknown';
  }

  estimateCPUSpeed() {
    // Simple benchmark to estimate CPU speed
    const start = performance.now();
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += Math.sqrt(i);
    }
    const end = performance.now();
    const time = end - start;
    
    // Normalize to GHz (very rough estimate)
    return Math.max(1.0, Math.min(4.0, 10.0 / time));
  }

  detectMemoryInfo() {
    // Simplified memory detection
    if (performance.memory) {
      this.systemInfo.memory = {
        total: performance.memory.totalJSHeapSize,
        available: performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize,
        used: performance.memory.usedJSHeapSize
      };
    } else {
      // Fallback estimates based on typical systems
      this.systemInfo.memory = {
        total: 2 * 1024 * 1024 * 1024, // 2GB default
        available: 1.5 * 1024 * 1024 * 1024, // 1.5GB available
        used: 0.5 * 1024 * 1024 * 1024 // 0.5GB used
      };
    }
  }

  async detectGPUInfo() {
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        
        // Parse GPU info from renderer string
        this.systemInfo.gpu = this.parseGPUInfo(renderer, vendor);
      }
    }
  }

  parseGPUInfo(renderer, vendor) {
    const gpuInfo = {
      available: true,
      memory: 0,
      computeCapability: 0,
      name: renderer
    };

    // Detect GPU type and memory from renderer string
    const lowerRenderer = renderer.toLowerCase();
    
    if (lowerRenderer.includes('nvidia') || lowerRenderer.includes('geforce')) {
      // NVIDIA GPU detection
      if (lowerRenderer.includes('1060')) {
        gpuInfo.memory = 6 * 1024 * 1024 * 1024; // 6GB
        gpuInfo.computeCapability = 6.1;
      } else if (lowerRenderer.includes('1050') || lowerRenderer.includes('1050 ti')) {
        gpuInfo.memory = 2 * 1024 * 1024 * 1024; // 2GB
        gpuInfo.computeCapability = 6.1;
      } else if (lowerRenderer.includes('1030')) {
        gpuInfo.memory = 2 * 1024 * 1024 * 1024; // 2GB
        gpuInfo.computeCapability = 6.1;
      } else if (lowerRenderer.includes('1650')) {
        gpuInfo.memory = 4 * 1024 * 1024 * 1024; // 4GB
        gpuInfo.computeCapability = 7.5;
      } else {
        gpuInfo.memory = 2 * 1024 * 1024 * 1024; // Default 2GB
        gpuInfo.computeCapability = 6.0;
      }
    } else if (lowerRenderer.includes('radeon') || lowerRenderer.includes('amd')) {
      // AMD GPU detection
      if (lowerRenderer.includes('rx 580') || lowerRenderer.includes('rx 570')) {
        gpuInfo.memory = 8 * 1024 * 1024 * 1024; // 8GB
        gpuInfo.computeCapability = 5.0;
      } else if (lowerRenderer.includes('rx 560') || lowerRenderer.includes('rx 550')) {
        gpuInfo.memory = 4 * 1024 * 1024 * 1024; // 4GB
        gpuInfo.computeCapability = 5.0;
      } else {
        gpuInfo.memory = 2 * 1024 * 1024 * 1024; // Default 2GB
        gpuInfo.computeCapability = 4.0;
      }
    } else if (lowerRenderer.includes('intel')) {
      // Intel integrated graphics
      gpuInfo.memory = 1 * 1024 * 1024 * 1024; // 1GB shared memory
      gpuInfo.computeCapability = 3.0;
    } else {
      // Unknown GPU
      gpuInfo.memory = 2 * 1024 * 1024 * 1024; // Default 2GB
      gpuInfo.computeCapability = 4.0;
    }

    return gpuInfo;
  }

  getResourceConstraints() {
    const constraints = {
      maxParameters: 0,
      maxBatchSize: 1,
      maxSequenceLength: 512,
      useGPU: false,
      memoryLimit: 0,
      parallelWorkers: 1
    };

    // Calculate constraints based on available resources
    const availableMemory = this.systemInfo.memory.available;
    const cpuCores = this.systemInfo.cpu.cores;
    const gpuMemory = this.systemInfo.gpu.memory;

    // Memory constraints
    if (availableMemory < 1 * 1024 * 1024 * 1024) { // < 1GB
      constraints.maxParameters = 100000; // 100K parameters
      constraints.maxBatchSize = 1;
      constraints.maxSequenceLength = 128;
    } else if (availableMemory < 2 * 1024 * 1024 * 1024) { // < 2GB
      constraints.maxParameters = 500000; // 500K parameters
      constraints.maxBatchSize = 2;
      constraints.maxSequenceLength = 256;
    } else if (availableMemory < 4 * 1024 * 1024 * 1024) { // < 4GB
      constraints.maxParameters = 2000000; // 2M parameters
      constraints.maxBatchSize = 4;
      constraints.maxSequenceLength = 512;
    } else {
      constraints.maxParameters = 10000000; // 10M parameters
      constraints.maxBatchSize = 8;
      constraints.maxSequenceLength = 1024;
    }

    // CPU constraints
    constraints.parallelWorkers = Math.max(1, Math.min(cpuCores, 4));

    // GPU constraints
    if (this.systemInfo.gpu.available && gpuMemory >= 2 * 1024 * 1024 * 1024) {
      constraints.useGPU = true;
      constraints.maxBatchSize = Math.min(constraints.maxBatchSize * 2, 16);
    }

    constraints.memoryLimit = availableMemory * 0.7; // Use 70% of available memory

    return constraints;
  }
}

class ResourceAdaptiveLayer {
  constructor(config, resourceConstraints) {
    this.config = config;
    this.constraints = resourceConstraints;
    this.originalConfig = { ...config };
    this.adaptedConfig = this.adaptConfig(config);
  }

  adaptConfig(originalConfig) {
    const adapted = { ...originalConfig };

    // Adapt layer size based on memory constraints
    if (adapted.inputSize && adapted.outputSize) {
      const maxParams = Math.floor(this.constraints.maxParameters / 10); // Reserve 90% for other layers
      
      // Calculate current parameters
      let currentParams;
      switch (originalConfig.type) {
        case 'dense':
          currentParams = adapted.inputSize * adapted.outputSize + adapted.outputSize;
          break;
        case 'lstm':
          const combinedSize = adapted.inputSize + (adapted.hiddenSize || adapted.outputSize);
          currentParams = combinedSize * (adapted.hiddenSize || adapted.outputSize) * 4;
          break;
        case 'attention':
          currentParams = adapted.inputSize * (adapted.keySize || adapted.outputSize) * 3;
          break;
        default:
          currentParams = adapted.inputSize * adapted.outputSize;
      }

      // Reduce size if exceeding limits
      if (currentParams > maxParams) {
        const scaleFactor = Math.sqrt(maxParams / currentParams);
        adapted.outputSize = Math.max(1, Math.floor(adapted.outputSize * scaleFactor));
        
        if (adapted.hiddenSize) {
          adapted.hiddenSize = Math.max(1, Math.floor(adapted.hiddenSize * scaleFactor));
        }
        if (adapted.keySize) {
          adapted.keySize = Math.max(1, Math.floor(adapted.keySize * scaleFactor));
        }
        if (adapted.valueSize) {
          adapted.valueSize = Math.max(1, Math.floor(adapted.valueSize * scaleFactor));
        }
      }
    }

    // Adapt batch size
    adapted.batchSize = Math.min(originalConfig.batchSize || 1, this.constraints.maxBatchSize);

    // Adapt sequence length
    if (adapted.sequenceLength) {
      adapted.sequenceLength = Math.min(adapted.sequenceLength, this.constraints.maxSequenceLength);
    }

    // Enable/disable features based on resources
    adapted.useMomentum = this.constraints.maxParameters > 100000;
    adapted.useBatchNorm = this.constraints.maxParameters > 500000;
    adapted.useDropout = this.constraints.maxParameters > 200000;

    return adapted;
  }

  getAdaptedConfig() {
    return this.adaptedConfig;
  }

  getResourceUsage() {
    let paramCount = 0;
    let memoryUsage = 0;

    switch (this.adaptedConfig.type) {
      case 'dense':
        paramCount = this.adaptedConfig.inputSize * this.adaptedConfig.outputSize + this.adaptedConfig.outputSize;
        break;
      case 'lstm':
        const combinedSize = this.adaptedConfig.inputSize + this.adaptedConfig.hiddenSize;
        paramCount = combinedSize * this.adaptedConfig.hiddenSize * 4;
        break;
      case 'attention':
        paramCount = this.adaptedConfig.inputSize * (this.adaptedConfig.keySize || this.adaptedConfig.outputSize) * 3;
        break;
      case 'convolutional':
        paramCount = this.adaptedConfig.numFilters * this.adaptedConfig.kernelSize * this.adaptedConfig.kernelSize + this.adaptedConfig.numFilters;
        break;
      case 'batchnorm':
        paramCount = this.adaptedConfig.inputSize * 2;
        break;
      case 'dropout':
        paramCount = 0;
        break;
      default:
        paramCount = this.adaptedConfig.inputSize * this.adaptedConfig.outputSize;
    }

    memoryUsage = paramCount * 4; // 4 bytes per parameter

    return {
      parameters: paramCount,
      memoryBytes: memoryUsage,
      memoryFormatted: this.formatMemory(memoryUsage),
      percentageOfLimit: (paramCount / this.constraints.maxParameters * 100).toFixed(2)
    };
  }

  formatMemory(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }
}

class ResourceAdaptiveNetwork {
  constructor(config = {}) {
    this.config = config;
    this.resourceDetector = new ResourceDetector();
    this.constraints = null;
    this.layers = [];
    this.adaptedLayers = [];
    this.totalParameters = 0;
    this.totalMemoryUsage = 0;
  }

  async initialize() {
    // Detect system resources
    await this.resourceDetector.detectSystemResources();
    this.constraints = this.resourceDetector.getResourceConstraints();
    
    console.log('🖥️ System Resource Detection:');
    console.log(`   CPU: ${this.resourceDetector.systemInfo.cpu.cores} cores @ ${this.resourceDetector.systemInfo.cpu.speed.toFixed(2)}GHz`);
    console.log(`   Memory: ${this.formatMemory(this.resourceDetector.systemInfo.memory.total)} total, ${this.formatMemory(this.resourceDetector.systemInfo.memory.available)} available`);
    console.log(`   GPU: ${this.resourceDetector.systemInfo.gpu.available ? this.resourceDetector.systemInfo.gpu.name : 'Not available'}`);
    if (this.resourceDetector.systemInfo.gpu.available) {
      console.log(`   GPU Memory: ${this.formatMemory(this.resourceDetector.systemInfo.gpu.memory)}`);
    }
    
    console.log('\n⚙️ Resource Constraints:');
    console.log(`   Max Parameters: ${this.constraints.maxParameters.toLocaleString()}`);
    console.log(`   Max Batch Size: ${this.constraints.maxBatchSize}`);
    console.log(`   Max Sequence Length: ${this.constraints.maxSequenceLength}`);
    console.log(`   Use GPU: ${this.constraints.useGPU}`);
    console.log(`   Parallel Workers: ${this.constraints.parallelWorkers}`);
    console.log(`   Memory Limit: ${this.formatMemory(this.constraints.memoryLimit)}`);

    return this.constraints;
  }

  addLayer(layerConfig) {
    const adaptiveLayer = new ResourceAdaptiveLayer(layerConfig, this.constraints);
    this.layers.push(adaptiveLayer);
    this.updateResourceUsage();
    return this;
  }

  updateResourceUsage() {
    this.totalParameters = 0;
    this.totalMemoryUsage = 0;

    this.layers.forEach(layer => {
      const usage = layer.getResourceUsage();
      this.totalParameters += usage.parameters;
      this.totalMemoryUsage += usage.memoryBytes;
    });
  }

  optimizeForResources() {
    console.log('\n🔧 Optimizing Network for Available Resources...');

    let iterations = 0;
    const maxIterations = 10;

    while (this.totalParameters > this.constraints.maxParameters && iterations < maxIterations) {
      console.log(`   Iteration ${iterations + 1}: Total parameters ${this.totalParameters.toLocaleString()} > limit ${this.constraints.maxParameters.toLocaleString()}`);
      
      // Find the layer with most parameters
      let maxLayerIndex = 0;
      let maxParams = 0;
      
      this.layers.forEach((layer, index) => {
        const usage = layer.getResourceUsage();
        if (usage.parameters > maxParams) {
          maxParams = usage.parameters;
          maxLayerIndex = index;
        }
      });

      // Reduce the size of the largest layer
      const targetLayer = this.layers[maxLayerIndex];
      const currentConfig = targetLayer.getAdaptedConfig();
      
      // Reduce output size by 20%
      const reductionFactor = 0.8;
      currentConfig.outputSize = Math.max(1, Math.floor(currentConfig.outputSize * reductionFactor));
      
      if (currentConfig.hiddenSize) {
        currentConfig.hiddenSize = Math.max(1, Math.floor(currentConfig.hiddenSize * reductionFactor));
      }
      if (currentConfig.keySize) {
        currentConfig.keySize = Math.max(1, Math.floor(currentConfig.keySize * reductionFactor));
      }
      if (currentConfig.valueSize) {
        currentConfig.valueSize = Math.max(1, Math.floor(currentConfig.valueSize * reductionFactor));
      }

      // Re-adapt the layer
      this.layers[maxLayerIndex] = new ResourceAdaptiveLayer(currentConfig, this.constraints);
      this.updateResourceUsage();
      
      iterations++;
    }

    if (iterations >= maxIterations) {
      console.log('   ⚠️ Could not optimize within parameter limit, removing layers...');
      this.removeExcessLayers();
    }

    console.log(`   ✅ Optimization complete: ${this.totalParameters.toLocaleString()} parameters (${this.formatMemory(this.totalMemoryUsage)})`);
  }

  removeExcessLayers() {
    // Remove layers from the end until within limits
    while (this.totalParameters > this.constraints.maxParameters && this.layers.length > 1) {
      const removedLayer = this.layers.pop();
      const usage = removedLayer.getResourceUsage();
      this.totalParameters -= usage.parameters;
      this.totalMemoryUsage -= usage.memoryBytes;
      console.log(`   🗑️ Removed layer: ${usage.parameters.toLocaleString()} parameters`);
    }
  }

  generateOptimizedArchitecture() {
    const architecture = {
      inputSize: this.layers[0]?.adaptedConfig.inputSize || 10,
      layers: [],
      totalParameters: this.totalParameters,
      totalMemoryUsage: this.totalMemoryUsage,
      constraints: this.constraints,
      systemInfo: this.resourceDetector.systemInfo
    };

    this.layers.forEach((layer, index) => {
      const config = layer.getAdaptedConfig();
      const usage = layer.getResourceUsage();
      
      architecture.layers.push({
        index: index,
        type: config.type,
        inputSize: config.inputSize,
        outputSize: config.outputSize,
        parameters: usage.parameters,
        memoryUsage: usage.memoryBytes,
        percentageOfLimit: usage.percentageOfLimit,
        adaptations: this.getAdaptations(config)
      });
    });

    return architecture;
  }

  getAdaptations(config) {
    const adaptations = [];
    
    if (config.outputSize < this.originalConfig.outputSize) {
      adaptations.push(`Reduced output size: ${this.originalConfig.outputSize} → ${config.outputSize}`);
    }
    
    if (config.batchSize < (this.originalConfig.batchSize || 1)) {
      adaptations.push(`Reduced batch size: ${this.originalConfig.batchSize || 1} → ${config.batchSize}`);
    }
    
    if (config.sequenceLength < (this.originalConfig.sequenceLength || 512)) {
      adaptations.push(`Reduced sequence length: ${this.originalConfig.sequenceLength || 512} → ${config.sequenceLength}`);
    }
    
    if (!config.useMomentum && this.originalConfig.useMomentum) {
      adaptations.push('Disabled momentum optimization');
    }
    
    if (!config.useBatchNorm && this.originalConfig.useBatchNorm) {
      adaptations.push('Disabled batch normalization');
    }
    
    if (!config.useDropout && this.originalConfig.useDropout) {
      adaptations.push('Disabled dropout');
    }

    return adaptations.length > 0 ? adaptations : ['No adaptations needed'];
  }

  formatMemory(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }

  printArchitecture() {
    const architecture = this.generateOptimizedArchitecture();
    
    console.log('\n🏗️ OPTIMIZED NEURAL NETWORK ARCHITECTURE');
    console.log('='.repeat(60));
    
    console.log(`\n📊 Network Summary:`);
    console.log(`   Total Layers: ${architecture.layers.length}`);
    console.log(`   Total Parameters: ${architecture.totalParameters.toLocaleString()}`);
    console.log(`   Memory Usage: ${this.formatMemory(architecture.totalMemoryUsage)}`);
    console.log(`   Parameter Limit: ${architecture.constraints.maxParameters.toLocaleString()}`);
    console.log(`   Utilization: ${(architecture.totalParameters / architecture.constraints.maxParameters * 100).toFixed(1)}%`);
    
    console.log(`\n📋 Layer Details:`);
    architecture.layers.forEach(layer => {
      console.log(`\n   Layer ${layer.index + 1}: ${layer.type.toUpperCase()}`);
      console.log(`     Shape: ${layer.inputSize} → ${layer.outputSize}`);
      console.log(`     Parameters: ${layer.parameters.toLocaleString()} (${layer.percentageOfLimit}% of limit)`);
      console.log(`     Memory: ${this.formatMemory(layer.memoryUsage)}`);
      
      if (layer.adaptations.length > 0) {
        console.log(`     Adaptations: ${layer.adaptations.join(', ')}`);
      }
    });
    
    console.log(`\n💡 Performance Recommendations:`);
    this.generateRecommendations(architecture);
  }

  generateRecommendations(architecture) {
    const recommendations = [];
    
    // Memory recommendations
    if (architecture.totalMemoryUsage > architecture.constraints.memoryLimit * 0.8) {
      recommendations.push('Consider reducing model size further for better performance');
    }
    
    // CPU recommendations
    if (architecture.systemInfo.cpu.cores <= 2) {
      recommendations.push('Use smaller batch sizes for better CPU utilization');
    }
    
    // GPU recommendations
    if (!architecture.constraints.useGPU && architecture.systemInfo.gpu.available) {
      recommendations.push('GPU acceleration is available but disabled due to memory constraints');
    }
    
    // Parameter efficiency
    if (architecture.totalParameters < architecture.constraints.maxParameters * 0.5) {
      recommendations.push('Model is significantly smaller than resource limit - consider adding more layers');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Model is well-optimized for available resources');
    }
    
    recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }
}

// Demo function
async function demonstrateResourceAdaptiveNetwork() {
  console.log('🎯 RESOURCE-ADAPTIVE NEURAL NETWORK DEMO\n');
  
  const adaptiveNetwork = new ResourceAdaptiveNetwork();
  
  // Initialize and detect resources
  await adaptiveNetwork.initialize();
  
  // Add layers with original (large) configuration
  console.log('\n📝 Adding layers with original configuration...');
  
  adaptiveNetwork
    .addLayer({
      type: 'dense',
      inputSize: 512,
      outputSize: 256,
      activation: 'relu',
      batchSize: 32,
      useMomentum: true,
      useBatchNorm: true,
      useDropout: true
    })
    .addLayer({
      type: 'lstm',
      inputSize: 256,
      hiddenSize: 128,
      sequenceLength: 1024,
      batchSize: 32,
      useMomentum: true
    })
    .addLayer({
      type: 'attention',
      inputSize: 128,
      keySize: 64,
      valueSize: 64,
      sequenceLength: 1024,
      batchSize: 32
    })
    .addLayer({
      type: 'dense',
      inputSize: 128,
      outputSize: 64,
      activation: 'relu',
      useBatchNorm: true,
      useDropout: true
    })
    .addLayer({
      type: 'dense',
      inputSize: 64,
      outputSize: 10,
      activation: 'softmax'
    });

  // Optimize for available resources
  adaptiveNetwork.optimizeForResources();
  
  // Print the optimized architecture
  adaptiveNetwork.printArchitecture();
  
  console.log('\n✅ Resource-adaptive network demo completed');
}

// Export functions
module.exports = {
  ResourceDetector,
  ResourceAdaptiveLayer,
  ResourceAdaptiveNetwork,
  demonstrateResourceAdaptiveNetwork
};

// Run demo if executed directly
if (require.main === module) {
  demonstrateResourceAdaptiveNetwork();
}
