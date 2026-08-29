import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Understand how Adruva Solution collects, stores, protects, and manages your personal information in accordance with Indian IT regulations.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPolicyPage() {
  const currentDate = "June 8, 2026";

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
            <span className="text-text-primary dark:text-white font-medium">
              Privacy Policy
            </span>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Section className="py-12 md:py-20">
        <Container>
          <div className="max-w-[800px] mx-auto space-y-10">
            {/* Header info */}
            <div className="space-y-4 text-center md:text-left">
              <Badge
                variant="outline"
                className="px-3 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-wider text-xs font-semibold"
              >
                Compliance
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins text-secondary dark:text-white leading-tight tracking-tight">
                Privacy Policy
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-inter py-2 border-b border-border/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary/80" />
                  Last Updated: {currentDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-primary/80" />
                  GDPR & Indian IT Act Compliant
                </span>
              </div>
            </div>

            {/* Document body using styled elements */}
            <div className="prose prose-lg dark:prose-invert font-inter text-text-secondary dark:text-gray-300 space-y-6 leading-relaxed">
              <p>
                At <strong>Adruva Solution</strong>, we respect your privacy and
                are committed to protecting the personal information you share
                with us. This Privacy Policy explains how we collect, use,
                store, and safeguard your data when you visit our website (
                <Link href="/" className="text-primary hover:underline">
                  adruvasolution.com
                </Link>
                ) or submit inquiries through our forms.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                1. Information We Collect
              </h2>
              <p>
                We collect information directly from you when you interact with
                our website, subscribe to our newsletter, submit a contact form,
                or schedule a call. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Identifiers:</strong> Your full name, email
                  address, phone number, and company name.
                </li>
                <li>
                  <strong>Project Parameters:</strong> Services of interest,
                  estimated budget range, timelines, and messages detailing your
                  requirements.
                </li>
                <li>
                  <strong>Analytics & Technical Data:</strong> IP address,
                  browser type, device information, and pages visited (via
                  Google Analytics).
                </li>
                <li>
                  <strong>Spam Protection:</strong> Verification tokens
                  generated during submissions via Google reCAPTCHA v3.
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p>
                The information we collect is processed strictly to support your
                inquiry and deliver exceptional services. We use your data to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Review, qualify, and respond to your service inquiries.</li>
                <li>
                  Pushe lead entries automatically into our CRM system
                  (AdruvaCRM) to schedule callbacks.
                </li>
                <li>
                  Distribute newsletters and email updates (only if you
                  voluntarily subscribe).
                </li>
                <li>
                  Improve website usability, layout design, and ad campaign
                  performance.
                </li>
                <li>Ensure site security and prevent automated form spam.</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <p>
                <strong>
                  We do not sell, rent, or trade your personal information with
                  third parties.
                </strong>{" "}
                Your data is accessed only by authorized Adruva Solution team
                members who require it to serve you.
              </p>
              <p>
                We may disclose your information if required to do so by
                applicable Indian law or in response to valid requests by public
                authorities (e.g., a court or government agency).
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                4. Data Retention and Security
              </h2>
              <p>
                We retain your personal details only for as long as necessary to
                fulfill the purposes outlined in this policy or to comply with
                legal requirements. We utilize modern industry-standard security
                measures (such as SSL encryption, secure API integrations, and
                Cloudflare firewalls) to protect your data from unauthorized
                access or alteration.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                5. Your Rights
              </h2>
              <p>
                Under Indian IT laws and GDPR, you have the right to request
                access to the personal data we hold about you, request
                corrections to any inaccurate information, or request the
                deletion of your personal details from our active databases. To
                exercise these rights, please email us at the address listed
                below.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                6. Contact Information
              </h2>
              <p>
                If you have any questions about this Privacy Policy or our data
                management practices, please contact our grievance officer:
              </p>
              <div className="bg-muted/30 p-6 rounded-xl border border-border/80 not-italic space-y-3 mt-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-semibold text-secondary dark:text-white">
                    info@adruvasolution.com
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-semibold text-secondary dark:text-white">
                    +91 98765 43210
                  </span>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold text-secondary dark:text-white">
                    Near Bageshwari Devi Mandir, Shanti Nagar, Dhalwala,
                    Rishikesh, Uttarakhand, India - 249137
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
