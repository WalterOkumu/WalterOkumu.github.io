// Mock for rate-limiter-flexible
export class RateLimiterMemory {
  constructor(options) {
    this.options = options;
  }

  async consume(key) {
    // Mock implementation - can be overridden in tests
    if (key === 'blocked-ip') {
      const error = new Error('Rate limit exceeded');
      error.msBeforeNext = 3600000;
      throw error;
    }
    return Promise.resolve();
  }
}