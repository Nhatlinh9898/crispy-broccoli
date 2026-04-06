/**
 * Training Configuration Manager
 * Centralized configuration for all training parameters
 */

class TrainingConfig {
    constructor() {
        this.defaultConfig = this.getDefaultConfig();
        this.currentConfig = { ...this.defaultConfig };
        this.categoryConfigs = this.getCategoryConfigs();
        this.modelConfigs = this.getModelConfigs();
    }

    /**
     * Get default training configuration
     */
    getDefaultConfig() {
        return {
            // General Training Parameters
            epochs: 100,
            batchSize: 32,
            learningRate: 0.001,
            validationSplit: 0.2,
            earlyStopping: true,
            patience: 10,
            minDelta: 0.001,
            
            // Data Parameters
            maxSequenceLength: 512,
            vocabularySize: 10000,
            embeddingDim: 128,
            dropoutRate: 0.2,
            
            // Model Architecture
            hiddenLayers: [256, 128, 64],
            activationFunction: 'relu',
            optimizer: 'adam',
            lossFunction: 'categoricalCrossentropy',
            
            // Quality Thresholds
            minAccuracy: 0.85,
            minQualityScore: 0.80,
            minCompleteness: 0.90,
            
            // Resource Limits
            maxMemoryUsage: '4GB',
            maxTrainingTime: 3600, // seconds
            maxGpuMemory: '2GB',
            
            // Output Settings
            saveModel: true,
            exportFormat: 'json',
            logLevel: 'info',
            checkpointInterval: 10,
            
            // Advanced Settings
            dataAugmentation: true,
            transferLearning: false,
            ensembleTraining: false,
            hyperparameterTuning: false
        };
    }

    /**
     * Get category-specific configurations
     */
    getCategoryConfigs() {
        return {
            industrial_components: {
                epochs: 120,
                batchSize: 16,
                learningRate: 0.0008,
                validationSplit: 0.25,
                dropoutRate: 0.3,
                hiddenLayers: [512, 256, 128],
                minAccuracy: 0.95,
                minQualityScore: 0.90,
                technicalDepth: 'high',
                complianceRequired: true,
                standards: ['ISO', 'DIN', 'JIS'],
                dataAugmentation: false,
                transferLearning: true
            },
            
            consumer_electronics: {
                epochs: 80,
                batchSize: 64,
                learningRate: 0.002,
                validationSplit: 0.15,
                dropoutRate: 0.25,
                hiddenLayers: [256, 128, 64],
                minAccuracy: 0.88,
                minQualityScore: 0.85,
                technicalDepth: 'medium',
                userFriendliness: 0.90,
                platformOptimization: true,
                seoOptimization: true,
                dataAugmentation: true
            },
            
            retail_products: {
                epochs: 60,
                batchSize: 128,
                learningRate: 0.003,
                validationSplit: 0.1,
                dropoutRate: 0.2,
                hiddenLayers: [128, 64, 32],
                minAccuracy: 0.82,
                minQualityScore: 0.80,
                technicalDepth: 'low',
                conversionFocus: 0.85,
                marketingOptimization: true,
                abTesting: true,
                dataAugmentation: true
            },
            
            agriculture: {
                epochs: 100,
                batchSize: 48,
                learningRate: 0.0015,
                validationSplit: 0.2,
                dropoutRate: 0.25,
                hiddenLayers: [256, 128, 64],
                minAccuracy: 0.87,
                minQualityScore: 0.83,
                technicalDepth: 'medium-high',
                practicalFocus: 0.88,
                seasonalData: true,
                weatherIntegration: true,
                cropSpecific: true
            },
            
            services: {
                epochs: 70,
                batchSize: 32,
                learningRate: 0.0025,
                validationSplit: 0.15,
                dropoutRate: 0.2,
                hiddenLayers: [256, 128, 64],
                minAccuracy: 0.85,
                minQualityScore: 0.82,
                technicalDepth: 'medium',
                businessFocus: 0.87,
                roiAnalysis: true,
                customerSegmentation: true,
                caseStudyIntegration: true
            },
            
            digital_products: {
                epochs: 90,
                batchSize: 56,
                learningRate: 0.0018,
                validationSplit: 0.18,
                dropoutRate: 0.25,
                hiddenLayers: [256, 128, 64],
                minAccuracy: 0.90,
                minQualityScore: 0.88,
                technicalDepth: 'medium',
                educationalFocus: 0.92,
                learningObjectives: true,
                assessmentIntegration: true,
                certificationFocus: true
            }
        };
    }

    /**
     * Get model-specific configurations
     */
    getModelConfigs() {
        return {
            content_generator: {
                type: 'sequence-to-sequence',
                encoder: 'transformer',
                decoder: 'lstm',
                attentionMechanism: true,
                beamSearch: true,
                maxLength: 1024,
                temperature: 0.7,
                topK: 50,
                topP: 0.9
            },
            
            quality_assessor: {
                type: 'classification',
                architecture: 'cnn-lstm',
                multiTask: true,
                tasks: ['accuracy', 'completeness', 'readability', 'technical_correctness'],
                weights: [0.3, 0.25, 0.2, 0.25]
            },
            
            category_classifier: {
                type: 'classification',
                architecture: 'transformer',
                numClasses: 6,
                confidenceThreshold: 0.8,
                hierarchical: true
            },
            
            seo_optimizer: {
                type: 'multi-task',
                tasks: ['keyword_extraction', 'meta_generation', 'structure_optimization'],
                architecture: 'bert-based',
                fineTuning: true
            }
        };
    }

    /**
     * Get configuration for specific category
     */
    getCategoryConfig(category) {
        const categoryConfig = this.categoryConfigs[category] || {};
        return { ...this.defaultConfig, ...categoryConfig };
    }

    /**
     * Get configuration for specific model
     */
    getModelConfig(modelType) {
        return this.modelConfigs[modelType] || this.modelConfigs.content_generator;
    }

    /**
     * Update configuration
     */
    updateConfig(newConfig) {
        this.currentConfig = { ...this.currentConfig, ...newConfig };
        this.saveConfig();
    }

    /**
     * Update category configuration
     */
    updateCategoryConfig(category, newConfig) {
        if (!this.categoryConfigs[category]) {
            this.categoryConfigs[category] = {};
        }
        this.categoryConfigs[category] = { ...this.categoryConfigs[category], ...newConfig };
        this.saveConfig();
    }

    /**
     * Get training schedule
     */
    getTrainingSchedule() {
        return {
            phases: [
                {
                    name: 'warmup',
                    epochs: 10,
                    learningRate: 0.0001,
                    description: 'Gradual learning rate increase'
                },
                {
                    name: 'main_training',
                    epochs: 80,
                    learningRate: 0.001,
                    description: 'Main training phase'
                },
                {
                    name: 'fine_tuning',
                    epochs: 10,
                    learningRate: 0.0001,
                    description: 'Fine-tuning with low learning rate'
                }
            ],
            checkpointInterval: 10,
            validationInterval: 5,
            earlyStopping: true
        };
    }

    /**
     * Get data preprocessing configuration
     */
    getDataPreprocessingConfig() {
        return {
            textProcessing: {
                lowercase: true,
                removePunctuation: false,
                removeNumbers: false,
                removeStopwords: false,
                stemming: false,
                lemmatization: true,
                minLength: 3,
                maxLength: 100
            },
            tokenization: {
                tokenizer: 'wordpiece',
                vocabularySize: 10000,
                unknownToken: '[UNK]',
                paddingToken: '[PAD]',
                startToken: '[CLS]',
                endToken: '[SEP]'
            },
            augmentation: {
                synonymReplacement: 0.1,
                randomInsertion: 0.1,
                randomSwap: 0.1,
                randomDeletion: 0.1,
                backTranslation: false
            }
        };
    }

    /**
     * Get evaluation configuration
     */
    getEvaluationConfig() {
        return {
            metrics: [
                'accuracy',
                'precision',
                'recall',
                'f1_score',
                'bleu_score',
                'rouge_score',
                'perplexity'
            ],
            crossValidation: {
                enabled: true,
                folds: 5,
                stratified: true
            },
            testSet: {
                size: 0.2,
                stratified: true,
                randomSeed: 42
            },
            benchmarks: {
                baselineComparison: true,
                statisticalSignificance: true,
                effectSize: true
            }
        };
    }

    /**
     * Get deployment configuration
     */
    getDeploymentConfig() {
        return {
            optimization: {
                quantization: true,
                pruning: true,
                knowledgeDistillation: false,
                modelCompression: true
            },
            serving: {
                batchSize: 1,
                maxLatency: 100, // ms
                maxMemoryUsage: '512MB',
                scalingPolicy: 'auto'
            },
            monitoring: {
                metrics: ['latency', 'throughput', 'error_rate', 'memory_usage'],
                alerting: true,
                logging: true,
                dashboard: true
            }
        };
    }

    /**
     * Validate configuration
     */
    validateConfig(config = this.currentConfig) {
        const errors = [];
        const warnings = [];

        // Validate learning rate
        if (config.learningRate <= 0 || config.learningRate > 1) {
            errors.push('Learning rate must be between 0 and 1');
        }

        // Validate batch size
        if (config.batchSize <= 0 || config.batchSize > 1024) {
            errors.push('Batch size must be between 1 and 1024');
        }

        // Validate epochs
        if (config.epochs <= 0 || config.epochs > 1000) {
            errors.push('Epochs must be between 1 and 1000');
        }

        // Validate validation split
        if (config.validationSplit <= 0 || config.validationSplit >= 1) {
            errors.push('Validation split must be between 0 and 1');
        }

        // Warnings for potentially problematic settings
        if (config.learningRate > 0.01) {
            warnings.push('High learning rate may cause training instability');
        }

        if (config.batchSize > 256) {
            warnings.push('Large batch size may require more memory');
        }

        if (config.epochs < 50) {
            warnings.push('Low epoch count may result in underfitting');
        }

        return {
            isValid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    }

    /**
     * Optimize configuration for hardware
     */
    optimizeForHardware(hardwareSpecs) {
        const optimizedConfig = { ...this.currentConfig };

        // Adjust batch size based on available memory
        if (hardwareSpecs.memory) {
            const memoryGB = parseInt(hardwareSpecs.memory);
            if (memoryGB < 8) {
                optimizedConfig.batchSize = Math.min(optimizedConfig.batchSize, 16);
            } else if (memoryGB >= 32) {
                optimizedConfig.batchSize = Math.min(optimizedConfig.batchSize * 2, 256);
            }
        }

        // Adjust for GPU availability
        if (hardwareSpecs.hasGPU) {
            optimizedConfig.batchSize *= 2;
            optimizedConfig.hiddenLayers = optimizedConfig.hiddenLayers.map(size => size * 1.5);
        }

        // Adjust for CPU cores
        if (hardwareSpecs.cpuCores) {
            const optimalBatchSize = hardwareSpecs.cpuCores * 8;
            optimizedConfig.batchSize = Math.min(optimizedConfig.batchSize, optimalBatchSize);
        }

        return optimizedConfig;
    }

    /**
     * Export configuration to JSON
     */
    exportConfig() {
        return {
            default: this.defaultConfig,
            current: this.currentConfig,
            categories: this.categoryConfigs,
            models: this.modelConfigs,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Import configuration from JSON
     */
    importConfig(configJson) {
        try {
            const config = JSON.parse(configJson);
            
            if (config.default) this.defaultConfig = config.default;
            if (config.current) this.currentConfig = config.current;
            if (config.categories) this.categoryConfigs = config.categories;
            if (config.models) this.modelConfigs = config.models;
            
            this.saveConfig();
            return true;
        } catch (error) {
            console.error('Failed to import configuration:', error);
            return false;
        }
    }

    /**
     * Save configuration to localStorage
     */
    saveConfig() {
        try {
            const config = this.exportConfig();
            localStorage.setItem('trainingConfig', JSON.stringify(config));
        } catch (error) {
            console.error('Failed to save configuration:', error);
        }
    }

    /**
     * Load configuration from localStorage
     */
    loadConfig() {
        try {
            const savedConfig = localStorage.getItem('trainingConfig');
            if (savedConfig) {
                const config = JSON.parse(savedConfig);
                
                if (config.default) this.defaultConfig = config.default;
                if (config.current) this.currentConfig = config.current;
                if (config.categories) this.categoryConfigs = config.categories;
                if (config.models) this.modelConfigs = config.models;
                
                return true;
            }
        } catch (error) {
            console.error('Failed to load configuration:', error);
        }
        return false;
    }

    /**
     * Reset to default configuration
     */
    resetToDefault() {
        this.currentConfig = { ...this.defaultConfig };
        this.saveConfig();
    }

    /**
     * Get configuration summary
     */
    getSummary() {
        return {
            epochs: this.currentConfig.epochs,
            batchSize: this.currentConfig.batchSize,
            learningRate: this.currentConfig.learningRate,
            validationSplit: this.currentConfig.validationSplit,
            accuracy: this.currentConfig.minAccuracy,
            quality: this.currentConfig.minQualityScore,
            categories: Object.keys(this.categoryConfigs).length,
            models: Object.keys(this.modelConfigs).length
        };
    }
}

export default TrainingConfig;
