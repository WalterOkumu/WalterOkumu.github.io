export default function Experience() {
  const experiences = [
    {
      period: '2023 - Present',
      role: 'Technical Customer Success Architect',
      company: 'Freelance & Consulting',
      location: 'Global (Remote)',
      type: 'Full-time',
      description: 'Leading customer success initiatives for SaaS companies while architecting scalable technical solutions.',
      achievements: [
        'Improved customer retention by 35% through strategic onboarding optimization',
        'Architected solutions serving 200K+ businesses across 7 countries',
        'Achieved 99.9% uptime across all managed client systems',
        'Reduced customer churn by 40% through proactive success programs'
      ],
      technologies: ['Next.js', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'Customer Success Tools'],
      color: 'from-primary-500 to-primary-400'
    },
    {
      period: '2021 - 2023',
      role: 'Senior Full-Stack Developer',
      company: 'Yellow Pages Group',
      location: 'Multi-Country Operations',
      type: 'Contract',
      description: 'Developed and maintained digital directory platforms across multiple African and international markets.',
      achievements: [
        'Built unified multi-country directory system',
        'Integrated GraphQL APIs reducing load times by 50%',
        'Implemented automated deployment reducing deployment time by 80%',
        'Scaled platform to handle 1M+ monthly active users'
      ],
      technologies: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'PM2', 'Ubuntu'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      period: '2020 - 2021',
      role: 'Technical Solutions Engineer',
      company: 'Rhodium Digital Signage',
      location: 'Kenya',
      type: 'Full-time',
      description: 'Designed and implemented digital signage solutions using Raspberry Pi and modern web technologies.',
      achievements: [
        'Deployed digital signage solutions for 50+ enterprise clients',
        'Built real-time dashboard systems with 99.8% uptime',
        'Reduced hardware costs by 60% through optimized Raspberry Pi deployment',
        'Trained technical teams across 3 countries'
      ],
      technologies: ['Next.js', 'Raspberry Pi', 'Python', 'React', 'Real-time APIs'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      period: '2019 - 2020',
      role: 'Full-Stack Developer',
      company: 'Cura Global Recruitment',
      location: 'Global (Remote)',
      type: 'Contract',
      description: 'Developed recruitment platform connecting medical professionals with global opportunities.',
      achievements: [
        'Built end-to-end recruitment platform from scratch',
        'Implemented multi-country compliance and verification systems',
        'Automated candidate matching reducing manual work by 70%',
        'Integrated with 5+ international job boards and APIs'
      ],
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'API Integrations'],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      period: '2018 - 2019',
      role: 'Software Developer',
      company: 'Kua Wellness Africa',
      location: 'Kenya',
      type: 'Contract',
      description: 'Built wellness and HR management systems for African enterprises, focusing on employee health and recruitment.',
      achievements: [
        'Developed comprehensive employee wellness tracking system',
        'Built recruitment management platform with automated workflows',
        'Integrated health monitoring APIs and third-party services',
        'Implemented data analytics dashboard for HR insights'
      ],
      technologies: ['JavaScript', 'PHP', 'MySQL', 'API Development', 'Data Analytics'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '7+', label: 'Countries Served' },
    { number: '200K+', label: 'Users Impacted' },
    { number: '99.9%', label: 'Uptime Achieved' }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 leading-tight">
            Professional Experience
          </h2>
          <p className="mt-4 text-lg text-accent-700 max-w-3xl mx-auto">
            A journey through technical leadership, customer success, and global impact 
            across diverse industries and technologies
          </p>
          <div className="mt-6 w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full mx-auto"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-brand border border-accent-100">
              <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-accent-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-primary-500 shadow-brand z-10 flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${exp.color}`}></div>
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-brand border border-accent-100 hover:shadow-2xl transition-all duration-300">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                          {exp.period}
                        </span>
                        <span className="px-3 py-1 bg-accent-100 text-accent-700 text-sm font-medium rounded-full">
                          {exp.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-primary-900 mb-1">
                        {exp.role}
                      </h3>
                      
                      <div className="flex items-center text-accent-600 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      
                      <div className="flex items-center text-accent-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-accent-700 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start">
                            <svg className="w-4 h-4 text-primary-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-accent-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-accent-50 text-accent-700 text-xs font-medium rounded-full border border-accent-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-brand border border-accent-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-primary-900 mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-lg text-accent-700 mb-6">
              Let's leverage my experience to drive success for your next project or customer success initiative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary">
                Get In Touch
              </a>
              <a href="#case-studies" className="btn-secondary">
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}