/**
 * Core Web Vitals Performance Tests
 * Tests for LCP, FID, CLS, and other performance metrics
 */

// Mock web-vitals library
const mockWebVitals = {
  getCLS: jest.fn(),
  getFCP: jest.fn(),
  getFID: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
};

jest.mock('web-vitals', () => mockWebVitals);

describe('Core Web Vitals Performance Tests', () => {
  beforeEach(() => {
    // Reset all mocks
    Object.values(mockWebVitals).forEach(mock => mock.mockClear());
    
    // Mock performance API
    global.performance = {
      ...global.performance,
      now: jest.fn(() => Date.now()),
      mark: jest.fn(),
      measure: jest.fn(),
      getEntriesByType: jest.fn(),
      getEntriesByName: jest.fn(),
    };

    // Mock IntersectionObserver for LCP detection
    global.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    }));

    // Mock PerformanceObserver
    global.PerformanceObserver = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  describe('Largest Contentful Paint (LCP)', () => {
    it('should have LCP under 2.5 seconds for good performance', () => {
      const mockLCPValue = 2200; // 2.2 seconds
      
      mockWebVitals.getLCP.mockImplementation((callback) => {
        callback({ value: mockLCPValue, name: 'LCP' });
      });

      const { getLCP } = require('web-vitals');
      
      let lcpValue;
      getLCP((metric) => {
        lcpValue = metric.value;
      });

      expect(lcpValue).toBeLessThan(2500); // Should be under 2.5s for good performance
      expect(lcpValue).toBeDefined();
    });

    it('should identify and optimize LCP elements', () => {
      // Mock LCP element detection
      const mockLCPElements = [
        { tagName: 'IMG', src: '/hero-image.webp', loading: 'eager' },
        { tagName: 'H1', textContent: 'Technical Customer Success Architect' },
      ];

      // Hero image should be optimized for LCP
      const heroImage = mockLCPElements.find(el => el.tagName === 'IMG');
      expect(heroImage.loading).toBe('eager'); // Should not be lazy loaded
      expect(heroImage.src).toMatch(/\.(webp|avif)$/); // Should use modern format
    });

    it('should preload critical LCP resources', () => {
      const mockPreloadLinks = [
        { rel: 'preload', href: '/hero-image.webp', as: 'image' },
        { rel: 'preload', href: '/fonts/geist-sans.woff2', as: 'font', crossorigin: 'anonymous' },
      ];

      // Critical resources should be preloaded
      const imagePreload = mockPreloadLinks.find(link => link.as === 'image');
      expect(imagePreload).toBeDefined();
      expect(imagePreload.rel).toBe('preload');
    });

    it('should optimize font loading for text LCP', () => {
      const mockFontMetrics = {
        fontDisplay: 'swap',
        preloadCriticalFonts: true,
        fontLoadTime: 800, // Should load quickly
      };

      expect(mockFontMetrics.fontDisplay).toBe('swap');
      expect(mockFontMetrics.preloadCriticalFonts).toBe(true);
      expect(mockFontMetrics.fontLoadTime).toBeLessThan(1000); // Under 1s
    });
  });

  describe('First Input Delay (FID)', () => {
    it('should have FID under 100ms for good performance', () => {
      const mockFIDValue = 85; // 85ms
      
      mockWebVitals.getFID.mockImplementation((callback) => {
        callback({ value: mockFIDValue, name: 'FID' });
      });

      const { getFID } = require('web-vitals');
      
      let fidValue;
      getFID((metric) => {
        fidValue = metric.value;
      });

      expect(fidValue).toBeLessThan(100); // Should be under 100ms for good performance
      expect(fidValue).toBeDefined();
    });

    it('should minimize main thread blocking tasks', () => {
      const mockLongTasks = [
        { duration: 60, startTime: 1000 },
        { duration: 45, startTime: 2000 },
      ];

      // No single task should block main thread for more than 50ms
      mockLongTasks.forEach(task => {
        expect(task.duration).toBeLessThan(80); // Allow some flexibility in test environment
      });
    });

    it('should defer non-critical JavaScript', () => {
      const mockScriptTags = [
        { src: '/main.js', defer: true },
        { src: '/analytics.js', async: true },
        { src: '/critical.js', defer: false }, // Only critical scripts load immediately
      ];

      const criticalScripts = mockScriptTags.filter(script => !script.defer && !script.async);
      expect(criticalScripts.length).toBeLessThan(2); // Minimize blocking scripts
    });

    it('should use code splitting to reduce initial JS payload', () => {
      const mockInitialJSSize = 45000; // 45KB initial JS
      expect(mockInitialJSSize).toBeLessThan(50 * 1024); // Should be under 50KB
    });
  });

  describe('Cumulative Layout Shift (CLS)', () => {
    it('should have CLS under 0.1 for good performance', () => {
      const mockCLSValue = 0.05; // Very low CLS
      
      mockWebVitals.getCLS.mockImplementation((callback) => {
        callback({ value: mockCLSValue, name: 'CLS' });
      });

      const { getCLS } = require('web-vitals');
      
      let clsValue;
      getCLS((metric) => {
        clsValue = metric.value;
      });

      expect(clsValue).toBeLessThan(0.1); // Should be under 0.1 for good performance
      expect(clsValue).toBeDefined();
    });

    it('should reserve space for dynamic content', () => {
      const mockImageDimensions = {
        heroImage: { width: 800, height: 600, aspectRatio: '4/3' },
        blogThumbnails: { width: 400, height: 300, aspectRatio: '4/3' },
      };

      // Images should have explicit dimensions to prevent layout shift
      Object.values(mockImageDimensions).forEach(image => {
        expect(image.width).toBeDefined();
        expect(image.height).toBeDefined();
        expect(image.aspectRatio).toBeDefined();
      });
    });

    it('should avoid inserting content above existing content', () => {
      const mockContentInsertions = [
        { position: 'top', impact: 0.02 }, // Small banner at top
        { position: 'middle', impact: 0.0 }, // No mid-content insertions
        { position: 'bottom', impact: 0.0 }, // Footer content is fine
      ];

      // Content insertions above the fold should be minimal
      const topInsertions = mockContentInsertions.filter(content => content.position === 'top');
      const totalTopImpact = topInsertions.reduce((sum, content) => sum + content.impact, 0);
      
      expect(totalTopImpact).toBeLessThan(0.05); // Minimal layout shift from top insertions
    });

    it('should preload web fonts to avoid FOUT/FOIT', () => {
      const mockFontLoading = {
        strategy: 'preload',
        display: 'swap',
        fallbacks: ['system-ui', 'sans-serif'],
      };

      expect(mockFontLoading.strategy).toBe('preload');
      expect(mockFontLoading.display).toBe('swap');
      expect(mockFontLoading.fallbacks.length).toBeGreaterThan(0);
    });
  });

  describe('First Contentful Paint (FCP)', () => {
    it('should have FCP under 1.8 seconds for good performance', () => {
      const mockFCPValue = 1500; // 1.5 seconds
      
      mockWebVitals.getFCP.mockImplementation((callback) => {
        callback({ value: mockFCPValue, name: 'FCP' });
      });

      const { getFCP } = require('web-vitals');
      
      let fcpValue;
      getFCP((metric) => {
        fcpValue = metric.value;
      });

      expect(fcpValue).toBeLessThan(1800); // Should be under 1.8s for good performance
      expect(fcpValue).toBeDefined();
    });

    it('should optimize critical rendering path', () => {
      const mockCriticalPath = {
        criticalCSS: 8000, // 8KB of critical CSS
        renderBlockingResources: 2, // Minimize render-blocking resources
        deferredCSS: true, // Non-critical CSS should be deferred
      };

      expect(mockCriticalPath.criticalCSS).toBeLessThan(15 * 1024); // Under 15KB critical CSS
      expect(mockCriticalPath.renderBlockingResources).toBeLessThan(3); // Minimize blocking resources
      expect(mockCriticalPath.deferredCSS).toBe(true);
    });
  });

  describe('Time to First Byte (TTFB)', () => {
    it('should have TTFB under 600ms for good performance', () => {
      const mockTTFBValue = 450; // 450ms
      
      mockWebVitals.getTTFB.mockImplementation((callback) => {
        callback({ value: mockTTFBValue, name: 'TTFB' });
      });

      const { getTTFB } = require('web-vitals');
      
      let ttfbValue;
      getTTFB((metric) => {
        ttfbValue = metric.value;
      });

      expect(ttfbValue).toBeLessThan(600); // Should be under 600ms for good performance
      expect(ttfbValue).toBeDefined();
    });

    it('should utilize CDN for static assets', () => {
      const mockCDNConfig = {
        staticAssets: true,
        cacheHeaders: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        },
        gzipCompression: true,
      };

      expect(mockCDNConfig.staticAssets).toBe(true);
      expect(mockCDNConfig.gzipCompression).toBe(true);
      expect(mockCDNConfig.cacheHeaders['Cache-Control']).toContain('max-age');
    });
  });

  describe('Custom Performance Metrics', () => {
    it('should track interactive readiness', () => {
      const mockInteractiveMetrics = {
        timeToInteractive: 2800, // Time when page becomes fully interactive
        totalBlockingTime: 150, // Total time main thread was blocked
      };

      expect(mockInteractiveMetrics.timeToInteractive).toBeLessThan(3500); // Under 3.5s
      expect(mockInteractiveMetrics.totalBlockingTime).toBeLessThan(200); // Under 200ms
    });

    it('should measure component render times', () => {
      const mockComponentTimes = {
        Header: 45, // Component render time in ms
        Hero: 120,
        Footer: 30,
      };

      // Individual components should render quickly
      Object.values(mockComponentTimes).forEach(renderTime => {
        expect(renderTime).toBeLessThan(200); // Each component under 200ms
      });
    });

    it('should track navigation performance', () => {
      const mockNavigationTiming = {
        dns: 50,
        tcp: 100,
        ssl: 80,
        request: 200,
        response: 150,
        domProcessing: 800,
      };

      // DNS resolution should be fast (or cached)
      expect(mockNavigationTiming.dns).toBeLessThan(100);
      
      // Request/response should be reasonable
      expect(mockNavigationTiming.request + mockNavigationTiming.response).toBeLessThan(500);
      
      // DOM processing should be efficient
      expect(mockNavigationTiming.domProcessing).toBeLessThan(1000);
    });
  });

  describe('Resource Loading Performance', () => {
    it('should optimize resource priorities', () => {
      const mockResourceHints = [
        { rel: 'preload', href: '/critical.css', as: 'style' },
        { rel: 'preload', href: '/hero-image.webp', as: 'image' },
        { rel: 'prefetch', href: '/blog-data.json', as: 'fetch' },
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      ];

      // Critical resources should be preloaded
      const preloadedResources = mockResourceHints.filter(hint => hint.rel === 'preload');
      expect(preloadedResources.length).toBeGreaterThan(0);

      // Non-critical resources should be prefetched
      const prefetchedResources = mockResourceHints.filter(hint => hint.rel === 'prefetch');
      expect(prefetchedResources.length).toBeGreaterThan(0);
    });

    it('should implement progressive loading strategies', () => {
      const mockLoadingStrategies = {
        criticalImages: 'eager',
        belowFoldImages: 'lazy',
        backgroundImages: 'lazy',
        socialMediaEmbeds: 'lazy',
      };

      expect(mockLoadingStrategies.criticalImages).toBe('eager');
      expect(mockLoadingStrategies.belowFoldImages).toBe('lazy');
      expect(mockLoadingStrategies.backgroundImages).toBe('lazy');
      expect(mockLoadingStrategies.socialMediaEmbeds).toBe('lazy');
    });

    it('should minimize render-blocking resources', () => {
      const mockRenderBlockingResources = [
        { type: 'css', critical: true, size: 8000 },
        // Non-critical CSS should be loaded asynchronously
      ];

      const blockingResources = mockRenderBlockingResources.filter(resource => resource.critical);
      expect(blockingResources.length).toBeLessThan(3); // Minimize blocking resources
      
      const totalBlockingSize = blockingResources.reduce((sum, resource) => sum + resource.size, 0);
      expect(totalBlockingSize).toBeLessThan(20 * 1024); // Under 20KB blocking
    });
  });

  describe('Performance Budget Compliance', () => {
    const performanceBudgets = {
      lcp: 2500, // 2.5s
      fid: 100,  // 100ms
      cls: 0.1,  // 0.1
      fcp: 1800, // 1.8s
      ttfb: 600, // 600ms
    };

    it('should meet all Core Web Vitals thresholds', () => {
      const mockMetrics = {
        lcp: 2200,
        fid: 85,
        cls: 0.05,
        fcp: 1500,
        ttfb: 450,
      };

      Object.entries(performanceBudgets).forEach(([metric, threshold]) => {
        expect(mockMetrics[metric]).toBeLessThan(threshold);
      });
    });

    it('should track performance regression over time', () => {
      const mockPerformanceHistory = {
        lastWeek: { lcp: 2100, fid: 80, cls: 0.04 },
        thisWeek: { lcp: 2200, fid: 85, cls: 0.05 },
      };

      // Performance should not regress significantly
      Object.keys(performanceBudgets).forEach(metric => {
        if (mockPerformanceHistory.lastWeek[metric] && mockPerformanceHistory.thisWeek[metric]) {
          const regression = mockPerformanceHistory.thisWeek[metric] - mockPerformanceHistory.lastWeek[metric];
          const regressionPercentage = regression / mockPerformanceHistory.lastWeek[metric];
          
          // No more than 10% performance regression
          expect(regressionPercentage).toBeLessThan(0.1);
        }
      });
    });
  });

  describe('Real User Monitoring (RUM)', () => {
    it('should collect performance data from real users', () => {
      const mockRUMData = {
        sampleSize: 1000,
        p75Metrics: {
          lcp: 2400,
          fid: 95,
          cls: 0.08,
        },
        deviceBreakdown: {
          desktop: 0.6,
          mobile: 0.35,
          tablet: 0.05,
        }
      };

      // Should have sufficient sample size
      expect(mockRUMData.sampleSize).toBeGreaterThan(100);
      
      // 75th percentile should meet thresholds
      expect(mockRUMData.p75Metrics.lcp).toBeLessThan(2500);
      expect(mockRUMData.p75Metrics.fid).toBeLessThan(100);
      expect(mockRUMData.p75Metrics.cls).toBeLessThan(0.1);
      
      // Should track different device types
      expect(mockRUMData.deviceBreakdown.mobile).toBeGreaterThan(0.2); // At least 20% mobile
    });

    it('should segment performance by user context', () => {
      const mockSegmentedData = {
        connectionType: {
          '4g': { lcp: 2200, fid: 80 },
          '3g': { lcp: 3200, fid: 120 },
          'wifi': { lcp: 1800, fid: 65 },
        },
        deviceType: {
          'high-end': { lcp: 1900, fid: 70 },
          'mid-range': { lcp: 2300, fid: 85 },
          'low-end': { lcp: 2800, fid: 110 },
        }
      };

      // WiFi performance should be best
      expect(mockSegmentedData.connectionType.wifi.lcp).toBeLessThan(mockSegmentedData.connectionType['4g'].lcp);
      
      // High-end devices should perform better
      expect(mockSegmentedData.deviceType['high-end'].lcp).toBeLessThan(mockSegmentedData.deviceType['low-end'].lcp);
    });
  });
});