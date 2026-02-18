'use client';

import PageHero from '@/components/shared/PageHero';
import CmsContentRenderer from '@/components/shared/CmsContentRenderer';
import { DEMO_TERMS_CONDITIONS } from '@/lib/constants/cms-data';

export default function TermsConditionPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]}
      />

      <section className="app-container py-16 sm:py-20">
        <CmsContentRenderer demoContent={DEMO_TERMS_CONDITIONS} />
      </section>
    </>
  );
}
