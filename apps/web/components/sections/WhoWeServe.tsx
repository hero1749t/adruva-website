"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import {
  ArrowRight,
  Building2,
  Utensils,
  HeartPulse,
  Laptop,
  Scale,
  GraduationCap,
  Plane,
  Stethoscope,
} from "lucide-react";

const priorityIndustries = [
  {
    name: "Hospitality & Dining",
    desc: "Hotels, resorts, luxury retreats, and multi-outlet restaurants needing offline POS, QR ordering, and reservation funnels.",
    icon: Utensils,
    useCase: "Table booking & POS sync",
  },
  {
    name: "Travel & Wellness",
    desc: "Yoga teacher trainings, retreat centers, and travel operators requiring multi-currency booking engines & WhatsApp CRM.",
    icon: Plane,
    useCase: "Global enrolment & payments",
  },
  {
    name: "Real Estate & Property",
    desc: "Developers, commercial brokerages, and proptech platforms requiring interactive floorplans & automated lead routing.",
    icon: Building2,
    useCase: "Lead qualification & 3D tour sync",
  },
  {
    name: "Technology & SaaS",
    desc: "High-growth startups, B2B platforms, and digital products needing custom web apps, APIs, and headless CMS architecture.",
    icon: Laptop,
    useCase: "Microservices & product engineering",
  },
  {
    name: "Healthcare & Clinics",
    desc: "Diagnostic labs, dental clinics, and wellness centers seeking HIPAA/data-safe appointment engines and reminder automation.",
    icon: Stethoscope,
    useCase: "Patient booking & SMS alerts",
  },
  {
    name: "Professional Services",
    desc: "Consultancies, law firms, and financial practices needing client onboarding portals and authority-building search ranking.",
    icon: Scale,
    useCase: "Client intake & portal security",
  },
];

export function WhoWeServe() {
  return (
    <section
      id="industries"
      className="relative w-full py-24 bg-background border-b border-border/60 transition-colors duration-300"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20 mb-4 inline-block">
              VERTICAL EXPERTISE
            </span>
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Built across industries.
            </h2>
            <p className="font-manrope text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              We design specialized architecture tailored to the unique
              operational workflows, compliance requirements, and customer
              behavior of each sector.
            </p>
          </div>

          <Link href="/contact" className="self-start md:self-end">
            <span className="font-space text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1.5">
              Discuss Your Industry Requirements
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* 6 Priority Vertical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorityIndustries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#111720] border border-slate-200 dark:border-[#202936] hover:border-brand-blue/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-blue transition-colors">
                    {ind.name}
                  </h3>

                  <p className="font-manrope text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {ind.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Core Use Case</span>
                  <span className="font-semibold text-brand-blue">
                    {ind.useCase}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default WhoWeServe;
