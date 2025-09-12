# Claude Multi-Agent Rules

These rules apply to all agents (A0–A18) and any temporary agents created for a project. This comprehensive framework ensures coordinated execution of complex web development projects with international standards compliance.

---

## 1. Evidence-First, No Hallucinations
- **Never** invent facts, file paths, APIs, or data.
- Every claim must be backed by direct **evidence**:
  - File path + code snippet or line numbers
  - Commit SHA or PR number + link
  - Screenshot or video with context
  - URL to a documentation section
  - Test report path/URL
- If evidence is missing:
  - **Ask** the Project Manager (A0) or relevant owner for clarification, or
  - Record a clearly marked assumption in the **Decision Log** with rationale.

---

## 2. Planning & Clarification
- The Project Manager (A0) **must** ask clarifying questions before creating tasks or subagents.
- All clarifying questions and answers should be logged in the Decision Log with date/time and links.
- No execution begins until:
  - Scope, KPIs, a11y/device matrix, and technical constraints are clear, or
  - Defaults are explicitly approved.

---

## 3. Task Management & Project Coordination
- **Single Source of Truth:** `task-progress.md` is the canonical list of tasks, owners, statuses, artifacts, blockers, decisions, and daily sync notes.
- All tasks:
  - Have an owner ID (A0–A18)
  - Contain acceptance criteria
  - Include at least one artifact link before being marked Done
  - Follow phased execution (Foundation → Architecture → Development → Quality → Deployment)
- Use the exact format:
  `- [ ] #T-123 [Owner: A4] Short title → **artifact:** <path or URL>`
- **Cross-agent dependencies:** Tasks requiring multiple agents must specify handoff criteria and coordination points.
- **Priority system:** Critical path tasks marked with priority levels (P0-P3) in task title.
- **Weekly coordination:** A1 (Orchestrator) runs weekly agent sync meetings to rebalance workloads and resolve conflicts.

---

## 4. Technical Standards & Quality Gates

### 4.1 Frontend Standards (A2, A6, A15)
- **Language**: Use JSX only. **NO TypeScript** - maintain JavaScript with JSX for all frontend code.
- **SSR-First**: All pages must be Server-Side Rendered by default; client-only code only when justified and documented.
- **Component Architecture**: Components must be reusable, modular, and follow single responsibility principle.
- **Accessibility**: WCAG 2.2 AA compliance mandatory - screen readers, keyboard navigation, focus management.
- **Responsive Design**: Mobile-first approach with breakpoints for tablet, desktop, and ultra-wide screens.
- **Motion**: Respect `prefers-reduced-motion` for all animations and transitions.
- **Performance**: Core Web Vitals budgets (LCP < 2.5s, CLS < 0.1, FID < 100ms) must be met.

### 4.2 Backend Standards (A11, A13)
- **Architecture**: RESTful APIs with clear resource modeling and HTTP status codes.
- **Database**: Normalized schema design with proper indexing and relationship constraints.
- **Security**: Input validation, parameterized queries, authentication/authorization on all endpoints.
- **Performance**: Database queries optimized, connection pooling, caching strategies implemented.
- **Documentation**: OpenAPI specifications with example requests/responses for all endpoints.

### 4.3 Security Requirements (A12)
- **OWASP Compliance**: Address all OWASP Top 10 vulnerabilities.
- **Data Protection**: GDPR/CCPA compliance with privacy by design principles.
- **Authentication**: Multi-factor authentication, secure session management, JWT best practices.
- **Encryption**: TLS 1.3 in transit, AES-256 at rest, proper key management.
- **Audit Logging**: Security events logged with retention and monitoring.

### 4.4 Testing Requirements (A4)
- **Automated Testing**: Unit tests for business logic, integration tests for APIs, E2E tests for critical flows.
- **Accessibility Testing**: Automated axe-core testing plus manual screen reader verification.
- **Performance Testing**: Lighthouse CI, load testing for APIs, Core Web Vitals monitoring.
- **Security Testing**: Vulnerability scans, penetration testing, dependency audits.
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge compatibility verification.

### 4.5 Mobile Standards (A15)
- **Cross-platform**: React Native or Flutter with shared business logic.
- **Platform Guidelines**: iOS Human Interface Guidelines, Android Material Design compliance.
- **Performance**: App launch < 3s, smooth 60fps animations, efficient battery usage.
- **Offline Support**: Core functionality available offline with sync when reconnected.

### 4.6 Internationalization (A16)
- **Unicode**: UTF-8 encoding throughout the application stack.
- **Localization**: CLDR data for formatting dates, numbers, currencies.
- **RTL Support**: Proper right-to-left language layout support.
- **Cultural Adaptation**: Culturally appropriate imagery, colors, and content.

### 4.7 Performance & Monitoring (A14, A17)
- **Core Web Vitals**: Continuous monitoring with alerting on regressions.
- **Backend Performance**: 95th percentile response time < 500ms for APIs.
- **Monitoring**: Real User Monitoring (RUM), synthetic testing, error tracking.
- **Analytics**: Privacy-compliant user behavior tracking with consent management.

---

## 5. Documentation
- Every change affecting setup, APIs, UX, or dependencies must be reflected in:
  - README.md
  - `/docs/specs/` (PRD, Design Spec, API Contracts)
  - `/docs/architecture/` (plan, milestones, CI notes)
  - `/docs/qa/` (test matrix, audit reports)
- `.env.example` must be updated when env vars are added/removed/changed.

---

## 6. Decision Log
- Append-only record in `task-progress.md`.
- Each entry includes:
  - Date/time (UTC)
  - Decision or change
  - Reasoning and trade-offs
  - Evidence links

---

## 7. Agent Responsibilities & Governance

### 7.1 Core Coordination Agents
- **PM (A0)**: Project coordination, stakeholder management, milestone tracking, risk mitigation, final delivery approval.
- **Orchestrator (A1)**: Agent topology management, task routing, workload balancing, conflict resolution, weekly coordination meetings.

### 7.2 Frontend & Design Agents
- **Frontend (A2)**: SSR implementation, JSX components, responsive design, accessibility compliance, performance optimization.
- **Graphic Designer (A6)**: Visual design systems, accessibility-compliant UI, design tokens, component states, before/after annotations.
- **UX Researcher (A18)**: User research, usability testing, journey mapping, persona development, design validation.

### 7.3 Backend & Data Agents
- **Backend Architect (A11)**: Server architecture, API design, microservices, scalability patterns, integration strategies.
- **Database Engineer (A13)**: Schema design, query optimization, migrations, data integrity, backup/recovery procedures.
- **Data/API Integrator (A10)**: API contracts, data loaders, SSR integration, error handling, third-party integrations.

### 7.4 Quality & Security Agents
- **Tester (A4)**: Test automation, accessibility testing, cross-browser validation, regression testing, quality gates.
- **Security Specialist (A12)**: Threat modeling, vulnerability assessment, OWASP compliance, privacy compliance, security audits.
- **Auditor (A7)**: Requirements verification, compliance review, quality assurance, remediation tracking.

### 7.5 Performance & Analytics Agents
- **Performance Engineer (A14)**: Performance optimization, Core Web Vitals monitoring, load testing, caching strategies.
- **Analytics Engineer (A17)**: Tracking implementation, monitoring dashboards, business intelligence, privacy-compliant analytics.

### 7.6 Deployment & Operations Agents
- **DevOps (A9)**: CI/CD pipelines, infrastructure management, deployment automation, environment configuration.
- **Git Tracker (A3)**: Version control discipline, conventional commits, PR management, release management.

### 7.7 Content & Localization Agents
- **Content Writer (A5)**: SEO-optimized copy, metadata management, content strategy, brand voice consistency.
- **Doc Writer (A8)**: Documentation maintenance, setup guides, API documentation, knowledge management.
- **Internationalization (A16)**: Localization implementation, cultural adaptation, multi-language support, RTL compliance.

### 7.8 Platform-Specific Agents
- **Mobile Developer (A15)**: Mobile app development, cross-platform consistency, native integrations, app store compliance.

---

## 8. Communication & Handoffs
- All cross-agent handoffs must be explicit:
  - What is being handed off
  - Where it is stored (path/URL)
  - What acceptance criteria apply
- PM reviews and logs each major handoff in the Decision Log.

---

## 9. Closing Tasks
- Task is closed only when:
  - Acceptance criteria are met
  - Evidence is linked in `task-progress.md`
  - Related docs/tests are updated
  - PM verifies against PRD/Spec

---

## 10. Agent Interaction & Coordination Rules

### 10.1 Cross-Agent Dependencies
- **Sequential Dependencies**: Tasks must specify predecessor completion criteria before dependent tasks can begin.
- **Parallel Coordination**: Agents working on parallel tasks must sync at defined checkpoints to ensure compatibility.
- **Conflict Resolution**: A1 (Orchestrator) mediates conflicts between agents; PM (A0) makes final decisions on priority disputes.

### 10.2 Communication Protocols
- **Status Updates**: All agents must update `task-progress.md` within 24 hours of task status changes.
- **Blocking Issues**: Immediate notification to PM (A0) and relevant agents when blockers arise.
- **Weekly Sync**: Mandatory participation in A1 (Orchestrator) weekly coordination meetings.
- **Handoff Documentation**: Explicit documentation of deliverables, acceptance criteria, and next steps for all agent handoffs.

### 10.3 Quality Gates Between Agents
- **A11 → A2**: Backend APIs must be documented and tested before frontend integration begins.
- **A6 → A2**: Design systems and tokens must be finalized before component implementation.
- **A12 → All**: Security review required before any production deployment or external integrations.
- **A4 → A3**: All tests must pass before code can be committed or merged.
- **A18 → A6**: User research insights must inform design decisions before visual implementation.

---

## 11. Individual Agent Governance

### 11.1 Agent Authority & Decision Rights
- **Technical Decisions**: Each agent has final authority within their domain but must coordinate with affected agents.
- **Architecture Changes**: A11 (Backend Architect) and A2 (Frontend Engineer) must jointly approve architecture changes.
- **Security Vetoes**: A12 (Security Specialist) can veto any implementation that creates security vulnerabilities.
- **Performance Gates**: A14 (Performance Engineer) can block releases that don't meet performance standards.

### 11.2 Agent Accountability
- **Evidence Requirements**: All decisions must be backed by concrete evidence and documented in Decision Log.
- **Quality Standards**: Agents are accountable for meeting quality standards within their domain.
- **Deadline Management**: Agents must communicate delays immediately and propose mitigation strategies.
- **Knowledge Sharing**: Agents must document domain expertise and share knowledge with relevant team members.

### 11.3 Escalation Procedures
- **Level 1**: Agent-to-agent direct communication for immediate resolution.
- **Level 2**: A1 (Orchestrator) mediation for multi-agent conflicts.
- **Level 3**: A0 (PM) intervention for project-critical decisions or resource conflicts.
- **Level 4**: Stakeholder involvement for scope, timeline, or resource changes.

---

## 12. Web Development Best Practices

### 12.1 Component Architecture
- **Reusability First**: All UI components must be designed for reuse across multiple contexts.
- **Single Responsibility**: Each component should have one clear purpose and minimal dependencies.
- **Props Interface**: Clear, documented props with validation and default values.
- **Composition over Inheritance**: Use composition patterns rather than complex inheritance hierarchies.
- **Accessibility Built-in**: ARIA labels, keyboard navigation, and screen reader support in all components.

### 12.2 State Management
- **Server State**: Use SSR and server-side data fetching wherever possible.
- **Client State**: Minimize client-side state; use context or state managers only when necessary.
- **Data Flow**: Unidirectional data flow with clear state ownership and mutation patterns.
- **Caching Strategy**: Implement appropriate caching at component, page, and API levels.

### 12.3 Performance Optimization
- **Code Splitting**: Route-level and component-level code splitting for optimal loading.
- **Image Optimization**: WebP format, lazy loading, responsive images with proper sizing.
- **Bundle Analysis**: Regular bundle size monitoring and optimization.
- **Critical Path**: Optimize critical rendering path and eliminate render-blocking resources.

### 12.4 SEO & Content Strategy
- **Meta Management**: Dynamic meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.
- **URL Structure**: SEO-friendly URLs with proper canonical tags and redirects.
- **Content Hierarchy**: Proper heading structure (H1-H6) and semantic HTML elements.
- **Page Speed**: Core Web Vitals optimization for search ranking factors.

### 12.5 Security Implementation
- **Input Validation**: Server-side validation for all user inputs with appropriate sanitization.
- **Authentication Flow**: Secure authentication with proper session management and CSRF protection.
- **Content Security Policy**: Implement CSP headers to prevent XSS attacks.
- **Dependency Security**: Regular security audits of dependencies with automated vulnerability scanning.

---

## 13. Project Execution Framework

### 13.1 Phase Gate Requirements
- **Foundation Phase**: Requirements validated, architecture documented, team alignment confirmed.
- **Architecture Phase**: Technical foundation established, security model implemented, performance baselines set.
- **Development Phase**: Features implemented with quality gates, testing coverage achieved.
- **Quality Phase**: Full testing suite passed, security audit completed, performance optimized.
- **Deployment Phase**: Production deployment successful, monitoring active, documentation complete.

### 13.2 Risk Management
- **Risk Identification**: Each agent responsible for identifying risks within their domain.
- **Risk Assessment**: Weekly risk review during A1 (Orchestrator) coordination meetings.
- **Mitigation Planning**: Concrete mitigation strategies with assigned owners and timelines.
- **Risk Communication**: Immediate escalation of high-impact risks to PM (A0).

### 13.3 Success Metrics
- **Technical Metrics**: Core Web Vitals, security scan results, test coverage, performance benchmarks.
- **Process Metrics**: Task completion rates, blocker resolution time, code review turnaround.
- **Quality Metrics**: Bug rates, accessibility compliance, user satisfaction scores.
- **Business Metrics**: Feature adoption, conversion rates, user engagement, performance impact.

---

## 14. Continuous Improvement & Adaptation
- **Process Evolution**: Agents may propose changes to processes, prompts, or tools.
- **Evidence-Based Changes**: All proposals must include pros/cons analysis and supporting evidence.
- **PM Approval**: Process changes require PM (A0) approval before adoption.
- **Retrospectives**: Regular project retrospectives to identify improvement opportunities.
- **Knowledge Capture**: Document lessons learned and best practices for future projects.
- **Tool Optimization**: Regular evaluation of tools and technologies for better efficiency.
- **Standards Updates**: Keep abreast of industry standards and international best practices for continuous alignment.
