export default function CaseStudies() {
  const caseStudies = [
    {
      title: 'Yellow Pages Group',
      subtitle: 'Multi-Country Digital Directories',
      description: 'Unified digital directory platform serving businesses across 7 countries in Africa and beyond.',
      image: '/api/placeholder/600/400',
      tags: ['Next.js', 'GraphQL', 'PostgreSQL', 'PM2'],
      stats: [
        { label: 'Countries', value: '7+' },
        { label: 'Businesses Listed', value: '200K+' },
        { label: 'Uptime', value: '99.9%' },
      ],
      highlights: [
        'Unified multi-country digital directories platform',
        'GraphQL API architecture for efficient data fetching',
        'Automated deployment pipeline reducing deployment time by 80%',
        'Boosted SMB discoverability across multiple markets',
      ],
      challenge: 'Creating a scalable directory platform that could handle diverse business listings across multiple countries with different languages, currencies, and business regulations.',
      solution: 'Built a modular Next.js application with GraphQL APIs, multi-tenant architecture, and automated CI/CD pipeline for consistent deployments across all regions.',
      results: 'Successfully onboarded 200K+ businesses with 99.9% uptime and improved search performance by 50%.',
      link: '#',
      color: 'from-blue-600 to-blue-400',
    },
    {
      title: 'Rhodium Digital Signage',
      subtitle: 'Smart Digital Signage Solutions',
      description: 'Replacing static media with intelligent digital signage using Raspberry Pi and modern web dashboards.',
      image: '/api/placeholder/600/400',
      tags: ['Raspberry Pi', 'Next.js', 'Python', 'IoT'],
      stats: [
        { label: 'Deployments', value: '50+' },
        { label: 'Cost Reduction', value: '60%' },
        { label: 'System Uptime', value: '99.8%' },
      ],
      highlights: [
        'Raspberry Pi-based digital signage infrastructure',
        'Real-time content management dashboards',
        'Scalable deployment across national locations',
        'Integration with enterprise communication systems',
      ],
      challenge: 'Traditional static signage was inefficient and costly to update. Clients needed dynamic, centrally-managed digital displays that could be updated in real-time.',
      solution: 'Developed a Raspberry Pi-based digital signage system with Next.js dashboards for content management, enabling remote updates and monitoring.',
      results: 'Deployed to 50+ enterprise locations including regional banks, reducing hardware costs by 60% while improving content relevance and engagement.',
      link: 'https://rhodium.co.ke',
      color: 'from-green-600 to-green-400',
    },
    {
      title: 'Cura Global Recruitment',
      subtitle: 'Global Medical Recruitment Platform',
      description: 'Streamlining international medical professional recruitment with automated workflows and compliance systems.',
      image: '/api/placeholder/600/400',
      tags: ['React', 'Node.js', 'MongoDB', 'API Integration'],
      stats: [
        { label: 'Countries', value: '10+' },
        { label: 'Automation', value: '70%' },
        { label: 'Faster Placements', value: '45%' },
      ],
      highlights: [
        'End-to-end recruitment platform for medical professionals',
        'Multi-country compliance and verification systems',
        'Automated candidate matching and screening workflows',
        'Integration with international job boards and certification bodies',
      ],
      challenge: 'Manual recruitment processes were time-consuming and error-prone, especially when dealing with international medical credential verification and compliance requirements.',
      solution: 'Built a comprehensive recruitment platform with automated workflows for candidate screening, credential verification, and compliance checking across multiple countries.',
      results: 'Reduced manual processing by 70% and accelerated candidate placements by 45%, expanding reach to multiple international markets.',
      link: '#',
      color: 'from-purple-600 to-purple-400',
    },
    {
      title: 'Kua Wellness Africa',
      subtitle: 'Employee Wellness & HR Solutions',
      description: 'Comprehensive wellness tracking and HR management systems for African enterprises.',
      image: '/api/placeholder/600/400',
      tags: ['JavaScript', 'PHP', 'MySQL', 'Analytics'],
      stats: [
        { label: 'Employee Records', value: '10K+' },
        { label: 'Wellness Programs', value: '25+' },
        { label: 'Engagement Increase', value: '65%' },
      ],
      highlights: [
        'Employee wellness tracking and management system',
        'HR workflow automation and analytics dashboard',
        'Health monitoring API integrations',
        'Comprehensive reporting and insights platform',
      ],
      challenge: 'African enterprises lacked integrated systems for employee wellness tracking and HR management, leading to inefficient processes and poor employee engagement metrics.',
      solution: 'Developed an integrated wellness and HR platform with automated workflows, health monitoring integrations, and comprehensive analytics dashboards.',
      results: 'Improved employee engagement by 65% and streamlined HR processes for multiple enterprise clients across Africa.',
      link: '#',
      color: 'from-orange-600 to-orange-400',
    },
  ];

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 leading-tight">
            Case Studies
          </h2>
          <p className="mt-4 text-lg text-accent-700 max-w-3xl mx-auto">
            Real-world solutions that drove measurable business impact across global markets,
            from technical architecture to customer success implementation
          </p>
          <div className="mt-6 w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full mx-auto"></div>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 ${index % 2 === 1 ? 'lg:dir-rtl' : ''}`}>
              {/* Image */}
              <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative group">
                  <div className="aspect-video bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${study.color} flex items-center justify-center`}>
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <p className="text-accent-600 font-medium">Project Screenshot</p>
                        <p className="text-accent-500 text-sm">Coming Soon</p>
                      </div>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <p className="font-medium">View Details</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-medium rounded-full border border-primary-200">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">
                      {study.title}
                    </h3>

                    <p className="text-lg font-medium text-primary-600 mb-4">
                      {study.subtitle}
                    </p>

                    <p className="text-lg text-accent-700 leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {study.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center bg-accent-50 rounded-lg p-4 border border-accent-100">
                        <div className="text-xl md:text-2xl font-bold text-primary-600">
                          {stat.value}
                        </div>
                        <div className="text-sm text-accent-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <h4 className="text-lg font-semibold text-primary-900 mb-3">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {study.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-accent-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenge, Solution, Results */}
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                      <h5 className="font-semibold text-red-900 mb-2">Challenge</h5>
                      <p className="text-red-800 text-sm leading-relaxed">{study.challenge}</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h5 className="font-semibold text-blue-900 mb-2">Solution</h5>
                      <p className="text-blue-800 text-sm leading-relaxed">{study.solution}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <h5 className="font-semibold text-green-900 mb-2">Results</h5>
                      <p className="text-green-800 text-sm leading-relaxed">{study.results}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {study.link !== '#' && (
                      <a
                        href={study.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center justify-center"
                      >
                        View Live Project
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    <a href="#contact" className="btn-secondary inline-flex items-center justify-center">
                      Discuss Similar Project
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-lg mb-6 text-primary-100 max-w-2xl mx-auto">
              Let's discuss how I can help you achieve similar results for your business
              with tailored technical solutions and customer success strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-white text-primary-600 hover:bg-primary-50 font-medium px-6 py-3 rounded-lg transition-all duration-200">
                Start Your Project
              </a>
              <a href="#services" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-6 py-3 rounded-lg transition-all duration-200">
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
