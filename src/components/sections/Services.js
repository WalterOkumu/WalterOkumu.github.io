export default function Services() {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Technical Customer Success',
      description: 'Bridge the gap between complex technical solutions and customer satisfaction with strategic customer success programs.',
      features: [
        'Customer onboarding optimization',
        'Technical training & enablement',
        'Success metrics & KPI tracking',
        'Churn reduction strategies',
      ],
      pricing: 'From $3,000/month',
      popular: true,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Full-Stack Development',
      description: 'End-to-end web application development using modern technologies like Next.js, Node.js, and cloud platforms.',
      features: [
        'Next.js & React applications',
        'API development & integration',
        'Database design & optimization',
        'Cloud deployment & scaling',
      ],
      pricing: 'From $5,000/project',
      popular: false,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI Automation Solutions',
      description: 'Implement intelligent automation to streamline business processes and enhance customer experiences.',
      features: [
        'Process automation workflows',
        'AI-powered customer support',
        'Data analysis & insights',
        'Custom AI integrations',
      ],
      pricing: 'From $2,500/month',
      popular: false,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: 'Cloud Architecture & Scaling',
      description: 'Design robust, scalable cloud infrastructure that grows with your business needs and maintains high availability.',
      features: [
        'AWS & cloud platform setup',
        'Auto-scaling configuration',
        'Performance optimization',
        '99.9% uptime guarantee',
      ],
      pricing: 'From $4,000/project',
      popular: false,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Digital Transformation Consulting',
      description: 'Strategic guidance for modernizing business processes, technology stacks, and customer engagement strategies.',
      features: [
        'Technology stack assessment',
        'Process optimization roadmap',
        'Team training & enablement',
        'Change management support',
      ],
      pricing: 'From $150/hour',
      popular: false,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Technical Training & Workshops',
      description: 'Comprehensive training programs for teams transitioning to modern development practices and customer success methodologies.',
      features: [
        'Custom curriculum development',
        'Hands-on workshop sessions',
        'Best practices documentation',
        'Ongoing mentorship support',
      ],
      pricing: 'From $1,500/session',
      popular: false,
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We start with a comprehensive analysis of your current challenges, goals, and technical requirements.',
    },
    {
      step: '02',
      title: 'Strategy & Architecture',
      description: 'Design a tailored solution architecture that aligns with your business objectives and scales efficiently.',
    },
    {
      step: '03',
      title: 'Implementation & Development',
      description: 'Execute the solution with agile methodology, ensuring quality deliverables and continuous communication.',
    },
    {
      step: '04',
      title: 'Testing & Optimization',
      description: 'Rigorous testing, performance optimization, and fine-tuning to ensure optimal results.',
    },
    {
      step: '05',
      title: 'Launch & Support',
      description: 'Smooth deployment with comprehensive training and ongoing support to ensure long-term success.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 leading-tight">
            Services & Solutions
          </h2>
          <p className="mt-4 text-lg text-accent-700 max-w-3xl mx-auto">
            Comprehensive technical and customer success solutions designed to drive
            growth, efficiency, and customer satisfaction
          </p>
          <div className="mt-6 w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                service.popular
                  ? 'border-primary-500 shadow-brand'
                  : 'border-accent-200 hover:border-primary-300'
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-400 rounded-2xl flex items-center justify-center text-white">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary-900">
                  {service.title}
                </h3>
                <p className="text-accent-700 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-accent-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="pt-4 border-t border-accent-100">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary-600">
                      {service.pricing}
                    </span>
                    <a
                      href="#contact"
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        service.popular
                          ? 'bg-primary-500 text-white hover:bg-primary-600'
                          : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                      }`}
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              My Process
            </h3>
            <p className="text-lg text-accent-700 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery and long-term customer success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto border-4 border-primary-500 shadow-brand">
                    <span className="text-xl font-bold text-primary-600">
                      {step.step}
                    </span>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-accent-300 transform -translate-y-1/2"></div>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-primary-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-accent-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-primary-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-accent-700 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution
            that drives real business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary">
              Start Your Project
            </a>
            <a href="#case-studies" className="btn-secondary">
              View Case Studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
