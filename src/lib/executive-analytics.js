'use client';

import { trackEvent } from '@/lib/analytics';

/**
 * Executive Analytics Implementation
 * Advanced tracking for C-Level portfolio performance and professional engagement
 */

// Executive-specific event tracking
export const trackExecutiveEvent = (action, properties = {}) => {
  const executiveContext = {
    // Portfolio context
    portfolio_type: 'executive',
    position_level: 'c_level',
    target_audience: 'executive_hiring',
    
    // Performance context
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
    
    // Geographic context for international positioning
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: typeof window !== 'undefined' ? window.navigator.language : 'en',
    
    ...properties
  };

  trackEvent(action, executiveContext);
};

// Executive engagement tracking
export const trackExecutiveEngagement = {
  // Hero section interactions
  heroInteraction: (action, element) => {
    trackExecutiveEvent('hero_interaction', {
      action,
      element,
      section: 'chief_ai_officer_hero',
      engagement_level: 'high_intent'
    });
  },

  // Executive CTA tracking
  executiveCTA: (ctaType, destination, context = {}) => {
    trackExecutiveEvent('executive_cta_click', {
      cta_type: ctaType,
      destination,
      intent_level: 'executive_consultation',
      conversion_stage: 'interest',
      ...context
    });
  },

  // Timeline interactions for career progression
  timelineInteraction: (action, position, company) => {
    trackExecutiveEvent('timeline_interaction', {
      action,
      position,
      company,
      content_type: 'career_progression',
      engagement_type: 'detailed_review'
    });
  },

  // Skills and competency exploration
  skillsExploration: (skill, category, depth) => {
    trackExecutiveEvent('skills_exploration', {
      skill,
      category,
      depth,
      content_type: 'technical_competency',
      assessment_stage: 'capability_review'
    });
  },

  // Contact form progression
  contactFormProgress: (step, formData = {}) => {
    trackExecutiveEvent('contact_form_progress', {
      step,
      form_type: 'executive_inquiry',
      completion_stage: step,
      intent_signals: Object.keys(formData).length > 0 ? 'high' : 'medium'
    });
  },

  // Project portfolio engagement
  projectEngagement: (projectId, action, timeSpent = 0) => {
    trackExecutiveEvent('project_engagement', {
      project_id: projectId,
      action,
      time_spent: timeSpent,
      content_type: 'case_study',
      technical_depth: 'executive_overview'
    });
  },

  // Document downloads (resume, portfolio, etc.)
  documentDownload: (documentType, format) => {
    trackExecutiveEvent('document_download', {
      document_type: documentType,
      format,
      intent_level: 'high',
      conversion_indicator: 'strong'
    });
  },

  // International positioning tracking
  internationalInterest: (country, region, context) => {
    trackExecutiveEvent('international_interest', {
      country,
      region,
      context,
      positioning: 'global_executive',
      market_focus: 'international_expansion'
    });
  }
};

// Advanced user journey tracking
export class ExecutiveJourneyTracker {
  constructor() {
    this.sessionStart = Date.now();
    this.pageViews = [];
    this.interactions = [];
    this.engagementScore = 0;
  }

  // Track page progression through executive content
  trackPageView(page, metadata = {}) {
    const pageView = {
      page,
      timestamp: Date.now(),
      timeFromStart: Date.now() - this.sessionStart,
      metadata
    };
    
    this.pageViews.push(pageView);
    
    trackExecutiveEvent('page_view', {
      page,
      journey_stage: this.determineJourneyStage(),
      pages_viewed: this.pageViews.length,
      session_depth: this.calculateSessionDepth(),
      ...metadata
    });

    this.updateEngagementScore();
  }

  // Track meaningful interactions
  trackInteraction(type, details = {}) {
    const interaction = {
      type,
      timestamp: Date.now(),
      details
    };
    
    this.interactions.push(interaction);
    this.updateEngagementScore();

    trackExecutiveEvent('meaningful_interaction', {
      interaction_type: type,
      interaction_count: this.interactions.length,
      engagement_score: this.engagementScore,
      session_quality: this.calculateSessionQuality(),
      ...details
    });
  }

  // Calculate executive-level engagement scoring
  updateEngagementScore() {
    let score = 0;
    
    // Page depth scoring
    score += this.pageViews.length * 10;
    
    // Interaction quality scoring
    this.interactions.forEach(interaction => {
      switch (interaction.type) {
        case 'executive_cta_click':
          score += 50;
          break;
        case 'contact_form_start':
          score += 75;
          break;
        case 'document_download':
          score += 100;
          break;
        case 'timeline_deep_dive':
          score += 30;
          break;
        case 'skills_detailed_view':
          score += 25;
          break;
        default:
          score += 15;
      }
    });

    // Time-based engagement
    const sessionDuration = Date.now() - this.sessionStart;
    if (sessionDuration > 300000) score += 50; // 5+ minutes
    if (sessionDuration > 600000) score += 100; // 10+ minutes

    this.engagementScore = score;
  }

  // Determine where user is in executive evaluation journey
  determineJourneyStage() {
    const pages = this.pageViews.map(pv => pv.page);
    
    if (pages.includes('/contact')) return 'conversion_intent';
    if (pages.includes('/projects') && pages.includes('/skills')) return 'detailed_evaluation';
    if (pages.includes('/about')) return 'background_research';
    if (pages.includes('/')) return 'initial_discovery';
    
    return 'exploration';
  }

  // Calculate session depth and quality
  calculateSessionDepth() {
    const uniquePages = new Set(this.pageViews.map(pv => pv.page)).size;
    return uniquePages;
  }

  calculateSessionQuality() {
    const duration = Date.now() - this.sessionStart;
    const interactionRate = this.interactions.length / Math.max(1, duration / 60000); // per minute
    
    if (this.engagementScore > 200 && interactionRate > 2) return 'high';
    if (this.engagementScore > 100 && interactionRate > 1) return 'medium';
    return 'standard';
  }

  // Generate executive summary for session
  generateExecutiveSummary() {
    return {
      session_duration: Date.now() - this.sessionStart,
      pages_viewed: this.pageViews.length,
      unique_pages: this.calculateSessionDepth(),
      interactions: this.interactions.length,
      engagement_score: this.engagementScore,
      journey_stage: this.determineJourneyStage(),
      session_quality: this.calculateSessionQuality(),
      conversion_indicators: this.getConversionIndicators()
    };
  }

  getConversionIndicators() {
    const indicators = [];
    
    if (this.pageViews.some(pv => pv.page === '/contact')) {
      indicators.push('visited_contact_page');
    }
    
    if (this.interactions.some(i => i.type === 'executive_cta_click')) {
      indicators.push('clicked_executive_cta');
    }
    
    if (this.interactions.some(i => i.type === 'document_download')) {
      indicators.push('downloaded_materials');
    }
    
    if (this.engagementScore > 150) {
      indicators.push('high_engagement_score');
    }
    
    const sessionDuration = Date.now() - this.sessionStart;
    if (sessionDuration > 300000) {
      indicators.push('extended_session_time');
    }

    return indicators;
  }
}

// Core Web Vitals tracking for executive standards
export const trackExecutivePerformance = () => {
  if (typeof window === 'undefined') return;

  // Import web-vitals dynamically
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    const reportMetric = (metric) => {
      trackExecutiveEvent('core_web_vitals', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: metric.rating,
        metric_delta: metric.delta,
        performance_context: 'executive_portfolio',
        user_experience_impact: metric.rating === 'good' ? 'positive' : 'needs_attention'
      });
    };

    getCLS(reportMetric);
    getFID(reportMetric);
    getFCP(reportMetric);
    getLCP(reportMetric);
    getTTFB(reportMetric);
  });
};

// Executive search optimization tracking
export const trackExecutiveSearchMetrics = () => {
  if (typeof window === 'undefined') return;

  // Track search-related events
  const searchContext = {
    referrer: document.referrer,
    search_engine: getSearchEngine(document.referrer),
    landing_page: window.location.pathname,
    organic_traffic: !document.referrer.includes(window.location.hostname)
  };

  trackExecutiveEvent('executive_search_landing', searchContext);
};

// A/B testing for executive content optimization
export const trackExecutiveExperiment = (experimentId, variant, outcome = null) => {
  trackExecutiveEvent('executive_ab_test', {
    experiment_id: experimentId,
    variant,
    outcome,
    test_context: 'executive_optimization'
  });
};

// Helper functions
function getSessionId() {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('executive_session_id');
  if (!sessionId) {
    sessionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('executive_session_id', sessionId);
  }
  return sessionId;
}

function getSearchEngine(referrer) {
  if (!referrer) return 'direct';
  if (referrer.includes('google')) return 'google';
  if (referrer.includes('bing')) return 'bing';
  if (referrer.includes('linkedin')) return 'linkedin';
  if (referrer.includes('indeed')) return 'indeed';
  return 'other';
}

// Initialize executive analytics on page load
export const initializeExecutiveAnalytics = () => {
  if (typeof window === 'undefined') return null;

  const journeyTracker = new ExecutiveJourneyTracker();
  
  // Track initial page load
  journeyTracker.trackPageView(window.location.pathname, {
    initial_load: true,
    user_agent: window.navigator.userAgent,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`
  });

  // Track Core Web Vitals
  trackExecutivePerformance();
  
  // Track search metrics
  trackExecutiveSearchMetrics();

  // Set up unload tracking
  window.addEventListener('beforeunload', () => {
    const summary = journeyTracker.generateExecutiveSummary();
    trackExecutiveEvent('session_end', summary);
  });

  return journeyTracker;
};

const ExecutiveAnalytics = {
  trackExecutiveEvent,
  trackExecutiveEngagement,
  ExecutiveJourneyTracker,
  trackExecutivePerformance,
  trackExecutiveSearchMetrics,
  trackExecutiveExperiment,
  initializeExecutiveAnalytics
};

export default ExecutiveAnalytics;
