import Layout from '@/components/ui/Layout';

export const metadata = {
  title: 'Leading International Teams: Lessons from Managing Across 7 Countries',
  description: 'Practical strategies for distributed leadership, async communication, and delivery at scale.',
};

export default function PostLeadingInternationalTeams() {
  return (
    <Layout padding={true} showNavigation={true} showFooter={true}>
      <article className="prose max-w-3xl mx-auto">
        <h1>Leading International Teams: Lessons from Managing Across 7 Countries</h1>
        <p>
          Managing 12 direct reports across 7 countries demanded clear goals, asynchronous rituals,
          and a bias for written clarity. Here’s the framework I used to reduce delivery risk while
          improving satisfaction by 40%.
        </p>
        <h2>Operating System</h2>
        <ul>
          <li>Weekly outcomes over tasks; KPIs owned by teams.</li>
          <li>Asynchronous standups with 24h response windows.</li>
          <li>Design docs for all changes above medium complexity.</li>
        </ul>
        <h2>Results</h2>
        <ul>
          <li>78% deployment error reduction via CI/CD and checklists.</li>
          <li>Uptime at 99.7% with clear on-call runbooks.</li>
          <li>40% CSAT improvement through faster feedback loops.</li>
        </ul>
      </article>
    </Layout>
  );
}

