export default function About() {
  const highlights = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Technical Leadership',
      description: 'Bridging complex engineering solutions with business strategy and customer needs.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Global Experience',
      description: 'Successfully delivered solutions across 7+ countries with remote-first approach.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation Focus',
      description: 'Leveraging AI automation and modern tech stacks to solve complex business challenges.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Content */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              {/* Section Header */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-900 leading-tight">
                  About Walter Okumu
                </h2>
                <div className="mt-4 w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"></div>
              </div>

              {/* Bio */}
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-accent-700 leading-relaxed">
                  I'm a <strong className="text-primary-600">Technical Customer Success Architect</strong> with 
                  a unique hybrid background that bridges engineering excellence with customer satisfaction. 
                  My expertise lies in designing, implementing, and scaling solutions that solve complex 
                  business challenges while ensuring seamless user adoption and satisfaction.
                </p>

                <p className="text-lg text-accent-700 leading-relaxed">
                  With experience spanning <strong className="text-primary-600">full-stack development</strong>, 
                  <strong className="text-primary-600"> AI automation</strong>, and 
                  <strong className="text-primary-600"> customer success strategies</strong>, I help 
                  global SaaS companies build products that customers love and businesses depend on. 
                  My work has impacted over 200,000 businesses across 7+ countries, achieving 
                  industry-leading uptime of 99.9%.
                </p>

                <p className="text-lg text-accent-700 leading-relaxed">
                  I believe in a <strong className="text-primary-600">remote-first, global approach</strong> 
                  to problem-solving, combining technical architecture expertise with deep understanding 
                  of customer needs to deliver solutions that scale efficiently and drive real business value.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="bg-accent-50 rounded-lg p-6 border border-accent-100">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white">
                          {highlight.icon}
                        </div>
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-primary-900">
                        {highlight.title}
                      </h3>
                    </div>
                    <p className="text-accent-700 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
              <h3 className="text-xl font-semibold text-primary-900 mb-6">
                Core Expertise
              </h3>
              
              <div className="space-y-6">
                {/* Technical Skills */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">
                    Technical Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'Node.js', 'React', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Docker'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white text-primary-600 text-sm font-medium rounded-full border border-primary-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Customer Success */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">
                    Customer Success
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Solution Architecture', 'Process Automation', 'User Onboarding', 'Technical Training'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white text-primary-600 text-sm font-medium rounded-full border border-primary-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Industries */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">
                    Industry Experience
                  </h4>
                  <ul className="space-y-2 text-accent-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      SaaS & Enterprise Software
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Digital Transformation
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Healthcare & Recruitment
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      E-commerce & Directories
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-primary-200">
                  <a href="#contact" className="btn-primary w-full text-center">
                    Get In Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}