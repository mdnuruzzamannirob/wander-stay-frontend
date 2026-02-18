'use client';

import PageHero from '@/components/shared/PageHero';
import CmsContentRenderer from '@/components/shared/CmsContentRenderer';
import { DEMO_PRIVACY_POLICY } from '@/lib/constants/cms-data';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="app-container py-16 sm:py-20">
        <CmsContentRenderer demoContent={DEMO_PRIVACY_POLICY} />
      </section>
    </>
  );
}
