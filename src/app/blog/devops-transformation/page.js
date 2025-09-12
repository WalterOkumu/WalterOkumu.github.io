import Layout from '@/components/ui/Layout';

export const metadata = {
  title: 'DevOps Transformation: Reducing Deployment Errors by 78%',
  description: 'A practical blueprint for introducing safe, fast, and reliable delivery at scale.',
};

export default function PostDevopsTransformation() {
  return (
    <Layout padding={true} showNavigation={true} showFooter={true}>
      <article className="prose max-w-3xl mx-auto">
        <h1>DevOps Transformation: Reducing Deployment Errors by 78%</h1>
        <p>
          We introduced trunk-based development, PR checks, and automated rollbacks across multiple
          markets without disrupting delivery. This post details the minimum viable pipeline.
        </p>
        <h2>Key Changes</h2>
        <ul>
          <li>Automated tests on every PR (unit + E2E smoke).</li>
          <li>Preview builds with deterministic artifacts.</li>
          <li>Observability hooks and error budgets per service.</li>
        </ul>
        <h2>Outcomes</h2>
        <ul>
          <li>Mean time to recovery: under 15 minutes.</li>
          <li>Release cadence: daily small batches.</li>
        </ul>
      </article>
    </Layout>
  );
}

