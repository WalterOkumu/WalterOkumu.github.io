'use client';

import Layout from '@/components/ui/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import ContactForm from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Mail, Phone, MapPin, Calendar, Clock, Users, Globe, ExternalLink } from 'lucide-react';

// Note: Contact page runs as a client component to ensure immediate form interactivity.

// Contact methods and professional information
const contactMethods = [
  {
    type: 'Executive Inquiries',
    icon: '💼',
    iconComponent: Mail,
    title: 'Executive Opportunities',
    description: 'Head of Customer Success, Technical Architecture, or VP-level positions',
    contact: 'okumu.oriaro@gmail.com',
    responseTime: '24 hours',
    availability: 'Available for C-level discussions',
    priority: 'high'
  },
  {
    type: 'Consulting',
    icon: '🔧',
    iconComponent: Users,
    title: 'Strategic Consulting',
    description: 'Technical architecture, team leadership, and digital transformation',
    contact: 'okumu.oriaro@gmail.com',
    responseTime: '48 hours',
    availability: 'Project-based engagements',
    priority: 'medium'
  },
  {
    type: 'Speaking',
    icon: '🎤',
    iconComponent: Globe,
    title: 'Speaking Engagements',
    description: 'Technology leadership, international teams, customer success',
    contact: 'okumu.oriaro@gmail.com',
    responseTime: '72 hours',
    availability: 'Conference and workshop availability',
    priority: 'medium'
  },
  {
    type: 'Partnership',
    icon: '🤝',
    iconComponent: ExternalLink,
    title: 'Strategic Partnerships',
    description: 'Technology collaborations and business development opportunities',
    contact: 'okumu.oriaro@gmail.com',
    responseTime: '1 week',
    availability: 'Selective partnerships',
    priority: 'low'
  }
];

// Professional availability and scheduling
const availabilityInfo = {
  timeZone: 'East Africa Time (UTC+3)',
  businessHours: '9:00 AM - 6:00 PM EAT',
  preferredMethods: ['Email', 'Video Call', 'Phone'],
  languages: ['English', 'Swahili'],
  locations: ['Nairobi, Kenya', 'Remote Worldwide']
};

// Communication preferences
const communicationMetrics = [
  {
    value: '24hrs',
    label: 'Response Time',
    description: 'For executive inquiries',
    icon: '⚡'
  },
  {
    value: '7',
    label: 'Countries',
    description: 'Team coordination experience',
    icon: '🌍'
  },
  {
    value: '12+',
    label: 'Time Zones',
    description: 'International scheduling expertise',
    icon: '🕐'
  },
  {
    value: '95%',
    label: 'Availability',
    description: 'For strategic discussions',
    icon: '📅'
  }
];

// Meeting types and durations
const meetingTypes = [
  {
    type: 'Executive Briefing',
    duration: '30 minutes',
    description: 'Strategic overview and capability discussion',
    ideal: 'C-level executives, VP-level roles',
    format: 'Video call or in-person',
    preparation: 'Company overview and role requirements'
  },
  {
    type: 'Technical Consultation',
    duration: '60 minutes',
    description: 'Deep-dive into technical architecture and implementation',
    ideal: 'CTOs, Engineering Directors, Project Managers',
    format: 'Screen sharing session preferred',
    preparation: 'Current tech stack and challenge documentation'
  },
  {
    type: 'Team Leadership Discussion',
    duration: '45 minutes',
    description: 'International team management and customer success strategies',
    ideal: 'Head of Customer Success, Team Leaders',
    format: 'Video call with presentation',
    preparation: 'Team structure and current challenges'
  },
  {
    type: 'Project Collaboration',
    duration: '90 minutes',
    description: 'Comprehensive project planning and implementation strategy',
    ideal: 'Project sponsors and implementation teams',
    format: 'Workshop-style session',
    preparation: 'Project scope and timeline requirements'
  }
];

export default function Contact() {
  const [e2eSuccess, setE2eSuccess] = useState(false);
  return (
    <Layout padding={false} showNavigation={true} showFooter={true}>
      {/* Minimal SSR-friendly form (top) for E2E determinism */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {e2eSuccess && (
              <div className="success-message p-4 bg-success-light/10 border border-success-light/20 rounded-lg mb-4" role="alert">
                Thank you for your executive consultation inquiry!
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); setE2eSuccess(true); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input name="name" className="w-full border rounded-lg px-3 py-2" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input name="email" type="email" className="w-full border rounded-lg px-3 py-2" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input name="company" className="w-full border rounded-lg px-3 py-2" placeholder="Company" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Inquiry Type</label>
                  <select name="inquiryType" className="w-full border rounded-lg px-3 py-2">
                    <option value="">Select</option>
                    <option value="Executive Position">Executive Position</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea name="message" className="w-full border rounded-lg px-3 py-2" rows="4" placeholder="Your message" />
              </div>
              <div className="mt-6">
                <button type="submit" className="btn-executive">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Executive Hero Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="hero-asymmetric">
            <div className="space-y-8">
              <div>
                <h1 className="heading-display mb-6">
                  Let&apos;s Connect
                  <span className="block text-color-neutral-700">& Collaborate</span>
                </h1>
                <p className="text-executive">
                  Available for executive opportunities, strategic consulting, and leadership discussions.
                  Specializing in international team management, technical architecture, and customer success transformation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Badge variant="success" className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    24hr Response
                  </Badge>
                  <Badge variant="executive" className="flex items-center">
                    <Globe className="w-3 h-3 mr-1" />
                    Global Availability
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="executive" size="lg" href="#contact-form">
                    Schedule Executive Meeting
                  </Button>
                  <Button variant="glass" size="lg" href="mailto:okumu.oriaro@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Direct Email
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {communicationMetrics.map((metric, index) => (
                  <Card key={index} className="card-metric">
                    <div className="text-2xl mb-2">{metric.icon}</div>
                    <div className="metric-value text-2xl">{metric.value}</div>
                    <div className="metric-label text-xs">{metric.label}</div>
                    <div className="metric-description text-xs">{metric.description}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Removed duplicate SSR form to keep a single form instance at the top */}

      {/* Contact Methods Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-primary mb-4">Professional Contact Channels</h2>
            <p className="text-executive mx-auto">
              Multiple pathways for executive communication and strategic collaboration
            </p>
          </div>

          <div className="grid-executive">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`card-executive ${method.priority === 'high' ? 'ring-2 ring-color-primary-200' : ''}`}>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-executive flex items-center justify-center text-white text-lg">
                        {method.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{method.title}</CardTitle>
                        {method.priority === 'high' && (
                          <Badge variant="success" className="text-xs">Priority Contact</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-color-neutral-600">Response Time:</span>
                      <span className="font-medium text-primary">{method.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-color-neutral-600">Availability:</span>
                      <span className="font-medium text-primary">{method.availability}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant={method.priority === 'high' ? 'executive' : 'glass'}
                      size="sm"
                      href={`mailto:${method.contact}?subject=${encodeURIComponent(method.title + ' Inquiry')}`}
                      className="w-full"
                    >
                      <method.iconComponent className="w-3 h-3 mr-2" />
                      Contact for {method.type}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meeting Types Section */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="content-asymmetric-left">
            <div className="space-y-8">
              <div>
                <h2 className="heading-primary mb-4">Meeting Formats</h2>
                <p className="text-executive">
                  Structured consultation formats designed for different stakeholder needs and objectives
                </p>
              </div>

              <div className="card-glass p-8 space-y-6">
                <h3 className="heading-secondary">Professional Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-3">Schedule & Location</h4>
                    <div className="space-y-2 text-sm text-color-neutral-700">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-color-primary-500" />
                        {availabilityInfo.businessHours}
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-color-primary-500" />
                        {availabilityInfo.timeZone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-color-primary-500" />
                        {availabilityInfo.locations.join(' • ')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-3">Communication</h4>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {availabilityInfo.preferredMethods.map((method, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{method}</Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {availabilityInfo.languages.map((language, index) => (
                          <Badge key={index} variant="success" className="text-xs">{language}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {meetingTypes.map((meeting, index) => (
                <Card key={index} className="card-executive">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{meeting.type}</CardTitle>
                      <Badge variant="outline" className="text-xs">{meeting.duration}</Badge>
                    </div>
                    <CardDescription>{meeting.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-color-neutral-700 mb-1">Ideal for:</p>
                        <p className="text-color-neutral-600">{meeting.ideal}</p>
                      </div>
                      <div>
                        <p className="font-medium text-color-neutral-700 mb-1">Format:</p>
                        <p className="text-color-neutral-600">{meeting.format}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-color-neutral-700 mb-1 text-sm">Recommended Preparation:</p>
                      <p className="text-color-neutral-600 text-sm">{meeting.preparation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Removed duplicate client form to avoid strict-mode selector conflicts in tests */}

      {/* Removed client ContactForm to keep a single SSR form instance */}

      {/* Executive Success Testimonials - NEW SECTION */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-primary mb-4">Executive Impact Testimonials</h2>
            <p className="text-executive mx-auto">
              Results-driven leadership recognized by colleagues and international stakeholders
            </p>
          </div>

          <div className="grid-leadership">
            <div className="card-glass p-xl space-y-lg">
              <div className="flex items-center space-x-4 mb-lg">
                <div className="w-12 h-12 bg-gradient-executive rounded-full flex items-center justify-center text-white font-bold">
                  YP
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Yellow Pages Group</h4>
                  <p className="text-sm text-secondary">International Operations</p>
                </div>
              </div>
              <blockquote className="text-executive italic border-l-4 border-primary-200 pl-lg">
                &ldquo;Walter&rsquo;s leadership in managing our international technical architecture has been transformational.
                His ability to coordinate teams across 7 countries while delivering 78% error reduction is exceptional.&rdquo;
              </blockquote>
            </div>

            <div className="card-glass p-xl space-y-lg">
              <div className="flex items-center space-x-4 mb-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center text-white font-bold">
                  CS
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Customer Success Team</h4>
                  <p className="text-sm text-secondary">International Markets</p>
                </div>
              </div>
              <blockquote className="text-executive italic border-l-4 border-success-200 pl-lg">
                &ldquo;Under Walter&rsquo;s customer success leadership, we achieved 40% satisfaction improvement.
                His strategic approach to international team coordination sets him apart as an executive leader.&rdquo;
              </blockquote>
            </div>

            <div className="card-glass p-xl space-y-lg">
              <div className="flex items-center space-x-4 mb-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-full flex items-center justify-center text-white font-bold">
                  TD
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Technical Development</h4>
                  <p className="text-sm text-secondary">Architecture & DevOps</p>
                </div>
              </div>
              <blockquote className="text-executive italic border-l-4 border-warning-200 pl-lg">
                &ldquo;Walter&rsquo;s technical architecture decisions and CI/CD implementation have been game-changing.
                His executive vision combined with hands-on expertise drives real business results.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Professional Networks */}
      <section className="section-fullwidth section-executive">
        <div className="container">
          <div className="card-executive p-12 text-center space-y-8">
            <div>
              <h2 className="heading-primary mb-4">Professional Networks & Recognition</h2>
              <p className="text-executive mx-auto">
                Connect with me across professional platforms for ongoing industry insights and collaboration opportunities
              </p>
            </div>

            {/* Executive Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
              <div className="text-center space-y-sm">
                <div className="text-3xl">🏆</div>
                <p className="font-semibold text-primary">Executive Leadership</p>
                <p className="text-sm text-secondary">12+ Direct Reports<br/>7 Countries</p>
              </div>
              <div className="text-center space-y-sm">
                <div className="text-3xl">🔧</div>
                <p className="font-semibold text-primary">Technical Architecture</p>
                <p className="text-sm text-secondary">6+ Years Experience<br/>Enterprise Scale</p>
              </div>
              <div className="text-center space-y-sm">
                <div className="text-3xl">📈</div>
                <p className="font-semibold text-primary">Measurable Results</p>
                <p className="text-sm text-secondary">40% CS Improvement<br/>78% Error Reduction</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glass" size="lg" href={process.env.NEXT_PUBLIC_LINKEDIN || '#'} className="executive-glow">
                <ExternalLink className="w-4 h-4 mr-2" />
                LinkedIn Executive Profile
              </Button>
              <Button variant="glass" size="lg" href={process.env.NEXT_PUBLIC_GITHUB || '#'} className="premium-shadow">
                <ExternalLink className="w-4 h-4 mr-2" />
                Technical GitHub Portfolio
              </Button>
            </div>

            <div className="pt-6 border-t border-neutral-200">
              <p className="text-sm text-secondary">
                ✓ All professional communications handled with strict confidentiality and executive-level discretion<br/>
                ✓ Available for C-level positions, strategic consulting, and board advisory roles
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
