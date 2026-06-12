import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Cookie, Clock, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Understand how Adruva Solution uses cookies to enhance theme selections, measure analytical data, and protect public forms.',
  alternates: {
    canonical: '/cookie-policy',
  },
};

export default function CookiePolicyPage() {
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
            <span className="text-text-primary dark:text-white font-medium">Cookie Policy</span>
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
                Privacy Settings
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins text-secondary dark:text-white leading-tight tracking-tight">
                Cookie Policy
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-inter py-2 border-b border-border/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary/80" />
                  Last Updated: {currentDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Cookie className="w-4 h-4 text-primary/80" />
                  Transparency Disclosure
                </span>
              </div>
            </div>

            {/* Document body using styled elements */}
            <div className="prose prose-lg dark:prose-invert font-inter text-text-secondary dark:text-gray-300 space-y-6 leading-relaxed">
              <p>
                This Cookie Policy explains how <strong>Adruva Solution</strong> uses cookies and similar tracking technologies on our website (<Link href="/" className="text-primary hover:underline">adruvasolution.com</Link>). We believe in complete transparency about how we collect and manage your data.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your computer or mobile device by websites you visit. They are widely used to make websites work more efficiently, improve browsing experience, and provide information to site owners.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                2. How We Use Cookies
              </h2>
              <p>
                We use cookies to enhance your experience, ensure form security, and study site traffic patterns. Specifically, we use cookies for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Preferences:</strong> Next-themes cookies to store your choice of light or dark theme mode.</li>
                <li><strong>Security:</strong> Google reCAPTCHA v3 cookies to protect our forms (Contact, Newsletter, Careers) from bot spam and abuse.</li>
                <li><strong>Analytics:</strong> Google Analytics cookies to track anonymous traffic statistics, such as pages visited, bounce rates, and device types.</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                3. Cookie Categories
              </h2>
              <p>
                The cookies used on our website fall into the following categories:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Strictly Necessary:</strong> Essential for standard page routing and basic operations (e.g. security and theme choice). These cookies do not store any personally identifiable info and cannot be turned off.</li>
                <li><strong>Performance & Analytics:</strong> Help us measure visitor volumes and navigation patterns so we can improve site speed and structure. All collected data is aggregated and anonymized.</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                4. Managing Your Cookie Choices
              </h2>
              <p>
                Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. You can also clear cookies stored in your browser history at any time.
              </p>
              <p>
                Please note that if you choose to reject or disable cookies, certain parts of our website (such as theme preferences or secure form submissions protected by reCAPTCHA) may not function correctly.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                5. Contact Information
              </h2>
              <p>
                If you have any questions or require details regarding our cookie usage, please contact us at:
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
