// Document Processing Demo
// Demo xử lý tài liệu lớn với nhiều định dạng

const DocumentProcessor = require('./document-processor.js');
const LargeDocumentHandler = require('./large-document-handler.js');

// Demo functions
async function demonstrateBasicDocumentProcessing() {
  console.log('=== BASIC DOCUMENT PROCESSING DEMO ===\n');

  const processor = new DocumentProcessor({
    maxFileSize: 50 * 1024 * 1024, // 50MB
    maxPages: 1000,
    extractImages: true,
    extractTables: true,
    extractMetadata: true,
    ocrEnabled: true,
    parallelProcessing: true
  });

  await processor.initialize();

  // Sample documents of different types
  const sampleDocuments = [
    {
      name: 'sample_document.txt',
      size: 1024000, // 1MB
      type: 'text/plain'
    },
    {
      name: 'report.pdf',
      size: 5242880, // 5MB
      type: 'application/pdf'
    },
    {
      name: 'spreadsheet.xlsx',
      size: 2097152, // 2MB
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    {
      name: 'presentation.pptx',
      size: 3145728, // 3MB
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    },
    {
      name: 'image_document.jpg',
      size: 2048576, // 2MB
      type: 'image/jpeg'
    },
    {
      name: 'archive.zip',
      size: 10485760, // 10MB
      type: 'application/zip'
    }
  ];

  console.log('📄 Processing sample documents...\n');

  for (const doc of sampleDocuments) {
    try {
      console.log(`📁 Processing: ${doc.name} (${(doc.size / 1024).toFixed(2)} KB)`);
      
      const job = await processor.processDocument(doc, {
        extractImages: true,
        extractTables: true,
        ocrEnabled: doc.type.startsWith('image/')
      });

      // Wait for processing to complete
      await waitForJobCompletion(processor, job.id);

      const completedJob = processor.getJobStatus(job.id);
      
      console.log(`✅ Processing completed:`);
      console.log(`   Status: ${completedJob.status}`);
      console.log(`   Processing Time: ${completedJob.endTime - completedJob.startTime}ms`);
      
      if (completedJob.result) {
        const result = completedJob.result;
        console.log(`   Type: ${result.type}`);
        console.log(`   Content Length: ${result.content.length} characters`);
        
        if (result.pages) {
          console.log(`   Pages: ${result.pages}`);
        }
        
        if (result.images && result.images.length > 0) {
          console.log(`   Images: ${result.images.length}`);
        }
        
        if (result.tables && result.tables.length > 0) {
          console.log(`   Tables: ${result.tables.length}`);
        }
        
        if (result.metadata && Object.keys(result.metadata).length > 0) {
          console.log(`   Metadata: ${Object.keys(result.metadata).join(', ')}`);
        }
      }
      
      console.log('');

    } catch (error) {
      console.log(`❌ Processing failed for ${doc.name}: ${error.message}\n`);
    }
  }

  // Show processor statistics
  const stats = processor.getStatistics();
  console.log('📊 Processor Statistics:');
  console.log(`   Total Jobs: ${stats.totalJobs}`);
  console.log(`   Success Rate: ${stats.successRate.toFixed(1)}%`);
  console.log(`   Average Processing Time: ${stats.averageProcessingTime.toFixed(2)}ms`);
  console.log(`   File Type Distribution: ${JSON.stringify(stats.fileTypeDistribution)}`);

  return processor;
}

async function demonstrateLargeDocumentProcessing() {
  console.log('=== LARGE DOCUMENT PROCESSING DEMO ===\n');

  const largeHandler = new LargeDocumentHandler({
    maxFileSize: 500 * 1024 * 1024, // 500MB
    maxPages: 10000,
    maxImages: 5000,
    chunkSize: 100, // Process 100 pages at a time
    memoryLimit: 256 * 1024 * 1024, // 256MB
    parallelChunks: 3,
    onProgress: (process, progress, message) => {
      console.log(`   📊 [${process.id}] ${progress.toFixed(1)}% - ${message}`);
    },
    onError: (process, error) => {
      console.error(`   ❌ [${process.id}] Error: ${error.message}`);
    }
  });

  await largeHandler.initialize();

  // Sample large documents
  const largeDocuments = [
    {
      name: 'large_report.pdf',
      size: 100 * 1024 * 1024, // 100MB (~2000 pages)
      type: 'application/pdf'
    },
    {
      name: 'huge_document.docx',
      size: 250 * 1024 * 1024, // 250MB (~5000 pages)
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    },
    {
      name: 'massive_data.xlsx',
      size: 150 * 1024 * 1024, // 150MB (~100 sheets)
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  ];

  console.log('📚 Processing large documents...\n');

  for (const doc of largeDocuments) {
    try {
      console.log(`📚 Processing large document: ${doc.name} (${largeHandler.formatFileSize(doc.size)})`);
      
      const process = await largeHandler.processLargeDocument(doc, {
        extractImages: true,
        extractTables: true,
        optimizeResults: true
      });

      // Wait for processing to complete
      await waitForProcessCompletion(largeHandler, process.id);

      const completedProcess = largeHandler.getProcessStatus(process.id);
      
      console.log(`✅ Large document processing completed:`);
      console.log(`   Status: ${completedProcess.status}`);
      console.log(`   Processing Time: ${(completedProcess.endTime - completedProcess.startTime) / 1000} seconds`);
      
      if (completedProcess.statistics) {
        const stats = completedProcess.statistics;
        console.log(`   Total Pages: ${stats.totalPages}`);
        console.log(`   Processed Pages: ${stats.processedPages}`);
        console.log(`   Extracted Images: ${stats.extractedImages}`);
        console.log(`   Extracted Tables: ${stats.extractedTables}`);
      }
      
      if (completedProcess.results) {
        const results = completedProcess.results;
        console.log(`   Text Content: ${results.text.length} characters`);
        console.log(`   Images: ${results.images.length}`);
        console.log(`   Tables: ${results.tables.length}`);
        console.log(`   Sections: ${results.sections ? results.sections.length : 0}`);
        
        if (results.summary) {
          console.log(`   Document Summary:`);
          console.log(`     Total Words: ${results.summary.totalWords}`);
          console.log(`     Complexity: ${results.summary.complexity}`);
          console.log(`     Has Images: ${results.summary.hasImages}`);
          console.log(`     Has Tables: ${results.summary.hasTables}`);
        }
      }
      
      if (completedProcess.results && completedProcess.results.metadata) {
        const metadata = completedProcess.results.metadata;
        console.log(`   Quality Assessment:`);
        console.log(`     Quality Score: ${metadata.quality.score}`);
        console.log(`     Quality Grade: ${metadata.quality.grade}`);
        
        if (metadata.quality.issues.length > 0) {
          console.log(`     Issues: ${metadata.quality.issues.join(', ')}`);
        }
      }
      
      console.log('');

    } catch (error) {
      console.log(`❌ Large document processing failed for ${doc.name}: ${error.message}\n`);
    }
  }

  // Show handler statistics
  const stats = largeHandler.getProcessingStatistics();
  console.log('📊 Large Document Handler Statistics:');
  console.log(`   Total Documents: ${stats.totalDocuments}`);
  console.log(`   Total Pages Processed: ${stats.totalPagesProcessed}`);
  console.log(`   Total Images Extracted: ${stats.totalImagesExtracted}`);
  console.log(`   Average Pages/Second: ${stats.averagePagesPerSecond.toFixed(2)}`);
  console.log(`   Memory Usage: ${largeHandler.formatFileSize(stats.memoryUsage)}`);
  console.log(`   Memory Utilization: ${stats.memoryUtilization.toFixed(1)}%`);

  return largeHandler;
}

async function demonstrateMixedDocumentBatch() {
  console.log('=== MIXED DOCUMENT BATCH PROCESSING DEMO ===\n');

  const processor = new DocumentProcessor({
    parallelProcessing: true,
    progressTracking: true
  });

  const largeHandler = new LargeDocumentHandler({
    chunkSize: 50,
    parallelChunks: 2
  });

  await processor.initialize();
  await largeHandler.initialize();

  // Mixed batch of documents
  const mixedDocuments = [
    // Small documents
    { name: 'notes.txt', size: 10240, type: 'text/plain' },
    { name: 'invoice.pdf', size: 512000, type: 'application/pdf' },
    { name: 'data.csv', size: 204800, type: 'text/csv' },
    
    // Medium documents
    { name: 'contract.docx', size: 2097152, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { name: 'financial_report.xlsx', size: 5242880, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    
    // Large documents
    { name: 'research_paper.pdf', size: 50 * 1024 * 1024, type: 'application/pdf' },
    { name: 'book_chapter.docx', size: 30 * 1024 * 1024, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  ];

  console.log(`📦 Processing mixed batch of ${mixedDocuments.length} documents...\n`);

  const results = [];
  const startTime = Date.now();

  // Process documents in parallel with appropriate handlers
  const processingPromises = mixedDocuments.map(async (doc, index) => {
    console.log(`📄 [${index + 1}/${mixedDocuments.length}] Processing: ${doc.name}`);
    
    try {
      let result;
      
      // Choose appropriate processor based on size
      if (doc.size > 20 * 1024 * 1024) { // 20MB+
        result = await largeHandler.processLargeDocument(doc);
      } else {
        result = await processor.processDocument(doc);
      }
      
      return {
        filename: doc.name,
        size: doc.size,
        success: true,
        result: result,
        processor: doc.size > 20 * 1024 * 1024 ? 'large' : 'standard'
      };
      
    } catch (error) {
      return {
        filename: doc.name,
        size: doc.size,
        success: false,
        error: error.message,
        processor: doc.size > 20 * 1024 * 1024 ? 'large' : 'standard'
      };
    }
  });

  // Wait for all processing to complete
  const batchResults = await Promise.all(processingPromises);
  
  const totalTime = Date.now() - startTime;
  const successful = batchResults.filter(r => r.success);
  const failed = batchResults.filter(r => !r.success);

  console.log('\n📊 Batch Processing Results:');
  console.log(`   Total Documents: ${batchResults.length}`);
  console.log(`   Successful: ${successful.length}`);
  console.log(`   Failed: ${failed.length}`);
  console.log(`   Total Time: ${(totalTime / 1000).toFixed(2)} seconds`);
  console.log(`   Average Time per Document: ${(totalTime / batchResults.length).toFixed(2)}ms`);

  // Processor breakdown
  const standardProcessed = successful.filter(r => r.processor === 'standard');
  const largeProcessed = successful.filter(r => r.processor === 'large');
  
  console.log(`\n🔧 Processor Breakdown:`);
  console.log(`   Standard Processor: ${standardProcessed.length} documents`);
  console.log(`   Large Document Handler: ${largeProcessed.length} documents`);

  // Size analysis
  const totalSize = batchResults.reduce((sum, r) => sum + r.size, 0);
  const processedSize = successful.reduce((sum, r) => sum + r.size, 0);
  
  console.log(`\n📏 Size Analysis:`);
  console.log(`   Total Size: ${largeHandler.formatFileSize(totalSize)}`);
  console.log(`   Processed Size: ${largeHandler.formatFileSize(processedSize)}`);
  console.log(`   Processing Rate: ${(processedSize / (totalTime / 1000) / 1024 / 1024).toFixed(2)} MB/s`);

  // Content analysis
  let totalCharacters = 0;
  let totalImages = 0;
  let totalTables = 0;

  successful.forEach(result => {
    if (result.result && result.result.result) {
      const docResult = result.result.result;
      totalCharacters += docResult.content ? docResult.content.length : 0;
      totalImages += docResult.images ? docResult.images.length : 0;
      totalTables += docResult.tables ? docResult.tables.length : 0;
    }
  });

  console.log(`\n📝 Content Analysis:`);
  console.log(`   Total Characters Extracted: ${totalCharacters.toLocaleString()}`);
  console.log(`   Total Images Extracted: ${totalImages}`);
  console.log(`   Total Tables Extracted: ${totalTables}`);

  return { processor, largeHandler, batchResults };
}

async function demonstrateAdvancedFeatures() {
  console.log('=== ADVANCED DOCUMENT PROCESSING FEATURES DEMO ===\n');

  const processor = new DocumentProcessor({
    extractImages: true,
    extractTables: true,
    extractMetadata: true,
    ocrEnabled: true,
    parallelProcessing: true
  });

  await processor.initialize();

  // Test advanced features
  console.log('🔬 Testing advanced features...\n');

  // 1. OCR on image documents
  console.log('1️⃣ OCR Feature Test:');
  const imageDoc = {
    name: 'scanned_document.jpg',
    size: 3072000, // 3MB
    type: 'image/jpeg'
  };

  try {
    const ocrJob = await processor.processDocument(imageDoc, {
      ocrEnabled: true,
      ocrLanguage: 'vi'
    });

    await waitForJobCompletion(processor, ocrJob.id);
    const ocrResult = processor.getJobStatus(ocrJob.id);

    console.log(`   ✅ OCR Processing: ${ocrResult.status}`);
    if (ocrResult.result && ocrResult.result.ocrText) {
      console.log(`   Extracted Text Length: ${ocrResult.result.ocrText.length} characters`);
      console.log(`   Language Detected: ${ocrResult.result.metadata.language || 'unknown'}`);
    }
  } catch (error) {
    console.log(`   ❌ OCR failed: ${error.message}`);
  }

  // 2. Table extraction from HTML
  console.log('\n2️⃣ Table Extraction Test:');
  const htmlDoc = {
    name: 'financial_report.html',
    size: 1024000, // 1MB
    type: 'text/html'
  };

  try {
    const tableJob = await processor.processDocument(htmlDoc, {
      extractTables: true,
      extractImages: true
    });

    await waitForJobCompletion(processor, tableJob.id);
    const tableResult = processor.getJobStatus(tableJob.id);

    console.log(`   ✅ Table Extraction: ${tableResult.status}`);
    if (tableResult.result && tableResult.result.tables) {
      console.log(`   Tables Found: ${tableResult.result.tables.length}`);
      tableResult.result.tables.forEach((table, index) => {
        console.log(`     Table ${index + 1}: ${table.rowCount} rows × ${table.columnCount} columns`);
      });
    }
  } catch (error) {
    console.log(`   ❌ Table extraction failed: ${error.message}`);
  }

  // 3. Archive processing
  console.log('\n3️⃣ Archive Processing Test:');
  const archiveDoc = {
    name: 'project_files.zip',
    size: 20971520, // 20MB
    type: 'application/zip'
  };

  try {
    const archiveJob = await processor.processDocument(archiveDoc, {
      extractArchiveContents: true,
      processExtractedFiles: true
    });

    await waitForJobCompletion(processor, archiveJob.id);
    const archiveResult = processor.getJobStatus(archiveJob.id);

    console.log(`   ✅ Archive Processing: ${archiveResult.status}`);
    if (archiveResult.result && archiveResult.result.files) {
      console.log(`   Files Extracted: ${archiveResult.result.files.length}`);
      const textFiles = archiveResult.result.files.filter(f => f.extension === 'txt');
      const imageFiles = archiveResult.result.files.filter(f => ['jpg', 'png', 'gif'].includes(f.extension));
      console.log(`   Text Files: ${textFiles.length}`);
      console.log(`   Image Files: ${imageFiles.length}`);
    }
  } catch (error) {
    console.log(`   ❌ Archive processing failed: ${error.message}`);
  }

  // 4. Language detection
  console.log('\n4️⃣ Language Detection Test:');
  const textSamples = [
    { name: 'vietnamese_text.txt', content: 'Đây là văn bản tiếng Việt để kiểm tra phát hiện ngôn ngữ.' },
    { name: 'english_text.txt', content: 'This is English text for language detection testing.' },
    { name: 'mixed_text.txt', content: 'Mixed content with English và tiếng Việt text.' }
  ];

  for (const sample of textSamples) {
    const detectedLanguage = processor.detectLanguage(sample.content);
    console.log(`   ${sample.name}: ${detectedLanguage}`);
  }

  // 5. Progress tracking
  console.log('\n5️⃣ Progress Tracking Test:');
  const progressDoc = {
    name: 'large_document.pdf',
    size: 10485760, // 10MB
    type: 'application/pdf'
  };

  let progressUpdates = [];
  
  const progressJob = await processor.processDocument(progressDoc, {
    onProgress: (job, progress, message) => {
      progressUpdates.push({ progress, message, timestamp: Date.now() });
      console.log(`     📊 Progress: ${progress.toFixed(1)}% - ${message}`);
    }
  });

  await waitForJobCompletion(processor, progressJob.id);
  
  console.log(`   ✅ Progress Updates: ${progressUpdates.length} updates received`);
  console.log(`   Processing Time: ${Date.now() - progressJob.startTime}ms`);

  return processor;
}

// Helper functions
async function waitForJobCompletion(processor, jobId, timeout = 60000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const job = processor.getJobStatus(jobId);
    
    if (job.status === 'completed' || job.status === 'failed') {
      return job;
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  throw new Error(`Job ${jobId} timed out`);
}

async function waitForProcessCompletion(handler, processId, timeout = 300000) { // 5 minutes
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const process = handler.getProcessStatus(processId);
    
    if (process.status === 'completed' || process.status === 'failed') {
      return process;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error(`Process ${processId} timed out`);
}

// Main execution function
async function runAllDocumentDemos() {
  try {
    console.log('🎯 DOCUMENT PROCESSING DEMOS\n');
    console.log('='.repeat(60));
    
    await demonstrateBasicDocumentProcessing();
    await demonstrateLargeDocumentProcessing();
    await demonstrateMixedDocumentBatch();
    await demonstrateAdvancedFeatures();
    
    console.log('\n🎉 All document processing demos completed!');
    
  } catch (error) {
    console.error('💥 Demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateBasicDocumentProcessing,
  demonstrateLargeDocumentProcessing,
  demonstrateMixedDocumentBatch,
  demonstrateAdvancedFeatures,
  runAllDocumentDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllDocumentDemos();
}
