// Neural Network Layers for Information Processing
// Các tầng mạng neuron xử lý thông tin theo chuẩn mực

class NeuralLayerBase {
  constructor(config = {}) {
    this.config = config;
    this.layerId = config.layerId || 'unknown';
    this.type = config.type || 'base';
    this.inputSize = config.inputSize || 0;
    this.outputSize = config.outputSize || 0;
    this.activationFunction = config.activation || 'relu';
    this.weights = this.initializeWeights();
    this.biases = this.initializeBiases();
    this.inputs = [];
    this.outputs = [];
    this.gradients = [];
    this.learningRate = config.learningRate || 0.01;
    this.momentum = config.momentum || 0.9;
    this.velocityWeights = null;
    this.velocityBiases = null;
    this.regularization = config.regularization || { type: 'l2', lambda: 0.001 };
  }

  initializeWeights() {
    // Xavier/Glorot initialization
    const limit = Math.sqrt(6 / (this.inputSize + this.outputSize));
    const weights = [];
    
    for (let i = 0; i < this.inputSize; i++) {
      weights[i] = [];
      for (let j = 0; j < this.outputSize; j++) {
        weights[i][j] = (Math.random() * 2 - 1) * limit;
      }
    }
    
    return weights;
  }

  initializeBiases() {
    const biases = [];
    for (let i = 0; i < this.outputSize; i++) {
      biases[i] = 0;
    }
    return biases;
  }

  // Activation functions
  activate(x) {
    switch (this.activationFunction) {
      case 'relu':
        return Math.max(0, x);
      case 'sigmoid':
        return 1 / (1 + Math.exp(-x));
      case 'tanh':
        return Math.tanh(x);
      case 'leaky_relu':
        return x > 0 ? x : 0.01 * x;
      case 'elu':
        return x > 0 ? x : 0.1 * (Math.exp(x) - 1);
      case 'softmax':
        return this.softmax(x);
      default:
        return x;
    }
  }

  activateDerivative(x) {
    switch (this.activationFunction) {
      case 'relu':
        return x > 0 ? 1 : 0;
      case 'sigmoid':
        const s = this.activate(x);
        return s * (1 - s);
      case 'tanh':
        const t = this.activate(x);
        return 1 - t * t;
      case 'leaky_relu':
        return x > 0 ? 1 : 0.01;
      case 'elu':
        return x > 0 ? 1 : 0.1 * Math.exp(x);
      case 'softmax':
        return this.softmaxDerivative(x);
      default:
        return 1;
    }
  }

  softmax(x) {
    if (!Array.isArray(x)) {
      x = [x];
    }
    
    const max = Math.max(...x);
    const exp = x.map(val => Math.exp(val - max));
    const sum = exp.reduce((a, b) => a + b, 0);
    
    return exp.map(val => val / sum);
  }

  softmaxDerivative(x) {
    const s = this.softmax(x);
    const derivative = [];
    
    for (let i = 0; i < s.length; i++) {
      derivative[i] = [];
      for (let j = 0; j < s.length; j++) {
        if (i === j) {
          derivative[i][j] = s[i] * (1 - s[i]);
        } else {
          derivative[i][j] = -s[i] * s[j];
        }
      }
    }
    
    return derivative;
  }

  // Forward pass
  forward(inputs) {
    this.inputs = Array.isArray(inputs) ? inputs : [inputs];
    
    if (this.inputs.length !== this.inputSize) {
      throw new Error(`Input size mismatch: expected ${this.inputSize}, got ${this.inputs.length}`);
    }

    // Calculate weighted sum + bias
    const weightedInputs = [];
    for (let j = 0; j < this.outputSize; j++) {
      let sum = this.biases[j];
      for (let i = 0; i < this.inputSize; i++) {
        sum += this.inputs[i] * this.weights[i][j];
      }
      weightedInputs[j] = sum;
    }

    // Apply activation function
    this.outputs = weightedInputs.map(x => this.activate(x));
    
    return this.outputs;
  }

  // Backward pass
  backward(outputGradients) {
    this.gradients = Array.isArray(outputGradients) ? outputGradients : [outputGradients];
    
    if (this.gradients.length !== this.outputSize) {
      throw new Error(`Gradient size mismatch: expected ${this.outputSize}, got ${this.gradients.length}`);
    }

    // Calculate weight gradients
    const weightGradients = [];
    for (let i = 0; i < this.inputSize; i++) {
      weightGradients[i] = [];
      for (let j = 0; j < this.outputSize; j++) {
        const activationDerivative = this.getActivationDerivative(j);
        weightGradients[i][j] = this.inputs[i] * this.gradients[j] * activationDerivative;
      }
    }

    // Calculate bias gradients
    const biasGradients = [];
    for (let j = 0; j < this.outputSize; j++) {
      const activationDerivative = this.getActivationDerivative(j);
      biasGradients[j] = this.gradients[j] * activationDerivative;
    }

    // Calculate input gradients for previous layer
    const inputGradients = [];
    for (let i = 0; i < this.inputSize; i++) {
      let sum = 0;
      for (let j = 0; j < this.outputSize; j++) {
        const activationDerivative = this.getActivationDerivative(j);
        sum += this.weights[i][j] * this.gradients[j] * activationDerivative;
      }
      inputGradients[i] = sum;
    }

    // Update weights and biases
    this.updateParameters(weightGradients, biasGradients);

    return inputGradients;
  }

  getActivationDerivative(outputIndex) {
    const weightedInput = this.getWeightedInput(outputIndex);
    return this.activateDerivative(weightedInput);
  }

  getWeightedInput(outputIndex) {
    let sum = this.biases[outputIndex];
    for (let i = 0; i < this.inputSize; i++) {
      sum += this.inputs[i] * this.weights[i][outputIndex];
    }
    return sum;
  }

  updateParameters(weightGradients, biasGradients) {
    // Initialize velocity for momentum
    if (!this.velocityWeights) {
      this.velocityWeights = this.weights.map(row => row.map(() => 0));
      this.velocityBiases = this.biases.map(() => 0);
    }

    // Update with momentum and regularization
    for (let i = 0; i < this.inputSize; i++) {
      for (let j = 0; j < this.outputSize; j++) {
        // Add regularization gradient
        let regGradient = 0;
        if (this.regularization.type === 'l2') {
          regGradient = this.regularization.lambda * this.weights[i][j];
        } else if (this.regularization.type === 'l1') {
          regGradient = this.regularization.lambda * Math.sign(this.weights[i][j]);
        }

        // Update velocity with momentum
        this.velocityWeights[i][j] = this.momentum * this.velocityWeights[i][j] + 
                                     this.learningRate * (weightGradients[i][j] + regGradient);
        
        // Update weights
        this.weights[i][j] -= this.velocityWeights[i][j];
      }
    }

    for (let j = 0; j < this.outputSize; j++) {
      this.velocityBiases[j] = this.momentum * this.velocityBiases[j] + 
                              this.learningRate * biasGradients[j];
      this.biases[j] -= this.velocityBiases[j];
    }
  }

  // Utility methods
  getParameters() {
    return {
      weights: this.weights,
      biases: this.biases,
      config: this.config
    };
  }

  setParameters(parameters) {
    this.weights = parameters.weights;
    this.biases = parameters.biases;
  }

  clone() {
    const cloned = new this.constructor(this.config);
    cloned.weights = this.weights.map(row => [...row]);
    cloned.biases = [...this.biases];
    return cloned;
  }
}

// Dense Layer (Fully Connected)
class DenseLayer extends NeuralLayerBase {
  constructor(config) {
    super(config);
    this.type = 'dense';
  }
}

// Convolutional Layer
class ConvolutionalLayer extends NeuralLayerBase {
  constructor(config) {
    super(config);
    this.type = 'convolutional';
    this.kernelSize = config.kernelSize || 3;
    this.stride = config.stride || 1;
    this.padding = config.padding || 0;
    this.numFilters = config.numFilters || 1;
    this.kernels = this.initializeKernels();
  }

  initializeKernels() {
    const kernels = [];
    const limit = Math.sqrt(6 / (this.kernelSize * this.kernelSize + this.outputSize));
    
    for (let f = 0; f < this.numFilters; f++) {
      kernels[f] = [];
      for (let i = 0; i < this.kernelSize; i++) {
        kernels[f][i] = [];
        for (let j = 0; j < this.kernelSize; j++) {
          kernels[f][i][j] = (Math.random() * 2 - 1) * limit;
        }
      }
    }
    
    return kernels;
  }

  forward(inputs) {
    // Simplified convolution for 1D data
    this.inputs = inputs;
    const outputSize = Math.floor((inputs.length - this.kernelSize + 2 * this.padding) / this.stride) + 1;
    this.outputs = [];

    for (let f = 0; f < this.numFilters; f++) {
      this.outputs[f] = [];
      for (let i = 0; i < outputSize; i++) {
        let sum = 0;
        for (let j = 0; j < this.kernelSize; j++) {
          const inputIndex = i * this.stride + j - this.padding;
          if (inputIndex >= 0 && inputIndex < inputs.length) {
            sum += inputs[inputIndex] * this.kernels[f][j][0];
          }
        }
        this.outputs[f][i] = this.activate(sum);
      }
    }

    return this.outputs.flat();
  }

  backward(outputGradients) {
    // Simplified backward pass for convolution
    const inputGradients = new Array(this.inputs.length).fill(0);
    
    // Reshape gradients
    const reshapedGradients = [];
    for (let f = 0; f < this.numFilters; f++) {
      const outputSize = this.outputs[f].length;
      reshapedGradients[f] = outputGradients.slice(f * outputSize, (f + 1) * outputSize);
    }

    // Calculate input gradients and update kernels
    for (let f = 0; f < this.numFilters; f++) {
      for (let i = 0; i < this.outputs[f].length; i++) {
        const gradient = reshapedGradients[f][i];
        const activationDerivative = this.activateDerivative(this.outputs[f][i]);
        
        for (let j = 0; j < this.kernelSize; j++) {
          const inputIndex = i * this.stride + j - this.padding;
          if (inputIndex >= 0 && inputIndex < this.inputs.length) {
            inputGradients[inputIndex] += gradient * activationDerivative * this.kernels[f][j][0];
            
            // Update kernel
            this.kernels[f][j][0] -= this.learningRate * gradient * activationDerivative * this.inputs[inputIndex];
          }
        }
      }
    }

    return inputGradients;
  }
}

// LSTM Layer for sequence processing
class LSTMLayer extends NeuralLayerBase {
  constructor(config) {
    super(config);
    this.type = 'lstm';
    this.hiddenSize = config.hiddenSize || this.outputSize;
    this.forgetGate = new DenseLayer({
      inputSize: this.inputSize + this.hiddenSize,
      outputSize: this.hiddenSize,
      activation: 'sigmoid'
    });
    this.inputGate = new DenseLayer({
      inputSize: this.inputSize + this.hiddenSize,
      outputSize: this.hiddenSize,
      activation: 'sigmoid'
    });
    this.outputGate = new DenseLayer({
      inputSize: this.inputSize + this.hiddenSize,
      outputSize: this.hiddenSize,
      activation: 'sigmoid'
    });
    this.cellGate = new DenseLayer({
      inputSize: this.inputSize + this.hiddenSize,
      outputSize: this.hiddenSize,
      activation: 'tanh'
    });
    
    this.hiddenState = new Array(this.hiddenSize).fill(0);
    this.cellState = new Array(this.hiddenSize).fill(0);
  }

  forward(inputs) {
    this.inputs = inputs;
    const outputs = [];

    for (let t = 0; t < inputs.length; t++) {
      const inputItem = inputs[t];
      const combinedInput = [...inputItem, ...this.hiddenState];

      // LSTM gates
      const forget = this.forgetGate.forward(combinedInput);
      const inputGate = this.inputGate.forward(combinedInput);
      const output = this.outputGate.forward(combinedInput);
      const cell = this.cellGate.forward(combinedInput);

      // Update cell state and hidden state
      for (let i = 0; i < this.hiddenSize; i++) {
        this.cellState[i] = forget[i] * this.cellState[i] + inputGate[i] * cell[i];
        this.hiddenState[i] = output[i] * Math.tanh(this.cellState[i]);
      }

      outputs.push([...this.hiddenState]);
    }

    this.outputs = outputs;
    return this.outputs;
  }

  backward(outputGradients) {
    // Simplified LSTM backward pass
    const inputGradients = [];
    const dHiddenState = new Array(this.hiddenSize).fill(0);
    const dCellState = new Array(this.hiddenSize).fill(0);

    for (let t = this.inputs.length - 1; t >= 0; t--) {
      const inputItem = this.inputs[t];
      const combinedInput = [...inputItem, ...this.hiddenState];

      // Calculate gradients for each gate
      const dOutput = [...outputGradients[t]];
      
      // Backprop through time (simplified)
      for (let i = 0; i < this.hiddenSize; i++) {
        dHiddenState[i] += dOutput[i];
      }

      // Update gates (simplified)
      // In a full implementation, this would properly backprop through all gates
    }

    return inputGradients;
  }
}

// Attention Layer
class AttentionLayer extends NeuralLayerBase {
  constructor(config) {
    super(config);
    this.type = 'attention';
    this.keySize = config.keySize || this.outputSize;
    this.valueSize = config.valueSize || this.outputSize;
    this.queryWeights = this.initializeWeights();
    this.keyWeights = this.initializeWeights();
    this.valueWeights = this.initializeWeights();
  }

  forward(inputs) {
    this.inputs = inputs;
    const sequenceLength = inputs.length;
    
    // Calculate queries, keys, values
    const queries = [];
    const keys = [];
    const values = [];

    for (let t = 0; t < sequenceLength; t++) {
      const inputItem = inputs[t];
      queries[t] = this.matrixVectorMultiply(this.queryWeights, inputItem);
      keys[t] = this.matrixVectorMultiply(this.keyWeights, inputItem);
      values[t] = this.matrixVectorMultiply(this.valueWeights, inputItem);
    }

    // Calculate attention scores
    const attentionScores = [];
    for (let i = 0; i < sequenceLength; i++) {
      attentionScores[i] = [];
      for (let j = 0; j < sequenceLength; j++) {
        attentionScores[i][j] = this.dotProduct(queries[i], keys[j]) / Math.sqrt(this.keySize);
      }
    }

    // Apply softmax to get attention weights
    const attentionWeights = attentionScores.map(scores => this.softmax(scores));

    // Calculate weighted sum of values
    this.outputs = [];
    for (let i = 0; i < sequenceLength; i++) {
      const weightedSum = new Array(this.valueSize).fill(0);
      for (let j = 0; j < sequenceLength; j++) {
        for (let k = 0; k < this.valueSize; k++) {
          weightedSum[k] += attentionWeights[i][j] * values[j][k];
        }
      }
      this.outputs[i] = weightedSum;
    }

    return this.outputs;
  }

  backward(outputGradients) {
    // Simplified attention backward pass
    const inputGradients = [];
    
    // In a full implementation, this would properly backprop through attention mechanism
    for (let t = 0; t < this.inputs.length; t++) {
      inputGradients[t] = new Array(this.inputSize).fill(0.01); // Simplified
    }

    return inputGradients.flat();
  }

  dotProduct(a, b) {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
  }

  matrixVectorMultiply(matrix, vector) {
    return matrix.map(row => this.dotProduct(row, vector));
  }
}

// Dropout Layer
class DropoutLayer extends NeuralLayerBase {
  constructor(config) {
    super(config);
    this.type = 'dropout';
    this.dropoutRate = config.dropoutRate || 0.5;
    this.mask = [];
    this.training = config.training !== false;
  }

  forward(inputs) {
    this.inputs = inputs;
    
    if (!this.training) {
      this.outputs = [...inputs];
      return this.outputs;
    }

    // Create dropout mask
    this.mask = inputs.map(() => Math.random() > this.dropoutRate ? 1 : 0);
    
    // Apply mask and scale outputs
    this.outputs = inputs.map((input, i) => 
      input * this.mask[i] / (1 - this.dropoutRate)
    );

    return this.outputs;
  }

  backward(outputGradients) {
    if (!this.training) {
      return outputGradients;
    }

    // Apply mask to gradients
    return outputGradients.map((gradient, i) => 
      gradient * this.mask[i] / (1 - this.dropoutRate)
    );
  }
}

// Batch Normalization Layer
class BatchNormalizationLayer extends NeuralLayerBase {
  constructor(config) {
    super(config);
    this.type = 'batchnorm';
    this.epsilon = config.epsilon || 1e-8;
    this.momentum = config.momentum || 0.9;
    this.gamma = new Array(this.outputSize).fill(1);
    this.beta = new Array(this.outputSize).fill(0);
    this.runningMean = new Array(this.outputSize).fill(0);
    this.runningVar = new Array(this.outputSize).fill(1);
    this.training = config.training !== false;
  }

  forward(inputs) {
    this.inputs = inputs;
    
    if (!this.training) {
      // Use running statistics during inference
      this.outputs = inputs.map((input, i) => 
        this.gamma[i] * (input - this.runningMean[i]) / Math.sqrt(this.runningVar[i] + this.epsilon) + this.beta[i]
      );
      return this.outputs;
    }

    // Calculate batch statistics
    const mean = inputs.reduce((sum, val) => sum + val, 0) / inputs.length;
    const variance = inputs.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / inputs.length;
    
    // Update running statistics
    for (let i = 0; i < this.outputSize; i++) {
      this.runningMean[i] = this.momentum * this.runningMean[i] + (1 - this.momentum) * mean;
      this.runningVar[i] = this.momentum * this.runningVar[i] + (1 - this.momentum) * variance;
    }

    // Normalize and scale
    this.outputs = inputs.map((input, i) => {
      const normalized = (input - mean) / Math.sqrt(variance + this.epsilon);
      return this.gamma[i] * normalized + this.beta[i];
    });

    return this.outputs;
  }

  backward(outputGradients) {
    // Simplified batchnorm backward pass
    return outputGradients.map((gradient, i) => gradient * this.gamma[i]);
  }
}

// Neural Network Model
class NeuralNetwork {
  constructor(config = {}) {
    this.config = config;
    this.layers = [];
    this.lossFunction = config.lossFunction || 'mse';
    this.optimizer = config.optimizer || 'adam';
    this.learningRate = config.learningRate || 0.001;
    this.epochs = config.epochs || 100;
    this.batchSize = config.batchSize || 32;
    this.validationSplit = config.validationSplit || 0.2;
    this.earlyStopping = config.earlyStopping || { patience: 10 };
    this.history = { loss: [], valLoss: [], accuracy: [], valAccuracy: [] };
  }

  addLayer(layer) {
    this.layers.push(layer);
    return this;
  }

  compile(config = {}) {
    this.lossFunction = config.lossFunction || this.lossFunction;
    this.optimizer = config.optimizer || this.optimizer;
    this.learningRate = config.learningRate || this.learningRate;
    
    // Update learning rates for all layers
    this.layers.forEach(layer => {
      if (layer.learningRate !== undefined) {
        layer.learningRate = this.learningRate;
      }
    });
    
    return this;
  }

  forward(inputs) {
    let currentOutput = inputs;
    
    for (const layer of this.layers) {
      currentOutput = layer.forward(currentOutput);
    }
    
    return currentOutput;
  }

  backward(outputGradients) {
    let currentGradients = outputGradients;
    
    // Backpropagate through layers in reverse order
    for (let i = this.layers.length - 1; i >= 0; i--) {
      currentGradients = this.layers[i].backward(currentGradients);
    }
    
    return currentGradients;
  }

  calculateLoss(predictions, targets) {
    switch (this.lossFunction) {
      case 'mse':
        return this.mseLoss(predictions, targets);
      case 'crossentropy':
        return this.crossEntropyLoss(predictions, targets);
      case 'binary':
        return this.binaryCrossEntropyLoss(predictions, targets);
      default:
        return this.mseLoss(predictions, targets);
    }
  }

  calculateLossGradient(predictions, targets) {
    switch (this.lossFunction) {
      case 'mse':
        return this.mseLossGradient(predictions, targets);
      case 'crossentropy':
        return this.crossEntropyLossGradient(predictions, targets);
      case 'binary':
        return this.binaryCrossEntropyLossGradient(predictions, targets);
      default:
        return this.mseLossGradient(predictions, targets);
    }
  }

  mseLoss(predictions, targets) {
    let sum = 0;
    for (let i = 0; i < predictions.length; i++) {
      const diff = predictions[i] - targets[i];
      sum += diff * diff;
    }
    return sum / predictions.length;
  }

  mseLossGradient(predictions, targets) {
    const gradient = [];
    for (let i = 0; i < predictions.length; i++) {
      gradient[i] = 2 * (predictions[i] - targets[i]) / predictions.length;
    }
    return gradient;
  }

  crossEntropyLoss(predictions, targets) {
    let sum = 0;
    for (let i = 0; i < predictions.length; i++) {
      sum -= targets[i] * Math.log(Math.max(predictions[i], 1e-15));
    }
    return sum;
  }

  crossEntropyLossGradient(predictions, targets) {
    const gradient = [];
    for (let i = 0; i < predictions.length; i++) {
      gradient[i] = -targets[i] / Math.max(predictions[i], 1e-15);
    }
    return gradient;
  }

  binaryCrossEntropyLoss(predictions, targets) {
    let sum = 0;
    for (let i = 0; i < predictions.length; i++) {
      const pred = Math.max(Math.min(predictions[i], 1 - 1e-15), 1e-15);
      sum -= targets[i] * Math.log(pred) + (1 - targets[i]) * Math.log(1 - pred);
    }
    return sum / predictions.length;
  }

  binaryCrossEntropyLossGradient(predictions, targets) {
    const gradient = [];
    for (let i = 0; i < predictions.length; i++) {
      const pred = Math.max(Math.min(predictions[i], 1 - 1e-15), 1e-15);
      gradient[i] = (pred - targets[i]) / (pred * (1 - pred) * predictions.length);
    }
    return gradient;
  }

  fit(trainingData, trainingTargets, validationData = null, validationTargets = null) {
    console.log(`🧠 Training neural network with ${this.layers.length} layers...`);
    
    const numSamples = trainingData.length;
    const numBatches = Math.ceil(numSamples / this.batchSize);
    
    let bestValLoss = Infinity;
    let patienceCounter = 0;

    for (let epoch = 0; epoch < this.epochs; epoch++) {
      let epochLoss = 0;
      
      // Shuffle data
      const indices = Array.from({ length: numSamples }, (_, i) => i);
      this.shuffleArray(indices);

      // Train on batches
      for (let batch = 0; batch < numBatches; batch++) {
        const batchStart = batch * this.batchSize;
        const batchEnd = Math.min(batchStart + this.batchSize, numSamples);
        const batchSize = batchEnd - batchStart;
        
        let batchLoss = 0;

        for (let i = 0; i < batchSize; i++) {
          const idx = indices[batchStart + i];
          const input = trainingData[idx];
          const target = trainingTargets[idx];

          // Forward pass
          const prediction = this.forward(input);

          // Calculate loss
          const loss = this.calculateLoss(prediction, target);
          batchLoss += loss;

          // Backward pass
          const lossGradient = this.calculateLossGradient(prediction, target);
          this.backward(lossGradient);
        }

        epochLoss += batchLoss / batchSize;
      }

      epochLoss /= numBatches;

      // Validation
      let valLoss = 0;
      if (validationData && validationTargets) {
        valLoss = this.evaluate(validationData, validationTargets);
      }

      // Update history
      this.history.loss.push(epochLoss);
      this.history.valLoss.push(valLoss);

      // Early stopping
      if (valLoss < bestValLoss) {
        bestValLoss = valLoss;
        patienceCounter = 0;
      } else {
        patienceCounter++;
        if (patienceCounter >= this.earlyStopping.patience) {
          console.log(`⏹️ Early stopping at epoch ${epoch + 1}`);
          break;
        }
      }

      // Log progress
      if (epoch % 10 === 0 || epoch === this.epochs - 1) {
        console.log(`Epoch ${epoch + 1}/${this.epochs} - Loss: ${epochLoss.toFixed(6)} - Val Loss: ${valLoss.toFixed(6)}`);
      }
    }

    console.log('✅ Training completed');
    return this.history;
  }

  predict(inputs) {
    return this.forward(inputs);
  }

  evaluate(testData, testTargets) {
    let totalLoss = 0;
    
    for (let i = 0; i < testData.length; i++) {
      const prediction = this.forward(testData[i]);
      const loss = this.calculateLoss(prediction, testTargets[i]);
      totalLoss += loss;
    }
    
    return totalLoss / testData.length;
  }

  saveModel(filename) {
    const modelData = {
      config: this.config,
      layers: this.layers.map(layer => layer.getParameters()),
      history: this.history
    };
    
    // In a real implementation, this would save to file
    console.log(`💾 Model saved to ${filename}`);
    return modelData;
  }

  loadModel(modelData) {
    this.config = modelData.config;
    this.history = modelData.history;
    
    // Restore layer parameters
    modelData.layers.forEach((layerData, index) => {
      if (this.layers[index]) {
        this.layers[index].setParameters(layerData);
      }
    });
    
    console.log('📂 Model loaded successfully');
    return this;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  summary() {
    console.log('\n📊 Neural Network Summary:');
    console.log('================================');
    
    let totalParams = 0;
    
    this.layers.forEach((layer, index) => {
      let params = 0;
      if (layer.weights) {
        params += layer.weights.length * (layer.weights[0]?.length || 1);
      }
      if (layer.biases) {
        params += layer.biases.length;
      }
      totalParams += params;
      
      console.log(`Layer ${index + 1}: ${layer.type.toUpperCase()}`);
      console.log(`  Input Size: ${layer.inputSize}`);
      console.log(`  Output Size: ${layer.outputSize}`);
      console.log(`  Parameters: ${params}`);
      console.log(`  Activation: ${layer.activationFunction || 'none'}`);
      console.log('');
    });
    
    console.log(`Total Parameters: ${totalParams}`);
    console.log('================================\n');
  }
}

// Information Processing Neural Network for 100-layer system
class InformationProcessingNetwork extends NeuralNetwork {
  constructor(config = {}) {
    super(config);
    this.type = 'information_processing';
    this.informationFlow = config.informationFlow || 'sequential';
    this.adaptiveLearning = config.adaptiveLearning || true;
    this.knowledgeBase = config.knowledgeBase || [];
    this.processingHistory = [];
  }

  // Process information through neural layers
  processInformation(inputData, metadata = {}) {
    console.log(`🧠 Processing information with ${this.layers.length} neural layers...`);
    
    const processingResult = {
      input: inputData,
      metadata: metadata,
      stages: [],
      output: null,
      confidence: 0,
      processingTime: 0,
      qualityScore: 0
    };

    const startTime = Date.now();
    let currentData = inputData;
    let totalConfidence = 1;

    // Process through each layer
    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      const layerStartTime = Date.now();
      
      try {
        // Forward pass through layer
        const layerOutput = layer.forward(currentData);
        
        // Calculate layer confidence
        const layerConfidence = this.calculateLayerConfidence(layer, layerOutput);
        totalConfidence *= layerConfidence;
        
        // Store stage result
        processingResult.stages.push({
          layerIndex: i,
          layerType: layer.type,
          inputSize: Array.isArray(currentData) ? currentData.length : 1,
          outputSize: Array.isArray(layerOutput) ? layerOutput.length : 1,
          confidence: layerConfidence,
          processingTime: Date.now() - layerStartTime,
          activation: layer.activationFunction
        });
        
        currentData = layerOutput;
        
      } catch (error) {
        console.error(`❌ Error in layer ${i}:`, error.message);
        processingResult.stages.push({
          layerIndex: i,
          layerType: layer.type,
          error: error.message,
          confidence: 0
        });
        break;
      }
    }

    processingResult.output = currentData;
    processingResult.confidence = totalConfidence;
    processingResult.processingTime = Date.now() - startTime;
    processingResult.qualityScore = this.calculateQualityScore(processingResult);
    
    // Store in processing history
    this.processingHistory.push(processingResult);
    
    // Adaptive learning
    if (this.adaptiveLearning) {
      this.adaptFromResult(processingResult);
    }

    return processingResult;
  }

  calculateLayerConfidence(layer, output) {
    // Calculate confidence based on output characteristics
    let confidence = 0.5; // Base confidence
    
    if (Array.isArray(output)) {
      // Check output stability
      const outputVariance = this.calculateVariance(output);
      confidence += Math.max(0, 0.3 - outputVariance * 0.1);
      
      // Check output range
      const outputRange = Math.max(...output) - Math.min(...output);
      if (outputRange > 0.1 && outputRange < 10) {
        confidence += 0.2;
      }
    }
    
    return Math.min(1, Math.max(0, confidence));
  }

  calculateVariance(data) {
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
    return variance;
  }

  calculateQualityScore(processingResult) {
    let score = 0;
    
    // Processing time score (faster is better up to a point)
    const timeScore = Math.max(0, 1 - processingResult.processingTime / 1000);
    score += timeScore * 0.3;
    
    // Confidence score
    score += processingResult.confidence * 0.4;
    
    // Layer success rate
    const successfulLayers = processingResult.stages.filter(stage => !stage.error).length;
    const layerSuccessRate = successfulLayers / processingResult.stages.length;
    score += layerSuccessRate * 0.3;
    
    return Math.min(1, score);
  }

  adaptFromResult(processingResult) {
    // Adaptive learning based on processing results
    const qualityScore = processingResult.qualityScore;
    
    if (qualityScore < 0.7) {
      // Adjust learning rates for poorly performing layers
      processingResult.stages.forEach((stage, index) => {
        if (stage.confidence < 0.5) {
          const layer = this.layers[index];
          if (layer.learningRate) {
            layer.learningRate *= 1.1; // Increase learning rate
          }
        }
      });
    }
    
    // Update knowledge base
    if (qualityScore > 0.8) {
      this.knowledgeBase.push({
        input: processingResult.input,
        output: processingResult.output,
        confidence: processingResult.confidence,
        timestamp: new Date()
      });
      
      // Limit knowledge base size
      if (this.knowledgeBase.length > 1000) {
        this.knowledgeBase.shift();
      }
    }
  }

  // Specialized methods for information processing
  processTextInformation(text, language = 'vi') {
    // Convert text to numerical representation
    const textFeatures = this.extractTextFeatures(text, language);
    return this.processInformation(textFeatures, { type: 'text', language: language });
  }

  processSearchResults(searchResults, query) {
    // Convert search results to numerical representation
    const searchFeatures = this.extractSearchFeatures(searchResults, query);
    return this.processInformation(searchFeatures, { type: 'search', query: query });
  }

  processContentExtraction(extractedContent, url) {
    // Convert extracted content to numerical representation
    const contentFeatures = this.extractContentFeatures(extractedContent);
    return this.processInformation(contentFeatures, { type: 'content', url: url });
  }

  extractTextFeatures(text, language) {
    // Simplified text feature extraction
    const features = [];
    
    // Text length
    features.push(text.length / 1000); // Normalized
    
    // Word count
    const words = text.split(/\s+/);
    features.push(words.length / 100); // Normalized
    
    // Average word length
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    features.push(avgWordLength / 10); // Normalized
    
    // Language-specific features
    if (language === 'vi') {
      const vietnameseChars = (text.match(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/g) || []).length;
      features.push(vietnameseChars / text.length);
    }
    
    // Add padding if needed
    while (features.length < this.layers[0].inputSize) {
      features.push(0);
    }
    
    return features.slice(0, this.layers[0].inputSize);
  }

  extractSearchFeatures(searchResults, query) {
    const features = [];
    
    // Number of results
    features.push((searchResults.length || 0) / 10); // Normalized
    
    // Query length
    features.push(query.length / 50); // Normalized
    
    // Average relevance score
    if (searchResults && searchResults.length > 0) {
      const avgRelevance = searchResults.reduce((sum, result) => sum + (result.relevance || 0), 0) / searchResults.length;
      features.push(avgRelevance);
    } else {
      features.push(0);
    }
    
    // Add padding if needed
    while (features.length < this.layers[0].inputSize) {
      features.push(0);
    }
    
    return features.slice(0, this.layers[0].inputSize);
  }

  extractContentFeatures(extractedContent) {
    const features = [];
    
    // Content length
    const contentLength = extractedContent.content ? extractedContent.content.length : 0;
    features.push(contentLength / 10000); // Normalized
    
    // Number of links
    const linkCount = extractedContent.links ? extractedContent.links.length : 0;
    features.push(linkCount / 50); // Normalized
    
    // Number of images
    const imageCount = extractedContent.images ? extractedContent.images.length : 0;
    features.push(imageCount / 20); // Normalized
    
    // Has metadata
    const hasMetadata = extractedContent.metadata && Object.keys(extractedContent.metadata).length > 0;
    features.push(hasMetadata ? 1 : 0);
    
    // Add padding if needed
    while (features.length < this.layers[0].inputSize) {
      features.push(0);
    }
    
    return features.slice(0, this.layers[0].inputSize);
  }

  getProcessingStatistics() {
    if (this.processingHistory.length === 0) {
      return null;
    }
    
    const history = this.processingHistory;
    
    return {
      totalProcessed: history.length,
      averageProcessingTime: history.reduce((sum, result) => sum + result.processingTime, 0) / history.length,
      averageConfidence: history.reduce((sum, result) => sum + result.confidence, 0) / history.length,
      averageQualityScore: history.reduce((sum, result) => sum + result.qualityScore, 0) / history.length,
      knowledgeBaseSize: this.knowledgeBase.length,
      layerPerformance: this.calculateLayerPerformance()
    };
  }

  calculateLayerPerformance() {
    const layerStats = {};
    
    for (let i = 0; i < this.layers.length; i++) {
      const layerResults = this.processingHistory.map(result => result.stages[i]).filter(stage => stage);
      
      if (layerResults.length > 0) {
        layerStats[i] = {
          type: this.layers[i].type,
          averageConfidence: layerResults.reduce((sum, stage) => sum + (stage.confidence || 0), 0) / layerResults.length,
          averageProcessingTime: layerResults.reduce((sum, stage) => sum + (stage.processingTime || 0), 0) / layerResults.length,
          errorRate: layerResults.filter(stage => stage.error).length / layerResults.length
        };
      }
    }
    
    return layerStats;
  }
}

module.exports = {
  NeuralLayerBase,
  DenseLayer,
  ConvolutionalLayer,
  LSTMLayer,
  AttentionLayer,
  DropoutLayer,
  BatchNormalizationLayer,
  NeuralNetwork,
  InformationProcessingNetwork
};
