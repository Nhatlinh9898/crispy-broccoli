# Hardware Scaling Guide for Neural Networks
# Hướng dẫn mở rộng tham số theo tài nguyên phần cứng

## 🖥️ Phân Loại Tài Nguyên Phần Cứng

### **Cấu Hình Thấp (Low-End)**
- **CPU**: 2 cores hoặc ít hơn
- **RAM**: 2GB hoặc ít hơn
- **GPU**: Không có hoặc integrated graphics
- **Khuyến nghị**: 100K - 500K tham số

### **Cấu Hình Trung Bình (Mid-Range)**
- **CPU**: 4 cores
- **RAM**: 4GB - 8GB
- **GPU**: GTX 1050 2GB / GTX 1060 3GB
- **Khuyến nghị**: 500K - 2M tham số

### **Cấu Hình Cao (High-End)**
- **CPU**: 6+ cores
- **RAM**: 8GB+
- **GPU**: GTX 1060 6GB / RTX 2060 6GB+
- **Khuyến nghị**: 2M - 10M tham số

## 📊 Bảng Tối Ưu Hóa Theo Tài Nguyên

### **CPU 2 Cores, RAM 2GB (Cấu hình thấp nhất)**
```javascript
// Tối đa: 100K tham số
const architecture = {
  layers: [
    { type: 'dense', inputSize: 64, outputSize: 32 },     // 2,080 params
    { type: 'dense', inputSize: 32, outputSize: 16 },     // 528 params
    { type: 'dense', inputSize: 16, outputSize: 8 },      // 136 params
    { type: 'dense', inputSize: 8, outputSize: 3 }        // 27 params
  ],
  totalParams: 2,771,
  memoryUsage: ~11KB,
  batchSize: 1,
  sequenceLength: 64
};
```

### **CPU 4 Cores, RAM 2GB, GPU GTX 1050 2GB**
```javascript
// Tối đa: 500K tham số
const architecture = {
  layers: [
    { type: 'dense', inputSize: 128, outputSize: 64 },    // 8,256 params
    { type: 'dense', inputSize: 64, outputSize: 32 },     // 2,080 params
    { type: 'lstm', inputSize: 32, hiddenSize: 16 },      // 3,072 params
    { type: 'dense', inputSize: 16, outputSize: 8 },      // 136 params
    { type: 'dense', inputSize: 8, outputSize: 3 }         // 27 params
  ],
  totalParams: 13,571,
  memoryUsage: ~54KB,
  batchSize: 2,
  sequenceLength: 128,
  useGPU: false // GPU 2GB không đủ cho training
};
```

### **CPU 4 Cores, RAM 4GB, GPU GTX 1060 3GB**
```javascript
// Tối đa: 1M tham số
const architecture = {
  layers: [
    { type: 'dense', inputSize: 256, outputSize: 128 },   // 32,896 params
    { type: 'dense', inputSize: 128, outputSize: 64 },    // 8,256 params
    { type: 'lstm', inputSize: 64, hiddenSize: 32 },      // 12,288 params
    { type: 'attention', inputSize: 32, keySize: 16 },    // 1,536 params
    { type: 'dense', inputSize: 32, outputSize: 16 },     // 528 params
    { type: 'dense', inputSize: 16, outputSize: 8 },      // 136 params
    { type: 'dense', inputSize: 8, outputSize: 3 }         // 27 params
  ],
  totalParams: 55,667,
  memoryUsage: ~223KB,
  batchSize: 4,
  sequenceLength: 256,
  useGPU: true // GPU 3GB đủ cho inference
};
```

### **CPU 4+ Cores, RAM 4GB+, GPU GTX 1060 6GB**
```javascript
// Tối đa: 2M tham số
const architecture = {
  layers: [
    { type: 'dense', inputSize: 512, outputSize: 256 },   // 131,328 params
    { type: 'batchnorm', inputSize: 256 },               // 512 params
    { type: 'dense', inputSize: 256, outputSize: 128 },   // 32,896 params
    { type: 'dropout', inputSize: 128 },                 // 0 params
    { type: 'lstm', inputSize: 128, hiddenSize: 64 },    // 49,152 params
    { type: 'attention', inputSize: 64, keySize: 32 },    // 6,144 params
    { type: 'dense', inputSize: 64, outputSize: 32 },     // 2,080 params
    { type: 'batchnorm', inputSize: 32 },                // 64 params
    { type: 'dense', inputSize: 32, outputSize: 16 },     // 528 params
    { type: 'dense', inputSize: 16, outputSize: 8 },      // 136 params
    { type: 'dense', inputSize: 8, outputSize: 3 }         // 27 params
  ],
  totalParams: 222,867,
  memoryUsage: ~891KB,
  batchSize: 8,
  sequenceLength: 512,
  useGPU: true // GPU 6GB tốt cho cả training và inference
};
```

## 🎯 Chiến Lược Tối Ưu Hóa

### **1. Memory Optimization**
```javascript
// Giảm kích thước model
const reduceModelSize = (originalConfig, memoryLimit) => {
  const scaleFactor = Math.sqrt(memoryLimit / originalConfig.memoryUsage);
  
  return {
    ...originalConfig,
    outputSize: Math.floor(originalConfig.outputSize * scaleFactor),
    hiddenSize: originalConfig.hiddenSize ? 
      Math.floor(originalConfig.hiddenSize * scaleFactor) : undefined,
    batchSize: Math.max(1, Math.floor(originalConfig.batchSize * 0.5))
  };
};
```

### **2. Batch Size Optimization**
```javascript
// Tối ưu batch size theo RAM
const optimizeBatchSize = (availableMemory, modelMemory) => {
  const maxBatchSize = Math.floor((availableMemory * 0.7) / modelMemory);
  return Math.max(1, Math.min(maxBatchSize, 32));
};
```

### **3. Sequence Length Optimization**
```javascript
// Tối ưu sequence length cho RNN/LSTM
const optimizeSequenceLength = (gpuMemory, modelParams) => {
  if (gpuMemory < 2 * 1024 * 1024 * 1024) return 128;  // 2GB GPU
  if (gpuMemory < 4 * 1024 * 1024 * 1024) return 256;  // 4GB GPU
  return 512; // 4GB+ GPU
};
```

## 📈 Quy Tắc Mở Rộng

### **Memory Scaling Rules**
- **1 Parameter** = 4 bytes (float32)
- **1MB Memory** = ~250K parameters
- **GPU Training** = 3-4x model size (gradients + optimizer states)
- **CPU Inference** = 1.5-2x model size (activations + temporary)

### **Performance Scaling**
- **CPU Cores**: Tăng batch size theo số cores
- **GPU Memory**: Tăng model size theo sqrt(gpu_memory)
- **RAM Total**: Giới hạn tổng model + data + optimizer

### **Quality vs Size Trade-offs**
```javascript
const qualityConfigs = {
  minimal: {
    accuracy: 0.7,
    params: 50000,
    latency: 'low',
    hardware: 'cpu_2cores_2gb'
  },
  balanced: {
    accuracy: 0.85,
    params: 500000,
    latency: 'medium',
    hardware: 'cpu_4cores_4gb_gpu_2gb'
  },
  high: {
    accuracy: 0.95,
    params: 2000000,
    latency: 'high',
    hardware: 'cpu_4cores_8gb_gpu_6gb'
  }
};
```

## 🛠️ Techniques Đặc Thù

### **1. Quantization (Giảm độ chính xác)**
```javascript
// Float32 → Float16/Int8
const quantizeModel = (model) => {
  // Giảm 50% memory usage
  // Mất ~1-2% accuracy
  return {
    ...model,
    precision: 'float16',
    memoryReduction: 0.5
  };
};
```

### **2. Pruning (Cắt bỏ kết nối)**
```javascript
// Loại bỏ weights nhỏ
const pruneModel = (model, sparsity = 0.5) => {
  // Giảm 50% parameters
  // Mất ~2-5% accuracy
  return {
    ...model,
    sparsity: sparsity,
    params: model.params * (1 - sparsity)
  };
};
```

### **3. Knowledge Distillation**
```javascript
// Dùng model lớn dạy model nhỏ
const distillModel = (teacherModel, studentModel) => {
  // Giảm 80% parameters
  // Giữ ~95% accuracy
  return {
    teacher: teacherModel,
    student: studentModel,
    compression: 0.2
  };
};
```

## 📋 Checklist Tối Ưu

### **Before Training**
- [ ] Detect available resources
- [ ] Calculate parameter limits
- [ ] Choose appropriate layer sizes
- [ ] Set batch size constraints
- [ ] Enable/disable features based on resources

### **During Training**
- [ ] Monitor memory usage
- [ ] Adjust batch size if OOM
- [ ] Use gradient accumulation for large models
- [ ] Enable mixed precision if GPU supports

### **After Training**
- [ ] Quantize model for deployment
- [ ] Prune unnecessary connections
- [ ] Optimize for target hardware
- [ ] Test performance on target device

## 🚀 Real-world Examples

### **Mobile Device (2GB RAM)**
```javascript
const mobileArchitecture = {
  maxParams: 100000,
  layers: [
    { type: 'depthwise_separable_conv', filters: 32 },
    { type: 'depthwise_separable_conv', filters: 64 },
    { type: 'global_average_pooling' },
    { type: 'dense', units: 10 }
  ],
  optimizations: ['quantization', 'pruning']
};
```

### **Desktop PC (GTX 1060 6GB)**
```javascript
const desktopArchitecture = {
  maxParams: 2000000,
  layers: [
    { type: 'conv', filters: 64, kernel: 3 },
    { type: 'conv', filters: 128, kernel: 3 },
    { type: 'lstm', units: 256 },
    { type: 'attention', heads: 8 },
    { type: 'dense', units: 128 },
    { type: 'dense', units: 10 }
  ],
  optimizations: ['mixed_precision']
};
```

### **Server (RTX 3080 10GB)**
```javascript
const serverArchitecture = {
  maxParams: 10000000,
  layers: [
    { type: 'transformer', layers: 12, heads: 12 },
    { type: 'conv', filters: 512, kernel: 3 },
    { type: 'lstm', units: 1024 },
    { type: 'dense', units: 512 }
  ],
  optimizations: ['full_precision', 'distributed']
};
```

## 💡 Tips & Tricks

### **Memory Saving**
1. Sử dụng `tf.float16` thay vì `tf.float32`
2. Enable gradient checkpointing
3. Use smaller batch sizes with gradient accumulation
4. Clear intermediate activations frequently

### **Speed Optimization**
1. Use GPU for matrix operations
2. Enable mixed precision training
3. Use optimized libraries (cuDNN, MKL)
4. Batch small operations together

### **Quality Preservation**
1. Use knowledge distillation
2. Implement progressive resizing
3. Use ensemble of small models
4. Apply fine-tuning after compression

---

**Lưu ý**: Các con số trong hướng dẫn này là ước tính và có thể thay đổi tùy thuộc vào implementation cụ thể và version của thư viện được sử dụng.
