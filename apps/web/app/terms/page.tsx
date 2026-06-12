import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Scale, Clock, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions governing project agreements, portal usage, payment timelines, and intellectual property transfers at Adruva Solution.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  const currentDate = 'June 8, 2026';

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 border-b border-border transition-colors duration-300">
        <Container>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-text-primary dark:text-white font-medium">Terms of Service</span>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Section className="py-12 md:py-20">
        <Container>
          <div className="max-w-[800px] mx-auto space-y-10">
            {/* Header info */}
            <div className="space-y-4 text-center md:text-left">
              <Badge variant="outline" className="px-3 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-wider text-xs font-semibold">
                Legal Contract
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins text-secondary dark:text-white leading-tight tracking-tight">
                Terms of Service
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-inter py-2 border-b border-border/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary/80" />
                  Last Updated: {currentDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-primary/80" />
                  Governing Law: Dehradun Jurisdiction
                </span>
              </div>
            </div>

            {/* Document body using styled elements */}
            <div className="prose prose-lg dark:prose-invert font-inter text-text-secondary dark:text-gray-300 space-y-6 leading-relaxed">
              <p>
                Welcome to <strong>Adruva Solution</strong>. By accessing our website, inquiring about our services, or signing a project proposal, you agree to comply with and be bound by the following Terms of Service. Please read these terms carefully before engaging our services.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you (whether personally or on behalf of an entity) and Adruva Solution (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), concerning your access to and use of our services. If you do not agree with all of these terms, you are prohibited from using our site and services.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                2. Scope of Services
              </h2>
              <p>
                Adruva Solution provides web development, mobile app development, custom SaaS software engineering, AI automation integrations, Google & Meta Ads management, SEO execution, and branding services.
              </p>
              <p>
                The exact scope of work, deliverables, and timelines for any specific client project will be outlined in a separate Statement of Work (SOW) or project proposal, which is subject to these general Terms.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                3. Client Obligations
              </h2>
              <p>
                To ensure project delivery stays on schedule, clients agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, complete, and timely information, graphics, texts, access keys, and logos required for project implementation.</li>
                <li>Provide timely feedback and milestone approvals within the agreed timelines.</li>
                <li>Ensure all content provided does not infringe on any third-party intellectual property or copyright boundaries.</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                4. Billing, Payments & Cancellations
              </h2>
              <p>
                All project billing will follow the milestone schedule outlined in your specific Statement of Work.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Advance Payment:</strong> Every project requires an initial kickoff deposit (usually 30% to 50%) before design or development initiates.</li>
                <li><strong>Milestone Payments:</strong> Remaining payments are due immediately upon the completion and approval of respective project milestones.</li>
                <li><strong>Delinquent Accounts:</strong> We reserve the right to pause active development, ad campaigns, or hosting instances if invoice payments remain overdue for more than 7 days.</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                5. Intellectual Property Transfer
              </h2>
              <p>
                Upon receipt of full and final payment for a project, the intellectual property rights, source code, visual designs, and assets created specifically for your project are transferred to you.
              </p>
              <p>
                Adruva Solution retains the right to display screenshots, mockups, and client testimonials of the completed work in our public portfolio, case studies, and marketing materials, unless a Non-Disclosure Agreement (NDA) explicitly prohibiting this is signed beforehand.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                6. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms of Service and your relationship with Adruva Solution shall be governed by and construed in accordance with the laws of the State of Uttarakhand, India. Any legal action, suit, or dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Dehradun, Uttarakhand, India</strong>.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                7. Contact Information
              </h2>
              <p>
                If you have any questions or require clarifications regarding these terms, please contact us at:
              </p>
              <div className="bg-muted/30 p-6 rounded-xl border border-border/80 not-italic space-y-3 mt-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-semibold text-secondary dark:text-white">hello@adruvasolution.com</span>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold text-secondary dark:text-white">
                    Rajpur Road, Jakhan, Dehradun, Uttarakhand, India - 248001
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
