// Workflow Definitions
// Định nghĩa các quy trình workflow cho hệ thống

const workflowDefinitions = {
  // Content Analysis Workflow
  content_analysis_workflow: {
    name: 'Content Analysis Pipeline',
    description: 'Phân tích nội dung toàn diện từ nhiều nguồn',
    steps: [
      {
        type: 'data_extraction',
        name: 'extract_raw_content',
        description: 'Trích xuất nội dung thô từ các nguồn',
        timeout: 30000,
        retryPolicy: {
          maxAttempts: 3,
          delay: 2000
        }
      },
      {
        type: 'content_analysis',
        name: 'analyze_content',
        description: 'Phân tích nội dung với NLP',
        timeout: 60000,
        retryPolicy: {
          maxAttempts: 2,
          delay: 5000
        },
        dependencies: [0]
      },
      {
        type: 'quality_assessment',
        name: 'assess_quality',
        description: 'Đánh giá chất lượng nội dung',
        timeout: 30000,
        dependencies: [1]
      },
      {
        type: 'data_transformation',
        name: 'transform_results',
        description: 'Chuyển đổi kết quả sang định dạng chuẩn',
        timeout: 20000,
        dependencies: [2]
      }
    ],
    parallel: false,
    timeout: 180000, // 3 minutes
    metadata: {
      category: 'content_processing',
      priority: 'high',
      automated: true
    }
  },

  // Document Processing Workflow
  document_processing_workflow: {
    name: 'Document Processing Pipeline',
    description: 'Xử lý tài liệu đa định dạng',
    steps: [
      {
        type: 'document_processing',
        name: 'process_document',
        description: 'Xử lý tài liệu gốc',
        timeout: 120000,
        retryPolicy: {
          maxAttempts: 3,
          delay: 3000
        }
      },
      {
        type: 'content_analysis',
        name: 'extract_content',
        description: 'Trích xuất và phân tích nội dung',
        timeout: 90000,
        dependencies: [0]
      },
      {
        type: 'media_processing',
        name: 'process_media',
        description: 'Xử lý media trong tài liệu',
        timeout: 60000,
        dependencies: [0]
      },
      {
        type: 'quality_assessment',
        name: 'validate_quality',
        description: 'Kiểm tra chất lượng xử lý',
        timeout: 30000,
        dependencies: [1, 2]
      },
      {
        type: 'data_transformation',
        name: 'format_output',
        description: 'Định dạng output cuối cùng',
        timeout: 20000,
        dependencies: [3]
      }
    ],
    parallel: false,
    timeout: 300000, // 5 minutes
    metadata: {
      category: 'document_processing',
      priority: 'medium',
      automated: true
    }
  },

  // Media Search and Analysis Workflow
  media_search_workflow: {
    name: 'Media Search and Analysis',
    description: 'Tìm kiếm và phân tích media',
    steps: [
      {
        type: 'image_search',
        name: 'search_images',
        description: 'Tìm kiếm hình ảnh liên quan',
        timeout: 60000,
        retryPolicy: {
          maxAttempts: 2,
          delay: 2000
        }
      },
      {
        type: 'media_processing',
        name: 'process_found_media',
        description: 'Xử lý media đã tìm thấy',
        timeout: 90000,
        dependencies: [0]
      },
      {
        type: 'quality_assessment',
        name: 'evaluate_media_quality',
        description: 'Đánh giá chất lượng media',
        timeout: 30000,
        dependencies: [1]
      },
      {
        type: 'content_analysis',
        name: 'analyze_media_content',
        description: 'Phân tích nội dung media',
        timeout: 60000,
        dependencies: [1]
      },
      {
        type: 'data_transformation',
        name: 'compile_media_report',
        description: 'Tổng hợp báo cáo media',
        timeout: 20000,
        dependencies: [2, 3]
      }
    ],
    parallel: false,
    timeout: 240000, // 4 minutes
    metadata: {
      category: 'media_processing',
      priority: 'medium',
      automated: true
    }
  },

  // Web Content Research Workflow
  web_research_workflow: {
    name: 'Web Content Research',
    description: 'Nghiên cứu nội dung từ web',
    steps: [
      {
        type: 'web_search',
        name: 'search_web',
        description: 'Tìm kiếm thông tin trên web',
        timeout: 60000,
        retryPolicy: {
          maxAttempts: 3,
          delay: 2000
        }
      },
      {
        type: 'data_extraction',
        name: 'extract_web_content',
        description: 'Trích xuất nội dung từ URLs',
        timeout: 90000,
        dependencies: [0]
      },
      {
        type: 'content_analysis',
        name: 'analyze_web_content',
        description: 'Phân tích nội dung web',
        timeout: 60000,
        dependencies: [1]
      },
      {
        type: 'quality_assessment',
        name: 'validate_web_sources',
        description: 'Kiểm tra độ tin cậy nguồn',
        timeout: 30000,
        dependencies: [2]
      },
      {
        type: 'data_transformation',
        name: 'compile_research_report',
        description: 'Tổng hợp báo cáo nghiên cứu',
        timeout: 20000,
        dependencies: [3]
      }
    ],
    parallel: false,
    timeout: 300000, // 5 minutes
    metadata: {
      category: 'web_research',
      priority: 'high',
      automated: true
    }
  },

  // Neural Network Processing Workflow
  neural_processing_workflow: {
    name: 'Neural Network Processing',
    description: 'Xử lý với mạng neural network',
    steps: [
      {
        type: 'data_validation',
        name: 'validate_input_data',
        description: 'Kiểm tra dữ liệu đầu vào',
        timeout: 15000
      },
      {
        type: 'data_transformation',
        name: 'preprocess_data',
        description: 'Tiền xử lý dữ liệu',
        timeout: 30000,
        dependencies: [0]
      },
      {
        type: 'neural_processing',
        name: 'neural_inference',
        description: 'Suy luận với neural network',
        timeout: 120000,
        dependencies: [1],
        retryPolicy: {
          maxAttempts: 2,
          delay: 5000
        }
      },
      {
        type: 'quality_assessment',
        name: 'evaluate_results',
        description: 'Đánh giá kết quả neural',
        timeout: 30000,
        dependencies: [2]
      },
      {
        type: 'data_transformation',
        name: 'postprocess_results',
        description: 'Hậu xử lý kết quả',
        timeout: 20000,
        dependencies: [3]
      }
    ],
    parallel: false,
    timeout: 240000, // 4 minutes
    metadata: {
      category: 'ai_processing',
      priority: 'high',
      automated: true
    }
  },

  // Content Generation Workflow
  content_generation_workflow: {
    name: 'Content Generation Pipeline',
    description: 'Tạo nội dung tự động',
    steps: [
      {
        type: 'content_analysis',
        name: 'analyze_requirements',
        description: 'Phân tích yêu cầu nội dung',
        timeout: 30000
      },
      {
        type: 'web_search',
        name: 'research_topic',
        description: 'Nghiên cứu chủ đề',
        timeout: 60000,
        dependencies: [0]
      },
      {
        type: 'neural_processing',
        name: 'generate_content_outline',
        description: 'Tạo dàn ý nội dung',
        timeout: 90000,
        dependencies: [0, 1]
      },
      {
        type: 'content_generation',
        name: 'generate_main_content',
        description: 'Tạo nội dung chính',
        timeout: 120000,
        dependencies: [2]
      },
      {
        type: 'quality_assessment',
        name: 'review_generated_content',
        description: 'Đánh giá nội dung đã tạo',
        timeout: 60000,
        dependencies: [3]
      },
      {
        type: 'data_transformation',
        name: 'format_final_content',
        description: 'Định dạng nội dung cuối',
        timeout: 30000,
        dependencies: [4]
      }
    ],
    parallel: false,
    timeout: 360000, // 6 minutes
    metadata: {
      category: 'content_generation',
      priority: 'medium',
      automated: true
    }
  },

  // System Monitoring Workflow
  system_monitoring_workflow: {
    name: 'System Health Monitoring',
    description: 'Giám sát sức khỏe hệ thống',
    steps: [
      {
        type: 'system_monitoring',
        name: 'check_system_resources',
        description: 'Kiểm tra tài nguyên hệ thống',
        timeout: 10000
      },
      {
        type: 'system_monitoring',
        name: 'check_service_status',
        description: 'Kiểm tra trạng thái dịch vụ',
        timeout: 15000
      },
      {
        type: 'data_validation',
        name: 'validate_data_integrity',
        description: 'Kiểm tra tính toàn vẹn dữ liệu',
        timeout: 30000
      },
      {
        type: 'performance_optimization',
        name: 'analyze_performance',
        description: 'Phân tích hiệu suất',
        timeout: 20000
      },
      {
        type: 'data_transformation',
        name: 'generate_health_report',
        description: 'Tạo báo cáo sức khỏe',
        timeout: 15000,
        dependencies: [0, 1, 2, 3]
      }
    ],
    parallel: true,
    timeout: 60000, // 1 minute
    metadata: {
      category: 'system_monitoring',
      priority: 'low',
      automated: true,
      schedule: '*/5 * * * *' // Every 5 minutes
    }
  },

  // Error Recovery Workflow
  error_recovery_workflow: {
    name: 'Automatic Error Recovery',
    description: 'Phục hồi lỗi tự động',
    steps: [
      {
        type: 'data_validation',
        name: 'diagnose_error',
        description: 'Chẩn đoán lỗi',
        timeout: 15000
      },
      {
        type: 'error_recovery',
        name: 'attempt_recovery',
        description: 'Thử phục hồi',
        timeout: 30000,
        dependencies: [0],
        retryPolicy: {
          maxAttempts: 3,
          delay: 5000
        }
      },
      {
        type: 'system_monitoring',
        name: 'verify_recovery',
        description: 'Kiểm tra phục hồi',
        timeout: 20000,
        dependencies: [1]
      },
      {
        type: 'data_transformation',
        name: 'log_recovery_attempt',
        description: 'Ghi log attempts',
        timeout: 10000,
        dependencies: [2]
      }
    ],
    parallel: false,
    timeout: 120000, // 2 minutes
    metadata: {
      category: 'error_recovery',
      priority: 'high',
      automated: true,
      trigger: 'error'
    }
  },

  // Batch Processing Workflow
  batch_processing_workflow: {
    name: 'Batch Content Processing',
    description: 'Xử lý nội dung theo lô',
    steps: [
      {
        type: 'data_validation',
        name: 'validate_batch',
        description: 'Kiểm tra lô dữ liệu',
        timeout: 30000
      },
      {
        type: 'document_processing',
        name: 'process_documents',
        description: 'Xử lý tài liệu trong lô',
        timeout: 300000,
        dependencies: [0]
      },
      {
        type: 'media_processing',
        name: 'process_media_files',
        description: 'Xử lý file media',
        timeout: 240000,
        dependencies: [0]
      },
      {
        type: 'content_analysis',
        name: 'analyze_all_content',
        description: 'Phân tích tất cả nội dung',
        timeout: 180000,
        dependencies: [1, 2]
      },
      {
        type: 'quality_assessment',
        name: 'batch_quality_check',
        description: 'Kiểm tra chất lượng lô',
        timeout: 60000,
        dependencies: [3]
      },
      {
        type: 'data_transformation',
        name: 'compile_batch_report',
        description: 'Tổng hợp báo cáo lô',
        timeout: 30000,
        dependencies: [4]
      }
    ],
    parallel: false,
    timeout: 600000, // 10 minutes
    metadata: {
      category: 'batch_processing',
      priority: 'medium',
      automated: true
    }
  },

  // Intelligence Gathering Workflow
  intelligence_gathering_workflow: {
    name: 'Intelligence Gathering Pipeline',
    description: 'Thu thập thông tin tình báo',
    steps: [
      {
        type: 'web_search',
        name: 'search_intelligence_sources',
        description: 'Tìm kiếm nguồn tình báo',
        timeout: 60000,
        retryPolicy: {
          maxAttempts: 3,
          delay: 2000
        }
      },
      {
        type: 'data_extraction',
        name: 'extract_intelligence_data',
        description: 'Trích xuất dữ liệu tình báo',
        timeout: 90000,
        dependencies: [0]
      },
      {
        type: 'content_analysis',
        name: 'analyze_intelligence',
        description: 'Phân tích dữ liệu tình báo',
        timeout: 120000,
        dependencies: [1]
      },
      {
        type: 'neural_processing',
        name: 'pattern_recognition',
        description: 'Nhận dạng pattern',
        timeout: 180000,
        dependencies: [2]
      },
      {
        type: 'quality_assessment',
        name: 'validate_intelligence',
        description: 'Kiểm tra tính hợp lệ',
        timeout: 30000,
        dependencies: [3]
      },
      {
        type: 'data_transformation',
        name: 'compile_intelligence_report',
        description: 'Tổng hợp báo cáo tình báo',
        timeout: 45000,
        dependencies: [4]
      }
    ],
    parallel: false,
    timeout: 600000, // 10 minutes
    metadata: {
      category: 'intelligence',
      priority: 'high',
      automated: true,
      security: 'classified'
    }
  }
};

// Complex workflow templates
const complexWorkflows = {
  // Complete Content Lifecycle
  content_lifecycle_workflow: {
    name: 'Complete Content Lifecycle Management',
    description: 'Quản lý vòng đời nội dung hoàn chỉnh',
    phases: [
      {
        name: 'creation_phase',
        description: 'Giai đoạn tạo nội dung',
        workflows: ['content_generation_workflow'],
        parallel: false
      },
      {
        name: 'analysis_phase',
        description: 'Giai đoạn phân tích',
        workflows: ['content_analysis_workflow'],
        parallel: false
      },
      {
        name: 'quality_phase',
        description: 'Giai đoạn kiểm tra chất lượng',
        workflows: ['quality_assessment'],
        parallel: false
      },
      {
        name: 'distribution_phase',
        description: 'Giai đoạn phân phối',
        workflows: ['media_processing_workflow'],
        parallel: true
      }
    ],
    timeout: 1800000, // 30 minutes
    metadata: {
      category: 'lifecycle_management',
      priority: 'high',
      automated: false
    }
  },

  // Multi-Source Research
  multi_source_research_workflow: {
    name: 'Multi-Source Research Pipeline',
    description: 'Nghiên cứu từ nhiều nguồn',
    phases: [
      {
        name: 'web_research_phase',
        description: 'Nghiên cứu web',
        workflows: ['web_research_workflow'],
        parallel: false
      },
      {
        name: 'document_analysis_phase',
        description: 'Phân tích tài liệu',
        workflows: ['document_processing_workflow'],
        parallel: false
      },
      {
        name: 'media_analysis_phase',
        description: 'Phân tích media',
        workflows: ['media_search_workflow'],
        parallel: true
      },
      {
        name: 'intelligence_phase',
        description: 'Phân tích tình báo',
        workflows: ['intelligence_gathering_workflow'],
        parallel: false
      },
      {
        name: 'synthesis_phase',
        description: 'Tổng hợp kết quả',
        workflows: ['neural_processing_workflow'],
        parallel: false
      }
    ],
    timeout: 2400000, // 40 minutes
    metadata: {
      category: 'research',
      priority: 'high',
      automated: false
    }
  }
};

// Utility functions for workflow management
const workflowUtils = {
  // Get workflow by category
  getWorkflowsByCategory(category) {
    return Object.entries(workflowDefinitions)
      .filter(([id, workflow]) => workflow.metadata.category === category)
      .map(([id, workflow]) => ({ id, ...workflow }));
  },

  // Get workflows by priority
  getWorkflowsByPriority(priority) {
    return Object.entries(workflowDefinitions)
      .filter(([id, workflow]) => workflow.metadata.priority === priority)
      .map(([id, workflow]) => ({ id, ...workflow }));
  },

  // Get automated workflows
  getAutomatedWorkflows() {
    return Object.entries(workflowDefinitions)
      .filter(([id, workflow]) => workflow.metadata.automated)
      .map(([id, workflow]) => ({ id, ...workflow }));
  },

  // Get scheduled workflows
  getScheduledWorkflows() {
    return Object.entries(workflowDefinitions)
      .filter(([id, workflow]) => workflow.metadata.schedule)
      .map(([id, workflow]) => ({ 
        id, 
        ...workflow,
        schedule: workflow.metadata.schedule
      }));
  },

  // Validate workflow definition
  validateWorkflow(workflow) {
    const errors = [];
    
    if (!workflow.name) {
      errors.push('Workflow must have a name');
    }
    
    if (!workflow.steps || workflow.steps.length === 0) {
      errors.push('Workflow must have at least one step');
    }
    
    workflow.steps?.forEach((step, index) => {
      if (!step.type) {
        errors.push(`Step ${index + 1} must have a type`);
      }
      
      if (step.dependencies) {
        step.dependencies.forEach(dep => {
          if (dep >= index) {
            errors.push(`Step ${index + 1} cannot depend on future step ${dep + 1}`);
          }
        });
      }
    });
    
    return {
      valid: errors.length === 0,
      errors: errors
    };
  },

  // Estimate workflow execution time
  estimateExecutionTime(workflowId) {
    const workflow = workflowDefinitions[workflowId];
    if (!workflow) return null;
    
    let totalTime = 0;
    
    if (workflow.parallel) {
      // For parallel workflows, use the longest step
      totalTime = Math.max(...workflow.steps.map(step => step.timeout || 60000));
    } else {
      // For sequential workflows, sum all step timeouts
      totalTime = workflow.steps.reduce((sum, step) => sum + (step.timeout || 60000), 0);
    }
    
    return {
      estimatedTime: totalTime,
      formattedTime: this.formatDuration(totalTime),
      steps: workflow.steps.length
    };
  },

  // Format duration
  formatDuration(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  },

  // Get workflow dependencies
  getWorkflowDependencies(workflowId) {
    const workflow = workflowDefinitions[workflowId];
    if (!workflow) return [];
    
    const dependencies = new Set();
    
    workflow.steps.forEach(step => {
      if (step.dependencies) {
        step.dependencies.forEach(dep => {
          dependencies.add(dep);
        });
      }
    });
    
    return Array.from(dependencies);
  }
};

module.exports = {
  workflowDefinitions,
  complexWorkflows,
  workflowUtils
};
