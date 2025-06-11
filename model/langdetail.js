const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languageDetailSchema = new Schema({
  languageId: {
    type: Schema.Types.ObjectId,
    ref: "Language",
    required: true,
    index: true
  },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  
  // Basic Information
  introduction: {
    overview: { type: String, required: true },
    keyFeatures: [String],
    useCases: [String],
    advantages: [String],
    disadvantages: [String]
  },

  // Technical Details
  technicalInfo: {
    paradigms: [String],
    typingDiscipline: String,
    executionModel: String, // interpreted/compiled/hybrid
    memoryManagement: String,
    concurrencyModel: String,
    performance: {
      strengths: [String],
      limitations: [String]
    }
  },

  // Syntax and Code Examples
  syntax: {
    overview: { type: String, required: true },
    basicSyntax: {
      variables: String,
      dataTypes: [String],
      operators: [String],
      controlStructures: String,
      functions: String,
      classes: String
    },
    advancedConcepts: [{
      topic: String,
      description: String,
      example: String
    }]
  },

  codeSnippets: [{
    title: String,
    description: String,
    code: String,
    explanation: String,
    tags: [String]
  }],

  // Development Tools and Environment
  tooling: {
    editors: [{
      name: String,
      description: String,
      url: String
    }],
    frameworks: [{
      name: String,
      description: String,
      url: String,
      category: String // web, mobile, desktop, etc.
    }],
    buildTools: [{
      name: String,
      description: String,
      url: String
    }],
    packageManagers: [{
      name: String,
      description: String,
      url: String
    }]
  },

  // Best Practices and Standards
  bestPractices: [{
    category: String,
    practices: [{
      title: String,
      description: String,
      example: String
    }]
  }],

  // Learning Resources
  learningResources: {
    documentation: {
      official: { type: String, required: true },
      tutorials: [{
        title: String,
        description: String,
        url: String,
        level: String // beginner, intermediate, advanced
      }]
    },
    books: [{
      title: String,
      author: String,
      description: String,
      url: String,
      level: String
    }],
    onlineCourses: [{
      title: String,
      platform: String,
      description: String,
      url: String,
      level: String
    }]
  },

  // Version and Compatibility
  versionInfo: {
    latestVersion: String,
    releaseDate: Date,
    ltsVersion: String,
    deprecatedVersions: [{
      version: String,
      endOfSupport: Date
    }],
    compatibility: {
      platforms: [String],
      systemRequirements: String
    }
  },

  // Historical Information
  history: {
    createdBy: String,
    firstAppeared: String,
    majorReleases: [{
      version: String,
      date: Date,
      highlights: [String]
    }],
    influencedBy: [String],
    influenced: [String]
  },

  // Community and Support
  community: {
    officialChannels: [{
      name: String,
      type: String, // forum, chat, mailing list
      url: String
    }],
    communityResources: [{
      name: String,
      description: String,
      url: String
    }],
    conferences: [{
      name: String,
      description: String,
      url: String,
      frequency: String
    }]
  },

  // Applications and Use Cases
  applications: [{
    domain: String, // web, mobile, AI, etc.
    examples: [{
      name: String,
      description: String,
      url: String
    }]
  }],

  // File and Project Structure
  projectStructure: {
    fileExtensions: [String],
    standardDirectories: [{
      name: String,
      purpose: String
    }],
    configFiles: [{
      name: String,
      purpose: String,
      example: String
    }]
  },

  // Performance and Optimization
  performance: {
    benchmarks: [{
      metric: String,
      value: String,
      context: String
    }],
    optimizationTips: [{
      title: String,
      description: String,
      example: String
    }]
  },

  // Security
  security: {
    bestPractices: [{
      title: String,
      description: String,
      example: String
    }],
    commonVulnerabilities: [{
      name: String,
      description: String,
      prevention: String
    }],
    securityTools: [{
      name: String,
      description: String,
      url: String
    }]
  },

  // Metadata
  metadata: {
    lastUpdated: { type: Date, default: Date.now },
    contributors: [{
      name: String,
      role: String
    }],
    tags: [String]
  }
});

// Add text indexes for better search functionality
languageDetailSchema.index({
  name: 'text',
  'introduction.overview': 'text',
  'syntax.overview': 'text',
  'bestPractices.practices.title': 'text',
  'bestPractices.practices.description': 'text'
});

const LanguageDetail = mongoose.model("LanguageDetail", languageDetailSchema);
module.exports = LanguageDetail;