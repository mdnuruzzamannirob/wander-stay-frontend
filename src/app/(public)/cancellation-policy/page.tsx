'use client';

import PageHero from '@/components/shared/PageHero';
import CmsContentRenderer from '@/components/shared/CmsContentRenderer';
import { DEMO_CANCELLATION_POLICY } from '@/lib/constants/cms-data';

export default function CancellationPolicyPage() {
  return (
    <>
      <PageHero
        title="Cancellation Policy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cancellation Policy' }]}
      />

      <section className="app-container py-16 sm:py-20">
        <CmsContentRenderer demoContent={DEMO_CANCELLATION_POLICY} />
      </section>
    </>
  );
}
