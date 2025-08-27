import Layout from '@/components/ui/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Clock, Users, BookOpen, TrendingUp, FileText, Calendar, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog - Walter Okumu Oriaro',
  description: 'Insights on technology leadership, international team management, customer success, and full-stack development from an executive perspective.',
};

// Upcoming blog topics with enhanced detail
const upcomingTopics = [
  {
    title: 'Leading International Teams: Lessons from Managing Across 7 Countries',
    description: 'Practical strategies for building trust, maintaining communication, and driving results in distributed teams spanning multiple time zones and cultures.',
    category: 'Leadership',
    readTime: '8 min read',
    icon: '🌍',
    tags: ['International Teams', 'Remote Leadership', 'Cultural Management', 'Distributed Teams'],
    complexity: 'Executive',
    audience: 'Team Leaders, VPs, CTOs',
    keyTopics: [
      'Cultural sensitivity in team management',
      'Asynchronous communication strategies',
      'Performance measurement across time zones',
      'Building trust in remote environments'
    ]
  },
  {
    title: 'Scaling Customer Success Operations: From 3 Weeks to 5 Days',
    description: 'A detailed case study on redesigning customer fulfillment operations that reduced time-to-value by 83% while improving satisfaction scores.',
    category: 'Customer Success',
    readTime: '12 min read',
    icon: '📈',
    tags: ['Customer Success', 'Process Optimization', 'SaaS Metrics', 'Operations'],
    complexity: 'Advanced',
    audience: 'Customer Success Leaders, Operations Managers',
    keyTopics: [
      'Customer journey mapping and optimization',
      'Data-driven intervention strategies',
      'Automated onboarding workflows',
      'Measuring customer success ROI'
    ]
  },
  {
    title: 'Microservices at Scale: Architecting for International Expansion',
    description: 'Technical deep-dive into building microservices architectures that can handle multiple countries, currencies, languages, and compliance requirements.',
    category: 'Architecture',
    readTime: '15 min read',
    icon: '🏗️',
    tags: ['Microservices', 'System Architecture', 'International', 'Scalability'],
    complexity: 'Expert',
    audience: 'Software Architects, Senior Engineers, CTOs',
    keyTopics: [
      'Multi-tenant architecture patterns',
      'International data compliance',
      'Currency and localization handling',
      'Cross-border performance optimization'
    ]
  },
  {
    title: 'DevOps Transformation: Reducing Deployment Errors by 78%',
    description: 'Step-by-step guide to implementing enterprise CI/CD pipelines that enabled rapid international expansion while maintaining quality.',
    category: 'DevOps',
    readTime: '10 min read',
    icon: '🚀',
    tags: ['DevOps', 'CI/CD', 'Docker', 'Automation', 'Quality Assurance'],
    complexity: 'Advanced',
    audience: 'DevOps Engineers, Platform Teams, Engineering Managers',
    keyTopics: [
      'Docker containerization strategies',
      'GitHub Actions enterprise workflows',
      'Automated testing frameworks',
      'Deployment rollback strategies'
    ]
  },
  {
    title: 'The Executive Technical Leader: Bridging Engineering and Business',
    description: 'How to effectively communicate technical complexity to business stakeholders while maintaining engineering excellence and team productivity.',
    category: 'Leadership',
    readTime: '9 min read',
    icon: '🎯',
    tags: ['Executive Leadership', 'Technical Communication', 'Stakeholder Management'],
    complexity: 'Executive',
    audience: 'CTOs, VPs of Engineering, Technical Directors',
    keyTopics: [
      'Technical debt communication strategies',
      'Engineering metrics for executives',
      'Balancing technical excellence with business needs',
      'Cross-functional team coordination'
    ]
  },
  {
    title: 'React Migration Strategy: Moving 7 International Platforms',
    description: 'Comprehensive case study on migrating legacy Drupal websites to React.js/Next.js while maintaining SEO rankings and user experience.',
    category: 'Technical',
    readTime: '14 min read',
    icon: '⚛️',
    tags: ['React.js', 'Migration Strategy', 'SEO', 'Performance'],
    complexity: 'Advanced',
    audience: 'Frontend Architects, Full-Stack Developers, Project Managers',
    keyTopics: [
      'Migration planning and risk assessment',
      'SEO preservation during platform changes',
      'Performance optimization techniques',
      'Team training and knowledge transfer'
    ]
  }
];

// Blog categories with enhanced metadata
const categories = [
  { name: 'All Topics', count: upcomingTopics.length, color: 'executive', icon: BookOpen },
  { name: 'Leadership', count: 2, color: 'success', icon: Users },
  { name: 'Technical', count: 1, color: 'primary', icon: FileText },
  { name: 'DevOps', count: 1, color: 'warning', icon: TrendingUp },
  { name: 'Customer Success', count: 1, color: 'success', icon: TrendingUp },
  { name: 'Architecture', count: 1, color: 'executive', icon: FileText }
];

// Blog metrics and insights
const blogMetrics = [
  {
    value: '6',
    label: 'Topics Planned',
    description: 'In-depth articles coming soon',
    icon: '📝'
  },
  {
    value: '4+',
    label: 'Years Experience',
    description: 'International leadership insights',
    icon: '🎯'
  },
  {
    value: '7',
    label: 'Countries',
    description: 'Real-world case studies',
    icon: '🌍'
  },
  {
    value: '100%',
    label: 'Practical Focus',
    description: 'Executive-level actionable insights',
    icon: '💡'
  }
];

// Newsletter subscription benefits
const subscriptionBenefits = [
  {
    benefit: 'Early Access',
    description: 'Get articles 48 hours before public release',
    icon: '⚡'
  },
  {
    benefit: 'Executive Insights',
    description: 'Monthly strategic leadership analysis',
    icon: '🎯'
  },
  {
    benefit: 'Case Study Access',
    description: 'Detailed behind-the-scenes project breakdowns',
    icon: '📊'
  },
  {
    benefit: 'Direct Communication',
    description: 'Ask questions and suggest topics',
    icon: '💬'
  }
];

export default function Blog() {
  return (
    <Layout padding={false} showNavigation={true} showFooter={true}>
      {/* Executive Hero Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="hero-asymmetric">
            <div className="space-y-8">
              <div>
                <h1 className="heading-display mb-6">
                  Leadership Insights
                  <span className="block text-color-neutral-700">& Technical Wisdom</span>
                </h1>
                <p className="text-executive">
                  Practical insights from leading international teams, architecting scalable systems,
                  and driving digital transformation across 7 countries. Executive-level perspectives
                  on technology leadership and customer success.
                </p>
              </div>

              <div className="space-y-4">
                <Badge variant="warning" className="flex items-center w-fit">
                  <Calendar className="w-3 h-3 mr-1" />
                  Launching Q2 2025
                </Badge>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="executive" size="lg" href="#newsletter">
                    Subscribe for Early Access
                  </Button>
                  <Button variant="glass" size="lg" href="/speaking">
                    Explore Speaking Topics
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {blogMetrics.map((metric, index) => (
                  <Card key={index} className="card-metric text-center p-4">
                    <div className="text-2xl mb-2">{metric.icon}</div>
                    <div className="metric-value text-2xl font-bold text-primary">{metric.value}</div>
                    <div className="metric-label text-xs font-medium text-color-neutral-700">{metric.label}</div>
                    <div className="metric-description text-xs text-color-neutral-600">{metric.description}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Categories Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-primary mb-4">Content Categories</h2>
            <p className="text-executive mx-auto">
              Comprehensive coverage of technology leadership, international management, and technical architecture
            </p>
          </div>

          <div className="grid-leadership">
            {categories.map((category, index) => (
              <Card key={index} className="card-glass">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-executive flex items-center justify-center text-white">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{category.name}</h3>
                    <p className="text-sm text-color-neutral-600">{category.count} articles planned</p>
                  </div>
                  <Badge variant={category.color} className="text-xs">
                    Coming Soon
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Articles Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-primary mb-4">Upcoming Articles</h2>
            <p className="text-executive mx-auto">
              In-depth analyses and practical guides based on real-world experience managing international teams and complex technical initiatives
            </p>
          </div>

          <div className="space-y-8">
            {upcomingTopics.map((topic, index) => (
              <Card key={index} className="card-executive">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-executive flex items-center justify-center text-white text-2xl flex-shrink-0">
                        {topic.icon}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-xs">{topic.category}</Badge>
                          <Badge variant="success" className="text-xs">{topic.complexity}</Badge>
                        </div>
                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                        <CardDescription className="text-base">{topic.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right space-y-2 flex-shrink-0">
                      <div className="flex items-center space-x-2 text-sm text-color-neutral-600">
                        <Clock className="w-4 h-4" />
                        <span>{topic.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-color-neutral-700 mb-3">Target Audience</p>
                      <p className="text-sm text-color-neutral-600">{topic.audience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-color-neutral-700 mb-3">Key Topics Covered</p>
                      <div className="space-y-1">
                        {topic.keyTopics.slice(0, 2).map((keyTopic, keyIndex) => (
                          <div key={keyIndex} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-color-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span className="text-sm text-color-neutral-600">{keyTopic}</span>
                          </div>
                        ))}
                        {topic.keyTopics.length > 2 && (
                          <p className="text-xs text-color-neutral-500 mt-2">+ {topic.keyTopics.length - 2} more topics</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-color-neutral-700 mb-3">Article Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-color-neutral-200">
                    <Button variant="glass" className="w-full">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Notify Me When Published
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="section-fullwidth section-executive" id="newsletter">
        <div className="container">
          <div className="content-asymmetric-right">
            <div className="space-y-8">
              <div>
                <h2 className="heading-primary mb-4">Executive Insights Newsletter</h2>
                <p className="text-executive">
                  Join technology leaders from around the world who receive exclusive insights,
                  early access to articles, and behind-the-scenes analysis of international technology leadership.
                </p>
              </div>

              <div className="space-y-6">
                {subscriptionBenefits.map((benefit, index) => (
                  <div key={index} className="card-glass p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-executive flex items-center justify-center text-white text-lg flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-2">{benefit.benefit}</h3>
                        <p className="text-sm text-color-neutral-600">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card-executive p-8 space-y-6">
                <div className="text-center">
                  <h3 className="heading-secondary mb-4">Subscribe for Early Access</h3>
                  <p className="text-sm text-color-neutral-600 mb-6">
                    Be among the first to receive executive-level insights on technology leadership,
                    international team management, and digital transformation strategies.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-color-neutral-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your.email@company.com"
                      className="w-full px-4 py-3 border border-color-neutral-300 rounded-lg focus:ring-2 focus:ring-color-primary-500 focus:border-color-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-color-neutral-700 mb-2">
                      Your Role (Optional)
                    </label>
                    <select
                      id="role"
                      className="w-full px-4 py-3 border border-color-neutral-300 rounded-lg focus:ring-2 focus:ring-color-primary-500 focus:border-color-primary-500"
                    >
                      <option value="">Select your role</option>
                      <option value="cto">CTO / Chief Technology Officer</option>
                      <option value="vp-eng">VP of Engineering</option>
                      <option value="head-cs">Head of Customer Success</option>
                      <option value="director">Director / Senior Manager</option>
                      <option value="architect">Principal Architect / Tech Lead</option>
                      <option value="other">Other Leadership Role</option>
                    </select>
                  </div>

                  <Button variant="executive" size="lg" className="w-full">
                    Subscribe to Executive Insights
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-color-neutral-200">
                  <p className="text-xs text-color-neutral-500">
                    Unsubscribe anytime. Your information is never shared.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="card-executive p-12 text-center space-y-8">
            <div>
              <h2 className="heading-primary mb-4">Ready to Discuss These Topics?</h2>
              <p className="text-executive mx-auto">
                Available for speaking engagements, strategic consulting, and leadership discussions
                on technology management and international team leadership
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="executive" size="lg" href="/speaking">
                Explore Speaking Engagements
              </Button>
              <Button variant="glass" size="lg" href="/contact">
                Schedule Strategic Discussion
              </Button>
            </div>

            <div className="pt-6 border-t border-color-neutral-200">
              <p className="text-sm text-color-neutral-600">
                Sharing real-world insights from leading international technology teams and digital transformation initiatives
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}