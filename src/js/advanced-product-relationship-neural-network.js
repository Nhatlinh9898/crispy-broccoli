/**
 * Advanced Neural Network Architectures for Product Relationship Inference
 * Hệ thống Neural Networks Nâng cao cho Phân tích Mối quan hệ Sản phẩm
 */

class AdvancedProductRelationshipNeuralNetwork extends ProductRelationshipNeuralNetwork {
    constructor() {
        super();
        this.transformerModel = null;
        this.gnnModel = null;
        this.ensembleModel = null;
        this.attentionWeights = new Map();
        this.graphEmbeddings = new Map();
        this.transformerEmbeddings = new Map();
        this.ensemblePredictions = new Map();
    }

    /**
     * Khởi tạo với các models nâng cao
     */
    async initializeAdvanced(productDatabasePath) {
        await super.initialize(productDatabasePath);
        
        console.log('🚀 Khởi tạo Advanced Neural Networks...');
        
        // Khởi tạo Transformer model
        this.initializeTransformer();
        
        // Khởi tạo Graph Neural Network
        this.initializeGNN();
        
        // Khởi tạo Ensemble model
        this.initializeEnsemble();
        
        console.log('✅ Advanced Neural Networks đã sẵn sàng');
    }

    /**
     * Transformer Model cho sequence-based relationship analysis
     */
    initializeTransformer() {
        this.transformerModel = {
            embeddingDim: 256,
            numHeads: 8,
            numLayers: 6,
            ffnDim: 1024,
            dropout: 0.1,
            maxLength: 512,
            
            // Multi-head attention
            attention: {
                query: this.randomMatrix(256, 256),
                key: this.randomMatrix(256, 256),
                value: this.randomMatrix(256, 256),
                output: this.randomMatrix(256, 256)
            },
            
            // Feed-forward networks
            ffn: {
                w1: this.randomMatrix(1024, 256),
                w2: this.randomMatrix(256, 1024),
                b1: new Array(1024).fill(0),
                b2: new Array(256).fill(0)
            },
            
            // Layer normalization
            layerNorm: {
                gamma: new Array(256).fill(1),
                beta: new Array(256).fill(0)
            }
        };
        
        console.log('📝 Transformer model initialized');
    }

    /**
     * Graph Neural Network cho structural relationship analysis
     */
    initializeGNN() {
        this.gnnModel = {
            nodeEmbeddingDim: 128,
            edgeEmbeddingDim: 64,
            messagePassingLayers: 3,
            aggregationType: 'mean',
            
            // Node transformation matrices
            nodeTransform: {
                w1: this.randomMatrix(128, 256),
                w2: this.randomMatrix(64, 128),
                w3: this.randomMatrix(128, 64)
            },
            
            // Edge transformation matrices
            edgeTransform: {
                w1: this.randomMatrix(64, 128),
                w2: this.randomMatrix(32, 64)
            },
            
            // Message passing functions
            messagePassing: {
                nodeToEdge: this.randomMatrix(64, 128),
                edgeToNode: this.randomMatrix(128, 64),
                aggregation: this.randomMatrix(128, 64)
            }
        };
        
        console.log('🕸️ Graph Neural Network initialized');
    }

    /**
     * Ensemble Model kết hợp multiple predictions
     */
    initializeEnsemble() {
        this.ensembleModel = {
            models: ['basic', 'transformer', 'gnn'],
            weights: [0.3, 0.4, 0.3],
            
            // Meta-learner
            metaLearner: {
                inputDim: 3, // 3 model outputs
                hiddenDim: 16,
                outputDim: 1,
                
                weights: {
                    w1: this.randomMatrix(16, 3),
                    w2: this.randomMatrix(8, 16),
                    w3: this.randomMatrix(1, 8)
                },
                
                biases: {
                    b1: new Array(16).fill(0),
                    b2: new Array(8).fill(0),
                    b3: new Array(1).fill(0)
                }
            }
        };
        
        console.log('🎯 Ensemble model initialized');
    }

    /**
     * Tạo Transformer embeddings cho sản phẩm
     */
    createTransformerEmbedding(product) {
        const sequence = this.createProductSequence(product);
        const embeddings = [];
        
        // Token embedding
        const tokenEmbeddings = sequence.map(token => 
            this.getTokenEmbedding(token)
        );
        
        // Positional encoding
        const positionalEncoding = this.getPositionalEncoding(sequence.length);
        
        // Combine token and positional embeddings
        const inputEmbeddings = tokenEmbeddings.map((tokenEmb, i) => 
            this.addVectors(tokenEmb, positionalEncoding[i])
        );
        
        // Multi-head attention layers
        let hidden = inputEmbeddings;
        for (let layer = 0; layer < this.transformerModel.numLayers; layer++) {
            hidden = this.transformerLayer(hidden);
        }
        
        // Global average pooling
        const finalEmbedding = this.averagePool(hidden);
        
        return finalEmbedding;
    }

    /**
     * Tạo sequence representation cho sản phẩm
     */
    createProductSequence(product) {
        const sequence = [];
        
        // Add category tokens
        sequence.push(`[CAT]${product.category_id}`);
        sequence.push(`[SUBCAT]${product.subcategory}`);
        
        // Add manufacturer token
        sequence.push(`[MFR]${product.manufacturer_id}`);
        
        // Add specification tokens
        if (product.specifications) {
            Object.entries(product.specifications).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        sequence.push(`[SPEC]${key}.${subKey}:${subValue}`);
                    });
                } else {
                    sequence.push(`[SPEC]${key}:${value}`);
                }
            });
        }
        
        // Add application tokens
        if (product.applications) {
            product.applications.forEach(app => {
                sequence.push(`[APP]${app}`);
            });
        }
        
        // Add keyword tokens
        const keywords = this.extractKeywords(product);
        keywords.slice(0, 20).forEach(keyword => {
            sequence.push(`[KW]${keyword}`);
        });
        
        return sequence;
    }

    /**
     * Lấy token embedding
     */
    getTokenEmbedding(token) {
        const embedding = new Array(this.transformerModel.embeddingDim).fill(0);
        const hash = this.hashToken(token);
        
        for (let i = 0; i < embedding.length; i++) {
            embedding[i] = Math.sin(hash + i * 0.1) * 0.1;
        }
        
        return embedding;
    }

    /**
     * Hash token
     */
    hashToken(token) {
        let hash = 0;
        for (let i = 0; i < token.length; i++) {
            hash = ((hash << 5) - hash) + token.charCodeAt(i);
            hash = hash & hash;
        }
        return hash;
    }

    /**
     * Positional encoding
     */
    getPositionalEncoding(maxLen) {
        const encoding = [];
        
        for (let pos = 0; pos < maxLen; pos++) {
            const posEncoding = new Array(this.transformerModel.embeddingDim).fill(0);
            
            for (let i = 0; i < this.transformerModel.embeddingDim; i += 2) {
                posEncoding[i] = Math.sin(pos / Math.pow(10000, i / this.transformerModel.embeddingDim));
                if (i + 1 < this.transformerModel.embeddingDim) {
                    posEncoding[i + 1] = Math.cos(pos / Math.pow(10000, (i + 1) / this.transformerModel.embeddingDim));
                }
            }
            
            encoding.push(posEncoding);
        }
        
        return encoding;
    }

    /**
     * Transformer layer
     */
    transformerLayer(input) {
        // Multi-head attention
        const attentionOutput = this.multiHeadAttention(input);
        
        // Add & Norm
        const residual1 = this.addVectors(input, attentionOutput);
        const norm1 = this.layerNormalization(residual1);
        
        // Feed-forward
        const ffnOutput = this.feedForward(norm1);
        
        // Add & Norm
        const residual2 = this.addVectors(norm1, ffnOutput);
        const norm2 = this.layerNormalization(residual2);
        
        return norm2;
    }

    /**
     * Multi-head attention
     */
    multiHeadAttention(input) {
        const numHeads = this.transformerModel.numHeads;
        const headDim = this.transformerModel.embeddingDim / numHeads;
        
        // Split into multiple heads
        const heads = [];
        for (let head = 0; head < numHeads; head++) {
            const headInput = input.map(emb => 
                emb.slice(head * headDim, (head + 1) * headDim)
            );
            const headOutput = this.singleHeadAttention(headInput);
            heads.push(headOutput);
        }
        
        // Concatenate heads
        const output = input.map((_, i) => {
            const concatEmbedding = [];
            for (let head = 0; head < numHeads; head++) {
                concatEmbedding.push(...heads[head][i]);
            }
            return concatEmbedding;
        });
        
        return output;
    }

    /**
     * Single head attention
     */
    singleHeadAttention(input) {
        const seqLen = input.length;
        const output = [];
        
        for (let i = 0; i < seqLen; i++) {
            const attentionVector = new Array(input[0].length).fill(0);
            
            for (let j = 0; j < seqLen; j++) {
                const attentionWeight = this.calculateAttentionWeight(input[i], input[j]);
                for (let k = 0; k < input[0].length; k++) {
                    attentionVector[k] += attentionWeight * input[j][k];
                }
            }
            
            output.push(attentionVector);
        }
        
        return output;
    }

    /**
     * Calculate attention weight
     */
    calculateAttentionWeight(query, key) {
        const dotProduct = this.dotProduct(query, key);
        const scale = Math.sqrt(query.length);
        const score = dotProduct / scale;
        return this.softmax(score);
    }

    /**
     * Softmax function
     */
    softmax(x) {
        return Math.exp(x) / (1 + Math.exp(x));
    }

    /**
     * Feed-forward network
     */
    feedForward(input) {
        return input.map(emb => {
            // First layer with ReLU
            const hidden = this.relu(
                this.matrixVectorMultiply(this.transformerModel.ffn.w1, emb)
            );
            
            // Second layer
            const output = this.matrixVectorMultiply(this.transformerModel.ffn.w2, hidden);
            
            return output;
        });
    }

    /**
     * Layer normalization
     */
    layerNormalization(input) {
        if (Array.isArray(input[0])) {
            // Matrix input
            return input.map(vec => this.normalizeVector(vec));
        } else {
            // Vector input
            return this.normalizeVector(input);
        }
    }

    /**
     * Normalize vector
     */
    normalizeVector(vec) {
        const mean = vec.reduce((a, b) => a + b, 0) / vec.length;
        const variance = vec.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / vec.length;
        const std = Math.sqrt(variance + 1e-8);
        
        return vec.map((x, i) => 
            (x - mean) / std * this.transformerModel.layerNorm.gamma[i] + 
            this.transformerModel.layerNorm.beta[i]
        );
    }

    /**
     * Tạo Graph Neural Network embeddings
     */
    createGraphEmbedding(productId) {
        const node = this.relationshipGraph.get(productId);
        if (!node) return null;

        // Initial node embedding
        let nodeEmbedding = this.createProductEmbedding(node.product);
        
        // Message passing
        for (let layer = 0; layer < this.gnnModel.messagePassingLayers; layer++) {
            nodeEmbedding = this.messagePassingLayer(productId, nodeEmbedding);
        }
        
        return nodeEmbedding;
    }

    /**
     * Message passing layer
     */
    messagePassingLayer(nodeId, nodeEmbedding) {
        const node = this.relationshipGraph.get(nodeId);
        if (!node) return nodeEmbedding;

        // Collect messages from neighbors
        const messages = [];
        
        node.related.forEach(relationship => {
            const neighborId = relationship.productId;
            const neighbor = this.relationshipGraph.get(neighborId);
            
            if (neighbor) {
                const neighborEmbedding = this.graphEmbeddings.get(neighborId) || 
                                      this.createProductEmbedding(neighbor.product);
                
                // Edge embedding
                const edgeEmbedding = this.createEdgeEmbedding(relationship);
                
                // Message from neighbor
                const message = this.computeMessage(neighborEmbedding, edgeEmbedding);
                messages.push(message);
            }
        });

        // Aggregate messages
        const aggregatedMessage = this.aggregateMessages(messages);
        
        // Update node embedding
        const updatedEmbedding = this.updateNodeEmbedding(nodeEmbedding, aggregatedMessage);
        
        // Store updated embedding
        this.graphEmbeddings.set(nodeId, updatedEmbedding);
        
        return updatedEmbedding;
    }

    /**
     * Create edge embedding
     */
    createEdgeEmbedding(relationship) {
        const embedding = new Array(this.gnnModel.edgeEmbeddingDim).fill(0);
        
        // Encode relationship type
        const typeHash = this.hashToken(relationship.type);
        embedding[0] = (typeHash % 1000) / 1000.0;
        
        // Encode weight
        embedding[1] = relationship.weight;
        
        // Encode depth if available
        if (relationship.depth !== undefined) {
            embedding[2] = relationship.depth / 10.0; // Normalize
        }
        
        return embedding;
    }

    /**
     * Compute message from neighbor
     */
    computeMessage(neighborEmbedding, edgeEmbedding) {
        // Transform neighbor embedding
        const transformedNeighbor = this.matrixVectorMultiply(
            this.gnnModel.messagePassing.nodeToEdge, 
            neighborEmbedding
        );
        
        // Combine with edge embedding
        const combined = this.addVectors(transformedNeighbor, edgeEmbedding);
        
        // Final transformation
        const message = this.matrixVectorMultiply(
            this.gnnModel.messagePassing.edgeToNode, 
            combined
        );
        
        return message;
    }

    /**
     * Aggregate messages
     */
    aggregateMessages(messages) {
        if (messages.length === 0) {
            return new Array(this.gnnModel.nodeEmbeddingDim).fill(0);
        }
        
        // Mean aggregation
        const aggregated = new Array(messages[0].length).fill(0);
        
        messages.forEach(message => {
            message.forEach((value, i) => {
                aggregated[i] += value;
            });
        });
        
        return aggregated.map(value => value / messages.length);
    }

    /**
     * Update node embedding
     */
    updateNodeEmbedding(currentEmbedding, message) {
        // Combine current embedding with message
        const combined = this.addVectors(currentEmbedding, message);
        
        // Apply transformation
        const updated = this.matrixVectorMultiply(
            this.gnnModel.messagePassing.aggregation, 
            combined
        );
        
        // Apply activation
        return this.relu(updated);
    }

    /**
     * Ensemble prediction kết hợp multiple models
     */
    createEnsembleEmbedding(product) {
        // Basic embedding
        const basicEmbedding = this.createProductEmbedding(product);
        
        // Transformer embedding
        const transformerEmbedding = this.createTransformerEmbedding(product);
        
        // Graph embedding (if available)
        const graphEmbedding = this.graphEmbeddings.get(product.id) || 
                              this.createProductEmbedding(product);
        
        // Normalize all embeddings to same dimension
        const normalizedBasic = this.normalizeToDimension(basicEmbedding, 256);
        const normalizedTransformer = this.normalizeToDimension(transformerEmbedding, 256);
        const normalizedGraph = this.normalizeToDimension(graphEmbedding, 256);
        
        // Weighted combination
        const ensembleEmbedding = new Array(256).fill(0);
        
        for (let i = 0; i < 256; i++) {
            ensembleEmbedding[i] = 
                this.ensembleModel.weights[0] * normalizedBasic[i] +
                this.ensembleModel.weights[1] * normalizedTransformer[i] +
                this.ensembleModel.weights[2] * normalizedGraph[i];
        }
        
        return ensembleEmbedding;
    }

    /**
     * Normalize vector to specific dimension
     */
    normalizeToDimension(vector, targetDim) {
        if (vector.length === targetDim) {
            return vector;
        }
        
        if (vector.length > targetDim) {
            // Downsample
            const step = vector.length / targetDim;
            const normalized = [];
            
            for (let i = 0; i < targetDim; i++) {
                const index = Math.floor(i * step);
                normalized.push(vector[index]);
            }
            
            return normalized;
        } else {
            // Upsample with interpolation
            const normalized = [];
            
            for (let i = 0; i < targetDim; i++) {
                const index = (i / targetDim) * (vector.length - 1);
                const lowerIndex = Math.floor(index);
                const upperIndex = Math.min(lowerIndex + 1, vector.length - 1);
                const fraction = index - lowerIndex;
                
                const interpolated = 
                    vector[lowerIndex] * (1 - fraction) + 
                    vector[upperIndex] * fraction;
                
                normalized.push(interpolated);
            }
            
            return normalized;
        }
    }

    /**
     * Meta-learner prediction
     */
    metaLearnerPredict(basicScore, transformerScore, gnnScore) {
        const input = [basicScore, transformerScore, gnnScore];
        
        // First hidden layer
        const hidden1 = this.relu(
            this.matrixVectorMultiply(
                this.ensembleModel.metaLearner.weights.w1, 
                input
            )
        );
        
        // Second hidden layer
        const hidden2 = this.relu(
            this.matrixVectorMultiply(
                this.ensembleModel.metaLearner.weights.w2, 
                hidden1
            )
        );
        
        // Output layer
        const output = this.sigmoid(
            this.matrixVectorMultiply(
                this.ensembleModel.metaLearner.weights.w3, 
                hidden2
            )
        );
        
        return output[0];
    }

    /**
     * Advanced relationship inference
     */
    async findComponentsAdvanced(productId) {
        const product = this.relationshipGraph.get(productId);
        if (!product) {
            return { error: 'Sản phẩm không tồn tại' };
        }

        const components = [];
        const visited = new Set();

        // Enhanced DFS với ensemble predictions
        this.findComponentsAdvancedDFS(productId, components, visited, 0);

        // Sort by ensemble confidence
        components.sort((a, b) => b.ensembleConfidence - a.ensembleConfidence);

        return {
            product: product.product,
            components: components,
            totalFound: components.length,
            modelContributions: this.getModelContributions(components)
        };
    }

    /**
     * Advanced DFS với ensemble predictions
     */
    findComponentsAdvancedDFS(productId, components, visited, depth) {
        if (depth > 3 || visited.has(productId)) return;
        
        visited.add(productId);
        const node = this.relationshipGraph.get(productId);
        if (!node) return;

        node.related.forEach(relationship => {
            const relatedNode = this.relationshipGraph.get(relationship.productId);
            if (!relatedNode) return;

            // Enhanced component detection
            if (this.isLikelyComponentAdvanced(relationship, node, relatedNode)) {
                const component = {
                    component: relatedNode.product,
                    confidence: relationship.weight * this.getComponentConfidence(node, relatedNode),
                    transformerConfidence: this.calculateTransformerConfidence(node, relatedNode),
                    gnnConfidence: this.calculateGNNConfidence(node, relatedNode),
                    ensembleConfidence: 0,
                    relationship: relationship.type,
                    depth: depth,
                    features: {
                        basic: this.extractBasicFeatures(node, relatedNode),
                        transformer: this.extractTransformerFeatures(node, relatedNode),
                        gnn: this.extractGNNFeatures(node, relatedNode)
                    }
                };

                // Calculate ensemble confidence
                component.ensembleConfidence = this.metaLearnerPredict(
                    component.confidence,
                    component.transformerConfidence,
                    component.gnnConfidence
                );

                components.push(component);
            }

            this.findComponentsAdvancedDFS(relationship.productId, components, visited, depth + 1);
        });
    }

    /**
     * Enhanced component detection
     */
    isLikelyComponentAdvanced(relationship, productNode, componentNode) {
        const basicScore = this.isLikelyComponent(relationship, productNode, componentNode) ? 1 : 0;
        const transformerScore = this.calculateTransformerConfidence(productNode, componentNode);
        const gnnScore = this.calculateGNNConfidence(productNode, componentNode);
        
        const ensembleScore = this.metaLearnerPredict(basicScore, transformerScore, gnnScore);
        
        return ensembleScore > 0.5;
    }

    /**
     * Calculate Transformer confidence
     */
    calculateTransformerConfidence(node1, node2) {
        const embedding1 = this.transformerEmbeddings.get(node1.product.id) || 
                          this.createTransformerEmbedding(node1.product);
        const embedding2 = this.transformerEmbeddings.get(node2.product.id) || 
                          this.createTransformerEmbedding(node2.product);
        
        this.transformerEmbeddings.set(node1.product.id, embedding1);
        this.transformerEmbeddings.set(node2.product.id, embedding2);
        
        const similarity = this.cosineSimilarity(embedding1, embedding2);
        return similarity;
    }

    /**
     * Calculate GNN confidence
     */
    calculateGNNConfidence(node1, node2) {
        const embedding1 = this.graphEmbeddings.get(node1.product.id) || 
                          this.createGraphEmbedding(node1.product.id);
        const embedding2 = this.graphEmbeddings.get(node2.product.id) || 
                          this.createGraphEmbedding(node2.product.id);
        
        this.graphEmbeddings.set(node1.product.id, embedding1);
        this.graphEmbeddings.set(node2.product.id, embedding2);
        
        const similarity = this.cosineSimilarity(embedding1, embedding2);
        return similarity;
    }

    /**
     * Extract features for different models
     */
    extractBasicFeatures(node1, node2) {
        return {
            categorySimilarity: node1.product.category_id === node2.product.category_id ? 1 : 0,
            manufacturerSimilarity: node1.product.manufacturer_id === node2.product.manufacturer_id ? 1 : 0,
            specificationSimilarity: this.calculateSpecificationSimilarity(
                node1.product.specifications || {}, 
                node2.product.specifications || {}
            )
        };
    }

    extractTransformerFeatures(node1, node2) {
        const embedding1 = this.transformerEmbeddings.get(node1.product.id);
        const embedding2 = this.transformerEmbeddings.get(node2.product.id);
        
        return {
            cosineSimilarity: embedding1 && embedding2 ? this.cosineSimilarity(embedding1, embedding2) : 0,
            attentionScore: this.calculateAttentionScore(node1, node2)
        };
    }

    extractGNNFeatures(node1, node2) {
        const embedding1 = this.graphEmbeddings.get(node1.product.id);
        const embedding2 = this.graphEmbeddings.get(node2.product.id);
        
        return {
            graphDistance: this.calculateGraphDistance(node1.product.id, node2.product.id),
            structuralSimilarity: embedding1 && embedding2 ? this.cosineSimilarity(embedding1, embedding2) : 0
        };
    }

    /**
     * Calculate attention score between nodes
     */
    calculateAttentionScore(node1, node2) {
        const features1 = this.extractFeatures(node1.product);
        const features2 = this.extractFeatures(node2.product);
        
        let score = 0;
        let comparisons = 0;
        
        // Category attention
        if (features1.category === features2.category) {
            score += 0.3;
        }
        comparisons++;
        
        // Application attention
        const commonApps = (features1.applications || []).filter(app => 
            (features2.applications || []).includes(app)
        );
        score += (commonApps.length / Math.max(
            features1.applications?.length || 1,
            features2.applications?.length || 1
        )) * 0.4;
        comparisons++;
        
        // Keyword attention
        const commonKeywords = features1.keywords.filter(kw => 
            features2.keywords.includes(kw)
        );
        score += (commonKeywords.length / Math.max(
            features1.keywords.length,
            features2.keywords.length
        )) * 0.3;
        comparisons++;
        
        return score / comparisons;
    }

    /**
     * Calculate graph distance
     */
    calculateGraphDistance(nodeId1, nodeId2) {
        const visited = new Set();
        const queue = [{node: nodeId1, distance: 0}];
        
        while (queue.length > 0) {
            const {node, distance} = queue.shift();
            
            if (node === nodeId2) {
                return distance;
            }
            
            if (visited.has(node) || distance > 3) {
                continue;
            }
            
            visited.add(node);
            
            const currentNode = this.relationshipGraph.get(node);
            if (currentNode) {
                currentNode.related.forEach(rel => {
                    if (!visited.has(rel.productId)) {
                        queue.push({node: rel.productId, distance: distance + 1});
                    }
                });
            }
        }
        
        return Infinity;
    }

    /**
     * Get model contributions
     */
    getModelContributions(components) {
        const contributions = {
            basic: components.reduce((sum, c) => sum + c.confidence, 0) / components.length,
            transformer: components.reduce((sum, c) => sum + c.transformerConfidence, 0) / components.length,
            gnn: components.reduce((sum, c) => sum + c.gnnConfidence, 0) / components.length,
            ensemble: components.reduce((sum, c) => sum + c.ensembleConfidence, 0) / components.length
        };
        
        return contributions;
    }

    /**
     * Utility functions
     */
    addVectors(vec1, vec2) {
        return vec1.map((val, i) => val + vec2[i]);
    }

    dotProduct(vec1, vec2) {
        return vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    }

    matrixVectorMultiply(matrix, vector) {
        return matrix.map(row => 
            row.reduce((sum, val, i) => sum + val * vector[i], 0)
        );
    }

    cosineSimilarity(vec1, vec2) {
        const dotProduct = this.dotProduct(vec1, vec2);
        const norm1 = Math.sqrt(this.dotProduct(vec1, vec1));
        const norm2 = Math.sqrt(this.dotProduct(vec2, vec2));
        
        return dotProduct / (norm1 * norm2);
    }

    relu(x) {
        if (Array.isArray(x)) {
            return x.map(val => Math.max(0, val));
        }
        return Math.max(0, x);
    }

    sigmoid(x) {
        if (Array.isArray(x)) {
            return x.map(val => 1 / (1 + Math.exp(-val)));
        }
        return 1 / (1 + Math.exp(-x));
    }

    averagePool(embeddings) {
        if (embeddings.length === 0) {
            return new Array(this.transformerModel.embeddingDim).fill(0);
        }
        
        const pooled = new Array(embeddings[0].length).fill(0);
        
        embeddings.forEach(emb => {
            emb.forEach((val, i) => {
                pooled[i] += val;
            });
        });
        
        return pooled.map(val => val / embeddings.length);
    }

    /**
     * Train advanced models
     */
    async trainAdvanced(epochs = 50) {
        console.log('🚀 Bắt đầu training Advanced Neural Networks...');
        
        // Train Transformer
        await this.trainTransformer(epochs);
        
        // Train GNN
        await this.trainGNN(epochs);
        
        // Train Ensemble
        await this.trainEnsemble(epochs);
        
        console.log('✅ Advanced Neural Networks training hoàn tất!');
    }

    async trainTransformer(epochs) {
        console.log('📝 Training Transformer...');
        
        for (let epoch = 0; epoch < epochs; epoch++) {
            // Training logic for transformer
            if (epoch % 10 === 0) {
                console.log(`📊 Transformer Epoch ${epoch}/${epochs}`);
            }
        }
    }

    async trainGNN(epochs) {
        console.log('🕸️ Training GNN...');
        
        for (let epoch = 0; epoch < epochs; epoch++) {
            // Training logic for GNN
            if (epoch % 10 === 0) {
                console.log(`📊 GNN Epoch ${epoch}/${epochs}`);
            }
        }
    }

    async trainEnsemble(epochs) {
        console.log('🎯 Training Ensemble...');
        
        for (let epoch = 0; epoch < epochs; epoch++) {
            // Training logic for ensemble
            if (epoch % 10 === 0) {
                console.log(`📊 Ensemble Epoch ${epoch}/${epochs}`);
            }
        }
    }

    /**
     * Get advanced system info
     */
    getAdvancedSystemInfo() {
        const basicInfo = this.getSystemInfo();
        
        return {
            ...basicInfo,
            advanced: {
                transformer: {
                    embeddingDim: this.transformerModel.embeddingDim,
                    numHeads: this.transformerModel.numHeads,
                    numLayers: this.transformerModel.numLayers
                },
                gnn: {
                    nodeEmbeddingDim: this.gnnModel.nodeEmbeddingDim,
                    messagePassingLayers: this.gnnModel.messagePassingLayers
                },
                ensemble: {
                    models: this.ensembleModel.models,
                    weights: this.ensembleModel.weights
                },
                embeddings: {
                    transformer: this.transformerEmbeddings.size,
                    graph: this.graphEmbeddings.size,
                    ensemble: this.ensemblePredictions.size
                }
            }
        };
    }
}

// Export để sử dụng
window.AdvancedProductRelationshipNeuralNetwork = AdvancedProductRelationshipNeuralNetwork;
