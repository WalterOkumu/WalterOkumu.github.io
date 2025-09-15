export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 pb-16 bg-gradient-to-br from-accent-50 to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-accent-50/30" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium border border-primary-200">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                Available for new projects
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="block text-primary-900">
                  Technical Customer
                </span>
                <span className="block text-gradient">
                  Success Architect
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-accent-600 font-medium max-w-3xl">
                I bridge engineering excellence with customer satisfaction,
                designing solutions that scale businesses and delight users globally.
              </p>

              {/* Description */}
              <p className="text-lg text-accent-700 max-w-2xl leading-relaxed">
                With expertise in full-stack development, AI automation, and customer success,
                I help SaaS companies build products that customers love and businesses rely on.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 pt-4">
                <a
                  href="#case-studies"
                  className="btn-primary text-center inline-flex items-center justify-center"
                >
                  <span>View My Work</span>
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="btn-secondary text-center inline-flex items-center justify-center"
                >
                  <span>Let&apos;s Connect</span>
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">7+</div>
                  <div className="text-sm text-accent-600 font-medium">Countries Served</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">200K+</div>
                  <div className="text-sm text-accent-600 font-medium">Businesses Impacted</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">99.9%</div>
                  <div className="text-sm text-accent-600 font-medium">Uptime Achieved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <div className="relative">
              {/* Placeholder for professional photo - will be added later */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">WO</span>
                    </div>
                    <p className="text-primary-700 font-medium">Professional photo</p>
                    <p className="text-primary-600 text-sm">coming soon</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-brand p-4 hidden lg:block">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-accent-700">Available</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-brand p-4 hidden lg:block">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">Global</div>
                  <div className="text-xs text-accent-600">Remote-First</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
          <a href="#about" className="flex flex-col items-center space-y-2 text-accent-600 hover:text-primary-500 transition-colors duration-200">
            <span className="text-sm font-medium">Scroll to explore</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
