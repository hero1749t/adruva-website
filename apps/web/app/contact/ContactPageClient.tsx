"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { contactFormSchema, ContactFormValues } from "@/lib/validations";
import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Loader2,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { toast, Toaster } from "sonner";

const SERVICES_OPTIONS = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app-development", label: "Mobile App Development" },
  { value: "saas-custom-software", label: "SaaS & Custom Software" },
  { value: "ai-automation", label: "AI Automation" },
  { value: "ai-ads", label: "AI Ads" },
  { value: "custom-ai-solutions", label: "Custom AI Solutions" },
  { value: "google-ads", label: "Google Ads" },
  { value: "meta-ads", label: "Meta Ads" },
  { value: "seo", label: "SEO Services" },
  { value: "social-media-management", label: "Social Media Management" },
  { value: "email-marketing", label: "Email Marketing" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "graphic-designing", label: "Graphic Designing" },
  { value: "video-editing", label: "Video Editing" },
  { value: "not-sure", label: "Not Sure / Other" },
];

const BUDGET_OPTIONS = [
  { value: "<50k", label: "< ₹50K" },
  { value: "50k-2l", label: "₹50K – ₹2L" },
  { value: "2l-5l", label: "₹2L – ₹5L" },
  { value: "5l+", label: "₹5L+" },
  { value: "discuss", label: "Let's discuss" },
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "6-months+", label: "6+ months" },
];

export function ContactPageClient() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(
    null,
  );

  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: Record<string, string> }>("/settings"),
  });
  const settings = settingsData?.data || {};

  const contactEmail = settings.contactEmail || "info@adruvasolution.com";
  const contactPhone = settings.contactPhone || "+91 91492 76799";
  const officeAddress =
    settings.officeAddress ||
    "Near Bageshwari Devi Mandir, Shanti Nagar, Dhalwala, Rishikesh, Uttarakhand - 249137";

  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      serviceInterested: "",
      budgetRange: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitStatus("loading");
    setSubmittedData(values);

    let token = "";
    try {
      if (executeRecaptcha) {
        token = await executeRecaptcha("contact");
      } else {
        console.warn("reCAPTCHA not loaded yet, proceeding without token");
      }
    } catch (err) {
      console.error("reCAPTCHA execution failed", err);
    }

    try {
      await apiFetch<unknown>("/inquiries", {
        method: "POST",
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          companyName: values.companyName,
          serviceInterested: values.serviceInterested,
          budgetRange: values.budgetRange,
          timeline: values.timeline,
          message: values.message,
          recaptchaToken: token,
        }),
      });

      setSubmitStatus("success");
      toast.success("Message sent! We'll reply within 24 hours.");
      reset();
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
      toast.error("Something went wrong. Please try WhatsApp.");
    }
  };

  const whatsappNumber = settings.contactPhone
    ? settings.contactPhone.replace(/[^0-9]/g, "")
    : process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919149276799";

  const getWhatsAppFallbackUrl = () => {
    if (!submittedData) return "#";
    const text = `Hi Adruva! I submitted a form but couldn't reach the server.
*Name:* ${submittedData.fullName}
*Email:* ${submittedData.email}
*Phone:* ${submittedData.phone}
*Company:* ${submittedData.companyName || "N/A"}
*Service:* ${submittedData.serviceInterested}
*Budget:* ${submittedData.budgetRange}
*Timeline:* ${submittedData.timeline}
*Message:* ${submittedData.message}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const defaultWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Adruva!%20I'd%20like%20to%20discuss%20a%20project.`;

  return (
    <div className="w-full">
      <Toaster position="top-right" richColors />

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 border-b border-border transition-colors duration-300">
        <Container>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-text-primary dark:text-white font-medium">
              Contact
            </span>
          </div>
        </Container>
      </div>

      {/* Contact Section */}
      <Section className="py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Info & Details (40% / 5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-wider text-xs font-semibold"
                >
                  Get In Touch
                </Badge>
                <h1 className="text-3xl md:text-4xl font-extrabold font-poppins text-secondary dark:text-white leading-tight tracking-tight">
                  Let&apos;s Build Something Great
                </h1>
                <p className="text-base leading-relaxed text-text-secondary dark:text-gray-300 font-inter">
                  We work with local, service-based, and startup businesses to
                  build modern web frameworks, automate manual workflows, and
                  scale customer outreach.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4 font-inter">
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center space-x-4 p-4 rounded-xl border border-border/60 bg-card hover:border-brand-orange/40 dark:hover:border-brand-orange/30 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted leading-none block">
                      Email Us
                    </span>
                    <span className="text-sm font-bold text-secondary dark:text-white mt-1 block">
                      {contactEmail}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                  className="flex items-center space-x-4 p-4 rounded-xl border border-border/60 bg-card hover:border-brand-orange/40 dark:hover:border-brand-orange/30 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted leading-none block">
                      Call Us
                    </span>
                    <span className="text-sm font-bold text-secondary dark:text-white mt-1 block">
                      {contactPhone}
                    </span>
                  </div>
                </a>

                <div className="flex items-center space-x-4 p-4 rounded-xl border border-border/60 bg-card shadow-sm">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted leading-none block">
                      Visit Office
                    </span>
                    <span className="text-sm font-bold text-secondary dark:text-white mt-1 block">
                      {officeAddress}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                  Instant Chat
                </span>
                <a
                  href={defaultWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 w-full font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl transition-all duration-300 shadow-md hover:shadow-[#25D366]/25 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Google Maps Embed */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/80 shadow-md">
                <iframe
                  title="Adruva Solution Rishikesh Office Location"
                  src="https://maps.google.com/maps?q=Adruva%20Solution,%20Shanti%20Nagar,%20Dhalwala,%20Rishikesh,%20Uttarakhand%20249137&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Column: Contact Form (60% / 7 Cols) */}
            <div className="lg:col-span-7">
              <Card className="border-border/80 bg-card rounded-2xl shadow-xl overflow-hidden">
                <CardHeader className="bg-muted/10 p-6 md:p-8 border-b border-border/40">
                  <CardTitle className="text-2xl font-bold font-poppins text-secondary dark:text-white">
                    Send a Message
                  </CardTitle>
                  <CardDescription className="text-text-muted mt-1.5 font-inter">
                    Fill out the form below and our team will get back to you
                    within 24 hours.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 md:p-8 font-inter">
                  {/* Submit Status Inline Banners */}
                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm">
                          Message Sent Successfully!
                        </p>
                        <p className="text-xs mt-1">
                          Thank you for reaching out. We will review your
                          details and respond within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div className="flex-grow">
                        <p className="font-bold text-sm">Submission Failed</p>
                        <p className="text-xs mt-1">
                          We couldn&apos;t connect to our servers. Please click
                          the button below to send your details directly via
                          WhatsApp instead.
                        </p>
                        <a
                          href={getWhatsAppFallbackUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 mt-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg text-xs font-bold transition-colors shadow-md"
                        >
                          <MessageSquare className="w-4 h-4 fill-current" />
                          Send Details via WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Full Name <span className="text-brand-orange">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g. Rahul Bisht"
                          {...register("fullName")}
                          className={`border-border/80 focus-visible:ring-brand-orange/50 ${errors.fullName ? "border-red-500 focus-visible:ring-red-500 ring-red-500" : ""}`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Email Address{" "}
                          <span className="text-brand-orange">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="e.g. rahul@example.com"
                          {...register("email")}
                          className={`border-border/80 focus-visible:ring-brand-orange/50 ${errors.email ? "border-red-500 focus-visible:ring-red-500 ring-red-500" : ""}`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone and Company Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Phone Number{" "}
                          <span className="text-brand-orange">*</span>
                        </label>
                        <Input
                          type="tel"
                          placeholder="10-digit number"
                          {...register("phone")}
                          className={`border-border/80 focus-visible:ring-brand-orange/50 ${errors.phone ? "border-red-500 focus-visible:ring-red-500 ring-red-500" : ""}`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Company Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Optional"
                          {...register("companyName")}
                          className="border-border/80 focus-visible:ring-brand-orange/50"
                        />
                        {errors.companyName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.companyName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Dropdowns Row (Service, Budget, Timeline) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Service Interested{" "}
                          <span className="text-brand-orange">*</span>
                        </label>
                        <select
                          {...register("serviceInterested")}
                          className={`flex h-10 w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 disabled:cursor-not-allowed disabled:opacity-50 ${
                            errors.serviceInterested
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                          }`}
                        >
                          <option value="">Select Service</option>
                          {SERVICES_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.serviceInterested && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.serviceInterested.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Budget Range{" "}
                          <span className="text-brand-orange">*</span>
                        </label>
                        <select
                          {...register("budgetRange")}
                          className={`flex h-10 w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 disabled:cursor-not-allowed disabled:opacity-50 ${
                            errors.budgetRange
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                          }`}
                        >
                          <option value="">Select Budget</option>
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.budgetRange && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.budgetRange.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Timeline <span className="text-brand-orange">*</span>
                        </label>
                        <select
                          {...register("timeline")}
                          className={`flex h-10 w-full rounded-md border border-border/80 bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 disabled:cursor-not-allowed disabled:opacity-50 ${
                            errors.timeline
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                          }`}
                        >
                          <option value="">Select Timeline</option>
                          {TIMELINE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.timeline && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.timeline.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-primary dark:text-white uppercase tracking-wider">
                        Project Details{" "}
                        <span className="text-brand-orange">*</span>
                      </label>
                      <Textarea
                        rows={4}
                        placeholder="Tell us about your project requirements..."
                        {...register("message")}
                        className={`border-border/80 focus-visible:ring-brand-orange/50 ${errors.message ? "border-red-500 focus-visible:ring-red-500 ring-red-500" : ""}`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="w-full md:w-auto md:px-12 bg-brand-orange hover:bg-brand-orange/90 text-white py-6 rounded-xl font-bold flex items-center justify-center gap-2 group shadow-sm hover:shadow-brand-orange/20 transition-all duration-300"
                    >
                      {submitStatus === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
