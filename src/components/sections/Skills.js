export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      skills: [
        { name: 'Next.js', level: 95 },
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'JavaScript', level: 88 },
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Backend Development',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 82 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'GraphQL', level: 80 },
        { name: 'REST APIs', level: 90 },
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Cloud & DevOps',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
      skills: [
        { name: 'AWS', level: 83 },
        { name: 'Docker', level: 78 },
        { name: 'Vercel', level: 90 },
        { name: 'PM2', level: 85 },
        { name: 'Ubuntu/Linux', level: 80 },
      ],
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Customer Success & AI',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      skills: [
        { name: 'Solution Architecture', level: 92 },
        { name: 'Process Automation', level: 88 },
        { name: 'AI Integration', level: 85 },
        { name: 'Technical Training', level: 90 },
        { name: 'Customer Onboarding', level: 94 },
      ],
      color: 'from-orange-500 to-red-500',
    },
  ];

  const certifications = [
    'AWS Solutions Architect',
    'Next.js Expert',
    'Customer Success Professional',
    'Agile Project Management',
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 leading-tight">
            Skills & Expertise
          </h2>
          <p className="mt-4 text-lg text-accent-700 max-w-3xl mx-auto">
            A comprehensive skill set spanning technical development, customer success,
            and modern automation technologies
          </p>
          <div className="mt-6 w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full mx-auto"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl p-8 shadow-brand border border-accent-100">
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mr-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-900">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-accent-700">
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium text-primary-600">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-accent-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Certifications */}
          <div className="bg-white rounded-2xl p-6 shadow-brand border border-accent-100">
            <h4 className="text-lg font-semibold text-primary-900 mb-4">
              Certifications & Training
            </h4>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-primary-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-accent-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="bg-white rounded-2xl p-6 shadow-brand border border-accent-100">
            <h4 className="text-lg font-semibold text-primary-900 mb-4">
              Tools & Platforms
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Git', 'Figma', 'VS Code', 'Postman', 'Slack', 'Notion', 'Linear', 'Calendly'].map((tool) => (
                <span key={tool} className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full border border-primary-200">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Methodologies */}
          <div className="bg-white rounded-2xl p-6 shadow-brand border border-accent-100">
            <h4 className="text-lg font-semibold text-primary-900 mb-4">
              Methodologies
            </h4>
            <div className="space-y-3">
              {['Agile/Scrum', 'Design Thinking', 'Customer-Centric Development', 'DevOps Practices'].map((method, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  <span className="text-sm text-accent-700">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-accent-700 mb-6">
            Ready to leverage these skills for your next project?
          </p>
          <a href="#contact" className="btn-primary">
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
}
