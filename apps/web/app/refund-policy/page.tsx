import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Clock, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Understand the terms governing cancellations, milestone refunds, and non-refundable services (advertising setups/hosting) at Adruva Solution.",
  alternates: {
    canonical: "/refund-policy",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RefundPolicyPage() {
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
              Refund Policy
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
                Financial Terms
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins text-secondary dark:text-white leading-tight tracking-tight">
                Refund & Cancellation
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted font-inter py-2 border-b border-border/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary/80" />
                  Last Updated: {currentDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCcw className="w-4 h-4 text-primary/80" />
                  Milestone-Based Billing Model
                </span>
              </div>
            </div>

            {/* Document body using styled elements */}
            <div className="prose prose-lg dark:prose-invert font-inter text-text-secondary dark:text-gray-300 space-y-6 leading-relaxed">
              <p>
                At <strong>Adruva Solution</strong>, we focus strictly on
                delivering high-quality digital growth, AI automation, and
                full-stack software solutions. Because our work is tailored to
                each client&apos;s specific requirements, our billing operates
                on a milestone basis. This policy outlines when refunds and
                cancellations are available.
              </p>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                1. Project Deposits & Kickoffs
              </h2>
              <p>
                Every project proposal defines an initial kickoff deposit
                (typically 30% to 50% of the total project value).
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Full Refund:</strong> If you cancel your project
                  within <strong>48 hours</strong> of signing the contract AND
                  development/design work has not started, you are eligible for
                  a 100% refund of your deposit (minus standard payment gateway
                  transaction fees).
                </li>
                <li>
                  <strong>Partial/No Refund:</strong> If work (design
                  researching, asset cataloging, wireframing) has already
                  initiated, the kickoff deposit is non-refundable.
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                2. Milestone-Based Refunds
              </h2>
              <p>
                Our projects are broken down into transparent milestones (e.g.
                Milestone 1: Figma UI design approved, Milestone 2: Frontend
                code built, Milestone 3: CRM/API integration completed).
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Once a milestone is completed, reviewed, and signed off by the
                  client, the payment associated with that milestone is{" "}
                  <strong>strictly non-refundable</strong>.
                </li>
                <li>
                  If the client chooses to cancel the project mid-way, they are
                  not billed for subsequent milestones, but payments made for
                  previously completed milestones will not be returned.
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                3. Non-Refundable Items & Services
              </h2>
              <p>
                Certain costs incurred during digital marketing or software
                implementation are non-refundable. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Ad Spend:</strong> Budgets loaded directly into ad
                  platforms like Google Ads and Meta Ads Manager. We manage your
                  ads, but ad platforms bill you directly for
                  clicks/impressions.
                </li>
                <li>
                  <strong>Setup Fees:</strong> Configuration and setup fees for
                  third-party hosting (Vercel, AWS, Railway), domain names,
                  custom API subscriptions, or WhatsApp Meta verification
                  charges.
                </li>
                <li>
                  <strong>Software Licenses:</strong> Costs for purchasing
                  specific themes, plugins, custom software packages, or license
                  keys requested by the client.
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                4. Service Suspension and Cancellation
              </h2>
              <p>
                Either party may terminate a project agreement by providing
                written notice (via email) to the other party. Upon
                cancellation:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The client will be billed for all hours or deliverables
                  completed up to the date of cancellation.
                </li>
                <li>
                  Adruva Solution will deliver all source files and code
                  compiled up to the cancellation date, provided all outstanding
                  dues for completed milestones are fully cleared.
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold font-poppins text-secondary dark:text-white mt-8 mb-4">
                5. Contact Us
              </h2>
              <p>
                If you wish to discuss your billing, submit a cancellation
                request, or inquire about payments, please contact us at:
              </p>
              <div className="bg-muted/30 p-6 rounded-xl border border-border/80 not-italic space-y-3 mt-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-semibold text-secondary dark:text-white">
                    info@adruvasolution.com
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
