// Neural Network Parameter Analysis
// Phân tích số lượng tham số của từng tầng neuron

class ParameterAnalyzer {
  constructor() {
    this.layerStats = new Map();
  }

  // Phân tích số lượng tham số cho Dense Layer
  analyzeDenseLayer(layer) {
    const inputSize = layer.inputSize;
    const outputSize = layer.outputSize;
    
    const weights = inputSize * outputSize;
    const biases = outputSize;
    const totalParams = weights + biases;
    
    // Thêm các tham số cho optimization
    const velocityWeights = weights; // momentum weights
    const velocityBiases = biases; // momentum biases
    const optimizationParams = velocityWeights + velocityBiases;
    
    const analysis = {
      layerType: 'Dense',
      inputSize: inputSize,
      outputSize: outputSize,
      weights: weights,
      biases: biases,
      totalParams: totalParams,
      optimizationParams: optimizationParams,
      memoryUsage: this.calculateMemoryUsage(totalParams + optimizationParams),
      breakdown: {
        weightMatrix: `${inputSize} × ${outputSize} = ${weights.toLocaleString()}`,
        biasVector: `${outputSize} = ${biases.toLocaleString()}`,
        momentumWeights: `${weights.toLocaleString()}`,
        momentumBiases: `${biases.toLocaleString()}`
      }
    };
    
    this.layerStats.set(layer.layerId || 'unknown', analysis);
    return analysis;
  }

  // Phân tích số lượng tham số cho Convolutional Layer
  analyzeConvolutionalLayer(layer) {
    const inputSize = layer.inputSize;
    const outputSize = layer.outputSize;
    const kernelSize = layer.kernelSize;
    const numFilters = layer.numFilters;
    
    // Convolution kernels: numFilters × kernelSize × kernelSize
    const kernelParams = numFilters * kernelSize * kernelSize;
    const biases = numFilters; // One bias per filter
    const totalParams = kernelParams + biases;
    
    // Optimization parameters
    const velocityKernels = kernelParams;
    const velocityBiases = biases;
    const optimizationParams = velocityKernels + velocityBiases;
    
    const analysis = {
      layerType: 'Convolutional',
      inputSize: inputSize,
      outputSize: outputSize,
      kernelSize: kernelSize,
      numFilters: numFilters,
      kernelParams: kernelParams,
      biases: biases,
      totalParams: totalParams,
      optimizationParams: optimizationParams,
      memoryUsage: this.calculateMemoryUsage(totalParams + optimizationParams),
      breakdown: {
        kernels: `${numFilters} × ${kernelSize} × ${kernelSize} = ${kernelParams.toLocaleString()}`,
        biases: `${numFilters} = ${biases.toLocaleString()}`,
        velocityKernels: `${kernelParams.toLocaleString()}`,
        velocityBiases: `${biases.toLocaleString()}`
      }
    };
    
    this.layerStats.set(layer.layerId || 'unknown', analysis);
    return analysis;
  }

  // Phân tích số lượng tham số cho LSTM Layer
  analyzeLSTMLayer(layer) {
    const inputSize = layer.inputSize;
    const hiddenSize = layer.hiddenSize;
    const combinedSize = inputSize + hiddenSize;
    
    // LSTM có 4 gates: forget, input, output, cell
    // Mỗi gate có weights và biases
    const gates = 4;
    
    // Weights cho mỗi gate: combinedSize × hiddenSize
    const weightsPerGate = combinedSize * hiddenSize;
    const totalWeights = weightsPerGate * gates;
    
    // Biases cho mỗi gate: hiddenSize
    const biasesPerGate = hiddenSize;
    const totalBiases = biasesPerGate * gates;
    
    // Hidden state và cell state (không phải tham số học)
    const stateParams = hiddenSize * 2; // hidden + cell
    
    const totalParams = totalWeights + totalBiases;
    
    // Optimization parameters
    const velocityWeights = totalWeights;
    const velocityBiases = totalBiases;
    const optimizationParams = velocityWeights + velocityBiases;
    
    const analysis = {
      layerType: 'LSTM',
      inputSize: inputSize,
      hiddenSize: hiddenSize,
      combinedSize: combinedSize,
      gates: gates,
      weightsPerGate: weightsPerGate,
      biasesPerGate: biasesPerGate,
      totalWeights: totalWeights,
      totalBiases: totalBiases,
      totalParams: totalParams,
      stateParams: stateParams,
      optimizationParams: optimizationParams,
      memoryUsage: this.calculateMemoryUsage(totalParams + optimizationParams + stateParams),
      breakdown: {
        forgetGate: `${combinedSize} × ${hiddenSize} = ${weightsPerGate.toLocaleString()} weights + ${hiddenSize} biases`,
        inputGate: `${combinedSize} × ${hiddenSize} = ${weightsPerGate.toLocaleString()} weights + ${hiddenSize} biases`,
        outputGate: `${combinedSize} × ${hiddenSize} = ${weightsPerGate.toLocaleString()} weights + ${hiddenSize} biases`,
        cellGate: `${combinedSize} × ${hiddenSize} = ${weightsPerGate.toLocaleString()} weights + ${hiddenSize} biases`,
        hiddenState: `${hiddenSize} parameters`,
        cellState: `${hiddenSize} parameters`
      }
    };
    
    this.layerStats.set(layer.layerId || 'unknown', analysis);
    return analysis;
  }

  // Phân tích số lượng tham số cho Attention Layer
  analyzeAttentionLayer(layer) {
    const inputSize = layer.inputSize;
    const keySize = layer.keySize || inputSize;
    const valueSize = layer.valueSize || inputSize;
    
    // Query, Key, Value projection matrices
    const queryWeights = inputSize * keySize;
    const keyWeights = inputSize * keySize;
    const valueWeights = inputSize * valueSize;
    
    // Biases cho mỗi projection
    const queryBiases = keySize;
    const keyBiases = keySize;
    const valueBiases = valueSize;
    
    const totalWeights = queryWeights + keyWeights + valueWeights;
    const totalBiases = queryBiases + keyBiases + valueBiases;
    const totalParams = totalWeights + totalBiases;
    
    // Optimization parameters
    const optimizationParams = totalWeights + totalBiases;
    
    const analysis = {
      layerType: 'Attention',
      inputSize: inputSize,
      keySize: keySize,
      valueSize: valueSize,
      queryWeights: queryWeights,
      keyWeights: keyWeights,
      valueWeights: valueWeights,
      queryBiases: queryBiases,
      keyBiases: keyBiases,
      valueBiases: valueBiases,
      totalWeights: totalWeights,
      totalBiases: totalBiases,
      totalParams: totalParams,
      optimizationParams: optimizationParams,
      memoryUsage: this.calculateMemoryUsage(totalParams + optimizationParams),
      breakdown: {
        queryProjection: `${inputSize} × ${keySize} = ${queryWeights.toLocaleString()} weights + ${keyBiases} biases`,
        keyProjection: `${inputSize} × ${keySize} = ${keyWeights.toLocaleString()} weights + ${keyBiases} biases`,
        valueProjection: `${inputSize} × ${valueSize} = ${valueWeights.toLocaleString()} weights + ${valueBiases} biases`
      }
    };
    
    this.layerStats.set(layer.layerId || 'unknown', analysis);
    return analysis;
  }

  // Phân tích số lượng tham số cho Dropout Layer
  analyzeDropoutLayer(layer) {
    const inputSize = layer.inputSize;
    const outputSize = layer.outputSize;
    
    // Dropout layer không có tham số học (chỉ có dropout rate)
    const totalParams = 0;
    
    // Mask cho inference (không phải tham số học)
    const maskParams = inputSize;
    
    const analysis = {
      layerType: 'Dropout',
      inputSize: inputSize,
      outputSize: outputSize,
      dropoutRate: layer.dropoutRate,
      totalParams: totalParams,
      maskParams: maskParams,
      optimizationParams: 0,
      memoryUsage: this.calculateMemoryUsage(maskParams),
      breakdown: {
        learnableParams: '0 (no learnable parameters)',
        dropoutRate: layer.dropoutRate,
        maskStorage: `${maskParams} bytes for mask during training`
      }
    };
    
    this.layerStats.set(layer.layerId || 'unknown', analysis);
    return analysis;
  }

  // Phân tích số lượng tham số cho Batch Normalization Layer
  analyzeBatchNormLayer(layer) {
    const inputSize = layer.inputSize;
    const outputSize = layer.outputSize;
    
    // BatchNorm có 2 tham số học: gamma (scale) và beta (shift)
    const gamma = inputSize; // scale parameters
    const beta = inputSize; // shift parameters
    const totalParams = gamma + beta;
    
    // Running statistics (không phải tham số học)
    const runningMean = inputSize;
    const runningVar = inputSize;
    const statsParams = runningMean + runningVar;
    
    // Optimization parameters
    const optimizationParams = totalParams;
    
    const analysis = {
      layerType: 'BatchNormalization',
      inputSize: inputSize,
      outputSize: outputSize,
      gamma: gamma,
      beta: beta,
      runningMean: runningMean,
      runningVar: runningVar,
      totalParams: totalParams,
      statsParams: statsParams,
      optimizationParams: optimizationParams,
      memoryUsage: this.calculateMemoryUsage(totalParams + statsParams + optimizationParams),
      breakdown: {
        gamma: `${gamma} scale parameters`,
        beta: `${beta} shift parameters`,
        runningMean: `${runningMean} running mean parameters`,
        runningVar: `${runningVar} running variance parameters`
      }
    };
    
    this.layerStats.set(layer.layerId || 'unknown', analysis);
    return analysis;
  }

  // Tính toán memory usage (bytes)
  calculateMemoryUsage(paramCount) {
    // Mỗi parameter là 32-bit float = 4 bytes
    return paramCount * 4;
  }

  // Format memory usage sang đơn vị dễ đọc
  formatMemoryUsage(bytes) {
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

  // Phân tích toàn bộ network
  analyzeNetwork(network) {
    const networkAnalysis = {
      totalLayers: network.layers.length,
      totalParams: 0,
      totalOptimizationParams: 0,
      totalMemoryUsage: 0,
      layerAnalyses: [],
      layerBreakdown: {}
    };

    for (let i = 0; i < network.layers.length; i++) {
      const layer = network.layers[i];
      let layerAnalysis;

      switch (layer.type) {
        case 'dense':
          layerAnalysis = this.analyzeDenseLayer(layer);
          break;
        case 'convolutional':
          layerAnalysis = this.analyzeConvolutionalLayer(layer);
          break;
        case 'lstm':
          layerAnalysis = this.analyzeLSTMLayer(layer);
          break;
        case 'attention':
          layerAnalysis = this.analyzeAttentionLayer(layer);
          break;
        case 'dropout':
          layerAnalysis = this.analyzeDropoutLayer(layer);
          break;
        case 'batchnorm':
          layerAnalysis = this.analyzeBatchNormLayer(layer);
          break;
        default:
          layerAnalysis = {
            layerType: layer.type || 'unknown',
            totalParams: 0,
            optimizationParams: 0,
            memoryUsage: 0
          };
      }

      networkAnalysis.layerAnalyses.push(layerAnalysis);
      networkAnalysis.layerBreakdown[`layer_${i + 1}_${layer.type}`] = layerAnalysis;
      
      networkAnalysis.totalParams += layerAnalysis.totalParams || 0;
      networkAnalysis.totalOptimizationParams += layerAnalysis.optimizationParams || 0;
      networkAnalysis.totalMemoryUsage += layerAnalysis.memoryUsage || 0;
    }

    return networkAnalysis;
  }

  // In ra phân tích chi tiết
  printAnalysis(analysis) {
    console.log('\n📊 NEURAL NETWORK PARAMETER ANALYSIS');
    console.log('='.repeat(50));
    
    if (analysis.layerType) {
      // Single layer analysis
      this.printSingleLayerAnalysis(analysis);
    } else {
      // Network analysis
      this.printNetworkAnalysis(analysis);
    }
  }

  printSingleLayerAnalysis(layerAnalysis) {
    console.log(`\n🔍 ${layerAnalysis.layerType} LAYER ANALYSIS`);
    console.log('-'.repeat(30));
    
    console.log(`📐 Dimensions:`);
    if (layerAnalysis.inputSize !== undefined) {
      console.log(`   Input Size: ${layerAnalysis.inputSize.toLocaleString()}`);
    }
    if (layerAnalysis.outputSize !== undefined) {
      console.log(`   Output Size: ${layerAnalysis.outputSize.toLocaleString()}`);
    }
    
    console.log(`\n📊 Parameters:`);
    console.log(`   Learnable Parameters: ${layerAnalysis.totalParams.toLocaleString()}`);
    console.log(`   Optimization Parameters: ${layerAnalysis.optimizationParams.toLocaleString()}`);
    console.log(`   Memory Usage: ${this.formatMemoryUsage(layerAnalysis.memoryUsage)}`);
    
    if (layerAnalysis.breakdown) {
      console.log(`\n🔧 Parameter Breakdown:`);
      Object.entries(layerAnalysis.breakdown).forEach(([key, value]) => {
        console.log(`   ${key}: ${value}`);
      });
    }
  }

  printNetworkAnalysis(networkAnalysis) {
    console.log(`\n🏗️ NETWORK ANALYSIS (${networkAnalysis.totalLayers} layers)`);
    console.log('='.repeat(50));
    
    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total Learnable Parameters: ${networkAnalysis.totalParams.toLocaleString()}`);
    console.log(`   Total Optimization Parameters: ${networkAnalysis.totalOptimizationParams.toLocaleString()}`);
    console.log(`   Total Memory Usage: ${this.formatMemoryUsage(networkAnalysis.totalMemoryUsage)}`);
    
    console.log(`\n📋 LAYER BREAKDOWN:`);
    networkAnalysis.layerAnalyses.forEach((layer, index) => {
      console.log(`\n   Layer ${index + 1}: ${layer.layerType}`);
      console.log(`     Parameters: ${layer.totalParams.toLocaleString()}`);
      console.log(`     Memory: ${this.formatMemoryUsage(layer.memoryUsage)}`);
      
      if (layer.inputSize !== undefined && layer.outputSize !== undefined) {
        console.log(`     Shape: ${layer.inputSize} → ${layer.outputSize}`);
      }
    });
    
    // Find largest layers
    const sortedByParams = [...networkAnalysis.layerAnalyses].sort((a, b) => b.totalParams - a.totalParams);
    const sortedByMemory = [...networkAnalysis.layerAnalyses].sort((a, b) => b.memoryUsage - a.memoryUsage);
    
    console.log(`\n🏆 LARGEST LAYERS:`);
    console.log(`   Most Parameters: Layer ${networkAnalysis.layerAnalyses.indexOf(sortedByParams[0]) + 1} (${sortedByParams[0].layerType}) - ${sortedByParams[0].totalParams.toLocaleString()} params`);
    console.log(`   Most Memory: Layer ${networkAnalysis.layerAnalyses.indexOf(sortedByMemory[0]) + 1} (${sortedByMemory[0].layerType}) - ${this.formatMemoryUsage(sortedByMemory[0].memoryUsage)}`);
    
    // Parameter distribution
    const paramDistribution = {};
    networkAnalysis.layerAnalyses.forEach(layer => {
      const type = layer.layerType;
      paramDistribution[type] = (paramDistribution[type] || 0) + layer.totalParams;
    });
    
    console.log(`\n📈 PARAMETER DISTRIBUTION:`);
    Object.entries(paramDistribution).forEach(([type, count]) => {
      const percentage = ((count / networkAnalysis.totalParams) * 100).toFixed(1);
      console.log(`   ${type}: ${count.toLocaleString()} (${percentage}%)`);
    });
  }

  // Generate parameter comparison table
  generateComparisonTable(layers) {
    console.log('\n📊 PARAMETER COMPARISON TABLE');
    console.log('='.repeat(80));
    console.log('Layer Type     | Input | Output | Params   | Memory    | % of Total');
    console.log('-'.repeat(80));
    
    const totalParams = layers.reduce((sum, layer) => sum + layer.totalParams, 0);
    
    layers.forEach(layer => {
      const percentage = ((layer.totalParams / totalParams) * 100).toFixed(1);
      const input = layer.inputSize || 'N/A';
      const output = layer.outputSize || 'N/A';
      const params = layer.totalParams.toLocaleString();
      const memory = this.formatMemoryUsage(layer.memoryUsage);
      
      console.log(`${layer.layerType.padEnd(14)} | ${input.toString().padEnd(5)} | ${output.toString().padEnd(6)} | ${params.padEnd(8)} | ${memory.padEnd(9)} | ${percentage}%`);
    });
    
    console.log('-'.repeat(80));
    console.log(`TOTAL          |       |        | ${totalParams.toLocaleString()} | ${this.formatMemoryUsage(layers.reduce((sum, layer) => sum + layer.memoryUsage, 0))} | 100.0%`);
  }

  // Estimate FLOPs for forward pass
  estimateFLOPs(layer) {
    switch (layer.layerType) {
      case 'Dense':
        return layer.inputSize * layer.outputSize * 2; // multiply-add
      case 'Convolutional':
        return layer.kernelSize * layer.kernelSize * layer.numFilters * layer.outputSize * 2;
      case 'LSTM':
        const combinedSize = layer.inputSize + layer.hiddenSize;
        return combinedSize * layer.hiddenSize * 4 * 2; // 4 gates, multiply-add
      case 'Attention':
        const seqLen = layer.inputSize; // simplified
        return layer.inputSize * layer.keySize * 3 * 2 + seqLen * seqLen * layer.keySize * 2;
      default:
        return 0;
    }
  }

  // Generate performance estimates
  generatePerformanceEstimate(networkAnalysis, batchSize = 1, sequenceLength = 1) {
    console.log('\n⚡ PERFORMANCE ESTIMATES');
    console.log('='.repeat(50));
    
    let totalFLOPs = 0;
    let totalMemoryAccess = 0;
    
    networkAnalysis.layerAnalyses.forEach((layer, index) => {
      const flops = this.estimateFLOPs(layer) * batchSize * sequenceLength;
      const memoryAccess = layer.totalParams * 4 * 2; // read + write
      
      totalFLOPs += flops;
      totalMemoryAccess += memoryAccess;
      
      console.log(`Layer ${index + 1} (${layer.layerType}):`);
      console.log(`   FLOPs: ${flops.toLocaleString()}`);
      console.log(`   Memory Access: ${this.formatMemoryUsage(memoryAccess)}`);
    });
    
    console.log(`\nTOTAL:`);
    console.log(`   FLOPs: ${totalFLOPs.toLocaleString()}`);
    console.log(`   Memory Access: ${this.formatMemoryUsage(totalMemoryAccess)}`);
    console.log(`   Arithmetic Intensity: ${(totalFLOPs / totalMemoryAccess).toFixed(2)} FLOPs/byte`);
  }
}

// Demo function để hiển thị phân tích tham số
function demonstrateParameterAnalysis() {
  console.log('🧮 NEURAL NETWORK PARAMETER ANALYSIS DEMO\n');
  
  const analyzer = new ParameterAnalyzer();
  
  // Tạo các layer mẫu với kích thước khác nhau
  const sampleLayers = [
    new DenseLayer({ inputSize: 100, outputSize: 50, layerId: 'dense_1' }),
    new ConvolutionalLayer({ inputSize: 50, outputSize: 40, kernelSize: 3, numFilters: 4, layerId: 'conv_1' }),
    new LSTMLayer({ inputSize: 40, hiddenSize: 30, layerId: 'lstm_1' }),
    new AttentionLayer({ inputSize: 30, keySize: 25, valueSize: 25, layerId: 'attention_1' }),
    new DropoutLayer({ inputSize: 25, outputSize: 25, dropoutRate: 0.3, layerId: 'dropout_1' }),
    new BatchNormalizationLayer({ inputSize: 25, outputSize: 25, layerId: 'batchnorm_1' }),
    new DenseLayer({ inputSize: 25, outputSize: 10, layerId: 'dense_2' })
  ];
  
  // Phân tích từng layer
  console.log('📋 INDIVIDUAL LAYER ANALYSIS:\n');
  sampleLayers.forEach(layer => {
    const analysis = analyzer.analyzeLayer(layer);
    analyzer.printSingleLayerAnalysis(analysis);
  });
  
  // Tạo network và phân tích tổng thể
  const network = {
    layers: sampleLayers
  };
  
  const networkAnalysis = analyzer.analyzeNetwork(network);
  analyzer.printAnalysis(networkAnalysis);
  
  // Bảng so sánh
  analyzer.generateComparisonTable(networkAnalysis.layerAnalyses);
  
  // Ước tính hiệu suất
  analyzer.generatePerformanceEstimate(networkAnalysis);
}

// Hàm tiện ích để phân tích layer bất kỳ
function analyzeAnyLayer(layer) {
  const analyzer = new ParameterAnalyzer();
  
  let analysis;
  switch (layer.type) {
    case 'dense':
      analysis = analyzer.analyzeDenseLayer(layer);
      break;
    case 'convolutional':
      analysis = analyzer.analyzeConvolutionalLayer(layer);
      break;
    case 'lstm':
      analysis = analyzer.analyzeLSTMLayer(layer);
      break;
    case 'attention':
      analysis = analyzer.analyzeAttentionLayer(layer);
      break;
    case 'dropout':
      analysis = analyzer.analyzeDropoutLayer(layer);
      break;
    case 'batchnorm':
      analysis = analyzer.analyzeBatchNormLayer(layer);
      break;
    default:
      analysis = {
        layerType: layer.type || 'unknown',
        totalParams: 0,
        optimizationParams: 0,
        memoryUsage: 0,
        breakdown: { note: 'Unknown layer type' }
      };
  }
  
  return analysis;
}

// Export functions
module.exports = {
  ParameterAnalyzer,
  analyzeAnyLayer,
  demonstrateParameterAnalysis
};

// Run demo if executed directly
if (require.main === module) {
  demonstrateParameterAnalysis();
}
