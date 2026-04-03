// Demo script for Neural Network Layers
// Chạy thử nghiệm các tầng mạng neuron xử lý thông tin

const { 
  NeuralLayerBase, 
  DenseLayer, 
  ConvolutionalLayer, 
  LSTMLayer, 
  AttentionLayer, 
  DropoutLayer, 
  BatchNormalizationLayer,
  NeuralNetwork,
  InformationProcessingNetwork
} = require('./neural-network-layers.js');

// Demo functions
async function demonstrateBasicNeuralLayer() {
  console.log('=== BASIC NEURAL LAYER DEMO ===\n');

  // Create a dense layer
  const denseLayer = new DenseLayer({
    layerId: 'demo_dense_1',
    inputSize: 4,
    outputSize: 3,
    activation: 'relu',
    learningRate: 0.01
  });

  console.log('🧠 Created Dense Layer:');
  console.log(`   Input Size: ${denseLayer.inputSize}`);
  console.log(`   Output Size: ${denseLayer.outputSize}`);
  console.log(`   Activation: ${denseLayer.activationFunction}`);
  console.log(`   Learning Rate: ${denseLayer.learningRate}`);

  // Test forward pass
  const input = [0.5, -0.2, 0.8, 0.1];
  console.log(`\n📥 Input: [${input.join(', ')}]`);
  
  const output = denseLayer.forward(input);
  console.log(`📤 Output: [${output.map(o => o.toFixed(4)).join(', ')}]`);

  // Test backward pass
  const gradients = [0.1, -0.05, 0.2];
  console.log(`\n⬅️ Gradients: [${gradients.join(', ')}]`);
  
  const inputGradients = denseLayer.backward(gradients);
  console.log(`📤 Input Gradients: [${inputGradients.map(g => g.toFixed(4)).join(', ')}]`);

  console.log('\n✅ Basic neural layer demo completed');
}

async function demonstrateConvolutionalLayer() {
  console.log('\n=== CONVOLUTIONAL LAYER DEMO ===\n');

  const convLayer = new ConvolutionalLayer({
    layerId: 'demo_conv_1',
    inputSize: 10,
    outputSize: 8,
    kernelSize: 3,
    stride: 1,
    numFilters: 2,
    activation: 'relu'
  });

  console.log('🔍 Created Convolutional Layer:');
  console.log(`   Input Size: ${convLayer.inputSize}`);
  console.log(`   Kernel Size: ${convLayer.kernelSize}`);
  console.log(`   Stride: ${convLayer.stride}`);
  console.log(`   Filters: ${convLayer.numFilters}`);

  // Test with sequence data
  const sequence = [0.1, 0.5, 0.8, 0.3, 0.9, 0.2, 0.7, 0.4, 0.6, 0.1];
  console.log(`\n📥 Input Sequence: [${sequence.join(', ')}]`);
  
  const convOutput = convLayer.forward(sequence);
  console.log(`📤 Conv Output: [${convOutput.map(o => o.toFixed(4)).join(', ')}]`);
  console.log(`   Output Length: ${convOutput.length}`);

  console.log('\n✅ Convolutional layer demo completed');
}

async function demonstrateLSTMLayer() {
  console.log('\n=== LSTM LAYER DEMO ===\n');

  const lstmLayer = new LSTMLayer({
    layerId: 'demo_lstm_1',
    inputSize: 3,
    outputSize: 4,
    hiddenSize: 4,
    learningRate: 0.01
  });

  console.log('🔄 Created LSTM Layer:');
  console.log(`   Input Size: ${lstmLayer.inputSize}`);
  console.log(`   Hidden Size: ${lstmLayer.hiddenSize}`);
  console.log(`   Output Size: ${lstmLayer.outputSize}`);

  // Test with sequence data
  const sequence = [
    [0.1, 0.5, 0.8],
    [0.3, 0.9, 0.2],
    [0.7, 0.4, 0.6],
    [0.2, 0.8, 0.1]
  ];

  console.log(`\n📥 Input Sequence (${sequence.length} timesteps):`);
  sequence.forEach((timestep, i) => {
    console.log(`   T${i}: [${timestep.join(', ')}]`);
  });

  const lstmOutput = lstmLayer.forward(sequence);
  console.log(`\n📤 LSTM Output (${lstmOutput.length} timesteps):`);
  lstmOutput.forEach((timestep, i) => {
    console.log(`   T${i}: [${timestep.map(o => o.toFixed(4)).join(', ')}]`);
  });

  console.log('\n✅ LSTM layer demo completed');
}

async function demonstrateAttentionLayer() {
  console.log('\n=== ATTENTION LAYER DEMO ===\n');

  const attentionLayer = new AttentionLayer({
    layerId: 'demo_attention_1',
    inputSize: 4,
    outputSize: 4,
    keySize: 4,
    valueSize: 4
  });

  console.log('👁️ Created Attention Layer:');
  console.log(`   Input Size: ${attentionLayer.inputSize}`);
  console.log(`   Key Size: ${attentionLayer.keySize}`);
  console.log(`   Value Size: ${attentionLayer.valueSize}`);

  // Test with sequence data
  const sequence = [
    [0.1, 0.5, 0.8, 0.3],
    [0.9, 0.2, 0.7, 0.4],
    [0.6, 0.1, 0.9, 0.2]
  ];

  console.log(`\n📥 Input Sequence (${sequence.length} timesteps):`);
  sequence.forEach((timestep, i) => {
    console.log(`   T${i}: [${timestep.join(', ')}]`);
  });

  const attentionOutput = attentionLayer.forward(sequence);
  console.log(`\n📤 Attention Output (${attentionOutput.length} timesteps):`);
  attentionOutput.forEach((timestep, i) => {
    console.log(`   T${i}: [${timestep.map(o => o.toFixed(4)).join(', ')}]`);
  });

  console.log('\n✅ Attention layer demo completed');
}

async function demonstrateDropoutAndBatchNorm() {
  console.log('\n=== DROPOUT AND BATCH NORMALIZATION DEMO ===\n');

  // Create layers
  const dropoutLayer = new DropoutLayer({
    layerId: 'demo_dropout_1',
    inputSize: 6,
    outputSize: 6,
    dropoutRate: 0.3,
    training: true
  });

  const batchNormLayer = new BatchNormalizationLayer({
    layerId: 'demo_batchnorm_1',
    inputSize: 6,
    outputSize: 6,
    training: true
  });

  console.log('🎲 Created Dropout Layer:');
  console.log(`   Dropout Rate: ${dropoutLayer.dropoutRate}`);
  console.log(`   Training: ${dropoutLayer.training}`);

  console.log('\n📊 Created Batch Normalization Layer:');
  console.log(`   Training: ${batchNormLayer.training}`);

  // Test data
  const input = [1.2, -0.8, 0.5, 1.8, -0.3, 0.9];
  console.log(`\n📥 Input: [${input.join(', ')}]`);

  // Test dropout
  const dropoutOutput = dropoutLayer.forward(input);
  console.log(`📤 Dropout Output: [${dropoutOutput.map(o => o.toFixed(4)).join(', ')}]`);

  // Test batch normalization
  const batchNormOutput = batchNormLayer.forward(input);
  console.log(`📤 Batch Norm Output: [${batchNormOutput.map(o => o.toFixed(4)).join(', ')}]`);

  console.log('\n✅ Dropout and Batch Normalization demo completed');
}

async function demonstrateNeuralNetwork() {
  console.log('\n=== NEURAL NETWORK DEMO ===\n');

  // Create a neural network
  const network = new NeuralNetwork({
    lossFunction: 'mse',
    optimizer: 'adam',
    learningRate: 0.01,
    epochs: 50
  });

  // Add layers
  network
    .addLayer(new DenseLayer({ inputSize: 2, outputSize: 8, activation: 'relu' }))
    .addLayer(new DenseLayer({ inputSize: 8, outputSize: 4, activation: 'relu' }))
    .addLayer(new DropoutLayer({ inputSize: 4, outputSize: 4, dropoutRate: 0.2 }))
    .addLayer(new DenseLayer({ inputSize: 4, outputSize: 1, activation: 'sigmoid' }));

  // Compile network
  network.compile();

  // Show network summary
  network.summary();

  // Generate training data (simple XOR problem)
  const trainingData = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ];

  const trainingTargets = [
    [0],
    [1],
    [1],
    [0]
  ];

  console.log('🎯 Training Data (XOR Problem):');
  trainingData.forEach((input, i) => {
    console.log(`   Input: [${input.join(', ')}] -> Target: [${trainingTargets[i][0]}]`);
  });

  // Train network
  console.log('\n🏋️ Training Network...');
  const history = network.fit(trainingData, trainingTargets);

  // Test network
  console.log('\n🧪 Testing Network:');
  trainingData.forEach((input, i) => {
    const prediction = network.predict(input);
    const target = trainingTargets[i][0];
    const predicted = prediction[0] > 0.5 ? 1 : 0;
    console.log(`   Input: [${input.join(', ')}] -> Predicted: ${predicted.toFixed(3)} (${predicted}) | Target: ${target} | ${predicted === target ? '✅' : '❌'}`);
  });

  console.log('\n✅ Neural network demo completed');
}

async function demonstrateInformationProcessingNetwork() {
  console.log('\n=== INFORMATION PROCESSING NETWORK DEMO ===\n');

  // Create specialized information processing network
  const infoNetwork = new InformationProcessingNetwork({
    lossFunction: 'mse',
    learningRate: 0.005,
    epochs: 30,
    adaptiveLearning: true
  });

  // Add layers for information processing
  infoNetwork
    .addLayer(new DenseLayer({ inputSize: 10, outputSize: 20, activation: 'relu' }))
    .addLayer(new BatchNormalizationLayer({ inputSize: 20, outputSize: 20 }))
    .addLayer(new DenseLayer({ inputSize: 20, outputSize: 15, activation: 'relu' }))
    .addLayer(new DropoutLayer({ inputSize: 15, outputSize: 15, dropoutRate: 0.3 }))
    .addLayer(new AttentionLayer({ inputSize: 15, outputSize: 15 }))
    .addLayer(new DenseLayer({ inputSize: 15, outputSize: 8, activation: 'relu' }))
    .addLayer(new DenseLayer({ inputSize: 8, outputSize: 3, activation: 'sigmoid' }));

  // Compile network
  infoNetwork.compile();

  console.log('🧠 Information Processing Network Summary:');
  infoNetwork.summary();

  // Test text processing
  console.log('\n📝 Processing Text Information:');
  const sampleText = "Trí tuệ nhân tạo đang thay đổi thế giới y tế";
  const textResult = infoNetwork.processTextInformation(sampleText, 'vi');
  
  console.log(`   Input Text: "${sampleText}"`);
  console.log(`   Processing Time: ${textResult.processingTime}ms`);
  console.log(`   Confidence: ${textResult.confidence.toFixed(3)}`);
  console.log(`   Quality Score: ${textResult.qualityScore.toFixed(3)}`);
  console.log(`   Output: [${textResult.output.map(o => o.toFixed(4)).join(', ')}]`);

  // Test search results processing
  console.log('\n🔍 Processing Search Results:');
  const searchResults = [
    { title: 'AI in Healthcare', relevance: 0.9, credibility: 0.8 },
    { title: 'Machine Learning Medicine', relevance: 0.7, credibility: 0.9 },
    { title: 'Neural Networks Diagnosis', relevance: 0.8, credibility: 0.7 }
  ];
  const searchQuery = 'artificial intelligence healthcare';
  
  const searchResult = infoNetwork.processSearchResults(searchResults, searchQuery);
  
  console.log(`   Query: "${searchQuery}"`);
  console.log(`   Results Count: ${searchResults.length}`);
  console.log(`   Processing Time: ${searchResult.processingTime}ms`);
  console.log(`   Confidence: ${searchResult.confidence.toFixed(3)}`);
  console.log(`   Quality Score: ${searchResult.qualityScore.toFixed(3)}`);
  console.log(`   Output: [${searchResult.output.map(o => o.toFixed(4)).join(', ')}]`);

  // Test content extraction processing
  console.log('\n📖 Processing Extracted Content:');
  const extractedContent = {
    content: 'This is a sample article about artificial intelligence and its applications in healthcare. It discusses various technologies and their impact.',
    links: [
      { url: 'https://example.com/ai-healthcare', text: 'AI Healthcare' },
      { url: 'https://example.com/ml-medicine', text: 'ML Medicine' }
    ],
    images: [
      { src: 'https://example.com/image1.jpg', alt: 'AI Medical' }
    ],
    metadata: {
      author: 'Dr. Smith',
      date: '2024-01-15',
      category: 'technology'
    }
  };
  
  const contentResult = infoNetwork.processContentExtraction(extractedContent, 'https://example.com/article');
  
  console.log(`   URL: https://example.com/article`);
  console.log(`   Content Length: ${extractedContent.content.length} chars`);
  console.log(`   Links: ${extractedContent.links.length}`);
  console.log(`   Images: ${extractedContent.images.length}`);
  console.log(`   Processing Time: ${contentResult.processingTime}ms`);
  console.log(`   Confidence: ${contentResult.confidence.toFixed(3)}`);
  console.log(`   Quality Score: ${contentResult.qualityScore.toFixed(3)}`);
  console.log(`   Output: [${contentResult.output.map(o => o.toFixed(4)).join(', ')}]`);

  // Show processing statistics
  console.log('\n📊 Processing Statistics:');
  const stats = infoNetwork.getProcessingStatistics();
  if (stats) {
    console.log(`   Total Processed: ${stats.totalProcessed}`);
    console.log(`   Average Processing Time: ${stats.averageProcessingTime.toFixed(2)}ms`);
    console.log(`   Average Confidence: ${stats.averageConfidence.toFixed(3)}`);
    console.log(`   Average Quality Score: ${stats.averageQualityScore.toFixed(3)}`);
    console.log(`   Knowledge Base Size: ${stats.knowledgeBaseSize}`);
  }

  console.log('\n✅ Information processing network demo completed');
}

async function demonstrateLayerCombinations() {
  console.log('\n=== LAYER COMBINATIONS DEMO ===\n');

  // Create a complex network with different layer types
  const complexNetwork = new InformationProcessingNetwork({
    learningRate: 0.003,
    epochs: 20
  });

  // Build complex architecture
  complexNetwork
    .addLayer(new DenseLayer({ inputSize: 5, outputSize: 12, activation: 'relu' }))
    .addLayer(new BatchNormalizationLayer({ inputSize: 12, outputSize: 12 }))
    .addLayer(new ConvolutionalLayer({ inputSize: 12, outputSize: 10, kernelSize: 3, numFilters: 2 }))
    .addLayer(new DropoutLayer({ inputSize: 10, outputSize: 10, dropoutRate: 0.2 }))
    .addLayer(new LSTMLayer({ inputSize: 10, outputSize: 8, hiddenSize: 8 }))
    .addLayer(new AttentionLayer({ inputSize: 8, outputSize: 8 }))
    .addLayer(new DenseLayer({ inputSize: 8, outputSize: 4, activation: 'relu' }))
    .addLayer(new DenseLayer({ inputSize: 4, outputSize: 1, activation: 'sigmoid' }));

  complexNetwork.compile();

  console.log('🏗️ Complex Network Architecture:');
  complexNetwork.summary();

  // Test with sample data
  const sampleInput = [0.5, 0.8, 0.2, 0.9, 0.1];
  console.log(`\n📥 Sample Input: [${sampleInput.join(', ')}]`);

  const result = complexNetwork.processInformation(sampleInput, { 
    type: 'test', 
    source: 'demo' 
  });

  console.log(`📤 Final Output: [${result.output.map(o => o.toFixed(4)).join(', ')}]`);
  console.log(`⏱️ Processing Time: ${result.processingTime}ms`);
  console.log(`🎯 Confidence: ${result.confidence.toFixed(3)}`);
  console.log(`⭐ Quality Score: ${result.qualityScore.toFixed(3)}`);

  // Show detailed stage information
  console.log('\n📋 Detailed Processing Stages:');
  result.stages.forEach((stage, i) => {
    console.log(`   Stage ${i + 1}: ${stage.layerType.toUpperCase()}`);
    console.log(`     Input Size: ${stage.inputSize} -> Output Size: ${stage.outputSize}`);
    console.log(`     Confidence: ${stage.confidence.toFixed(3)}`);
    console.log(`     Processing Time: ${stage.processingTime}ms`);
    console.log(`     Activation: ${stage.activation || 'none'}`);
    if (stage.error) {
      console.log(`     ❌ Error: ${stage.error}`);
    }
  });

  console.log('\n✅ Layer combinations demo completed');
}

// Main execution function
async function runAllNeuralNetworkDemos() {
  try {
    await demonstrateBasicNeuralLayer();
    await demonstrateConvolutionalLayer();
    await demonstrateLSTMLayer();
    await demonstrateAttentionLayer();
    await demonstrateDropoutAndBatchNorm();
    await demonstrateNeuralNetwork();
    await demonstrateInformationProcessingNetwork();
    await demonstrateLayerCombinations();
    
    console.log('\n🎉 All neural network demos completed!');
    
  } catch (error) {
    console.error('💥 Neural network demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateBasicNeuralLayer,
  demonstrateConvolutionalLayer,
  demonstrateLSTMLayer,
  demonstrateAttentionLayer,
  demonstrateDropoutAndBatchNorm,
  demonstrateNeuralNetwork,
  demonstrateInformationProcessingNetwork,
  demonstrateLayerCombinations,
  runAllNeuralNetworkDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllNeuralNetworkDemos();
}
